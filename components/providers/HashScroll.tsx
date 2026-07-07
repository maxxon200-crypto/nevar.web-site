"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/lenis";

/**
 * Landing on the home page with a hash (e.g. /#servizi from Privacy) should
 * scroll to that section. Next may open the page at the top before the section
 * is ready, so this runs on mount as a fallback: it waits a beat for layout and
 * Lenis to settle, then scrolls to the target. Uses Lenis when available for a
 * coherent smooth scroll, otherwise falls back to native scrollIntoView.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    // "#top" is the logo's scroll-to-top anchor, not a section.
    if (!hash || hash === "#top") return;

    let el: HTMLElement | null = null;
    try {
      el = document.querySelector(hash) as HTMLElement | null;
    } catch {
      el = null;
    }
    if (!el) return;

    const id = window.setTimeout(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: 0 });
      } else {
        (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    }, 300);

    return () => window.clearTimeout(id);
  }, []);

  return null;
}
