"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/content/services";
import { ArrowRight, Check, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const mobileShortTitles = [
  "Planning & Reccee",
  "Destination & Venue",
  "Event Styling",
  "Hospitality & Logistics",
  "Artist & Entertainment",
  "Production & Technical",
  "Gifting & Hampers",
  "Photography & BTS",
];

export const ServicesOverview: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const activeService = servicesData[activeIdx] || servicesData[0];

  const scrollMobileTo = (idx: number) => {
    setMobileIdx(idx);
    if (!mobileTrackRef.current) return;
    const track = mobileTrackRef.current;
    const card = track.children[idx] as HTMLElement;
    if (card) {
      const targetScroll = card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollLeft = target.scrollLeft;
    const card = target.firstElementChild as HTMLElement;
    const cardWidth = card ? card.offsetWidth + 14 : 320;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== mobileIdx && newIdx >= 0 && newIdx < servicesData.length) {
      setMobileIdx(newIdx);
    }
  };

  return (
    <Section variant="cream" className="overflow-hidden">
      <Container>
        <div className="space-y-6 sm:space-y-10 lg:space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-2">
              <span className="opacity-60">—</span>
              <span>Royal Wedding Services &amp; Artistry</span>
              <span className="opacity-60">—</span>
            </p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#1A1209] font-semibold tracking-[0.03em]">
              Grandeur in Every Celebration
            </h2>
            <p className="font-sans text-xs sm:text-base text-[#5C5147] font-normal leading-relaxed max-w-xl mx-auto">
              From historic palace procurement to bespoke floral mandap scenography, we orchestrate unforgettable royal heirlooms.
            </p>
          </div>

          {/* 35% Content : 65% Visual Atelier Layout (Desktop) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* ── 35% CONTENT COLUMN (Left) ── */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-6">
              {/* Service Navigation List */}
              <div className="space-y-1 border-l-2 border-gold/25 pl-4">
                {servicesData.map((service, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`w-full text-left py-2 px-3 rounded-[2px] transition-all duration-300 flex items-center justify-between group ${
                        isActive
                          ? "bg-white text-gold font-bold shadow-sm translate-x-1"
                          : "text-[#1A1209]/80 hover:text-[#1A1209] hover:bg-white/60 font-semibold"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-serif text-xs text-[#D4AF37] font-bold shrink-0">
                          {romanNumerals[idx]}.
                        </span>
                        <span className="text-xs font-sans uppercase tracking-wider truncate">
                          {service.title}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] text-gold transition-opacity duration-200 ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                        }`}
                      >
                        ✦
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Service Detailed Summary (Concise 35% Copy) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 rounded-[2px] bg-white border border-gold/15 shadow-sm space-y-4"
                >
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-1">
                      {romanNumerals[activeIdx]} • Signature Atelier
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-[#1A1209] leading-snug">
                      {activeService.title}
                    </h3>
                    <p className="text-xs font-sans text-gold/90 font-medium mt-1">
                      {activeService.tagline}
                    </p>
                  </div>

                  {/* Top 2 Inclusions */}
                  <div className="space-y-1.5 pt-2 border-t border-gold/15">
                    {activeService.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#5C5147] font-normal leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-gold/15">
                    <Link
                      href={`/services#${activeService.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1209] hover:text-gold transition-colors group/link"
                    >
                      <span>Explore Inclusions</span>
                      <ArrowRight size={13} className="text-gold transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <Link
                      href={`/contact?service=${activeService.id}`}
                      className="px-3.5 py-1.5 rounded-[2px] bg-[#1A1209] hover:bg-gold hover:text-[#1A1209] text-white text-[11px] font-sans font-semibold uppercase tracking-wider shadow-sm transition-all"
                    >
                      Book Atelier
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── 65% VISUAL ATELIER COLUMN (Right) ── */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-3">
              {/* Grand Showcase Photo (occupies dominant 65% visual real estate) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative aspect-[16/10] xl:aspect-[16/9] w-full rounded-[2px] overflow-hidden shadow-[0_12px_40px_rgba(26,18,9,0.08)] group"
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={activeService.imageUrl}
                      alt={`${activeService.title} by Wedding Flora`}
                      fill
                      sizes="(max-width: 1200px) 60vw, 800px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-[2px] text-[10px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#1A1209] border border-gold/20 flex items-center gap-1.5 shadow-sm">
                        <Sparkles size={11} className="text-gold" />
                        <span>Curated Royal Production</span>
                      </span>
                    </div>

                    {/* Bottom Caption Strip */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] font-semibold block">
                          Rajasthan Royal Venue
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide">
                          {activeService.title}
                        </h4>
                      </div>
                      <span className="text-xs text-white/80 font-serif italic hidden sm:block">
                        Wedding Flora Atelier
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Multi-Service Thumbnail Selector Strip (Adds interactive visual richness) */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 pt-1">
                {servicesData.map((service, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`relative aspect-[16/10] rounded-[2px] overflow-hidden transition-all duration-300 border ${
                        isActive
                          ? "border-gold ring-2 ring-gold/40 scale-105 shadow-md"
                          : "border-gold/25 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-sans font-bold uppercase tracking-wider text-white truncate text-center drop-shadow">
                        {romanNumerals[idx]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Mobile Compact Interactive Atelier Carousel (lg:hidden) ── */}
          <div className="lg:hidden space-y-3.5">
            {/* Quick Pill Selector Tabs (Horizontal Scrollable Bar) */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 pb-0.5">
              {servicesData.map((service, idx) => {
                const isActive = idx === mobileIdx;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => scrollMobileTo(idx)}
                    className={`px-3 py-1.5 rounded-[2px] text-[11px] font-sans uppercase tracking-wider shrink-0 transition-all duration-200 ${
                      isActive
                        ? "bg-[#1A1209] text-gold font-bold border border-gold/50 shadow-sm"
                        : "bg-white border border-gold/20 text-[#5C5147] hover:border-gold hover:text-[#1A1209]"
                    }`}
                  >
                    <span>{mobileShortTitles[idx] || service.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Stepper Navigation Bar: Service 01 / 08 + Prev/Next Controls */}
            <div className="flex items-center justify-between px-1 text-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                Service 0{mobileIdx + 1} of 0{servicesData.length}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollMobileTo(Math.max(0, mobileIdx - 1))}
                  disabled={mobileIdx === 0}
                  aria-label="Previous service"
                  className="w-7 h-7 rounded-full bg-white border border-gold/25 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold text-[#1A1209] flex items-center justify-center shadow-sm transition-all"
                >
                  <ChevronLeft size={14} />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1 px-1">
                  {servicesData.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => scrollMobileTo(i)}
                      aria-label={`Go to service ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === mobileIdx ? "w-5 bg-gold" : "w-1.5 bg-[#1A1209]/20"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollMobileTo(Math.min(servicesData.length - 1, mobileIdx + 1))}
                  disabled={mobileIdx === servicesData.length - 1}
                  aria-label="Next service"
                  className="w-7 h-7 rounded-full bg-white border border-gold/25 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold text-[#1A1209] flex items-center justify-center shadow-sm transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Horizontal Snap Carousel */}
            <div
              ref={mobileTrackRef}
              onScroll={handleMobileScroll}
              className="flex items-stretch gap-3.5 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-2 pt-0.5 touch-pan-x"
            >
              {servicesData.map((service, idx) => (
                <div
                  key={service.id}
                  className="w-[85vw] sm:w-[340px] shrink-0 snap-center bg-white border border-gold/20 rounded-[3px] overflow-hidden shadow-sm flex flex-col justify-between transition-shadow hover:shadow-md"
                >
                  {/* Visual Banner (16/10) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF7F2]">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 85vw, 340px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-[2px] text-[9.5px] font-semibold uppercase tracking-wider bg-black/75 text-gold border border-gold/30 backdrop-blur-sm flex items-center gap-1">
                        <Sparkles size={9} className="text-gold" />
                        <span>0{idx + 1} • Royal Service</span>
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 text-left">
                      <h3 className="font-serif text-lg font-semibold text-white leading-tight drop-shadow-sm">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-gold/90 font-sans font-medium line-clamp-1 mt-0.5">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Curated Description & Top Inclusions */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-[#5C5147] font-normal leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Top 2 Inclusions */}
                    <div className="space-y-1 pt-2 border-t border-gold/15">
                      {service.features.slice(0, 2).map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-1.5 text-[11px] text-[#5C5147] font-normal leading-snug"
                        >
                          <Check className="w-3 h-3 text-gold shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-2.5 border-t border-gold/15 flex items-center justify-between">
                      <Link
                        href={`/services#${service.id}`}
                        className="text-[11px] uppercase tracking-wider font-semibold text-[#1A1209] hover:text-gold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Explore</span>
                        <ArrowRight size={11} className="text-gold" />
                      </Link>

                      <Link
                        href={`/contact?service=${service.id}`}
                        className="px-3.5 py-1 rounded-[2px] bg-[#1A1209] hover:bg-gold text-white hover:text-[#1A1209] text-[10px] font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Button */}
          <div className="text-center pt-2 sm:pt-4">
            <Button href="/services" variant="primary" size="md">
              View All Services
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
