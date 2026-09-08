import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-mute">
        404
      </p>
      <h1 className="mt-3 text-xl font-semibold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm text-ink-dim">
        Tautannya mungkin salah atau kontennya sudah dipindah.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm text-ink-dim transition-colors hover:text-ink"
      >
        ← Kembali ke beranda
      </Link>
    </div>
  );
}
