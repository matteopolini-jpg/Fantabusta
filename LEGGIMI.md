# The PP Games: guida

La pagina iniziale del sito adesso è **The PP Games**. Si apre con il logo, poi trovi il profilo con il tuo nome, i giochi (Giro palla, Quiz, Parola segreta, Trova le differenze, Scovaparole, Nomi, cose, città e FantaBusta), le partite aperte e la classifica di sempre.

**Novità di questo aggiornamento**

- **Inviti con le notifiche:** nella sala d'attesa di ogni gioco, **Invita** apre l'elenco del gruppo. Chi scegli riceve una notifica sul telefono e, toccandola, entra nella partita. Ognuno attiva le notifiche una volta, dalla pagina iniziale.
- Per spedire le notifiche serve un piccolo servizio gratuito su Cloudflare, senza carta di credito: lo prepari una volta sola dal pannello di amministrazione (sotto, **Inviti con le notifiche**). Finché non è pronto, **Invita** manda il link come prima.

Le regole del database sono cambiate: incollale in Firebase prima di caricare i file (punto 1).

## Se hai già FantaBusta online su GitHub: aggiornamento

Lo fai una volta sola, dal PC.

### 1. Aggiorna le regole del database (obbligatorio)

1. Estrai lo zip.
2. Apri https://console.firebase.google.com, il tuo progetto, poi **Realtime Database → Regole**.
3. Apri `database.rules.json` con il Blocco note, copia tutto il testo e incollalo al posto delle regole che ci sono.
4. Premi **Pubblica**.

Va rifatto a ogni aggiornamento che contiene un `database.rules.json` nuovo. Senza questo passaggio i giochi nuovi dicono che il database ha rifiutato l'operazione. Le regole nuove vanno bene anche per i file di prima, quindi si possono incollare prima di caricare i file.

### 2. Carica i file nuovi

1. Apri il repository su GitHub, premi **Add file → Upload files**.
2. Apri la cartella estratta e trascina **tutto quello che contiene** (non la cartella stessa): la cartella `.github` e i file `index.html`, `fantabusta.html`, `app.js`, `hub.js`, `admin.html`, `admin.js`, `transfermarkt-id.json`, `nomicose.html`, `nomicose.js`, `scovaparole.html`, `scovaparole.js`, `scovaparole-griglie.json`, `LICENZA-dizionario.txt`, `differenze.html`, `differenze.js`, `parola.html`, `parola.js`, `quiz.html`, `quiz.js`, `giropalla.html`, `giropalla.js`, `calciatori.json`, `manifest.webmanifest`, `sw.js`, `notifiche-worker.js`, `badge.png`, `logo.png`, `icon-192.png`, `icon-512.png`, `icon-maskable.png`, `apple-touch-icon.png`, `database.rules.json`, `LEGGIMI.md`.
3. Premi **Commit changes**.

Il file `config.js` non è nel pacchetto: il tuo resta com'è. Non va toccato.

La cartella `.github` contiene l'aggiornamento automatico dei valori di FantaBusta. GitHub spesso non la prende trascinandola, perché il nome comincia con il punto. Se il file c'è già nel repository, aprilo su GitHub (`.github/workflows/valori-transfermarkt.yml`), premi la matita, cancella tutto il testo, incolla quello del file nuovo (si apre con il Blocco note) e premi **Commit changes**. Se non c'è, crealo: scheda **Actions → New workflow → set up a workflow yourself**, chiama il file `valori-transfermarkt.yml`, incolla il testo e premi **Commit changes**.

### 3. Prova

