# The PP Games: guida

La pagina iniziale del sito adesso è **The PP Games**. Si apre con il logo, poi trovi il profilo con il tuo nome, i giochi (Trova le differenze, Scovaparole, Nomi, cose, città e FantaBusta), le partite aperte e la classifica di sempre.

## Se hai già FantaBusta online su GitHub: aggiornamento

Lo fai una volta sola, dal PC.

### 1. Carica i file nuovi

1. Apri il repository su GitHub, premi **Add file → Upload files**.
2. Estrai lo zip, apri la cartella e trascina **tutti i file che contiene** (non la cartella): `index.html`, `fantabusta.html`, `app.js`, `hub.js`, `nomicose.html`, `nomicose.js`, `scovaparole.html`, `scovaparole.js`, `scovaparole-griglie.json`, `LICENZA-dizionario.txt`, `differenze.html`, `differenze.js`, `manifest.webmanifest`, `logo.png`, `icon-192.png`, `icon-512.png`, `icon-maskable.png`, `apple-touch-icon.png`, `database.rules.json`.
3. Premi **Commit changes**.

Il file `config.js` non è nel pacchetto: il tuo resta com'è. Non va toccato.

### 2. Aggiorna le regole del database (obbligatorio)

1. Apri https://console.firebase.google.com, il tuo progetto, poi **Realtime Database → Regole**.
2. Apri `database.rules.json` con il Blocco note, copia tutto il testo e incollalo al posto delle regole che ci sono.
3. Premi **Pubblica**.

Va rifatto a ogni aggiornamento che contiene un `database.rules.json` nuovo. Senza questo passaggio i giochi nuovi dicono che il database ha rifiutato l'operazione.

### 3. Prova

- Aspetta un paio di minuti che GitHub pubblichi, poi apri il sito e ricarica con **Ctrl+F5**. Sul telefono chiudi e riapri la pagina o l'icona.
- Il vecchio link del sito ora apre The PP Games. I link alle partite di FantaBusta mandati prima continuano a funzionare.
- Le partite di FantaBusta già cominciate continuano normalmente.

## Il profilo

- Ognuno scrive il nome una volta nella pagina iniziale. Resta salvato su quel telefono e vale per tutti i giochi e per la classifica.
- **Cambiare telefono:** sul telefono vecchio premi **Collega un altro telefono** e compare un codice di 6 caratteri, valido 10 minuti. Sul telefono nuovo premi **Hai già giocato con un altro telefono? Collegalo** e scrivilo. Da quel momento i due telefoni hanno lo stesso nome e la stessa classifica.
- Su iPhone l'icona sulla schermata Home e Safari contano come due telefoni diversi: collegali con il codice.
- Se un telefono è perso e non può creare il codice, si gioca con un nome nuovo; la classifica del vecchio profilo resta separata.

## La classifica

- In ogni partita prendi 1 punto per ogni avversario che hai battuto. A parità contano le vittorie, poi chi ha giocato meno partite.
- C'è la classifica generale e quella di ogni gioco, per sempre, per quest'anno o per questo mese. Per ogni gioco c'è anche il record: la rosa che vale di più a FantaBusta, il punteggio più alto a Nomi, cose, città.
- Una partita entra in classifica appena finisce. Le partite di FantaBusta finite prima di questo aggiornamento entrano quando uno dei partecipanti apre la pagina di FantaBusta.
- Per togliere una partita di prova: in Firebase apri **Realtime Database → Dati → results** e cancella la voce con il codice di quella partita.

## Nomi, cose, città

1. Chi organizza sceglie le categorie (anche sue), quanti giocatori al massimo, come esce la lettera (a caso, la sceglie lui o a turno), le manche (3, 5, 8 o 10) e il tempo di ogni manche (da 1 a 3 minuti).
2. A ogni manche si scrive una parola per categoria che comincia con la lettera uscita.
3. Chi completa tutte le categorie può premere **STOP**: agli altri restano 10 secondi.
4. Poi si vedono le risposte di tutti. Una parola bocciata con **Non vale** dalla maggioranza degli altri giocatori fa 0.
5. Punti: 10 se la parola l'hai scritta solo tu, 5 se un altro ha scritto la stessa parola o una molto simile (singolare e plurale, una lettera sbagliata, il cognome con o senza il nome). Le parole che non cominciano con la lettera fanno 0.
6. Doppia iniziale: se ogni parola della risposta comincia con la lettera (con la M: Marco Mengoni), i punti raddoppiano.
7. Se il telefono di chi organizza si chiude, la partita va avanti lo stesso: la guida passa da sola a un altro giocatore.

