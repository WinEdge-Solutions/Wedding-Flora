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
  Sparkles,
} from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Safely compute initial scroll state to avoid a layout flash on load. */
function getInitialScrolled(): boolean {
  if (typeof window !== "undefined") return window.scrollY > 24;
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
      className={`relative uppercase tracking-[0.13em] lg:tracking-[0.15em] xl:tracking-[0.18em] transition-colors duration-200 group/nav ${
        isMobile
          ? "py-3 px-4 text-sm font-semibold rounded-[2px] flex items-center justify-center " +
            (isActive
              ? "text-gold bg-white/[0.06] font-bold"
              : "text-ivory/80 hover:text-white hover:bg-white/[0.04]")
          : "text-[11px] xl:text-[11.5px] 2xl:text-xs py-1 " +
            (isActive ? "text-gold font-bold" : "text-ivory/75 hover:text-ivory font-semibold")
      }`}
    >
      <span>{label}</span>
      {/* Center-expanding gold gradient underline — desktop only */}
      {!isMobile && (
        <span
          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 pointer-events-none ${
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
      className="relative"
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
        className={`relative uppercase tracking-[0.13em] lg:tracking-[0.15em] xl:tracking-[0.18em] text-[11px] xl:text-[11.5px] 2xl:text-xs transition-colors duration-200 inline-flex items-center gap-1 py-1 group/droptrig ${
          isParentActive
            ? "text-gold font-bold"
            : "text-ivory/75 hover:text-ivory font-semibold"
        }`}
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center"
        >
          <ChevronDown size={10} className="text-gold/80" />
        </motion.span>
        {/* Center-expanding gold gradient underline */}
        <span
          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-300 pointer-events-none ${
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
            className={`absolute z-50 pt-2.5 ${
              item.groups
                ? "left-1/2 -translate-x-1/2 min-w-[390px]"
                : "left-1/2 -translate-x-1/2 min-w-[280px]"
            }`}
            // Keep viewport-clamping via CSS max-w so it never overflows
            style={{ maxWidth: "calc(100vw - 2rem)" }}
          >
            {item.groups ? (
              /* Mega-Menu Grid for Destinations */
              <div className="relative w-[400px] max-w-[calc(100vw-2rem)] p-3.5 rounded-[3px] bg-[#06040e]/98 backdrop-blur-2xl border border-gold/30 shadow-[0_20px_55px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08] flex flex-col overflow-hidden">
                {/* Hairline gold shimmer rim */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />

                {item.groups.map((group) => (
                  <div key={group.title} className="flex flex-col">
                    {/* Category Header */}
                    <div className="pb-2 mb-2 border-b border-gold/20 flex items-center justify-between px-1">
                      <span className="font-serif text-[11.5px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
                        ✦ {group.title}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-ivory/50 font-sans font-semibold">
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
                                : "hover:bg-white/[0.05] text-ivory/80 hover:text-white hover:translate-x-0.5"
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
                    <div className="pt-2.5 mt-2 border-t border-white/10 px-1 flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-[9.5px] uppercase tracking-[0.18em] text-[#D4AF37] hover:text-white font-bold transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Explore All Rajasthan Venues</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Refined Dropdown for About & Gallery */
              <div className="relative w-72 max-w-[calc(100vw-2rem)] p-2.5 rounded-[3px] bg-[#06040e]/98 backdrop-blur-2xl border border-gold/30 shadow-[0_20px_55px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08] flex flex-col space-y-1 overflow-hidden">
                {/* Hairline gold shimmer rim */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />

                {/* Micro Header */}
                <div className="px-2 pt-1 pb-1.5 border-b border-gold/15 flex items-center justify-between">
                  <span className="font-serif text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4AF37]">
                    ✦ {item.label === "Gallery" ? "Visual Archives" : "The Heritage"}
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
                      className={`group/sub flex items-start gap-2.5 px-3 py-2.5 rounded-[2px] transition-all duration-200 text-left ${
                        isSubActive
                          ? "bg-white/[0.08] border-l-2 border-gold"
                          : "hover:bg-white/[0.05] hover:border-l-2 hover:border-gold/60 border-l-2 border-transparent hover:translate-x-0.5"
                      }`}
                    >
                      {subItem.icon === "camera" && (
                        <div className="w-6 h-6 rounded-[2px] bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold group-hover/sub:bg-gold group-hover/sub:text-midnight transition-colors mt-0.5">
                          <Camera size={12} />
                        </div>
                      )}
                      {subItem.icon === "video" && (
                        <div className="w-6 h-6 rounded-[2px] bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 text-gold group-hover/sub:bg-gold group-hover/sub:text-midnight transition-colors mt-0.5">
                          <Video size={12} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-serif text-[14px] tracking-wide transition-colors ${
                              isSubActive
                                ? "text-gold font-bold"
                                : "text-ivory group-hover/sub:text-gold font-medium"
                            }`}
                          >
                            {subItem.label}
                          </span>
                          <span className="text-[9px] text-gold/60 opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-200">
                            ✦
                          </span>
                        </div>
                        {subItem.description && (
                          <span className="text-[10px] tracking-normal text-ivory/60 font-sans mt-0.5 line-clamp-1 block">
                            {subItem.description}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}

                {/* Footer link — "Discover Our Story" for About, "Explore All Archives" for Gallery */}
                <div className="pt-2 mt-1 border-t border-white/10 px-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[9.5px] uppercase tracking-[0.18em] text-[#D4AF37] hover:text-white font-bold transition-colors inline-flex items-center justify-between w-full py-1"
                  >
                    <span>
                      {item.label === "Gallery" ? "Explore All Archives" : "Discover Our Story"}
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
  // Fix: initialize from window.scrollY to prevent layout flash on load
  const [isScrolled, setIsScrolled] = useState(getInitialScrolled);
  const pathname = usePathname();

  // Derive which accordion panel should be auto-open based on current pathname.
  // This stays in sync with client-side navigation automatically.
  const derivedDropdown = deriveOpenDropdown(pathname, siteConfig.navItems);

  // Manual accordion override: undefined = follow derived; null = all closed;
  // a label string = that item is explicitly open.
  const [mobileDropdownOverride, setMobileDropdownOverride] = useState<
    string | null | undefined
  >(undefined);

  // When the user navigates (pathname changes), reset the override.
  // We store the pathname we last computed against to detect changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    // Synchronous during render — this is safe: React schedules one extra
    // render before the browser paints. No ESLint rule is violated because
    // we are NOT inside an effect body.
    setLastPathname(pathname);
    setMobileDropdownOverride(undefined);
  }

  // Resolved open dropdown
  const openMobileDropdown =
    mobileDropdownOverride === undefined ? derivedDropdown : mobileDropdownOverride;

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Guard: determine how many nav items are on left/right safely
  const leftItems = siteConfig.navItems.slice(0, 4);
  const rightItems = siteConfig.navItems.slice(4, 9);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* ── Top Micro-Header ── */}
      <div
        className={`w-full transition-all duration-300 border-b border-gold/15 bg-black/50 backdrop-blur-md hidden md:block overflow-hidden ${
          isScrolled ? "max-h-0 opacity-0 py-0 border-transparent" : "max-h-9 opacity-100 py-1.5"
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-ivory/70">
          <div className="flex items-center gap-2">
            <span className="text-gold text-[9px]">✦</span>
            <span className="font-serif tracking-[0.18em] text-[#D4AF37] font-semibold">
              The Royal Wedding Planner
            </span>
          </div>

          <div className="flex items-center gap-4 xl:gap-6 font-sans">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <Phone size={10} className="text-gold" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <MessageCircle size={10} className="text-gold" />
              <span>WhatsApp Concierge</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={siteConfig.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <MapPin size={10} className="text-gold" />
              <span>Adarsh Nagar, Jaipur</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isScrolled
            ? "bg-[#04030a]/94 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.7)] border-b border-[#D4AF37]/25"
            : "bg-[#04030a]/78 backdrop-blur-xl border-b border-[#D4AF37]/15"
        }`}
      >
        {/* Hairline ambient shimmer lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between py-2 sm:py-2.5">
          {/* ── Left Nav ── */}
          <nav
            className="hidden lg:flex items-center space-x-3 lg:space-x-4 xl:space-x-5"
            aria-label="Primary Left Navigation"
          >
            {leftItems.map((item) =>
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

          {/* ── Central Royal Monogram & Crest ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold shrink-0 py-0.5"
            aria-label="Wedding Flora Home"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0 transition-transform duration-500 group-hover:scale-105">
              {/* Ambient radial gold halo behind crest */}
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/10 to-transparent rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <Image
                src="/images/logo-emblem.png"
                alt="Wedding Flora Crest"
                fill
                className="object-contain relative z-10"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg sm:text-[22px] font-semibold tracking-[0.04em] text-ivory group-hover:text-gold-gradient transition-colors duration-300 leading-none">
                Wedding Flora
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.28em] text-[#D4AF37] font-semibold mt-1 transition-colors">
                The Wedding Planner
              </span>
            </div>
          </Link>

          {/* ── Right Nav + Elegant CTA ── */}
          <div className="hidden lg:flex items-center space-x-3 lg:space-x-4 xl:space-x-4">
            {rightItems.map((item) =>
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

            {/* Bespoke Luxury CTA Badge */}
            <Link
              href="/contact"
              className="relative group inline-flex items-center justify-center px-4 xl:px-4.5 py-1.5 text-[10px] xl:text-[10.5px] font-sans font-bold uppercase tracking-[0.2em] rounded-[2px] transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0 border border-gold/60"
              style={{
                background: "linear-gradient(135deg, #FAF7F2 0%, #D4AF37 55%, #AB9178 100%)",
                color: "#08040a",
              }}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Enquire</span>
                <span className="text-[9px] text-[#08040a] transition-transform duration-300 group-hover:translate-x-0.5">
                  ✦
                </span>
              </span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* ── Mobile Hamburger Toggle ── */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 text-ivory hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-[2px]"
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
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
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
            className="lg:hidden overflow-hidden border-b border-gold/25"
            style={{
              background: "rgba(5, 3, 10, 0.98)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
          >
            {/* Fix: added id + role + aria-label for accessibility */}
            <nav
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile Navigation"
              className="flex flex-col space-y-1 text-center px-4 pt-4 pb-6"
            >
              {/* Mobile Header Branding */}
              <div className="flex items-center justify-center gap-2.5 pb-3 mb-2 border-b border-gold/15">
                <div className="relative w-7 h-7 shrink-0">
                  <Image
                    src="/images/logo-emblem.png"
                    alt="Wedding Flora Emblem"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="font-serif text-base font-semibold text-ivory block leading-none">
                    Wedding Flora
                  </span>
                  <span className="text-[7.5px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold">
                    The Wedding Planner
                  </span>
                </div>
              </div>

              {/* Mobile Navigation List */}
              {siteConfig.navItems.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const hasGroups = Boolean(item.groups && item.groups.length > 0);

                if (hasChildren || hasGroups) {
                  const isExpanded = openMobileDropdown === item.label;
                  return (
                    <div key={item.label} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => setMobileDropdownOverride(isExpanded ? null : item.label)}
                        className={`py-3 px-4 text-xs font-semibold rounded-[2px] flex items-center justify-between uppercase tracking-[0.18em] w-full transition-colors ${
                          pathname.startsWith(item.href)
                            ? "text-gold bg-white/[0.06] font-bold"
                            : "text-ivory/80 hover:text-white hover:bg-white/[0.04]"
                        }`}
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-accordion-${item.label.replace(/\s+/g, "-")}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{item.label}</span>
                        </span>
                        <ChevronDown
                          size={13}
                          className={`text-gold transition-transform duration-300 ${
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
                                                ? "text-gold bg-white/[0.08] font-bold"
                                                : "text-ivory/70 hover:text-ivory hover:bg-white/[0.04] font-medium"
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
                                              ? "text-gold bg-white/[0.08] font-bold"
                                              : "text-ivory/70 hover:text-ivory hover:bg-white/[0.04] font-medium"
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
                                    {/* Only show "View All" for items where the parent page
                                        is meaningfully different from the child links (e.g. About).
                                        For Gallery the children cover all content, so skip it. */}
                                    {item.label !== "Gallery" && (
                                      <Link
                                        href={item.href}
                                        onClick={closeMobileMenu}
                                        className="py-2 px-6 text-[9.5px] uppercase tracking-widest text-[#D4AF37] hover:text-white font-bold flex items-center justify-center gap-1.5"
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
              <div className="pt-3 grid grid-cols-2 gap-2 border-t border-gold/15 mt-2">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="py-3 px-3 rounded-[2px] bg-white/[0.04] border border-gold/30 text-xs font-semibold text-ivory hover:text-gold flex items-center justify-center gap-1.5"
                >
                  <Phone size={12} className="text-gold" />
                  <span>Call Us</span>
                </a>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-[2px] bg-white/[0.04] border border-gold/30 text-xs font-semibold text-ivory hover:text-gold flex items-center justify-center gap-1.5"
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
                  className="w-full py-3 px-4 rounded-[2px] text-xs font-sans font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 border border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, #FAF7F2 0%, #D4AF37 55%, #AB9178 100%)",
                    color: "#08040a",
                  }}
                >
                  <Sparkles size={14} />
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
