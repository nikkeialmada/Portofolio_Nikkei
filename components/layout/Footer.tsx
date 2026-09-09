import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="text-lg font-bold tracking-tight text-primary">
            {siteConfig.shortName}
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-dim">{siteConfig.role}</p>
          <p className="mt-1 text-sm text-ink-mute">{siteConfig.location}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Navigate</p>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.nav.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.href}
                  className="text-ink-dim transition-colors hover:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            {siteConfig.socials.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  className="text-ink-dim transition-colors hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-1 py-5 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
