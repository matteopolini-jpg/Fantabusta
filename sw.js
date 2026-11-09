// The PP Games: riceve gli inviti a giocare anche a sito chiuso e li mostra come notifica.
// Non salva niente sul telefono e non cambia come si caricano le pagine.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let d = {};
    try { d = event.data ? event.data.json() : {}; } catch (e) { d = {}; }
    const title = String(d.title || 'The PP Games').slice(0, 120);
    const body = String(d.body || 'Hai un invito a giocare.').slice(0, 200);
    const url = String(d.url || './');
    const tag = String(d.tag || 'pp-invito');
    const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    // a sito aperto la pagina fa il suo suono e mostra l'invito: la notifica arriva senza suonare due volte
    const visible = open.some((c) => c.visibilityState === 'visible');
    open.forEach((c) => c.postMessage({ type: 'pp-invite', title, body, url, tag }));
    await self.registration.showNotification(title, { body, tag, icon: 'icon-192.png', badge: 'badge.png', lang: 'it', renotify: true, silent: visible, data: { url } });
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || './', self.registration.scope);
  event.waitUntil((async () => {
    const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const mine = open.filter((c) => c.url.indexOf(self.registration.scope) === 0);
    const tab = mine.find((c) => c.focused) || mine[0];
    if (tab) {
      try { await tab.focus(); } catch (e) { /* ignore */ }
      // la pagina si ricarica sulla partita (anche se era già aperta sullo stesso gioco)
      const go = new URL(url.href); go.searchParams.set('apri', String(Date.now()));
      try { if ('navigate' in tab) { await tab.navigate(go.href); return; } } catch (e) { /* sotto */ }
      tab.postMessage({ type: 'pp-open', url: url.href });
      return;
    }
    if (self.clients.openWindow) await self.clients.openWindow(url.href);
  })());
});
