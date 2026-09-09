import Image from "next/image";

interface Props {
  name: string;
  logo?: string;
  /** Small caption under the tile (e.g. the period). */
  caption?: string;
}

function initials(name: string) {
  return name
    .replace(/^(PT|SMA[N]?|CV)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** A logo in a bordered tile; falls back to initials when no file is provided. */
export function LogoTile({ name, logo, caption }: Props) {
  return (
    <figure className="flex flex-col items-center text-center">
      <div className="flex h-24 w-full items-center justify-center rounded-xl border border-line bg-bg px-5 transition-shadow hover:shadow-card">
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={160}
            height={64}
            className="max-h-12 w-auto object-contain"
          />
        ) : (
          <span className="text-lg font-bold tracking-tight text-ink-mute">
            {initials(name)}
          </span>
        )}
      </div>
      <figcaption className="mt-2 text-xs font-medium text-ink-mute">
        {name}
        {caption ? ` · ${caption}` : ""}
      </figcaption>
    </figure>
  );
}
