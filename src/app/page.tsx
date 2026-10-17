import React from "react";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesOverview />
      <FeaturedWork />
      <TestimonialsSection />
      <CtaBanner />
    </main>
  );
}
