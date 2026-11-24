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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {});
  }, []);

  /* ── Scroll-driven parallax + fade ────────────────── */
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const videoY = useTransform(scrollY, [0, 600], [0, 100]);
  const videoScale = useTransform(scrollY, [0, 600], [1.05, 1.15]);

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
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.028,
        delay: 0.45,
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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0E0A06]"
    >
      {/* ══════════════════════════════════════════════
          LAYER 0 — Luxury Video Background with Parallax
      ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: videoY, scale: videoScale }}
          className="relative w-full h-full will-change-transform"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.90] contrast-[1.05] saturate-[1.08]"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ── Lighter cinematic scrims — video breathes more on ivory theme ── */}
        {/* Top navbar gradient — still needs to fade to transparent quickly */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 via-black/20 to-transparent" />

        {/* Very light ambient veil — far less dark than before */}
        <div className="absolute inset-0 bg-[#06040d]/30" />

        {/* Radial vignette — just enough to lift the centred text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, rgba(212,175,55,0.04) 0%, rgba(26,16,10,0.40) 60%, rgba(26,16,10,0.88) 100%)",
          }}
        />

        {/* Bottom fade — transitions into the light ivory body */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#FDFAF5] via-[#FDFAF5]/60 to-transparent" />
      </div>

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
        className="relative z-[10] w-full pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-24 lg:pb-12"
        style={{ y: textY, opacity: heroOpacity }}
      >
        <Container className="text-center">
          <div className="max-w-5xl mx-auto space-y-3.5 sm:space-y-4 lg:space-y-4">

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
                  hover:scale-110 drop-shadow-[0_0_24px_rgba(212,175,55,0.65)]"
              >
                <Image
                  src="/images/logo-emblem.png"
                  alt="Wedding Flora Crest"
                  fill
                  sizes="(max-width: 640px) 48px, 64px"
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* ── H1 — split char GSAP animation ───── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <h1
                className="hero-title leading-[1.12] tracking-tight"
                aria-label="Crafting Royal Weddings With Grandeur & Soul"
              >
                <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3.5 lg:gap-x-4">
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#FAF7F2] font-bold tracking-[0.03em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                    {splitChars("Crafting")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-[0.03em] drop-shadow-[0_0_28px_rgba(212,175,55,0.6)]">
                    {splitChars("Royal", "gold-char-gradient")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#FAF7F2] font-bold tracking-[0.03em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                    {splitChars("Weddings")}
                  </span>
                </div>

                <div className="mt-1 sm:mt-2.5 flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2.5">
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
                    {splitChars("With")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
                    {splitChars("Grandeur")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
                    {splitChars("&")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
                    {splitChars("Soul")}
                  </span>
                </div>
              </h1>
            </motion.div>

            {/* ── Ornamental divider ── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <Divider variant="ornamental" className="my-1 sm:my-1.5 [&>*]:border-gold/50 [&>*]:text-gold/80" />
            </motion.div>

            {/* ── Subtitle ──────────────────────────── */}
            <motion.p
              className="font-sans text-xs sm:text-sm lg:text-[15px] text-[#FAF7F2]/85 font-normal max-w-2xl mx-auto leading-[1.75] px-3 sm:px-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
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
              custom={4}
            >
              {/* Primary — refined charcoal button with gold highlight */}
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5
                  font-sans text-xs uppercase tracking-[0.18em] font-semibold
                  bg-[#FAF7F2] text-[#1A1209] rounded-[2px] text-center
                  border border-[#FAF7F2]/90
                  shadow-[0_4px_20px_rgba(0,0,0,0.18)]
                  hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]
                  hover:border-gold/60
                  hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-300 ease-out"
              >
                Plan Your Royal Wedding
              </a>

              {/* Secondary — ethereal ghost outline */}
              <a
                href="/celebrations"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5
                  font-sans text-xs uppercase tracking-[0.18em] font-semibold
                  bg-transparent text-[#FAF7F2] text-center
                  border border-[#FAF7F2]/40 rounded-[2px]
                  hover:bg-[#FAF7F2]/10 hover:border-[#FAF7F2]/75
                  hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-300 ease-out"
              >
                Explore Celebrations
              </a>
            </motion.div>

            {/* ── Scroll nudge ──────────────────────── */}
            <motion.div
              className="pt-1 sm:pt-2 flex justify-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1 opacity-50 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-px h-7 bg-gradient-to-b from-[#FAF7F2]/60 to-transparent" />
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </motion.div>

    </section>
  );
};
