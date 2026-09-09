import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/getBlogPosts";
import { RichText } from "@/components/shared/RichText";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/generateMetadata";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/blog"
        className="font-mono text-xs text-ink-mute transition-colors hover:text-ink"
      >
        ← All posts
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
        {post.title}
      </h1>
      <p className="mt-2 font-mono text-xs text-ink-mute">
        {formatDate(post.publishedAt)}
      </p>

      <div className="mt-8">
        <RichText text={post.body} />
      </div>
    </article>
  );
}
