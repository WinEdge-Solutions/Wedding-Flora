"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { servicesData, operationalPillars } from "@/lib/content/services";
import { siteConfig } from "@/lib/site";
import {
  Check,
  Sparkles,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  MapPin,
  ChevronRight,
  ChevronLeft,
  FileCheck,
  Clock,
  Plane,
  Key,
  Crown,
  ShieldCheck,
} from "lucide-react";

const pillarIcons: Record<string, React.ReactNode> = {
  FileCheck: <FileCheck className="w-5 h-5 text-gold" />,
  Clock: <Clock className="w-5 h-5 text-gold" />,
  Plane: <Plane className="w-5 h-5 text-gold" />,
  Key: <Key className="w-5 h-5 text-gold" />,
  Crown: <Crown className="w-5 h-5 text-gold" />,
};

const editorialSlides = [
  {
    image: "/images/service-varmala-mandap.jpg",
    title: "Vedic Mandap Under Starlit Aravali Skies",
    subtitle: "Over 15,000 cascading fresh blossoms & sacred architectural geometry",
    venue: "Udaipur Waterfront Palace",
  },
  {
    image: "/images/service-sangeet-dance.jpg",
    title: "Concert-Grade Sangeet Productions",
    subtitle: "Panoramic LED visual staging, synchronized SFX & celebrity choreographers",
    venue: "Jaipur Heritage Fortress",
  },
  {
    image: "/images/destinations/hotels/rambagh-palace.webp",
    title: "Royal Palatial Buyouts & Fortresses",
    subtitle: "Turnkey heritage permissions, exclusive room blocks & private chauffeurs",
    venue: "Rambagh Palace, Jaipur",
  },
  {
    image: "/images/service-crystal-reception.jpg",
    title: "Bespoke Reception Scenography",
    subtitle: "Crystal chandeliers, imperial brassware & synchronized white-glove dining",
    venue: "Jodhpur Sandstone Haveli",
  },
  {
    image: "/images/destinations/hotels/fairmont-jaipur.webp",
    title: "Grand Royal Courtyard Celebrations",
    subtitle: "Elephant Baraat processions, Rajasthani folk maestros & midnight galas",
    venue: "Fairmont, Jaipur",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Heritage Alignment",
    desc: "We explore your family lineage, auspicious muhurat dates, aesthetic aspirations, and guest hospitality vision.",
  },
  {
    step: "02",
    title: "Venue & Master Commercials",
    desc: "Direct procurement of iconic palace fortresses or luxury sanctuaries with transparent buyout contracts.",
  },
  {
    step: "03",
    title: "3D Floral Scenography & Design",
    desc: "Photorealistic 3D mandap visualisations, lighting schematics, and guest movement zoning with seasonal floral palettes.",
  },
  {
    step: "04",
    title: "Celebrity & Production Liaison",
    desc: "Contracting concert-grade acoustics, SFX, celebrity performers, master halwais, and mixology artists.",
  },
  {
    step: "05",
    title: "Royal Day-Of Execution",
    desc: "A dedicated shadow brigade coordinates every second — from airport welcomes to sacred pheras and starlit fireworks.",
  },
];

