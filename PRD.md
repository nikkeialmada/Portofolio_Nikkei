# Product Requirements Document (PRD)
## Website Portofolio "Case Study Showcase" (Referensi: muhamien.com/projects)

**Versi:** 1.0
**Tanggal:** 8 September 2026
**Status:** Draft
**Referensi Desain:** Struktur & pola UI dari muhamien.com/projects (bukan kloning konten/kode)

---

## 1. Latar Belakang & Tujuan

### 1.1 Latar Belakang
Portofolio developer konvensional biasanya berupa grid galeri statis tanpa narasi. Pola yang dianalisis dari muhamien.com/projects menonjolkan pendekatan **"engineering case study"** — setiap proyek diceritakan sebagai masalah, solusi teknis, dan hasil, bukan sekadar screenshot.

### 1.2 Tujuan Produk
- Menampilkan portofolio proyek dengan hierarki prioritas (unggulan vs pendukung vs eksperimen).
- Memberi ruang narasi teknis (arsitektur, logika inti, keputusan desain) di tiap studi kasus.
- Mengoptimalkan SEO & shareability (Open Graph, Twitter Card) agar mudah dibagikan ke recruiter/klien.
- Menyediakan CTA kontak berfriksi rendah.

### 1.3 Target Pengguna
- Recruiter/HR teknis yang menilai kedalaman engineering seseorang.
- Calon klien freelance yang mengevaluasi kapabilitas end-to-end.
- Sesama developer/komunitas untuk referensi teknis.

---

## 2. Ruang Lingkup

### 2.1 Termasuk dalam Scope
- Halaman utama (landing/hero + status ketersediaan kerja)
- Halaman daftar proyek (`/projects`) dengan grouping bertingkat
- Halaman detail studi kasus per proyek (`/projects/[slug]`)
- Halaman About
- Halaman Writing/Blog (listing artikel)
- Navigasi global + CTA email

### 2.2 Di Luar Scope (v1.0)
- Sistem autentikasi/login
- Dashboard admin CMS custom (gunakan headless CMS/MDX file-based dulu)
- E-commerce/payment
- Multi-bahasa penuh (i18n switcher UI) — cukup metadata dua locale dulu

---

## 3. Arsitektur Informasi & Struktur Halaman

```
/                      → Landing (hero, status, ringkasan)
/projects              → Daftar proyek (3 tingkat grouping)
/projects/[slug]       → Detail studi kasus
/about                 → Profil, skill, pengalaman
/blog                  → Daftar tulisan
/blog/[slug]           → Detail artikel
```

### 3.1 Struktur Halaman `/projects` (Prioritas Utama)

| Section | Deskripsi | Jumlah Item Disarankan |
|---|---|---|
| Hero singkat | Judul + 1 kalimat deskripsi tujuan halaman | 1 |
| Selected Projects | Proyek unggulan dengan kategori, tanggal, deskripsi panjang, kontribusi tim, CTA "View Case Study" | 2–4 |
| More Projects | Proyek pendukung dengan deskripsi/technical breakdown lebih detail (Background, Key Features, Core Logic) | 4–8 |
| Experiments | Proyek latihan/challenge, tampilan minimal (judul + tanggal + link) | Tidak terbatas |

---

## 4. Komponen UI (Component Breakdown)

| Komponen | Props/Data | Perilaku |
|---|---|---|
| `Navbar` | logo, menu items, CTA email | Sticky, responsif ke hamburger di mobile |
| `HeroSection` | judul, subjudul, status badge (mis. "Open to Work") | Statis |
| `ProjectCard` | kategori, tanggal, judul, deskripsi singkat, tag kontribusi, link | Grid, hover state, klik → detail |
| `ProjectCardCompact` | judul, tanggal, link | Untuk section "Experiments" |
| `CaseStudyLayout` | judul, hero image, sections (Background & Objectives, Key Features & Core Logic) | Konten panjang MDX/rich text |
| `Footer/CTA` | email mailto link, social links | Statis |

---

## 5. Model Data (Skema Proyek)

