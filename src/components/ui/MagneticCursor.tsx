"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * MagneticCursor — replaces the default browser cursor with a
 * gold luxury dot + follower ring. Scales up on interactive elements.
 * Respects prefers-reduced-motion.
 */
export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices and reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (mq.matches || isTouch) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let hasMoved = false;

    const onMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        document.body.style.cursor = "none";
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      // Dot: snaps instantly
      gsap.set(dot, { x: e.clientX - 4, y: e.clientY - 4 });
      // Ring: follows with lag
      gsap.to(ring, {
        x: e.clientX - 18,
        y: e.clientY - 18,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    // Grow ring on hoverable elements
    const grow = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.55, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const shrink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    const interactives = document.querySelectorAll<HTMLElement>(
      "a, button, [role='button'], input, textarea, select, label"
    );

    window.addEventListener("mousemove", onMove);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      {/* Gold dot — desktop only, initially hidden until mouse movement */}
      <div
        ref={dotRef}
        className="hidden md:block opacity-0 fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999] shadow-[0_0_10px_rgba(212,175,55,0.9)]"
        style={{ willChange: "transform, opacity" }}
      />
      {/* Follower ring — desktop only, initially hidden until mouse movement */}
      <div
        ref={ringRef}
        className="hidden md:block opacity-0 fixed top-0 left-0 w-9 h-9 rounded-full border border-gold/80 pointer-events-none z-[9998] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
        style={{ willChange: "transform, opacity" }}
      />
    </>
  );
}
