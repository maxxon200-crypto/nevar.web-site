import Reveal from "@/components/ui/Reveal";
import { works } from "@/data/content";

/**
 * Case studies. Each case: screenshot placeholder (16/10, hairline border) on
 * the left, name + problem + result on the right. Results are REAL-DATA
 * placeholders: never invent numbers (see data/content.ts, DESIGN.md).
 */
export default function Lavori() {
  return (
    <section id="lavori" className="section grain border-t border-line bg-paper">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Lavori</p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-16 md:gap-24">
          {works.map((w) => (
            <Reveal key={w.name}>
              <article className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                {/* TODO: sostituire il segnaposto con lo screenshot reale del sito. */}
                <div className="relative flex aspect-[16/10] items-center justify-center border border-line bg-mid/60">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Screenshot in arrivo · {w.name}
                  </span>
                </div>

                <div>
                  <h2 className="title-md">{w.name}</h2>
                  <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-muted">
                    {w.problem}
                  </p>
                  {/* TODO: compilare con un dato vero, mai inventato. */}
                  <p className="mt-6 max-w-md border-l-2 border-slate pl-4 text-[15px] leading-relaxed text-ink">
                    Risultato: {w.result}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
