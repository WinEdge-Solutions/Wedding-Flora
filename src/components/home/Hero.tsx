"use client";

import React, { useRef, useState, useEffect } from "react";
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

/* ── Hero Slideshow configuration ─────────────────────── */
interface HeroSlide {
  src: string;
  alt: string;
  position?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/hero/hero-slide-1.jpg",
    alt: "Royal palace wedding stage with stone arches, terracotta drapes and glowing elephants by Wedding Flora",
    position: "object-center",
  },
  {
    src: "/images/hero/hero-slide-2.jpg",
    alt: "Grand emerald draped entrance corridor with floral arches, candles and chandeliers by Wedding Flora",
    position: "object-center",
  },
  {
    src: "/images/hero/hero-slide-3.jpg",
    alt: "Illuminated teal triple-arch palace stage with fairy light canopy by Wedding Flora",
    position: "object-center",
  },
  {
    src: "/images/hero/hero-slide-4.jpg",
    alt: "Enchanting garden wedding celebration with pink floral tablescapes by Wedding Flora",
    position: "object-center",
  },
  {
    src: "/images/hero/hero-slide-5.jpg",
    alt: "Opulent golden crystal chandelier suspended beneath royal blue drapery by Wedding Flora",
    position: "object-top",
  },
];

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

  /* Slideshow rotation state */
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[calc(100svh-64px)] sm:min-h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden"
    >
      {/* ── Aurora static orbs (always drifting) ─── */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="aurora-orb aurora-orb-a" />
        <div className="aurora-orb aurora-orb-b" />
        <div className="aurora-orb aurora-orb-c" />
      </div>

      {/* ── Mouse-tracking bokeh ──────────────────── */}
      <BokehLayer />

      {/* ── Parallax cross-fade hero slideshow ───── */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: smoothImageY }}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <motion.div
              key={slide.src}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.08 : 1.02,
              }}
              transition={{
                opacity: { duration: 1.8, ease: "easeInOut" },
                scale: { duration: 6.5, ease: "easeOut" },
              }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover ${slide.position || "object-center"}`}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Gradient overlay: ensures luxury warmth & reliable text contrast */}
      <motion.div
        className="absolute inset-0 z-[3]"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to bottom, rgba(250,247,242,0.85) 0%, rgba(250,247,242,0.68) 45%, rgba(250,247,242,0.92) 100%)",
        }}
      />

      {/* ── Central contrast halo behind text card ── */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(250,247,242,0.6) 0%, rgba(250,247,242,0.15) 70%, transparent 100%)",
        }}
      />

      {/* ── Text content ─────────────────────────── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-[5] w-full"
      >
        <Container className="text-center py-6 sm:py-8 lg:py-10 my-auto">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4 px-4 sm:px-8 py-6 sm:py-8 rounded-[4px] bg-ivory/70 sm:bg-ivory/55 backdrop-blur-[5px] border border-gold/25 shadow-[0_12px_45px_rgba(43,43,43,0.06)]">

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
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
            >
              Royal Indian Wedding Planning &amp; Floral Artistry
            </motion.p>

            <motion.h1
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold sm:font-bold text-charcoal tracking-tight leading-[1.14]"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
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
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
            >
              From starlit palace Sangeets in Udaipur to ethereal Mandap ceremonies across heritage fortresses,
              we curate unforgettable Indian wedding heirlooms tailored to your family&apos;s heritage.
            </motion.p>

            {/* CTA Buttons - immediately visible above the fold on both phone & desktop */}
            <motion.div
              className="pt-2 sm:pt-4 flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap"
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
            >
              <Button href="/contact" variant="primary" size="md" className="px-5 sm:px-7 py-3 text-xs shadow-lg bg-charcoal text-ivory border border-gold/50 hover:border-gold">
                Plan Your Royal Wedding
              </Button>
              <Button href="/celebrations" variant="outline" size="md" className="px-5 sm:px-7 py-3 text-xs bg-ivory/95 text-charcoal border border-gold/60 hover:bg-gold/15 shadow-sm">
                Explore Celebrations
              </Button>
            </motion.div>

            {/* Slideshow subtle indicators */}
            <motion.div
              className="flex items-center justify-center gap-1.5 pt-1"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5.5}
            >
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 focus:outline-none ${
                    i === currentSlide ? "w-6 bg-gold" : "w-1.5 bg-charcoal/25 hover:bg-charcoal/50"
                  }`}
                />
              ))}
            </motion.div>

            {/* Scroll nudge */}
            <motion.div
              className="pt-2 sm:pt-4 flex justify-center"
              variants={fadeUp} initial="hidden" animate="visible" custom={6}
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
