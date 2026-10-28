"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { servicesData } from "@/lib/content/services";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

/* ── 3D Magnetic tilt card ─────────────────────────── */
function MagneticCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(900px) rotateY(${dx * 9}deg) rotateX(${-dy * 6}deg) scale3d(1.04,1.04,1.04)`;
    el.style.boxShadow = `${-dx * 16}px ${dy * 16}px 50px rgba(183,154,91,0.22), 0 24px 60px rgba(43,43,43,0.1)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    el.style.boxShadow = "0 4px 20px rgba(43,43,43,0.04)";
    el.style.transition = "transform 0.6s ease, box-shadow 0.6s ease";
  };

  const handleMouseEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "none";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`shimmer-card relative overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.6s ease, box-shadow 0.6s ease",
      }}
    >
      {children}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export const ServicesOverview: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headingRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headingRef as React.RefObject<HTMLElement | null>, {
    childSelector: "p, .eyebrow",
    stagger: 0.12,
    y: 40,
  });

  return (
    <Section variant="cream">
      <Container>
        {/* Section heading with split-text title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16" ref={headingRef}>
          <p className="eyebrow font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.35em] text-[#D4AF37] font-bold mb-2.5 sm:mb-3 flex items-center justify-center gap-1.5 sm:gap-2 px-2 text-center">
            <span>✦</span>
            <span>Royal Wedding Services</span>
            <span>✦</span>
          </p>
          <SplitTextReveal
            text="Grandeur in Every Celebration"
            as="h2"
            className="font-display text-2xl sm:text-4xl lg:text-5xl text-ivory font-bold mb-3 sm:mb-4 tracking-[0.03em]"
            stagger={0.025}
          />
          <p className="font-sans text-xs sm:text-base text-ivory/80 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            From heritage palace procurement and opulent floral mandaps to
            concert-grade Sangeet production and bespoke hospitality across India.
          </p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {servicesData.slice(0, 6).map((service, i) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              <MagneticCard className="group bg-[#090614]/70 backdrop-blur-xl border border-white/10 hover:border-gold/60 rounded-[3px] flex flex-col h-full shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#030308]">
                  <Image
                    src={service.imageUrl}
                    alt={`${service.title} by Wedding Flora`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Gold gradient bleed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  {/* Gold shimmer line top */}
                  <div className="absolute top-0 inset-x-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-700" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory mb-2 font-semibold group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs font-sans uppercase tracking-wider mb-3 text-[#D4AF37] font-bold">
                      {service.tagline}
                    </p>
                    <p className="text-sm text-ivory/80 font-medium line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/10">
                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center text-xs uppercase tracking-widest text-ivory/90 font-semibold hover:text-gold transition-colors group/link"
                    >
                      <span>Discover More</span>
                      <ArrowRight
                        size={14}
                        className="ml-1.5 transition-transform duration-300 group-hover/link:translate-x-1.5 text-gold"
                      />
                    </Link>
                  </div>
                </div>

                {/* Bottom gold accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-gold/0 via-gold to-gold/0 transition-all duration-500" />
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Button href="/services" variant="outline" size="md">
            Explore All 7 Services &amp; Packages
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
