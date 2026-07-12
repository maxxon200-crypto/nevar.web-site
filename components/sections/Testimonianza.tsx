import Reveal from "@/components/ui/Reveal";

/**
 * TODO: inserire una testimonianza REALE (testo, nome, studio) al posto dei
 * segnaposto qui sotto. Mai inventare testimonianze (DESIGN.md, regola 6).
 */
export default function Testimonianza() {
  return (
    <section className="section grain border-t border-line bg-paper">
      <div className="shell">
        <Reveal>
          <figure className="max-w-[740px]">
            <blockquote className="quote">
              &ldquo;[TESTIMONIANZA REALE DA INSERIRE]&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-[13px] text-muted">
              [Nome, Studio]
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
