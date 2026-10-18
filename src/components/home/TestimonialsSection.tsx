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
    <Section variant="cream">
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
              {/* Hover: glowing aurora behind quote */}
              <div className="absolute inset-x-0 top-0 h-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(183,154,91,0.07) 0%, transparent 80%)" }}
              />

              {/* Quotation mark */}
              <span className="font-serif text-6xl text-gold-gradient select-none block leading-none">
                &ldquo;
              </span>

              {/* Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-charcoal leading-relaxed italic max-w-2xl mx-auto group-hover:text-black transition-colors duration-300">
                {item.quote}
              </blockquote>

              {/* Attribution */}
              <div className="pt-2 space-y-1">
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal font-bold group-hover:text-gold transition-colors duration-300">
                  {item.couple}
                </p>
                <p className="font-sans text-xs text-charcoal/95 font-semibold tracking-wide">
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
