"use client";

import { useState } from "react";

/**
 * Primary CTA link (B4): a light sheen sweeps across on click. Only adds the
 * animation layer; the href navigation and base .btn-* styling are unchanged.
 * Wrap the label in a <span> so it stays above the sheen (see .btn-sheen in
 * globals.css).
 */
export default function SheenLink({
  href,
  className = "",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [sheen, setSheen] = useState(false);
  return (
    <a
      href={href}
      className={`btn-sheen ${className} ${sheen ? "is-sheen" : ""}`}
      onClick={() => setSheen(true)}
      onAnimationEnd={() => setSheen(false)}
    >
      {children}
    </a>
  );
}
