"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

/** Violet accent, matches --primary in globals.css. */
const PRIMARY_RGB = "109, 40, 217";

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Pre-render one soft radial-gradient dot so per-particle draws are a cheap
 *  drawImage() instead of an expensive per-call shadowBlur. */
function makeGlowSprite() {
  const size = 48;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  grad.addColorStop(0, `rgba(${PRIMARY_RGB}, 1)`);
  grad.addColorStop(0.35, `rgba(${PRIMARY_RGB}, 0.55)`);
  grad.addColorStop(1, `rgba(${PRIMARY_RGB}, 0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

/**
 * Decorative ring-of-particles background, inspired by the Houdini
 * PaintWorklet effect on Google's Antigravity site (bram.us/2025/12/02/
 * google-antigravity-modern-css) — reimplemented on <canvas> so it works in
 * every browser instead of only Chromium (CSS Paint API has no Firefox/
 * Safari support without a polyfill).
 *
 * Layered sine waves distort a ring of particles into a slow, organic
 * ripple; the ring's centre eases toward the pointer at a frame-rate
 * independent speed. Fully decorative: aria-hidden, pointer-events-none,
 * pauses off-screen / hidden tab, and freezes the idle ripple (but keeps
 * pointer-follow) under prefers-reduced-motion.
 */
export function RingParticlesBackground({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const glow = makeGlowSprite();

    let width = 0;
    let height = 0;

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let targetX = 0;
    let targetY = 0;
    let cx = 0;
    let cy = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      targetX = width / 2;
      targetY = height / 2;
    };

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(parent);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    cx = targetX = width / 2;
    cy = targetY = height / 2;

    // Seeded per-particle variation (computed once) so the field looks
    // organic rather than perfectly symmetric, without re-randomising —
    // and therefore flickering — every frame.
    const numRows = 14;
    const numParticles = 34;
    const rand = mulberry32(1337);
    const jitter: { size: number; phase: number }[] = [];
    for (let r = 0; r < numRows; r++) {
      for (let i = 0; i < numParticles; i++) {
        jitter.push({ size: 2 + rand() * 2.6, phase: rand() * Math.PI * 2 });
      }
    }

    function drawFrame(t: number) {
      ctx!.clearRect(0, 0, width, height);

      const innerRadius = Math.min(width, height) * 0.2;
      const thickness = Math.min(width, height) * 0.34;
      const outerRadius = innerRadius + thickness;
      const halfThick = thickness / 2;

      for (let r = 0; r < numRows; r++) {
        const rowProgress = numRows > 1 ? r / (numRows - 1) : 0;
        const baseRadius = innerRadius + rowProgress * thickness;

        for (let i = 0; i < numParticles; i++) {
          const j = jitter[r * numParticles + i];
          const angle = (i / numParticles) * Math.PI * 2 + j.phase * 0.05;

          const w1 = Math.sin(angle * 4 + t);
          const w2 = Math.sin(angle * 6 - t * 0.8 + j.phase);
          const rowOffset = Math.sin(r * 0.5 + t);
          const waveHeight = w1 + w2 + rowOffset;

          const normalized = Math.pow(Math.max(0, (waveHeight + 3) / 6), 1.5);
          const finalRadius = baseRadius + waveHeight * 12;

          const x = cx + Math.cos(angle) * finalRadius;
          const y = cy + Math.sin(angle) * finalRadius;

          const distFromInner = finalRadius - innerRadius;
          const distFromOuter = outerRadius - finalRadius;
          const visibility = Math.max(
            0,
            Math.min(1, Math.min(distFromInner, distFromOuter) / halfThick),
          );

          const alpha = 0.12 + normalized * 0.75 * visibility;
          if (alpha < 0.03) continue;

          const d = j.size * 3; // sprite draw size (bigger than the core dot)
          ctx!.globalAlpha = Math.min(1, alpha);
          ctx!.drawImage(glow, x - d / 2, y - d / 2, d, d);
        }
      }
      ctx!.globalAlpha = 1;
    }

    let raf = 0;
    const start = performance.now();
    let lastTime = start;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!visible || document.hidden) return;

      const reduced = prefersReduced.matches;
      if (reduced) {
        cx = targetX;
        cy = targetY;
      } else {
        // Frame-rate independent exponential smoothing (same feel at 30fps,
        // 60fps, or 144Hz — unlike a fixed per-frame lerp factor).
        const ease = 1 - Math.exp(-8 * dt);
        cx += (targetX - cx) * ease;
        cy += (targetY - cy) * ease;
      }
      drawFrame(reduced ? 0 : (now - start) / 1000 * 0.6);
    };

    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
