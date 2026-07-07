import Reveal from "@/components/ui/Reveal";
import { coordinates, site } from "@/data/site";

export default function Manifesto() {
  return (
    <section id="manifesto" className="section">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-16">
          {/* Panel meta */}
          <div className="flex flex-col gap-4">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-8 bg-teal/70" aria-hidden />
              <span className="label-mono">Manifesto</span>
            </Reveal>
            <Reveal delay={0.05} className="hidden md:block">
              <p className="font-mono text-[0.7rem] leading-relaxed text-ink-mute">
                {coordinates}
                <br />
                STUDIO / {site.founded}
              </p>
            </Reveal>
          </div>

          {/* Statement */}
          <div className="max-w-4xl">
            <Reveal
              as="p"
              className="display-lg leading-[1.16] text-ink"
            >
              Uno studio indipendente a Milano. Un solo interlocutore, dal primo
              schizzo al lancio.
            </Reveal>
            <Reveal
              as="p"
              delay={0.08}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft"
            >
              Progetto e sviluppo siti e app{" "}
              <span className="text-teal-text">su misura</span>, a mano, riga
              per riga. Niente costruttori generici, niente compromessi sul
              dettaglio: solo interfacce{" "}
              <span className="text-teal-text">chiare, veloci</span> e pensate
              per
              durare.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
