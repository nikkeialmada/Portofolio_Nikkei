/* =============================================================
   Tipe data konten. Acuan: Blueprint §4 (ERD) & PRD §5.
   ============================================================= */

/** Menentukan section penempatan di halaman /projects. */
export type ProjectGroup = "selected" | "more" | "experiment";

/** Kategori proyek (PRD §5). Bebas ditambah sesuai kebutuhan. */
export type ProjectCategory =
  | "SaaS"
  | "Company Profile"
  | "Event"
  | "Information System"
  | (string & {});

/** Tautan eksternal (Blueprint ERD: EXTERNAL_LINK). */
export interface ExternalLink {
  /** "live" | "repo" | "article" | "design" | dst. */
  type: string;
  label?: string;
  url: string;
}

/** Satu gambar di galeri studi kasus (mis. screenshot aplikasi). */
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

/** Isi studi kasus (Blueprint ERD: CASE_STUDY). */
export interface CaseStudy {
  /** Ringkasan bahasa awam untuk recruiter non-teknis (PRD §11 mitigasi risiko). */
  summary?: string;
  /** Latar belakang & tujuan — teks kaya (paragraf, sub-judul `###`, bullet `- `). */
  backgroundObjectives: string;
  /** Fitur utama & logika inti — format sama. */
  keyFeaturesCoreLogic: string;
}

/** Frontmatter mentah di file MDX. */
export interface ProjectFrontmatter {
  title: string;
  category: ProjectCategory;
  /** Format "YYYY-MM" atau "YYYY-MM-DD". Dipakai untuk sort & tampilan. */
  date: string;
  group: ProjectGroup;
  shortDescription: string;
  contributionNote?: string;
  /** Manual position within its group (1 = first). Items without an order follow, newest first. */
  order?: number;
  coverImageUrl?: string;
  /** How the cover image fills its frame. Default "cover". Use "contain" for app screenshots. */
  coverFit?: "cover" | "contain";
  /** Screenshot / image gallery shown in the case study. */
  gallery?: GalleryImage[];
  /** Video URL: a local file (/videos/x.mp4, .webm) or an embed URL (YouTube/Vimeo). */
  video?: string;
  /** Poster image shown before a local video plays. */
  videoPoster?: string;
  /** Short caption under the video. */
  videoCaption?: string;
  isPublished: boolean;
  tech?: string[];
  links?: ExternalLink[];
  caseStudy?: CaseStudy;
}

/** Proyek lengkap setelah di-parse (frontmatter + slug + body MDX). */
export interface Project extends ProjectFrontmatter {
  slug: string;
  /** Isi setelah frontmatter. Boleh kosong. */
  body: string;
}

/** Hasil pengelompokan untuk halaman /projects. */
export interface GroupedProjects {
  selected: Project[];
  more: Project[];
  experiment: Project[];
}

/* ---------- Blog (Blueprint ERD: BLOG_POST) ---------- */

export interface BlogFrontmatter {
  title: string;
  publishedAt: string;
  summary?: string;
  isPublished: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  body: string;
}
