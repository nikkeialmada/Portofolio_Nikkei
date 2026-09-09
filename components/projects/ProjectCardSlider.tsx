"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryImage } from "@/types/project";

/** Swipeable image slider used as a featured project card's media. */
export function ProjectCardSlider({ images }: { images: GalleryImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
    setIdx(clamped);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIdx(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <div className="group/slider relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex aspect-[16/10] snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-lg border border-line bg-black [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={img.src} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, 620px"
              className="object-contain"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Prev / next (pointer devices) */}
      {idx > 0 && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => goTo(idx - 1)}
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 px-2 py-1 text-white/80 backdrop-blur-sm hover:text-white group-hover/slider:flex"
        >
          ‹
        </button>
      )}
      {idx < images.length - 1 && (
        <button
          type="button"
          aria-label="Next image"
          onClick={() => goTo(idx + 1)}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 px-2 py-1 text-white/80 backdrop-blur-sm hover:text-white group-hover/slider:flex"
        >
          ›
        </button>
      )}

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === idx}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-4 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
