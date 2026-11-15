"use client";

import React, { useEffect, useRef } from "react";

/**
 * LightAurora — Subtle warm-ivory aurora for the light theme.
 *
 * Three large blurred radial orbs in champagne/blush/gold tones at
 * very low opacity (8–12%). They drift gently and react to the mouse
 * cursor with a soft parallax effect.
 *
 * Key design decisions for Option A (Ivory & Gold Classic):
 * - NO dark base. Background is #FDFAF5 (body handles this).
 * - mix-blend-mode: multiply so orbs darken the ivory slightly rather
 *   than blowing it out the way "screen" would.
 * - Opacity capped at 12% so text always sits cleanly on top.
 * - Respects prefers-reduced-motion.
 */
export function GlobalAurora() {
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const orbCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    const handleResize = () => { vw = window.innerWidth; vh = window.innerHeight; };
    window.addEventListener("resize", handleResize, { passive: true });

    let targetX = vw / 2;
    let targetY = vh * 0.4;
    let curX = vw / 2;
    let curY = vh * 0.4;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.012;

      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;

      const nx = curX / vw - 0.5; // -0.5 … +0.5
      const ny = curY / vh - 0.5;

      const breathe = 1 + Math.sin(time * 0.5) * 0.025;

      if (orbARef.current) {
        const dx = nx * 55 + Math.cos(time * 0.4) * 18;
        const dy = ny * 40 + Math.sin(time * 0.5) * 14;
        orbARef.current.style.transform = `translate3d(${dx}px,${dy}px,0) scale(${breathe})`;
      }
      if (orbBRef.current) {
        const dx = nx * -40 + Math.sin(time * 0.35) * 16;
        const dy = ny * 50 + Math.cos(time * 0.45) * 12;
        orbBRef.current.style.transform = `translate3d(${dx}px,${dy}px,0) scale(${breathe * 0.98})`;
      }
      if (orbCRef.current) {
        const dx = nx * 30 + Math.cos(time * 0.3) * 12;
        const dy = ny * -30 + Math.sin(time * 0.38) * 10;
        orbCRef.current.style.transform = `translate3d(${dx}px,${dy}px,0) scale(${breathe * 1.02})`;
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Orb A — warm champagne gold, top-left */}
      <div
        ref={orbARef}
        className="absolute -top-[20%] -left-[15%] w-[80vw] max-w-[1000px] rounded-full will-change-transform"
        style={{
          height: "80vw",
          maxHeight: "1000px",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.11) 0%, rgba(243,229,171,0.07) 45%, transparent 70%)",
          filter: "blur(70px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Orb B — blush rose, top-right */}
      <div
        ref={orbBRef}
        className="absolute top-[10%] -right-[18%] w-[65vw] max-w-[850px] rounded-full will-change-transform"
        style={{
          height: "65vw",
          maxHeight: "850px",
          background:
            "radial-gradient(circle, rgba(241,220,225,0.13) 0%, rgba(212,175,55,0.06) 50%, transparent 70%)",
          filter: "blur(80px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Orb C — ivory warm, bottom-centre */}
      <div
        ref={orbCRef}
        className="absolute -bottom-[10%] left-[15%] w-[60vw] max-w-[780px] rounded-full will-change-transform"
        style={{
          height: "60vw",
          maxHeight: "780px",
          background:
            "radial-gradient(circle, rgba(247,243,236,0.18) 0%, rgba(212,175,55,0.05) 55%, transparent 70%)",
          filter: "blur(90px)",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
