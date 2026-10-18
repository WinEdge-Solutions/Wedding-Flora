"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/Divider";

/* ── Bokeh orb that follows the mouse ─────────────────── */
function BokehLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const posX = useRef(50);
  const posY = useRef(40);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 100;
      mouseY.current = (e.clientY / window.innerHeight) * 100;
    };
    window.addEventListener("mousemove", handleMove);

    const animate = () => {
      posX.current += (mouseX.current - posX.current) * 0.04;
      posY.current += (mouseY.current - posY.current) * 0.04;
      if (ref.current) {
        ref.current.style.setProperty("--orb-x", `${posX.current}%`);
        ref.current.style.setProperty("--orb-y", `${posY.current}%`);
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 z-[2] pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 60% 45% at var(--orb-x, 50%) var(--orb-y, 40%), rgba(183,154,91,0.18) 0%, transparent 70%)",
      }}
    />
  );
}

/* ── Fade/slide up stagger for text ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax layers at different speeds */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.85, 0.95]);

  const smoothImageY = useSpring(imageY, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100svh-64px)] sm:min-h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden py-8 sm:py-12"
    >
      {/* ── Aurora static orbs (always drifting) ─── */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="aurora-orb aurora-orb-a" />
        <div className="aurora-orb aurora-orb-b" />
        <div className="aurora-orb aurora-orb-c" />
      </div>

      {/* ── Mouse-tracking bokeh ──────────────────── */}
      <BokehLayer />

      {/* ── Static Royal Palace Stage Background ──── */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: smoothImageY }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Royal white jharokha palace stage adorned with red roses and chandeliers by Wedding Flora"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
      </motion.div>

      {/* ── Ambient luxury lighting & vignette overlay ─ */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to bottom, rgba(43,43,43,0.35) 0%, rgba(250,247,242,0.18) 35%, rgba(250,247,242,0.45) 75%, rgba(250,247,242,0.92) 100%)",
        }}
      />

      {/* ── Central contrast halo behind text card ── */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(250,247,242,0.55) 0%, rgba(250,247,242,0.15) 70%, transparent 100%)",
        }}
      />

      {/* ── Text Content wrapped in Luxury Glassmorphism Card ── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-[5] w-full"
      >
        <Container className="text-center py-4 sm:py-6 my-auto">
          {/* Glassmorphic box */}
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4 px-6 sm:px-12 py-8 sm:py-10 rounded-xl sm:rounded-2xl bg-ivory/80 backdrop-blur-xl border border-white/70 shadow-[0_20px_50px_rgba(43,43,43,0.18),0_1px_2px_rgba(255,255,255,0.9)_inset,0_0_0_1px_rgba(183,154,91,0.3)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_rgba(183,154,91,0.25),0_1px_3px_rgba(255,255,255,1)_inset,0_0_0_1px_rgba(183,154,91,0.45)]">
            
            {/* Top glass reflection sheen highlight */}
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
            
            {/* Ambient gold corner glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gold/15 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gold/15 blur-2xl pointer-events-none" />

            {/* Floral Wreath Crest Monogram */}
            <motion.div
              className="flex justify-center -mb-1"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 drop-shadow-sm transition-transform duration-500 hover:scale-105">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Wedding Flora Crest"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            <motion.p
              className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#8C6D2D] font-bold"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Royal Indian Wedding Planning &amp; Floral Artistry
            </motion.p>

            <motion.h1
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold sm:font-bold text-charcoal tracking-tight leading-[1.14]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Crafting{" "}
              <span className="text-gold-gradient font-bold">Royal</span>{" "}
              Weddings
              <br className="hidden sm:block" />
              <span className="italic font-medium"> With Grandeur &amp; Soul</span>
            </motion.h1>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
              <Divider variant="ornamental" className="my-1.5 sm:my-2" />
            </motion.div>

            <motion.p
              className="font-sans text-xs sm:text-base lg:text-lg text-charcoal font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-sm px-2 sm:px-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              From starlit palace Sangeets in Udaipur to ethereal Mandap ceremonies across heritage fortresses,
              we curate unforgettable Indian wedding heirlooms tailored to your family&apos;s heritage.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="pt-2 sm:pt-4 flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="px-6 sm:px-8 py-3.5 text-xs shadow-lg bg-charcoal text-ivory border border-gold/50 hover:border-gold hover:shadow-[0_0_24px_rgba(183,154,91,0.35)] transition-all duration-300"
              >
                Plan Your Royal Wedding
              </Button>
              <Button
                href="/celebrations"
                variant="outline"
                size="md"
                className="px-6 sm:px-8 py-3.5 text-xs bg-white/70 backdrop-blur-md text-charcoal border border-gold/70 shadow-sm hover:bg-gold/15 transition-all duration-300"
              >
                Explore Celebrations
              </Button>
            </motion.div>

            {/* Scroll nudge */}
            <motion.div
              className="pt-3 sm:pt-4 flex justify-center"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
              >
                <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal font-bold font-sans">Scroll</span>
                <div className="w-px h-5 sm:h-6 bg-gradient-to-b from-charcoal/80 to-transparent" />
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </motion.div>
    </section>
  );
};
