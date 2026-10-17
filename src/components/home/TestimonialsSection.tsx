import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialsData } from "@/lib/content/testimonials";

export const TestimonialsSection: React.FC = () => {
  return (
    <Section variant="cream">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Words of Gratitude"
          title="From Our Couples"
          subtitle="The heartfelt memories and experiences of couples who entrusted us with their most cherished day."
        />

        <div className="space-y-16">
          {testimonialsData.map((item, index) => (
            <div
              key={item.id}
              className={`text-center space-y-6 ${
                index !== testimonialsData.length - 1
                  ? "pb-16 border-b border-gold/20"
                  : ""
              }`}
            >
              <span className="font-serif text-5xl text-gold/40 select-none block leading-none">
                “
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-charcoal leading-relaxed italic max-w-2xl mx-auto">
                {item.quote}
              </blockquote>
              <div className="pt-2">
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-charcoal font-medium">
                  {item.couple}
                </p>
                <p className="font-sans text-xs text-warmgrey tracking-wide mt-1">
                  {item.venue} • {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
