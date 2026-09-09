/* =============================================================
   Site configuration — the single place for all static copy.
   Edit this file to change identity, intro, contact, etc.
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
  /** Logo file in /public/images/logos/ (e.g. "/images/logos/akp.png"). Optional. */
  logo?: string;
}

export interface EducationItem {
  school: string;
  detail: string;
  period: string;
  notes?: string[];
  logo?: string;
}

export interface CredentialItem {
  title: string;
  date: string;
  /** Link to the certificate / verification page. */
  url?: string;
}

const EMAIL = "nikkeialmada@gmail.com";
const PHONE_DISPLAY = "+62 813-9936-391";
const PHONE_TEL = "+628139936391";
const EMAIL_SUBJECT = "Hello — from your portfolio";

/**
 * Always return a valid absolute URL (no trailing slash).
 * Tolerates a NEXT_PUBLIC_SITE_URL that is empty, has spaces, or lacks "https://".
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
  name: "Muhammad Gymnastiar Nikkei Almada",
  shortName: "Nikkei Almada",
  role: "Mining Engineer · Mine Planning & Geotechnics",
  location: "Bandung, West Java, Indonesia",
  email: EMAIL,
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,

  /** Used for default metadata & sitemap. Set NEXT_PUBLIC_SITE_URL in production. */
  url: resolveSiteUrl(),

  description:
    "Mining engineer from Institut Teknologi Bandung specialising in mine planning and geotechnics, who builds web and mobile tools for mining data analysis and operational decisions.",

  /** Availability badge on the home hero (set to null to hide). */
  availability: "Open to mining-technology consulting & freelance" as string | null,

  /** Hero. */
  heroGreeting: "Hi, I'm",
  heroTagline:
    "I take mining projects from resource model to feasibility-level plan, and build the web and mobile tools that keep the numbers honest.",
  /** Square-ish portrait in /public/images/. Falls back to initials if missing. */
  heroPhoto: "/images/profile.jpg",

  /** "mailto:" link with a prefilled subject. */
  contactHref: `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`,
  contactLabel: "Get in touch",

  /** Intro paragraphs on the Home page. */
  intro: [
    "I'm Nikkei — a mining engineer from Institut Teknologi Bandung with hands-on experience in mine planning, geotechnical analysis, and mining operations across nickel, gold, coal, and industrial-minerals projects.",
    "I also build software: production-monitoring dashboards, an Android app for exploration and mine planning, and geospatial pipelines that turn field data into reserve and grade–tonnage reports. This site collects that work as engineering case studies.",
  ],

  /** Paragraphs on the About page. */
  about: [
    "I'm Muhammad Gymnastiar Nikkei Almada, a mining engineer based in Bandung. My core work is pit, road, and dump design, mine scheduling, pit optimisation, and geotechnical slope assessment using Surpac, Deswik, Datamine, and the wider macro mine-planning suite.",
    "Alongside that, I develop web and mobile applications that support mining data analysis and operational decision-making — from a real-time equipment-KPI dashboard to GEORIVAL, an Android app that digitises exploration and mine planning for a nickel laterite operation.",
    "I'm currently a Foreman Mining Engineer at PT Adhi Kartiko Pratama, a freelance Deswik.CAD trainer with Aksara Karir, and an independent developer on mining-technology projects.",
  ],

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/gymnastiarn/", external: true },
    { label: "GitHub", url: "https://github.com/nikkeialmada", external: true },
    { label: "Email", url: `mailto:${EMAIL}` },
    { label: "CV (PDF)", url: "/cv.pdf", external: true },
  ] as SocialLink[],

  experience: [
    {
      role: "Foreman Mining Engineer",
      org: "PT Adhi Kartiko Pratama",
      period: "Mar 2025 — Present",
      logo: "/images/logos/adhi-kartiko-pratama.png",
      description:
        "Block-model validation, long-term pit design, pit optimisation, and scheduling for an acquisition-stage project, supporting management's technical due diligence. Designed pit, road, dump, and construction layouts with Surpac, Deswik, Datamine, AutoCAD, and 12D, and built a Flask/MySQL production-monitoring dashboard.",
    },
    {
      role: "Deswik.CAD Trainer (Freelance)",
      org: "Aksara Karir — Mining & Geology Training",
      period: "Sep 2026 — Present",
      logo: "/images/logos/aksara-karir.png",
      description:
        "Design and deliver a three-day intensive Deswik.CAD program for nickel mine planning: UI fundamentals, block-model workflows, pit and dump design, haul-road design, surface reconciliation, catchment analysis, and section/layout plotting.",
    },
    {
      role: "Solo Developer — Mining Technology",
      org: "Independent",
      period: "Jul 2026 — Present",
      logo: "/images/georival/logo.png",
      description:
        "Designed and led development of GEORIVAL, an Android app for exploration and mine-planning digitisation, plus an end-to-end geospatial pipeline for automated grade–tonnage reporting and large-scale point-cloud section profiles.",
    },
    {
      role: "Geotechnical Engineer",
      org: "PT LAPI ITB — Geotechnical Division",
      period: "Sep 2024 — May 2025",
      logo: "/images/logos/lapi-itb.png",
      description:
        "Single-slope analysis and optimal slope geometry for Life-of-Mine designs in limestone, claystone, laterite, and silica at PT Indocement Tunggal Prakarsa (Tarjun). Delivered the geotechnical section of feasibility study reports: drilling-data interpretation, slope-stability analysis, and mining recommendations.",
    },
  ] as ExperienceItem[],

  education: [
    {
      school: "Institut Teknologi Bandung",
      detail: "B.Eng. Mining Engineering — GPA 3.11 / 4.00",
      period: "Aug 2020 — Aug 2024",
      logo: "/images/logos/itb.png",
      notes: [
        "Laterite nickel mine feasibility study: optimal pit layouts, mine scheduling, hydrological and economic analysis.",
        "Underground gold mine feasibility study: sub-level stoping layout, mine schedule, and reclamation section.",
      ],
    },
    {
      school: "SMAN 4 Sukabumi",
      detail: "Natural Science",
      period: "Jul 2017 — Jul 2020",
      logo: "/images/logos/sman4-sukabumi.jpeg",
      notes: [
        "Top of a 230-student cohort in mathematics and natural science.",
        "4th place, Physics Olympiad (OSN), Sukabumi.",
      ],
    },
  ] as EducationItem[],

  certifications: [
    {
      title: "100 Days of Code: The Complete Python Pro Bootcamp — 57 hrs (Udemy, Dr. Angela Yu)",
      date: "Sep 2026",
      url: "https://www.udemy.com/certificate/UC-f054421e-16a7-423f-964d-7c8b7e6d0c2b/",
    },
    {
      title: "Geotechnical Risk Management — Case Studies in Geotechnical Failure",
      date: "Aug 2026",
      url: "/certificates/geotechnical-risk-management.pdf",
    },
    { title: "Coal Mine Planning: MineScape & Spry", date: "Jan 2025" },
  ] as CredentialItem[],

  honors: [
    {
      title:
        "1st Place — Mine Evacuation Rescue Competition, Mining Games 2022–2023 (ITB)",
      date: "Feb 2023",
    },
  ] as CredentialItem[],

  skills: {
    "Mine planning & design": [
      "Surpac",
      "Deswik",
      "Datamine",
      "MineScape",
      "Whittle",
      "MineSched",
      "Spry",
      "12D",
      "AutoCAD",
    ],
    Geotechnics: ["Slide2", "RS2 (Phase2)", "Dips", "RocPlane", "SWedge", "Kazemaru"],
    "Geospatial & data": [
      "ArcGIS",
      "Surfer",
      "WMS",
      "Point-cloud processing",
      "GeoPDF",
    ],
    "Software development": ["Python", "Flask", "MySQL", "Android", "Data visualisation"],
    Languages: ["Bahasa Indonesia (native)", "English (B2)"],
  } as Record<string, string[]>,

  /** Single-page anchor navigation. `id` matches the section id on the home page. */
  nav: [
    { href: "/#home", id: "home", label: "Home" },
    { href: "/#about", id: "about", label: "About" },
    { href: "/#portfolio", id: "portfolio", label: "Portfolio" },
    { href: "/#education", id: "education", label: "Education" },
    { href: "/#experience", id: "experience", label: "Experience" },
    { href: "/#contact", id: "contact", label: "Contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
