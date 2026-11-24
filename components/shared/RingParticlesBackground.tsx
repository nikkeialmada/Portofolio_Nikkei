"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

/** Violet accent, matches --primary in globals.css. */
const PRIMARY_RGB = "109, 40, 217";

/**
 * Decorative ring-of-particles background, inspired by the Houdini
 * PaintWorklet effect on Google's Antigravity site (bram.us/2025/12/02/
 * google-antigravity-modern-css) — reimplemented on <canvas> so it works in
 * every browser instead of only Chromium (CSS Paint API has no Firefox/
 * Safari support without a polyfill).
 *
 * Layered sine waves distort a ring of particles into a slow, organic
 * ripple; the ring's centre eases toward the pointer. Fully decorative:
 * aria-hidden, pointer-events-none, pauses off-screen, hidden tabs, and
 * under prefers-reduced-motion.
 */
export function RingParticlesBackground({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

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
      if (prefersReduced.matches) drawFrame(0);
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

    const numRows = 10;
    const numParticles = 26;
    const particleSize = 1.6;

    function drawFrame(t: number) {
      ctx!.clearRect(0, 0, width, height);

      const innerRadius = Math.min(width, height) * 0.16;
      const thickness = Math.min(width, height) * 0.22;
      const outerRadius = innerRadius + thickness;
      const halfThick = thickness / 2;

      for (let r = 0; r < numRows; r++) {
        const rowProgress = numRows > 1 ? r / (numRows - 1) : 0;
        const baseRadius = innerRadius + rowProgress * thickness;

        for (let i = 0; i < numParticles; i++) {
          const angle = (i / numParticles) * Math.PI * 2;
          const w1 = Math.sin(angle * 4 + t);
          const w2 = Math.sin(angle * 6 - t * 0.8);
          const rowOffset = Math.sin(r * 0.5 + t);
          const waveHeight = w1 + w2 + rowOffset;

          const normalized = Math.pow(Math.max(0, (waveHeight + 3) / 6), 1.5);
          const finalRadius = baseRadius + waveHeight * 10;

          const x = cx + Math.cos(angle) * finalRadius;
          const y = cy + Math.sin(angle) * finalRadius;

          const distFromInner = finalRadius - innerRadius;
          const distFromOuter = outerRadius - finalRadius;
          const visibility = Math.max(
            0,
            Math.min(1, Math.min(distFromInner, distFromOuter) / halfThick),
          );

          const alpha = 0.06 + normalized * 0.38 * visibility;
          if (alpha < 0.015) continue;

          ctx!.beginPath();
          ctx!.fillStyle = `rgba(${PRIMARY_RGB}, ${alpha.toFixed(3)})`;
          ctx!.arc(x, y, particleSize, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (prefersReduced.matches) return; // stay on the single static frame
      if (visible && !document.hidden) {
        cx += (targetX - cx) * 0.05;
        cy += (targetY - cy) * 0.05;
        drawFrame(((now - start) / 1000) * 0.6);
      }
      raf = requestAnimationFrame(tick);
    };

    const onMotionChange = () => {
      cancelAnimationFrame(raf);
      if (prefersReduced.matches) {
        drawFrame(0);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    parent.addEventListener("pointermove", onPointerMove);
    parent.addEventListener("pointerleave", onPointerLeave);
    prefersReduced.addEventListener("change", onMotionChange);

    if (prefersReduced.matches) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
      prefersReduced.removeEventListener("change", onMotionChange);
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
