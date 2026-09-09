/* =============================================================
   Case-study detail layout:
   Hero + In brief + Background & Objectives + Key Features &
   Core Logic + Screens + Related projects.
   ============================================================= */
import Link from "next/link";
import type { Project } from "@/types/project";
import { formatDate } from "@/lib/format";
import { CoverImage } from "@/components/shared/CoverImage";
import { VideoEmbed } from "@/components/shared/VideoEmbed";
import { RichText } from "@/components/shared/RichText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { PortfolioCard } from "./PortfolioCard";

interface Props {
  project: Project;
  related: Project[];
}

export function CaseStudyLayout({ project, related }: Props) {
  const cs = project.caseStudy;

  return (
    <article>
      <header>
        <Link
          href="/#portfolio"
          className="text-sm font-medium text-ink-mute transition-colors hover:text-primary"
        >
          ← Back to portfolio
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          {project.category} · {formatDate(project.date)}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-ink-dim">{project.shortDescription}</p>
        {project.contributionNote && (
          <p className="mt-2 text-sm italic text-ink-mute">{project.contributionNote}</p>
        )}

        {project.links && project.links.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line-strong px-4 py-1.5 text-sm font-semibold text-ink-dim transition hover:border-primary hover:text-primary"
                >
                  {l.label ?? l.type} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {project.video ? (
        <VideoEmbed
          src={project.video}
          poster={project.videoPoster}
          caption={project.videoCaption}
          className="mt-8"
        />
      ) : (
        <CoverImage
          src={project.coverImageUrl}
          alt={`${project.title} — cover`}
          ratio="aspect-[16/9]"
          fit={project.coverFit}
          priority
          className="mt-8"
        />
      )}

      {cs?.summary && (
        <section className="mt-12 rounded-xl border border-line bg-surface p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
            In brief
          </p>
          <p className="leading-relaxed text-ink-dim">{cs.summary}</p>
        </section>
      )}

      {cs?.backgroundObjectives && (
        <section className="mt-14">
          <SectionHeading>Background &amp; Objectives</SectionHeading>
          <RichText text={cs.backgroundObjectives} />
        </section>
      )}

      {cs?.keyFeaturesCoreLogic && (
        <section className="mt-14">
          <SectionHeading>Key Features &amp; Core Logic</SectionHeading>
          <RichText text={cs.keyFeaturesCoreLogic} />
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="mt-14">
          <SectionHeading count={project.gallery.length}>Screens</SectionHeading>
          <ScreenshotGallery images={project.gallery} />
        </section>
      )}

      {project.body && (
        <section className="mt-14">
          <SectionHeading>Notes</SectionHeading>
          <RichText text={project.body} />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-12">
          <SectionHeading>Related projects</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PortfolioCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
