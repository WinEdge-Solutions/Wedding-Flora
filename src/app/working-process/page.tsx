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
  title: "Our Working Process & Royal Wedding Planning | Wedding Flora",
  description:
    "Explore Wedding Flora's proven 7-step royal working process and the sacred Indian wedding ceremonies we curate — from discovery and palace procurement to 3D floral scenography and royal day-of showtime.",
};

export default function WorkingProcessPage() {
  return (
    <main className="min-h-screen text-[#1A1209] relative z-10">
      {/* ── Working Process Hero ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-[#FAF7F2]/60 border-b border-gold/15">
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

            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold flex items-center justify-center gap-2 px-2">
              <span className="opacity-60">—</span>
              <span>Proven Methodology &amp; Royal Curation</span>
              <span className="opacity-60">—</span>
            </p>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1209] tracking-[0.03em] leading-[1.18]">
              Our Working Process
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-sm sm:text-base text-[#5C5147] font-normal leading-[1.75] max-w-2xl mx-auto">
              Inspired by centuries of aristocratic heritage, we deliver seamless palace wedding productions through our signature 7-step working process and reverent ceremonial curation.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Quick Jump Bar ── */}
      <nav
        aria-label="Working Process Quick Jump"
        className="sticky top-[58px] z-30 bg-[#FDFAF5]/95 backdrop-blur-xl border-b border-gold/15 py-2.5 overflow-x-auto no-scrollbar shadow-sm"
      >
        <Container>
          <div className="flex items-center justify-start sm:justify-center gap-3 min-w-max px-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mr-1 hidden sm:inline-flex items-center gap-1">
              <span>✦</span> EXPLORE:
            </span>
            <a
              href="#working-process"
              className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-[#1A1209] bg-[#FAF7F2] border border-gold/20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
            >
              The 7-Step Working Process
            </a>
            <a
              href="#sacred-ceremonies"
              className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-[#1A1209] bg-[#FAF7F2] border border-gold/20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
            >
              Sacred Ceremonies We Curate
            </a>
            <a
              href="#faqs"
              className="px-4 py-1.5 rounded-[2px] text-xs font-semibold text-[#1A1209] bg-[#FAF7F2] border border-gold/20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
            >
              Process &amp; Timing FAQ
            </a>
          </div>
        </Container>
      </nav>

      {/* ── Section 1: The 7-Step Royal Planning Blueprint ── */}
      <section id="working-process" className="scroll-mt-32">
        <Section variant="ivory">
          <Container>
            <PlanningProcessSection />
          </Container>
        </Section>
      </section>

      {/* ── Section 2: Sacred Indian Wedding Ceremonies ── */}
      <section id="sacred-ceremonies" className="scroll-mt-32">
        <Section variant="cream">
          <Container>
            <SacredCeremoniesSection />
          </Container>
        </Section>
      </section>

      {/* ── Section 3: Process & Timelines FAQ ── */}
      <section id="faqs" className="scroll-mt-32">
        <Section variant="ivory">
          <Container>
            <RitualsFaqSection />
          </Container>
        </Section>
      </section>

      {/* ── Section 4: Royal Consultation CTA ── */}
      <section className="bg-[#F7F3EC] text-[#1A1209] py-16 sm:py-20 text-center relative overflow-hidden border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-5">
          <div className="flex items-center justify-center gap-2 text-gold text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Begin Your Royal Journey</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1A1209]">
            Ready to Begin Your Working Process with Wedding Flora?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#5C5147] font-normal max-w-xl mx-auto leading-[1.75]">
            Connect with our principal directors in Jaipur to schedule your private consultation, inspect palace dates, and receive a bespoke proposal tailored to your vision.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              <span>Schedule Private Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <a
              href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
                "Hello Wedding Flora team! I would like to schedule a consultation to discuss your working process and wedding planning services."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 font-sans text-xs uppercase tracking-wider font-semibold transition-all border border-emerald-500/30"
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

