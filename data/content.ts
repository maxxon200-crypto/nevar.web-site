/**
 * Home copy. Problem-first structure aimed at one client: architecture and
 * interior design studios in Italy. Informal register ("tu"), direct tone,
 * zero em dashes, no euro figures anywhere on the public site.
 */

/** Section 2 - the three problems costing the studio new projects. */
export const problems = [
  {
    title: "Lento.",
    body: "Le fotografie ad alta risoluzione affossano la velocità. Il visitatore se ne va prima di vedere il primo progetto.",
  },
  {
    title: "Fermo.",
    body: "Ogni progetto nuovo richiede uno sviluppatore. Così la galleria resta ferma a tre anni fa, e lo studio sembra fermo con lei.",
  },
  {
    title: "Invisibile.",
    body: "Chi cerca uno studio di architettura nella tua città non arriva da te. Arriva da chi il sito lo ha curato.",
  },
] as const;

/** Section 3 - what the site actually does for the studio. */
export const deliverables = [
  "Una galleria che valorizza la fotografia, aggiornabile da te senza chiamare nessuno.",
  "Posizionamento su Google per chi cerca uno studio nella tua città.",
  "Un percorso di contatto che qualifica chi ti scrive, così arrivano richieste vere e non curiosi.",
  "Velocità e accessibilità curate, perché un sito lento è un sito che perde clienti.",
] as const;

/**
 * Section 4 - case studies.
 * TODO: i campi `result` sono segnaposto. Vanno compilati da Max con DATI VERI
 * (mai inventare numeri o percentuali). Anche il testo `problem` va confermato
 * con i clienti reali prima del lancio.
 */
export const works = [
  {
    name: "Studio Costa",
    problem:
      "Fotografie eccellenti dentro un sito lento, che le mostrava piccole e sgranate. Le richieste arrivavano solo dal passaparola.",
    result: "[DA COMPILARE CON UN DATO VERO]",
  },
  {
    name: "Studio Solito",
    problem:
      "Una galleria ferma da anni: per aggiungere un progetto serviva uno sviluppatore, così i lavori nuovi restavano invisibili.",
    result: "[DA COMPILARE CON UN DATO VERO]",
  },
  {
    name: "Zarcola",
    problem:
      "Un'immagine curata dal vivo e un sito che non le rendeva giustizia: su Google non compariva, nemmeno cercandolo per nome.",
    result: "[DA COMPILARE CON UN DATO VERO]",
  },
] as const;

/** Section 5 - scope of work. Times only, NEVER prices. */
export const scope = [
  {
    name: "Essenziale",
    time: "3 a 4 settimane",
    body: "Una pagina sola, fatta bene: chi sei, cosa progetti, come ti si contatta. Per esserci in modo credibile, subito.",
  },
  {
    name: "Studio",
    time: "5 a 7 settimane",
    body: "Progetti, servizi, contatti. Aggiornabile da te, ottimizzato per la ricerca, con un percorso di contatto che qualifica.",
  },
  {
    name: "Su misura",
    time: "8 settimane o più",
    body: "Identità, contenuti, sviluppo dedicato. Quando il sito deve reggere il confronto con studi molto più grandi di te.",
  },
] as const;

export const scopeNote =
  "Ogni progetto ha un preventivo dedicato, perché nessuno studio è standard. Nella prima chiamata ti dico subito, senza giri di parole, se possiamo lavorare insieme.";

/**
 * Budget ranges for the contact form select. They qualify the request without
 * publishing prices on the site (the only figures allowed, per DESIGN.md).
 */
export const budgets = [
  "Da definire",
  "Fino a 2.000",
  "2.000-5.000",
  "5.000-10.000",
  "Oltre 10.000",
] as const;
