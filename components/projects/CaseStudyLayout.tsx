/* =============================================================
   Case-study detail layout (Blueprint §3):
   CaseStudyHero + Background & Objectives + Key Features & Core Logic
   + Related Projects.
   ============================================================= */
import Link from "next/link";
import type { Project } from "@/types/project";
import { formatDate } from "@/lib/format";
import { CoverImage } from "@/components/shared/CoverImage";
import { VideoEmbed } from "@/components/shared/VideoEmbed";
import { RichText } from "@/components/shared/RichText";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ProjectCard } from "./ProjectCard";

interface Props {
  project: Project;
  related: Project[];
}

export function CaseStudyLayout({ project, related }: Props) {
  const cs = project.caseStudy;

  return (
    <article>
      {/* --- Hero --- */}
      <header>
        <Link
          href="/projects"
          className="font-mono text-xs text-ink-mute transition-colors hover:text-ink"
        >
          ← All projects
        </Link>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-ink-mute">
          {project.category} · {formatDate(project.date)}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {project.title}
        </h1>
        <p className="mt-3 max-w-[34rem] text-ink-dim">{project.shortDescription}</p>
        {project.contributionNote && (
          <p className="mt-2 text-sm italic text-ink-mute">{project.contributionNote}</p>
        )}

        {project.links && project.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {project.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-line-strong pb-px text-sm text-ink-dim transition-colors hover:border-ink hover:text-ink"
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
          priority
          className="mt-8"
        />
      )}

      {/* --- Plain-language summary (PRD §11) --- */}
      {cs?.summary && (
        <section className="mt-12 rounded-lg border border-line bg-surface p-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-mute">
            In brief
          </p>
          <p className="leading-relaxed text-ink-dim">{cs.summary}</p>
        </section>
      )}

      {/* --- Background & Objectives --- */}
      {cs?.backgroundObjectives && (
        <section className="mt-14">
          <SectionHeading>Background &amp; Objectives</SectionHeading>
          <RichText text={cs.backgroundObjectives} />
        </section>
      )}

      {/* --- Key Features & Core Logic --- */}
      {cs?.keyFeaturesCoreLogic && (
        <section className="mt-14">
          <SectionHeading>Key Features &amp; Core Logic</SectionHeading>
          <RichText text={cs.keyFeaturesCoreLogic} />
        </section>
      )}

      {/* --- Extra notes (MDX body) --- */}
      {project.body && (
        <section className="mt-14">
          <SectionHeading>Notes</SectionHeading>
          <RichText text={project.body} />
        </section>
      )}

      {/* --- Related Projects --- */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-line pt-10">
          <SectionHeading>Related Projects</SectionHeading>
          <div className="flex flex-col">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
