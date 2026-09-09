"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/types/project";

export function ScreenshotGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View screenshot: ${img.alt}`}
              className="group block w-full overflow-hidden rounded-lg border border-line bg-black"
            >
              <span className="relative block aspect-[10/19]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 45vw, 200px"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </span>
            </button>
            {img.caption && (
              <p className="mt-1.5 font-mono text-[0.7rem] leading-snug text-ink-mute">
                {img.caption}
              </p>
            )}
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[open].alt}
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-black/90 p-4 backdrop-blur-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[open].src}
            alt={images[open].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
          />
          {images[open].caption && (
            <p className="max-w-md text-center font-mono text-xs text-white/70">
              {images[open].caption}
            </p>
          )}

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-lg text-white/80 hover:text-white"
          >
            ✕
          </button>

          {images.length > 1 && (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-6">
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl text-white/80 hover:text-white"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xl text-white/80 hover:text-white"
              >
                ›
              </button>
            </div>
          )}

          <p className="absolute bottom-4 font-mono text-xs text-white/50">
            {open + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
