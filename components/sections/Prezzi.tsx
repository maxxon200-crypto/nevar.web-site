import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { tiers, extraOffers } from "@/data/pricing";
import { ArrowRight, Check } from "@/components/ui/icons";

export default function Prezzi() {
  return (
    <section id="prezzi" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Prezzi"
          title="Numeri chiari, nessuna sorpresa"
          lead="Prezzi di partenza, trasparenti. Il preventivo finale dipende dal progetto: ne parliamo prima di iniziare, mai dopo."
        />

        {/* Web tiers */}
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08} className="h-full">
              <GlassCard
                tint={t.featured}
                className={`flex h-full flex-col gap-7 p-8 transition-transform duration-500 ease-smooth hover:-translate-y-1 ${
                  t.featured
                    ? "ring-1 ring-teal/40 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset,0_36px_80px_-36px_rgba(0,158,201,0.4)] lg:-translate-y-3"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="label-mono">{t.code}</span>
                  {t.featured ? (
                    <span className="rounded-pill bg-teal-text px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-white">
                      Più scelto
                    </span>
                  ) : null}
                </div>

                <div>
                  <h3 className="display-md text-ink">{t.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mute">
                    {t.tagline}
                  </p>
                </div>

                <div className="flex items-end gap-2">
                  {t.from ? (
                    <span className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-ink-mute">
                      da
                    </span>
                  ) : null}
                  <span className="price-mono text-5xl font-bold text-ink">
                    {t.price}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                    >
                      <Check size={15} className="mt-0.5 shrink-0 text-teal-text" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contatto"
                  className={`mt-auto justify-center ${
                    t.featured ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  Richiedi
                  <ArrowRight size={14} />
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* App + Care */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {extraOffers.map((o, i) => (
            <Reveal key={o.id} delay={i * 0.08}>
              <GlassCard className="flex h-full flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="max-w-md">
                  <div className="flex items-center gap-3">
                    <span className="label-mono">{o.code}</span>
                    <span className="h-1 w-1 rounded-full bg-aqua" aria-hidden />
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-mute">
                      {o.tagline}
                    </span>
                  </div>
                  <h3 className="display-md mt-3 text-ink">{o.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {o.detail}
                  </p>
                </div>
                <div className="flex shrink-0 items-end gap-2 sm:flex-col sm:items-end sm:gap-1">
                  <div className="flex items-end gap-2">
                    <span className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-ink-mute">
                      da
                    </span>
                    <span className="price-mono text-4xl font-bold text-ink">
                      {o.price}
                    </span>
                  </div>
                  {"unit" in o && o.unit ? (
                    <span className="font-mono text-xs text-ink-mute">
                      {o.unit}
                    </span>
                  ) : null}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
