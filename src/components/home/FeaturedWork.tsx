import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { galleryData } from "@/lib/content/gallery";

export const FeaturedWork: React.FC = () => {
  const featured = galleryData.slice(0, 3);

  return (
    <Section variant="ivory">
      <Container>
        <SectionHeading
          eyebrow="The Portfolio"
          title="Recent Celebrations"
          subtitle="A glimpse into the heartfelt celebrations, historic destinations, and bespoke florals we have had the honor of orchestrating."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {featured.map((item, index) => (
            <div
              key={item.id}
              className={`group flex flex-col ${index === 1 ? "md:translate-y-8" : ""}`}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream rounded-[2px] mb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors" />
                <span className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-charcoal font-medium">
                  {item.category}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-sans text-warmgrey uppercase tracking-wider">
                  {item.location} • {item.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <Button href="/portfolio" variant="primary" size="md">
            View Complete Gallery
          </Button>
        </div>
      </Container>
    </Section>
  );
};
