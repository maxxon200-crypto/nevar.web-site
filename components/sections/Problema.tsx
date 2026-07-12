import Reveal from "@/components/ui/Reveal";
import { problems } from "@/data/content";

/**
 * Problem first: the three things costing the studio new projects.
 * Three columns separated by 1px vertical hairlines.
 */
export default function Problema() {
  return (
    <section className="section grain border-t border-line bg-paper">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">
            Tre cose che stanno costando progetti al tuo studio
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {problems.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.08}
              className="md:px-10 md:first:pl-0 md:last:pr-0"
            >
              <h2 className="title-md">{p.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
