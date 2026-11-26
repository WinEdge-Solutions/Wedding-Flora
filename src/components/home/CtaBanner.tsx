"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import type { PageSectionConfig } from "@/lib/cms/types";

export const CtaBanner: React.FC<{ section?: PageSectionConfig }> = ({ section }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const c = section?.content;
  const isLeft = section?.layout === "left-aligned";

  const eyebrow = c?.eyebrow || "Your Royal Celebration Awaits";
  const title = c?.title || "Let Us Craft Your";
  const highlight = c?.titleHighlight || "Royal Wedding";
  const suffix = c?.titleSuffix ?? "Celebration";
  const subtitle =
    c?.subtitle ||
    "We curate a select number of luxury palace and destination weddings each season across India, ensuring undivided devotion, opulent floral artistry, and seamless coordination for your family.";
  const primaryLabel = c?.primaryCtaLabel || "Begin Planning";
  const primaryHref = c?.primaryCtaHref || "/contact";
  const secondaryLabel = c?.secondaryCtaLabel || "Explore Royal Services";
  const secondaryHref = c?.secondaryCtaHref || "/services";

  return (
    <Section variant={section?.bgVariant ?? "ivory"} className="text-center overflow-hidden">
      <Container size="narrow" className="relative z-10">
        <div
          className={`bg-[#F7F3EC] border border-gold/20 p-6 sm:p-14 lg:p-20 shadow-[0_12px_45px_rgba(26,18,9,0.05)] relative overflow-hidden ${
            isLeft ? "text-left" : "text-center"
          }`}
          style={{ borderRadius: "var(--wf-radius, 2px)" }}
        >
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
            className="space-y-4 sm:space-y-6"
          >
            <p
              className={`font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center gap-2 px-2 ${
                isLeft ? "justify-start" : "justify-center text-center"
              }`}
            >
              <span className="opacity-60">—</span>
              <span>{eyebrow}</span>
              <span className="opacity-60">—</span>
            </p>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1209] tracking-[0.03em] leading-[1.2]">
              {title}{" "}
              {highlight && (
                <span className="font-serif italic font-normal text-[#D4AF37]">{highlight}</span>
              )}{" "}
              {suffix}
            </h2>

            {c?.showDivider !== false && (
              <div className={`flex ${isLeft ? "justify-start" : "justify-center"}`}>
                <Divider variant="ornamental" className="text-gold/40 my-2 sm:my-3" />
              </div>
            )}

            <p
              className={`font-sans text-sm sm:text-base text-[#5C5147] font-normal max-w-xl leading-[1.75] px-2 sm:px-0 ${
                isLeft ? "" : "mx-auto"
              }`}
            >
              {subtitle}
            </p>

            <motion.div
              className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full max-w-xs sm:max-w-none ${
                isLeft ? "justify-start" : "justify-center mx-auto"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <Button href={primaryHref} variant="primary" size="lg" className="w-full sm:w-auto">
                {primaryLabel}
              </Button>
              {secondaryLabel && (
                <Button href={secondaryHref} variant="outline" size="lg" className="w-full sm:w-auto">
                  {secondaryLabel}
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};
