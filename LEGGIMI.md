# The PP Games: guida

La pagina iniziale del sito adesso è **The PP Games**. Si apre con il logo, poi trovi il profilo con il tuo nome, i giochi (Parola segreta, Trova le differenze, Scovaparole, Nomi, cose, città e FantaBusta), le partite aperte e la classifica di sempre.

**Novità di questo aggiornamento**

- Un gioco nuovo: **Parola segreta**, con due modi di giocare (lettere e vite, catena).
- Suoni e musiche in tutti i giochi, ognuno per il suo momento, con un tasto per spegnerli.
- Una chat con le faccine in ogni partita.
- FantaBusta ha una grafica nuova, più colorata e da stadio.
- Trova le differenze ha 13 ambienti invece di 4.

Le regole del database sono cambiate, per la chat e per Parola segreta: dopo aver caricato i file vanno incollate di nuovo in Firebase (punto 2).

## Se hai già FantaBusta online su GitHub: aggiornamento

Lo fai una volta sola, dal PC.

### 1. Carica i file nuovi

1. Apri il repository su GitHub, premi **Add file → Upload files**.
2. Estrai lo zip, apri la cartella e trascina **tutti i file che contiene** (non la cartella): `index.html`, `fantabusta.html`, `app.js`, `hub.js`, `nomicose.html`, `nomicose.js`, `scovaparole.html`, `scovaparole.js`, `scovaparole-griglie.json`, `LICENZA-dizionario.txt`, `differenze.html`, `differenze.js`, `parola.html`, `parola.js`, `manifest.webmanifest`, `logo.png`, `icon-192.png`, `icon-512.png`, `icon-maskable.png`, `apple-touch-icon.png`, `database.rules.json`, `LEGGIMI.md`.
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

## Suoni e musica

- In alto a destra in ogni gioco c'è il tasto con l'altoparlante. A ogni tocco cambia: **musica ed effetti**, **solo effetti**, **niente**. La scelta resta salvata su quel telefono.
- Gli effetti accompagnano i momenti del gioco: l'apertura, il conto alla rovescia, la risposta giusta o sbagliata, lo STOP, il ticchettio degli ultimi secondi, la fine del tempo, la vittoria. In FantaBusta ci sono il fischio d'inizio, le buste che si aprono e il triplice fischio finale.
- I suoni sono creati dal telefono stesso, senza file da scaricare.
- Il telefono fa partire l'audio solo dopo il primo tocco sulla pagina: fino ad allora tutto tace. Dall'icona sulla schermata Home di Android spesso parte da subito.
- Se non senti niente, controlla il tasto in alto e il volume del telefono; su iPhone anche l'interruttore laterale del silenzioso.

## La chat della partita

- In ogni partita, anche in attesa che cominci, c'è il tasto con il fumetto accanto a quello dei suoni. Il pallino rosso conta i messaggi nuovi.
- Si scrive un messaggio breve (fino a 120 caratteri) oppure si tocca una faccina, che arriva subito a tutti.
- Quando arriva un messaggio compare per qualche secondo in alto e le faccine volano sullo schermo, senza bloccare il gioco.
- Scrivono solo i giocatori della partita. I messaggi restano nella partita e spariscono quando chi l'ha creata la elimina.

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

1. A ogni manche tutti vedono la stessa coppia di disegni, uno sopra l'altro. I disegni li crea il gioco ogni volta, quindi non si ripetono mai uguali: cambiano gli oggetti, i colori, le posizioni e le differenze.
   Gli ambienti sono 13 e ogni manche ne usa uno diverso: il parco, il mare, la città, la casa, la montagna innevata, la campagna, lo spazio, il fondo del mare, la festa, il campeggio di notte, il bosco d'autunno, il deserto e lo stadio. Il nome dell'ambiente compare durante il conto alla rovescia.
2. Chi tocca per primo una differenza, su uno qualsiasi dei due disegni, prende il punto: compare un cerchio con il suo colore sul telefono di tutti.
3. Un tocco nel punto sbagliato blocca per 3 secondi.
4. La manche finisce quando le differenze sono state trovate tutte o quando scade il tempo; poi si vedono anche quelle mancate, tratteggiate.
5. Le differenze possono essere un oggetto che manca o in più, un colore, una forma, una misura, un verso, un numero (le candeline sulla torta, i bottoni del pupazzo di neve, il numero sulla maglia, il punteggio sul tabellone).
6. Chi organizza sceglie le differenze per disegno (5, 7 o 10), le manche (1, 3 o 5) e il tempo massimo (1, 2 o 3 minuti). Ognuno per sé, a squadre (le differenze dei compagni si sommano) o da soli per allenarsi.

## Parola segreta

Chi crea la partita sceglie:

- **Il gioco:** «Lettere e vite» oppure «Catena».
- **Chi sceglie le parole:** il gioco (frasi e catene già pronte, mai uguali nella stessa partita) oppure a turno i giocatori. A turno, in ogni manche uno sceglie e gli altri indovinano; a squadre sceglie una squadra. Si fanno uno o due giri, così tutti scelgono lo stesso numero di volte.
- **Le categorie** delle frasi, una o più: proverbi, modi di dire, film, città e luoghi, animali, cibi e piatti, mestieri, sport e giochi, fiabe e personaggi, oggetti.
- Ognuno per sé, a squadre o da soli per allenarsi (da soli non entra in classifica). Poi manche e tempo.

**Lettere e vite**

1. Tutti vedono la stessa parola o frase nascosta, con l'aiuto della categoria. Ognuno, sul suo telefono e senza aspettare gli altri, tocca le lettere.
2. Ogni lettera sbagliata costa una vita: ce ne sono 6. Con **La so!** si scrive tutta la soluzione; se è sbagliata si perde una vita.
3. Chi la scopre prende 10 punti, più 2 per ogni vita rimasta, più 6, 3 o 1 punto se arriva primo, secondo o terzo.
4. A squadre le lettere scelte da un compagno valgono per tutta la squadra e le vite sono in comune.
5. La manche finisce quando hanno finito tutti o quando scade il tempo; poi si vede la soluzione.

**Catena**

1. Una fila di parole collegate a due a due: ogni parola forma un'espressione con quella prima (ferro → stiro → asse → equilibrio…).
2. Si vede la prima parola; della seguente solo l'iniziale e le caselle, poi ogni 3 secondi compare un'altra lettera.
3. Chi scrive per primo la parola giusta prende 2 punti più uno per ogni lettera ancora nascosta, e si passa alla parola dopo. Se nessuno la indovina, alla fine si scopre da sola.
4. Dopo un tentativo sbagliato bisogna aspettare un attimo prima di riprovare.
5. Quando la sceglie un giocatore, scrive da 4 a 7 parole, oppure usa una catena pronta.

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
- Le regole del database rifiutano risposte e buste fuori tempo, a nome di altri o dopo la chiusura della manche, e messaggi della chat di chi non gioca o a nome di altri.
- Le parole di Scovaparole vengono dal dizionario italiano di OpenOffice e LibreOffice (licenza GPL 3, vedi `LICENZA-dizionario.txt`).
- Il gioco non ha un server suo che custodisca risposte e buste: chi è pratico degli strumenti per sviluppatori del browser, da PC, potrebbe sbirciare. Dal telefono non si vedono.
