import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";
import { formatYear } from "@/lib/format";
import { AutoVideo } from "@/components/shared/AutoVideo";

export function PortfolioCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-bg shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {project.coverImageUrl ? (
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className={`transition-transform duration-500 group-hover:scale-[1.03] ${
              project.coverFit === "contain" ? "object-contain p-3" : "object-cover"
            }`}
          />
        ) : project.video ? (
          <AutoVideo
            src={project.video}
            poster={project.videoPoster}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-ink-mute">
              {project.category}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {project.category}
          </p>
          <span className="text-xs font-medium text-ink-mute">
            {formatYear(project.date)}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-ink-dim">{project.shortDescription}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Read case study
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
