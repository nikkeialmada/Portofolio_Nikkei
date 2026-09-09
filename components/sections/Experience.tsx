import { siteConfig } from "@/lib/site";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Logo } from "@/components/shared/Logo";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x">
        <SectionHeader eyebrow="Experience" title="Professional contributions" />

        <div className="mt-10 space-y-4">
          {siteConfig.experience.map((e, i) => (
            <div
              key={i}
              className="rounded-xl border border-line bg-bg p-6 shadow-card sm:flex sm:gap-5"
            >
              <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-line bg-surface sm:mb-0">
                <Logo
                  src={e.logo}
                  name={e.org}
                  className="max-h-8 w-auto object-contain"
                  fallbackClassName="text-xs text-ink-mute"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-bold text-ink">{e.role}</h3>
                  <span className="text-xs font-medium text-ink-mute">
                    {e.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-primary">{e.org}</p>
                <p className="mt-2 text-sm text-ink-dim">{e.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-ink">
              Certifications &amp; training
            </h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.certifications.map((c, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-3 text-sm"
                >
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-ink-dim transition-colors hover:text-primary"
                    >
                      {c.title} ↗
                    </a>
                  ) : (
                    <span className="text-ink-dim">{c.title}</span>
                  )}
                  <span className="shrink-0 text-xs text-ink-mute">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Honors &amp; awards</h3>
            <ul className="mt-4 space-y-3">
              {siteConfig.honors.map((h, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-4 border-b border-line pb-3 text-sm"
                >
                  <span className="text-ink-dim">{h.title}</span>
                  <span className="shrink-0 text-xs text-ink-mute">{h.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
