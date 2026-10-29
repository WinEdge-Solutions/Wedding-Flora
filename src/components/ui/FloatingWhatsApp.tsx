"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/site";
import { MessageCircle, X } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="WhatsApp Concierge"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Expanded quick consultation popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat on WhatsApp"
          className="mb-3 w-[290px] sm:w-[320px] rounded-[3px] bg-[#FAF7F2] border border-[#D4AF37]/50 shadow-[0_12px_40px_rgba(0,0,0,0.25)] overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
        >
          {/* Header */}
          <div className="bg-[#030308] text-[#FAF7F2] px-4 py-3 border-b border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                <MessageCircle size={15} />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#25D366] ring-2 ring-[#030308]" />
              </div>
              <div>
                <p className="font-serif text-[13px] font-semibold text-[#FAF7F2] leading-none">
                  Wedding Flora Concierge
                </p>
                <p className="text-[8.5px] uppercase tracking-[0.16em] text-[#D4AF37] mt-0.5 font-sans">
                  Online • Palace Wedding Desk
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#FAF7F2]/60 hover:text-[#FAF7F2] transition-colors p-1"
              aria-label="Close WhatsApp popup"
            >
              <X size={14} />
            </button>
          </div>

          {/* Body message */}
          <div className="p-4 space-y-3 bg-[#FAF7F2]">
            <div className="bg-white p-3 rounded-[2px] border border-[#D7D3CF] text-[12px] leading-relaxed text-[#5D5956]">
              <p className="font-serif text-[13px] text-[#030308] font-semibold mb-1">
                Namaste! 🙏
              </p>
              <p>
                Planning a royal destination wedding in Rajasthan or across India? Connect directly with our lead wedding designers on WhatsApp.
              </p>
            </div>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[2px] bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm hover:shadow-md transition-all duration-200"
            >
              <MessageCircle size={14} />
              <span>Start WhatsApp Chat</span>
            </a>
            <p className="text-[9.5px] text-center text-[#5D5956]/70 tracking-wide">
              Direct line: {siteConfig.contact.phone}
            </p>
          </div>
        </div>
      )}

      {/* Main floating trigger pill / button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="group relative flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-[3px] bg-[#FAF7F2] text-[#030308] border border-[#D4AF37] shadow-[0_6px_25px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(212,175,55,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]" />
          </span>

          <div className="flex flex-col text-left">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-[#030308] group-hover:text-[#AB9178] transition-colors leading-none">
              WhatsApp Us
            </span>
            <span className="text-[8px] uppercase tracking-[0.14em] text-[#D4AF37] font-semibold mt-0.5 leading-none">
              Direct Concierge
            </span>
          </div>

          <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 ml-0.5 shadow-sm">
            <MessageCircle size={13} />
          </div>
        </button>
      </div>
    </aside>
  );
};
