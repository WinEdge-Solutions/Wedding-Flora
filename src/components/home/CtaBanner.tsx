import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";

export const CtaBanner: React.FC = () => {
  return (
    <Section variant="charcoal" className="text-center overflow-hidden">
      <Container size="narrow">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
          Your Love Story Deserves Perfection
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ivory tracking-tight leading-tight">
          Let Us Create Something Beautiful Together
        </h2>
        <div className="flex justify-center my-6">
          <Divider variant="ornamental" className="text-gold/50" />
        </div>
        <p className="font-sans text-base sm:text-lg text-ivory/80 font-light max-w-xl mx-auto leading-relaxed mb-8">
          We accept a limited number of weddings each season to ensure every couple receives
          our devoted attention, bespoke artistry, and seamless coordination.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/contact" variant="outline" className="border-gold text-ivory hover:bg-gold/20" size="lg">
            Reserve Your Date
          </Button>
          <Button href="/packages" variant="text" className="text-ivory hover:text-gold" size="lg">
            View Our Packages & Investment
          </Button>
        </div>
      </Container>
    </Section>
  );
};
