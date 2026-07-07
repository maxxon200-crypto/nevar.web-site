import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import { method } from "@/data/method";

export default function Metodo() {
  return (
    <section id="metodo" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Metodo"
          title="Come nasce un progetto"
          lead="Quattro fasi, un ritmo chiaro. Sai sempre a che punto siamo e cosa succede dopo."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {method.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07} className="h-full">
              <GlassCard className="flex h-full flex-col gap-5 p-7 transition-transform duration-500 ease-smooth hover:-translate-y-1">
                <div className="flex items-baseline justify-between">
                  <span
                    className="font-display text-4xl text-teal-text"
                    style={{ fontVariationSettings: '"wght" 800, "wdth" 125' }}
                  >
                    {s.n}
                  </span>
                  <span className="label-mono">{s.tag}</span>
                </div>
                <h3 className="display-md text-ink">{s.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
