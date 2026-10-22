"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

function NavLink({
  href,
  label,
  isActive,
  onClick,
  isMobile = false,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative uppercase tracking-[0.2em] transition-colors duration-200 group/nav ${
        isMobile
          ? "py-2.5 px-4 text-sm font-semibold rounded-md flex items-center justify-center " +
            (isActive ? "text-gold bg-white/[0.06] font-bold" : "text-ivory/80 hover:text-white hover:bg-white/[0.04]")
          : "text-xs " + (isActive ? "text-ivory font-bold" : "text-ivory/75 hover:text-ivory font-semibold")
      }`}
    >
      {label}
      {/* Animated gold underline for desktop */}
      {!isMobile && (
        <span
          className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-gold to-gold/30 transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover/nav:w-full"
          }`}
        />
      )}
    </Link>
  );
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: "rgba(3, 3, 8, 0.78)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.18)",
        boxShadow: "0 10px 35px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between py-2.5 sm:py-3">

        {/* Left nav */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {siteConfig.navItems.slice(0, 3).map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
          ))}
        </nav>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <div className="relative w-8 h-8 sm:w-11 sm:h-11 shrink-0 transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/images/logo-emblem.png"
              alt="Wedding Flora Crest"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-lg sm:text-2xl font-semibold tracking-wide text-ivory group-hover:text-gold-gradient transition-colors duration-300 leading-tight">
              Wedding Flora
            </span>
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-[#D4AF37] font-bold group-hover:text-gold transition-colors duration-300">
              The Wedding Planner
            </span>
          </div>
        </Link>

        {/* Right nav + CTA */}
        <div className="hidden md:flex items-center space-x-8">
          {siteConfig.navItems.slice(3, 5).map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
          ))}
          <Button href="/contact" size="sm" variant="primary">
            Enquire
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-gold/20"
            style={{ background: "rgba(5, 4, 12, 0.98)", backdropFilter: "blur(25px)" }}
          >
            <nav className="flex flex-col space-y-2 text-center px-4 pt-4 pb-6">
              <div className="flex items-center justify-center gap-2 pb-3 mb-2 border-b border-gold/15">
                <div className="relative w-7 h-7 shrink-0">
                  <Image src="/images/logo-emblem.png" alt="Wedding Flora Emblem" fill className="object-contain" />
                </div>
                <div className="text-left">
                  <span className="font-serif text-base font-semibold text-ivory block leading-none">Wedding Flora</span>
                  <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">The Wedding Planner</span>
                </div>
              </div>
              {siteConfig.navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                  onClick={closeMobileMenu}
                  isMobile
                />
              ))}
              <div className="pt-3">
                <Button href="/contact" variant="primary" fullWidth size="md" onClick={closeMobileMenu}>
                  Enquire Now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
