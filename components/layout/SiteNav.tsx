"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    if (!onHome) return;
    const ids = siteConfig.nav.map((n) => n.id);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [onHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/#home"
          className="text-lg font-bold tracking-tight text-primary"
        >
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const isActive = onHome && active === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-ink-dim hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.contactHref}
            className="ml-3 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-ink transition hover:opacity-85 hover:shadow-lg"
          >
            {siteConfig.contactLabel}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-bg text-ink-dim lg:hidden"
        >
          <span className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="container-x pb-4 lg:hidden"
        >
          <div className="flex flex-col gap-1 rounded-xl border border-line bg-bg p-2 shadow-card">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  onHome && active === item.id
                    ? "bg-surface text-primary"
                    : "text-ink-dim hover:bg-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.contactHref}
              className="mt-1 rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-ink"
            >
              {siteConfig.contactLabel}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
