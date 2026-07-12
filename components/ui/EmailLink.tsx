"use client";

import { useRef, useState } from "react";
import { site } from "@/data/site";

/**
 * Email link that always works. Primary behaviour is a real mailto: with a
 * prefilled subject; on click we also copy the address to the clipboard and
 * show an "Email copiata" confirmation, so it stays useful even when the
 * device has no default mail client configured.
 */
const PREFILLED_HREF = `${site.emailHref}?subject=${encodeURIComponent(
  site.emailSubject
)}`;

export default function EmailLink({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  async function handleClick() {
    try {
      await navigator.clipboard?.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable: the mailto: still fires, nothing else to do.
    }
  }

  return (
    <span className="relative inline-flex flex-col items-start">
      <a href={PREFILLED_HREF} onClick={handleClick} className={className}>
        {children}
      </a>
      <span
        role="status"
        aria-live="polite"
        className={`pointer-events-none absolute top-full mt-2 whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-slate transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? "Email copiata" : ""}
      </span>
    </span>
  );
}
