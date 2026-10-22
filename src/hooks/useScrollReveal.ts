"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — attaches a GSAP ScrollTrigger fade-up animation
 * to the given ref. Re-uses the same trigger instance per component.
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    ease?: string;
    stagger?: number;
    childSelector?: string;
    delay?: number;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 50,
      opacity = 0,
      duration = 0.85,
      ease = "power3.out",
      stagger = 0.08,
      childSelector,
      delay = 0,
    } = options ?? {};

    const target = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    const ctx = gsap.context(() => {
      gsap.from(target, {
        y,
        opacity,
        duration,
        ease,
        stagger,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
