"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useCms } from "@/components/cms/CmsProvider";
import type { PageSectionConfig } from "@/lib/cms/types";
import { ChevronLeft, ChevronRight, MapPin, Sparkles, ArrowRight } from "lucide-react";

export const TestimonialsSection: React.FC<{ section?: PageSectionConfig }> = ({
  section,
}) => {
  const cms = useCms();
  const testimonialsList = cms.collections.testimonials;
  const c = section?.content;
  const [activeIndex, setActiveIndex] = useState(0);

  if (testimonialsList.length === 0) return null;
  const safeIdx = activeIndex < testimonialsList.length ? activeIndex : 0;
  const current = testimonialsList[safeIdx];
  const isReversed = section?.layout === "split-right";
  const isGrid = section?.layout === "grid-2" || section?.layout === "grid-3";

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsList.length - 1 ? 0 : prev + 1));
  };

  return (
    <Section variant={section?.bgVariant ?? "ivory"} className="overflow-hidden">
      <Container>
        <div className="space-y-8 sm:space-y-12">
          {/* Micro Section Eyebrow */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gold/15 pb-5">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center gap-2">
                <span className="opacity-60">—</span>
                <span>{c?.eyebrow || "Love Stories & Royal Reflections"}</span>
                <span className="opacity-60">—</span>
              </p>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-[2.6rem] font-semibold text-[#1A1209] tracking-[0.03em] mt-1.5">
                {c?.title || "Vows Celebrated in Royal Splendor"}
              </h2>
            </div>

            {!isGrid && (
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold font-sans">
                  Story 0{safeIdx + 1} / 0{testimonialsList.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous royal wedding story"
                    className="w-9 h-9 rounded-full bg-white border border-gold/25 hover:border-gold hover:bg-gold/10 text-[#1A1209] flex items-center justify-center transition-all shadow-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next royal wedding story"
                    className="w-9 h-9 rounded-full bg-white border border-gold/25 hover:border-gold hover:bg-gold/10 text-[#1A1209] flex items-center justify-center transition-all shadow-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {isGrid ? (
            <div
              className={`grid grid-cols-1 ${
                section?.layout === "grid-2" ? "md:grid-cols-2" : "md:grid-cols-3"
              } gap-6`}
            >
              {testimonialsList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gold/20 rounded-[3px] overflow-hidden shadow-sm flex flex-col justify-between p-6 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] rounded-[2px] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.couple}
                        fill
                        sizes="400px"
                        className="object-cover"
                      />
                    </div>
                    <blockquote className="font-serif text-base italic text-[#1A1209] leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="pt-3 border-t border-gold/15">
                    <h3 className="font-display text-lg font-bold text-[#1A1209]">{item.couple}</h3>
                    <p className="text-[11px] uppercase tracking-wider text-gold font-semibold">
                      {item.venue}
                    </p>
                    <p className="text-xs text-[#5C5147]">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* 35% Content : 65% Photo/Video Editorial Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-center">
              {/* ── 35% CONTENT COLUMN ── */}
              <div
                className={`lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-6 order-2 ${
                  isReversed ? "lg:order-2" : "lg:order-1"
                }`}
              >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {/* Decorative Quotation Mark */}
                  <span className="font-serif text-6xl text-[#D4AF37] select-none block leading-none -mb-3">
                    &ldquo;
                  </span>

                  {/* Narrative Quote */}
                  <blockquote className="font-serif text-base sm:text-xl lg:text-[1.35rem] font-normal text-[#1A1209] leading-relaxed italic">
                    {current.quote}
                  </blockquote>

                  {/* Couple Attribution & Palace Venue */}
                  <div className="pt-2 border-t border-gold/20 space-y-1.5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1A1209]">
                      {current.couple}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold uppercase tracking-wider font-sans">
                      <MapPin size={13} className="text-gold shrink-0" />
                      <span>{current.venue}</span>
                    </div>
                    <p className="text-xs text-[#5C5147] font-medium tracking-wide">
                      {current.location} • {current.date}
                    </p>
                  </div>

                  {/* Couple Selector Tabs */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {testimonialsList.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`px-3 py-1.5 rounded-[2px] text-[11px] font-sans uppercase tracking-wider transition-all duration-200 ${
                          idx === safeIdx
                            ? "bg-gold text-white font-bold shadow-sm"
                            : "bg-white border border-gold/25 text-[#5C5147] hover:border-gold hover:text-[#1A1209]"
                        }`}
                      >
                        {item.couple}
                      </button>
                    ))}
                  </div>

                  {/* Link to Full Celebrations Archive */}
                  <div className="pt-2">
                    <Link
                      href="/celebrations"
                      className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-[0.18em] text-[#1A1209] font-bold hover:text-gold transition-colors group"
                    >
                      <span>Explore All Real Wedding Stories</span>
                      <ArrowRight size={13} className="text-gold transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── 65% VISUAL ATELIER COLUMN ── */}
            <div
              className={`lg:col-span-7 xl:col-span-8 order-1 ${
                isReversed ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative grid grid-cols-12 gap-3 sm:gap-4 items-center"
                >
                  {/* Primary Grand Showcase Photo (occupies dominant visual space) */}
                  <div className="col-span-12 sm:col-span-8 relative aspect-[16/11] sm:aspect-[4/3] rounded-[2px] overflow-hidden shadow-[0_12px_45px_rgba(26,18,9,0.08)] group">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={current.imageUrl}
                        alt={`${current.couple} Wedding at ${current.venue}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Location Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-[2px] text-[10px] font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#1A1209] border border-gold/20 flex items-center gap-1.5 shadow-sm">
                          <Sparkles size={11} className="text-gold" />
                          <span>{current.location}</span>
                        </span>
                      </div>

                      {/* Bottom Ceremony Title Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <p className="text-xs sm:text-sm font-serif font-semibold text-white tracking-wide">
                          {current.tagline}
                        </p>
                        <p className="text-[11px] font-sans text-white/80 mt-0.5">
                          Curated by Wedding Flora
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Companion Photo (adds editorial layered depth on tablet/desktop) */}
                  <div className="hidden sm:block col-span-12 sm:col-span-4 relative aspect-[16/11] sm:aspect-[3/4] rounded-[2px] overflow-hidden shadow-[0_8px_30px_rgba(26,18,9,0.06)] group">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={current.secondaryImageUrl}
                        alt={`${current.couple} Celebration Moments`}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] font-semibold block">
                          Atelier Archive
                        </span>
                        <p className="text-xs font-serif text-white font-medium line-clamp-1">
                          {current.venue.split("&")[0].trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          )}
        </div>
      </Container>
    </Section>
  );
};
