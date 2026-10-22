"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/Divider";
import { FloralParticles } from "@/components/ui/FloralParticles";

gsap.registerPlugin(ScrollTrigger);

/* ── Staggered fade-up for initial mount ─────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.14,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-driven parallax + fade ────────────────── */
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  /* ── GSAP letter-by-letter H1 on mount ────────────── */
  useEffect(() => {
    const title = textContentRef.current?.querySelector(".hero-title");
    if (!title) return;
    const chars = title.querySelectorAll<HTMLSpanElement>(".hero-char");
    if (!chars.length) return;

    const ctx = gsap.context(() => {
      gsap.from(chars, {
        y: "115%",
        opacity: 0,
        rotationZ: 4,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.028,
        delay: 0.55,
      });
    });

    return () => ctx.revert();
  }, []);

  /* Helper — split string into per-char spans */
  const splitChars = (text: string, charClassName = "") =>
    text.split("").map((ch, i) => (
      <span
        key={i}
        className={`hero-char inline-block ${charClassName}`}
        style={{ willChange: "transform, opacity" }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >

      {/* ══════════════════════════════════════════════
          LAYER 1 — Floating gold bokeh particles
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <FloralParticles />
      </div>

      {/* ══════════════════════════════════════════════
          LAYER 2 — Text content (fades + lifts on scroll)
      ══════════════════════════════════════════════ */}
      <motion.div
        ref={textContentRef}
        className="relative z-[10] w-full pt-16 pb-6 sm:pt-20 sm:pb-8 lg:pt-20 lg:pb-8"
        style={{ y: textY, opacity: heroOpacity }}
      >
        <Container className="text-center">
          <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4 lg:space-y-4">

            {/* ── Crest monogram ────────────────────── */}
            <motion.div
              className="flex justify-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <div
                className="relative w-12 h-12 sm:w-16 sm:h-16 transition-all duration-500
                  hover:scale-110 hover:drop-shadow-[0_0_24px_rgba(183,154,91,0.75)]"
              >
                <Image
                  src="/images/logo-emblem.png"
                  alt="Wedding Flora Crest"
                  fill
                  sizes="(max-width: 640px) 48px, 64px"
                  className="object-contain drop-shadow-[0_2px_10px_rgba(183,154,91,0.5)]"
                  priority
                />
              </div>
            </motion.div>

            {/* ── Eyebrow label ─────────────────────── */}
            <motion.p
              className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.35em] text-gold font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2 text-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <span>✦</span>
              <span>Royal Indian Wedding Planning &amp; Floral Artistry</span>
              <span>✦</span>
            </motion.p>

            {/* ── H1 — split char GSAP animation ───── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <h1
                className="hero-title leading-[1.12] tracking-tight"
                aria-label="Crafting Royal Weddings With Grandeur & Soul"
              >
                <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3.5 lg:gap-x-4">
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.65rem] text-ivory font-bold tracking-[0.03em]">
                    {splitChars("Crafting")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.65rem] font-extrabold tracking-[0.03em]">
                    {splitChars("Royal", "gold-char-gradient")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.65rem] text-ivory font-bold tracking-[0.03em]">
                    {splitChars("Weddings")}
                  </span>
                </div>

                <div className="mt-1 sm:mt-2.5 flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2.5">
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#E8D5D0]/95 font-light italic tracking-wide">
                    {splitChars("With")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#E8D5D0]/95 font-light italic tracking-wide">
                    {splitChars("Grandeur")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#E8D5D0]/95 font-light italic tracking-wide">
                    {splitChars("&")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#E8D5D0]/95 font-light italic tracking-wide">
                    {splitChars("Soul")}
                  </span>
                </div>
              </h1>
            </motion.div>

            {/* ── Ornamental divider (ivory on dark) ── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <Divider variant="ornamental" className="my-0.5 sm:my-1 [&>*]:border-gold/40 [&>*]:text-gold/60" />
            </motion.div>

            {/* ── Subtitle ──────────────────────────── */}
            <motion.p
              className="font-sans text-xs sm:text-sm lg:text-[15px] text-ivory/75 font-normal max-w-2xl mx-auto leading-relaxed px-3 sm:px-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              From starlit palace Sangeets in Udaipur to ethereal Mandap ceremonies
              across heritage fortresses, we curate unforgettable Indian wedding
              heirlooms tailored to your family&apos;s heritage.
            </motion.p>

            {/* ── CTA Buttons ───────────────────────── */}
            <motion.div
              className="pt-2 sm:pt-3.5 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              {/* Primary — gold fill */}
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5
                  font-sans text-xs uppercase tracking-[0.18em] font-bold
                  bg-gradient-to-r from-[#B79A5B] via-[#D4B87A] to-[#B79A5B]
                  text-[#0A0509] rounded-[3px] text-center
                  shadow-[0_0_0_1px_rgba(183,154,91,0.4),0_8px_32px_rgba(183,154,91,0.3)]
                  hover:shadow-[0_0_0_1px_rgba(183,154,91,0.8),0_8px_48px_rgba(183,154,91,0.55)]
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-300 ease-out"
              >
                Plan Your Royal Wedding
              </a>

              {/* Secondary — glass */}
              <a
                href="/celebrations"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5
                  font-sans text-xs uppercase tracking-[0.18em] font-bold
                  bg-white/8 backdrop-blur-md text-ivory text-center
                  border border-white/20 rounded-[3px]
                  hover:bg-white/14 hover:border-gold/60
                  hover:shadow-[0_0_24px_rgba(183,154,91,0.25)]
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-300 ease-out"
              >
                Explore Celebrations
              </a>
            </motion.div>

            {/* ── Scroll nudge ──────────────────────── */}
            <motion.div
              className="pt-2 sm:pt-3 flex justify-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1 opacity-50 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-ivory font-bold font-sans">
                  Scroll
                </span>
                <div className="w-px h-5 bg-gradient-to-b from-gold/80 to-transparent" />
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </motion.div>

    </section>
  );
};