```json
{
  "slug": "string",
  "title": "string",
  "category": "SaaS | Company Profile | Event | Information System",
  "date": "YYYY-MM",
  "shortDescription": "string",
  "contributionNote": "string (opsional, mis. 'Team contribution at X')",
  "group": "selected | more | experiment",
  "coverImage": "url",
  "caseStudy": {
    "backgroundObjectives": "rich text",
    "keyFeaturesCoreLogic": "rich text (bisa berupa list berlabel)"
  },
  "externalLinks": {
    "liveUrl": "url (opsional)",
    "repoUrl": "url (opsional)"
  }
}
```

---

## 6. Persyaratan Fungsional

| ID | Requirement | Prioritas |
|---|---|---|
| F1 | Sistem dapat menampilkan proyek terkelompok otomatis berdasarkan field `group` | Must |
| F2 | Setiap proyek memiliki halaman detail dinamis (`slug`) | Must |
| F3 | Navbar CTA email membuka mail client dengan subject prefilled | Must |
| F4 | Meta tag Open Graph & Twitter Card di-generate otomatis per halaman | Must |
| F5 | Gambar dioptimasi otomatis (lazy load, responsive size) | Should |
| F6 | Halaman proyek dapat diurutkan berdasarkan tanggal terbaru | Should |
| F7 | Dukungan draft/publish status untuk proyek (opsional CMS) | Could |

---

## 7. Persyaratan Non-Fungsional

| Kategori | Requirement |
|---|---|
| Performa | Skor Lighthouse Performance ≥ 90, First Contentful Paint < 1.5s |
| SEO | Semua halaman terindeks, sitemap.xml & robots.txt otomatis |
| Aksesibilitas | Kontras warna WCAG AA, semantic HTML, alt text gambar |
| Responsif | Mobile-first, breakpoint minimal: mobile/tablet/desktop |
| Maintainability | Konten proyek berbasis MDX/headless CMS agar mudah ditambah tanpa deploy ulang kode |

---

## 8. Rekomendasi Tech Stack

| Layer | Pilihan |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Konten | MDX (file-based) atau headless CMS (Sanity/Contentful) untuk skalabilitas |
| Hosting | Vercel (native Next.js image optimization) |
| Analytics | Vercel Analytics / Plausible |

---

## 9. User Flow Utama

1. Pengguna mendarat di `/` → melihat status & ringkasan → klik "Projects"
2. Di `/projects`, pengguna men-scan **Selected Projects** dulu (prioritas visual tertinggi)
3. Klik "View Case Study" → masuk ke halaman detail → membaca Background, Key Features, Core Logic
4. Jika tertarik, kembali ke navbar → klik "Let's work together" → mail client terbuka

---

## 10. Metrik Keberhasilan (Success Metrics)

| Metrik | Target |
<br>
| Rata-rata waktu di halaman detail studi kasus | > 60 detik |
| Rasio klik CTA email dari total pengunjung unik | > 3% |
| Skor SEO (Lighthouse) | ≥ 95 |
| Bounce rate halaman `/projects` | < 50% |

---

## 11. Analisis Risiko & Tantangan

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten studi kasus terlalu teknis untuk recruiter non-teknis | Pesan tidak sampai ke audiens HR | Buat ringkasan non-teknis di awal tiap case study |
| Proyek sedikit membuat struktur 3-tingkat terasa kosong | Kesan portofolio "kurang berisi" | Tunda fitur grouping bertingkat sampai proyek ≥ 6 |
| Ketergantungan penuh pada Vercel Image Optimization | Vendor lock-in / biaya jika trafik tinggi | Evaluasi alternatif (self-hosted sharp, Cloudinary) |
| Update konten butuh developer (jika full file-based MDX) | Lambat untuk update rutin | Pertimbangkan headless CMS di fase 2 |
| Duplikasi struktur terlalu mirip situs referensi | Isu orisinalitas/persepsi plagiarisme | Pastikan seluruh teks & studi kasus adalah konten asli milik pemilik situs |

---

## 12. Roadmap Implementasi (Disarankan)

| Fase | Fokus |
|---|---|
| Fase 1 | Setup Next.js + Tailwind, komponen Navbar/Hero/ProjectCard, data proyek statis (JSON/MDX) |
| Fase 2 | Halaman detail studi kasus dinamis + SEO metadata |
| Fase 3 | Optimasi performa & aksesibilitas, analytics |
| Fase 4 | (Opsional) Migrasi ke headless CMS untuk kemudahan update konten |