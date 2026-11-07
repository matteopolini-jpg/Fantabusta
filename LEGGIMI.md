# FantaBusta: come metterlo online gratis con Firebase

Nella cartella trovi:

- `public/`: il gioco (pagina, codice, icone, elenco dei 500 giocatori)
- `database.rules.json`: le regole di sicurezza del database
- `firebase.json`: dice a Firebase cosa pubblicare

Per i passaggi 1–4 serve un PC. Li fai una volta sola.

## 1. Crea il progetto

1. Vai su https://console.firebase.google.com e accedi con il tuo account Google.
2. Premi **Crea un progetto** e dagli un nome, per esempio `fantabusta`. Google Analytics non serve: puoi disattivarlo.
3. Il piano gratuito (Spark) è quello predefinito e non chiede la carta di credito.

## 2. Crea il database

1. Nel menu a sinistra apri **Build → Realtime Database** e premi **Crea database**.
2. Come posizione scegli **Belgio (europe-west1)**.
3. Alla domanda sulle regole scegli **Avvia in modalità bloccata**. Quelle giuste le carichi al punto 4.

## 3. Attiva l'accesso anonimo

Apri **Build → Authentication**, premi **Inizia**, vai nella scheda **Metodo di accesso**, scegli **Anonimo**, attivalo e salva.
Serve a riconoscere ogni telefono senza chiedere account o password.

## 4. Pubblica il gioco

Installa Node.js (versione LTS) da https://nodejs.org. Poi apri il terminale (su Windows il Prompt dei comandi) e scrivi:

```
npm install -g firebase-tools
firebase login
cd PERCORSO\DELLA\CARTELLA\fantabusta
firebase use --add
firebase deploy
```

- Con `firebase use --add` scegli il progetto creato al punto 1; come alias scrivi `default`.
- `firebase deploy` pubblica il gioco e carica le regole del database.
- Alla fine compare una riga **Hosting URL**, per esempio `https://fantabusta-1234.web.app`: è l'indirizzo del gioco.

## 5. Giocare

- Apri l'indirizzo dal telefono, scrivi il tuo nome e crea la partita.
- Con **Copia il link** mandi agli amici (per esempio su WhatsApp) il link diretto alla partita. In alternativa trovano la partita nell'elenco **Partite aperte**.
- Consiglio: ognuno aggiunga il gioco alla schermata Home e usi sempre quell'icona.
  - iPhone: apri il link in Safari, poi **Condividi → Aggiungi alla schermata Home**.
  - Android: apri il link in Chrome, poi **⋮ → Aggiungi a schermata Home** (o **Installa app**).
  Ogni telefono viene riconosciuto in automatico: se a metà partita qualcuno passa a un altro browser, il gioco non lo riconosce più come la stessa squadra.
- Non serve che un telefono resti acceso per tutti: il primo giocatore collegato fa avanzare l'asta e, se chiude l'app, subentra un altro in automatico.
- Se per 6 giri di fila nessuno risponde (per esempio tutti hanno chiuso l'app), l'asta va in pausa. Quando tornate, premete **Riprendi l'asta**. Con **Chiudi qui** si calcola subito la classifica e i posti vuoti valgono 0.

## Limiti del piano gratuito

- Realtime Database: 100 collegamenti contemporanei, 1 GB di dati salvati, 10 GB scaricati al mese.
- Hosting: 10 GB di spazio e 360 MB di traffico al giorno.

Per partite tra amici si resta molto sotto questi limiti. Se si superano, Firebase non addebita niente: il servizio si ferma fino al periodo successivo.

## Se qualcosa non va

- **«Accesso anonimo non attivo»**: rifai il punto 3.
- **«Non riesco a leggere le partite»**: controlla che il Realtime Database esista e che in **Realtime Database → Regole** ci siano le regole del file `database.rules.json`. Se non ci sono, rifai `firebase deploy`.
- **Database creato fuori dal Belgio**: apri `public/config.js` e togli i `//`. Poi incolla i dati della tua app web: li trovi in **Impostazioni progetto → Le tue app → aggiungi app web `</>`**. Controlla che ci sia anche `databaseURL` (lo trovi in alto nella pagina del Realtime Database). Poi rifai `firebase deploy`.

## Strada senza terminale (alternativa)

1. Regole: in **Realtime Database → Regole** incolla il contenuto di `database.rules.json` e premi **Pubblica**.
2. Configurazione: registra un'app web (**Impostazioni progetto → Le tue app → `</>`**) e copia i suoi dati in `public/config.js`, togliendo i `//`.
3. Carica la cartella `public` su un hosting statico gratuito, per esempio Cloudflare Pages o Netlify: trascini la cartella nel browser.
4. In **Authentication → Impostazioni → Domini autorizzati** aggiungi l'indirizzo del sito.

## Sicurezza: cosa aspettarsi

- Le regole del database rifiutano buste fuori tempo, buste a nome di altri e buste cambiate dopo averle sigillate.
- Buste e valori dei giocatori sono nascosti nell'app. Però il gioco non ha un server suo che li custodisca: chi è pratico degli strumenti per sviluppatori del browser, da PC, potrebbe sbirciarli. Dal telefono non si vedono.

## Da dove vengono i dati

- Giocatori, squadre, ruoli ed età vengono dal database di EA SPORTS FC 27, aggiornato all'11 ottobre 2026.
- I ruoli stile Mantra sono ricavati dalle posizioni del gioco.
- Il valore segreto di ogni giocatore va da 1 a 100: per il 60% conta il livello attuale (valutazione FC 27), per il 40% un valore di mercato stimato, che premia i più giovani.

## Modificare il gioco

Il codice leggibile è nella cartella `sorgenti/`. `public/app.js` è la versione compressa che gira davvero. Per ricostruirla dopo una modifica: entra in `sorgenti`, poi `npm install` e `npm run build`. Infine rifai `firebase deploy` dalla cartella principale.
