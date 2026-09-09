import { siteConfig } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="section bg-surface">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let&apos;s connect</h2>
          <p className="mt-4 text-ink-dim">
            Open to mining-technology consulting, freelance mine-planning and
            geotechnical work, and collaborations. The fastest way to reach me:
          </p>

          <div className="mt-6 flex flex-col items-center gap-1.5">
            <a
              href={siteConfig.contactHref}
              className="text-lg font-semibold text-primary hover:underline"
            >
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="font-medium text-ink-dim transition-colors hover:text-primary"
            >
              {siteConfig.phoneDisplay}
            </a>
            <p className="text-sm text-ink-mute">{siteConfig.location}</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {siteConfig.socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                className="rounded-full border border-line-strong px-5 py-2 text-sm font-semibold text-ink-dim transition hover:border-primary hover:bg-primary hover:text-primary-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
