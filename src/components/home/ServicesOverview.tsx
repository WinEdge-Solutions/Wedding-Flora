import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { servicesData } from "@/lib/content/services";
import { ArrowRight } from "lucide-react";

export const ServicesOverview: React.FC = () => {
  return (
    <Section variant="cream">
      <Container>
        <SectionHeading
          eyebrow="Our Expertise"
          title="Curated Wedding Services"
          subtitle="From concept design to flawless day-of orchestration, we offer comprehensive services tailored to your personal aesthetic."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="group bg-ivory border border-gold/15 rounded-[2px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(43,43,43,0.06)]"
            >
              <div className="relative h-60 w-full overflow-hidden bg-cream">
                <Image
                  src={service.imageUrl}
                  alt={`${service.title} by Wedding Flora`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-300" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-charcoal mb-2 font-normal group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-sans text-gold uppercase tracking-wider mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-warmgrey font-light line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gold/10">
                  <Link
                    href={`/services#${service.id}`}
                    className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal font-medium hover:text-gold transition-colors group/link"
                  >
                    <span>Discover More</span>
                    <ArrowRight size={14} className="ml-1.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button href="/services" variant="outline" size="md">
            View All Services & Details
          </Button>
        </div>
      </Container>
    </Section>
  );
};
