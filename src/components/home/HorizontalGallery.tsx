"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { galleryData } from "@/lib/content/gallery";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalGallery — a GSAP-pinned horizontal scroll section on desktop,
 * and a smooth, touch-native horizontal carousel on mobile/tablet.
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

    // Use GSAP matchMedia so animations ONLY bind on desktop (min-width: 1024px)
    // and automatically clean up completely on smaller screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Main horizontal pin + scrub on desktop
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

      // Individual panel reveal animations (desktop only)
      track.querySelectorAll<HTMLElement>(".gallery-panel").forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          scale: 0.95,
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
    });

    return () => mm.revert();
  }, [panels.length]);

  // Touch scroll handler for mobile/tablet
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return;
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const card = target.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 16 : 320;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== activeIdx && newIdx >= 0 && newIdx < panels.length) {
      setActiveIdx(newIdx);
    }
  };

  const scrollToPanel = (idx: number) => {
    setActiveIdx(idx);
    if (!trackRef.current) return;
    const track = trackRef.current;
    const card = track.children[idx] as HTMLElement;
    if (card) {
      const targetScroll = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F7F3EC] border-y border-gold/20"
      aria-label="Royal Celebrations Gallery"
    >
      {/* Section header */}
      <div className="relative z-10 pt-10 sm:pt-16 pb-4 sm:pb-6 text-center px-4">
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#D4AF37] font-semibold mb-2 sm:mb-3 flex items-center justify-center gap-2">
          <span className="opacity-60">—</span>
          <span>Royal Celebrations</span>
          <span className="opacity-60">—</span>
        </p>
        <SplitTextReveal
          text="A Legacy of Grand Moments"
          as="h2"
          className="font-display text-2xl sm:text-5xl lg:text-6xl text-[#1A1209] font-semibold tracking-[0.03em]"
          stagger={0.03}
        />
        {/* Mobile swipe helper hint */}
        <p className="lg:hidden font-sans text-[10px] text-[#D4AF37] font-semibold uppercase tracking-[0.2em] mt-2">
          Swipe sideways to view all celebrations →
        </p>
      </div>

      {/* Horizontal track — touch swipeable on mobile, pinned GSAP on desktop */}
      <div
        ref={trackRef}
        onScroll={handleMobileScroll}
        className="flex items-center gap-4 lg:gap-6 px-4 sm:px-8 lg:px-16 pb-12 lg:pb-24 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none no-scrollbar touch-pan-x"
      >
        {panels.map((item, i) => (
          <div
            key={item.id}
            className={`gallery-panel relative flex-shrink-0 overflow-hidden rounded-[3px] cursor-pointer transition-all duration-300 snap-center lg:snap-align-none shadow-[0_8px_30px_rgba(26,18,9,0.08)] hover:shadow-[0_16px_45px_rgba(212,175,55,0.25)] ${
              i % 3 === 1
                ? "w-[84vw] sm:w-[320px] lg:w-[340px] h-[360px] sm:h-[420px] lg:h-[500px]"
                : "w-[84vw] sm:w-[320px] lg:w-[340px] h-[330px] sm:h-[380px] lg:h-[440px]"
            }`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 1024px) 85vw, 340px"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
            />

            {/* Gradient overlay for photo readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Panel label */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-1">
                {item.category}
              </p>
              <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-[#FAF7F2]/80 mt-1">
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

      {/* Progress bar + touch controls at bottom */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {/* Mobile touch prev */}
        <button
          type="button"
          onClick={() => scrollToPanel(Math.max(0, activeIdx - 1))}
          disabled={activeIdx === 0}
          aria-label="Previous gallery image"
          className="lg:hidden w-7 h-7 rounded-full bg-white border border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold text-[#1A1209] flex items-center justify-center shadow-sm transition-all"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {panels.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPanel(i)}
              aria-label={`Jump to panel ${i + 1}`}
              className={`rounded-full transition-all duration-300 p-0 border-0 ${
                i === activeIdx
                  ? "w-6 h-1.5 bg-gold"
                  : "w-1.5 h-1.5 bg-[#1A1209]/20 hover:bg-[#1A1209]/40"
              }`}
            />
          ))}
        </div>

        {/* Mobile touch next */}
        <button
          type="button"
          onClick={() => scrollToPanel(Math.min(panels.length - 1, activeIdx + 1))}
          disabled={activeIdx === panels.length - 1}
          aria-label="Next gallery image"
          className="lg:hidden w-7 h-7 rounded-full bg-white border border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold text-[#1A1209] flex items-center justify-center shadow-sm transition-all"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}
