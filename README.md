# Website Portofolio — "Case Study Showcase"

Implementasi dari [PRD.md](PRD.md) & [Blueprint.md](Blueprint.md). Setiap proyek
diceritakan sebagai **masalah -> solusi teknis -> hasil**, bukan sekadar galeri
screenshot. Referensi pola UI: muhamien.com/projects.

## Tech stack

| Layer | Pilihan |
|---|---|
| Framework | Next.js 15 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| Konten | MDX file-based (`content/`), di-parse dengan `gray-matter` |
| Font | `next/font` (Inter + JetBrains Mono) |
| Hosting | Vercel |

## Menjalankan

```bash
npm install
cp .env.example .env.local      # opsional; isi NEXT_PUBLIC_SITE_URL
npm run dev                     # http://localhost:3000
```

> Catatan: `npm install` dan build pertama butuh koneksi internet
> (`next/font` mengunduh berkas font Google saat build, lalu di-cache).

Perintah lain: `npm run build` (build produksi), `npm run start` (serve hasil build).

## Struktur folder

```
app/
  layout.tsx                RootLayout — Navbar, Footer, metadata global
  page.tsx                  "/"        — hero + proyek pilihan + pengalaman
  projects/page.tsx         "/projects"        — Selected / More / Experiments
  projects/[slug]/page.tsx  "/projects/[slug]" — halaman studi kasus (SSG)
  about/page.tsx            "/about"
  blog/page.tsx             "/blog"
  blog/[slug]/page.tsx      "/blog/[slug]" (SSG)
  sitemap.ts / robots.ts    otomatis dari App Router
  icon.svg                  favicon
components/
  layout/     Navbar (sticky + hamburger), Footer
  projects/   ProjectCard, ProjectCardCompact, CaseStudyLayout
  shared/     SectionHeading, RichText, CoverImage
lib/
  site.ts                >>> KONFIG SITUS (nama, intro, kontak, sosial) <<<
  getProjects.ts         baca + grouping + sort + related
  getProjectBySlug.ts
  getBlogPosts.ts
  generateMetadata.ts    helper OG/Twitter card
  format.ts              format tanggal (id-ID)
content/
  projects/*.mdx         >>> SATU FILE = SATU PROYEK <<<
  blog/*.mdx
types/project.ts         tipe data (acuan ERD Blueprint §4)
public/images/           gambar cover
```

## Menambah / mengubah konten

### Identitas, intro, kontak, sosial
Edit [lib/site.ts](lib/site.ts). Semua teks statis + link `mailto:` (dengan
subject terisi) ada di sana.

### Proyek baru
Buat `content/projects/<slug>.mdx`. Frontmatter yang dikenali:

| Field | Wajib | Keterangan |
|---|---|---|
| `title` | ✅ | Judul proyek |
| `category` | ✅ | `SaaS` \| `Company Profile` \| `Event` \| `Information System` \| bebas |
| `date` | ✅ | `"YYYY-MM"` atau `"YYYY-MM-DD"` — dipakai untuk urutan (terbaru dulu) |
| `group` | ✅ | `selected` \| `more` \| `experiment` — menentukan section di `/projects` |
| `shortDescription` | ✅ | 1–2 kalimat |
| `isPublished` | ✅ | `false` = draft, tidak tampil & tidak masuk sitemap |
| `contributionNote` | — | mis. "Team contribution di X" |
| `coverImageUrl` | — | `/images/x.jpg` atau URL HTTPS; kosong = gradasi placeholder |
| `tech` | — | daftar teknologi |
| `links` | — | daftar `{ type, label, url }` |
| `caseStudy.summary` | — | ringkasan bahasa awam (tampil di kotak "Ringkas") |
| `caseStudy.backgroundObjectives` | — | teks kaya: paragraf, `### sub-judul`, `- bullet`, `**tebal**` |
| `caseStudy.keyFeaturesCoreLogic` | — | format sama |

Teks setelah frontmatter (body) tampil sebagai bagian "Catatan" di akhir.

### Tulisan blog
Buat `content/blog/<slug>.mdx` dengan frontmatter `title`, `publishedAt`,
`summary`, `isPublished`. Body ditulis dengan sintaks `RichText` yang sama.

### CV
Taruh berkas di `public/cv.pdf` (link "CV (PDF)" di footer sudah menunjuk ke sana).

## Deploy ke Vercel

1. Push repo ke GitHub.
2. Import di [vercel.com/new](https://vercel.com/new) — framework terdeteksi otomatis.
3. Set environment variable `NEXT_PUBLIC_SITE_URL` = domain final.
4. Deploy. Perubahan konten cukup `git push` (ISR/SSG rebuild otomatis).

## Peta ke dokumen

| Requirement | Lokasi implementasi |
|---|---|
| Grouping otomatis (PRD F1) | `lib/getProjects.ts` → `getGroupedProjects()` |
| Halaman detail dinamis (F2) | `app/projects/[slug]/page.tsx` + `generateStaticParams` |
| CTA email subject terisi (F3) | `lib/site.ts` → `contactHref` |
| OG/Twitter per halaman (F4) | `lib/generateMetadata.ts` → `buildMetadata()` |
| Optimasi gambar (F5) | `components/shared/CoverImage.tsx` (`next/image`) |
| Sort terbaru (F6) | `getAllProjects()` sort by `date` desc |
| Draft/publish (F7) | field `isPublished` |
| sitemap.xml / robots.txt | `app/sitemap.ts`, `app/robots.ts` |

## Fase berikutnya (belum dikerjakan)

- Analytics (Vercel/Plausible) — Blueprint §10.
- Gambar OG dinamis (`app/opengraph-image.tsx` / `next/og`).
- Migrasi ke headless CMS — skema di `types/project.ts` sudah jadi acuan.
