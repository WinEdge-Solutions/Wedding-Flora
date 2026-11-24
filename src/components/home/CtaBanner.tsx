"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

export const CtaBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section variant="ivory" className="text-center overflow-hidden">
      <Container size="narrow" className="relative z-10">
        <div className="bg-[#F7F3EC] border border-gold/20 rounded-[2px] p-10 sm:p-16 lg:p-20 shadow-[0_12px_45px_rgba(26,18,9,0.05)] relative overflow-hidden">
          {/* Subtle gold decorative frame accents */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/40 pointer-events-none" />

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-2 px-2 text-center">
              <span className="opacity-60">—</span>
              <span>Your Royal Celebration Awaits</span>
              <span className="opacity-60">—</span>
            </p>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1209] tracking-[0.03em] leading-[1.2]">
              Let Us Craft Your{" "}
              <span className="font-serif italic font-normal text-[#D4AF37]">Royal Wedding</span>{" "}
              Celebration
            </h2>

            <div className="flex justify-center">
              <Divider variant="ornamental" className="text-gold/40 my-2 sm:my-3" />
            </div>

            <p className="font-sans text-sm sm:text-base text-[#5C5147] font-normal max-w-xl mx-auto leading-[1.75] px-2 sm:px-0">
              We curate a select number of luxury palace and destination weddings each season across India,
              ensuring undivided devotion, opulent floral artistry, and seamless coordination for your family.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full max-w-xs sm:max-w-none mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
                Begin Planning
              </Button>
              <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Royal Services
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
