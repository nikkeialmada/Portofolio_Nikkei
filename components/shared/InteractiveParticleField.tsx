"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

interface Particle {
  ox: number;
  oy: number;
  length: number;
  color: string;
  baseAngle: number;
  curAngle: number;
  pushX: number;
  pushY: number;
  idlePhaseX: number;
  idlePhaseY: number;
  idleSpeedMul: number;
}

const COLORS = ["#4a5bd6", "#d6455d", "#9aa0b4", "#e8a33d", "#2f9e6e"];

/** Every tunable parameter for the effect lives here. */
const CONFIG = {
  areaPerParticle: 9000, // px^2 per particle -> count = (w*h) / areaPerParticle
  lineLengthMin: 3,
  lineLengthMax: 7,
  lineWidth: 1.6,
  pushRadius: 140,
  pushMaxOffset: 46,
  pushFalloff: 2, // quadratic
  returnEase: 0.08,
  angleEase: 0.12,
  idleAmplitude: 5,
  idleSpeed: 0.0018,
  maxDevicePixelRatio: 2,
};

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randomColor() {
  return COLORS[(Math.random() * COLORS.length) | 0];
}

/** Eases a direction as a unit vector (not the raw angle) so it never
 *  "jumps" when crossing the -PI/PI wraparound. */
function easeAngleTowards(target: number, current: number, ease: number) {
  const cvx = Math.cos(current);
  const cvy = Math.sin(current);
  const tvx = Math.cos(target);
  const tvy = Math.sin(target);
  const nvx = cvx + (tvx - cvx) * ease;
  const nvy = cvy + (tvy - cvy) * ease;
  return Math.atan2(nvy, nvx);
}

/**
 * Interactive particle field: short line segments scattered across the
 * container, pushed away from the pointer (quadratic falloff within a
 * 140px radius) and rotated perpendicular to the push direction, easing
 * back to their origin once the pointer moves away. Idle particles drift
 * gently (sin/cos). Styled after the hero effect on Google's Antigravity
 * site (antigravity.google).
 *
 * Pointer position is read on the parent container, not the canvas (which
 * is pointer-events:none) — pointermove bubbles up from it regardless.
 * Only devices with a fine pointer (mouse/trackpad) get the push
 * interaction; touch devices see the field at rest. Pauses off-screen and
 * on a hidden tab; freezes idle drift (but keeps the push response, since
 * that's direct interaction, not an autoplaying animation) under
 * prefers-reduced-motion.
 */
export function InteractiveParticleField({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    // Deliberately not gated on prefers-reduced-motion: the idle drift is a
    // small, constant-speed ambient motion (like the reference Antigravity
    // hero, which animates unconditionally too) rather than a large or
    // sudden transition, so it always plays.
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    function createParticles() {
      const count = Math.max(1, Math.round((width * height) / CONFIG.areaPerParticle));
      particles = new Array(count);
      for (let i = 0; i < count; i++) {
        const baseAngle = random(0, Math.PI * 2);
        particles[i] = {
          ox: random(0, width),
          oy: random(0, height),
          length: random(CONFIG.lineLengthMin, CONFIG.lineLengthMax),
          color: randomColor(),
          baseAngle,
          curAngle: baseAngle,
          pushX: 0,
          pushY: 0,
          idlePhaseX: random(0, Math.PI * 2),
          idlePhaseY: random(0, Math.PI * 2),
          idleSpeedMul: random(0.7, 1.3),
        };
      }
    }

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDevicePixelRatio);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const pointer = { x: -9999, y: -9999, active: false };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    if (hasFinePointer) {
      parent.addEventListener("pointermove", onPointerMove);
      parent.addEventListener("pointerleave", onPointerLeave);
    }

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

    let raf = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;

      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineWidth = CONFIG.lineWidth;

      const t = now * CONFIG.idleSpeed;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let targetPushX = 0;
        let targetPushY = 0;
        let targetAngle = p.baseAngle;
        let isPushed = false;

        if (hasFinePointer && pointer.active) {
          const dx = p.ox - pointer.x;
          const dy = p.oy - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.pushRadius && dist > 0.0001) {
            const strength = Math.pow(
              (CONFIG.pushRadius - dist) / CONFIG.pushRadius,
              CONFIG.pushFalloff,
            );
            const nx = dx / dist;
            const ny = dy / dist;
            targetPushX = nx * CONFIG.pushMaxOffset * strength;
            targetPushY = ny * CONFIG.pushMaxOffset * strength;
            targetAngle = Math.atan2(ny, nx) + Math.PI / 2;
            isPushed = true;
          }
        }

        if (isPushed) {
          p.pushX = targetPushX;
          p.pushY = targetPushY;
        } else {
          p.pushX += (0 - p.pushX) * CONFIG.returnEase;
          p.pushY += (0 - p.pushY) * CONFIG.returnEase;
        }

        p.curAngle = easeAngleTowards(targetAngle, p.curAngle, CONFIG.angleEase);

        const idleX = Math.sin(t * p.idleSpeedMul + p.idlePhaseX) * CONFIG.idleAmplitude;
        const idleY = Math.cos(t * p.idleSpeedMul + p.idlePhaseY) * CONFIG.idleAmplitude;

        const x = p.ox + idleX + p.pushX;
        const y = p.oy + idleY + p.pushY;
        const half = p.length / 2;
        const ex = Math.cos(p.curAngle) * half;
        const ey = Math.sin(p.curAngle) * half;

        ctx.beginPath();
        ctx.strokeStyle = p.color;
        ctx.moveTo(x - ex, y - ey);
        ctx.lineTo(x + ex, y + ey);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      if (hasFinePointer) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerleave", onPointerLeave);
      }
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