- Aspetta un paio di minuti che GitHub pubblichi, poi apri il sito e ricarica con **Ctrl+F5**. Sul telefono chiudi e riapri la pagina o l'icona.
- Su GitHub, nella scheda **Actions**, dopo il caricamento parte da solo **Aggiorna valori Transfermarkt**. Se finisce con la spunta verde, FantaBusta ha già i valori di oggi. Se finisce con la X rossa, aprilo: l'ultima riga spiega cosa non va.
- In FantaBusta, sotto **Valori dei giocatori**, c'è la data dei valori. Il tasto **Aggiorna i valori** li riscarica quando vuoi.
- Apri il pannello di amministrazione (tasto **Amministrazione** nella pagina iniziale, oppure l'indirizzo del sito con `admin.html` in fondo). Se non l'hai ancora fatto, premi **Diventa amministratore**. Nella sezione **Notifiche degli inviti** prepara il servizio che spedisce le notifiche: vedi **Inviti con le notifiche** qui sotto.

## Suoni e musica

- In alto a destra in ogni gioco c'è il tasto con l'altoparlante. A ogni tocco cambia: **musica ed effetti**, **solo effetti**, **niente**. La scelta resta salvata su quel telefono.
- Gli effetti accompagnano i momenti del gioco: l'apertura, il conto alla rovescia, la risposta giusta o sbagliata, lo STOP, il ticchettio degli ultimi secondi, la fine del tempo, la vittoria. In FantaBusta ci sono il fischio d'inizio, le buste che si aprono e il triplice fischio finale; in Giro palla il tabellone che gira, il fischio dell'arbitro a ogni cartellino e il pubblico alla fine. Un invito che arriva mentre il sito è aperto suona un campanello.
- I suoni sono creati dal telefono stesso, senza file da scaricare.
- Il telefono fa partire l'audio solo dopo il primo tocco sulla pagina: fino ad allora tutto tace. Dall'icona sulla schermata Home di Android spesso parte da subito.
- Se non senti niente, controlla il tasto in alto e il volume del telefono; su iPhone anche l'interruttore laterale del silenzioso.

## La chat della partita

- In ogni partita, anche in attesa che cominci, c'è il tasto con il fumetto accanto a quello dei suoni. Il pallino rosso conta i messaggi nuovi.
- Si scrive un messaggio breve (fino a 120 caratteri) oppure si tocca una faccina, che arriva subito a tutti.
- Quando arriva un messaggio compare per qualche secondo in alto e le faccine volano sullo schermo, senza bloccare il gioco.
- Scrivono solo i giocatori della partita. I messaggi restano nella partita e spariscono quando chi l'ha creata la elimina.

## Le partite nella pagina iniziale

Accanto a ogni partita aperta o in corso c'è la **×**. Cosa fa dipende da chi la preme, e prima chiede conferma:

- **chi ha creato la partita** la elimina per tutti;
- **chi ci sta giocando** la toglie dalla lista per tutti, ma la partita resta e chi la sta giocando la può finire;
- **gli altri** la nascondono solo sul proprio telefono;
- **l'amministratore** elimina qualsiasi partita per tutti.

Lo stesso vale nelle liste della pagina di FantaBusta.

## Amministrazione

Un pannello per chi gestisce The PP Games, all'indirizzo del sito con `admin.html` in fondo (per esempio `https://tuonome.github.io/Fantabusta/admin.html`). Agli altri non compare il link e la pagina dice che è solo per l'amministratore; le regole del database non lasciano fare a nessun altro queste operazioni.

- **La prima volta:** apri la pagina e premi **Diventa amministratore**. Lo diventa il primo che lo preme, quindi fallo subito dopo aver caricato l'aggiornamento. Vale per il tuo profilo, cioè per tutti i telefoni che hai collegato con il codice. Da quel momento nella pagina iniziale, sotto il tuo nome, c'è il tasto **Amministrazione**.
- **Utenti:** dal più recente, con l'ultimo accesso e la pagina aperta (per esempio «oggi alle 8:02, Quiz»), le partite giocate, le vittorie, il tempo di gioco e quanti telefoni usa. Gli accessi si segnano da quando c'è il pannello; per chi non è più tornato si vede la data dell'ultima partita.
- Tocca un utente per:
  - **Rinomina**: cambia il nome che vedono tutti, anche in classifica.
  - **Unisci a un altro**: quando la stessa persona compare due volte (per esempio ha cambiato telefono senza collegarlo). Partite e telefoni passano all'utente scelto, che tiene il suo nome.
  - **Rendi amministratore** o **Togli amministratore**. L'ultimo amministratore non si può togliere.
  - **Cancella**: l'utente sparisce dall'elenco e dalla classifica insieme alle sue partite; chi aveva giocato contro di lui perde i punti presi in quelle partite. Se riapre i giochi da un suo telefono, riparte da zero. Non puoi cancellare te stesso.
- **Partite non finite:** tutte, di chiunque, con la **×** per eliminarle. Se ce ne sono ferme da più di un giorno, **Eliminale** le toglie tutte insieme.

### Tempo di gioco

- In alto scegli **Giorno**, **Settimana**, **Mese** o **Sempre**; con le frecce ‹ › vai ai periodi prima.
- Vedi il totale, i giochi dal più giocato e le persone, ognuna con una barra divisa per gioco. Tocca una persona per vedere i suoi giorni (o i mesi, con **Sempre**); passando sopra una colonna, o toccandola, leggi i minuti. **Mostra i numeri** li elenca.
- Conta il tempo con un gioco aperto e in uso. Un telefono lasciato acceso senza toccarlo smette di contare dopo cinque minuti; la pagina iniziale e il pannello non contano.
- Si conta da questo aggiornamento in poi: il tempo di prima non c'è. Lo vede solo l'amministratore.

## Codice del gruppo

Senza codice, chiunque abbia l'indirizzo del sito può entrare e giocare. Con il codice entrano solo i telefoni che lo conoscono o che aprono il tuo link d'invito.

- **Attivarlo:** nel pannello di amministrazione, sezione **Codice del gruppo**, tieni il codice proposto o scrivine uno tuo (almeno 6 caratteri; **Un altro** ne propone un altro), poi premi **Attiva il codice**. Chi ha già un profilo o ha già giocato resta dentro senza fare niente.
- **Farlo arrivare:** premi **Copia il link d'invito** e mandalo nel gruppo: chi lo apre entra senza scrivere niente. Oppure **Copia il codice**: si scrive nella pagina di benvenuto.
- **Un telefono nuovo** vede **Benvenuto in The PP Games** con la casella per il codice. Se è il telefono nuovo di chi giocava già, tocca **Hai già giocato con un altro telefono?** e scrive il codice di 6 caratteri creato sul telefono vecchio (vedi **Il profilo**): entra con il suo nome e la sua classifica.
- **Cambia il codice:** il codice vecchio e il link vecchio smettono di valere. Chi è già entrato resta dentro.
- **Togli il codice:** il sito torna aperto a tutti.
- **Chiudere fuori qualcuno:** cambia il codice, poi cancellalo dal pannello (**Cancella** sul suo nome).
- Sotto il codice si legge quanti telefoni sono entrati con il codice o con il link.

### L'aggiornamento dei valori da GitHub, con il codice attivo

Anche l'aggiornamento automatico dei valori di FantaBusta deve entrare: gli serve una chiave, da mettere su GitHub una volta sola.

1. Controlla di avere il file `.github/workflows/valori-transfermarkt.yml` di questo aggiornamento (in **Se hai già FantaBusta online su GitHub**, punto 2, come si sostituisce).
2. Nel pannello, sotto il codice, premi **Copia la chiave**.
3. Su GitHub apri il repository, poi **Settings → Secrets and variables → Actions → New repository secret** (il tasto **Apri GitHub** del pannello porta lì). Come nome scrivi `CHIAVE_PPGAMES`, come valore incolla la chiave e premi **Add secret**.
4. Prova: **Actions → Aggiorna valori Transfermarkt → Run workflow**. Deve finire con la spunta verde.

Se cambi il codice, la chiave resta valida. **Fai una chiave nuova** serve solo se pensi che l'abbia vista qualcuno: poi va cambiata anche su GitHub. Il tasto **Aggiorna i valori** dentro FantaBusta funziona sempre, anche senza la chiave.

## Inviti con le notifiche

Con le notifiche, chi crea una partita può chiamare gli amici: a loro arriva un avviso sul telefono, anche a sito chiuso.

- **Attivarle:** nella pagina iniziale, sotto il tuo nome, premi **Attiva** in **Inviti sul telefono** e poi **Consenti** quando il telefono lo chiede. Si fa una volta per telefono. **Disattiva** le spegne.
- **Su Android** funzionano anche dal browser (Chrome).
- **Su iPhone** arrivano solo se il sito è aggiunto alla schermata Home e aperto da lì (in Safari: Condividi, poi **Aggiungi alla schermata Home**). L'icona conta come un telefono nuovo: collegala al tuo profilo con il codice di 6 caratteri (vedi **Il profilo**), poi attiva le notifiche da lì.
- **Invitare:** nella sala d'attesa premi **Invita**. In alto ci sono le persone del gruppo che hanno le notifiche: scegline una o più (o **Tutti**) e premi **Manda l'invito**. Sotto c'è chi non le ha: a loro manda il link con **Manda il link**, come prima.
- **Chi riceve l'invito** vede una notifica come «Matteo ti invita al Quiz»: toccandola entra nella sala d'attesa della partita. Se ha il sito aperto, sente un campanello e compare un avviso con **Entra**.
- Un invito ogni 15 secondi a testa, solo per partite ancora in attesa. Un telefono spento per più di un quarto d'ora non riceve gli inviti arrivati nel frattempo: ormai sarebbero vecchi.

### Preparare il servizio (amministratore, una volta sola)

Le notifiche le spedisce un piccolo servizio su Cloudflare, con il piano gratuito: non chiede la carta di credito e permette 100.000 inviti al giorno. Meglio farlo dal computer.

1. Nel pannello di amministrazione, sezione **Notifiche degli inviti**, premi **Prepara le notifiche**: si creano le chiavi e compaiono i passi.
2. Crea un account gratuito su https://dash.cloudflare.com/sign-up e conferma l'email.
3. Dal menu a sinistra apri **Workers & Pages** (a volte è sotto **Compute**), premi **Create**, scegli **Hello World** (o **Create Worker**), chiamalo per esempio `ppgames-inviti` e premi **Deploy**.
4. Premi **Edit code**, cancella tutto il codice che c'è, incolla quello copiato con **Copia il codice** del pannello (è anche nel file `notifiche-worker.js`) e premi **Deploy**.
5. Torna al worker, apri **Settings** e, sotto **Variables and Secrets**, premi **Add**: tipo **Secret**, nome `CHIAVE_NOTIFICHE`, come valore incolla quello copiato con **Copia la configurazione**, poi **Deploy**. La configurazione contiene la chiave segreta delle notifiche: incollala solo lì.
6. Copia l'indirizzo del worker (in alto nella sua pagina, finisce con `.workers.dev`), incollalo nel pannello e premi **Collega**. Se qualcosa non va, il pannello dice quale passo rifare.
7. Attiva le notifiche anche sul tuo telefono e premi **Manda una prova a me**.

In **Altre impostazioni** puoi copiare di nuovo codice e configurazione, cambiare l'indirizzo, spegnere le notifiche (Invita torna a mandare il link) o fare chiavi nuove. Le chiavi nuove servono solo se pensi che qualcuno abbia visto la configurazione: dopo vanno copiate di nuovo su Cloudflare e il servizio va ricollegato; i telefoni si aggiornano da soli.

## Il profilo

- Ognuno scrive il nome una volta nella pagina iniziale. Resta salvato su quel telefono e vale per tutti i giochi e per la classifica.
- **Codice di recupero (consigliato a tutti, indispensabile per l'amministratore):** nel profilo premi **Codice di recupero**: compare un codice di 10 caratteri che non scade. Scrivilo nelle note del telefono. Se cambi telefono, perdi l'icona o ti accorgi di essere rientrato da zero, scrivilo in **Ho un codice** (oppure, davanti alla schermata del codice del gruppo, in **Ho già giocato: riprendi il mio nome**): torni la stessa persona, con nome, classifica e, se lo eri, amministrazione. **Cambia codice** ne crea uno nuovo e il vecchio smette di valere. Non darlo a nessuno.
- **Cambiare telefono con il vecchio ancora in mano:** sul telefono vecchio premi **Collega un altro telefono**: compare un codice di 6 caratteri, valido 10 minuti. Sul telefono nuovo scrivilo in **Ho un codice**. Da quel momento i due telefoni hanno lo stesso nome e la stessa classifica.
- Su iPhone l'icona sulla schermata Home e Safari contano come due telefoni diversi, e rimettere l'icona ne crea uno nuovo: collegali con uno dei due codici.
- Se il codice di recupero non c'è e il telefono è perso, l'amministratore può unire le due persone dal pannello (**Unisci a un altro**).
- Senza console di Firebase si recupera tutto con il codice. Se hai perso anche l'amministrazione senza avere il codice: in Firebase, **Realtime Database → Dati**, elimina il nodo `admins`, apri subito `admin.html` e premi il tasto per diventare amministratore, poi unisci le due persone con lo stesso nome.

## La classifica

- In ogni partita prendi 1 punto per ogni avversario che hai battuto. A parità contano le vittorie, poi chi ha giocato meno partite. In Giro palla conta l'ordine di uscita: chi resta in campo per ultimo arriva primo.
- C'è la classifica generale e quella di ogni gioco, per sempre, per quest'anno o per questo mese. Per ogni gioco c'è anche il record: la rosa che vale di più a FantaBusta (in milioni di euro), il punteggio più alto a Nomi, cose, città, la vincita più alta al Milionario del Quiz, il numero più alto di risposte giuste in una partita di Giro palla.
- Una partita entra in classifica appena finisce. Le partite di FantaBusta finite prima di questo aggiornamento entrano quando uno dei partecipanti apre la pagina di FantaBusta.
- Per togliere un giocatore di prova con le sue partite usa **Cancella** nel pannello di amministrazione. Per togliere una sola partita di prova: in Firebase apri **Realtime Database → Dati → results** e cancella la voce con il codice di quella partita.

## FantaBusta: valori dei giocatori e asta

- Ogni giocatore vale il suo valore di mercato su Transfermarkt, in milioni di euro. Alla fine si sommano i valori dei titolari: vince la rosa che vale di più. Le offerte all'asta restano in fantamilioni (FM).
- Se il giocatore estratto può andare a una squadra sola, perché le altre quel ruolo l'hanno già completo, non si apre la busta: va a lei subito per 1 FM («senza busta»). Così chi resta da solo su un ruolo prende il primo che esce.
- I giocatori che su Transfermarkt non hanno una valutazione non vengono estratti.
- **Aggiorna i valori**, nella pagina di FantaBusta, scarica da Transfermarkt i valori di oggi e li salva nel database per tutti. Ci vuole circa mezzo minuto; dopo un aggiornamento il tasto si ferma per qualche minuto.
- Ogni lunedì mattina presto i valori si aggiornano da soli, da GitHub. Per aggiornarli subito da lì: scheda **Actions** del repository → **Aggiorna valori Transfermarkt** → **Run workflow**. Se il telefono dice che Transfermarkt non risponde, il tasto **Apri GitHub** porta a quella pagina.
- Una partita usa i valori del momento in cui parte l'asta: un aggiornamento durante la partita non la cambia. Le partite giocate prima di questo aggiornamento tengono i loro punti.
- Transfermarkt non ha un servizio pubblico ufficiale per questi dati: il gioco legge gli stessi che usa il suo sito. Se un giorno Transfermarkt cambia qualcosa, l'aggiornamento può smettere di funzionare: i valori restano gli ultimi scaricati.

## Nomi, cose, città

1. Chi organizza sceglie le categorie (anche sue), quanti giocatori al massimo, come esce la lettera (a caso, la sceglie lui o a turno), le manche (3, 5, 8 o 10) e il tempo di ogni manche (da 1 a 3 minuti).
2. A ogni manche si scrive una parola per categoria che comincia con la lettera uscita.
3. Chi completa tutte le categorie può premere **STOP**: agli altri restano 10 secondi.
4. Poi si vedono le risposte di tutti. Una parola bocciata con **Non vale** dalla maggioranza degli altri giocatori fa 0.
5. Punti: 10 se la parola l'hai scritta solo tu, 5 se un altro ha scritto la stessa parola o una molto simile (singolare e plurale, una lettera sbagliata, il cognome con o senza il nome). Le parole che non cominciano con la lettera fanno 0.
6. Doppia iniziale: se ogni parola della risposta comincia con la lettera (con la M: Marco Mengoni), i punti raddoppiano.
7. Se il gioco sbaglia il conto, per esempio prende per uguali due parole diverse o non vede una doppia iniziale, in revisione toccate i punti della risposta (sono sottolineati) e scegliete **5**, **10** o **20**; **Come prima** rimette quelli del gioco. Può correggere chiunque, anche le proprie risposte, e accanto si vede chi l'ha fatto; vale l'ultima correzione. Le parole bocciate dalla maggioranza restano a 0.
8. Se il telefono di chi organizza si chiude, la partita va avanti lo stesso: la guida passa da sola a un altro giocatore.

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

## Quiz

Chi crea la partita sceglie:

- **Il gioco:** «Milionario» oppure «Corsa dei cavalli».
- **Il livello:** elementari, medie, superiori, oppure **a salire** (si comincia dalle elementari e si arriva alle superiori).
- **Le materie**, una o più: geografia, storia, italiano, matematica, scienze e natura, arte e letteratura, intrattenimento (cinema, cartoni, musica, TV, fumetti, videogiochi), sport e tempo libero. Le domande girano tra le materie scelte, mai la stessa due volte di fila.
- Ognuno per sé, a squadre o da soli per allenarsi (da soli non entra in classifica), il tempo per rispondere e, nella corsa, la distanza del traguardo.

Tutti rispondono alla stessa domanda, ognuno sul suo telefono: si tocca una risposta, che si illumina d'oro, e si conferma con il tasto arancione in basso oppure toccandola di nuovo: a quel punto diventa arancione e non si cambia più. Se scade il tempo con una risposta scelta ma non confermata, vale quella. Quando hanno risposto tutti si passa subito alla risposta giusta, che si accende di verde.

**Milionario**

1. Quindici domande, da 100 € a un milione. Chi sbaglia esce e si porta a casa la cifra al sicuro: 1.000 € dopo la 5ª domanda giusta, 32.000 € dopo la 10ª.
2. **Mi ritiro** (va confermato) fa uscire tenendo quello che si è già vinto. Se il tempo finisce senza risposta, ci si ritira con quello che si ha.
3. Due aiuti, una volta sola ciascuno: **50:50** toglie due risposte sbagliate; **il pubblico** mostra le percentuali di voto della sala, che nelle domande più difficili ogni tanto sbaglia.
4. Dopo ogni risposta si vede la scala dei premi con il punto in cui si trova ognuno. Vince chi porta a casa di più.

**Corsa dei cavalli**

1. Ognuno ha il suo cavallo. Risposta giusta: 3 passi avanti. Sbagliata: 2 passi indietro (non si va sotto la partenza). Con **Passo** o senza risposta si resta fermi.
2. Vince chi arriva per primo al traguardo (15, 24 o 36 passi). Qui non ci sono aiuti.
3. La corsa dura al massimo 40 domande: se nessuno arriva, vince chi è più avanti.

**A squadre** i compagni rispondono insieme: vale la prima risposta confermata da qualcuno della squadra, e aiuti, vincite e passi sono in comune.

Le domande della partita le prepara il telefono di chi la fa partire, evitando quelle uscite di recente su quel telefono. La matematica cambia numeri ogni volta.

## Giro palla

Chi crea la partita sceglie:

- **Cosa vale:** calciatori e squadre, solo calciatori oppure solo squadre (club e nazionali).
- **Il tempo per rispondere:** 10, 15, 20, 25 o 30 secondi.
- **Le vite:** 1, 2 o 3. Con una vita il primo errore è un rosso diretto; con due arriva prima un giallo e poi il rosso; con tre, due gialli e poi il rosso.
- Ognuno per sé, a squadre (da 2 a 4) o da soli per allenarsi (da soli non entra in classifica), e quanti giocatori al massimo.

1. Il tabellone gira ed esce una lettera. Chi è di turno scrive un calciatore o una squadra che comincia con quella lettera e preme **Gioca** (o Invio). Le lettere più difficili (Q, X, Y) non escono.
2. Per i calciatori conta il **cognome**: con la M vale Maldini o Paolo Maldini, non Mario Balotelli. Basta anche solo il cognome. Chi è famoso con un nome solo vale anche con quello: Pelé con la P, Ronaldinho con la R.
3. Per le squadre conta il nome: Milan, Manchester United, Real Madrid con la R. Valgono i soprannomi più comuni (Juve, Inter, Barça). Le nazionali si scrivono in italiano (Olanda, Messico).
4. Risposta giusta: il turno passa al prossimo, con la stessa lettera.
5. Cartellino, e una vita in meno, a chi scrive un nome che non comincia con la lettera, a chi ripete un nome già detto in questa partita (anche se era uscito con un'altra lettera) e a chi resta senza tempo. Poi esce una lettera nuova e riparte chi ha sbagliato. Sotto il cartellino il gioco suggerisce qualche nome che si poteva dire.
6. Il gioco perdona i piccoli errori di battitura (Dibala per Dybala). Se scrivi un nome che non conosce, gli altri votano **Vale** o **Non vale**: a parità vale.
7. Finite le vite si esce. Vince chi resta in campo per ultimo. Il numero accanto a ogni nome conta le risposte giuste.
8. **A squadre** risponde chi vuole della squadra di turno e le vite sono in comune.
9. **Da soli** si va avanti finché si sbaglia: conta quante risposte giuste dai. **Allenati ancora** ne fa partire subito un'altra.
10. Alla fine, **Tutti i giri** mostra le risposte e il cartellino di ogni giro.

L'elenco dei calciatori e delle squadre è nel file `calciatori.json`: ogni telefono lo scarica quando apre il gioco.

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
- Le regole del database rifiutano risposte e buste fuori tempo, a nome di altri o dopo la chiusura della manche, messaggi della chat di chi non gioca o a nome di altri, e voti doppi o di chi non è in partita.
- Gli ultimi accessi (quando e in quale pagina) e il tempo di gioco li legge solo l'amministratore; nessun altro dato del telefono viene salvato.
- Per le notifiche ogni telefono salva l'indirizzo che il suo browser usa per riceverle. Lo leggono i telefoni del gruppo, perché il servizio inviti lo usa con l'accesso di chi invita; da solo non serve a mandare niente senza la chiave segreta, che è solo su Cloudflare e nel database, dove la legge solo l'amministratore. Il servizio rispetta le regole del database, codice del gruppo compreso, e scrive solo il nome di chi invita, il gioco e il codice della partita.
- Senza codice del gruppo chiunque abbia l'indirizzo può giocare. Con il codice attivo le regole del database non fanno leggere né scrivere niente a un telefono che non è entrato: le pagine si aprono, perché il sito su GitHub è pubblico, ma restano vuote. Il codice è valido finché nessuno lo passa in giro: se succede, cambialo.
- I valori di FantaBusta li può aggiornare chiunque giochi, al massimo ogni due minuti, e le regole accettano solo un elenco completo di valori. L'aggiornamento da GitHub entra nel database come un nuovo utente anonimo ogni volta: in Firebase, sotto **Authentication → Users**, è normale vederne uno in più ogni settimana. Con il codice del gruppo attivo entra con la chiave `CHIAVE_PPGAMES` e alla fine si toglie da solo dall'elenco dei telefoni del gruppo.
- Le parole di Scovaparole vengono dal dizionario italiano di OpenOffice e LibreOffice (licenza GPL 3, vedi `LICENZA-dizionario.txt`).
- Il gioco non ha un server suo che custodisca risposte e buste: chi è pratico degli strumenti per sviluppatori del browser, da PC, potrebbe sbirciare (anche le risposte giuste del Quiz). Dal telefono non si vedono. In Giro palla è il telefono di chi risponde a controllare il nome: tra amici funziona, ma non è una gara con l'arbitro.
