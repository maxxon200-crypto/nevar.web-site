"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import EmailLink from "@/components/ui/EmailLink";
import { site } from "@/data/site";
import { budgets } from "@/data/content";

type Status = "idle" | "submitting" | "success" | "fallback";

type Fields = {
  nome: string;
  studio: string;
  email: string;
  budget: string;
  messaggio: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Contact band: surface + grain. Left the pitch and the always-working email,
 * right the form. The budget select qualifies the request without publishing
 * prices on the site. Send logic: POST to /api/contact, mailto fallback when
 * email is not configured; the check on the button appears ONLY after a
 * successful send (~1.5s), then the success panel takes over.
 */
export default function Contatto() {
  const [fields, setFields] = useState<Fields>({
    nome: "",
    studio: "",
    email: "",
    budget: budgets[0],
    messaggio: "",
  });
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {}
  );
  const [status, setStatus] = useState<Status>("idle");
  const [done, setDone] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = site.emailSubject;
    const body = [
      `Nome: ${fields.nome}`,
      `Studio: ${fields.studio}`,
      `Email: ${fields.email}`,
      `Budget indicativo: ${fields.budget}`,
      "",
      "Messaggio:",
      fields.messaggio,
    ].join("\n");
    return `${site.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [fields]);

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.nome.trim().length < 2) next.nome = "Scrivi il tuo nome.";
    if (!EMAIL_RE.test(fields.email.trim()))
      next.email = "Inserisci un'email valida.";
    if (fields.messaggio.trim().length < 10)
      next.messaggio = "Raccontami qualcosa in più (almeno 10 caratteri).";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (res.ok && data.ok) {
        // Visual confirm: check on the button, then the success panel.
        setDone(true);
        window.setTimeout(() => {
          setDone(false);
          setStatus("success");
        }, 1500);
        return;
      }
      // Any non-success (incl. email not configured) -> mailto fallback.
      setStatus("fallback");
      window.location.href = mailtoHref;
    } catch {
      setStatus("fallback");
      window.location.href = mailtoHref;
    }
  }

  return (
    <section id="contatto" className="surface grain">
      <div className="shell section">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: pitch + direct email */}
          <div className="flex flex-col gap-7">
            <Reveal>
              <p className="eyebrow">Contatto</p>
            </Reveal>
            <Reveal as="h2" className="title-xl">
              Parliamone. <em>Venti minuti.</em>
            </Reveal>
            <Reveal
              as="p"
              delay={0.05}
              className="max-w-md text-[15px] leading-relaxed text-muted"
            >
              Senza impegno. Rispondo di persona, di solito entro un giorno
              lavorativo. Se non sono la persona giusta, te lo dico e ti
              indirizzo altrove.
            </Reveal>
            <Reveal delay={0.1}>
              <EmailLink className="link-secondary text-[15px]">
                {site.email}
              </EmailLink>
            </Reveal>
          </div>

          {/* Right: the form */}
          <Reveal delay={0.08}>
            <div className="border border-line bg-paper p-6 sm:p-9">
              {status === "success" ? (
                <SuccessState />
              ) : (
                <form
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-6"
                >
                  <noscript>
                    <p className="border border-line bg-paper px-4 py-3 text-sm text-muted">
                      Con JavaScript disattivato il form non può inviare:
                      scrivimi direttamente a{" "}
                      <a
                        href={`${site.emailHref}?subject=${encodeURIComponent(
                          site.emailSubject
                        )}`}
                        className="underline underline-offset-2 text-ink"
                      >
                        {site.email}
                      </a>
                      .
                    </p>
                  </noscript>

                  {/* Honeypot (hidden from users and AT) */}
                  <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
                    <label>
                      Non compilare
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="nome"
                      label="Nome"
                      error={errors.nome}
                      value={fields.nome}
                      onChange={(v) => update("nome", v)}
                      autoComplete="name"
                      maxLength={120}
                    />
                    <Field
                      id="studio"
                      label="Studio"
                      value={fields.studio}
                      onChange={(v) => update("studio", v)}
                      autoComplete="organization"
                      maxLength={160}
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      error={errors.email}
                      value={fields.email}
                      onChange={(v) => update("email", v)}
                      autoComplete="email"
                      maxLength={160}
                    />
                    <SelectField
                      id="budget"
                      label="Budget indicativo"
                      value={fields.budget}
                      onChange={(v) => update("budget", v)}
                      options={budgets as unknown as string[]}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="messaggio" className="label">
                      Messaggio
                    </label>
                    <textarea
                      id="messaggio"
                      name="messaggio"
                      rows={5}
                      maxLength={5000}
                      value={fields.messaggio}
                      onChange={(e) => update("messaggio", e.target.value)}
                      aria-invalid={!!errors.messaggio}
                      aria-describedby={
                        errors.messaggio ? "messaggio-err" : undefined
                      }
                      className="field resize-none"
                      placeholder="Raccontami dello studio e di cosa hai bisogno."
                    />
                    {errors.messaggio ? (
                      <FieldError id="messaggio-err">
                        {errors.messaggio}
                      </FieldError>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className={`btn-primary btn-submit disabled:cursor-not-allowed disabled:opacity-70 ${
                        done ? "is-done" : ""
                      }`}
                    >
                      <span className="btn-label">
                        {status === "submitting"
                          ? "Invio in corso"
                          : "Invia richiesta"}
                      </span>
                      <span className="circ" aria-hidden>
                        &#8594;
                      </span>
                      <span className="btn-check" aria-hidden>
                        {"✓"}
                      </span>
                    </button>
                    <p className="text-xs leading-relaxed text-muted">
                      Inviando accetti la{" "}
                      <a
                        href="/privacy"
                        className="underline underline-offset-2 transition-colors hover:text-ink"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>

                  {status === "fallback" ? (
                    <p
                      role="status"
                      className="border border-line bg-paper px-4 py-3 text-sm text-muted"
                    >
                      Ho aperto la tua app email con il messaggio già pronto.
                      Se non si è aperta, scrivi a{" "}
                      <a
                        href={mailtoHref}
                        className="underline underline-offset-2 text-ink"
                      >
                        {site.email}
                      </a>
                      .
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  maxLength,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="field"
      />
      {error ? <FieldError id={`${id}-err`}>{error}</FieldError> : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field appearance-none pr-10"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5 6 6.5l5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

function FieldError({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <p id={id} role="alert" className="text-xs text-[#8a4b42]">
      {children}
    </p>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-start gap-4 py-10">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-pill border border-slate text-slate"
        aria-hidden
      >
        {"✓"}
      </span>
      <h3 className="title-md">Richiesta inviata</h3>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        Grazie, ho ricevuto il tuo messaggio. Ti rispondo di persona, di solito
        entro un giorno lavorativo.
      </p>
    </div>
  );
}
