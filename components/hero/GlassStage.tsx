"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import HeroPoster from "./HeroPoster";

// WebGL is client-only and lazy: it never ships in the server HTML and only
// compiles when we decide the device should run it.
const GlassOrb = dynamic(() => import("./GlassOrb"), {
  ssr: false,
  loading: () => null,
});

type Caps = { webgl: boolean; reduce: boolean; lowEnd: boolean };

export default function GlassStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [caps, setCaps] = useState<Caps>({
    webgl: false,
    reduce: false,
    lowEnd: true,
  });
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(false);
  const [manual, setManual] = useState(false);

  // One-time capability probe.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const small = window.matchMedia("(max-width: 820px)").matches;
    const lowCPU = (navigator.hardwareConcurrency || 8) <= 4;
    const dm = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const lowMem = typeof dm === "number" ? dm <= 4 : false;

    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(
        c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl")
      );
    } catch {
      webgl = false;
    }

    setCaps({ webgl, reduce, lowEnd: small || lowCPU || lowMem });
  }, []);

  // Mount only while in the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const capable = caps.webgl && !caps.reduce && !caps.lowEnd;

  // Auto-activate on capable devices, deferred to idle so it never blocks LCP.
  useEffect(() => {
    if (!capable || !inView || active) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const schedule =
      w.requestIdleCallback || ((cb: () => void) => window.setTimeout(cb, 500));
    const id = schedule(() => setActive(true), { timeout: 1400 });
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id as number);
    };
  }, [capable, inView, active]);

  const showCanvas = (active || manual) && inView;
  // Offer manual opt-in only when WebGL exists, motion is allowed, and we chose
  // the poster by default for performance (mobile / low-end).
  const offerOptIn = caps.webgl && !caps.reduce && caps.lowEnd && !manual;

  return (
    <div ref={ref} className="relative h-full w-full">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          showCanvas ? "opacity-0" : "opacity-100"
        }`}
      >
        <HeroPoster className="h-full w-full drop-shadow-[0_30px_60px_rgba(39,121,167,0.18)]" />
      </div>

      {showCanvas ? (
        <div className="absolute inset-0 animate-[fade-up_1s_cubic-bezier(0.22,1,0.36,1)_both]">
          <GlassOrb />
        </div>
      ) : null}

      {offerOptIn ? (
        <button
          type="button"
          onClick={() => setManual(true)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-pill border border-frost/60 bg-white/60 px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft backdrop-blur-md transition hover:border-teal"
        >
          Attiva effetto vetro
        </button>
      ) : null}
    </div>
  );
}
