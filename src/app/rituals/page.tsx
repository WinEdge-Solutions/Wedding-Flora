import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { PlanningProcessSection } from "@/components/rituals/PlanningProcessSection";
import { SacredCeremoniesSection } from "@/components/rituals/SacredCeremoniesSection";
import { RitualsFaqSection } from "@/components/rituals/RitualsFaqSection";
import { Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Wedding Rituals & Royal Planning Process | Wedding Flora",
  description:
    "Explore Wedding Flora's proven 7-step royal planning process and the sacred Indian wedding ceremonies we curate — from Ganesh Pujan, Mehendi, and Haldi to the Royal Sangeet and Vedic Pheras.",
};

export default function RitualsPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Rituals Hero ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <div className="flex justify-center -mb-2">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 transition-transform hover:scale-105">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Wedding Flora Crest"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#D4AF37] font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span>✦</span>
              <span>Sacred Traditions &amp; Royal Curation</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              The Rituals of Celebration &amp; Curation
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-sm sm:text-lg text-ivory/80 font-medium leading-relaxed max-w-2xl mx-auto">
              Inspired by centuries of aristocratic heritage, we intertwine the timeless sanctity of Vedic wedding ceremonies with a meticulous, white-glove 7-step planning methodology.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Quick Jump Bar ── */}
      <nav
        aria-label="Rituals Quick Jump"
        className="sticky top-[64px] z-30 bg-[#090614]/90 backdrop-blur-xl border-b border-gold/20 py-2.5 overflow-x-auto no-scrollbar shadow-lg"
      >
        <Container>
          <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mr-1 hidden sm:inline-flex items-center gap-1">
              <span>✦</span> EXPLORE:
            </span>
            <a
              href="#planning-process"
              className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-ivory/85 bg-white/[0.04] border border-white/10 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
            >
              The 7-Step Planning Process
            </a>
            <a
              href="#sacred-rituals"
              className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-ivory/85 bg-white/[0.04] border border-white/10 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
            >
              Sacred Ceremonies We Curate
            </a>
            <a
              href="#faqs"
              className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-ivory/85 bg-white/[0.04] border border-white/10 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
            >
              Rituals &amp; Timing FAQ
            </a>
          </div>
        </Container>
      </nav>

      {/* ── Section 1: The 7-Step Royal Planning Blueprint ── */}
      <section id="planning-process" className="scroll-mt-32">
        <Section variant="charcoal">
          <Container>
            <PlanningProcessSection />
          </Container>
        </Section>
      </section>

      {/* ── Section 2: Sacred Indian Wedding Ceremonies ── */}
      <section id="sacred-rituals" className="scroll-mt-32">
        <Section variant="ivory" className="border-t border-b border-white/10">
          <Container>
            <SacredCeremoniesSection />
          </Container>
        </Section>
      </section>

      {/* ── Section 3: Rituals & Timelines FAQ ── */}
      <section id="faqs" className="scroll-mt-32">
        <Section variant="charcoal">
          <Container>
            <RitualsFaqSection />
          </Container>
        </Section>
      </section>

      {/* ── Section 4: Royal Consultation CTA ── */}
      <section className="bg-black/60 backdrop-blur-md text-ivory py-16 sm:py-20 text-center relative overflow-hidden border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-5">
          <div className="flex items-center justify-center gap-1.5 text-gold text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Begin Your Royal Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Ready to Plan Your Sacred Celebration?
          </h2>

          <p className="font-sans text-sm sm:text-base text-ivory/80 font-medium max-w-xl mx-auto leading-relaxed">
            Connect with our principal directors in Delhi NCR and Jaipur to schedule your private consultation, inspect palace dates, and receive a bespoke proposal.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              <span>Schedule Private Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <a
              href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Hello Wedding Flora team! I would like to schedule a consultation to discuss our wedding rituals and planning process."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 font-sans text-xs uppercase tracking-wider font-bold transition-all border border-emerald-500/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Concierge</span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
