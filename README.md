# The-Movie-Catalog

The Online Movie Catalog

1 Premessa
La specifica del problema che deve essere affrontato è per sua natura incompleta e può essere ambigua. 
Il candidato deve essere in grado di valutare eventuali soluzioni alternative e giustificare le scelte 
implementative adottate. Le motivazioni delle scelte fatte vanno inoltre documentate nel progetto.

Il lavoro consiste di cinque fasi principali: 
i) analisi dei requisiti; 
ii) identificazione delle funzionalità da sviluppare; 
iii) progettazione della struttura e della presentazione delle pagine web; 
iv) progettazione della sorgente di informazioni statica o dinamica; 
v) implementazione dell’applicazione stessa.
 
 
2 Requisiti
Il progetto si pone l’obiettivo di sviluppare l’applicazione web The Online Movie Catalog che implementa 
un sito di gestione catalogo e ordinazione di film online. The Online Movie Catalog gestisce il processo 
di organizzazione dei palinsesti cinematografici di più negozi online e l’ordinazione dei film all’interno di un portale online di videostreaming.
E composto di due macro-scenari principali:
  – gestione del palinsesto 
  – gestione degli ordini.

Esistono due tipologie di utenti: negoziante e cliente. Di seguito sono analizzate in dettaglio le 
caratteristiche dei due macro-scenari introdotti. 

1) Il primo macro-scenario (gestione del palinsesto) 
consiste nella gestione dei film dalla pubblicazione del catalogo alla vendita. Gli utenti negozianti 
devono potersi collegare all’applicazione, modificare i propri dati/preferenze e cancellarsi. 
Per ogni negoziante si dovranno gestire informazioni quali nome del negozio, numero di telefono, 
partita iva, indirizzo, recensioni, etc. Un negoziante, una volta registrato, può collegarsi 
all’applicazione e inserire i prodotti in vendita selezionandoli da una lista comune a tutti i negozianti.
Questa lista è da acquisire tramite il portale The Movie DB (https://www.themoviedb.org/ 
tramite l’accesso API con la metodologia REST). Per ogni prodotto (film) in vendita dovranno 
essere gestite le informazioni principali quali titolo, attori, regista, genere e anno di pubblicazione, 
inoltre dovrà essere presente una foto illustrativa (locandina) il cui riferimento è sempre reperibile 
tramite API. Un venditore, successivamente, può collegarsi all’applicazione e 
modificare/cancellare prodotti esistenti di cui è responsabile.

2) Il secondo scenario (gestione degli ordini) consiste nella classica gestione delle attività
dei clienti all’interno di un’applicazione di ordini online. 
I clienti devono potersi registrare, modificare i propri dati/preferenze, cancellarsi. 
Per ogni utente si devono memorizzare informazioni personali (ad es., nome, cognome) e informazioni relative all’account generato. Al cliente vengono anche associate informazioni riguardanti il meccanismo di pagamento dei prodotti (ad es., carta di credito o carta prepagata). Inoltre, in fase di registrazione gli utenti possono selezionare delle preferenze (tra le quali quelle di privacy e relative all’applicazione) per la personalizzazione dei servizi (ad es., offerte speciali in bacheca per la tipologia di genere preferito). In questo scenario, gli utenti registrati (min 2) possono fare login al sito, selezionare un film di interesse, aggiungerlo al carrello e concludere il pagamento dei film nel carrello.

Al momento del pagamento dell’ordine l’utente può essere decidere tra due modalità:
  – acquisto perpetuo: il film acquisito sarà sempre disponibile tra i film disponibili per la visione del
    cliente;
  – noleggio: il film pagato dal cliente sarà disponibile nel film visibili dal cliente solo per 72h dal
    giorno dell’acquisto; successivamente, rimarrà in elenco ma sarà indicato come non disponibile per la
    visione.
 
# Operazioni obbligatorie
Le operazioni base che devono essere presentate al momento della discus- sione del progetto sono le seguenti:
– Visualizzazione di informazioni relative ai film, ai clienti e ai negozianti registrati, agli acquisti.
– Visualizzazione dei film.
– Ricerca dei film (ad es., tipologia, nome, attori, enere).
– Login al sito e acquisto di un film a scelta.
– Visualizzazione degli acquisti presenti e passati per un cliente.
– Visualizzazione statistiche per negoziante.
– Gestione del palinsesto del negoziante con aggiunta/modifica/cancellazione dei prodotti.

Allo startup dell’applicazione, tutti i dati necessari devono essere disponibili (in formato XML o JSON), memorizzati nel web storage e visualizzati nell’applicazione web.
Le operazioni in questa sezione sono quelle che tutti i gruppi (indipendentemente dalla loro composizione) devono presentare all’esame. Operazioni e funzionalità aggiuntive possono essere implementate a piacere. Le pagine web devono essere implementate utilizzando HTML5, CSS3 e JavaScript, e devono seguire un paradigma di separazione tra la struttura (HTML5) e la rappresentazione (CSS3) della pagina web.
Le informazioni visualizzate all’interno delle pagine del sito web de- vono essere memorizzate e accedute nel web storage del browser in formato XML o JSON. Devono essere perciò previste operazioni per la presentazione e modifica delle informazioni.
    
# Operazioni aggiuntive per gruppi di 2 persone
In aggiunta alle operazioni base, gruppi di due persone devono sviluppare le seguenti operazioni aggiuntive:
– Fornire le funzionalit ́a di review di un film (un numero interno compreso tra 0 e 5 stelle) per ogni utente finale registrato e dopo aver verificato che i dati inseriti siano corretti, postarlo tramite API REST (PUT/UPDATE) sul portale di The Movie DB (https: //www.themoviedb.org/).
– Gestire tutte i tipi di risposte (anche quelle con HTTP STATUS 4xx) ottenute tramite API REST dal portale The Movie DB.
– Bacheca con prodotti suggeriti sulla base dello storico degli acquisti e/o del profilo utente.

Tutti i prodotti devo essere resi disponibili attraverso un server Web o una applicazione REST. Allo startup dell’applicazione, tutti i film (in for- mato XML o JSON) devono essere scaricati dal server web/applicazione REST, memorizzati nel web storage, e visualizzati nell’applicazione web. Un venditore deve essere in grado di aggiungere nuovi film, modificare e cancellare prodotti esistenti direttamente sul server Web/applicazione REST.

