"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-b border-gold/15 py-3"
          : "bg-ivory/90 backdrop-blur-sm border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Left Navigation (Desktop) */}
        <nav
          className="hidden md:flex items-center space-x-8"
          aria-label="Main Navigation"
        >
          {siteConfig.navItems.slice(0, 3).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                  isActive
                    ? "text-charcoal font-medium border-b border-gold pb-0.5"
                    : "text-warmgrey hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Brand / Logo (Centered) */}
        <Link
          href="/"
          className="flex flex-col items-center group text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <span className="font-serif text-2xl sm:text-3xl tracking-wide text-charcoal group-hover:text-gold/90 transition-colors duration-300">
            Wedding Flora
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-warmgrey font-light">
            Luxury Planning
          </span>
        </Link>

        {/* Right Navigation & Enquire Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {siteConfig.navItems.slice(3, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
                  isActive
                    ? "text-charcoal font-medium border-b border-gold pb-0.5"
                    : "text-warmgrey hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/contact" size="sm" variant="primary">
            Enquire
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charcoal hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ivory border-b border-gold/20 px-6 pt-4 pb-8 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4 text-center">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`text-sm uppercase tracking-[0.2em] py-2 transition-colors ${
                    isActive
                      ? "text-charcoal font-medium border-b border-gold/40 inline-block mx-auto"
                      : "text-warmgrey hover:text-charcoal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4">
              <Button
                href="/contact"
                variant="primary"
                fullWidth
                size="md"
                onClick={closeMobileMenu}
              >
                Enquire Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
