/**
 * Central site configuration and business facts.
 * Placeholders to complete before launch are marked with [ ... ] and listed
 * in DESIGN.md under "Placeholder da completare".
 */

export const site = {
  name: "nevar.web",
  legalName: "nevar.web",
  shortDescription:
    "Studio di design e sviluppo a Milano. Siti web e app su misura per attività locali e clienti che curano il dettaglio.",
  // Update to the real production domain before deploy.
  url: "https://nevar.web",
  domain: "nevar.web",
  locale: "it_IT",
  lang: "it",
  city: "Milano",
  country: "Italia",
  areaServed: ["Milano", "Lombardia", "Italia"],
  email: "nevar.web@gmail.com",
  // Base mailto (no query) - the contact form appends its own subject + body.
  emailHref: "mailto:nevar.web@gmail.com",
  // Prefilled subject used by the static email links (header/footer/contact).
  emailSubject: "Richiesta preventivo nevar.web",
  // Alternative: open Gmail's web compose window instead of the OS mail client.
  // Swap it into components/ui/EmailLink.tsx if you prefer that behaviour.
  emailComposeHref:
    "https://mail.google.com/mail/?view=cm&fs=1&to=nevar.web@gmail.com&su=Richiesta%20preventivo",
  founded: "2025",
} as const;

/**
 * Persona fisica senza Partita IVA. Il nome è fornito; l'indirizzo resta un
 * segnaposto opzionale usato solo nella Privacy Policy. I dati di pagamento
 * (IBAN, codice fiscale) non sono esposti sul sito pubblico.
 */
export const owner = {
  name: "Rocco Maruotti",
  address: "[INDIRIZZO (opzionale)]",
} as const;

export const nav = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Servizi", href: "#servizi" },
  { label: "Prezzi", href: "#prezzi" },
  { label: "Metodo", href: "#metodo" },
  { label: "Contatto", href: "#contatto" },
] as const;

/** Panel coordinate used decoratively in the hero. Milano, Duomo. */
export const coordinates = "45.4642° N, 9.1900° E";

export const lastUpdated = "07 luglio 2026";
