"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/site";
import { useCms } from "@/components/cms/CmsProvider";
import {
  Menu,
  X,
  ChevronDown,
  Camera,
  Video,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Safely compute initial scroll state to avoid a layout flash on load. */
function getInitialScrolled(): boolean {
  if (typeof window !== "undefined") {
    return (window.scrollY || document.documentElement.scrollTop || 0) > 15;
  }
  return false;
}

/** Derive the open accordion key from a pathname so it stays in sync after
 *  client-side navigation. */
function deriveOpenDropdown(
  pathname: string,
  navItems: NavItem[]
): string | null {
  for (const item of navItems) {
    if (!item.children && !item.groups) continue;
    if (
      pathname.startsWith(item.href) ||
      item.children?.some(
        (c) =>
          pathname === c.href ||
          pathname.startsWith(`${c.href}/`) ||
          (c.href.includes("?") && pathname === c.href.split("?")[0])
      ) ||
      item.groups?.some((g) =>
        g.items.some(
          (c) =>
            pathname === c.href || pathname.startsWith(`${c.href}/`)
        )
      )
    ) {
      return item.label;
    }
  }
  return null;
}

// ─── NavLink ─────────────────────────────────────────────────────────────────

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
      className={`relative uppercase transition-colors duration-200 group/nav whitespace-nowrap ${
        isMobile
          ? "w-full py-3 px-4 text-xs font-semibold tracking-[0.18em] rounded-[2px] flex items-center justify-between " +
            (isActive
              ? "text-gold bg-gold/[0.06] font-bold"
              : "text-[#1A1209] hover:text-gold hover:bg-gold/[0.06] font-bold")
          : "inline-flex items-center justify-center h-7 leading-none tracking-[0.08em] xl:tracking-[0.12em] 2xl:tracking-[0.15em] text-[10.5px] xl:text-[11px] 2xl:text-xs " +
            (isActive ? "text-gold font-semibold" : "text-[#1A1209] hover:text-[#D4AF37] font-semibold")
      }`}
    >
      <span className="leading-none">{label}</span>
      {/* Center-expanding gold gradient underline — desktop only */}
      {!isMobile && (
        <span
          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 pointer-events-none ${
            isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100"
          }`}
        />
      )}
    </Link>
  );
}

// ─── NavItemDropdown ──────────────────────────────────────────────────────────

function NavItemDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isParentActive =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    (item.children &&
      item.children.some(
        (child) =>
          pathname === child.href ||
          pathname.startsWith(`${child.href}/`) ||
          (child.href.includes("?") && pathname === child.href.split("?")[0])
      )) ||
    (item.groups &&
      item.groups.some((g) =>
        g.items.some(
          (child) =>
            pathname === child.href ||
            pathname.startsWith(`${child.href}/`) ||
            (child.href.includes("?") && pathname === child.href.split("?")[0])
        )
      ));

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    },
    []
  );

  /** Close if focus leaves the entire dropdown container. */
  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      scheduleClose();
    }
  }, [scheduleClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center h-7"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      <Link
        href={item.href}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onFocus={open}
        onKeyDown={handleKeyDown}
        className={`relative uppercase tracking-[0.08em] xl:tracking-[0.12em] 2xl:tracking-[0.15em] text-[10.5px] xl:text-[11px] 2xl:text-xs transition-colors duration-200 inline-flex items-center justify-center gap-1 h-7 leading-none group/droptrig whitespace-nowrap ${
          isParentActive
            ? "text-gold font-semibold"
            : "text-[#1A1209] hover:text-[#D4AF37] font-semibold"
        }`}
      >
        <span className="leading-none">{item.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center justify-center w-2.5 h-2.5 shrink-0"
        >
          <ChevronDown size={10} className="text-gold/80" />
        </motion.span>
        {/* Center-expanding gold gradient underline */}
        <span
          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[0.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 pointer-events-none ${
            isParentActive || isOpen
              ? "w-full opacity-100"
              : "w-0 opacity-0 group-hover/droptrig:w-full group-hover/droptrig:opacity-100"
          }`}
        />
      </Link>

      {/* Dropdown Menu Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`absolute z-50 pt-3.5 top-full ${
              item.groups
                ? "left-1/2 -translate-x-1/2 min-w-[390px]"
                : "left-1/2 -translate-x-1/2 min-w-[280px]"
            }`}
            style={{ maxWidth: "calc(100vw - 2rem)" }}
          >
            {item.groups ? (
              /* Mega-Menu Grid for Destinations */
              <div className="relative w-[400px] max-w-[calc(100vw-2rem)] p-3.5 rounded-[3px] bg-[#FDFAF5]/98 backdrop-blur-2xl border border-gold/35 shadow-[0_12px_40px_rgba(26,18,9,0.12)] ring-1 ring-gold/[0.08] flex flex-col overflow-hidden">
                {/* Hairline gold shimmer rim */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />

                {item.groups.map((group) => (
                  <div key={group.title} className="flex flex-col">
                    {/* Category Header */}
                    <div className="pb-2 mb-2 border-b border-gold/20 flex items-center justify-between px-1">
                      <span className="font-serif text-[11.5px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
                        ✦ {group.title}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#5C5147]/60 font-sans font-semibold">
                        {group.items.length} Royal Venues
                      </span>
                    </div>

                    {/* 2-Column Cities Grid */}
                    <div className="grid grid-cols-2 gap-1 py-0.5">
                      {group.items.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.href ||
                          pathname.startsWith(`${subItem.href}/`);
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className={`group/city px-2.5 py-2.5 rounded-[2px] transition-all duration-200 flex items-center justify-between text-left ${
                              isSubActive
                                ? "bg-white/[0.08] text-gold font-bold border-l-2 border-gold"
                                : "hover:bg-gold/[0.06] text-[#1A1209] hover:text-[#D4AF37] hover:translate-x-0.5 font-medium"
                            }`}
                          >
                            <span className="font-serif text-[13.5px] tracking-wide group-hover/city:text-gold transition-colors">
                              {subItem.label}
                            </span>
                            <span className="text-[9px] text-gold opacity-0 -translate-x-1 group-hover/city:opacity-100 group-hover/city:translate-x-0 transition-all duration-200">
                              ✦
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* View All footer link */}
                    <div className="pt-2.5 mt-2 border-t border-[#D4AF37]/20 px-1 flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-[9.5px] uppercase tracking-[0.18em] text-[#D4AF37] hover:text-[#1A1209] font-bold transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Explore All Rajasthan Venues</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Refined Dropdown for Services, About & Gallery */
              <div
                className={`relative ${
                  item.label === "Services" ? "w-72 sm:w-80" : "w-72"
                } max-w-[calc(100vw-2rem)] p-2.5 rounded-[3px] bg-[#FDFAF5]/98 backdrop-blur-2xl border border-gold/35 shadow-[0_12px_40px_rgba(26,18,9,0.12)] ring-1 ring-gold/[0.08] flex flex-col space-y-1 overflow-hidden`}
              >
                {/* Hairline gold shimmer rim */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />

                {/* Micro Header */}
                <div className="px-2 pt-1 pb-1.5 border-b border-gold/15 flex items-center justify-between">
                  <span className="font-serif text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
                    ✦ {item.label === "Gallery" ? "Visual Archives" : item.label === "Services" ? "Our Services" : "The Heritage"}
                  </span>
                </div>

                {item.children?.map((subItem) => {
                  const isSubActive =
                    pathname === subItem.href ||
                    pathname.startsWith(`${subItem.href}/`) ||
                    (subItem.href.includes("?") && pathname === subItem.href.split("?")[0]);
                  return (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      onClick={() => setIsOpen(false)}
                      className={`group/sub flex items-center gap-2.5 px-3 py-2 rounded-[2px] transition-all duration-200 text-left ${
                        isSubActive
                          ? "bg-gold/[0.08] border-l-2 border-gold"
                          : "hover:bg-gold/[0.04] hover:border-l-2 hover:border-gold/60 border-l-2 border-transparent hover:translate-x-0.5"
                      }`}
                    >
                      {subItem.icon === "camera" && (
                        <div className="w-6 h-6 rounded-[2px] bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold group-hover/sub:bg-gold group-hover/sub:text-midnight transition-colors">
                          <Camera size={12} />
                        </div>
                      )}
                      {subItem.icon === "video" && (
                        <div className="w-6 h-6 rounded-[2px] bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold group-hover/sub:bg-gold group-hover/sub:text-midnight transition-colors">
                          <Video size={12} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-serif text-[13.5px] tracking-wide transition-colors ${
                              isSubActive
                                ? "text-gold font-bold"
                                : "text-[#1A1209] group-hover/sub:text-gold font-bold"
                            }`}
                          >
                            {subItem.label}
                          </span>
                          <span className="text-[9px] text-gold/60 opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-200">
                            ✦
                          </span>
                        </div>
                        {subItem.description && item.label !== "Services" && (
                          <span className="text-[11px] leading-[1.4] tracking-normal text-[#5C5147]/80 font-sans mt-0.5 line-clamp-2 block">
                            {subItem.description}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}

                {/* Footer link */}
                <div className="pt-2 mt-1 border-t border-[#D4AF37]/20 px-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[9.5px] uppercase tracking-[0.18em] text-[#D4AF37] hover:text-[#1A1209] font-bold transition-colors inline-flex items-center justify-between w-full py-1"
                  >
                    <span>
                      {item.label === "Gallery"
                        ? "Explore All Archives"
                        : item.label === "Services"
                        ? "Explore All Services"
                        : "Discover Our Story"}
                    </span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(getInitialScrolled);
  const pathname = usePathname();
  const cms = useCms();

  const navItems = cms.site.navbar.items.filter((item) => item.visible !== false);
  const derivedDropdown = deriveOpenDropdown(pathname, navItems);
  const [mobileDropdownOverride, setMobileDropdownOverride] = useState<
    string | null | undefined
  >(undefined);

  // When the user navigates (pathname changes), reset the override.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileDropdownOverride(undefined);
  }

  const openMobileDropdown =
    mobileDropdownOverride === undefined ? derivedDropdown : mobileDropdownOverride;

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollPos > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* ── Top Micro-Header for Luxury Heritage Pedigree ── */}
      <div
        className={`w-full transition-all duration-300 bg-[#FDFAF5]/90 backdrop-blur-md hidden md:block overflow-hidden ${
          isScrolled
            ? "max-h-0 opacity-0 py-0 border-b-0 border-transparent pointer-events-none"
            : "max-h-10 opacity-100 py-1.5 border-b border-gold/20"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-end text-[10px] tracking-[0.16em] uppercase text-[#5C5147]">
          <div className="flex items-center gap-4 xl:gap-6 font-sans">
            <a
              href={`tel:${cms.site.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="hover:text-gold transition-colors flex items-center gap-1.5" style={{color: "#5C5147"}}
            >
              <Phone size={10} className="text-gold" />
              <span>{cms.site.contact.phone}</span>
            </a>
            <span className="text-[#D4AF37]/30">|</span>
            <a
              href={cms.site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1.5" style={{color: "#5C5147"}}
            >
              <MessageCircle size={10} className="text-gold" />
              <span>WhatsApp Concierge</span>
            </a>
            <span className="text-[#D4AF37]/30">|</span>
            <a
              href={cms.site.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1.5" style={{color: "#5C5147"}}
            >
              <MapPin size={10} className="text-gold" />
              <span>Adarsh Nagar, Jaipur</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar (Regal Luxury Dark Glass) ── */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isScrolled
            ? "bg-[#FDFAF5]/96 backdrop-blur-2xl shadow-[0_8px_32px_rgba(26,18,9,0.08)] border-b border-[#D4AF37]/30"
            : "bg-[#FDFAF5]/90 backdrop-blur-xl border-b border-[#D4AF37]/20"
        }`}
      >
        {/* Hairline ambient shimmer lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4 py-2 sm:py-2.5">
          {/* ── Leftmost Royal Monogram & Crest ── */}
          <Link
            href="/"
            className="relative flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold shrink-0 py-1"
            aria-label="Wedding Flora Home"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 lg:w-13 lg:h-13 xl:w-15 xl:h-15 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-translate-y-0.5 my-0.5 lg:-my-1 flex items-center justify-center">
              {/* 1. Deep ambient radial gold aura */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#D4AF37]/35 via-[#F3E5AB]/20 to-transparent rounded-full blur-lg opacity-25 group-hover:opacity-90 group-hover:scale-125 transition-all duration-700 ease-out pointer-events-none" />

              {/* 2. Soft golden pulsing core */}
              <div className="absolute -inset-1 bg-gradient-to-b from-[#FAF7F2] via-[#D4AF37]/25 to-transparent rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* 3. Concentric hairline celestial ring */}
              <div className="absolute -inset-2 rounded-full border border-[#D4AF37]/40 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none" />

              {/* 4. Delicate rotating astrolabe dashed ring (subtle slow regal spin on desktop) */}
              <div className="hidden lg:block absolute -inset-3 rounded-full border border-dashed border-[#D4AF37]/25 opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-100 transition-all duration-700 ease-out animate-[spin_30s_linear_infinite] pointer-events-none" />

              {/* 5. The Royal Crest Emblem with specular gold drop shadow */}
              <div className="relative w-full h-full">
                <Image
                  src={cms.site.logoEmblemUrl || "/images/logo-emblem.png"}
                  alt={`${cms.site.name} Crest`}
                  fill
                  className="object-contain relative z-10 transition-all duration-500 ease-out filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] group-hover:drop-shadow-[0_6px_22px_rgba(212,175,55,0.7)] group-hover:brightness-105"
                  priority
                />
              </div>

              {/* 6. Subtle diagonal light catch sheen beam across crest */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-20">
                <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>
            </div>

            {/* Brand text: visibility configurable in Admin Studio */}
            <div
              className={`flex-col text-left ${
                cms.site.navbar.showBrandTextMobile ? "flex" : "hidden"
              } ${cms.site.navbar.showBrandTextDesktop ? "lg:flex" : "lg:hidden"}`}
            >
              <span className="font-serif text-lg sm:text-[22px] font-semibold tracking-[0.04em] text-[#1A1209] group-hover:text-gold-gradient transition-colors duration-300 leading-none">
                {cms.site.name}
              </span>
            </div>
          </Link>

          {/* ── Primary Navigation Sections ── */}
          <nav
            className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 2xl:gap-6 flex-1 min-w-0"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) =>
              item.children || item.groups ? (
                <NavItemDropdown key={item.label} item={item} pathname={pathname} />
              ) : (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  isActive={pathname === item.href}
                />
              )
            )}
          </nav>

          {/* ── Right Actions: Enquire CTA (Desktop) & Hamburger (Mobile) ── */}
          <div className="flex items-center shrink-0">
            {cms.site.navbar.showEnquireCta && (
              <Link
                href={cms.site.navbar.enquireHref || "/contact"}
                className="hidden lg:inline-flex relative group items-center justify-center px-4 xl:px-5 py-1.5 text-[10px] xl:text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 overflow-hidden bg-[#1A1209] text-[#FAF7F2] border border-[#1A1209] hover:border-gold/60 shadow-[0_2px_10px_rgba(26,18,9,0.1)] hover:shadow-[0_4px_18px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span className="relative z-10">{cms.site.navbar.enquireLabel || "Enquire"}</span>
              </Link>
            )}

            {/* ── Mobile Hamburger Toggle ── */}
            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 text-[#1A1209] hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-[2px]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={22} className="text-gold" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={22} className="text-[#1A1209]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain border-b border-gold/25"
            style={{
              background: "rgba(253, 250, 245, 0.98)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
          >
            <nav
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile Navigation"
              className="flex flex-col space-y-1 text-left px-4 pt-3 pb-6"
            >
              {/* Mobile Navigation List */}
              {navItems.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const hasGroups = Boolean(item.groups && item.groups.length > 0);

                if (hasChildren || hasGroups) {
                  const isExpanded = openMobileDropdown === item.label;
                  return (
                    <div key={item.label} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setMobileDropdownOverride(isExpanded ? null : item.label)}
                        className={`w-full py-3 px-4 text-xs font-semibold rounded-[2px] flex items-center justify-between uppercase tracking-[0.18em] transition-colors ${
                          pathname.startsWith(item.href)
                            ? "text-gold bg-gold/[0.06] font-bold"
                            : "text-[#1A1209] hover:text-gold hover:bg-gold/[0.06]"
                        }`}
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-accordion-${item.label.replace(/\s+/g, "-")}`}
                      >
                        <span className="leading-none">{item.label}</span>
                        <ChevronDown
                          size={13}
                          className={`text-gold transition-transform duration-300 shrink-0 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`mobile-accordion-${item.label.replace(/\s+/g, "-")}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col space-y-1 py-1"
                          >
                            {hasGroups
                              ? item.groups?.map((group) => (
                                  <div
                                    key={group.title}
                                    className="flex flex-col space-y-1 pt-1 pb-1"
                                  >
                                    <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold px-6 py-1 text-left">
                                      ✦ {group.title}
                                    </span>
                                    <div className="grid grid-cols-2 gap-1 px-4">
                                      {group.items.map((subItem) => {
                                        const isSubActive = pathname === subItem.href;
                                        return (
                                          <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            onClick={closeMobileMenu}
                                            className={`py-3 px-3 rounded-[2px] text-xs uppercase tracking-[0.14em] flex items-center justify-between transition-colors ${
                                              isSubActive
                                                ? "text-gold bg-gold/[0.08] font-bold"
                                                : "text-[#1A1209] hover:text-gold hover:bg-gold/[0.06] font-semibold"
                                            }`}
                                          >
                                            <span className="truncate">{subItem.label}</span>
                                            <span className="text-gold text-[9px]">✦</span>
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))
                              : (
                                  <>
                                    {item.children?.map((subItem) => {
                                      const isSubActive =
                                        pathname === subItem.href ||
                                        pathname.startsWith(`${subItem.href}/`) ||
                                        (subItem.href.includes("?") &&
                                          pathname === subItem.href.split("?")[0]);
                                      return (
                                        <Link
                                          key={subItem.href}
                                          href={subItem.href}
                                          onClick={closeMobileMenu}
                                          className={`py-3 px-6 rounded-[2px] text-xs uppercase tracking-[0.15em] flex items-center justify-between transition-colors ${
                                            isSubActive
                                              ? "text-gold bg-gold/[0.08] font-bold"
                                              : "text-[#1A1209] hover:text-gold hover:bg-gold/[0.06] font-semibold"
                                          }`}
                                        >
                                          <div className="flex items-center gap-2">
                                            {subItem.icon === "camera" && (
                                              <Camera size={13} className="text-gold" />
                                            )}
                                            {subItem.icon === "video" && (
                                              <Video size={13} className="text-gold" />
                                            )}
                                            <span>{subItem.label}</span>
                                          </div>
                                          <span className="text-gold text-[9px]">✦</span>
                                        </Link>
                                      );
                                    })}
                                    {item.label !== "Gallery" && (
                                      <Link
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className="py-2 px-6 text-[9.5px] uppercase tracking-widest text-[#D4AF37] hover:text-[#1A1209] font-bold flex items-center gap-1.5"
                                      >
                                        <span>View All {item.label}</span>
                                        <span>→</span>
                                      </Link>
                                    )}
                                  </>
                                )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href}
                    onClick={closeMobileMenu}
                    isMobile
                  />
                );
              })}

              {/* Mobile Concierge Action Bar */}
              <div className="pt-3 grid grid-cols-2 gap-2 border-t border-[#D4AF37]/20 mt-2">
                <a
                  href={`tel:${cms.site.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="py-3 px-3 rounded-[2px] bg-[#FAF7F0] border border-gold/30 text-xs font-semibold text-[#1A1209] hover:text-gold hover:border-gold flex items-center justify-center gap-1.5"
                >
                  <Phone size={12} className="text-gold" />
                  <span>Call Us</span>
                </a>
                <a
                  href={cms.site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-[2px] bg-[#FAF7F0] border border-gold/30 text-xs font-semibold text-[#1A1209] hover:text-gold hover:border-gold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={12} className="text-gold" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Primary Mobile CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="w-full py-3 px-4 rounded-[2px] text-xs font-sans font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-[#1A1209] text-[#FAF7F2] border border-[#1A1209] hover:border-gold/60 shadow-[0_2px_10px_rgba(26,18,9,0.1)] transition-all duration-300"
                >
                  <span>Book Private Consultation</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
