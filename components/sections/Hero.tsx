import Cta from "@/components/ui/Cta";

/**
 * Hero: atmospheric surface + grain, one H1 with the keyword in slate italic,
 * the single primary CTA and one secondary link. Server-rendered, paints
 * immediately (LCP), no animation on first view.
 */
export default function Hero() {
  return (
    <section id="top" className="surface grain">
      <div className="shell flex min-h-[92svh] flex-col justify-center pb-24 pt-32">
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
          <a href="#lavori" className="link-secondary">
            Guarda i lavori
          </a>
        </div>
      </div>
    </section>
  );
}
