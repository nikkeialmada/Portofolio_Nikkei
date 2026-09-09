interface Props {
  /** Local file (/videos/x.mp4, .webm) or an embed URL (YouTube / Vimeo). */
  src: string;
  poster?: string;
  caption?: string;
  /** Tailwind aspect-ratio class. */
  ratio?: string;
  className?: string;
}

const FILE_RE = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i;

/** Turn a YouTube/Vimeo watch URL into an embeddable URL. */
function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    }
    if (host.endsWith("youtube.com")) {
      const id = u.searchParams.get("v") ?? u.pathname.split("/").pop();
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host.endsWith("vimeo.com")) {
      return `https://player.vimeo.com/video/${u.pathname.split("/").filter(Boolean).pop()}`;
    }
    return url;
  } catch {
    return url;
  }
}

export function VideoEmbed({
  src,
  poster,
  caption,
  ratio = "aspect-video",
  className = "",
}: Props) {
  const isFile = FILE_RE.test(src) || src.startsWith("/");

  return (
    <figure className={className}>
      <div
        className={`${ratio} overflow-hidden rounded-lg border border-line bg-black`}
      >
        {isFile ? (
          <video
            controls
            preload="metadata"
            playsInline
            poster={poster}
            className="h-full w-full"
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <iframe
            src={toEmbedUrl(src)}
            title={caption ?? "Embedded video"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 font-mono text-xs text-ink-mute">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
