import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="wrap py-10">
        <p className="text-sm text-ink-dim">
          Have a project or a role in mind?{" "}
          <a
            href={siteConfig.contactHref}
            className="border-b border-line-strong pb-px text-ink transition-colors hover:border-ink"
          >
            {siteConfig.contactLabel}
          </a>
          .
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {siteConfig.socials.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="border-b border-line-strong pb-px text-ink-dim transition-colors hover:border-ink hover:text-ink"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-ink-mute">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
