import React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { packagesData } from "@/lib/content/packages";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Royal Wedding Packages | Wedding Flora",
  description:
    "Discover curated royal wedding packages, bespoke floral mandap scenography, and luxury destination planning across India. Custom tailored pricing upon enquiry.",
};

const bespokeAddons = [
  {
    title: "Vintage Baraat Procession",
    desc: "1930s vintage Rolls Royce or open convertible flanked by royal Marwari horses, brass bands, and rose petal cannons.",
  },
  {
    title: "Celebrity Artist & Sufi Troupe",
    desc: "Liaison and stage rider management for renowned Bollywood singers, Sufi ensembles, or top destination DJs.",
  },
  {
    title: "Eco-Friendly Cold Pyro & Fireworks",
    desc: "Synchronized Varmala fireworks, low-smoke cold pyro falls, and midnight sky illumination over palace lakes.",
  },
  {
    title: "Heritage Safa & Turban Lounge",
    desc: "Master Rajasthani craftsmen tying hand-dyed Leheriya, Bandhej, or Chanderi silk turbans for 500+ Baraatis.",
  },
  {
    title: "Bespoke Royal Welcome Hampers",
    desc: "Hand-engraved brass boxes with artisanal Indian sweets, scented candles, itinerary scrolls, and personal notes.",
  },
  {
    title: "Dedicated Guest Concierge Fleet",
    desc: "Fleet of Mercedes, BMWs, and luxury coaches with uniformed chauffeurs and airport terminal meet-and-greets.",
  },
];

const faqs = [
  {
    q: "How are the package investments structured?",
    a: "Every palace and destination wedding in India has distinct logistical scales, venue policies, and guest sizes. We list our packages as starting at ₹ XXXX and provide an itemized, transparent quotation tailored specifically to your chosen dates, guest count, and decor ambition after our initial consultation.",
  },
  {
    q: "How far in advance should we reserve Wedding Flora for our dates?",
    a: "Because we curate a strictly limited number of luxury destination weddings each season to ensure principal designer involvement, most families book 6 to 12 months in advance, especially for the prime October to March wedding season in Rajasthan.",
  },
  {
    q: "Do you manage both wedding planning and floral/decor production?",
    a: "Yes. Wedding Flora is unique because we are both full-scale wedding producers and master floral architects. This eliminates third-party miscommunication, ensuring seamless harmony between your 3D decor designs, lighting, sound, and on-ground timelines.",
  },
  {
    q: "Which destinations across India do you specialize in?",
    a: "Our core hubs are Udaipur, Jaipur, Jodhpur, and Delhi NCR, alongside luxury coastal properties in Goa, heritage venues in Hyderabad, and bespoke international destination sanctuaries.",
  },
];

export default function PackagesPage() {
  return (
    <main className="min-h-screen text-ivory relative z-10">
      {/* ── Packages Hero ── */}
      <section className="relative py-14 sm:py-24 overflow-hidden bg-white/[0.02] backdrop-blur-[2px] border-b border-gold/20">
        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <p className="font-sans text-[9px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.32em] text-[#D4AF37] font-bold flex items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span>✦</span>
              <span>Bespoke Investment &amp; Curation Suites</span>
              <span>✦</span>
            </p>

            <h1 className="font-display text-2xl sm:text-5xl lg:text-6xl font-bold text-ivory tracking-[0.03em] leading-[1.18]">
              Royal Wedding Packages
            </h1>

            <Divider variant="ornamental" className="my-2.5 sm:my-3" />

            <p className="font-sans text-sm sm:text-lg text-ivory/80 font-medium leading-relaxed max-w-2xl mx-auto">
              Transparent, meticulously composed packages designed to give your family complete clarity and peace of mind. Every tier is tailored to scale with the grandeur of your chosen venue.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Package Tiers Grid ── */}
      <Section variant="ivory">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {packagesData.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  pkg.recommended
                    ? "bg-[#090614]/80 backdrop-blur-xl border-2 border-gold shadow-[0_20px_50px_rgba(212,175,55,0.25)] md:-translate-y-3"
                    : "bg-[#090614]/60 backdrop-blur-xl border border-white/10 hover:border-gold/60 hover:shadow-2xl"
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold via-amber-600 to-gold text-black text-[11px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Signature Experience</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#D4AF37] font-bold block mb-1">
                      {pkg.eyebrow}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-ivory leading-snug">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Pricing Badge with ₹ XXXX */}
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 shadow-sm">
                    <span className="text-xs uppercase tracking-wider text-ivory/60 block font-semibold">
                      Package Investment
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-serif text-3xl font-bold text-gold">
                        {pkg.priceNote}
                      </span>
                    </div>
                    <span className="text-[11px] text-ivory/60 block font-medium mt-1">
                      Customized to guest count &amp; venue scope
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-ivory/80 font-medium leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-2.5">
                    <span className="text-xs uppercase tracking-wider text-ivory font-bold block">
                      Included In Curation:
                    </span>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-ivory/80 font-medium">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10">
                  <Button
                    href={`/contact?package=${pkg.id}`}
                    variant={pkg.recommended ? "primary" : "outline"}
                    fullWidth
                    size="md"
                    className="font-bold text-xs"
                  >
                    Select &amp; Request Quote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Bespoke Add-Ons ── */}
      <Section variant="cream" className="border-t border-b border-gold/20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Custom Enhancements"
            title="Bespoke A-la-Carte Additions"
            subtitle="Elevate your chosen package with our specialized royal additions, artisanal counters, and entertainment productions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {bespokeAddons.map((addon, aIdx) => (
              <div key={aIdx} className="p-6 rounded-2xl bg-[#090614]/70 backdrop-blur-xl border border-white/10 hover:border-gold/50 shadow-md space-y-2.5 transition-all duration-300">
                <div className="flex items-center gap-2 text-gold">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">Add-on 0{aIdx + 1}</span>
                </div>
                <h4 className="font-serif text-xl font-semibold text-ivory">
                  {addon.title}
                </h4>
                <p className="text-xs text-ivory/80 font-medium leading-relaxed">
                  {addon.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Frequently Asked Questions ── */}
      <Section variant="ivory">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Common Inquiries"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about planning your royal Indian wedding with Wedding Flora."
          />

          <div className="space-y-6 pt-4">
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="p-6 rounded-2xl bg-[#090614]/70 backdrop-blur-xl border border-white/10 hover:border-gold/40 space-y-2 transition-all duration-300">
                <h4 className="font-serif text-lg sm:text-xl font-semibold text-ivory flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-ivory/80 font-medium leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Direct Contact CTA ── */}
      <section className="bg-black/50 backdrop-blur-md text-ivory py-16 text-center relative overflow-hidden grain-overlay border-t border-gold/20">
        <Container size="narrow" className="relative z-10 space-y-5">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Tailored Quotations
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Need a Customized Wedding Flora Package?
          </h2>

          <p className="font-sans text-base text-ivory/80 font-medium max-w-xl mx-auto leading-relaxed">
            Share your preferred dates, guest count, and dream destinations. Our directors will prepare an itemized master proposal for your family.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Submit Enquiry Now
            </Button>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] border border-gold text-ivory hover:bg-gold/20 font-sans text-xs uppercase tracking-wider font-bold transition-all"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
