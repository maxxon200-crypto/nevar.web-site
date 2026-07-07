import { site, owner } from "@/data/site";

/** LocalBusiness / ProfessionalService structured data. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#studio`,
    name: site.name,
    alternateName: "nevar web studio",
    description: site.shortDescription,
    url: site.url,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/logo.svg`,
    inLanguage: "it",
    knowsLanguage: ["it"],
    priceRange: "€€",
    slogan: "Bianco, veloce, fatto a mano.",
    areaServed: site.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "Lombardia",
      addressCountry: "IT",
    },
    founder: {
      "@type": "Person",
      name: owner.name,
    },
    makesOffer: [
      {
        "@type": "Offer",
        name: "Sviluppo Web",
        priceCurrency: "EUR",
        price: "690",
        description:
          "Siti web su misura, dalla vetrina one-page al progetto bespoke con WebGL e motion.",
      },
      {
        "@type": "Offer",
        name: "Sviluppo App",
        priceCurrency: "EUR",
        price: "6900",
        description:
          "App iOS e Android cross-platform con Expo e React Native, backend e dashboard.",
      },
      {
        "@type": "Offer",
        name: "Nevar Care",
        priceCurrency: "EUR",
        price: "49",
        description:
          "Manutenzione, aggiornamenti, hosting gestito, backup e monitoraggio.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
