import Link from "next/link";
import CookiePrefsButton from "@/components/cookie/CookiePrefsButton";
import { site } from "@/data/site";

/** One quiet line: wordmark, city, legal links, year. Hairline on top. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-3 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2.5">
          <span className="font-serif text-[16px] text-ink">{site.name}</span>
          <span aria-hidden>·</span>
          <span>
            {site.city}, {site.country}
          </span>
        </p>

        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          <Link href="/privacy" className="transition-colors hover:text-ink">
            Privacy Policy
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/cookie-policy"
            className="transition-colors hover:text-ink"
          >
            Cookie Policy
          </Link>
          <span aria-hidden>·</span>
          <CookiePrefsButton className="transition-colors hover:text-ink" />
          <span aria-hidden>·</span>
          <span>
            © {year} {site.name}
          </span>
        </p>
      </div>
    </footer>
  );
}
