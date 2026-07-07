import { Archivo, IBM_Plex_Mono } from "next/font/google";

/**
 * Type system (see DESIGN.md).
 *
 *   Archivo (variable, wdth axis) -> one family, two roles:
 *     - display  : weight 800, font-variation-settings "wdth" 125 (Expanded)
 *     - body     : weight 400, font-variation-settings "wdth" 100
 *   IBM Plex Mono (400 / 600)     -> labels, numbers, prices, panel microcopy.
 *
 * Fonts are fetched at build time and self-hosted by next/font (no runtime CDN).
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

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
