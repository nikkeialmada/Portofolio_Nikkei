"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** Local video file path (/videos/x.mp4). */
  src: string;
  poster?: string;
  /** Show native playback controls (detail page); omit for a silent card preview. */
  controls?: boolean;
  className?: string;
}

/**
 * Muted, looping, auto-playing video. Pauses when the viewer prefers
 * reduced motion. Browsers only allow autoplay while muted.
 */
export function AutoVideo({ src, poster, controls = false, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React doesn't reliably reflect the `muted` attribute to the property,
    // and muted is required for autoplay — so set it explicitly.
    v.muted = true;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        v.pause();
      } else {
        v.play().catch(() => {
          /* autoplay may still be blocked; ignore */
        });
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

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
      preload="metadata"
      aria-hidden={controls ? undefined : true}
      tabIndex={controls ? undefined : -1}
      className={className}
    />
  );
}
