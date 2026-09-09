"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/types/project";

const AUTOPLAY_MS = 3500;

/** One-image-at-a-time carousel for a project card: auto-advances, and can be
 *  driven with the arrows, dots, or a swipe. Slides with an eased transform. */
export function CardCarousel({ images }: { images: GalleryImage[] }) {
  const n = images.length;
  const [idx, setIdx] = useState(0);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback((next: number) => setIdx(((next % n) + n) % n), [n]);

  useEffect(() => {
    if (reduced || n < 2) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      setIdx((i) => (i + 1) % n);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, n]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
  };

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="group/car relative h-full w-full"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${idx * 100}%)`,
          transition: reduced
            ? "none"
            : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {images.map((img, i) => (
          <div key={img.src} className="relative h-full w-full shrink-0">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-contain p-2"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              stop(e);
              go(idx - 1);
            }}
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 px-2 py-1 text-white backdrop-blur-sm group-hover/car:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              stop(e);
              go(idx + 1);
            }}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 px-2 py-1 text-white backdrop-blur-sm group-hover/car:flex"
          >
            ›
          </button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === idx}
                onClick={(e) => {
                  stop(e);
                  go(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
