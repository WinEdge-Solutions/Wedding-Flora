"use client";

import { useEffect, useRef } from "react";

/**
 * MouseAurora — Google-Stitch-style deep aurora gradient background.
 *
 * Five large blurred gradient blobs sit on a near-black background.
 * Each blob lerps toward the mouse cursor at a different speed, creating
 * a parallax depth illusion. A subtle dot-grid overlays everything.
 *
 * Color palette (dark luxury wedding):
 *   - Deep royal purple   #3A0D6E → #1A0440
 *   - Indigo ocean        #0D1A6E → #060D40
 *   - Deep crimson rose   #6E0D2A → #400612
 *   - Warm amber gold     #6E3D0D → #402008   (brand gold, darkened)
 *   - Midnight teal       #0D4A5C → #061A24
 */
export function MouseAurora() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight * 0.4;

    // Smoothed positions for each blob (separate lerp state)
    const blobState = [
      { cx: window.innerWidth * 0.1,  cy: window.innerHeight * 0.6, speed: 0.032 },
      { cx: window.innerWidth * 0.85, cy: window.innerHeight * 0.5, speed: 0.018 },
      { cx: window.innerWidth * 0.5,  cy: window.innerHeight * 0.85, speed: 0.025 },
      { cx: window.innerWidth * 0.2,  cy: window.innerHeight * 0.2, speed: 0.012 },
      { cx: window.innerWidth * 0.75, cy: window.innerHeight * 0.15, speed: 0.022 },
    ];

    // Blob elements
    const blobs = Array.from(
      container.querySelectorAll<HTMLElement>(".m-aurora-blob")
    );

    // Parallax multipliers per blob (how far they follow the mouse relative to center)
    const parallax = [0.28, 0.18, 0.22, 0.14, 0.20];

    const cx0 = window.innerWidth / 2;
    const cy0 = window.innerHeight / 2;

    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const dx = mouseX - cx0;
      const dy = mouseY - cy0;

      blobs.forEach((blob, i) => {
        const s = blobState[i];
        const targetX = cx0 + dx * parallax[i];
        const targetY = cy0 + dy * parallax[i];

        // Lerp toward target
        s.cx += (targetX - s.cx) * (mq.matches ? 1 : s.speed);
        s.cy += (targetY - s.cy) * (mq.matches ? 1 : s.speed);

        blob.style.left = `${s.cx}px`;
        blob.style.top  = `${s.cy}px`;
      });

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Base background: deep warm-black ─────────── */}
      <div className="absolute inset-0 bg-[#080509]" />

      {/* ── Dot-grid overlay (exact Stitch look) ─────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Aurora blob 1: Left — Deep Royal Purple ───── */}
      <div
        className="m-aurora-blob absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "900px",
          height: "750px",
          background:
            "radial-gradient(ellipse at center, rgba(88,28,180,0.72) 0%, rgba(58,13,110,0.48) 38%, rgba(26,4,64,0.18) 70%, transparent 100%)",
          filter: "blur(80px)",
          willChange: "left, top",
        }}
      />

      {/* ── Aurora blob 2: Right — Indigo Ocean ──────── */}
      <div
        className="m-aurora-blob absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(29,78,216,0.60) 0%, rgba(13,30,110,0.40) 40%, rgba(6,10,40,0.15) 70%, transparent 100%)",
          filter: "blur(90px)",
          willChange: "left, top",
        }}
      />

      {/* ── Aurora blob 3: Bottom-center — Crimson Rose */}
      <div
        className="m-aurora-blob absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "650px",
          background:
            "radial-gradient(ellipse at center, rgba(157,23,77,0.55) 0%, rgba(110,13,42,0.35) 42%, rgba(64,6,18,0.12) 72%, transparent 100%)",
          filter: "blur(75px)",
          willChange: "left, top",
        }}
      />

      {/* ── Aurora blob 4: Top-left — Warm Amber Gold ── */}
      <div
        className="m-aurora-blob absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "650px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(183,120,30,0.45) 0%, rgba(120,70,10,0.28) 45%, rgba(60,28,5,0.10) 72%, transparent 100%)",
          filter: "blur(85px)",
          willChange: "left, top",
        }}
      />

      {/* ── Aurora blob 5: Top-right — Midnight Teal ─── */}
      <div
        className="m-aurora-blob absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "720px",
          height: "680px",
          background:
            "radial-gradient(ellipse at center, rgba(6,118,140,0.50) 0%, rgba(13,74,92,0.32) 40%, rgba(6,26,36,0.12) 70%, transparent 100%)",
          filter: "blur(88px)",
          willChange: "left, top",
        }}
      />

      {/* ── Vignette: darken edges so center text pops ─ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 0%, rgba(8,5,9,0.45) 65%, rgba(8,5,9,0.85) 100%)",
        }}
      />

      {/* ── Top fade to merge with any navbar ─────────── */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(8,5,9,0.7) 0%, transparent 100%)",
        }}
      />

      {/* ── Bottom fade into next section ─────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(8,5,9,1) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
