"use client";

import React, { useState } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import type { PageSectionConfig } from "@/lib/cms/types";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const RitualsFaqSection: React.FC<{ section?: PageSectionConfig }> = ({
  section,
}) => {
  const cms = useCms();
  const ritualsFaqs = cms.collections.ritualFaqs;
  const c = section?.content;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Header ── */}
      <div className="text-center space-y-2.5">
        <div className="flex items-center justify-center gap-2 text-gold text-[11px] font-semibold uppercase tracking-[0.25em]">
          <HelpCircle className="w-4 h-4 text-gold" />
          <span>{c?.eyebrow || "Working Process & Timelines"}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#1A1209]">
          {c?.title || "Frequently Asked Questions"}
        </h2>
        <p className="text-sm text-[#5C5147] font-normal leading-[1.75]">
          {c?.subtitle ||
            "Everything you need to know about our working process, traditional ceremony curation, and multi-day destination timelines."}
        </p>
      </div>

      {/* ── Accordion List ── */}
      <div className="space-y-3">
        {ritualsFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-xl border border-gold/25 bg-white shadow-sm overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-serif font-semibold text-[#1A1209] hover:text-gold transition-colors gap-4"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#5C5147] font-sans font-medium leading-relaxed border-t border-gold/15">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

