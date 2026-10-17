import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { Container } from "./Container";
import { Divider } from "@/components/ui/Divider";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream text-charcoal border-t border-gold/20 pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12">
          {/* Brand & Monogram Column */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 shrink-0 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Wedding Flora Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-charcoal block group-hover:text-gold-gradient transition-colors">
                  Wedding Flora
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D2D] font-bold">
                  The Wedding Planner • Royal Celebrations
                </span>
              </div>
            </Link>
            <p className="text-charcoal/90 text-sm font-medium max-w-sm leading-relaxed">
              Curating regal palace weddings, bespoke Sangeet productions, and sacred Mandap ceremonies across Udaipur, Jaipur, Jodhpur, and destination sanctuaries in India.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={siteConfig.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[2px] border border-gold/40 flex items-center justify-center text-charcoal hover:text-gold hover:border-gold transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="w-9 h-9 rounded-[2px] border border-gold/40 flex items-center justify-center text-charcoal hover:text-gold hover:border-gold transition-colors duration-200"
                aria-label="Email Us"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg text-charcoal mb-4 font-semibold tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-charcoal/90">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg text-charcoal mb-4 font-semibold tracking-wide">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm font-medium text-charcoal/90">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-gold mt-1 shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gold shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-charcoal transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gold shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-charcoal transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <Divider variant="gold" className="my-6 opacity-30" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/85 font-medium pt-2 gap-4">
          <p>© {currentYear} Wedding Flora. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[10px] font-bold text-charcoal/70">
            Designed with timeless grace
          </p>
        </div>
      </Container>
    </footer>
  );
};
