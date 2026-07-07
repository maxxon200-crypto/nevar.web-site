import { Archivo } from "next/font/google";
import { GeistSans } from "geist/font/sans";

/**
 * Type system (see DESIGN.md). Two families, no monospace.
 *
 *   Archivo (variable, wdth axis) -> display and prices:
 *     - display : weight 800, font-variation-settings "wdth" 125 (Expanded)
 *     - prices  : same Expanded look as the tier names
 *   Geist (variable)              -> everything else: body, UI, navigation,
 *                                    labels (500) and panel microcopy.
 *
 * Archivo is fetched at build time by next/font/google; Geist ships as a ready,
 * self-hosted next/font object from Vercel's official `geist` package (its own
 * CSS variable is --font-geist-sans). No runtime CDN in either case. The `wdth`
 * axis is what gives us the Expanded look without a second font file; the width
 * is forced per element in globals.css.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
  fallback: ["system-ui", "sans-serif"],
});

export const geist = GeistSans;
