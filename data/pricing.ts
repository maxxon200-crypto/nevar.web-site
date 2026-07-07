/**
 * Pricing tiers. Numbers are rendered in the mono font, currency in euro.
 * "da €X" where the price is a starting point.
 */

export type Tier = {
  id: string;
  code: string; // BASE / PRO / MAX
  name: string; // "Vetrina", "Studio", "Su Misura"
  price: string; // formatted, mono
  from: boolean; // show "da"
  tagline: string;
  featured?: boolean;
  features: string[];
  footnote: string;
};

export const tiers: Tier[] = [
  {
    id: "base",
    code: "BASE",
    name: "Vetrina",
    price: "690 €",
    from: false,
    tagline: "Per chi deve esistere online bene e subito.",
    features: [
      "Sito one-page su misura",
      "Mobile-first, ottimizzazione velocità",
      "Form di contatto",
      "SEO di base",
      "Consegna rapida",
    ],
    footnote: "Il minimo indispensabile, fatto per bene.",
  },
  {
    id: "pro",
    code: "PRO",
    name: "Studio",
    price: "1.690 €",
    from: false,
    tagline: "Il più scelto per chi vuole acquisire clienti.",
    featured: true,
    features: [
      "Sito multi-pagina, fino a 6 pagine",
      "CMS per aggiornare i contenuti da solo",
      "Copywriting e SEO avanzata",
      "Animazioni e transizioni allo scroll",
      "Integrazioni: Maps, WhatsApp, form",
    ],
    footnote: "La scelta di chi prende il web sul serio.",
  },
  {
    id: "max",
    code: "MAX",
    name: "Su Misura",
    price: "3.900 €",
    from: true,
    tagline: "Un sito che sembri fatto da un'agenzia da 50 persone.",
    features: [
      "Progetto su misura, design system dedicato",
      "WebGL e animazioni su misura",
      "Identità completa e integrazioni custom",
      "Priorità in coda",
      "Accompagnamento fino al lancio",
    ],
    footnote: "Quando il sito è il biglietto da visita.",
  },
];

/** Standalone offerings shown beside the tiers. */
export const extraOffers = [
  {
    id: "app",
    code: "APP",
    name: "Sviluppo App",
    price: "6.900 €",
    from: true,
    tagline: "iOS e Android, su preventivo.",
    detail:
      "App cross-platform (Expo / React Native), backend, autenticazione, dashboard. MVP funzionante in poche settimane, preventivo in base alle funzionalità.",
  },
  {
    id: "care",
    code: "CARE",
    name: "Nevar Care",
    price: "49 €",
    from: true,
    unit: "/ mese",
    tagline: "Il sito resta vivo.",
    detail:
      "Manutenzione, aggiornamenti, hosting gestito, piccole modifiche, backup e monitoraggio. Un canone leggero perché il progetto non invecchi da solo.",
  },
] as const;

/** Payment terms (fase senza Partita IVA). */
export const payment = {
  methods: ["Bonifico bancario", "PayPal"],
  deposit: "Acconto 40% all'avvio, saldo alla consegna.",
  note:
    "Le prestazioni sono fatturate tramite ricevuta di prestazione occasionale (attività non abituale, senza Partita IVA).",
  noCheckout:
    "Nessun checkout automatico in questa fase: il pagamento si concorda via email dopo il preventivo.",
};
