import { site, owner } from "@/data/site";

/**
 * ProfessionalService structured data, aligned to the positioning: websites
 * for architecture and interior design studios. No prices anywhere.
 */
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
    logo: `${site.url}/logo.svg`,
    knowsLanguage: ["it"],
    serviceType: "Siti web per studi di architettura e interior design",
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
