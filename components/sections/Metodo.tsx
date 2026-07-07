import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import {
  IconAscolto,
  IconDesign,
  IconSviluppo,
  IconLancio,
} from "@/components/icons/MethodIcons";
import { method } from "@/data/method";

const METHOD_ICONS = [IconAscolto, IconDesign, IconSviluppo, IconLancio];

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
          {method.map((s, i) => {
            const Icon = METHOD_ICONS[i] ?? IconAscolto;
            return (
              <Reveal key={s.n} delay={i * 0.07} className="h-full">
                <div className="metodo-card flex h-full flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="metodo-icon">
                      <Icon />
                    </div>
                    <span className="label-mono">{s.tag}</span>
                  </div>
                  <h3 className="display-md text-ink">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
