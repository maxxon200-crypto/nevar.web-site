"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import EmailLink from "@/components/ui/EmailLink";
import { ArrowRight, Check, Mail } from "@/components/ui/icons";
import { site } from "@/data/site";

const TIPI = ["Web", "App", "Non so"] as const;
const BUDGETS = [
  "Fino a 1.000 €",
  "Da 1.000 a 3.000 €",
  "Da 3.000 a 8.000 €",
  "Oltre 8.000 €",
  "Da definire",
] as const;

type Status = "idle" | "submitting" | "success" | "fallback";

type Fields = {
  nome: string;
  email: string;
  tipo: string;
  budget: string;
  messaggio: string;
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function Contatto() {
  const [fields, setFields] = useState<Fields>({
    nome: "",
    email: "",
    tipo: "Web",
    budget: BUDGETS[4],
    messaggio: "",
  });
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>(
    {}
  );
  const [status, setStatus] = useState<Status>("idle");
  const [done, setDone] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = `Richiesta preventivo (${fields.tipo}): ${
      fields.nome || "nuovo progetto"
    }`;
    const body = [
      `Nome: ${fields.nome}`,
      `Email: ${fields.email}`,
      `Tipo progetto: ${fields.tipo}`,
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
        // Visual confirm (B6): show the check on the button, then reveal the
        // success panel. Send logic is unchanged.
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
    <section id="contatto" className="section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: direct contact */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-teal/70" aria-hidden />
                <span className="label-mono">Contatto</span>
              </div>
              <Reveal as="h2" className="display-xl text-ink">
                Parliamo del
                <br />
                <span className="text-teal-text">tuo progetto</span>
              </Reveal>
              <Reveal
                as="p"
                delay={0.05}
                className="max-w-md text-lg leading-relaxed text-ink-soft"
              >
                Un'idea, un preventivo, o solo una domanda: scrivimi. Rispondo di
                persona, di solito entro un giorno lavorativo.
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <EmailLink className="group inline-flex items-center gap-3 font-mono text-base text-ink transition-colors hover:text-teal-text">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-frost/60 bg-white/50 text-teal-text transition-colors group-hover:border-teal">
                  <Mail size={16} />
                </span>
                <span className="link-underline">{site.email}</span>
              </EmailLink>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-ink-mute">
                STUDIO / {site.city.toUpperCase()}
                <br />
                {site.country.toUpperCase()}
              </p>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.08}>
            <GlassCard className="p-6 sm:p-9">
              {status === "success" ? (
                <SuccessState />
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
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
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      error={errors.email}
                      value={fields.email}
                      onChange={(v) => update("email", v)}
                      autoComplete="email"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <SelectField
                      id="tipo"
                      label="Tipo progetto"
                      value={fields.tipo}
                      onChange={(v) => update("tipo", v)}
                      options={TIPI as unknown as string[]}
                    />
                    <SelectField
                      id="budget"
                      label="Budget indicativo"
                      value={fields.budget}
                      onChange={(v) => update("budget", v)}
                      options={BUDGETS as unknown as string[]}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="messaggio"
                      className="label-mono text-ink-soft"
                    >
                      Messaggio
                    </label>
                    <textarea
                      id="messaggio"
                      rows={5}
                      value={fields.messaggio}
                      onChange={(e) => update("messaggio", e.target.value)}
                      aria-invalid={!!errors.messaggio}
                      aria-describedby={
                        errors.messaggio ? "messaggio-err" : undefined
                      }
                      className="resize-none rounded-2xl border border-frost/60 bg-white/55 px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-mute/70 focus:border-teal"
                      placeholder="Cosa vuoi costruire?"
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
                      className={`btn-primary btn-submit justify-center disabled:cursor-not-allowed disabled:opacity-70 ${
                        done ? "is-done" : ""
                      }`}
                    >
                      <span className="btn-label">
                        {status === "submitting" ? "Invio in corso" : "Invia richiesta"}
                      </span>
                      <ArrowRight size={14} className="btn-arrow" />
                      <span className="btn-check" aria-hidden>
                        {"✓"}
                      </span>
                    </button>
                    <p className="text-xs leading-relaxed text-ink-mute">
                      Inviando accetti la{" "}
                      <a href="/privacy" className="link-underline text-ink-soft">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>

                  {status === "fallback" ? (
                    <p
                      role="status"
                      className="rounded-2xl border border-frost/50 bg-white/50 px-4 py-3 text-sm text-ink-soft"
                    >
                      Ho aperto la tua app email con il messaggio già pronto. Se
                      non si è aperta, scrivi a{" "}
                      <a href={mailtoHref} className="link-underline text-teal-text">
                        {site.email}
                      </a>
                      .
                    </p>
                  ) : null}
                </form>
              )}
            </GlassCard>
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
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label-mono text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className="rounded-2xl border border-frost/60 bg-white/55 px-4 py-3 text-ink outline-none transition-colors focus:border-teal"
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
      <label htmlFor={id} className="label-mono text-ink-soft">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-frost/60 bg-white/55 px-4 py-3 pr-10 text-ink outline-none transition-colors focus:border-teal"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-mute"
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
    <p id={id} role="alert" className="text-xs text-[#c0453b]">
      {children}
    </p>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center gap-4 py-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal-text">
        <Check size={26} />
      </span>
      <h3 className="display-md text-ink">Richiesta inviata</h3>
      <p className="max-w-sm text-ink-soft">
        Grazie, ho ricevuto il tuo messaggio. Ti rispondo al più presto, di
        solito entro un giorno lavorativo.
      </p>
    </div>
  );
}
