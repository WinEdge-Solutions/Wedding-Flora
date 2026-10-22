"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export interface AuroraTheme {
  name: string;
  leftWing: string;
  rightWing: string;
  centerGlow: string;
  spotlight: string;
  lowerBlob1: string;
  lowerBlob2: string;
  lowerBlob3: string;
}

export const AURORA_THEMES: Record<string, AuroraTheme> = {
  // 1. Home — Heritage Crimson & Palace Amber (Imperial Crimson, Ruby Rose, Saffron Amber Gold)
  home: {
    name: "Heritage Crimson & Palace Amber",
    leftWing:
      "radial-gradient(ellipse 90% 60% at 30% 50%, rgba(220,38,38,0.88) 0%, rgba(225,29,72,0.80) 35%, rgba(180,83,9,0.55) 65%, transparent 85%)",
    rightWing:
      "radial-gradient(ellipse 90% 60% at 70% 50%, rgba(245,158,11,0.88) 0%, rgba(217,119,6,0.82) 35%, rgba(159,18,57,0.55) 65%, transparent 85%)",
    centerGlow:
      "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.70) 0%, rgba(225,29,72,0.45) 40%, rgba(88,28,135,0.32) 65%, transparent 80%)",
    spotlight:
      "radial-gradient(circle at center, rgba(245,158,11,0.45) 0%, rgba(225,29,72,0.30) 30%, rgba(212,175,55,0.20) 55%, transparent 75%)",
    lowerBlob1:
      "radial-gradient(ellipse at center, rgba(159,18,57,0.55) 0%, rgba(180,83,9,0.35) 45%, transparent 75%)",
    lowerBlob2:
      "radial-gradient(ellipse at center, rgba(217,119,6,0.50) 0%, rgba(127,29,29,0.35) 45%, transparent 75%)",
    lowerBlob3:
      "radial-gradient(ellipse at center, rgba(212,175,55,0.42) 0%, rgba(88,28,135,0.28) 45%, transparent 75%)",
  },

  // 2. About — Cosmic Stitch (Electric Cyan, Sapphire Blue, Radiant Violet, Palace Gold)
  about: {
    name: "Cosmic Stitch",
    leftWing:
      "radial-gradient(ellipse 90% 60% at 30% 50%, rgba(6,182,212,0.85) 0%, rgba(37,99,235,0.80) 35%, rgba(99,102,241,0.50) 65%, transparent 85%)",
    rightWing:
      "radial-gradient(ellipse 90% 60% at 70% 50%, rgba(192,132,252,0.85) 0%, rgba(147,51,234,0.80) 32%, rgba(59,130,246,0.55) 65%, transparent 85%)",
    centerGlow:
      "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(99,102,241,0.65) 0%, rgba(59,130,246,0.45) 40%, rgba(212,175,55,0.25) 60%, transparent 80%)",
    spotlight:
      "radial-gradient(circle at center, rgba(147,51,234,0.45) 0%, rgba(59,130,246,0.30) 30%, rgba(212,175,55,0.15) 55%, transparent 75%)",
    lowerBlob1:
      "radial-gradient(ellipse at center, rgba(126,34,206,0.55) 0%, rgba(79,70,229,0.35) 45%, transparent 75%)",
    lowerBlob2:
      "radial-gradient(ellipse at center, rgba(37,99,235,0.50) 0%, rgba(13,148,136,0.35) 45%, transparent 75%)",
    lowerBlob3:
      "radial-gradient(ellipse at center, rgba(212,175,55,0.40) 0%, rgba(190,24,93,0.28) 45%, transparent 75%)",
  },

  // 3. Services — Imperial Emerald & Cyber Teal (Deep Jade Emerald, Cyber Teal, 24K Gold, Midnight Indigo)
  services: {
    name: "Imperial Emerald & Cyber Teal",
    leftWing:
      "radial-gradient(ellipse 90% 60% at 30% 50%, rgba(16,185,129,0.88) 0%, rgba(5,150,105,0.82) 35%, rgba(6,182,212,0.55) 65%, transparent 85%)",
    rightWing:
      "radial-gradient(ellipse 90% 60% at 70% 50%, rgba(6,182,212,0.88) 0%, rgba(14,165,233,0.82) 35%, rgba(16,185,129,0.50) 65%, transparent 85%)",
    centerGlow:
      "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.65) 0%, rgba(16,185,129,0.48) 40%, rgba(30,27,75,0.35) 65%, transparent 80%)",
    spotlight:
      "radial-gradient(circle at center, rgba(16,185,129,0.45) 0%, rgba(6,182,212,0.30) 30%, rgba(212,175,55,0.18) 55%, transparent 75%)",
    lowerBlob1:
      "radial-gradient(ellipse at center, rgba(5,150,105,0.55) 0%, rgba(6,182,212,0.35) 45%, transparent 75%)",
    lowerBlob2:
      "radial-gradient(ellipse at center, rgba(6,182,212,0.50) 0%, rgba(30,27,75,0.40) 45%, transparent 75%)",
    lowerBlob3:
      "radial-gradient(ellipse at center, rgba(212,175,55,0.40) 0%, rgba(16,185,129,0.30) 45%, transparent 75%)",
  },

  // 4. Celebrations & Portfolio — Sunset Magenta & Coral Rose (Fuchsia, Coral Rose, Electric Violet, Starlit Gold)
  celebrations: {
    name: "Sunset Magenta & Coral Rose",
    leftWing:
      "radial-gradient(ellipse 90% 60% at 30% 50%, rgba(217,70,239,0.88) 0%, rgba(192,38,211,0.82) 35%, rgba(244,63,94,0.55) 65%, transparent 85%)",
    rightWing:
      "radial-gradient(ellipse 90% 60% at 70% 50%, rgba(244,63,94,0.88) 0%, rgba(225,29,72,0.80) 35%, rgba(245,158,11,0.55) 65%, transparent 85%)",
    centerGlow:
      "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.68) 0%, rgba(217,70,239,0.48) 40%, rgba(254,240,138,0.30) 65%, transparent 80%)",
    spotlight:
      "radial-gradient(circle at center, rgba(217,70,239,0.45) 0%, rgba(244,63,94,0.30) 30%, rgba(254,240,138,0.20) 55%, transparent 75%)",
    lowerBlob1:
      "radial-gradient(ellipse at center, rgba(192,38,211,0.55) 0%, rgba(139,92,246,0.35) 45%, transparent 75%)",
    lowerBlob2:
      "radial-gradient(ellipse at center, rgba(244,63,94,0.50) 0%, rgba(245,158,11,0.35) 45%, transparent 75%)",
    lowerBlob3:
      "radial-gradient(ellipse at center, rgba(254,240,138,0.38) 0%, rgba(217,70,239,0.28) 45%, transparent 75%)",
  },

  // 5. Packages — Celestial Amethyst & Liquid Gold (Royal Amethyst, Celestial Royal Blue, Liquid 24K Gold)
  packages: {
    name: "Celestial Amethyst & Liquid Gold",
    leftWing:
      "radial-gradient(ellipse 90% 60% at 30% 50%, rgba(147,51,234,0.88) 0%, rgba(126,34,206,0.82) 35%, rgba(79,70,229,0.55) 65%, transparent 85%)",
    rightWing:
      "radial-gradient(ellipse 90% 60% at 70% 50%, rgba(245,158,11,0.88) 0%, rgba(212,175,55,0.82) 35%, rgba(147,51,234,0.50) 65%, transparent 85%)",
    centerGlow:
      "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.68) 0%, rgba(147,51,234,0.52) 40%, rgba(212,175,55,0.32) 65%, transparent 80%)",
    spotlight:
      "radial-gradient(circle at center, rgba(147,51,234,0.45) 0%, rgba(212,175,55,0.30) 30%, rgba(59,130,246,0.20) 55%, transparent 75%)",
    lowerBlob1:
      "radial-gradient(ellipse at center, rgba(126,34,206,0.55) 0%, rgba(212,175,55,0.35) 45%, transparent 75%)",
    lowerBlob2:
      "radial-gradient(ellipse at center, rgba(59,130,246,0.50) 0%, rgba(147,51,234,0.35) 45%, transparent 75%)",
    lowerBlob3:
      "radial-gradient(ellipse at center, rgba(212,175,55,0.42) 0%, rgba(79,70,229,0.30) 45%, transparent 75%)",
  },

  // 6. Contact — Warm Obsidian & Rose Bronze (Rose Quartz, Warm Amber Bronze, Midnight Violet)
  contact: {
    name: "Warm Obsidian & Rose Bronze",
    leftWing:
      "radial-gradient(ellipse 90% 60% at 30% 50%, rgba(251,113,133,0.85) 0%, rgba(225,29,72,0.78) 35%, rgba(217,119,6,0.55) 65%, transparent 85%)",
    rightWing:
      "radial-gradient(ellipse 90% 60% at 70% 50%, rgba(217,119,6,0.88) 0%, rgba(180,83,9,0.82) 35%, rgba(76,29,149,0.55) 65%, transparent 85%)",
    centerGlow:
      "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(245,158,11,0.68) 0%, rgba(251,113,133,0.48) 40%, rgba(76,29,149,0.35) 65%, transparent 80%)",
    spotlight:
      "radial-gradient(circle at center, rgba(251,113,133,0.45) 0%, rgba(217,119,6,0.30) 30%, rgba(212,175,55,0.20) 55%, transparent 75%)",
    lowerBlob1:
      "radial-gradient(ellipse at center, rgba(225,29,72,0.55) 0%, rgba(217,119,6,0.35) 45%, transparent 75%)",
    lowerBlob2:
      "radial-gradient(ellipse at center, rgba(217,119,6,0.50) 0%, rgba(76,29,149,0.35) 45%, transparent 75%)",
    lowerBlob3:
      "radial-gradient(ellipse at center, rgba(251,113,133,0.40) 0%, rgba(245,158,11,0.30) 45%, transparent 75%)",
  },
};

