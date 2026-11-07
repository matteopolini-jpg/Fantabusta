// Ricostruisce ../public a partire da src/. Uso: npm install, poi npm run build
import { build } from 'esbuild';
import fs from 'fs';
import crypto from 'crypto';
const out = new URL('../public/', import.meta.url).pathname;
await build({ entryPoints: ['src/main.js'], bundle: true, format: 'esm', minify: true, target: ['es2020'], outfile: out + 'app.js', legalComments: 'none' });
const ver = crypto.createHash('sha1').update(fs.readFileSync(out + 'app.js')).digest('hex').slice(0, 8);
const html = fs.readFileSync('src/index.html', 'utf8').replace('/*__CSS__*/', fs.readFileSync('src/app.css', 'utf8')).replace('/*__VER__*/', ver);
fs.writeFileSync(out + 'index.html', html);
console.log('public/ aggiornata, versione', ver);
