import React from "react";
import Image from "next/image";
import { planningProcessSteps } from "@/lib/content/rituals";
import { Check, Sparkles, FileText } from "lucide-react";

export const PlanningProcessSection: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ── Section Header ── */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold flex items-center justify-center gap-2">
          <span>✦</span>
          <span>The 7 Rituals of Wedding Planning</span>
          <span>✦</span>
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ivory tracking-tight leading-tight">
          Our Proven 7-Step Regal Blueprint
        </h2>
        <p className="font-sans text-sm sm:text-base text-ivory/80 font-medium leading-relaxed">
          From the initial heartfelt consultation to live on-ground showtime, we guide our esteemed families through a transparent, stress-free journey of aristocratic celebration.
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
                <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group bg-white/5">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/85 via-transparent to-transparent" />

                  {/* Step Number Tag */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-gold/40 text-xs uppercase tracking-widest text-gold font-extrabold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Step {step.stepNumber}</span>
                  </div>

                  {/* Tagline Badge */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[11px] uppercase tracking-wider text-white/90 font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded inline-block border border-white/10">
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
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-ivory tracking-tight leading-snug">
                    {step.title}
                  </h3>
                </div>

                <p className="font-sans text-sm sm:text-base text-ivory/80 leading-relaxed font-medium">
                  {step.description}
                </p>

                {/* Key Points Checklist */}
                <div className="space-y-2.5 pt-1">
                  {step.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
                    >
                      <span className="mt-0.5 p-0.5 rounded-full bg-gold/20 text-[#D4AF37] shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </span>
                      <span className="text-xs sm:text-sm text-ivory/85 font-medium leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Milestone Deliverable Pill */}
                <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 flex items-center gap-3 text-xs">
                  <FileText className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-ivory/60 block font-bold">
                      Key Milestone Deliverable:
                    </span>
                    <span className="font-bold text-gold">{step.deliverable}</span>
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

