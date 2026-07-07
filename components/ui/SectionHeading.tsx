import Reveal from "./Reveal";

/** Consistent editorial section header: mono eyebrow, wide display title, lead. */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${
        isCenter ? "items-center text-center mx-auto max-w-prose2" : "max-w-3xl"
      }`}
    >
      <Reveal className="flex items-center gap-3">
        <span className="h-px w-8 bg-teal/70" aria-hidden />
        <span className="label-mono">{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" className="display-xl text-ink" delay={0.05}>
        {title}
      </Reveal>
      {lead ? (
        <Reveal
          as="p"
          delay={0.1}
          className="text-ink-soft text-lg leading-relaxed max-w-prose2"
        >
          {lead}
        </Reveal>
      ) : null}
    </div>
  );
}
