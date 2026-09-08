/* =============================================================
   Baca tulisan blog dari file MDX di /content/blog.
   ============================================================= */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost } from "@/types/project";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MDX_RE = /\.mdx?$/;

function toPost(fileName: string): BlogPost {
  const slug = fileName.replace(MDX_RE, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    body: content.trim(),
    title: String(data.title ?? slug),
    publishedAt: String(data.publishedAt ?? "1970-01-01"),
    summary: data.summary ? String(data.summary) : undefined,
    isPublished: data.isPublished === true,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => MDX_RE.test(f))
    .map(toPost)
    .filter((p) => p.isPublished)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}
