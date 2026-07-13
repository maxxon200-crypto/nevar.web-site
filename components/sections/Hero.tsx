import Cta from "@/components/ui/Cta";
import BeforeAfter from "@/components/BeforeAfter";

/**
 * Hero: atmospheric surface + grain. Two columns from 980px - title, line and
 * the single CTA on the left, a compact before/after wipe on the right. Below
 * 980px it stacks (title, subtitle, button, then the comparison) and the
 * secondary link is hidden so one action stays in focus. Server-rendered and
 * paints immediately; LCP is the H1, there is no image above the fold.
 */
export default function Hero() {
  return (
    <section id="top" className="surface grain">
      <div className="shell flex min-h-[92svh] items-center pb-24 pt-32">
        <div className="hero-grid w-full">
          <div>
            <h1 className="title-hero max-w-4xl">
              I tuoi progetti sono straordinari.
              <br />
              Il tuo sito <em>non lo dice.</em>
            </h1>

            <p className="mt-7 max-w-[470px] text-base leading-relaxed text-muted">
              Progetto siti per studi di architettura e interior design. Non
              vetrine mute: strumenti che portano richieste di contatto.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Cta href="#contatto">Prenota una chiamata</Cta>
              <a href="#lavori" className="link-secondary hero-secondary">
                Guarda i lavori
              </a>
            </div>
          </div>

          <div className="hero-media">
            <BeforeAfter />
          </div>
        </div>
      </div>
    </section>
  );
}
