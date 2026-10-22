"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";

export const EnquiryForm: React.FC = () => {
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "complete-regal-wedding";

  const [formData, setFormData] = useState({
    fullName: "",
    partnerName: "",
    email: "",
    phone: "",
    weddingDate: "",
    destination: "Udaipur",
    guestCount: "150 - 300",
    packageChoice: initialPackage,
    budgetRange: "₹ 50L - ₹ 1 Cr",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate swift luxury submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Wedding Flora team! I would like to enquire about wedding planning for ${formData.fullName || "our celebration"} in ${formData.destination} around ${formData.weddingDate || "upcoming season"}.`
  );

  if (isSubmitted) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#090614]/80 backdrop-blur-xl border-2 border-gold/40 shadow-[0_20px_50px_rgba(212,175,55,0.2)] text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gold/15 text-gold flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-gold" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block">
            Enquiry Received With Honour
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ivory">
            Thank You, {formData.fullName || "Esteemed Family"}!
          </h3>
          <p className="font-sans text-sm sm:text-base text-ivory/80 font-medium max-w-lg mx-auto leading-relaxed">
            Our principal wedding planning directors in Delhi NCR &amp; Jaipur have received your celebration details and will connect with you personally within 24 hours.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/919810123456?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] bg-emerald-700 text-white font-sans text-xs uppercase tracking-wider font-bold hover:bg-emerald-800 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Instantly on WhatsApp</span>
          </a>

          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[2px] border border-gold text-ivory font-sans text-xs uppercase tracking-wider font-bold hover:bg-gold/10 transition-all"
          >
            <InstagramIcon className="w-4 h-4 text-gold" />
            <span>Explore Instagram Reels</span>
          </a>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs text-ivory/70 font-medium">
          Prefer calling right away? Ring us at{" "}
          <a href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`} className="font-bold text-gold underline">
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-10 rounded-3xl bg-[#090614]/75 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] space-y-5 sm:space-y-6">
      <div className="space-y-1 border-b border-white/10 pb-4">
        <div className="flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Royal Wedding Consultation Request</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-ivory">
          Share Your Celebration Vision
        </h3>
        <p className="text-xs sm:text-sm text-ivory/80 font-medium">
          Fill in the details below to receive a customized master proposal and consultation slot.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Bride / Groom / Host Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Aanya Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 text-ivory placeholder-white/40 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          />
        </div>

        {/* Partner Name */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Partner&apos;s Name
          </label>
          <input
            type="text"
            placeholder="e.g. Kabir Singhania"
            value={formData.partnerName}
            onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 text-ivory placeholder-white/40 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="name@domain.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 text-ivory placeholder-white/40 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98101 23456"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 text-ivory placeholder-white/40 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          />
        </div>

        {/* Wedding Date */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Expected Date / Season *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Nov 2025 / Winter Season"
            value={formData.weddingDate}
            onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 text-ivory placeholder-white/40 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          />
        </div>

        {/* Destination */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Dream Destination / City *
          </label>
          <select
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#090614] border border-white/15 text-ivory text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          >
            <option value="Udaipur">Udaipur (Lake Palaces &amp; Heritage)</option>
            <option value="Jaipur">Jaipur (Pink City Forts &amp; Haveli)</option>
            <option value="Jodhpur">Jodhpur (Sandstone Royal Palaces)</option>
            <option value="Delhi NCR">Delhi NCR (Luxury Farmhouses &amp; 5-Star)</option>
            <option value="Goa">Goa (Scenic Coastal &amp; Beach)</option>
            <option value="Other Destination">Other Royal Destination</option>
          </select>
        </div>

        {/* Guest Count */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Estimated Guest Count
          </label>
          <select
            value={formData.guestCount}
            onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#090614] border border-white/15 text-ivory text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          >
            <option value="Under 150">Under 150 Guests (Intimate Royal)</option>
            <option value="150 - 300">150 - 300 Guests</option>
            <option value="300 - 600">300 - 600 Guests</option>
            <option value="600+">600+ Guests (Grand Palace Scale)</option>
          </select>
        </div>

        {/* Package Choice */}
        <div className="space-y-1.5">
          <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
            Package of Interest
          </label>
          <select
            value={formData.packageChoice}
            onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#090614] border border-white/15 text-ivory text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
          >
            <option value="complete-regal-wedding">The Complete Regal Palace Wedding Experience</option>
            <option value="royal-mandap-scenography">The Royal Mandap &amp; Scenography Suite</option>
            <option value="sangeet-spectacular">The Sangeet Spectacular &amp; Production</option>
            <option value="destination-concierge">The Destination Concierge &amp; Hospitality</option>
            <option value="custom-bespoke">Completely Bespoke Curation</option>
          </select>
        </div>
      </div>

      {/* Message / Vision */}
      <div className="space-y-1.5">
        <label className="text-xs uppercase tracking-wider text-ivory/90 font-bold block">
          Tell Us About Your Vision &amp; Ceremonies
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Planning a 3-day wedding with Sangeet concert, floating mandap, and 350 traveling guests..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 text-ivory placeholder-white/40 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          disabled={isSubmitting}
          className="font-bold tracking-wider"
        >
          {isSubmitting ? "Submitting Your Enquiry..." : "Submit Royal Wedding Enquiry"}
        </Button>
      </div>

      <div className="text-center pt-2">
        <p className="text-[11px] text-ivory/60 font-medium">
          We respect your privacy. Your details are solely shared with our principal wedding planning directors.
        </p>
      </div>
    </form>
  );
};
