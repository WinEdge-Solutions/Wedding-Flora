"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

function NavLink({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-xs uppercase tracking-[0.2em] transition-colors duration-200 group/nav ${
        isActive ? "text-charcoal font-bold" : "text-charcoal/85 hover:text-charcoal font-semibold"
      }`}
    >
      {label}
      {/* Animated gold underline */}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-gold to-gold/30 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover/nav:w-full"
        }`}
      />
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
        background: "rgba(250,247,242,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(183,154,91,0.15)",
        boxShadow: "0 2px 20px rgba(43,43,43,0.04), 0 1px 0 rgba(183,154,91,0.08)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 flex items-center justify-between py-3">

        {/* Left nav */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
          {siteConfig.navItems.slice(0, 3).map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
          ))}
        </nav>

        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col items-center group text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-charcoal group-hover:text-gold-gradient transition-colors duration-300">
            Wedding Flora
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6D2D] font-bold group-hover:text-gold transition-colors duration-300">
            Royal Indian Weddings
          </span>
          {/* Subtle shimmer under logo on hover */}
          <span className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-all duration-500 mt-0.5" />
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
            className="p-2 text-charcoal hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
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
            style={{ background: "rgba(250,247,242,0.97)", backdropFilter: "blur(20px)" }}
          >
            <nav className="flex flex-col space-y-4 text-center px-6 pt-4 pb-8">
              {siteConfig.navItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} onClick={closeMobileMenu} />
              ))}
              <div className="pt-4">
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
