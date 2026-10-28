"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { HotelVenue } from "@/lib/content/destinations";
import { Users, BedDouble, MapPin, Sparkles, Search, MessageCircle, ArrowRight } from "lucide-react";

interface HotelDirectoryProps {
  cityName: string;
  hotels: HotelVenue[];
}

export const HotelDirectory: React.FC<HotelDirectoryProps> = ({
  cityName,
  hotels,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Category counts
  const counts = useMemo(() => {
    return {
      all: hotels.length,
      "heritage-palace": hotels.filter((h) => h.category === "heritage-palace").length,
      "luxury-resort": hotels.filter((h) => h.category === "luxury-resort").length,
      "boutique-fort": hotels.filter((h) => h.category === "boutique-fort").length,
    };
  }, [hotels]);

  // Filtered list
  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesCategory =
        selectedCategory === "all" || hotel.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.shortInfo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [hotels, selectedCategory, searchQuery]);

  const categories: { id: string; label: string; count: number }[] = [
    { id: "all", label: "All Venues", count: counts.all },
    { id: "heritage-palace", label: "Heritage Palaces", count: counts["heritage-palace"] },
    { id: "luxury-resort", label: "Luxury 5-Star Resorts", count: counts["luxury-resort"] },
    { id: "boutique-fort", label: "Boutique & Forts", count: counts["boutique-fort"] },
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Directory Header & Filters ── */}
      <div className="bg-[#090614]/70 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Verified Royal Portfolio</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-ivory">
              {cityName} Wedding Venues &amp; Palaces
            </h2>
            <p className="text-sm text-ivory/70 mt-1">
              Showing {filteredHotels.length} of {hotels.length} luxury hotels and historic palaces available for exclusive wedding buyouts.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search in ${cityName}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-ivory placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories
            .filter((c) => c.id === "all" || c.count > 0)
            .map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                    active
                      ? "bg-gold text-midnight font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "bg-white/[0.04] text-ivory/80 hover:text-ivory hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      active ? "bg-midnight/20 text-midnight" : "bg-white/10 text-gold"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
        </div>
      </div>

      {/* ── Hotels Grid ── */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-16 bg-[#090614]/40 rounded-2xl border border-white/10 p-8 space-y-4">
          <p className="text-ivory/60 font-serif text-xl">
            No hotels found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-gold text-xs uppercase tracking-widest font-bold underline hover:text-white"
          >
            Clear Filters &amp; Show All {hotels.length} Venues
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHotels.map((hotel) => {
            const encodedHotelName = encodeURIComponent(hotel.name);
            const enquiryLink = `/contact?destination=${encodeURIComponent(
              cityName
            )}&venue=${encodedHotelName}`;
            const whatsappMsg = encodeURIComponent(
              `Hello Wedding Flora! I am interested in planning a royal destination wedding at ${hotel.name} in ${cityName}. Please share venue buyout details and availability.`
            );
            const whatsappLink = `${siteConfig.contact.whatsapp}?text=${whatsappMsg}`;

            return (
              <div
                key={hotel.slug}
                className="group flex flex-col justify-between bg-[#090614]/80 backdrop-blur-xl border border-white/10 hover:border-gold/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)] hover:-translate-y-1"
              >
                <div>
                  {/* Image Card Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                    <Image
                      src={hotel.image}
                      alt={`${hotel.name} - Luxury Wedding Venue in ${cityName}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090614] via-[#090614]/20 to-transparent opacity-80" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-midnight/90 backdrop-blur-md text-gold border border-gold/30">
                        {hotel.categoryLabel}
                      </span>
                    </div>

                    {/* Price Tier */}
                    {hotel.priceTier && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-ivory/90 border border-white/10">
                          {hotel.priceTier}
                        </span>
                      </div>
                    )}

                    {/* Location strip */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-ivory/90">
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="truncate">{hotel.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                      {hotel.name}
                    </h3>

                    {/* Stat Badges */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                        <BedDouble className="w-4 h-4 text-gold shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase text-ivory/50 block font-bold">
                            Rooms
                          </span>
                          <span className="font-bold text-ivory">
                            {hotel.rooms > 0 ? `${hotel.rooms} Rooms` : "Bespoke Suites"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
                        <Users className="w-4 h-4 text-gold shrink-0" />
                        <div>
                          <span className="text-[10px] uppercase text-ivory/50 block font-bold">
                            Guest Capacity
                          </span>
                          <span className="font-bold text-ivory">
                            {hotel.capacity > 0 ? `Up to ${hotel.capacity}` : "Exclusive Scale"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-ivory/70 line-clamp-3 leading-relaxed">
                      {hotel.shortInfo}
                    </p>

                    {/* Highlights tags */}
                    {hotel.highlights && hotel.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {hotel.highlights.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-gold/10 text-gold border border-gold/20"
                          >
                            ✦ {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 sm:p-6 pt-0 border-t border-white/5 space-y-2 mt-4">
                  <Link
                    href={enquiryLink}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[2px] bg-gold hover:bg-[#b8972e] text-midnight font-sans text-xs uppercase tracking-wider font-extrabold transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                  >
                    <span>Plan Wedding Here</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[2px] border border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/30 text-emerald-300 font-sans text-xs uppercase tracking-wider font-bold transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Venue Enquiry</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

