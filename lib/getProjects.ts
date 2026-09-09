/* =============================================================
   Baca & olah data proyek dari file MDX di /content/projects.
   Acuan: Blueprint §5, §6 (logika grouping).
   ============================================================= */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Project,
  ProjectGroup,
  GroupedProjects,
  ExternalLink,
  GalleryImage,
  CaseStudy,
} from "@/types/project";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");
const MDX_RE = /\.mdx?$/;

function toProject(fileName: string): Project {
  const slug = fileName.replace(MDX_RE, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    body: content.trim(),
    title: String(data.title ?? slug),
    category: String(data.category ?? "Project"),
    date: String(data.date ?? "1970-01"),
    group: (data.group ?? "more") as ProjectGroup,
    shortDescription: String(data.shortDescription ?? ""),
    order: typeof data.order === "number" ? data.order : undefined,
    contributionNote: data.contributionNote ? String(data.contributionNote) : undefined,
    coverImageUrl: data.coverImageUrl ? String(data.coverImageUrl) : undefined,
    coverFit: data.coverFit === "contain" ? "contain" : undefined,
    gallery: Array.isArray(data.gallery) ? (data.gallery as GalleryImage[]) : [],
    video: data.video ? String(data.video) : undefined,
    videoPoster: data.videoPoster ? String(data.videoPoster) : undefined,
    videoCaption: data.videoCaption ? String(data.videoCaption) : undefined,
    isPublished: data.isPublished === true,
    tech: Array.isArray(data.tech) ? (data.tech as string[]) : [],
    links: Array.isArray(data.links) ? (data.links as ExternalLink[]) : [],
    caseStudy: (data.caseStudy as CaseStudy | undefined) ?? undefined,
  };
}

/** Semua proyek published, terurut dari tanggal terbaru (PRD F6). */
export function getAllProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => MDX_RE.test(f))
    .map(toProject)
    .filter((p) => p.isPublished)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/** Items with an explicit `order` come first (ascending); the rest keep date order. */
function applyOrder(list: Project[]): Project[] {
  const ordered = list
    .filter((p) => typeof p.order === "number")
    .sort((a, b) => (a.order as number) - (b.order as number));
  const rest = list.filter((p) => typeof p.order !== "number");
  return [...ordered, ...rest];
}

/** Pengelompokan otomatis berdasarkan field `group` (PRD F1, Blueprint §6). */
export function getGroupedProjects(): GroupedProjects {
  const all = getAllProjects();
  const byGroup = (g: ProjectGroup) => applyOrder(all.filter((p) => p.group === g));
  return {
    selected: byGroup("selected"),
    more: byGroup("more"),
    experiment: byGroup("experiment"),
  };
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

/** Proyek terkait: kategori sama dulu, sisanya proyek terbaru lain. */
export function getRelatedProjects(slug: string, limit = 2): Project[] {
  const all = getAllProjects();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  const others = all.filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  return [...sameCategory, ...others.filter((p) => p.category !== current.category)].slice(
    0,
    limit,
  );
}
