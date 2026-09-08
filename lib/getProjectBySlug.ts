/* Ambil satu proyek berdasarkan slug (Blueprint §5). */
import type { Project } from "@/types/project";
import { getAllProjects } from "@/lib/getProjects";

export function getProjectBySlug(slug: string): Project | null {
  return getAllProjects().find((p) => p.slug === slug) ?? null;
}
