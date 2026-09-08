import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/getBlogPosts";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/generateMetadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Catatan singkat soal proses, keputusan teknis, dan hal yang dipelajari.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
          Blog
        </h1>
        <p className="mt-3 max-w-[34rem] text-ink-dim">
          Tulisan pendek tentang proses di balik proyek dan pelajaran teknis yang
          sayang kalau dilupakan.
        </p>
      </section>

      <div className="mt-10 flex flex-col">
        {posts.length === 0 && (
          <p className="text-sm text-ink-mute">
            Belum ada tulisan. Tambahkan file <code className="font-mono text-xs">.mdx</code>{" "}
            di <code className="font-mono text-xs">content/blog/</code>.
          </p>
        )}

        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group border-b border-line py-5 transition-colors first:pt-0 last:border-0 hover:border-line-strong"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-ink-dim transition-colors group-hover:text-ink">
                {post.title}
              </h2>
              <span className="shrink-0 font-mono text-xs text-ink-mute">
                {formatDate(post.publishedAt)}
              </span>
            </div>
            {post.summary && (
              <p className="mt-2 max-w-[34rem] text-sm text-ink-mute">
                {post.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
