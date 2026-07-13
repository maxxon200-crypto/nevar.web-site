"use client";

import { ElementType, ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The only animation on the site: a soft fade with a slight rise when the
 * element scrolls into view.
 *
 * CRITICAL RULE (see DESIGN.md): the base style keeps content fully visible.
 * GSAP only ADDS the effect at runtime via gsap.from, so with JavaScript
 * disabled nothing is ever hidden. Honours prefers-reduced-motion by not
 * animating at all.
 *
 * Implementation notes:
 * - gsap.context + ctx.revert() in cleanup: reverts the inline styles that
 *   gsap.from applies on mount. With plain kill(), React strict mode (double
 *   effect in dev) would re-run gsap.from against the already-hidden values
 *   and the reveal would break in `next dev`.
 * - Elements already inside the viewport at mount are not animated: they were
 *   painted visible (SSR) and hiding them after first paint would flicker,
 *   e.g. on a mid-page reload with scroll restoration.
 */
export default function Reveal({
  as,
  className = "",
  delay = 0,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already on screen: leave it exactly as painted.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        delay,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    return () => ctx.revert();
  }, [delay]);

  const Tag = (as || "div") as ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
