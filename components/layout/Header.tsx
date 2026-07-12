"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { nav } from "@/data/site";

/**
 * Light navigation: serif wordmark + three links. No button in the menu, the
 * call to action lives in the hero. Section links are home anchors; off the
 * home page (Privacy, Cookie) they are prefixed with "/" so they return home.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const anchor = (href: string) => (isHome ? href : `/${href}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu (and release the scroll lock) when crossing to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // While open: Escape closes, Tab stays trapped between the toggle and the
  // menu links, focus moves into the menu and returns to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = [
        toggleRef.current,
        ...Array.from(
          document.querySelectorAll<HTMLElement>("#mobile-menu a")
        ),
      ].filter(Boolean) as HTMLElement[];
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !focusables.includes(active!))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-line bg-[rgba(246,245,242,0.95)]"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            href={isHome ? "#top" : "/"}
            aria-label="nevar.web, torna alla home"
            className="relative z-50"
          >
            <Logo />
          </Link>

          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Principale"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={anchor(item.href)}
                className="link-secondary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu: plain CSS transition, solid paper, no blur */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          className="shell flex h-full flex-col justify-center"
          aria-label="Mobile"
        >
          {nav.map((item, i) => (
            <a
              key={item.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={anchor(item.href)}
              onClick={() => setOpen(false)}
              className="border-b border-line py-6 font-serif text-3xl text-ink"
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
