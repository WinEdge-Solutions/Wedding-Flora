"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialsData } from "@/lib/content/testimonials";

export const TestimonialsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section variant="ivory">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Royal Reflections"
          title="Love Stories From Regal Palaces"
          subtitle="Cherished words from couples and families who celebrated their royal Indian weddings with Wedding Flora."
        />

        <div ref={ref} className="space-y-16">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`group text-center space-y-6 relative ${
                index !== testimonialsData.length - 1
                  ? "pb-16 border-b border-gold/20"
                  : ""
              }`}
            >
              {/* Quotation mark */}
              <span className="font-serif text-6xl text-[#D4AF37] select-none block leading-none">
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-[1.85rem] font-normal text-[#1A1209] leading-relaxed italic max-w-2xl mx-auto tracking-wide">
                {item.quote}
              </blockquote>

              {/* Attribution */}
              <div className="pt-2 space-y-1">
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                  {item.couple}
                </p>
                <p className="font-sans text-xs text-[#5C5147] font-semibold tracking-wide">
                  {item.venue} • {item.date}
                </p>
                {/* Animated accent line */}
                <div className="h-px w-0 group-hover:w-16 bg-gradient-to-r from-gold to-gold/20 mx-auto transition-all duration-500 mt-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
