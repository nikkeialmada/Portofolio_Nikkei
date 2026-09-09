import Link from "next/link";
import type { Project } from "@/types/project";
import { formatYear } from "@/lib/format";
import { CoverImage } from "@/components/shared/CoverImage";
import { AutoVideo } from "@/components/shared/AutoVideo";

interface Props {
  project: Project;
  /** Show media on top (for the "Selected Projects" section). */
  featured?: boolean;
}

const LOCAL_VIDEO_RE = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i;

export function ProjectCard({ project, featured = false }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border-b border-line py-6 transition-colors first:pt-0 last:border-0 hover:border-line-strong"
    >
      {featured &&
        (project.video && LOCAL_VIDEO_RE.test(project.video) ? (
          <div className="mb-4 aspect-[16/10] overflow-hidden rounded-lg border border-line bg-black">
            <AutoVideo
              src={project.video}
              poster={project.videoPoster}
              className="pointer-events-none h-full w-full object-cover"
            />
          </div>
        ) : (
          <CoverImage
            src={project.coverImageUrl}
            alt={`${project.title} — cover`}
            className="mb-4 transition-opacity group-hover:opacity-95"
          />
        ))}

      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[1.02rem] font-semibold text-ink-dim transition-colors group-hover:text-ink">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-ink-mute">
          {formatYear(project.date)}
        </span>
      </div>

      <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wide text-ink-mute">
        {project.category}
      </p>

      <p className="mt-2 max-w-[34rem] text-sm text-ink-mute">
        {project.shortDescription}
      </p>

      {project.contributionNote && (
        <p className="mt-2 text-xs italic text-ink-mute">{project.contributionNote}</p>
      )}

      {project.tech && project.tech.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {project.tech.map((t) => (
            <li
              key={t}
              className="font-mono text-[0.7rem] text-ink-mute before:mr-3 before:text-line-strong before:content-['·'] first:before:content-none"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-3 inline-flex items-center gap-1 text-xs text-ink-mute transition-colors group-hover:text-ink">
        Read case study
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
