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
          "radial-gradient(ellipse 60% 45% at var(--orb-x, 50%) var(--orb-y, 40%), rgba(183,154,91,0.14) 0%, transparent 70%)",
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
  const imageY  = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY   = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.75, 0.95]);

  const smoothImageY = useSpring(imageY, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden"
    >
      {/* ── Aurora static orbs (always drifting) ─── */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="aurora-orb aurora-orb-a" />
        <div className="aurora-orb aurora-orb-b" />
        <div className="aurora-orb aurora-orb-c" />
      </div>

      {/* ── Mouse-tracking bokeh ──────────────────── */}
      <BokehLayer />

      {/* ── Parallax hero image ───────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: smoothImageY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury wedding ceremony altar styled with romantic white florals and cascading greenery"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-110"
        />
      </motion.div>

      {/* ── Gradient overlay (brightens as you scroll) */}
      <motion.div
        className="absolute inset-0 z-[3]"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to bottom, rgba(250,247,242,0.88) 0%, rgba(250,247,242,0.72) 40%, rgba(250,247,242,0.96) 100%)",
        }}
      />

      {/* ── Text content ─────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-[5] w-full"
      >
        <Container className="text-center py-28 sm:py-36">
          <div className="max-w-3xl mx-auto space-y-7">

            <motion.p
              className="font-sans text-xs sm:text-sm uppercase tracking-[0.35em] text-gold font-medium"
              variants={fadeUp} initial="hidden" animate="visible" custom={0}
            >
              Royal Indian Wedding Planning &amp; Floral Artistry
            </motion.p>

            <motion.h1
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-charcoal tracking-tight leading-[1.12]"
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
            >
              Crafting{" "}
              <span className="text-gold-gradient">Royal</span>{" "}
              Weddings
              <br className="hidden sm:block" />
              <span className="italic"> With Grandeur &amp; Soul</span>
            </motion.h1>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
              <Divider variant="ornamental" className="my-4" />
            </motion.div>

            <motion.p
              className="font-sans text-base sm:text-lg lg:text-xl text-warmgrey font-light max-w-2xl mx-auto leading-relaxed"
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
            >
              From starlit palace Sangeets in Udaipur to ethereal Mandap ceremonies across heritage fortresses,
              we curate unforgettable Indian wedding heirlooms tailored to your family&apos;s heritage.
            </motion.p>

            <motion.div
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
            >
              <Button href="/contact" variant="primary" size="lg">
                Plan Your Royal Wedding
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                Explore Celebrations
              </Button>
            </motion.div>

            {/* Scroll nudge */}
            <motion.div
              className="pt-8 flex justify-center"
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-80 transition-opacity"
              >
                <span className="text-[9px] uppercase tracking-[0.3em] text-charcoal font-sans">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-charcoal/60 to-transparent" />
              </motion.div>
            </motion.div>

          </div>
        </Container>
      </motion.div>
    </section>
  );
};
