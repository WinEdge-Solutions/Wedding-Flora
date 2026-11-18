"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Sparkles, Sun, Moon, ArrowRight } from "lucide-react";

export const DayToNightScenography: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const startDrag = () => setIsDragging(true);
  const stopDrag = () => setIsDragging(false);

  return (
    <Section variant="ivory" className="relative overflow-hidden py-16 sm:py-24 border-b border-gold/20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* ── 35% Editorial Narrative (Left) ── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                <Sparkles size={12} className="text-gold" />
                <span>Interactive Scenography</span>
              </span>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1209] leading-[1.15] tracking-[0.02em]">
                From Sacred Daylight to Starlit Palatial Grandeur
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#5C5147] font-medium leading-relaxed">
                As the sun dips below Rajasthan&apos;s ancient Aravali hills, our architectural scenography undergoes a breathtaking metamorphoses. Within 45 minutes, sacred Vedic floral mandaps transition effortlessly into concert-grade starlit galas.
              </p>
            </div>

            {/* Quick Toggle Controls */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setSliderPosition(15)}
                className={`px-3.5 py-1.5 rounded-[2px] text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 border ${
                  sliderPosition < 40
                    ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm"
                    : "bg-white text-[#1A1209] border-gold/30 hover:border-gold"
                }`}
              >
                <Sun size={13} className={sliderPosition < 40 ? "text-white" : "text-[#D4AF37]"} />
                <span>Daylight Muhurat</span>
              </button>

              <button
                type="button"
                onClick={() => setSliderPosition(85)}
                className={`px-3.5 py-1.5 rounded-[2px] text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 border ${
                  sliderPosition > 60
                    ? "bg-[#1A1209] text-gold border-gold shadow-sm"
                    : "bg-white text-[#1A1209] border-gold/30 hover:border-gold"
                }`}
              >
                <Moon size={13} className={sliderPosition > 60 ? "text-gold" : "text-[#D4AF37]"} />
                <span>Midnight Royal Gala</span>
              </button>
            </div>

            {/* Craftsmanship Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold/20">
              <div className="space-y-1">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#1A1209]">
                  45 Mins
                </span>
                <p className="text-[11px] uppercase tracking-wider text-[#5C5147] font-semibold">
                  Seamless Transition
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#1A1209]">
                  10,000+
                </span>
                <p className="text-[11px] uppercase tracking-wider text-[#5C5147] font-semibold">
                  Fresh Exotic Stems
                </p>
              </div>
            </div>

            <div>
              <Link
                href="/services#space-management"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-bold text-[#1A1209] hover:text-[#D4AF37] transition-colors group"
              >
                <span>Explore Scenography &amp; Space Artistry</span>
                <ArrowRight size={13} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ── 65% Interactive Visual Stage (Right) ── */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseDown={startDrag}
              onMouseUp={stopDrag}
              onMouseLeave={stopDrag}
              onMouseMove={handleMouseMove}
              onTouchStart={startDrag}
              onTouchEnd={stopDrag}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-[4px] overflow-hidden select-none cursor-ew-resize border border-gold/40 shadow-[0_12px_40px_rgba(26,18,9,0.12)] group"
            >
              {/* Layer 1: Night Image (Full Width Background) */}
              <div className="absolute inset-0">
                <Image
                  src="/images/service-crystal-reception.jpg"
                  alt="Midnight Royal Palace Gala Scenography at Night"
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 flex items-center gap-1.5 z-10">
                  <Moon size={11} className="text-gold" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white">
                    Night Scenography
                  </span>
                </div>
              </div>

              {/* Layer 2: Day Image (Clipped with CSS clipPath) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src="/images/service-varmala-mandap.jpg"
                  alt="Sunlit Sacred Vedic Mandap Scenography by Daylight"
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/15" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 flex items-center gap-1.5 z-10">
                  <Sun size={11} className="text-gold" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1209]">
                    Day Muhurat
                  </span>
                </div>
              </div>

              {/* Vertical Scrubber Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FAF7F2] via-[#D4AF37] to-[#FAF7F2] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Scrubber Handle Badge */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#1A1209] border-2 border-gold shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex items-center justify-center text-gold text-xs font-serif font-bold transition-transform group-hover:scale-110">
                  <span>✦</span>
                </div>
              </div>

              {/* Interactive Help Hint Pill */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-gold/30 text-[10px] uppercase font-sans tracking-widest text-gold/90 font-semibold pointer-events-none z-10 flex items-center gap-2">
                <span>◀ Drag to Reveal Metamorphosis ▶</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
