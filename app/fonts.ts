import localFont from "next/font/local";

/**
 * Self-hosted fonts (next/font/local). No Google Fonts CDN at runtime.
 * Files are subset to Latin + Italian glyphs and shipped as woff2.
 *
 * Roles (see DESIGN.md):
 *   display -> Anybody, variable (wdth 50-150 / wght 100-900). Used expanded.
 *   body    -> Space Grotesk, variable weight.
 *   mono    -> Space Mono, panel microcopy / numbers / prices.
 *
 * TODO (paid, if licensed): swap `--font-display` to Monument Extended or
 * Right Grotesk Wide by replacing the file below. Nothing else needs to change.
 */

export const display = localFont({
  src: [
    {
      path: "./fonts/Anybody-var.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
  preload: true,
});

export const body = localFont({
  src: [
    {
      path: "./fonts/SpaceGrotesk-var.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

export const mono = localFont({
  src: [
    {
      path: "./fonts/SpaceMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SpaceMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  preload: false,
});
