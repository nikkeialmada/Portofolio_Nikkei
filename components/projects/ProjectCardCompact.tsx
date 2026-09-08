import Link from "next/link";
import type { Project } from "@/types/project";
import { formatYear } from "@/lib/format";

/** Baris ringkas untuk section "Experiments" (PRD §4). */
export function ProjectCardCompact({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-baseline justify-between gap-4 border-b border-line py-3 text-sm transition-colors first:pt-0 last:border-0 hover:border-line-strong"
    >
      <span className="text-ink-dim transition-colors group-hover:text-ink">
        {project.title}
      </span>
      <span className="flex shrink-0 items-baseline gap-3 font-mono text-xs text-ink-mute">
        <span className="hidden sm:inline">{project.category}</span>
        <span>{formatYear(project.date)}</span>
      </span>
    </Link>
  );
}
