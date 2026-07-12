import { Instrument_Serif, Manrope } from "next/font/google";

/**
 * Type system (see DESIGN.md). Two families, nothing else.
 *
 *   Instrument Serif (400, normal + italic) -> wordmark, headings, quotes.
 *     The italic is reserved for the keyword of a title, colored --slate.
 *   Manrope (400/500/600/700)               -> everything else: body, menu,
 *     labels, form, buttons.
 *
 * Both are fetched at build time by next/font/google and self-hosted.
 * No runtime CDN.
 */
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["system-ui", "sans-serif"],
});
