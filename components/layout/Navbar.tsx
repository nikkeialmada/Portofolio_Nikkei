"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup menu mobile setiap kali route berubah.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-bg/80 backdrop-blur-sm">
      <div className="wrap flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {siteConfig.name}
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={
                isActive(item.href)
                  ? "text-ink"
                  : "text-ink-mute transition-colors hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.contactHref}
            className="rounded-full border border-line-strong px-3 py-1 text-ink-dim transition-colors hover:border-ink hover:text-ink"
          >
            {siteConfig.contactLabel}
          </a>
        </nav>

        {/* Tombol hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Buka menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-dim sm:hidden"
        >
          <span className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Nav mobile */}
      {open && (
        <nav
          id="mobile-nav"
          className="wrap flex flex-col gap-1 border-t border-line py-3 text-sm sm:hidden"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-2 py-2 ${
                isActive(item.href)
                  ? "bg-surface text-ink"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.contactHref}
            className="mt-1 rounded-md px-2 py-2 text-ink-dim hover:text-ink"
          >
            {siteConfig.contactLabel} →
          </a>
        </nav>
      )}
    </header>
  );
}
