import Link from "next/link";
import { getGroupedProjects } from "@/lib/getProjects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const { selected } = getGroupedProjects();

  return (
    <div>
      {/* --- Hero --- */}
      <section>
        {siteConfig.availability && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-ink-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {siteConfig.availability}
          </p>
        )}
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          {siteConfig.name}
        </h1>
        <p className="mt-1 text-ink-dim">{siteConfig.role}</p>

        <div className="mt-6 space-y-4">
          {siteConfig.intro.map((p, i) => (
            <p key={i} className="max-w-[34rem] text-ink-dim">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* --- Selected projects --- */}
      <section className="mt-14">
        <SectionHeading>Proyek Pilihan</SectionHeading>
        {selected.length > 0 ? (
          <div className="flex flex-col gap-2">
            {selected.slice(0, 3).map((p) => (
              <ProjectCard key={p.slug} project={p} featured />
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-mute">
            Belum ada proyek pilihan. Tambahkan file di{" "}
            <code className="font-mono text-xs">content/projects/</code>.
          </p>
        )}
        <Link
          href="/projects"
          className="mt-6 inline-block text-sm text-ink-dim transition-colors hover:text-ink"
        >
          Lihat semua proyek →
        </Link>
      </section>

      {/* --- Experience --- */}
      {siteConfig.experience.length > 0 && (
        <section className="mt-14">
          <SectionHeading>Pengalaman</SectionHeading>
          <div className="flex flex-col">
            {siteConfig.experience.map((e, i) => (
              <div
                key={i}
                className="border-b border-line py-5 first:pt-0 last:border-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">{e.role}</h3>
                  <span className="shrink-0 font-mono text-xs text-ink-mute">
                    {e.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-dim">{e.org}</p>
                <p className="mt-1 text-sm text-ink-mute">{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
