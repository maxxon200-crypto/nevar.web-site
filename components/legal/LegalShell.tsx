import Link from "next/link";

/** Shared frame for /privacy and /cookie-policy: paper + grain, serif titles. */
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
    <main id="contenuto" className="grain bg-paper">
      <div className="shell pb-24 pt-32 md:pt-36">
        <Link href="/" className="link-secondary text-[13px]">
          <span aria-hidden>&#8592; </span>
          Torna al sito
        </Link>

        <div className="mt-10 flex flex-col gap-4">
          <p className="eyebrow">Note legali</p>
          <h1 className="title-xl">{title}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {intro}
          </p>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Ultimo aggiornamento: {updated}
          </p>
        </div>

        <div className="legal-prose mt-12">{children}</div>
      </div>
    </main>
  );
}
