import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Angka opsional di ujung kanan label (mis. jumlah item). */
  count?: number;
}

export function SectionHeading({ children, count }: Props) {
  return (
    <p className="mb-6 flex items-baseline gap-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink-mute">
      <span aria-hidden className="inline-block h-px w-6 translate-y-[-0.15em] bg-line-strong" />
      <span>{children}</span>
      {typeof count === "number" && <span>{String(count).padStart(2, "0")}</span>}
    </p>
  );
}
