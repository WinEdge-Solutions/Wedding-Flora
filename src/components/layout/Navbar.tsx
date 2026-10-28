"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { siteConfig, NavItem } from "@/lib/site";
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitialScrolled(): boolean {
  if (typeof window !== "undefined") return window.scrollY > 40;
  return false;
}

function deriveOpenDropdown(pathname: string, navItems: NavItem[]): string | null {
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
        g.items.some((c) => pathname === c.href || pathname.startsWith(`${c.href}/`))
      )
    ) {
      return item.label;
    }
  }
  return null;
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────

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
  if (isMobile) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`block w-full text-left py-3.5 px-5 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-colors duration-200 border-b border-[#D4AF37]/10 ${
          isActive
            ? "text-[#D4AF37]"
            : "text-[#5D5956] hover:text-[#D4AF37]"
        }`}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative group/nav inline-block text-[10.5px] xl:text-[11px] font-sans font-semibold uppercase tracking-[0.18em] xl:tracking-[0.2em] py-1 transition-colors duration-200 ${
        isActive ? "text-[#D4AF37]" : "text-[#5D5956] hover:text-[#AB9178]"
      }`}
    >
      {label}
      {/* Thin gold underline that expands from centre on hover/active */}
      <span
        className={`absolute -bottom-px left-1/2 -translate-x-1/2 h-px bg-[#D4AF37] transition-all duration-300 ${
          isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100"
        }`}
      />
    </Link>
  );
}

// ─── Desktop Dropdown ─────────────────────────────────────────────────────────

function NavItemDropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isParentActive =
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    item.children?.some(
      (c) =>
        pathname === c.href ||
        pathname.startsWith(`${c.href}/`) ||
        (c.href.includes("?") && pathname === c.href.split("?")[0])
    ) ||
    item.groups?.some((g) =>
      g.items.some(
        (c) =>
          pathname === c.href ||
          pathname.startsWith(`${c.href}/`) ||
          (c.href.includes("?") && pathname === c.href.split("?")[0])
      )
    );

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 180);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((p) => !p);
    }
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      if (!containerRef.current?.contains(e.relatedTarget as Node)) scheduleClose();
    },
    [scheduleClose]
  );

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      {/* Trigger */}
      <Link
        href={item.href}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onFocus={open}
        onKeyDown={handleKeyDown}
        className={`relative group/trig inline-flex items-center gap-1 text-[10.5px] xl:text-[11px] font-sans font-semibold uppercase tracking-[0.18em] xl:tracking-[0.2em] py-1 transition-colors duration-200 ${
          isParentActive ? "text-[#D4AF37]" : "text-[#5D5956] hover:text-[#AB9178]"
        }`}
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center text-[#D4AF37]"
        >
          <ChevronDown size={9} strokeWidth={2.5} />
        </motion.span>
        <span
          className={`absolute -bottom-px left-1/2 -translate-x-1/2 h-px bg-[#D4AF37] transition-all duration-300 ${
            isParentActive || isOpen
              ? "w-full opacity-100"
              : "w-0 opacity-0 group-hover/trig:w-full group-hover/trig:opacity-100"
          }`}
        />
      </Link>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 z-50 pt-3"
            style={{ maxWidth: "calc(100vw - 2rem)" }}
          >
            {item.groups ? (
              /* ── Destinations mega-menu ── */
              <div className="w-[440px] max-w-[calc(100vw-2rem)] bg-[#FAF7F2] border border-[#D7D3CF] shadow-[0_8px_40px_rgba(0,0,0,0.12)] rounded-[3px] overflow-hidden">
                {/* Top accent line */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#D7D3CF]">
                    <span className="font-serif text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">
                      ✦ {item.groups[0].title}
                    </span>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[9px] uppercase tracking-[0.2em] text-[#AB9178] hover:text-[#D4AF37] font-semibold transition-colors"
                    >
                      View All →
                    </Link>
                  </div>

                  {/* 2-column city grid */}
                  <div className="grid grid-cols-2 gap-px bg-[#D7D3CF]/50">
                    {item.groups[0].items.map((subItem) => {
                      const active = pathname === subItem.href || pathname.startsWith(`${subItem.href}/`);
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={`group/city flex flex-col px-3 py-2.5 transition-colors duration-150 ${
                            active ? "bg-[#F1EBE0]" : "bg-[#FAF7F2] hover:bg-[#F1EBE0]"
                          }`}
                        >
                          <span
                            className={`font-serif text-[13px] transition-colors ${
                              active ? "text-[#D4AF37]" : "text-[#5D5956] group-hover/city:text-[#AB9178]"
                            }`}
                          >
                            {subItem.label}
                          </span>
                          {subItem.description && (
                            <span className="text-[9.5px] text-[#AB9178] leading-tight mt-0.5 font-sans">
                              {subItem.description}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* ── About / Gallery dropdown ── */
              <div className="w-64 bg-[#FAF7F2] border border-[#D7D3CF] shadow-[0_8px_40px_rgba(0,0,0,0.12)] rounded-[3px] overflow-hidden">
                {/* Top accent line */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

                <div className="py-2">
                  {item.children?.map((subItem) => {
                    const active =
                      pathname === subItem.href ||
                      pathname.startsWith(`${subItem.href}/`) ||
                      (subItem.href.includes("?") && pathname === subItem.href.split("?")[0]);
                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`group/sub flex items-center gap-3 px-4 py-3 transition-colors duration-150 border-b border-[#D7D3CF]/50 last:border-0 ${
                          active ? "bg-[#F1EBE0]" : "hover:bg-[#F1EBE0]"
                        }`}
                      >
                        {/* Icon badge */}
                        {(subItem.icon === "camera" || subItem.icon === "video") && (
                          <div
                            className={`w-7 h-7 rounded-[2px] flex items-center justify-center shrink-0 transition-colors ${
                              active ? "bg-[#D4AF37] text-white" : "bg-[#F1DCE1] text-[#AB9178] group-hover/sub:bg-[#D4AF37] group-hover/sub:text-white"
                            }`}
                          >
                            {subItem.icon === "camera" ? <Camera size={12} /> : <Video size={12} />}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`font-serif text-[13.5px] leading-none transition-colors ${
                            active ? "text-[#D4AF37]" : "text-[#5D5956] group-hover/sub:text-[#AB9178]"
                          }`}>
                            {subItem.label}
                          </p>
                          {subItem.description && (
                            <p className="text-[9.5px] text-[#AB9178] mt-0.5 leading-tight font-sans truncate">
                              {subItem.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
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

  const derivedDropdown = deriveOpenDropdown(pathname, siteConfig.navItems);
  const [mobileDropdownOverride, setMobileDropdownOverride] = useState<string | null | undefined>(undefined);

  // Reset accordion override on route change (safe during render)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileDropdownOverride(undefined);
  }

  const openMobileDropdown =
    mobileDropdownOverride === undefined ? derivedDropdown : mobileDropdownOverride;

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const leftItems = siteConfig.navItems.slice(0, 4);
  const rightItems = siteConfig.navItems.slice(4, 9);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Top micro-bar ── */}
      <div
        className={`w-full hidden md:block overflow-hidden transition-all duration-300 bg-[#030308] border-b border-[#D4AF37]/20 ${
          isScrolled ? "max-h-0 opacity-0" : "max-h-9 opacity-100"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between py-1.5">
          <span className="font-serif text-[9.5px] tracking-[0.24em] uppercase text-[#D4AF37]/80">
            ✦ Rajasthan&apos;s Premier Wedding Planner
          </span>
          <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.16em] font-sans text-[#D7D3CF]/60">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
            >
              <Phone size={9} className="text-[#D4AF37]" />
              {siteConfig.contact.phone}
            </a>
            <span className="text-[#D7D3CF]/20">|</span>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle size={9} className="text-[#D4AF37]" />
              WhatsApp
            </a>
            <span className="text-[#D7D3CF]/20">|</span>
            <a
              href={siteConfig.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
            >
              <MapPin size={9} className="text-[#D4AF37]" />
              Adarsh Nagar, Jaipur
            </a>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_#D7D3CF,0_4px_24px_rgba(0,0,0,0.06)]"
            : "bg-white/90 backdrop-blur-sm border-b border-[#D7D3CF]/60"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[64px]">

          {/* ── Left nav links ── */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-6"
            aria-label="Primary left navigation"
          >
            {leftItems.map((item) =>
              item.children || item.groups ? (
                <NavItemDropdown key={item.label} item={item} pathname={pathname} />
              ) : (
                <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
              )
            )}
          </nav>

          {/* ── Logo (centre) ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 rounded-sm shrink-0"
            aria-label="Wedding Flora — Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/images/logo-emblem.png"
                alt="Wedding Flora Crest"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[20px] sm:text-[22px] font-semibold tracking-[0.03em] text-[#5D5956] leading-none group-hover:text-[#AB9178] transition-colors duration-300">
                Wedding Flora
              </span>
              <span className="text-[7px] sm:text-[7.5px] uppercase tracking-[0.32em] text-[#D4AF37] font-sans font-semibold mt-0.5">
                The Wedding Planner
              </span>
            </div>
          </Link>

          {/* ── Right nav links + CTA ── */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {rightItems.map((item) =>
              item.children || item.groups ? (
                <NavItemDropdown key={item.label} item={item} pathname={pathname} />
              ) : (
                <NavLink key={item.href} href={item.href} label={item.label} isActive={pathname === item.href} />
              )
            )}

            {/* Enquire CTA */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.22em] rounded-[2px] transition-all duration-250 border border-[#D4AF37] text-[#5D5956] hover:bg-[#D4AF37] hover:text-white shadow-sm hover:shadow-md"
            >
              <span>Enquire</span>
              <span className="text-[#D4AF37] group-hover:text-white transition-colors text-[9px]">✦</span>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="flex lg:hidden items-center justify-center w-10 h-10 rounded-[2px] text-[#5D5956] hover:text-[#D4AF37] hover:bg-[#F1EBE0] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-b border-[#D7D3CF] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          >
            <nav
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile Navigation"
              className="flex flex-col"
            >
              {/* Branding strip */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#D7D3CF]/60 bg-[#FAF7F2]">
                <div className="relative w-8 h-8 shrink-0">
                  <Image src="/images/logo-emblem.png" alt="Wedding Flora" fill className="object-contain" />
                </div>
                <div>
                  <p className="font-serif text-[16px] leading-none text-[#5D5956]">Wedding Flora</p>
                  <p className="text-[7px] uppercase tracking-[0.28em] text-[#D4AF37] font-semibold mt-0.5">The Wedding Planner</p>
                </div>
              </div>

              {/* Nav items */}
              {siteConfig.navItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const hasGroups = Boolean(item.groups?.length);

                if (hasChildren || hasGroups) {
                  const isExpanded = openMobileDropdown === item.label;
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <div key={item.label} className="border-b border-[#D7D3CF]/60">
                      <button
                        type="button"
                        onClick={() => setMobileDropdownOverride(isExpanded ? null : item.label)}
                        aria-expanded={isExpanded}
                        aria-controls={`mob-acc-${item.label.replace(/\s+/g, "-")}`}
                        className={`w-full flex items-center justify-between px-5 py-3.5 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] transition-colors ${
                          isActive ? "text-[#D4AF37] bg-[#FAF7F2]" : "text-[#5D5956] hover:text-[#AB9178] hover:bg-[#FAF7F2]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={13}
                          className={`text-[#D4AF37] transition-transform duration-250 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            id={`mob-acc-${item.label.replace(/\s+/g, "-")}`}
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-[#FAF7F2]"
                          >
                            {hasGroups
                              ? item.groups?.map((group) => (
                                  <div key={group.title} className="px-5 pb-3 pt-2">
                                    <p className="text-[9px] uppercase tracking-[0.28em] text-[#D4AF37] font-bold mb-2">
                                      ✦ {group.title}
                                    </p>
                                    <div className="grid grid-cols-2 gap-px bg-[#D7D3CF]/40">
                                      {group.items.map((sub) => {
                                        const active = pathname === sub.href;
                                        return (
                                          <Link
                                            key={sub.href}
                                            href={sub.href}
                                            onClick={closeMobileMenu}
                                            className={`flex flex-col px-3 py-3 transition-colors ${
                                              active ? "bg-[#F1EBE0] text-[#D4AF37]" : "bg-white text-[#5D5956] hover:bg-[#F1EBE0] hover:text-[#AB9178]"
                                            }`}
                                          >
                                            <span className="text-[11px] font-serif">{sub.label}</span>
                                            {sub.description && (
                                              <span className="text-[9px] text-[#AB9178] mt-0.5 leading-tight truncate">{sub.description}</span>
                                            )}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                    <Link
                                      href={item.href}
                                      onClick={closeMobileMenu}
                                      className="mt-2.5 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#AB9178] font-bold transition-colors"
                                    >
                                      Explore All Venues →
                                    </Link>
                                  </div>
                                ))
                              : (
                                <div className="pb-1">
                                  {item.children?.map((sub) => {
                                    const active =
                                      pathname === sub.href ||
                                      pathname.startsWith(`${sub.href}/`) ||
                                      (sub.href.includes("?") && pathname === sub.href.split("?")[0]);
                                    return (
                                      <Link
                                        key={sub.href}
                                        href={sub.href}
                                        onClick={closeMobileMenu}
                                        className={`flex items-center gap-3 px-5 py-3.5 border-t border-[#D7D3CF]/40 transition-colors ${
                                          active ? "text-[#D4AF37]" : "text-[#5D5956] hover:text-[#AB9178] hover:bg-[#F1EBE0]"
                                        }`}
                                      >
                                        {sub.icon === "camera" && <Camera size={14} className="text-[#D4AF37] shrink-0" />}
                                        {sub.icon === "video" && <Video size={14} className="text-[#D4AF37] shrink-0" />}
                                        <div>
                                          <p className="text-[11px] font-serif">{sub.label}</p>
                                          {sub.description && (
                                            <p className="text-[9px] text-[#AB9178] mt-0.5 leading-tight">{sub.description}</p>
                                          )}
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
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

              {/* Mobile action buttons */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-[#FAF7F2] border-t border-[#D7D3CF]/60">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-[2px] border border-[#D7D3CF] text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#5D5956] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <Phone size={12} className="text-[#D4AF37]" />
                  Call Us
                </a>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-[2px] border border-[#D7D3CF] text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#5D5956] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  <MessageCircle size={12} className="text-[#D4AF37]" />
                  WhatsApp
                </a>
              </div>

              {/* Primary CTA */}
              <div className="px-4 pb-5">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[2px] border border-[#D4AF37] bg-[#D4AF37] text-white text-[11px] font-sans font-bold uppercase tracking-[0.2em] hover:bg-[#AB9178] hover:border-[#AB9178] transition-colors"
                >
                  ✦ Book a Consultation
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
