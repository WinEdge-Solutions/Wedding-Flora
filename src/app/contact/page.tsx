import React, { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { siteConfig } from "@/lib/site";
import { MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export const metadata = {
  title: "Enquire & Contact | Wedding Flora • The Wedding Planner",
  description:
    "Schedule a personal consultation with Wedding Flora. Plan your royal Indian wedding across Udaipur, Jaipur, Jodhpur, and Delhi NCR.",
};

export default function ContactPage() {
  return (
    <main className="bg-ivory text-charcoal">
      {/* ── Contact Hero ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-cream/50 border-b border-gold/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora-orb aurora-orb-a opacity-60" />
          <div className="aurora-orb aurora-orb-b opacity-40" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-3.5">
            <div className="flex justify-center -mb-2">
              <div className="relative w-14 h-14 shrink-0 transition-transform hover:scale-105">
                <Image src="/images/logo-emblem.png" alt="Wedding Flora Crest" fill className="object-contain" priority />
              </div>
            </div>

            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#8C6D2D] font-bold">
              Private Consultations &amp; Bespoke Proposals
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold sm:font-bold text-charcoal tracking-tight leading-tight">
              Begin Planning Your Royal Celebration
            </h1>

            <Divider variant="ornamental" className="my-2.5" />

            <p className="font-sans text-base text-charcoal/90 font-medium leading-relaxed max-w-xl mx-auto">
              We look forward to honoring your family&apos;s heritage. Share your envisioned dates and destinations below, or connect with our directors directly.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Contact Form + Direct Info Grid ── */}
      <Section variant="ivory">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-12 text-center text-charcoal font-medium">Loading enquiry form...</div>}>
                <EnquiryForm />
              </Suspense>
            </div>

            {/* Direct Contact Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Quick Trigger */}
              <div className="p-7 rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-950 text-white shadow-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-700/80 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold block">
                      Fastest Response
                    </span>
                    <h4 className="font-serif text-xl font-bold">Instant WhatsApp Desk</h4>
                  </div>
                </div>
                <p className="text-xs text-white/90 font-medium leading-relaxed">
                  Have an urgent date check for palace venues? Our planning directors answer directly on WhatsApp.
                </p>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] bg-white text-emerald-900 font-sans text-xs uppercase tracking-wider font-bold hover:bg-emerald-50 transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-800" />
                  <span>Chat on WhatsApp (+91 98101 23456)</span>
                </a>
              </div>

              {/* Contact Information Cards */}
              <div className="p-7 rounded-2xl bg-cream/40 border border-gold/30 space-y-6">
                <h4 className="font-serif text-2xl font-semibold text-charcoal pb-2 border-b border-gold/20">
                  Studios &amp; Direct Lines
                </h4>

                <div className="space-y-4 text-sm font-medium text-charcoal/90">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold block">
                        Studios in Delhi NCR &amp; Rajasthan
                      </span>
                      <p>{siteConfig.contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold block">
                        Direct Phone Line
                      </span>
                      <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-gold transition-colors font-bold">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold block">
                        Official Enquiries
                      </span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold transition-colors font-bold">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <InstagramIcon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold block">
                        Official Instagram
                      </span>
                      <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-bold">
                        @weddingflora_theweddingplanner
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold block">
                        Consultation Hours
                      </span>
                      <p>Monday – Sunday: 10:00 AM – 8:00 PM IST (By Appointment)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Peace of mind badge */}
              <div className="p-5 rounded-2xl bg-ivory border border-gold/20 flex items-center gap-3.5">
                <ShieldCheck className="w-7 h-7 text-gold shrink-0" />
                <p className="text-xs text-charcoal/80 font-medium leading-relaxed">
                  Strictly confidential consultations. We regularly sign NDAs for high-profile and celebrity family celebrations.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
