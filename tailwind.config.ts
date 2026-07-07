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
        // Channel-based so the /opacity modifier works (e.g. bg-teal/70).
        // Raw-CSS and WebGL consumers keep reading the hex vars in globals.css.
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        "paper-pure": "rgb(var(--paper-pure-rgb) / <alpha-value>)",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft-rgb) / <alpha-value>)",
        "ink-mute": "rgb(var(--ink-mute-rgb) / <alpha-value>)",
        teal: "rgb(var(--teal-rgb) / <alpha-value>)",
        "teal-text": "rgb(var(--teal-text-rgb) / <alpha-value>)",
        aqua: "rgb(var(--aqua-rgb) / <alpha-value>)",
        deep: "rgb(var(--deep-rgb) / <alpha-value>)",
        frost: "rgb(var(--frost-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
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