export function FullServiceView() {
  const [activeServiceId, setActiveServiceId] = useState<string>("turnkey-planning");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-slide gallery every 5 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % editorialSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Scroll spy to highlight active service in sidebar
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveServiceId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    servicesData.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToService = (id: string) => {
    setActiveServiceId(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      {/* ── Top Hero: Full-Service Wedding Planners (Tamarind Global Style) ── */}
      <section className="relative py-12 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FDFAF5] to-[#FAF7F2] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-2">
              <span className="opacity-60">—</span>
              <span>Turnkey Palatial Wedding Management</span>
              <span className="opacity-60">—</span>
            </p>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#1A1209] tracking-[0.02em] leading-[1.12]">
              Full-Service Wedding Planners
            </h1>

            <Divider variant="ornamental" className="my-3 sm:my-4" />

            <p className="font-serif italic text-base sm:text-xl lg:text-2xl text-gold/90 max-w-2xl mx-auto leading-relaxed">
              &ldquo;While you focus on making each moment count and soaking it all in, let us do all the work for you.&rdquo;
            </p>

            <p className="font-sans text-xs sm:text-base text-[#5C5147] font-normal leading-[1.75] max-w-3xl mx-auto">
              Wedding Flora operates on a <strong>turnkey basis</strong> for our couples and families, taking full responsibility as your single point-of-contact for the celebration — from destination and palace selection to planning the honeymoon. We manage every detail of organization, negotiations, meetings, and on-ground troubleshooting so you can truly <strong>be a guest at your own event</strong>.
            </p>

            {/* Quick Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-[#1A1209]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-white border border-gold/25 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>100% Turnkey Accountability</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-white border border-gold/25 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-gold" />
                <span>Dedicated Wedding Shadow</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-white border border-gold/25 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span>Pan-Rajasthan &amp; Global Venues</span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Mobile Horizontal Services Quick-Scroller ── */}
      <nav
        aria-label="Services Navigation"
        className="lg:hidden sticky top-[58px] z-30 bg-[#FDFAF5]/95 backdrop-blur-xl border-b border-gold/25 py-2.5 overflow-x-auto no-scrollbar shadow-sm"
      >
        <div className="flex items-center gap-1.5 px-4 min-w-max">
          {servicesData.map((s, idx) => {
            const isActive = activeServiceId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToService(s.id)}
                className={`px-3 py-1 text-[11px] font-bold rounded-[2px] whitespace-nowrap transition-all uppercase tracking-wider ${
                  isActive
                    ? "bg-[#D4AF37] text-black shadow-sm"
                    : "bg-white text-[#1A1209] border border-gold/20 hover:border-gold"
                }`}
              >
                0{idx + 1}. {s.title}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── Main Two-Column Layout (Tamarind Global Style) ── */}
      <div className="py-10 sm:py-16 lg:py-20 bg-[#FAF7F2]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
            {/* ── LEFT COLUMN: STICKY SERVICES SIDEBAR (3 Columns on Desktop) ── */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 self-start">
              <div className="bg-white rounded-[3px] border border-gold/25 shadow-[0_10px_35px_rgba(26,18,9,0.06)] p-5 xl:p-6 space-y-6">
                <div>
                  <h2 className="font-serif text-lg font-bold tracking-[0.16em] uppercase text-[#1A1209] pb-2 border-b border-gold/25 flex items-center justify-between">
                    <span>Services</span>
                    <span className="text-gold text-xs">✦</span>
                  </h2>
                </div>

                {/* 12 Service Links */}
                <ul className="space-y-1 font-sans text-xs">
                  {servicesData.map((s, idx) => {
                    const isActive = activeServiceId === s.id;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => scrollToService(s.id)}
                          className={`w-full text-left py-2 px-3 rounded-[2px] transition-all duration-200 flex items-center justify-between group ${
                            isActive
                              ? "bg-[#FAF7F2] text-[#D4AF37] font-bold border-l-2 border-[#D4AF37] pl-3.5 shadow-sm"
                              : "text-[#1A1209]/80 hover:text-[#1A1209] hover:bg-[#FAF7F2]/60 font-semibold"
                          }`}
                        >
                          <span className="truncate pr-2">
                            <span className="text-gold/70 text-[10px] mr-1.5 font-serif font-bold">
                              {idx < 9 ? `0${idx + 1}` : idx + 1}.
                            </span>
                            {s.title}
                          </span>
                          <span
                            className={`text-[9px] transition-transform duration-200 ${
                              isActive ? "text-[#D4AF37] translate-x-0.5" : "text-transparent group-hover:text-gold"
                            }`}
                          >
                            ✦
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Concierge Action Box */}
                <div className="pt-4 border-t border-gold/20 space-y-3">
                  <div className="p-3.5 rounded-[2px] bg-[#FAF7F2] border border-gold/20 space-y-2">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                      Direct Palace Concierge
                    </p>
                    <p className="text-xs text-[#1A1209] font-medium leading-snug">
                      Plan your bespoke celebration with our principal wedding designers.
                    </p>
                    <div className="pt-1 space-y-1.5">
                      <a
                        href={siteConfig.contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 px-2.5 rounded-[2px] bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Concierge</span>
                      </a>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                        className="w-full py-1.5 px-2.5 rounded-[2px] bg-white text-[#1A1209] border border-gold/30 hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-1.5 text-[11px] font-semibold"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-gold" />
                        <span>{siteConfig.contact.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── RIGHT COLUMN: MAIN EDITORIAL CONTENT (8/9 Columns on Desktop) ── */}
            <main className="lg:col-span-8 xl:col-span-9 space-y-12 sm:space-y-16">
              {/* ── Section: The Turnkey Standard & 5 Core Pillars ── */}
              <div className="bg-white rounded-[3px] border border-gold/25 p-6 sm:p-8 xl:p-10 shadow-[0_12px_40px_rgba(26,18,9,0.06)] space-y-8">
                <div className="space-y-3">
                  <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                    Turnkey Wedding Philosophy
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1A1209] leading-tight">
                    Be a Honored Guest at Your Own Celebration
                  </h2>
                  <p className="font-sans text-xs sm:text-base text-[#5C5147] font-medium leading-relaxed">
                    A destination wedding in Rajasthan involves dozens of vendors, hundreds of guests traveling across timezones, sacred Vedic muhurats, and multi-tier logistics. Our turnkey management guarantees that you never have to coordinate, negotiate, or solve on-ground challenges. We manage every single thread while you celebrate with your family.
                  </p>
                </div>

                {/* 5 Operational Core Pillars Grid */}
                <div className="pt-2">
                  <h3 className="font-serif text-lg font-semibold text-[#1A1209] mb-4 pb-2 border-b border-gold/15 flex items-center justify-between">
                    <span>Our 5 Operational Pillars</span>
                    <span className="text-[11px] text-gold font-sans font-bold uppercase tracking-wider">
                      Turnkey Assurance
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
                    {operationalPillars.map((pillar, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-4 rounded-[2px] bg-[#FAF7F2] border border-gold/20 hover:border-gold/50 transition-colors space-y-2"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-[2px] bg-white border border-gold/20 shrink-0">
                            {pillarIcons[pillar.iconName]}
                          </span>
                          <h4 className="font-serif text-sm font-bold text-[#1A1209]">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="font-sans text-xs text-[#5C5147] font-medium leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    ))}
                    <div className="p-4 rounded-[2px] bg-gradient-to-br from-[#FAF7F2] to-white border border-gold/30 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>And Everything In-Between</span>
                        </span>
                        <p className="text-xs text-[#5C5147] font-medium leading-relaxed">
                          From royal elephant clearances to private charter flights and midnight safa styling.
                        </p>
                      </div>
                      <div className="pt-2">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gold hover:text-[#1A1209] transition-colors"
                        >
                          <span>Request Bespoke Plan</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Editorial Visual Showcase (65% Visual Weight Slider) ── */}
              <div
                className="relative rounded-[3px] overflow-hidden border border-gold/30 shadow-[0_16px_45px_rgba(26,18,9,0.08)] bg-[#1A1209] group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={editorialSlides[currentSlide].image}
                        alt={editorialSlides[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Slide Content Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-1 max-w-xl">
                      <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#D4AF37] block">
                        Signature Scenography ✦ {editorialSlides[currentSlide].venue}
                      </span>
                      <h3 className="font-serif text-lg sm:text-2xl font-bold text-white tracking-wide leading-snug">
                        {editorialSlides[currentSlide].title}
                      </h3>
                      <p className="font-sans text-xs text-white/80 font-medium hidden sm:block">
                        {editorialSlides[currentSlide].subtitle}
                      </p>
                    </div>

                    {/* Slider Nav Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentSlide(
                            (prev) => (prev - 1 + editorialSlides.length) % editorialSlides.length
                          )
                        }
                        className="w-8 h-8 rounded-[2px] bg-black/50 hover:bg-gold text-white hover:text-black border border-white/20 hover:border-gold flex items-center justify-center transition-colors"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentSlide((prev) => (prev + 1) % editorialSlides.length)
                        }
                        className="w-8 h-8 rounded-[2px] bg-black/50 hover:bg-gold text-white hover:text-black border border-white/20 hover:border-gold flex items-center justify-center transition-colors"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                  {editorialSlides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentSlide === i ? "w-5 bg-gold" : "w-1.5 bg-white/40 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* ── Comprehensive 12 Service Modules (65% Visual Weight) ── */}
              <div className="space-y-12 sm:space-y-16">
                {servicesData.map((service, index) => {
                  const isEven = index % 2 === 1;
                  return (
                    <article
                      key={service.id}
                      id={service.id}
                      className="bg-white rounded-[3px] border border-gold/25 p-5 sm:p-7 xl:p-8 shadow-[0_10px_35px_rgba(26,18,9,0.06)] hover:border-gold/50 transition-all duration-300 scroll-mt-28"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
                        {/* 65% Visual Column */}
                        <div
                          className={`lg:col-span-7 xl:col-span-7 ${
                            isEven ? "lg:order-2" : "lg:order-1"
                          }`}
                        >
                          <div className="relative aspect-[16/10] rounded-[2px] overflow-hidden border border-gold/30 shadow-[0_8px_25px_rgba(26,18,9,0.08)] bg-[#FAF7F2] group/img">
                            <Image
                              src={service.imageUrl}
                              alt={service.title}
                              fill
                              className="object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-sans font-bold uppercase tracking-wider text-gold">
                              Domain 0{index + 1}
                            </div>
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                              <p className="font-serif text-sm font-semibold text-white/95 truncate">
                                {service.tagline}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 35% Curated Content Column */}
                        <div
                          className={`lg:col-span-5 xl:col-span-5 space-y-4 ${
                            isEven ? "lg:order-1" : "lg:order-2"
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#D4AF37] font-bold block mb-1">
                              Comprehensive Inclusion
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl xl:text-3xl font-semibold text-[#1A1209] leading-snug">
                              {service.title}
                            </h3>
                          </div>

                          <p className="font-sans text-xs sm:text-sm text-[#5C5147] font-medium leading-relaxed">
                            {service.description}
                          </p>

                          {/* Signature Inclusions */}
                          <div className="pt-2 border-t border-gold/15 space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-[#1A1209]">
                              Scope of Orchestration:
                            </p>
                            <ul className="space-y-2">
                              {service.features.map((feat, fIdx) => (
                                <li
                                  key={fIdx}
                                  className="flex items-start gap-2 text-xs text-[#5C5147] font-medium leading-tight"
                                >
                                  <span className="mt-0.5 p-0.5 rounded-[2px] bg-gold/15 text-gold shrink-0">
                                    <Check className="w-3 h-3 text-[#D4AF37]" />
                                  </span>
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Direct Enquiry Trigger */}
                          <div className="pt-2">
                            <Button
                              href={`/contact?service=${service.id}`}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <span>Enquire for {service.title}</span>
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* ── The 5-Step Process Roadmap ── */}
              <div className="bg-white rounded-[3px] border border-gold/25 p-6 sm:p-8 xl:p-10 shadow-[0_12px_40px_rgba(26,18,9,0.06)] space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                    The Journey Together
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1209]">
                    How We Orchestrate Royal Celebrations
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5147] font-medium leading-relaxed">
                    A transparent, milestone-driven execution methodology ensuring every single second unfolds in sublime grandeur.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4">
                  {processSteps.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-[2px] bg-[#FAF7F2] border border-gold/20 flex flex-col justify-between space-y-3"
                    >
                      <span className="font-serif text-2xl font-bold text-gold/80 block">
                        {s.step}
                      </span>
                      <div className="space-y-1.5">
                        <h4 className="font-serif text-sm font-bold text-[#1A1209]">
                          {s.title}
                        </h4>
                        <p className="font-sans text-[11px] text-[#5C5147] font-medium leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Consultation CTA (Tamarind Global Style: "Let's talk about your wedding") ── */}
              <div className="bg-gradient-to-br from-[#1A1209] to-[#2B1D12] text-white rounded-[3px] p-8 sm:p-10 xl:p-12 text-center relative overflow-hidden border border-gold/40 shadow-xl space-y-5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold block relative z-10">
                  ✦ Bespoke Royal Consultation ✦
                </span>

                <h3 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-wide relative z-10 leading-tight">
                  Let&apos;s Talk About Your Wedding
                </h3>

                <p className="font-sans text-xs sm:text-base text-white/80 font-medium max-w-2xl mx-auto leading-relaxed relative z-10">
                  Every family and love story is unique. Schedule a private consultation with our principal wedding designers to structure your bespoke destination celebration across Rajasthan and beyond.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 relative z-10">
                  <Button href="/contact" variant="primary" size="lg">
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-white hover:text-gold transition-colors py-3 px-6 rounded-[2px] border border-white/20 hover:border-gold bg-white/5 backdrop-blur-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
}
