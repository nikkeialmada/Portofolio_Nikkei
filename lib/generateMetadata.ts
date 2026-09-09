/* =============================================================
   Helper pembuat metadata SEO/OG per halaman (Blueprint §8, PRD F4).
   ============================================================= */
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface PageMetaInput {
  title: string;
  description?: string;
  /** Path relatif, mis. "/projects/jala-web" */
  path?: string;
  /** URL gambar cover untuk OG/Twitter card. */
  image?: string;
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const images = image ? [{ url: image }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
