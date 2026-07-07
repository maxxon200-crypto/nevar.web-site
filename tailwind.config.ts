import type { Config } from "tailwindcss";

/**
 * nevar.web design tokens.
 * The palette lives as CSS custom properties in app/globals.css so that raw CSS,
 * WebGL and Tailwind all read the exact same source of truth. Here we only expose
 * them to the utility layer.
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
        paper: "var(--paper)",
        "paper-pure": "var(--paper-pure)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-mute": "var(--ink-mute)",
        teal: "var(--teal)",
        "teal-text": "var(--teal-text)",
        aqua: "var(--aqua)",
        deep: "var(--deep)",
        frost: "var(--frost)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "24px",
        "card-lg": "28px",
        pill: "999px",
      },
      boxShadow: {
        // Cold, soft shadows only. Never hard black.
        glass: "0 1px 0 0 rgba(255,255,255,0.55) inset, 0 24px 60px -24px rgba(39,121,167,0.28)",
        "glass-sm": "0 1px 0 0 rgba(255,255,255,0.5) inset, 0 12px 30px -18px rgba(39,121,167,0.24)",
        lift: "0 30px 80px -30px rgba(11,20,22,0.16)",
        cta: "0 10px 30px -10px rgba(0,158,201,0.5)",
      },
      backdropBlur: {
        glass: "20px",
      },
      letterSpacing: {
        panel: "0.24em",
        wide2: "0.14em",
      },
      maxWidth: {
        shell: "1240px",
        prose2: "72ch",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "float-slow": "float-slow 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
