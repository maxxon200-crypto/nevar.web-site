import Reveal from "@/components/ui/Reveal";
import { deliverables } from "@/data/content";

/** What the site does for the studio: rows separated by hairlines. */
export default function CosaFaccio() {
  return (
    <section className="section grain bg-paper">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Cosa faccio</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="title-lg mt-5 max-w-2xl">
            Un sito che lavora anche quando tu sei in cantiere.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 border-t border-line">
            {deliverables.map((d, i) => (
              <li
                key={d}
                className="flex items-baseline gap-6 border-b border-line py-5"
              >
                <span
                  className="w-8 shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-muted"
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <span className="text-[15px] leading-relaxed text-ink">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
