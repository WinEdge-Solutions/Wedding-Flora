"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useCms } from "@/components/cms/CmsProvider";
import type { PageSectionConfig } from "@/lib/cms/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalGallery —
 * • Desktop (lg:min-width: 1024px): Pinned GSAP horizontal glide (or configurable grid layout).
 * • Mobile & Tablet (lg:hidden): Dedicated pure CSS/touch carousel with snap-center.
 */
export function HorizontalGallery({ section }: { section?: PageSectionConfig }) {
  const cms = useCms();
  const c = section?.content;
  const limit = section?.itemLimit ?? 6;
  const panels = cms.collections.gallery.slice(0, limit);
  const isGridMode =
    section?.layout === "grid-2" ||
    section?.layout === "grid-3" ||
    section?.layout === "grid-4";

  const desktopSectionRef = useRef<HTMLElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const [desktopActiveIdx, setDesktopActiveIdx] = useState(0);
  const [mobileActiveIdx, setMobileActiveIdx] = useState(0);

  /* ── Desktop GSAP Pin & Scrub ────────────────────── */
  useEffect(() => {
    if (isGridMode) return;
    const sectionEl = desktopSectionRef.current;
    const track = desktopTrackRef.current;
    if (!sectionEl || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const totalWidth = Math.max(0, track.scrollWidth - window.innerWidth);
      if (totalWidth <= 0) return;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * Math.max(1, panels.length - 1));
            setDesktopActiveIdx(idx);
          },
        },
      });
    });

    return () => mm.revert();
  }, [panels.length, isGridMode]);

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

  const eyebrow = c?.eyebrow || "Royal Celebrations";
  const title = c?.title || "A Legacy of Grand Moments";
  const mobileHint = c?.subtitle || "Swipe sideways to view all celebrations →";

  if (isGridMode) {
    const cols =
      section?.columns ??
      (section?.layout === "grid-4" ? 4 : section?.layout === "grid-2" ? 2 : 3);
    const gridClass =
      cols === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : cols === 2
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    return (
      <Section variant={section?.bgVariant ?? "cream"}>
        <Container>
          <div className="text-center pb-8 space-y-2">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-2">
              <span className="opacity-60">—</span>
              <span>{eyebrow}</span>
              <span className="opacity-60">—</span>
            </p>
            <h2 className="font-display text-2xl sm:text-5xl text-[#1A1209] font-semibold tracking-[0.03em]">
              {title}
            </h2>
          </div>
          <div className={`grid ${gridClass} gap-6`}>
            {panels.map((item) => (
              <div
                key={item.id}
                className="relative aspect-[4/5] overflow-hidden rounded-[3px] shadow-[0_8px_30px_rgba(26,18,9,0.08)] group"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
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
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          1. DESKTOP VIEWPORT (lg:block min-width: 1024px)
         ══════════════════════════════════════════════════════════════ */}
      <section
        ref={desktopSectionRef}
        className="hidden lg:block relative w-full overflow-hidden border-y border-gold/20"
        style={{
          backgroundColor:
            section?.bgVariant === "ivory"
              ? "var(--wf-paper, #FDFAF5)"
              : section?.bgVariant === "charcoal"
                ? "var(--wf-ink, #1A1209)"
                : "var(--wf-cream, #F7F3EC)",
        }}
        aria-label="Royal Celebrations Gallery"
      >
        <div className="relative z-10 pt-16 pb-6 text-center px-4">
          <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3 flex items-center justify-center gap-2">
            <span className="opacity-60">—</span>
            <span>{eyebrow}</span>
            <span className="opacity-60">—</span>
          </p>
          <SplitTextReveal
            text={title}
            as="h2"
            className="font-display text-5xl xl:text-6xl text-[#1A1209] font-semibold tracking-[0.03em]"
            stagger={0.03}
          />
        </div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
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
              <div className="absolute inset-0 border border-gold/0 hover:border-gold/50 transition-all duration-500 rounded-[3px]" />
              {desktopActiveIdx === i && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gold animate-pulse" />
              )}
            </div>
          ))}
        </div>

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
         ══════════════════════════════════════════════════════════════ */}
      <section
        className="block lg:hidden relative w-full overflow-hidden border-y border-gold/20 py-10"
        style={{
          backgroundColor:
            section?.bgVariant === "ivory"
              ? "var(--wf-paper, #FDFAF5)"
              : "var(--wf-cream, #F7F3EC)",
        }}
        aria-label="Royal Celebrations Gallery Mobile"
      >
        <div className="relative z-10 pb-4 text-center px-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2 flex items-center justify-center gap-2">
            <span className="opacity-60">—</span>
            <span>{eyebrow}</span>
            <span className="opacity-60">—</span>
          </p>
          <SplitTextReveal
            text={title}
            as="h2"
            className="font-display text-2xl sm:text-3xl text-[#1A1209] font-semibold tracking-[0.03em]"
            stagger={0.03}
          />
          <p className="font-sans text-[10px] text-[#D4AF37] font-semibold uppercase tracking-[0.2em] mt-2">
            {mobileHint}
          </p>
        </div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
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
              <div className="absolute inset-0 border border-gold/20 rounded-[3px] pointer-events-none" />
              {mobileActiveIdx === i && (
                <div className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-gold animate-pulse" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => scrollMobileTo(Math.max(0, mobileActiveIdx - 1))}
            disabled={mobileActiveIdx === 0}
            aria-label="Previous gallery image"
            className="w-7 h-7 rounded-full bg-white border border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold text-[#1A1209] flex items-center justify-center shadow-sm transition-all"
          >
            <ChevronLeft size={14} />
          </button>

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
