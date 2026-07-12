import Reveal from "@/components/ui/Reveal";
import { scope, scopeNote } from "@/data/content";

/**
 * Scope of work: three tiers with TIMES only, never prices. Every project
 * gets a dedicated quote (the note below says so, explicitly).
 */
export default function Metodo() {
  return (
    <section id="metodo" className="section grain border-t border-line bg-paper">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Portata del lavoro</p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {scope.map((s, i) => (
            <Reveal
              key={s.name}
              delay={i * 0.08}
              className="md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <h2 className="title-md">{s.name}</h2>
              <p className="mt-2 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                {s.time}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
            {scopeNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
