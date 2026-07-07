import type { Metadata, Viewport } from "next";
import "./globals.css";
import { archivo, geist } from "./fonts";
import { site } from "@/data/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CookieBanner from "@/components/cookie/CookieBanner";
import JsonLd from "@/components/seo/JsonLd";

export const viewport: Viewport = {
  themeColor: "#f4f7f7",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "nevar.web, studio di siti web e app a Milano",
    template: "%s · nevar.web",
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: "nevar.web" }],
  creator: "nevar.web",
  keywords: [
    "studio web Milano",
    "sviluppo siti web",
    "sviluppo app",
    "web design Milano",
    "siti su misura",
    "React Native",
    "Next.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "nevar.web, studio di siti web e app a Milano",
    description: site.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "nevar.web, studio di siti web e app a Milano",
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
      className={`${archivo.variable} ${geist.variable}`}
    >
      <body className="font-body antialiased">
        {/* Enable JS-only reveal hiding before paint (no flash, works without JS). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />

        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-teal focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:text-white"
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
