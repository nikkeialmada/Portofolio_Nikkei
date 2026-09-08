import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/generateMetadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Tentang",
  description: `Profil singkat ${siteConfig.name} — ${siteConfig.role}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          Tentang
        </h1>
        <div className="mt-5 space-y-4">
          {siteConfig.about.map((p, i) => (
            <p key={i} className="max-w-[34rem] text-ink-dim">
              {p}
            </p>
          ))}
        </div>
      </section>

      {siteConfig.experience.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Pengalaman</SectionHeading>
          <div className="flex flex-col">
            {siteConfig.experience.map((e, i) => (
              <div
                key={i}
                className="border-b border-line py-5 first:pt-0 last:border-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">{e.role}</h3>
                  <span className="shrink-0 font-mono text-xs text-ink-mute">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">{e.org}</p>
                <p className="mt-1 text-sm text-ink-mute">{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <SectionHeading>Kontak</SectionHeading>
        <p className="max-w-[34rem] text-ink-dim">
          Cara tercepat menghubungiku lewat{" "}
          <a
            href={siteConfig.contactHref}
            className="border-b border-line-strong pb-px text-ink transition-colors hover:border-ink"
          >
            email
          </a>
          . Aku juga ada di:
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
      </section>
    </div>
  );
}
