"use client";

import React from "react";
import { usePageConfig } from "@/components/cms/CmsProvider";
import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { HorizontalGallery } from "@/components/home/HorizontalGallery";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import {
  CustomSectionRenderer,
  PageCtaBlock,
  PageHeroBlock,
} from "@/components/cms/CustomSectionRenderer";

export function DynamicHomeView() {
  const pageConfig = usePageConfig("home");

  return (
    <main>
      {pageConfig.sections
        .filter((sec) => sec.visible)
        .map((section) => {
          switch (section.kind) {
            case "home-hero":
              return <Hero key={section.id} section={section} />;
            case "home-services":
              return <ServicesOverview key={section.id} section={section} />;
            case "home-featured-work":
              return <FeaturedWork key={section.id} section={section} />;
            case "home-horizontal-gallery":
              return <HorizontalGallery key={section.id} section={section} />;
            case "home-testimonials":
              return <TestimonialsSection key={section.id} section={section} />;
            case "home-cta":
              return <CtaBanner key={section.id} section={section} />;
            case "page-hero":
              return <PageHeroBlock key={section.id} section={section} />;
            case "page-cta":
              return <PageCtaBlock key={section.id} section={section} />;
            default:
              return <CustomSectionRenderer key={section.id} section={section} />;
          }
        })}
    </main>
  );
}

