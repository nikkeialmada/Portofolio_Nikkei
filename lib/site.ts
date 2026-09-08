/* =============================================================
   Konfigurasi situs — SATU tempat untuk semua teks statis.
   Ubah file ini untuk mengganti identitas, intro, kontak, dll.
   ============================================================= */

export interface SocialLink {
  label: string;
  url: string;
  external?: boolean;
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  description: string;
}

const EMAIL = "kamu@example.com";
const EMAIL_SUBJECT = "Halo — dari portofolio kamu";

/**
 * Selalu kembalikan URL absolut yang valid (tanpa trailing slash).
 * Menoleransi NEXT_PUBLIC_SITE_URL yang kosong, ada spasi, atau tanpa "https://".
 */
function resolveSiteUrl(): string {
  const fallback = "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return fallback;
  const withScheme = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: "Nama Kamu",
  role: "Mahasiswa Teknik Informatika, ITB",
  location: "Bandung, Indonesia",
  email: EMAIL,

  /** Dipakai untuk metadata default & sitemap. Set NEXT_PUBLIC_SITE_URL di produksi. */
  url: resolveSiteUrl(),

  description:
    "Portofolio studi kasus — mahasiswa dan pengembang web yang menuliskan proyek sebagai masalah, solusi teknis, dan hasil.",

  /** Status ketersediaan kerja untuk badge di hero (set null untuk menyembunyikan). */
  availability: "Terbuka untuk magang & kolaborasi" as string | null,

  /** Tautan "mailto:" dengan subject terisi (PRD F3). */
  contactHref: `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`,
  contactLabel: "Ajak kerja sama",

  /** Paragraf intro di halaman Beranda. */
  intro: [
    "Halo, aku Nama Kamu — mahasiswa Teknik Informatika di Institut Teknologi Bandung. Aku senang mengubah masalah nyata jadi antarmuka yang rapi dan sistem yang bekerja diam-diam di belakangnya.",
    "Halaman ini bukan galeri screenshot. Tiap proyek kuceritakan sebagai konteks, keputusan teknis, dan hasilnya.",
  ],

  /** Paragraf di halaman Tentang. */
  about: [
    "Aku Nama Kamu, mahasiswa Teknik Informatika ITB yang berbasis di Bandung. Minatku ada di pengembangan web modern, performa front-end, dan sedikit machine learning terapan.",
    "Aku belajar paling cepat lewat membangun sesuatu yang benar-benar dipakai orang — dari sistem pendaftaran acara himpunan sampai alat bantu belajar untuk teman seangkatan.",
    "Di luar kode, aku suka fotografi jalanan dan menyeduh kopi manual. Sedang terbuka untuk peluang magang dan proyek freelance.",
  ],

  socials: [
    { label: "GitHub", url: "https://github.com/username", external: true },
    { label: "LinkedIn", url: "https://linkedin.com/in/username", external: true },
    { label: "Email", url: `mailto:${EMAIL}` },
    { label: "CV (PDF)", url: "/cv.pdf", external: true },
  ] as SocialLink[],

  experience: [
    {
      role: "Frontend Developer (Magang)",
      org: "Startup XYZ",
      period: "2025 — Sekarang",
      description:
        "Membangun komponen UI reusable dan memangkas waktu muat halaman utama sekitar 40%.",
    },
    {
      role: "Staf Divisi Web",
      org: "Himpunan Mahasiswa",
      period: "2024 — 2025",
      description:
        "Merawat situs himpunan dan sistem pendaftaran acara tahunan untuk 800+ peserta.",
    },
    {
      role: "Asisten Praktikum",
      org: "Lab Pemrograman, ITB",
      period: "2024",
      description:
        "Mendampingi 30 mahasiswa pada praktikum Struktur Data & Algoritma.",
    },
  ] as ExperienceItem[],

  nav: [
    { href: "/", label: "Beranda" },
    { href: "/projects", label: "Proyek" },
    { href: "/about", label: "Tentang" },
    { href: "/blog", label: "Blog" },
  ],
};

export type SiteConfig = typeof siteConfig;
