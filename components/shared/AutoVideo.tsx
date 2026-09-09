"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** Local video file path (/videos/x.mp4). */
  src: string;
  poster?: string;
  /** Show native playback controls (detail page); omit for a silent card preview. */
  controls?: boolean;
  /** Pause while the element is scrolled out of view. Default true. */
  pauseOffscreen?: boolean;
  className?: string;
}

/**
 * Muted, looping, auto-playing video.
 * - Forces the `muted` property (React doesn't reflect the attribute), which
 *   browsers require for autoplay.
 * - Never plays under prefers-reduced-motion.
 */
export function AutoVideo({
  src,
  poster,
  controls = false,
  pauseOffscreen = true,
  className,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.muted = true;
    v.defaultMuted = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const tryPlay = () => {
      if (prefersReduced.matches) return;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) tryPlay();
            else if (pauseOffscreen) v.pause();
          }
        },
        { threshold: 0.2 },
      );
      io.observe(v);
    }

    v.addEventListener("loadeddata", tryPlay);
    prefersReduced.addEventListener("change", tryPlay);
    tryPlay();

    return () => {
      io?.disconnect();
      v.removeEventListener("loadeddata", tryPlay);
      prefersReduced.removeEventListener("change", tryPlay);
    };
  }, [pauseOffscreen]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      controls={controls}
      preload="auto"
      aria-hidden={controls ? undefined : true}
      tabIndex={controls ? undefined : -1}
      className={className}
    />
  );
}
