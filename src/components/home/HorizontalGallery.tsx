"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryData } from "@/lib/content/gallery";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalGallery — a GSAP-pinned horizontal scroll section.
 * While the user scrolls vertically the gallery track glides
 * horizontally through all gallery panels. Each panel fades +
 * scales up on enter.
 */
export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const panels = galleryData.slice(0, 6);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Skip on mobile — not enough horizontal space
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Main horizontal pin + scrub
      const trigger = gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (panels.length - 1));
            setActiveIdx(idx);
          },
        },
      });

      // Individual panel reveal animations
      track.querySelectorAll<HTMLElement>(".gallery-panel").forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: trigger,
            start: "left 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [panels.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black/40 backdrop-blur-sm border-y border-white/[0.05]"
      aria-label="Royal Celebrations Gallery"
    >
      {/* Section header (visible above the pinned strip) */}
      <div className="relative z-10 pt-20 pb-8 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-bold mb-3 flex items-center justify-center gap-2">
          <span>✦</span>
          <span>Royal Celebrations</span>
          <span>✦</span>
        </p>
        <SplitTextReveal
          text="A Legacy of Grand Moments"
          as="h2"
          className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory font-bold tracking-[0.03em]"
          stagger={0.03}
        />
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 px-8 md:px-16 pb-24 will-change-transform"
        style={{ width: `${panels.length * 420 + 120}px` }}
      >
        {panels.map((item, i) => (
          <div
            key={item.id}
            className={`gallery-panel relative flex-shrink-0 overflow-hidden rounded-[3px] cursor-pointer transition-all duration-500 ${
              i % 3 === 1 ? "w-[340px] h-[500px]" : "w-[340px] h-[440px]"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="340px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030308]/95 via-transparent to-transparent" />

            {/* Panel label */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-1">
                {item.category}
              </p>
              <h3 className="font-serif text-xl text-ivory font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-ivory/60 mt-1">
                {item.location} · {item.year}
              </p>
            </div>

            {/* Gold border on hover */}
            <div className="absolute inset-0 border border-gold/0 hover:border-gold/50 transition-all duration-500 rounded-[3px]" />

            {/* Active dot indicator */}
            {activeIdx === i && (
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold animate-pulse" />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar at bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {panels.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-400 ${
              i === activeIdx
                ? "w-6 h-1.5 bg-gold"
                : "w-1.5 h-1.5 bg-ivory/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
