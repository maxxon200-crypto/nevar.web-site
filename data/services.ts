/**
 * High-level offering families shown in the "Servizi" section.
 * Pricing detail (the base/pro/max tiers) lives in data/pricing.ts.
 */

export type Service = {
  id: string;
  index: string;
  kind: string; // mono eyebrow
  title: string;
  summary: string;
  points: string[];
  priceHint: string;
};

export const services: Service[] = [
  {
    id: "web",
    index: "01",
    kind: "SVILUPPO WEB",
    title: "Siti su misura",
    summary:
      "Dalla vetrina one-page al progetto su misura con animazioni e WebGL. Costruiti a mano, veloci, pensati per convertire.",
    points: [
      "Mobile-first, ottimizzati per velocità e Core Web Vitals",
      "CMS quando serve aggiornare i contenuti in autonomia",
      "SEO tecnica, copywriting e integrazioni (Maps, WhatsApp, form)",
    ],
    priceHint: "da 690 €",
  },
  {
    id: "app",
    index: "02",
    kind: "SVILUPPO APP",
    title: "App iOS e Android",
    summary:
      "Applicazioni cross-platform con Expo e React Native: backend, autenticazione, dashboard. Un MVP funzionante in poche settimane.",
    points: [
      "Un'unica base di codice per iOS e Android",
      "Backend, autenticazione e pannello di gestione",
      "Preventivo su misura in base alle funzionalità",
    ],
    priceHint: "da 6.900 €",
  },
  {
    id: "care",
    index: "03",
    kind: "NEVAR CARE",
    title: "Il sito resta vivo",
    summary:
      "Manutenzione continua, aggiornamenti, hosting gestito, backup e monitoraggio. Piccole modifiche incluse: il progetto non invecchia da solo.",
    points: [
      "Aggiornamenti, backup e monitoraggio costante",
      "Hosting gestito e piccole modifiche incluse",
      "Un riferimento diretto, senza ticket anonimi",
    ],
    priceHint: "da 49 € / mese",
  },
];
