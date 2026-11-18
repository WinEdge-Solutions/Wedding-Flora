import React from "react";
import { Hero } from "@/components/home/Hero";
import { DayToNightScenography } from "@/components/home/DayToNightScenography";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HorizontalGallery } from "@/components/home/HorizontalGallery";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <DayToNightScenography />
      <ServicesOverview />
      <FeaturedWork />
      {/* Pinned horizontal scroll gallery — desktop only */}
      <HorizontalGallery />
      <TestimonialsSection />
      <CtaBanner />
    </main>
  );
}
