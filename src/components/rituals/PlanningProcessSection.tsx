"use client";

import React from "react";
import Image from "next/image";
import { useCms } from "@/components/cms/CmsProvider";
import type { PageSectionConfig } from "@/lib/cms/types";
import { Check, Sparkles, FileText } from "lucide-react";

export const PlanningProcessSection: React.FC<{ section?: PageSectionConfig }> = ({
  section,
}) => {
  const cms = useCms();
  const planningProcessSteps = cms.collections.processSteps;
  const c = section?.content;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ── Section Header ── */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-2">
          <span className="opacity-60">—</span>
          <span>{c?.eyebrow || "The 7-Step Working Process"}</span>
          <span className="opacity-60">—</span>
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1209] tracking-tight leading-tight">
          {c?.title || "Our Proven 7-Step Working Process"}
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#5C5147] font-normal leading-[1.75]">
          {c?.subtitle ||
            "From the initial heartfelt consultation to live on-ground showtime, our structured working process guides families through a transparent, stress-free journey of aristocratic celebration."}
        </p>
      </div>

      {/* ── Step-by-Step Alternating Cards ── */}
      <div className="space-y-16 sm:space-y-24">
        {planningProcessSteps.map((step, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={step.stepNumber}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden border border-gold/25 shadow-md group bg-black">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/85 via-transparent to-transparent" />

                  {/* Step Number Tag */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-[2px] bg-black/75 backdrop-blur-md border border-gold/30 text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Step {step.stepNumber}</span>
                  </div>

                  {/* Tagline Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[11px] uppercase tracking-wider text-white font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-[2px] inline-block border border-white/10">
                      {step.tagline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Content Column */}
              <div
                className={`lg:col-span-6 space-y-5 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-bold block">
                    {step.subtitle} • Stage {step.stepNumber}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1A1209] tracking-tight leading-snug">
                    {step.title}
                  </h3>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#5C5147] leading-relaxed font-medium">
                  {step.description}
                </p>

                {/* Key Points Checklist */}
                <div className="space-y-2.5 pt-1">
                  {step.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2.5 rounded-[2px] bg-white border border-gold/15 shadow-sm"
                    >
                      <span className="mt-0.5 p-0.5 rounded-[2px] bg-gold/20 text-[#D4AF37] shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </span>
                      <span className="text-xs sm:text-sm text-[#1A1209]/85 font-normal leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Milestone Deliverable Pill */}
                <div className="p-3.5 rounded-[2px] bg-gold/10 border border-gold/25 flex items-center gap-3 text-xs">
                  <FileText className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A1209]/60 block font-semibold">
                      Key Milestone Deliverable:
                    </span>
                    <span className="font-semibold text-gold">{step.deliverable}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

