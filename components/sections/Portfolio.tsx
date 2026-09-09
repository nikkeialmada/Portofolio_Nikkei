import { getGroupedProjects } from "@/lib/getProjects";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { PortfolioCard } from "@/components/projects/PortfolioCard";

export function Portfolio() {
  const { selected, more, experiment } = getGroupedProjects();
  const projects = [...selected, ...more, ...experiment];

  return (
    <section id="portfolio" className="section bg-surface">
      <div className="container-x">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected projects & case studies"
          description="Mine-planning and geotechnical studies alongside the software built to support them. Each card opens a full write-up."
        />

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <PortfolioCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-ink-mute">
            No projects yet — add an <code>.mdx</code> file to{" "}
            <code>content/projects/</code>.
          </p>
        )}
      </div>
    </section>
  );
}
