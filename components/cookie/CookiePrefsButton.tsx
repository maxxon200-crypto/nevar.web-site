"use client";

import { openCookiePreferences } from "@/lib/consent";

export default function CookiePrefsButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Preferenze cookie
    </button>
  );
}
