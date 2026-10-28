"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { siteConfig, NavItem } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Menu, X, ChevronDown } from "lucide-react";

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

function NavItemDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const isParentActive =
    pathname === item.href ||
    (item.children && item.children.some((child) => pathname === child.href));

  return (
    <div className="relative group/dropdown">
      <Link
        href={item.href}
        className={`relative uppercase tracking-[0.2em] text-xs transition-colors duration-200 inline-flex items-center gap-1.5 py-1 ${
          isParentActive
            ? "text-ivory font-bold"
            : "text-ivory/75 hover:text-ivory font-semibold"
        }`}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={11}
          className="text-gold/80 transition-transform duration-300 group-hover/dropdown:rotate-180"
        />
        {/* Animated gold underline for desktop */}
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-gold to-gold/30 transition-all duration-300 ${
            isParentActive ? "w-full" : "w-0 group-hover/dropdown:w-full"
          }`}
        />
      </Link>

      {/* Dropdown Menu Container with bridge padding to avoid hover loss */}
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3.5 opacity-0 invisible -translate-y-1 group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:translate-y-0 group-focus-within/dropdown:opacity-100 group-focus-within/dropdown:visible group-focus-within/dropdown:translate-y-0 transition-all duration-250 ease-out z-50 pointer-events-none group-hover/dropdown:pointer-events-auto group-focus-within/dropdown:pointer-events-auto">
        <div className="w-64 p-2 rounded-xl bg-[#090614]/95 backdrop-blur-2xl border border-gold/30 shadow-[0_18px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 flex flex-col space-y-1">
          {item.children?.map((subItem) => {
            const isSubActive = pathname === subItem.href;
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={`group/sub flex flex-col px-3.5 py-2.5 rounded-lg transition-all duration-200 text-left ${
                  isSubActive
                    ? "bg-white/[0.08] border-l-2 border-gold"
                    : "hover:bg-white/[0.05] hover:border-l-2 hover:border-gold/60 border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-serif text-sm tracking-wide transition-colors ${
                      isSubActive
                        ? "text-gold font-bold"
                        : "text-ivory group-hover/sub:text-gold font-medium"
                    }`}
                  >
                    {subItem.label}
                  </span>
                  <span className="text-[10px] text-gold/60 opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-200">
                    ✦
                  </span>
                </div>
                {subItem.description && (
                  <span className="text-[10px] tracking-wide text-ivory/60 font-sans mt-0.5 line-clamp-1">
                    {subItem.description}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mobileAboutOpen, setMobileAboutOpen] = useState(pathname.startsWith("/about"));

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
          {siteConfig.navItems.slice(0, 3).map((item) =>
            item.children ? (
              <NavItemDropdown key={item.label} item={item} pathname={pathname} />
            ) : (
              <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
            )
          )}
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
            <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold font-bold group-hover:text-gold transition-colors duration-300">
              The Wedding Planner
            </span>
          </div>
        </Link>

        {/* Right nav + CTA */}
        <div className="hidden md:flex items-center space-x-8">
          {siteConfig.navItems.slice(3, 5).map((item) =>
            item.children ? (
              <NavItemDropdown key={item.label} item={item} pathname={pathname} />
            ) : (
              <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
            )
          )}
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
              {siteConfig.navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className={`py-2.5 px-4 text-sm font-semibold rounded-md flex items-center justify-center gap-2 uppercase tracking-[0.2em] w-full transition-colors ${
                        pathname.startsWith(item.href)
                          ? "text-gold bg-white/[0.06]"
                          : "text-ivory/80 hover:text-white hover:bg-white/[0.04]"
                      }`}
                      aria-expanded={mobileAboutOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`text-gold transition-transform duration-300 ${
                          mobileAboutOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAboutOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden flex flex-col space-y-1 py-1"
                        >
                          {item.children.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={closeMobileMenu}
                                className={`py-2 px-6 rounded-md text-xs uppercase tracking-[0.16em] flex items-center justify-between transition-colors ${
                                  isSubActive
                                    ? "text-gold bg-white/[0.08] font-bold"
                                    : "text-ivory/70 hover:text-ivory hover:bg-white/[0.04] font-medium"
                                }`}
                              >
                                <span>{subItem.label}</span>
                                <span className="text-gold text-[10px]">✦</span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href}
                    onClick={closeMobileMenu}
                    isMobile
                  />
                )
              )}
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
