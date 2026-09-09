"use client";

import { useState } from "react";

interface Props {
  src?: string;
  name: string;
  /** classes for the <img> */
  className?: string;
  /** classes for the initials fallback */
  fallbackClassName?: string;
}

function initials(name: string) {
  return name
    .replace(/^(PT|SMA[N]?|CV|Universitas)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Logo image that falls back to the org's initials when the file is missing. */
export function Logo({ src, name, className = "", fallbackClassName = "" }: Props) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <span className={`font-bold tracking-tight ${fallbackClassName}`}>
        {initials(name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
