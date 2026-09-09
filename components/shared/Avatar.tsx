"use client";

import { useState } from "react";

interface Props {
  src?: string;
  name: string;
  className?: string;
}

/** Portrait image that falls back to initials on a filled tile. */
export function Avatar({ src, name, className = "" }: Props) {
  const [failed, setFailed] = useState(!src);
  const inits = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-surface text-ink-mute ${className}`}
      >
        <span className="text-[clamp(2.5rem,10vw,4rem)] font-bold tracking-tight">
          {inits}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
