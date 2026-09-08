import type { Metadata } from "next";
import { getGroupedProjects } from "@/lib/getProjects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCardCompact } from "@/components/projects/ProjectCardCompact";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildMetadata } from "@/lib/generateMetadata";

export const metadata: Metadata = buildMetadata({
  title: "Proyek",
  description:
    "Studi kasus proyek — dikelompokkan jadi pilihan, pendukung, dan eksperimen. Tiap proyek diceritakan sebagai masalah, solusi teknis, dan hasil.",
  path: "/projects",
});

export default function ProjectsPage() {
  const { selected, more, experiment } = getGroupedProjects();
  const total = selected.length + more.length + experiment.length;

  return (
    <div>
      {/* --- Hero singkat --- */}
      <section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          Proyek
        </h1>
        <p className="mt-3 max-w-[34rem] text-ink-dim">
          Sebagian dikerjakan untuk kuliah, sebagian untuk klien, sebagian iseng
          di akhir pekan. Klik satu proyek untuk membaca latar, keputusan teknis,
          dan hasilnya.
        </p>
      </section>

      {total === 0 && (
        <p className="mt-10 text-sm text-ink-mute">
          Belum ada proyek. Tambahkan file <code className="font-mono text-xs">.mdx</code>{" "}
          di <code className="font-mono text-xs">content/projects/</code>.
        </p>
      )}

      {/* --- Selected Projects --- */}
      {selected.length > 0 && (
        <section className="mt-12">
          <SectionHeading>Proyek Pilihan</SectionHeading>
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
          <SectionHeading count={more.length}>Proyek Lainnya</SectionHeading>
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
          <SectionHeading count={experiment.length}>Eksperimen</SectionHeading>
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
