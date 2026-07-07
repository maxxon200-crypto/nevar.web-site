import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

/** Shared frame for /privacy and /cookie-policy. */
export default function LegalShell({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main id="contenuto" className="shell pb-24 pt-32 md:pt-40">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-mute transition-colors hover:text-teal-text"
      >
        <ArrowRight
          size={14}
          className="rotate-180 transition-transform group-hover:-translate-x-1"
        />
        Torna al sito
      </Link>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-teal/70" aria-hidden />
          <span className="label-mono">Note legali</span>
        </div>
        <h1 className="display-xl text-ink">{title}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-mute">
          Ultimo aggiornamento: {updated}
        </p>
      </div>

      <div className="mt-12 legal-prose">{children}</div>
    </main>
  );
}
