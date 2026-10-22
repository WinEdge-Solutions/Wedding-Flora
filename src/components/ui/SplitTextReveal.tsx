"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  /** Delay before the stagger starts (seconds) */
  delay?: number;
  /** Per-character stagger (seconds) */
  stagger?: number;
  /** Animation duration per character */
  duration?: number;
  /** Trigger offset, e.g. "top 85%" */
  start?: string;
  /** Extra inline style */
  style?: React.CSSProperties;
}

/**
 * SplitTextReveal — splits a string into individual <span> characters,
 * then animates them from below using GSAP ScrollTrigger.
 * Degrades gracefully: without GSAP it still renders readable text.
 */
export function SplitTextReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.025,
  duration = 0.9,
  start = "top 88%",
  style,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = el.querySelectorAll<HTMLSpanElement>(".char");

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        y: "110%",
        opacity: 0,
        rotationZ: 4,
        duration,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, duration, start]);

  // Split into words, then chars, preserving spaces between words
  const words = text.split(" ");

  return (
    <Tag
      ref={containerRef as React.RefObject<never>}
      className={className}
      style={style}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block"
          style={{ overflow: "hidden", verticalAlign: "bottom" }}
          aria-hidden="true"
        >
          {word.split("").map((char, ci) => (
            <span
              key={ci}
              className="char inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
