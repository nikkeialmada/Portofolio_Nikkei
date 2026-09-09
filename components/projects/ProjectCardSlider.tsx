"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/types/project";

const AUTOPLAY_MS = 3800;

/**
 * Featured-card media: a sliding strip of screenshots, each in its own
 * rounded tile, ~3 in view at once. Auto-advances, pauses on hover / hidden
 * tab / reduced-motion, and can be driven manually with the arrows, dots,
 * or a swipe.
 */
export function ProjectCardSlider({ images }: { images: GalleryImage[] }) {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const sm = window.matchMedia("(min-width: 460px)");
    const update = () => setPerView(md.matches ? 3 : sm.matches ? 2 : 1);
    update();
    md.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      md.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const maxIndex = Math.max(0, images.length - perView);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = useCallback(
    (next: number) => {
      if (next < 0) setIndex(maxIndex);
      else if (next > maxIndex) setIndex(0);
      else setIndex(next);
    },
    [maxIndex],
  );

  useEffect(() => {
    if (reduced || maxIndex === 0) return;
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, maxIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? index + 1 : index - 1);
  };

  const slideBasis = 100 / perView;
  const canSlide = maxIndex > 0;

  return (
    <div
      className="group/slider select-none"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        className="relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * slideBasis}%)`,
            transition: reduced
              ? "none"
              : "transform 550ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="shrink-0 px-1.5"
              style={{ flex: `0 0 ${slideBasis}%` }}
            >
              <div className="relative aspect-[9/19] overflow-hidden rounded-2xl border border-line bg-black">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 460px) 82vw, (max-width: 768px) 42vw, 200px"
                  className="object-cover"
                  priority={i < 3}
                />
              </div>
            </div>
          ))}
        </div>

        {canSlide && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 px-2 py-1 text-white/80 backdrop-blur-sm hover:text-white group-hover/slider:flex"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 px-2 py-1 text-white/80 backdrop-blur-sm hover:text-white group-hover/slider:flex"
            >
              ›
            </button>
          </>
        )}
      </div>

      {canSlide && (
        <div className="mt-2.5 flex justify-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to position ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-4 bg-ink"
                  : "w-1.5 bg-line-strong hover:bg-ink-mute"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
