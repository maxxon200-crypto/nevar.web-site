import type { Metadata, Viewport } from "next";
import "./globals.css";
import { serif, sans } from "./fonts";
import { site } from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CookieBanner from "@/components/cookie/CookieBanner";
import JsonLd from "@/components/seo/JsonLd";

const TITLE =
  "nevar.web · Siti web per studi di architettura e interior design | Milano";

export const viewport: Viewport = {
  themeColor: "#F6F5F2",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s · nevar.web",
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: "nevar.web" }],
  creator: "nevar.web",
  keywords: [
    "siti web per studi di architettura",
    "siti web interior design",
    "web design Milano",
    "sito studio di architettura",
    "portfolio architettura online",
    "nevar.web",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: TITLE,
    description: site.shortDescription,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: site.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-2.5 focus:font-sans focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-paper"
        >
          Salta al contenuto
        </a>

        <Header />

        <SmoothScroll>{children}</SmoothScroll>

        <Footer />
        <CookieBanner />
        <JsonLd />
      </body>
    </html>
  );
}
