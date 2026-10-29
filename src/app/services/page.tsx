import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/content/services";
import { packagesData } from "@/lib/content/packages";
import { Check, Sparkles, ArrowRight, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Wedding Planning & Event Management Services | Wedding Flora",
  description:
    "Comprehensive luxury wedding planning and event management: Destination Wedding Planning, Destination Management, Space Management & Scenography, Experiential Events, Hotel Bookings, Social Gatherings, and Bespoke Retreats.",
};

const processSteps = [
  {
    step: "01",
    title: "Discovery & Heritage Alignment",
    desc: "We begin with a deep exploration of your family traditions, preferred palace destinations, auspicious dates, and personal celebration vision.",
  },
  {
    step: "02",
    title: "Venue & Master Budgeting",
    desc: "Direct procurement of iconic palace fortresses or luxury sanctuaries across Udaipur, Jaipur, Jodhpur, or Goa with transparent commercial contracts.",
  },
  {
    step: "03",
    title: "3D Floral Scenography & Design",
    desc: "Our architects render 3D mandap visualisations, lighting schematics, and table layouts with custom colour palettes and seasonal flower curation.",
  },
  {
    step: "04",
    title: "Celebrity & Production Liaison",
    desc: "Contracting concert-grade sound, SFX, celebrity emcees, choreographers, and master chefs to orchestrate an unforgettable celebration.",
  },
  {
    step: "05",
    title: "Royal Day-Of Execution",
    desc: "Our dedicated shadow team coordinates every minute — from airport welcome desks and safa tying to sacred pheras and starlit fireworks.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Services Hero ── */}
      <section className="relative py-14 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#D4AF37] font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span>✦</span>
              <span>Wedding Planning &amp; Event Management Services</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              Orchestrating Grandeur, Flawless Logistics &amp; Sacred Artistry
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-sm sm:text-lg text-ivory/80 font-medium leading-relaxed max-w-2xl mx-auto">
              Our full-service wedding management supports you every step of the way — providing bespoke planning, architectural scenography, experiential entertainment, luxury hotel bookings, and seamless on-ground coordination across Rajasthan and global destinations.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Services Quick Jump Bar ── */}
      <nav
        aria-label="Services Navigation"
        className="sticky top-[64px] z-30 bg-[#090614]/90 backdrop-blur-xl border-b border-gold/20 py-2.5 overflow-x-auto no-scrollbar shadow-lg"
      >
        <Container>
          <div className="flex items-center justify-start lg:justify-center gap-2 min-w-max px-2">
            <span className="text-[10px] uppercase tracking-widest text-gold/80 font-bold mr-1 hidden sm:inline-flex items-center gap-1">
              <span>✦</span> Quick Jump:
            </span>
            {servicesData.map((s, idx) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1 rounded-[2px] text-xs font-semibold text-ivory/80 bg-white/[0.04] border border-white/10 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 whitespace-nowrap"
              >
                0{idx + 1}. {s.title}
              </a>
            ))}
            <a
              href="#packages"
              className="px-3 py-1 rounded-[2px] text-xs font-bold text-black bg-gradient-to-r from-gold via-amber-400 to-gold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm"
            >
              Packages &amp; Pricing
            </a>
          </div>
        </Container>
      </nav>

      {/* ── Detailed Services Breakdown ── */}
      <Section variant="ivory">
        <Container>
          <div className="space-y-20 lg:space-y-28">
            {servicesData.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center scroll-mt-32 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090614]/80 via-transparent to-transparent" />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-6 space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                      Service 0{index + 1}
                    </span>

                    <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ivory tracking-tight leading-tight">
                      {service.title}
                    </h2>

                    <p className="text-sm font-sans font-bold text-gold uppercase tracking-wider">
                      {service.tagline}
                    </p>

                    <p className="text-sm sm:text-base text-ivory/80 font-medium leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <p className="text-xs uppercase tracking-wider text-ivory font-bold">
                        Signature Inclusions:
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ivory/80 font-medium">
                            <span className="mt-0.5 p-0.5 rounded-[2px] bg-gold/20 text-[#D4AF37] shrink-0">
                              <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3">
                      <Button href={`/contact?service=${service.id}`} variant="outline" size="sm">
                        Enquire For This Service
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── PACKAGES SECTION ON SERVICES PAGE (Prices in ₹ XXXX) ── */}
      <Section variant="cream" className="border-t border-b border-gold/20" id="packages">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Curated Wedding Packages"
            title="Royal Indian Wedding Packages"
            subtitle="Explore our thoughtfully composed packages tailored to royal palace celebrations. Pricing customized to your guest count, venue, and vision."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-[3px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  pkg.recommended
                    ? "bg-[#090614]/80 backdrop-blur-xl border-2 border-gold shadow-[0_20px_50px_rgba(212,175,55,0.2)] md:-translate-y-2"
                    : "bg-[#090614]/60 backdrop-blur-xl border border-white/10 hover:border-gold/60 hover:shadow-xl"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-[2px] bg-gradient-to-r from-gold via-amber-600 to-gold text-black text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-3 h-3" />
                    <span>Signature Package</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-1">
                      {pkg.eyebrow}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ivory leading-snug">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Price display with ₹ XXXX as requested */}
                  <div className="py-2.5 px-3 rounded-[2px] bg-white/[0.04] border border-white/10">
                    <span className="text-xs uppercase tracking-wider text-ivory/60 block font-semibold">
                      Investment Guide
                    </span>
                    <span className="font-serif text-2xl font-bold text-gold">
                      {pkg.priceNote}
                    </span>
                    <span className="text-[10px] text-ivory/60 block font-medium">
                      Customized based on venue &amp; scale
                    </span>
                  </div>

                  <p className="text-xs text-ivory/80 font-medium leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-ivory font-bold block">
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-ivory/80 font-medium">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <Button
                    href={`/contact?package=${pkg.id}`}
                    variant={pkg.recommended ? "primary" : "outline"}
                    fullWidth
                    size="sm"
                  >
                    Request Proposal
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-ivory/80 font-medium mb-3">
              Need a completely bespoke multi-city or palace celebration package?
            </p>
            <Link
              href="/packages"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold font-bold hover:text-white transition-colors"
            >
              <span>Explore Detailed Packages Page &amp; FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ── 5-Step Process Roadmap ── */}
      <Section variant="ivory">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The Journey Together"
            title="How We Orchestrate Royal Weddings"
            subtitle="A transparent, stress-free five-step methodology ensuring every moment unfolds in sublime grandeur."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-6">
            {processSteps.map((s, idx) => (
              <div key={idx} className="relative p-6 rounded-[3px] bg-[#090614]/70 backdrop-blur-xl border border-white/10 flex flex-col justify-between hover:border-gold/50 transition-all duration-300">
                <div>
                  <span className="font-serif text-3xl font-bold text-gold/80 block mb-2">
                    {s.step}
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-ivory mb-2">
                    {s.title}
                  </h4>
                  <p className="font-sans text-xs text-ivory/80 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Consultation CTA ── */}
      <section className="bg-black/50 backdrop-blur-md text-ivory py-16 text-center relative overflow-hidden grain-overlay border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-5">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Personalized Consultation
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Let Us Structure Your Royal Wedding Package
          </h2>

          <p className="font-sans text-base text-ivory/80 font-medium max-w-xl mx-auto leading-relaxed">
            Every family and love story is unique. Schedule a private consultation with our principal wedding designers to get an itemized quote for your desired destination and dates.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Schedule Consultation
            </Button>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-ivory hover:text-gold transition-colors py-3 px-6"
            >
              <PhoneCall className="w-4 h-4 text-gold" />
              <span>Call Us: {siteConfig.contact.phone}</span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
