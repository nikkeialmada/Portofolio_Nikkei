import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectSlugs, getRelatedProjects } from "@/lib/getProjects";
import { getProjectBySlug } from "@/lib/getProjectBySlug";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import { buildMetadata } from "@/lib/generateMetadata";

type Params = { params: Promise<{ slug: string }> };

// Semua halaman studi kasus dibangun saat build (SSG).
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.caseStudy?.summary || project.shortDescription,
    path: `/projects/${project.slug}`,
    image: project.coverImageUrl,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(slug, 2);
  return <CaseStudyLayout project={project} related={related} />;
}
