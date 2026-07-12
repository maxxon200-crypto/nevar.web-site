import type { Config } from "tailwindcss";

/**
 * nevar.web design tokens.
 * The palette lives as CSS custom properties in app/globals.css so raw CSS and
 * Tailwind read the same source of truth. Six colors, one accent (--slate),
 * two fonts. Sharp corners everywhere; the only curves are the button pills.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Channel-based so the /opacity modifier works (e.g. bg-mid/60).
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        mid: "rgb(var(--mid-rgb) / <alpha-value>)",
        deep: "rgb(var(--deep-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        slate: "rgb(var(--slate-rgb) / <alpha-value>)",
        // 1px hairlines, always this value.
        line: "rgba(22, 25, 28, 0.12)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
      maxWidth: {
        shell: "1240px",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
