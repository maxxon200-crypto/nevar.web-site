/**
 * Central site configuration and business facts.
 * Placeholders to complete before launch are listed in DESIGN.md.
 */

export const site = {
  name: "nevar.web",
  legalName: "nevar.web",
  shortDescription:
    "Progetto siti per studi di architettura e interior design. Non vetrine mute: strumenti che portano richieste di contatto. Milano.",
  // Update to the real production domain before deploy.
  url: "https://nevar.web",
  domain: "nevar.web",
  locale: "it_IT",
  lang: "it",
  city: "Milano",
  country: "Italia",
  areaServed: ["Milano", "Lombardia", "Italia"],
  email: "nevar.web@gmail.com",
  // Base mailto (no query) - links append their own subject.
  emailHref: "mailto:nevar.web@gmail.com",
  // Prefilled subject used by every static email link.
  emailSubject: "Richiesta preventivo nevar.web",
  founded: "2025",
} as const;

/**
 * Persona fisica senza Partita IVA. L'indirizzo resta un segnaposto opzionale
 * usato solo nella Privacy Policy. Nessun dato di pagamento sul sito pubblico.
 */
export const owner = {
  name: "Rocco Maruotti",
  address: "[INDIRIZZO (opzionale)]",
} as const;

export const nav = [
  { label: "Lavori", href: "#lavori" },
  { label: "Metodo", href: "#metodo" },
  { label: "Contatto", href: "#contatto" },
] as const;

export const lastUpdated = "12 luglio 2026";
