import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/ui/Divider";

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Hero Image with refined luxury overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury wedding ceremony altar styled with romantic white florals and cascading greenery"
          fill
          priority
          className="object-cover object-center scale-105 animate-in fade-in duration-1000"
        />
        {/* Ivory warm translucent gradient overlay for optimal legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/85 via-ivory/70 to-ivory" />
      </div>

      <Container className="relative z-10 text-center py-24 sm:py-32">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] text-gold font-medium">
            Bespoke Wedding Planning & Floral Artistry
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-charcoal tracking-tight leading-[1.15]">
            Crafting Timeless Weddings With Romance & Grace
          </h1>

          <Divider variant="ornamental" className="my-6" />

          <p className="font-sans text-base sm:text-lg lg:text-xl text-warmgrey font-light max-w-2xl mx-auto leading-relaxed">
            We curate intimate gatherings and grand celebrations across scenic estates
            and destination sanctuaries—transforming your vision into an unforgettable heirloom.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Begin Your Journey
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              Explore Our Portfolio
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
