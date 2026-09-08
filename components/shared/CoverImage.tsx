import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  /** Rasio aspek Tailwind, mis. "aspect-[16/10]". */
  ratio?: string;
  priority?: boolean;
  className?: string;
}

const PLACEHOLDER =
  "bg-[radial-gradient(130%_130%_at_0%_0%,#1c1c21,transparent_60%),radial-gradient(130%_130%_at_100%_100%,#161619,transparent_55%)]";

/** Gambar cover proyek; jatuh ke gradasi netral bila `src` kosong. */
export function CoverImage({
  src,
  alt,
  ratio = "aspect-[16/10]",
  priority = false,
  className = "",
}: Props) {
  return (
    <div
      className={`${ratio} overflow-hidden rounded-lg border border-line bg-surface ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          priority={priority}
          sizes="(max-width: 640px) 100vw, 640px"
          className="h-full w-full object-cover"
        />
      ) : (
        <div aria-hidden className={`h-full w-full ${PLACEHOLDER}`} />
      )}
    </div>
  );
}
