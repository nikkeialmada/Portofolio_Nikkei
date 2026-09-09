import type { Metadata } from "next";
import { getGroupedProjects } from "@/lib/getProjects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCardCompact } from "@/components/projects/ProjectCardCompact";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/generateMetadata";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Engineering case studies — grouped into selected work, more projects, and experiments. Each one is told as a problem, a technical approach, and an outcome.",
  path: "/projects",
});

export default function ProjectsPage() {
  const { selected, more, experiment } = getGroupedProjects();
  const total = selected.length + more.length + experiment.length;

  return (
    <div>
      {/* --- Short hero --- */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          Projects
        </h1>
        <p className="mt-3 max-w-[34rem] text-ink-dim">
          Mine planning and geotechnical studies alongside the software I build to
          support them. Open a project to read the context, the technical
          decisions, and the outcome.
        </p>
      </section>

      {total === 0 && (
        <p className="mt-10 text-sm text-ink-mute">
          No projects yet. Add an <code className="font-mono text-xs">.mdx</code>{" "}
          file to <code className="font-mono text-xs">content/projects/</code>.
        </p>
      )}

      {/* --- Selected Projects --- */}
      {selected.length > 0 && (
        <section className="mt-12">
          <SectionHeading>Selected Projects</SectionHeading>
          <div className="flex flex-col gap-2">
            {selected.map((p) => (
              <ProjectCard key={p.slug} project={p} featured />
            ))}
          </div>
        </section>
      )}

      {/* --- More Projects --- */}
      {more.length > 0 && (
        <section className="mt-14">
          <SectionHeading count={more.length}>More Projects</SectionHeading>
          <div className="flex flex-col">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* --- Experiments --- */}
      {experiment.length > 0 && (
        <section className="mt-14">
          <SectionHeading count={experiment.length}>Experiments</SectionHeading>
          <div className="flex flex-col">
            {experiment.map((p) => (
              <ProjectCardCompact key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
