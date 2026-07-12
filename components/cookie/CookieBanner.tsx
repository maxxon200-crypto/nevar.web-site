"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent, OPEN_EVENT } from "@/lib/consent";

/**
 * Garante-compliant banner. Accetta / Rifiuta / Preferenze carry equal weight
 * (same pill style), nothing is pre-selected, and no non-technical cookie is
 * ever set (the site uses only technical cookies today). Choice is persisted
 * in localStorage. Restyled to the editorial system: paper, hairline, sharp
 * corners, no blur, no motion library.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      const t = window.setTimeout(() => setVisible(true), 700);
      return () => window.clearTimeout(t);
    }
    setAnalytics(existing.analytics);
  }, []);

  useEffect(() => {
    const open = () => {
      const existing = getConsent();
      setAnalytics(existing?.analytics ?? false);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  function decide(value: boolean) {
    setConsent(value);
    // Future analytics scripts would be initialised here when value === true.
    setVisible(false);
    setShowPrefs(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferenze cookie"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl sm:inset-x-6"
    >
      <div className="border border-line bg-paper p-6 sm:p-7">
        <p className="eyebrow mb-3">Cookie</p>

        {!showPrefs ? (
          <>
            <p className="text-sm leading-relaxed text-muted">
              Questo sito usa solo cookie tecnici necessari al suo
              funzionamento, che non richiedono consenso. Non usiamo cookie di
              profilazione. Dettagli nella{" "}
              <a
                href="/cookie-policy"
                className="underline underline-offset-2 text-ink"
              >
                Cookie Policy
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => decide(true)}
                className="btn-small"
              >
                Accetta
              </button>
              <button
                type="button"
                onClick={() => decide(false)}
                className="btn-small"
              >
                Rifiuta
              </button>
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="btn-small"
              >
                Preferenze
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-muted">
              Gestisci le categorie. I cookie tecnici sono sempre attivi perché
              indispensabili.
            </p>

            <ul className="mt-5 flex flex-col gap-3">
              <li className="flex items-center justify-between gap-4 border border-line px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">Cookie tecnici</p>
                  <p className="text-xs text-muted">
                    Necessari, sempre attivi.
                  </p>
                </div>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Attivi
                </span>
              </li>

              <li className="flex items-center justify-between gap-4 border border-line px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">
                    Statistiche (analytics)
                  </p>
                  <p className="text-xs text-muted">
                    Non attualmente in uso. Pronte per il futuro.
                  </p>
                </div>
                <Toggle
                  checked={analytics}
                  onChange={setAnalytics}
                  label="Consenti statistiche"
                />
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => decide(analytics)}
                className="btn-small"
              >
                Salva preferenze
              </button>
              <button
                type="button"
                onClick={() => decide(true)}
                className="btn-small"
              >
                Accetta tutto
              </button>
              <button
                type="button"
                onClick={() => decide(false)}
                className="btn-small"
              >
                Rifiuta tutto
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-pill border transition-colors ${
        checked ? "border-slate bg-slate" : "border-line bg-white"
      }`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-pill transition-all ${
          checked ? "left-[calc(100%-1.15rem)] bg-white" : "left-1 bg-deep"
        }`}
      />
    </button>
  );
}