## Scovaparole

1. Tutti hanno la stessa griglia di 16 lettere. Si trascina il dito sulle lettere vicine, anche in diagonale, e si stacca alla fine della parola. Ogni lettera si usa una volta per parola.
2. Valgono le parole del dizionario italiano di almeno 2 lettere, anche plurali e verbi coniugati; gli accenti non contano.
3. Punteggi alla Ruzzle: ogni lettera ha il suo valore (G, H e Z valgono 8). DL e TL raddoppiano o triplicano la lettera, DP e TP la parola. Le parole lunghe prendono 5 punti in più per ogni lettera oltre la quarta.
4. **Ognuno per sé:** una parola trovata da più giocatori vale per tutti. **A squadre** (da 2 a 4 squadre, ognuno sceglie la sua in attesa o si mescolano a caso): le parole dei compagni si sommano e ognuna conta una volta.
5. Si sceglie il numero di manche (1, 3 o 5) e il tempo (1, 2 o 3 minuti). Dopo ogni manche si vedono i punti e le parole migliori che nessuno ha trovato.
6. **Allenati da solo** fa partire subito una partita senza avversari: non entra in classifica.
7. Le 1.500 griglie sono già pronte nel file `scovaparole-griglie.json`, con tutte le parole valide di ciascuna. Lo scarica solo il telefono di chi fa partire la partita.

## Trova le differenze

1. A ogni manche tutti vedono la stessa coppia di disegni, uno sopra l'altro. I disegni li crea il gioco ogni volta (parco, mare, città, casa), quindi non si ripetono.
2. Chi tocca per primo una differenza, su uno qualsiasi dei due disegni, prende il punto: compare un cerchio con il suo colore sul telefono di tutti.
3. Un tocco nel punto sbagliato blocca per 3 secondi.
4. La manche finisce quando le differenze sono state trovate tutte o quando scade il tempo; poi si vedono anche quelle mancate, tratteggiate.
5. Chi organizza sceglie le differenze per disegno (5, 7 o 10), le manche (1, 3 o 5) e il tempo massimo (1, 2 o 3 minuti). Ognuno per sé, a squadre (le differenze dei compagni si sommano) o da soli per allenarsi.

## Installazione da zero (senza FantaBusta già online)

1. In https://console.firebase.google.com crea un progetto (piano gratuito Spark).
2. **Realtime Database → Crea database**, posizione **Belgio (europe-west1)**, modalità bloccata. Poi in **Regole** incolla `database.rules.json` e premi **Pubblica**.
3. **Authentication → Inizia → Metodo di accesso → Anonimo**: attivalo.
4. **Impostazioni progetto → Le tue app → `</>`**: registra un'app web e copia i suoi dati in `public/config.js`, togliendo i `//`. Controlla che ci sia `databaseURL` (lo trovi in alto nella pagina del Realtime Database).
5. Su GitHub crea un repository e carica tutti i file della cartella `public`. In **Settings → Pages** scegli il ramo `main` e la cartella principale.

## Logo e icona

- Il logo che compare all'apertura è il file `logo.png`; le icone per la schermata Home sono `icon-192.png`, `icon-512.png`, `icon-maskable.png` e `apple-touch-icon.png`. Per cambiarli basta sostituire questi file su GitHub.
- Dopo aver cambiato l'icona, chi aveva già aggiunto il sito alla Home lo toglie e lo riaggiunge.

## Limiti e sicurezza

- Piano gratuito: fino a 100 telefoni collegati insieme. Per gruppi di amici basta e avanza; se si supera, Firebase non addebita niente.
- Le regole del database rifiutano risposte e buste fuori tempo, a nome di altri o dopo la chiusura della manche.
- Le parole di Scovaparole vengono dal dizionario italiano di OpenOffice e LibreOffice (licenza GPL 3, vedi `LICENZA-dizionario.txt`).
- Il gioco non ha un server suo che custodisca risposte e buste: chi è pratico degli strumenti per sviluppatori del browser, da PC, potrebbe sbirciare. Dal telefono non si vedono.
