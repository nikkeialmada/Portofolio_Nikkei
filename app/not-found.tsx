import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
      <h1 className="mt-3 text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-ink-dim">The link may be wrong, or the page has moved.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-ink transition hover:opacity-85"
      >
        Back to home
      </Link>
    </div>
  );
}
