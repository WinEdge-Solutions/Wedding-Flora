"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/Divider";
import { FloralParticles } from "@/components/ui/FloralParticles";
import { Volume2, VolumeX } from "lucide-react";

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
  const [isMuted, setIsMuted] = useState(true);

  /* ── Scroll-driven parallax + fade ────────────────── */
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const videoY = useTransform(scrollY, [0, 600], [0, 100]);
  const videoScale = useTransform(scrollY, [0, 600], [1.05, 1.15]);

  /* ── Sound toggle handler ──────────────────────────── */
  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      videoRef.current.play().catch(() => {});
    }
  };

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
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030308]"
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
            muted={isMuted}
            playsInline
            preload="auto"
            poster="/images/hero-bg.jpg"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] saturate-[1.12]"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ── Multi-Layer Cinematic Scrims ── */}
        {/* Top navbar dark gradient veil */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#030308]/95 via-[#030308]/60 to-transparent" />

        {/* Deep ambient royal dark veil */}
        <div className="absolute inset-0 bg-[#06040d]/45 backdrop-blur-[0.5px]" />

        {/* Radial vignette spotlight for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, rgba(212, 175, 55, 0.06) 0%, rgba(3, 3, 8, 0.55) 60%, rgba(3, 3, 8, 0.95) 100%)",
          }}
        />

        {/* Bottom seamless transition fade to next section */}
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#030308] via-[#030308]/85 to-transparent" />
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

            {/* ── Eyebrow label in frosted pill ─────────── */}
            <motion.div
              className="flex justify-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.32em] text-gold font-bold inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-gold/40 shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                <span>✦</span>
                <span>Royal Indian Wedding Planning &amp; Floral Artistry</span>
                <span>✦</span>
              </p>
            </motion.div>

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
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#FAF7F2] font-bold tracking-[0.03em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    {splitChars("Crafting")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-extrabold tracking-[0.03em] drop-shadow-[0_0_28px_rgba(212,175,55,0.6)]">
                    {splitChars("Royal", "gold-char-gradient")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#FAF7F2] font-bold tracking-[0.03em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    {splitChars("Weddings")}
                  </span>
                </div>

                <div className="mt-1 sm:mt-2.5 flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2.5">
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                    {splitChars("With")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                    {splitChars("Grandeur")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                    {splitChars("&")}
                  </span>
                  <span className="inline-block overflow-hidden whitespace-nowrap font-serif text-lg sm:text-3xl md:text-4xl lg:text-[2.65rem] text-[#F3E5AB]/95 font-light italic tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                    {splitChars("Soul")}
                  </span>
                </div>
              </h1>
            </motion.div>

            {/* ── Ornamental divider (ivory on dark) ── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <Divider variant="ornamental" className="my-1 sm:my-1.5 [&>*]:border-gold/50 [&>*]:text-gold/80" />
            </motion.div>

            {/* ── Subtitle ──────────────────────────── */}
            <motion.p
              className="font-sans text-xs sm:text-sm lg:text-[15px] text-[#FAF7F2]/90 font-medium max-w-2xl mx-auto leading-relaxed px-3 sm:px-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
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
                  bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37]
                  text-[#090614] rounded-[3px] text-center
                  shadow-[0_0_0_1px_rgba(212,175,55,0.5),0_10px_35px_rgba(212,175,55,0.4)]
                  hover:shadow-[0_0_0_1px_rgba(212,175,55,0.9),0_12px_50px_rgba(212,175,55,0.65)]
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-300 ease-out"
              >
                Plan Your Royal Wedding
              </a>

              {/* Secondary — frosted glass */}
              <a
                href="/celebrations"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3.5
                  font-sans text-xs uppercase tracking-[0.18em] font-bold
                  bg-black/45 backdrop-blur-xl text-ivory text-center
                  border border-gold/40 rounded-[3px]
                  hover:bg-gold/15 hover:border-gold hover:text-white
                  hover:shadow-[0_0_28px_rgba(212,175,55,0.35)]
                  hover:scale-[1.03] active:scale-[0.98]
                  transition-all duration-300 ease-out"
              >
                Explore Celebrations
              </a>
            </motion.div>

            {/* ── Trust Credential Bar ──────────────── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5.5}
              className="pt-2 flex items-center justify-center"
            >
              <div className="inline-flex items-center gap-2 sm:gap-4 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] text-ivory/80 font-sans tracking-wide">
                <span className="text-gold font-bold">✦ 100+ Royal Palace Weddings</span>
                <span className="text-white/20">•</span>
                <span>Udaipur • Jaipur • Jodhpur • Goa</span>
                <span className="text-white/20 hidden md:inline">•</span>
                <span className="text-gold/90 font-medium hidden md:inline">Bespoke Hospitality</span>
              </div>
            </motion.div>

            {/* ── Scroll nudge ──────────────────────── */}
            <motion.div
              className="pt-1 sm:pt-2 flex justify-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2.3, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
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

      {/* ══════════════════════════════════════════════
          LAYER 3 — Interactive Sound Toggle Pill
      ══════════════════════════════════════════════ */}
      <div className="absolute bottom-6 right-6 z-30">
        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-gold/40 text-ivory text-xs font-semibold hover:border-gold hover:text-gold hover:bg-black/85 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.7)] group"
          aria-label={isMuted ? "Unmute background sound" : "Mute background sound"}
        >
          {isMuted ? (
            <>
              <VolumeX size={14} className="text-gold/80 group-hover:text-gold" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ivory/80 group-hover:text-ivory font-bold">
                Sound On
              </span>
            </>
          ) : (
            <>
              <Volume2 size={14} className="text-gold animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gold font-bold">
                Sound Active
              </span>
            </>
          )}
        </button>
      </div>

    </section>
  );
};
