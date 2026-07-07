"use client";

import { ElementType, useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in seconds, applied as a CSS transition-delay. */
  delay?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Scroll reveal. The hidden -> visible transition lives in CSS (.reveal /
 * .is-in). We toggle the class with an IntersectionObserver, which fires on
 * layout regardless of the scroll library, so content can never get stuck
 * hidden. Reduced motion is handled by CSS; the hidden state only applies with
 * JS present (html.js), so without JS everything renders visible.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as || "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    io.observe(el);

    // Failsafe: never leave content hidden if something goes wrong.
    const safety = window.setTimeout(() => el.classList.add("is-in"), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
