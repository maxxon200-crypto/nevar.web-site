"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getConsent,
  setConsent,
  OPEN_EVENT,
} from "@/lib/consent";

/**
 * Garante-compliant banner. Accetta / Rifiuta / Preferenze carry equal weight,
 * nothing is pre-selected, and no non-technical cookie is ever set (the site
 * uses only technical cookies today). Choice is persisted in localStorage.
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

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label="Preferenze cookie"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl sm:inset-x-6"
        >
          <div className="glass rounded-card-lg p-6 sm:p-7">
            <p className="label-mono mb-3">Cookie</p>

            {!showPrefs ? (
              <>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Questo sito usa solo cookie tecnici necessari al suo
                  funzionamento, che non richiedono consenso. Non usiamo cookie
                  di profilazione. Dettagli nella{" "}
                  <a
                    href="/cookie-policy"
                    className="link-underline text-teal-text"
                  >
                    Cookie Policy
                  </a>
                  .
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => decide(true)}
                    className="btn-primary !py-2.5"
                  >
                    Accetta
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(false)}
                    className="btn-ghost !py-2.5"
                  >
                    Rifiuta
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPrefs(true)}
                    className="btn-ghost !py-2.5"
                  >
                    Preferenze
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm leading-relaxed text-ink-soft">
                  Gestisci le categorie. I cookie tecnici sono sempre attivi
                  perché indispensabili.
                </p>

                <ul className="mt-5 flex flex-col gap-3">
                  <li className="flex items-center justify-between gap-4 rounded-2xl border border-frost/50 bg-white/40 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Cookie tecnici
                      </p>
                      <p className="text-xs text-ink-mute">
                        Necessari, sempre attivi.
                      </p>
                    </div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-mute">
                      Attivi
                    </span>
                  </li>

                  <li className="flex items-center justify-between gap-4 rounded-2xl border border-frost/50 bg-white/40 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-ink">
                        Statistiche (analytics)
                      </p>
                      <p className="text-xs text-ink-mute">
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
                    className="btn-primary !py-2.5"
                  >
                    Salva preferenze
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(true)}
                    className="btn-ghost !py-2.5"
                  >
                    Accetta tutto
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
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
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
        checked ? "border-teal-text bg-teal-text" : "border-frost bg-white/70"
      }`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[calc(100%-1.15rem)]" : "left-1"
        }`}
      />
    </button>
  );
}
