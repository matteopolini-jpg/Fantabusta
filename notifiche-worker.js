// The PP Games: spedisce gli inviti a giocare come notifiche sul telefono (Web Push).
//
// Gira su Cloudflare Workers, piano gratuito. Non va modificato: tutto quello che serve è nel
// segreto CHIAVE_NOTIFICHE, da copiare dal pannello di amministrazione del sito.
//
// Chi invita manda il suo accesso a Firebase: il servizio legge il database con quello, quindi
// valgono le regole del database (codice del gruppo compreso) e un invito ogni 15 secondi a testa.
// Le notifiche sono cifrate per ogni telefono (RFC 8291) e firmate con la chiave del sito (RFC 8292).

const GAMES = {
  fantabusta: ['FantaBusta', 'fantabusta.html', 'a FantaBusta'],
  ncc: ['Nomi, cose, città', 'nomicose.html', 'a Nomi, cose, città'],
  scv: ['Scovaparole', 'scovaparole.html', 'a Scovaparole'],
  diff: ['Trova le differenze', 'differenze.html', 'a Trova le differenze'],
  psg: ['Parola segreta', 'parola.html', 'a Parola segreta'],
  quiz: ['Quiz', 'quiz.html', 'al Quiz'],
  gp: ['Giro palla', 'giropalla.html', 'a Giro palla'],
  duel: ['Il Duello', 'duello.html', 'a Il Duello'],
};
const MAX_PHONES = 36;   // il piano gratuito permette 50 richieste esterne per invito: 6 al database, 36 ai telefoni, 6 per le pulizie
const TTL = '900';       // un invito vecchio di un quarto d'ora non serve più: il telefono spento non lo riceve

const te = new TextEncoder();
const td = new TextDecoder();

function b64u(buf) {
  const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function unb64u(str) {
  let s = String(str).replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function concat(...parts) {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
const clean = (s) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 22);

// ----------------------------------------------------------------------
// Configurazione (segreto CHIAVE_NOTIFICHE): { v, db, site, pub, jwk: { x, y, d } }
// ----------------------------------------------------------------------
function readConfig(env) {
  try {
    const c = JSON.parse(String((env && env.CHIAVE_NOTIFICHE) || '').trim());
    if (c && typeof c.db === 'string' && typeof c.site === 'string' && typeof c.pub === 'string' && c.jwk && c.jwk.x && c.jwk.y && c.jwk.d) return c;
  } catch (e) { /* configurazione assente o incollata male */ }
  return null;
}
function originOk(cfg, origin) {
  if (!origin) return false;
  try { if (new URL(cfg.site).origin === origin) return true; } catch (e) { /* ignore */ }
  return Array.isArray(cfg.origins) && cfg.origins.indexOf(origin) >= 0;
}

// ----------------------------------------------------------------------
// Database: le chiamate REST usano il token di chi invita, quindi valgono le regole.
// ----------------------------------------------------------------------
function database(base, token) {
  const u = new URL(base);
  const root = u.origin + u.pathname.replace(/\/+$/, '');
  const qs = u.search ? u.search.slice(1) + '&' : '';
  const at = (p) => root + '/' + p + '.json?' + qs + 'auth=' + encodeURIComponent(token);
  const call = async (p, init) => {
    const r = await fetch(at(p), init);
    let val = null;
    try { val = await r.json(); } catch (e) { /* risposta vuota */ }
    return { ok: r.ok, status: r.status, val: r.ok ? val : null };
  };
  return {
    get: (p) => call(p),
    put: (p, v) => call(p, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) }),
    del: (p) => call(p, { method: 'DELETE' }),
  };
}
// Il token di Firebase è un JWT: qui serve solo sapere di chi è. Che sia vero lo controlla il
// database alla prima lettura (un token falso non legge niente).
function tokenUid(t) {
  try {
    const p = JSON.parse(td.decode(unb64u(String(t).split('.')[1])));
    const u = p.user_id || p.sub;
    return typeof u === 'string' && /^[A-Za-z0-9_-]{6,128}$/.test(u) ? u : '';
  } catch (e) { return ''; }
}