function getThemeForPath(pathname: string): AuroraTheme {
  if (!pathname) return AURORA_THEMES.home;
  if (pathname.startsWith("/about")) return AURORA_THEMES.about;
  if (pathname.startsWith("/services")) return AURORA_THEMES.services;
  if (pathname.startsWith("/celebrations") || pathname.startsWith("/portfolio"))
    return AURORA_THEMES.celebrations;
  if (pathname.startsWith("/packages")) return AURORA_THEMES.packages;
  if (pathname.startsWith("/contact")) return AURORA_THEMES.contact;
  return AURORA_THEMES.home;
}

/**
 * GlobalAurora — Google-Stitch-style full-site responsive aurora gradient background.
 *
 * Features:
 * 1. Deep cosmic dark base (#030308).
 * 2. Fine geometric dot matrix overlay (24px grid with radial vignette).
 * 3. Multi-page dynamic palette shifts:
 *    - Home: Cosmic Stitch (Electric Cyan / Sapphire Blue / Radiant Violet)
 *    - About: Heritage Crimson & Palace Amber
 *    - Services: Imperial Emerald & Cyber Teal
 *    - Celebrations: Sunset Magenta & Coral Rose
 *    - Packages: Celestial Amethyst & Liquid Gold
 *    - Contact: Warm Obsidian & Rose Bronze
 * 4. Smooth 1000ms crossfade between routes with hardware-accelerated opacity.
 * 5. 60/120fps mouse reactivity with lerp physics and 3D wing tilt.
 * 6. Scroll-reactive floating nebulae tracking vertical scroll depth.
 */
