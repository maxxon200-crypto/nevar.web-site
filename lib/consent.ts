/**
 * Cookie consent state. The site currently sets only technical cookies (which
 * do not require consent under the Garante guidelines). The analytics flag is
 * kept ready for the future: nothing is loaded until it is explicitly true.
 */
export type Consent = {
  necessary: true;
  analytics: boolean;
  ts: number;
};

const KEY = "nevar-consent-v1";
export const OPEN_EVENT = "nevar:cookie-open";
export const CHANGE_EVENT = "nevar:cookie-change";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (typeof parsed.analytics !== "boolean") return null;
    return { necessary: true, analytics: parsed.analytics, ts: parsed.ts ?? 0 };
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean): Consent {
  const value: Consent = { necessary: true, analytics, ts: Date.now() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
  } catch {
    /* storage unavailable: choice simply is not persisted */
  }
  return value;
}

/** Open the preferences panel from anywhere (e.g. the footer link). */
export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}
