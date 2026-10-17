"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { galleryData } from "@/lib/content/gallery";

export const FeaturedWork: React.FC = () => {
  const featured = galleryData.slice(0, 3);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section variant="ivory">
      <Container>
        <SectionHeading
          eyebrow="The Portfolio"
          title="Recent Celebrations"
          subtitle="A glimpse into the heartfelt celebrations, historic destinations, and bespoke florals we have had the honor of orchestrating."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: index === 1 ? 32 : 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col"
            >
              {/* Image container with curtain-lift overlay */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream rounded-[2px] mb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/10 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Category badge */}
                <span className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-charcoal font-medium border-l-2 border-gold">
                  {item.category}
                </span>

                {/* Hover — gold border reveal */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 transition-all duration-500 rounded-[2px]" />

                {/* Hover — shimmer sweep manually via CSS class */}
                <div className="shimmer-card absolute inset-0" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-warmgrey uppercase tracking-wider">
                  {item.location} • {item.year}
                </p>
                {/* Animated underline */}
                <div className="h-px w-0 group-hover:w-12 bg-gradient-to-r from-gold to-gold/30 transition-all duration-500 mt-2" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Button href="/portfolio" variant="primary" size="md">
            View Complete Gallery
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
