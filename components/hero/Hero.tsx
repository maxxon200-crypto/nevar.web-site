import Magnetic from "@/components/ui/Magnetic";
import { ArrowRight, ArrowDown } from "@/components/ui/icons";
import GlassStage from "./GlassStage";

/**
 * Hero. Server-rendered text (h1, payoff, CTAs paint immediately for LCP),
 * with the liquid-glass stage as the visual. Entrance flourishes use CSS
 * keyframes only, so nothing is hidden without JS and reduced motion is honoured.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pb-16 pt-28"
    >
      <div className="shell flex w-full flex-col items-center">
        {/* Panel eyebrow */}
        <div
          className="mb-3 flex items-center gap-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="label-mono">STUDIO</span>
          <span className="h-1 w-1 rounded-full bg-teal" aria-hidden />
          <span className="label-mono">MILANO</span>
          <span className="h-1 w-1 rounded-full bg-teal" aria-hidden />
          <span className="label-mono">WEB &amp; APP</span>
        </div>

        {/* Liquid-glass orb */}
        <div className="relative aspect-square w-[min(80vw,30rem)] shrink-0">
          <GlassStage />
        </div>

        {/* Wordmark - single h1, paints immediately */}
        <h1 className="display-hero -mt-4 text-center text-ink sm:-mt-8">
          nevar<span className="text-teal-text">.web</span>
        </h1>

        <p className="mt-7 max-w-xl text-balance text-center text-lg leading-relaxed text-ink-soft">
          Progettiamo e sviluppiamo siti web e app su misura per attività
          italiane. Bianco, veloce, fatto a mano a Milano.
        </p>

        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <Magnetic>
            <a href="#contatto" className="btn-primary">
              Richiedi un preventivo
              <ArrowRight />
            </a>
          </Magnetic>
          <a href="#servizi" className="btn-ghost">
            Servizi e prezzi
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#manifesto"
        aria-label="Scorri al manifesto"
        className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 animate-fade-up"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink-mute">
          Scorri
        </span>
        <ArrowDown className="text-ink-mute transition-transform duration-500 group-hover:translate-y-1" />
      </a>
    </section>
  );
}
