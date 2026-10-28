"use client";

import React, { useState } from "react";
import { ritualsFaqs } from "@/lib/content/rituals";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const RitualsFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── Header ── */}
      <div className="text-center space-y-2.5">
        <div className="flex items-center justify-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.2em]">
          <HelpCircle className="w-4 h-4 text-gold" />
          <span>Ritual Insights &amp; Timelines</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ivory">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-ivory/70">
          Everything you need to know about traditional ceremony curation and multi-day destination timelines.
        </p>
      </div>

      {/* ── Accordion List ── */}
      <div className="space-y-3">
        {ritualsFaqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#090614]/70 backdrop-blur-xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-serif font-semibold text-ivory hover:text-gold transition-colors gap-4"
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
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-ivory/80 font-sans font-medium leading-relaxed border-t border-white/5">
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
