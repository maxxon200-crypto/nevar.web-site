import Link from "next/link";
import Logo from "@/components/ui/Logo";
import CookiePrefsButton from "@/components/cookie/CookiePrefsButton";
import { nav, site } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-frost/40">
      <div className="shell py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo size="text-2xl" />
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Studio di design e sviluppo a {site.city}. Siti web e app su
              misura, fatti a mano.
            </p>
            <a
              href={site.emailHref}
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-ink transition-colors hover:text-teal-text"
            >
              <span className="link-underline">{site.email}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <nav aria-label="Sezioni">
              <p className="label-mono mb-4">Studio</p>
              <ul className="flex flex-col gap-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-ink-soft transition-colors hover:text-teal-text"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Note legali">
              <p className="label-mono mb-4">Legale</p>
              <ul className="flex flex-col gap-3 text-sm text-ink-soft">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-teal-text"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="transition-colors hover:text-teal-text"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <CookiePrefsButton className="text-left transition-colors hover:text-teal-text" />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-frost/40 pt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>
            {site.city} / {site.country} / fatto a mano
          </p>
        </div>
      </div>
    </footer>
  );
}
