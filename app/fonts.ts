import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";

/**
 * Type system (see DESIGN.md).
 *
 *   Archivo (variable, wdth axis) -> display only:
 *     - display  : weight 800, font-variation-settings "wdth" 125 (Expanded)
 *   Geist (variable)              -> body, UI and navigation text (400 / 500).
 *   IBM Plex Mono (400 / 600)     -> labels, numbers, prices, panel microcopy.
 *
 * Archivo and IBM Plex Mono are fetched at build time by next/font/google; Geist
 * ships as a ready, self-hosted next/font object from Vercel's official `geist`
 * package (its own CSS variable is --font-geist-sans). No runtime CDN in any case.
 * The `wdth` axis is what gives us the Expanded display look without a second
 * font file; the width is forced per element in globals.css.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
  fallback: ["system-ui", "sans-serif"],
});

export const geist = GeistSans;

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
