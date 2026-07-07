import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { ArrowRight, Check } from "@/components/ui/icons";
import { IconWeb, IconApp, IconCare } from "@/components/icons/ServiceIcons";

const SERVICE_ICONS = [IconWeb, IconApp, IconCare];

export default function Servizi() {
  return (
    <section id="servizi" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Servizi"
          title="Tre modi di lavorare insieme"
          lead="Dal sito che deve esistere subito al progetto bespoke con WebGL e motion. E un'app, quando il web non basta."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i] ?? IconWeb;
            const [priceMain, priceUnit] = s.priceHint.split(" / ");
            return (
            <Reveal key={s.id} delay={i * 0.08} className="h-full">
              <GlassCard className="service-card group flex h-full flex-col gap-6 p-8">
                <div className="flex items-center justify-between">
                  <div className="service-icon">
                    <Icon />
                  </div>
                  <span className="label-mono">{s.kind}</span>
                </div>

                <div>
                  <h3 className="display-lg text-ink">{s.title}</h3>
                  <p className="mt-3 text-ink-soft">{s.summary}</p>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-teal-text"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-4 pt-2">
                  <div className="hairline" />
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="price-mono text-2xl text-ink">
                      <span className="whitespace-nowrap">{priceMain}</span>
                      {priceUnit ? (
                        <span className="price-unit whitespace-nowrap">
                          {" / "}
                          {priceUnit}
                        </span>
                      ) : null}
                    </span>
                    <a
                      href="#prezzi"
                      className="inline-flex shrink-0 items-center gap-1.5 font-mono text-sm uppercase tracking-[0.16em] text-ink-mute transition-colors hover:text-teal-text"
                    >
                      Prezzi
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
