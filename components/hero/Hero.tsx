import Magnetic from "@/components/ui/Magnetic";
import SheenLink from "@/components/ui/SheenLink";
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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-24"
    >
      <div className="shell flex w-full flex-col items-center">
        {/* Panel eyebrow */}
        <div
          className="mb-4 flex items-center gap-3 opacity-0 animate-fade-up sm:mb-5"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="label-mono">STUDIO</span>
          <span className="h-1 w-1 rounded-full bg-teal" aria-hidden />
          <span className="label-mono">MILANO</span>
          <span className="h-1 w-1 rounded-full bg-teal" aria-hidden />
          <span className="label-mono">WEB &amp; APP</span>
        </div>

        {/* Liquid-glass orb, floating over a soft cold halo */}
        <div className="relative aspect-square w-[min(78vw,29rem)] shrink-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-[16%] rounded-full opacity-80 blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 44%, rgba(255,255,255,0.85), rgba(73,197,182,0.16) 52%, rgba(0,158,201,0.12) 72%, transparent 80%)",
            }}
          />
          <div className="relative h-full w-full">
            <GlassStage />
          </div>
        </div>

        {/* Wordmark - single h1, paints immediately, given room to breathe */}
        <h1 className="display-hero mt-4 text-center text-ink sm:mt-6">
          nevar<span className="text-teal-text">.web</span>
        </h1>

        <p
          className="mt-4 max-w-2xl text-balance text-center text-ink-soft"
          style={{ fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.55 }}
        >
          Progetto e sviluppo siti web e app su misura per attività italiane.
          Bianco, veloce, fatto a mano a Milano.
        </p>

        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <Magnetic>
            <SheenLink href="#contatto" className="btn-primary">
              <span>Richiedi un preventivo</span>
              <ArrowRight />
            </SheenLink>
          </Magnetic>
          <a href="#servizi" className="btn-ghost">
            Servizi e prezzi
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#servizi"
        aria-label="Scorri ai servizi"
        className="group absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 animate-fade-up"
        style={{ animationDelay: "0.5s" }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-teal-text">
          Scorri
        </span>
        <ArrowDown
          size={16}
          className="text-teal-text transition-transform duration-500 group-hover:translate-y-1"
        />
      </a>
    </section>
  );
}
