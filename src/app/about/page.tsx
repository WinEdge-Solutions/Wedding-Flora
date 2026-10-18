import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { InstagramShowcase } from "@/components/about/InstagramShowcase";
import { Sparkles, Crown, HeartHandshake } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export const metadata = {
  title: "About Us | Wedding Flora • The Wedding Planner",
  description:
    "Discover the story, royal heritage philosophy, and floral artistry behind Wedding Flora — luxury Indian wedding planners across Udaipur, Jaipur, Jodhpur, and Delhi NCR.",
};

export default function AboutPage() {
  return (
    <main className="bg-ivory text-charcoal">
      {/* ── About Hero ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-cream/50 border-b border-gold/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora-orb aurora-orb-a opacity-60" />
          <div className="aurora-orb aurora-orb-b opacity-40" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-center -mb-2">
              <div className="relative w-16 h-16 shrink-0 transition-transform hover:scale-105">
                <Image src="/images/logo-emblem.png" alt="Wedding Flora Crest" fill className="object-contain" priority />
              </div>
            </div>

            <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#8C6D2D] font-bold">
              The Wedding Planner • Born from Heritage &amp; Passion
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold sm:font-bold text-charcoal tracking-tight leading-tight">
              Curating Royal Heirlooms, <br className="hidden sm:block" />
              <span className="text-gold-gradient font-bold italic">Not Just Weddings</span>
            </h1>

            <Divider variant="ornamental" className="my-3" />

            <p className="font-sans text-base sm:text-lg text-charcoal/90 font-medium leading-relaxed max-w-2xl mx-auto">
              At Wedding Flora, we weave the opulent grandeur of royal Indian palaces with fragrant botanical artistry and flawless multi-day guest care. Every celebration is an immortal tapestry of love, tradition, and soul.
            </p>
          </div>
        </Container>
      </section>

      {/* ── The Philosophy & Story ── */}
      <Section variant="ivory">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-gold/30 shadow-[0_15px_45px_rgba(43,43,43,0.12)]">
                <Image
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
                  alt="Royal Palace Wedding Architecture by Wedding Flora"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                    Heritage Excellence
                  </span>
                  <p className="font-serif text-xl font-semibold leading-snug">
                    Over a decade of orchestrating regal destination celebrations in Rajasthan &amp; India.
                  </p>
                </div>
              </div>
              {/* Floating emblem stamp */}
              <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center justify-center w-24 h-24 rounded-full bg-cream border-2 border-gold shadow-xl p-2">
                <div className="relative w-full h-full">
                  <Image src="/images/logo-emblem.png" alt="Stamp" fill className="object-contain" />
                </div>
              </div>
            </div>

            {/* Story narrative */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C6D2D] font-bold">
                Our Genesis &amp; Devotion
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal tracking-tight leading-tight">
                Where Sacred Tradition Meets Haute Couture Scenography
              </h2>

              <p className="font-sans text-charcoal/90 text-base sm:text-lg font-medium leading-relaxed">
                Founded with a deep reverence for India&apos;s royal heritage and architectural magnificence, Wedding Flora emerged as the premier choice for couples who value authentic tradition elevated with contemporary high design.
              </p>

              <p className="font-sans text-charcoal/90 text-base sm:text-lg font-medium leading-relaxed">
                From procuring centuries-old lakeside palaces in Udaipur and sandstone fortresses in Jodhpur to sourcing farm-fresh tuberoses, Marigold, and Dutch hydrangeas at dawn, our master floral sculptors and event producers treat every ceremony as sacred.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gold/20">
                <div>
                  <h4 className="font-serif text-3xl font-bold text-charcoal">10+</h4>
                  <p className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold mt-1">Years of Royal Mastery</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl font-bold text-charcoal">350+</h4>
                  <p className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold mt-1">Regal Celebrations</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl font-bold text-charcoal">100%</h4>
                  <p className="text-xs uppercase tracking-wider text-[#8C6D2D] font-bold mt-1">Bespoke Dedication</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── 3 Pillars of Excellence ── */}
      <Section variant="cream">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The Wedding Flora Promise"
            title="The Pillars of Royal Wedding Craft"
            subtitle="Every celebration we undertake is anchored in three non-negotiable standards of luxury and devotion."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-8 rounded-2xl bg-ivory border border-gold/20 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-charcoal">
                <Crown className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal">Palace Scenography</h3>
              <p className="font-sans text-sm text-charcoal/90 font-medium leading-relaxed">
                We transform historical fortresses and 5-star properties into living dreamscapes with custom 3D mandap architecture, intelligent concert lighting, and sacred sacred fire staging.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-ivory border border-gold/20 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-charcoal">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal">Bespoke Floral Architecture</h3>
              <p className="font-sans text-sm text-charcoal/90 font-medium leading-relaxed">
                Thousands of scented Mogra, fragrant Rajnigandha, yellow Marigold, and exotic European imports sculpted into cascading mandaps, chandeliers, and floral rangolis.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-ivory border border-gold/20 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-charcoal">
                <HeartHandshake className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal">Atithi Devo Bhava</h3>
              <p className="font-sans text-sm text-charcoal/90 font-medium leading-relaxed">
                Every traveling guest is welcomed like family. From airport welcome desks and luxury convoys to safa-tying bars, we ensure effortless comfort across every hour.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Official Instagram Showcase Section ── */}
      <Section variant="ivory" className="relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-600/10 border border-gold/30">
              <InstagramIcon className="w-4 h-4 text-rose-600" />
              <span className="text-xs uppercase tracking-widest font-bold text-charcoal">
                Explore Our Live Instagram Profile
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-charcoal">
              @weddingflora_theweddingplanner
            </h2>

            <p className="font-sans text-sm sm:text-base text-charcoal/90 font-medium">
              Dive into our daily reels, behind-the-scenes palace builds, sacred mandap setups, and real Indian wedding stories directly from our official Instagram feed.
            </p>
          </div>

          {/* The Live Interactive Instagram Profile Mockup & Feed */}
          <InstagramShowcase />
        </Container>
      </Section>

      {/* ── Bottom CTA ── */}
      <section className="bg-charcoal text-ivory py-16 sm:py-20 text-center relative overflow-hidden grain-overlay">
        <Container size="narrow" className="relative z-10 space-y-6">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
            Start Your Journey
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-ivory">
            Ready to Plan Your Royal Indian Wedding?
          </h2>

          <p className="font-sans text-base sm:text-lg text-ivory font-medium max-w-xl mx-auto leading-relaxed">
            Connect directly with our master planning team in Delhi NCR or Jaipur to discuss venues, floral scenography, and customized packages.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" variant="outline" className="border-gold text-ivory hover:bg-gold/20" size="lg">
              Enquire For Your Date
            </Button>
            <Button href="/services" variant="text" className="text-ivory font-semibold hover:text-gold" size="lg">
              Explore Our Services &amp; Packages
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
