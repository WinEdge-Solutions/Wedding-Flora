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
 * HorizontalGallery —
 * • Desktop (lg:min-width: 1024px): Pinned GSAP horizontal glide with staggered luxury cards.
 * • Mobile & Tablet (lg:hidden): Dedicated 100% pure CSS/touch carousel with snap-center,
 *   touch swipe, and pagination controls. Completely decoupled from GSAP to prevent any
 *   transform or clipping issues.
 */
export function HorizontalGallery() {
  const desktopSectionRef = useRef<HTMLElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const [desktopActiveIdx, setDesktopActiveIdx] = useState(0);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);

  const panels = galleryData.slice(0, 6);

  /* ── Desktop GSAP Pin & Scrub ────────────────────── */
  useEffect(() => {
    const section = desktopSectionRef.current;
    const track = desktopTrackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
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
            setDesktopActiveIdx(idx);
          },
        },
      });
    });

    return () => mm.revert();
  }, [panels.length]);

  /* ── Mobile Touch Scroll Handlers ───────────────── */
  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const card = target.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 16 : 320;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== mobileActiveIdx && newIdx >= 0 && newIdx < panels.length) {
      setMobileActiveIdx(newIdx);
    }
  };

  const scrollMobileTo = (idx: number) => {
    setMobileActiveIdx(idx);
    const track = mobileTrackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    if (card) {
      const targetScroll = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          1. DESKTOP VIEWPORT (lg:block min-width: 1024px)
          Pinned GSAP horizontal scroll with staggered luxury cards
         ══════════════════════════════════════════════════════════════ */}
      <section
        ref={desktopSectionRef}
        className="hidden lg:block relative w-full overflow-hidden bg-[#F7F3EC] border-y border-gold/20"
        aria-label="Royal Celebrations Gallery"
      >
        {/* Section Header */}
        <div className="relative z-10 pt-16 pb-6 text-center px-4">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3 flex items-center justify-center gap-2">
            <span className="opacity-60">—</span>
            <span>Royal Celebrations</span>
            <span className="opacity-60">—</span>
          </p>
          <SplitTextReveal
            text="A Legacy of Grand Moments"
            as="h2"
            className="font-display text-5xl xl:text-6xl text-[#1A1209] font-semibold tracking-[0.03em]"
            stagger={0.03}
          />
        </div>

        {/* Pinned horizontal glide track */}
        <div
          ref={desktopTrackRef}
          className="flex items-center gap-6 px-16 pb-24 overflow-x-visible will-change-transform"
        >
          {panels.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-panel relative flex-shrink-0 overflow-hidden rounded-[3px] cursor-pointer shadow-[0_8px_30px_rgba(26,18,9,0.08)] hover:shadow-[0_16px_45px_rgba(212,175,55,0.25)] transition-all duration-300 ${
                i % 3 === 1
                  ? "w-[340px] xl:w-[360px] h-[500px]"
                  : "w-[340px] xl:w-[360px] h-[440px]"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="360px"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Panel label */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-1">
                  {item.category}
                </p>
                <h3 className="font-serif text-xl text-[#FAF7F2] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#FAF7F2]/80 mt-1">
                  {item.location} · {item.year}
                </p>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-gold/0 hover:border-gold/50 transition-all duration-500 rounded-[3px]" />

              {/* Active dot indicator */}
              {desktopActiveIdx === i && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Desktop Progress bar at bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {panels.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === desktopActiveIdx
                  ? "w-6 h-1.5 bg-gold"
                  : "w-1.5 h-1.5 bg-[#1A1209]/20"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. MOBILE & TABLET VIEWPORT (lg:hidden)
          Dedicated pure CSS touch-scroll carousel:
          - Completely decoupled from GSAP (no transform/translate bugs)
          - Silky smooth touch snapping
          - Touch pagination & arrow navigation
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="block lg:hidden relative w-full overflow-hidden bg-[#F7F3EC] border-y border-gold/20 py-10"
        aria-label="Royal Celebrations Gallery Mobile"
      >
        {/* Mobile Header */}
        <div className="relative z-10 pb-4 text-center px-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2 flex items-center justify-center gap-2">
            <span className="opacity-60">—</span>
            <span>Royal Celebrations</span>
            <span className="opacity-60">—</span>
          </p>
          <SplitTextReveal
            text="A Legacy of Grand Moments"
            as="h2"
            className="font-display text-2xl sm:text-3xl text-[#1A1209] font-semibold tracking-[0.03em]"
            stagger={0.03}
          />
          <p className="font-sans text-[10px] text-[#D4AF37] font-semibold uppercase tracking-[0.2em] mt-2">
            Swipe sideways to view all celebrations →
          </p>
        </div>

        {/* Mobile Swipeable Track */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="relative flex items-center gap-4 px-4 pb-8 overflow-x-auto snap-x snap-mandatory no-scrollbar touch-pan-x"
        >
          {panels.map((item, i) => (
            <div
              key={item.id}
              onClick={() => scrollMobileTo(i)}
              className="relative flex-shrink-0 w-[82vw] max-w-[320px] h-[340px] sm:h-[380px] overflow-hidden rounded-[3px] snap-center cursor-pointer shadow-[0_8px_30px_rgba(26,18,9,0.08)]"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 85vw, 320px"
                className="object-cover"
              />

              {/* Gradient overlay for photo readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Panel label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-gold font-bold mb-1">
                  {item.category}
                </p>
                <h3 className="font-serif text-lg text-[#FAF7F2] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#FAF7F2]/80 mt-1">
                  {item.location} · {item.year}
                </p>
              </div>

              {/* Hairline gold border */}
              <div className="absolute inset-0 border border-gold/20 rounded-[3px] pointer-events-none" />

              {/* Active dot indicator */}
              {mobileActiveIdx === i && (
                <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-gold animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Touch Navigation (Prev / Dots / Next) */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => scrollMobileTo(Math.max(0, mobileActiveIdx - 1))}
            disabled={mobileActiveIdx === 0}
            aria-label="Previous gallery image"
            className="w-7 h-7 rounded-full bg-white border border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold text-[#1A1209] flex items-center justify-center shadow-sm transition-all"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {panels.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollMobileTo(i)}
                aria-label={`Jump to panel ${i + 1}`}
                className={`rounded-full transition-all duration-300 p-0 border-0 ${
                  i === mobileActiveIdx
                    ? "w-6 h-1.5 bg-gold"
                    : "w-1.5 h-1.5 bg-[#1A1209]/20 hover:bg-[#1A1209]/40"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => scrollMobileTo(Math.min(panels.length - 1, mobileActiveIdx + 1))}
            disabled={mobileActiveIdx === panels.length - 1}
            aria-label="Next gallery image"
            className="w-7 h-7 rounded-full bg-white border border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold text-[#1A1209] flex items-center justify-center shadow-sm transition-all"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </section>
    </>
  );
}
