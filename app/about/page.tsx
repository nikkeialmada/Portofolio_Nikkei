import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/generateMetadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.role}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          About
        </h1>
        <div className="mt-5 space-y-4">
          {siteConfig.about.map((p, i) => (
            <p key={i} className="max-w-[34rem] text-ink-dim">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* --- Experience --- */}
      {siteConfig.experience.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Experience</SectionHeading>
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

      {/* --- Education --- */}
      {siteConfig.education.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Education</SectionHeading>
          <div className="flex flex-col">
            {siteConfig.education.map((ed, i) => (
              <div
                key={i}
                className="border-b border-line py-5 first:pt-0 last:border-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">{ed.school}</h3>
                  <span className="shrink-0 font-mono text-xs text-ink-mute">
                    {ed.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">{ed.detail}</p>
                {ed.notes && ed.notes.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-mute marker:text-ink-mute">
                    {ed.notes.map((n, j) => (
                      <li key={j}>{n}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- Certifications & Training --- */}
      {siteConfig.certifications.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Certifications &amp; Training</SectionHeading>
          <ul className="flex flex-col">
            {siteConfig.certifications.map((c, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm first:pt-0 last:border-0"
              >
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-line-strong pb-px text-ink-dim transition-colors hover:border-ink hover:text-ink"
                  >
                    {c.title} ↗
                  </a>
                ) : (
                  <span className="text-ink-dim">{c.title}</span>
                )}
                <span className="shrink-0 font-mono text-xs text-ink-mute">
                  {c.date}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* --- Honors & Awards --- */}
      {siteConfig.honors.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Honors &amp; Awards</SectionHeading>
          <ul className="flex flex-col">
            {siteConfig.honors.map((h, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm first:pt-0 last:border-0"
              >
                <span className="text-ink-dim">{h.title}</span>
                <span className="shrink-0 font-mono text-xs text-ink-mute">
                  {h.date}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* --- Skills --- */}
      <section className="mt-14">
        <SectionHeading>Skills &amp; Tools</SectionHeading>
        <dl className="flex flex-col">
          {Object.entries(siteConfig.skills).map(([group, items]) => (
            <div
              key={group}
              className="grid grid-cols-1 gap-1 border-b border-line py-4 first:pt-0 last:border-0 sm:grid-cols-[10rem_1fr] sm:gap-4"
            >
              <dt className="font-mono text-xs uppercase tracking-wide text-ink-mute">
                {group}
              </dt>
              <dd className="text-sm text-ink-dim">{items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* --- Contact --- */}
      <section className="mt-14">
        <SectionHeading>Contact</SectionHeading>
        <p className="max-w-[34rem] text-ink-dim">
          The fastest way to reach me is{" "}
          <a
            href={siteConfig.contactHref}
            className="border-b border-line-strong pb-px text-ink transition-colors hover:border-ink"
          >
            email
          </a>
          {" "}or phone{" "}
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="border-b border-line-strong pb-px text-ink transition-colors hover:border-ink"
          >
            {siteConfig.phoneDisplay}
          </a>
          . I&apos;m based in {siteConfig.location}.
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
