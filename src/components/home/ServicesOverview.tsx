"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/content/services";
import { ArrowRight } from "lucide-react";

/* ── Magnetic tilt card ─────────────────────────────── */
function MagneticCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 5}deg) scale3d(1.03,1.03,1.03)`;
    el.style.boxShadow = `${-dx * 12}px ${dy * 12}px 40px rgba(183,154,91,0.18), 0 20px 50px rgba(43,43,43,0.07)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)";
    el.style.boxShadow = "0 4px 20px rgba(43,43,43,0.04)";
    el.style.transition = "transform 0.5s ease, box-shadow 0.5s ease";
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
      style={{ transformStyle: "preserve-3d", transition: "transform 0.5s ease, box-shadow 0.5s ease" }}
    >
      {children}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export const ServicesOverview: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section variant="cream">
      <Container>
        <SectionHeading
          eyebrow="Royal Wedding Services"
          title="Grandeur in Every Celebration"
          subtitle="From heritage palace procurement and opulent floral mandaps to concert-grade Sangeet production and bespoke hospitality across India."
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {servicesData.map((service, i) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              <MagneticCard className="group bg-ivory border border-gold/15 rounded-[2px] flex flex-col h-full">
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-cream">
                  <Image
                    src={service.imageUrl}
                    alt={`${service.title} by Wedding Flora`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Gold gradient bleed up from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-charcoal mb-2 font-normal group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs font-sans uppercase tracking-wider mb-3"
                      style={{ background: "linear-gradient(90deg, #B79A5B, #D4B87A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {service.tagline}
                    </p>
                    <p className="text-sm text-warmgrey font-light line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gold/10">
                    <Link
                      href={`/services#${service.id}`}
                      className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal font-medium hover:text-gold transition-colors group/link"
                    >
                      <span>Discover More</span>
                      <ArrowRight size={14} className="ml-1.5 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                    </Link>
                  </div>
                </div>

                {/* Bottom gold accent line that grows on hover */}
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
            View All Services &amp; Details
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