export function GlobalAurora() {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [activeLayer, setActiveLayer] = useState<"A" | "B">("A");
  const [themeA, setThemeA] = useState<AuroraTheme>(() => getThemeForPath(pathname));
  const [themeB, setThemeB] = useState<AuroraTheme>(() => getThemeForPath(pathname));

  // Route-based crossfade during render
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    const targetTheme = getThemeForPath(pathname);
    if (activeLayer === "A") {
      setThemeB(targetTheme);
      setActiveLayer("B");
    } else {
      setThemeA(targetTheme);
      setActiveLayer("A");
    }
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const centerGlowRef = useRef<HTMLDivElement>(null);
  const lowerBlob1Ref = useRef<HTMLDivElement>(null);
  const lowerBlob2Ref = useRef<HTMLDivElement>(null);
  const lowerBlob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let vw = window.innerWidth;
    let vh = window.innerHeight;

    const handleResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let targetMouseX = vw / 2;
    let targetMouseY = vh * 0.4;

    let mouseX = vw / 2;
    let mouseY = vh * 0.4;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;

      if (!prefersReducedMotion) {
        mouseX += (targetMouseX - mouseX) * 0.07;
        mouseY += (targetMouseY - mouseY) * 0.07;
        currentScrollY += (targetScrollY - currentScrollY) * 0.06;

        const nx = mouseX / vw - 0.5;
        const ny = mouseY / vh - 0.5;

        const breathe = Math.sin(time * 0.8) * 15;
        const breatheScale = 1 + Math.sin(time * 0.5) * 0.04;

        // 1. Cursor Spotlight
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
        }

        // 2. Left Aurora Wing (Tilts and stretches with mouse)
        if (leftWingRef.current) {
          const lx = nx * 90 + Math.cos(time * 0.6) * 20;
          const ly = ny * 60 + Math.sin(time * 0.7) * 15 - (currentScrollY * 0.12) % 300;
          const rot = -22 + nx * 14;
          leftWingRef.current.style.transform = `translate3d(${lx}px, ${ly}px, 0) rotate(${rot}deg) scale(${breatheScale})`;
        }

        // 3. Right Aurora Wing (Counter-rotates for 3D depth)
        if (rightWingRef.current) {
          const rx = nx * -80 + Math.sin(time * 0.5) * 20;
          const ry = ny * 70 + Math.cos(time * 0.6) * 15 - (currentScrollY * 0.12) % 300;
          const rot = 22 - nx * 14;
          rightWingRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) rotate(${rot}deg) scale(${breatheScale})`;
        }

        // 4. Center Core Glow
        if (centerGlowRef.current) {
          const cx = nx * 40;
          const cy = ny * 40 + breathe;
          centerGlowRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(${breatheScale * 1.02})`;
        }

        // 5. Lower Page Floating Nebulae
        if (lowerBlob1Ref.current) {
          const l1y =
            (currentScrollY * 0.18 + Math.sin(time * 0.4) * 30) % (vh * 1.5) -
            vh * 0.2;
          const l1x = nx * 50;
          lowerBlob1Ref.current.style.transform = `translate3d(${l1x}px, ${l1y}px, 0) scale(${breatheScale})`;
        }

        if (lowerBlob2Ref.current) {
          const l2y =
            (currentScrollY * 0.22 + Math.cos(time * 0.5) * 35) % (vh * 1.5) -
            vh * 0.1;
          const l2x = nx * -60;
          lowerBlob2Ref.current.style.transform = `translate3d(${l2x}px, ${l2y}px, 0) scale(${breatheScale * 0.98})`;
        }

        if (lowerBlob3Ref.current) {
          const l3y =
            (currentScrollY * 0.15 + Math.sin(time * 0.3) * 25) % (vh * 1.5);
          const l3x = nx * 35;
          lowerBlob3Ref.current.style.transform = `translate3d(${l3x}px, ${l3y}px, 0) scale(${breatheScale * 1.05})`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ background: "#030308" }}
    >
      {/* ── 1. Cosmic Deep Space Void ────────────────────────────── */}
      <div className="absolute inset-0 bg-[#030308]" />

      {/* ── 2. Additive Aurora Glow Canvas (mix-blend-mode: screen) ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ mixBlendMode: "screen" }}
      >
        {/* Left Wing Ribbon */}
        <div
          ref={leftWingRef}
          className="absolute -top-[10%] -left-[15%] w-[85vw] max-w-[1200px] h-[520px] rounded-[100%] will-change-transform"
          style={{ filter: "blur(65px)" }}
        >
          <div
            className="absolute inset-0 rounded-[100%] transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeA.leftWing,
              opacity: activeLayer === "A" ? 0.9 : 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-[100%] transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeB.leftWing,
              opacity: activeLayer === "B" ? 0.9 : 0,
            }}
          />
        </div>

        {/* Right Wing Ribbon */}
        <div
          ref={rightWingRef}
          className="absolute -top-[5%] -right-[15%] w-[85vw] max-w-[1200px] h-[520px] rounded-[100%] will-change-transform"
          style={{ filter: "blur(65px)" }}
        >
          <div
            className="absolute inset-0 rounded-[100%] transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeA.rightWing,
              opacity: activeLayer === "A" ? 0.9 : 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-[100%] transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeB.rightWing,
              opacity: activeLayer === "B" ? 0.9 : 0,
            }}
          />
        </div>

        {/* Center Crest Glow */}
        <div
          ref={centerGlowRef}
          className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[65vw] max-w-[900px] h-[400px] rounded-[100%] will-change-transform"
          style={{ filter: "blur(75px)" }}
        >
          <div
            className="absolute inset-0 rounded-[100%] transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeA.centerGlow,
              opacity: activeLayer === "A" ? 0.85 : 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-[100%] transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeB.centerGlow,
              opacity: activeLayer === "B" ? 0.85 : 0,
            }}
          />
        </div>

        {/* Interactive Pointer Spotlight */}
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full will-change-transform"
          style={{ filter: "blur(50px)" }}
        >
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeA.spotlight,
              opacity: activeLayer === "A" ? 0.95 : 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeB.spotlight,
              opacity: activeLayer === "B" ? 0.95 : 0,
            }}
          />
        </div>

        {/* Lower Page Floating Aurora Nebula 1 */}
        <div
          ref={lowerBlob1Ref}
          className="absolute top-[45%] -left-[10%] w-[60vw] max-w-[800px] h-[480px] rounded-full will-change-transform"
          style={{ filter: "blur(85px)" }}
        >
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeA.lowerBlob1,
              opacity: activeLayer === "A" ? 0.75 : 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeB.lowerBlob1,
              opacity: activeLayer === "B" ? 0.75 : 0,
            }}
          />
        </div>

        {/* Lower Page Floating Aurora Nebula 2 */}
        <div
          ref={lowerBlob2Ref}
          className="absolute top-[60%] -right-[10%] w-[65vw] max-w-[850px] h-[520px] rounded-full will-change-transform"
          style={{ filter: "blur(90px)" }}
        >
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeA.lowerBlob2,
              opacity: activeLayer === "A" ? 0.75 : 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeB.lowerBlob2,
              opacity: activeLayer === "B" ? 0.75 : 0,
            }}
          />
        </div>

        {/* Lower Page Floating Aurora Nebula 3 */}
        <div
          ref={lowerBlob3Ref}
          className="absolute top-[80%] left-[20%] w-[55vw] max-w-[750px] h-[450px] rounded-full will-change-transform"
          style={{ filter: "blur(80px)" }}
        >
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeA.lowerBlob3,
              opacity: activeLayer === "A" ? 0.7 : 0,
            }}
          />
          <div
            className="absolute inset-0 rounded-full transition-opacity duration-1000 ease-in-out"
            style={{
              background: themeB.lowerBlob3,
              opacity: activeLayer === "B" ? 0.7 : 0,
            }}
          />
        </div>
      </div>

      {/* ── 3. Google Stitch Geometric Dot Matrix ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.65) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse 90% 85% at 50% 45%, black 20%, rgba(0,0,0,0.5) 65%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 85% at 50% 45%, black 20%, rgba(0,0,0,0.5) 65%, transparent 100%)",
        }}
      />

      {/* ── 4. Subtle Cinematic Vignette ───────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 50%, transparent 40%, rgba(3,3,8,0.5) 75%, rgba(3,3,8,0.92) 100%)",
        }}
      />
    </div>
  );
}
