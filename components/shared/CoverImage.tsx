import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[16/10]". */
  ratio?: string;
  /** How the image fills its frame. "contain" suits app screenshots. */
  fit?: "cover" | "contain";
  priority?: boolean;
  className?: string;
}

const PLACEHOLDER =
  "bg-[radial-gradient(130%_130%_at_0%_0%,#1c1c21,transparent_60%),radial-gradient(130%_130%_at_100%_100%,#161619,transparent_55%)]";

/** Project cover image; falls back to a neutral gradient when `src` is empty. */
export function CoverImage({
  src,
  alt,
  ratio = "aspect-[16/10]",
  fit = "cover",
  priority = false,
  className = "",
}: Props) {
  return (
    <div
      className={`${ratio} overflow-hidden rounded-lg border border-line ${
        fit === "contain" ? "bg-black" : "bg-surface"
      } ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          priority={priority}
          sizes="(max-width: 640px) 100vw, 640px"
          className={`h-full w-full ${
            fit === "contain" ? "object-contain" : "object-cover"
          }`}
        />
      ) : (
        <div aria-hidden className={`h-full w-full ${PLACEHOLDER}`} />
      )}
    </div>
  );
}
