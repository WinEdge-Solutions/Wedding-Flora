import React, { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { siteConfig } from "@/lib/site";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export const metadata = {
  title: "Enquire & Contact | Wedding Flora • The Wedding Planner",
  description:
    "Schedule a personal consultation with Wedding Flora. Plan your royal Indian wedding across Udaipur, Jaipur, Jodhpur, and Delhi NCR.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Contact Hero ── */}
      <section className="relative py-14 sm:py-20 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-3.5">
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
              <span>Private Consultations &amp; Bespoke Proposals</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              Begin Planning Your Royal Celebration
            </h1>

            <Divider variant="ornamental" className="my-2 sm:my-2.5" />

            <p className="font-sans text-sm sm:text-base text-ivory/80 font-medium leading-relaxed max-w-xl mx-auto">
              We look forward to honoring your family&apos;s heritage. Share your envisioned dates and destinations below, or connect with our directors directly.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Contact Form + Direct Info Grid ── */}
      <Section variant="ivory">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="p-12 text-center text-ivory/80 font-medium">
                    Loading enquiry form...
                  </div>
                }
              >
                <EnquiryForm />
              </Suspense>
            </div>

            {/* Direct Contact Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Quick Trigger — Regal Brand Card */}
              <div className="p-6 sm:p-7 rounded-[3px] bg-[#090614]/85 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                      Fastest Response
                    </span>
                    <h4 className="font-serif text-xl font-bold text-ivory">
                      Instant WhatsApp Concierge
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-ivory/80 font-medium leading-relaxed">
                  Have an urgent date check for palace venues? Our planning directors answer directly on WhatsApp with itemized feasibility notes.
                </p>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({siteConfig.contact.phone})</span>
                </a>
              </div>

              {/* Contact Information Card */}
              <div className="p-6 sm:p-7 rounded-[3px] bg-[#090614]/70 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] space-y-5">
                <h4 className="font-serif text-2xl font-semibold text-ivory pb-2 border-b border-white/10">
                  Studios &amp; Direct Lines
                </h4>

                <div className="space-y-4 text-sm font-medium text-ivory/80">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                        Head Office &amp; Planning Studio (Jaipur)
                      </span>
                      <p className="text-ivory leading-relaxed text-xs sm:text-sm">
                        {siteConfig.contact.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                        Direct Phone Line
                      </span>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                        className="hover:text-gold transition-colors font-bold text-ivory text-xs sm:text-sm"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                        Official Enquiries
                      </span>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="hover:text-gold transition-colors font-bold text-ivory text-xs sm:text-sm"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <InstagramIcon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                        Official Instagram
                      </span>
                      <a
                        href={siteConfig.contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gold transition-colors font-bold text-ivory text-xs sm:text-sm"
                      >
                        @weddingflora_theweddingplanner
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold block">
                        Consultation Hours
                      </span>
                      <p className="text-xs sm:text-sm">
                        Monday – Sunday: 10:00 AM – 8:00 PM IST (By Appointment)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map Studio Card */}
              <div className="p-6 rounded-[3px] bg-[#090614]/75 backdrop-blur-xl border border-gold/30 shadow-lg space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                    <Navigation className="w-4 h-4 text-gold" />
                    <span>Jaipur Studio Location</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-[2px]">
                    Open for Appointments
                  </span>
                </div>

                {/* Embedded Interactive Map */}
                <div className="overflow-hidden rounded-[2px] border border-white/10 relative">
                  <iframe
                    title="Wedding Flora Office Map"
                    src="https://maps.google.com/maps?q=Wedding+Flora+D-52+Saket+Colony+Adarsh+Nagar+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="190"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-48 filter brightness-[0.88] contrast-[1.05]"
                  />
                </div>

                <div className="pt-1">
                  <a
                    href={siteConfig.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[2px] bg-white/[0.06] hover:bg-gold hover:text-midnight text-ivory text-xs uppercase tracking-wider font-extrabold transition-all border border-white/10 hover:border-gold"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Peace of mind badge */}
              <div className="p-5 rounded-[3px] bg-[#090614]/70 backdrop-blur-xl border border-white/10 flex items-center gap-3.5">
                <ShieldCheck className="w-7 h-7 text-gold shrink-0" />
                <p className="text-xs text-ivory/80 font-medium leading-relaxed">
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