// ----------------------------------------------------------------------
// Web Push: cifratura aes128gcm (RFC 8291) e firma VAPID (RFC 8292)
// ----------------------------------------------------------------------
async function hkdf(salt, ikm, info, bytes) {
  const k = await crypto.subtle.importKey('raw', ikm, 'HKDF', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info }, k, bytes * 8));
}
async function encrypt(payload, p256dh, authSecret, fixed) {
  const uaPub = unb64u(p256dh);
  const auth = unb64u(authSecret);
  if (uaPub.length !== 65 || auth.length < 16) throw new Error('chiavi del telefono non valide');
  const salt = fixed && fixed.salt ? unb64u(fixed.salt) : crypto.getRandomValues(new Uint8Array(16));
  let mine;
  if (fixed && fixed.jwk) {
    mine = { privateKey: await crypto.subtle.importKey('jwk', Object.assign({ kty: 'EC', crv: 'P-256', ext: true }, fixed.jwk), { name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']) };
    mine.pub = concat(new Uint8Array([4]), unb64u(fixed.jwk.x), unb64u(fixed.jwk.y));
  } else {
    mine = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
    mine.pub = new Uint8Array(await crypto.subtle.exportKey('raw', mine.publicKey));
  }
  const theirs = await crypto.subtle.importKey('raw', uaPub, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const shared = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: theirs }, mine.privateKey, 256));
  const ikm = await hkdf(auth, shared, concat(te.encode('WebPush: info\0'), uaPub, mine.pub), 32);
  const cek = await hkdf(salt, ikm, te.encode('Content-Encoding: aes128gcm\0'), 16);
  const nonce = await hkdf(salt, ikm, te.encode('Content-Encoding: nonce\0'), 12);
  const key = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const sealed = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce }, key, concat(te.encode(payload), new Uint8Array([2]))));
  const head = new Uint8Array(21);
  head.set(salt, 0);
  new DataView(head.buffer).setUint32(16, 4096);
  head[20] = 65;
  return concat(head, mine.pub, sealed);
}
const signKeys = new Map();
async function vapid(aud, cfg) {
  let key = signKeys.get(cfg.jwk.d);
  if (!key) {
    key = await crypto.subtle.importKey('jwk', { kty: 'EC', crv: 'P-256', x: cfg.jwk.x, y: cfg.jwk.y, d: cfg.jwk.d, ext: true }, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
    signKeys.set(cfg.jwk.d, key);
  }
  const head = b64u(te.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const claims = b64u(te.encode(JSON.stringify({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: new URL(cfg.site).origin })));
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, te.encode(head + '.' + claims));
  return head + '.' + claims + '.' + b64u(sig);
}
async function send(s, payload, cfg, jwts) {
  const url = new URL(s.e);
  if (url.protocol !== 'https:' && !(cfg.prova && url.hostname === '127.0.0.1')) return { ok: false, status: 0, s };
  if (!jwts[url.origin]) jwts[url.origin] = vapid(url.origin, cfg);
  const [jwt, body] = await Promise.all([jwts[url.origin], encrypt(payload, s.p, s.a)]);
  const r = await fetch(s.e, {
    method: 'POST',
    headers: { TTL, Urgency: 'high', 'Content-Encoding': 'aes128gcm', 'Content-Type': 'application/octet-stream', Authorization: 'vapid t=' + jwt + ', k=' + cfg.pub },
    body,
  });
  try { await r.arrayBuffer(); } catch (e) { /* ignore */ }
  return { ok: r.status >= 200 && r.status < 300, status: r.status, s };
}

// ----------------------------------------------------------------------
// L'invito: { t: token, g: gioco, c: codice della partita, to: [profili] }
// oppure la prova dal pannello: { t, prova: true } (arriva ai propri telefoni)
// ----------------------------------------------------------------------
async function invite(body, cfg) {
  const token = String(body.t || '');
  const uid = tokenUid(token);
  if (!uid) return { ok: false, err: 'accesso', status: 401 };
  const test = body.prova === true;
  const g = String(body.g || '');
  const code = String(body.c || '');
  if (!test && (!GAMES[g] || !/^[A-Z]{4}$/.test(code))) return { ok: false, err: 'richiesta', status: 400 };
  const to = Array.isArray(body.to) ? [...new Set(body.to.filter((x) => typeof x === 'string' && /^[A-Za-z0-9_-]{6,128}$/.test(x)))].slice(0, 30) : [];
  if (!test && !to.length) return { ok: false, err: 'nessuno', status: 400 };
  const db = database(cfg.db, token);

  // un invito ogni 15 secondi: lo decidono le regole, che controllano anche che chi invita sia del gruppo
  const mark = await db.put('pushlog/' + uid, { '.sv': 'timestamp' });
  if (!mark.ok) {
    const again = await db.get('pushlog/' + uid);
    return again.ok ? { ok: false, err: 'aspetta', status: 429 } : { ok: false, err: 'accesso', status: 403 };
  }
  const [ix, alias, push] = await Promise.all([test ? { ok: true, val: null } : db.get('index/' + code), db.get('alias'), db.get('push')]);
  if (!alias.ok || !push.ok || !ix.ok) return { ok: false, err: 'database', status: 502 };
  if (!test) {
    if (!ix.val || (ix.val.game || 'fantabusta') !== g) return { ok: false, err: 'partita', status: 404 };
    if (ix.val.status && ix.val.status !== 'lobby') return { ok: false, err: 'iniziata', status: 409 };
  }
  const A = alias.val || {};
  const P = push.val || {};
  const pidOf = (u) => (A[u] && typeof A[u].pid === 'string' ? A[u].pid : u);
  const me = pidOf(uid);
  const user = await db.get('users/' + me);
  const name = clean(user.val && user.val.name) || 'Un amico';
  const want = new Set(test ? [me] : to.filter((p) => p !== me));

  const phones = [];
  for (const u of Object.keys(P)) {
    if (!want.has(pidOf(u))) continue;
    const list = P[u] && typeof P[u] === 'object' ? P[u] : {};
    for (const sid of Object.keys(list)) {
      const s = list[sid];
      if (s && typeof s.e === 'string' && typeof s.p === 'string' && typeof s.a === 'string') phones.push({ u, sid, e: s.e, p: s.p, a: s.a, at: Number(s.at) || 0 });
    }
  }
  phones.sort((x, y) => y.at - x.at);
  const msg = test
    ? { title: 'Le notifiche funzionano', body: 'Così arriveranno gli inviti a giocare.', url: './', tag: 'prova' }
    : { title: name + ' ti invita ' + GAMES[g][2], body: 'Partita ' + code + ': tocca per entrare.', url: GAMES[g][1] + '#' + code, tag: 'invito-' + code };
  const payload = JSON.stringify(Object.assign(msg, { g: test ? '' : g, c: test ? '' : code, da: name }));
  const jwts = {};
  const res = await Promise.all(phones.slice(0, MAX_PHONES).map((s) => send(s, payload, cfg, jwts).catch(() => ({ ok: false, status: 0, s }))));

  // i telefoni che non esistono più (app tolta, permesso revocato) escono dall'elenco
  const gone = res.filter((r) => r.status === 404 || r.status === 410);
  await Promise.all(gone.slice(0, 6).map((r) => db.del('push/' + r.s.u + '/' + r.s.sid).catch(() => null)));
  const reached = [...new Set(res.filter((r) => r.ok).map((r) => pidOf(r.s.u)))];
  return {
    ok: true,
    telefoni: res.filter((r) => r.ok).length,
    raggiunti: reached,
    senza: [...want].filter((p) => reached.indexOf(p) < 0),
    errori: res.filter((r) => !r.ok && r.status !== 404 && r.status !== 410).map((r) => r.status),
  };
}

export default {
  async fetch(request, env) {
    const cfg = readConfig(env);
    const origin = request.headers.get('Origin') || '';
    const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Vary: 'Origin' };
    if (!cfg && request.method === 'GET') headers['Access-Control-Allow-Origin'] = '*';
    if (cfg && originOk(cfg, origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
      headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Content-Type';
      headers['Access-Control-Max-Age'] = '86400';
    }
    const reply = (obj, status) => new Response(JSON.stringify(obj), { status: status || 200, headers });
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    // GET: il pannello di amministrazione controlla che il servizio risponda e abbia la configurazione giusta
    if (request.method === 'GET') return reply({ ok: !!cfg, servizio: 'The PP Games: inviti', v: 1, chiave: cfg ? cfg.pub.slice(0, 16) : '' });
    if (request.method !== 'POST') return reply({ ok: false, err: 'metodo' }, 405);
    if (!cfg) return reply({ ok: false, err: 'config' }, 500);
    if (origin && !originOk(cfg, origin)) return reply({ ok: false, err: 'origine' }, 403);
    let body = null;
    try { body = await request.json(); } catch (e) { /* sotto */ }
    if (!body || typeof body !== 'object') return reply({ ok: false, err: 'richiesta' }, 400);
    try {
      const out = await invite(body, cfg);
      return reply(out, out.ok ? 200 : out.status || 400);
    } catch (e) {
      return reply({ ok: false, err: 'servizio', msg: String((e && e.message) || e).slice(0, 200) }, 500);
    }
  },
};

// Solo per le prove sul computer: su Cloudflare non fa niente.
if (typeof globalThis.__PP_INVITI_TEST__ === 'function') globalThis.__PP_INVITI_TEST__({ encrypt, vapid, tokenUid, b64u, unb64u });
