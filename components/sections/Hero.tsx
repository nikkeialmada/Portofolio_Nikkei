import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Avatar } from "@/components/shared/Avatar";

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pb-16 pt-28 lg:pb-24 lg:pt-40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {siteConfig.availability && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {siteConfig.availability}
            </p>
          )}
          <p className="text-base font-semibold text-primary lg:text-lg">
            {siteConfig.heroGreeting}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-ink-dim lg:text-xl">
            {siteConfig.role}
          </p>
          <p className="mt-5 max-w-xl text-ink-dim">{siteConfig.heroTagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.contactHref}
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-ink transition hover:opacity-85 hover:shadow-lg"
            >
              {siteConfig.contactLabel}
            </a>
            <Link
              href="/#portfolio"
              className="rounded-full border border-line-strong px-7 py-3 text-sm font-semibold text-ink-dim transition hover:border-primary hover:text-primary"
            >
              View portfolio
            </Link>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 text-sm font-semibold text-ink-mute transition hover:text-primary"
            >
              Download CV ↗
            </a>
          </div>
        </div>

        <div className="justify-self-center lg:justify-self-end">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-primary/10" />
            <Avatar
              src={siteConfig.heroPhoto}
              name={siteConfig.shortName}
              className="h-80 w-64 overflow-hidden rounded-[2rem] border border-line object-top sm:h-96 sm:w-72"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
