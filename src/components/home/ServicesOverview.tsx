"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/content/services";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"];

export const ServicesOverview: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeService = servicesData[activeIdx] || servicesData[0];

  return (
    <Section variant="cream" className="overflow-hidden">
      <Container>
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center justify-center gap-2">
              <span>✦</span>
              <span>Royal Wedding Services &amp; Artistry</span>
              <span>✦</span>
            </p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-[#1A1209] font-bold tracking-[0.03em]">
              Grandeur in Every Celebration
            </h2>
            <p className="font-sans text-xs sm:text-base text-[#5C5147] font-medium leading-relaxed max-w-xl mx-auto">
              From historic palace procurement to bespoke floral mandap scenography, we orchestrate unforgettable royal heirlooms.
            </p>
          </div>

          {/* 35% Content : 65% Visual Atelier Layout (Desktop) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* ── 35% CONTENT COLUMN (Left) ── */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between space-y-6">
              {/* Service Navigation List */}
              <div className="space-y-1 border-l-2 border-gold/25 pl-4">
                {servicesData.slice(0, 6).map((service, idx) => {
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
                  className="p-5 rounded-[3px] bg-white border border-gold/25 shadow-sm space-y-4"
                >
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-1">
                      {romanNumerals[activeIdx]} • Signature Atelier
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1A1209] leading-snug">
                      {activeService.title}
                    </h3>
                    <p className="text-xs font-sans text-gold/90 font-semibold mt-1">
                      {activeService.tagline}
                    </p>
                  </div>

                  {/* Top 2 Inclusions */}
                  <div className="space-y-1.5 pt-2 border-t border-gold/15">
                    {activeService.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#5C5147] font-medium leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-gold/15">
                    <Link
                      href={`/services#${activeService.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1A1209] hover:text-gold transition-colors group/link"
                    >
                      <span>Explore Inclusions</span>
                      <ArrowRight size={13} className="text-gold transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <Link
                      href={`/contact?service=${activeService.id}`}
                      className="px-3.5 py-1.5 rounded-[2px] bg-gold hover:bg-[#b8972e] text-white text-[11px] font-sans font-bold uppercase tracking-wider shadow-sm transition-all"
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
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative aspect-[16/10] xl:aspect-[16/9] w-full rounded-[3px] overflow-hidden bg-white p-2 border border-gold/30 shadow-[0_16px_50px_rgba(26,18,9,0.09)] group"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-[2px]">
                    <Image
                      src={activeService.imageUrl}
                      alt={`${activeService.title} by Wedding Flora`}
                      fill
                      sizes="(max-width: 1200px) 60vw, 800px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-gold border border-gold/30 flex items-center gap-1.5">
                        <Sparkles size={11} />
                        <span>Curated Royal Production</span>
                      </span>
                    </div>

                    {/* Bottom Caption Strip */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-gold font-bold block">
                          Rajasthan Royal Venue
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
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
              <div className="grid grid-cols-6 gap-2 pt-1">
                {servicesData.slice(0, 6).map((service, idx) => {
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
                        sizes="120px"
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

          {/* Mobile Staggered Cards (65% Photo Height : 35% Content) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
            {servicesData.slice(0, 6).map((service, idx) => (
              <div
                key={service.id}
                className="bg-white border border-gold/25 rounded-[3px] overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* 65% Dominant Visual */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/75 text-gold border border-gold/30">
                      Service 0{idx + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <h3 className="font-serif text-lg font-bold text-white leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* 35% Concise Content */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-[#5C5147] font-medium line-clamp-2 leading-relaxed">
                    {service.tagline}
                  </p>
                  <div className="pt-2 border-t border-gold/15 flex items-center justify-between">
                    <Link
                      href={`/services#${service.id}`}
                      className="text-xs uppercase tracking-wider font-bold text-[#1A1209] hover:text-gold inline-flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} className="text-gold" />
                    </Link>
                    <Link
                      href={`/contact?service=${service.id}`}
                      className="px-3 py-1 rounded-[2px] bg-gold text-white text-[10px] font-bold uppercase tracking-wider"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Button */}
          <div className="text-center pt-4">
            <Button href="/services" variant="primary" size="md">
              View All 7 Services &amp; Packages
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
};
