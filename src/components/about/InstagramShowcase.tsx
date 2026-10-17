"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, ExternalLink, Play, CheckCircle2, X } from "lucide-react";

interface InstaPost {
  id: string;
  type: "reel" | "photo" | "carousel";
  imageUrl: string;
  videoUrl?: string;
  likes: string;
  comments: string;
  caption: string;
  tag: string;
}

const instaPosts: InstaPost[] = [
  {
    id: "p1",
    type: "reel",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    videoUrl: "/videos/reel-1.mp4",
    likes: "6,420",
    comments: "284",
    caption: "The majestic Umaid Bhawan Sangeet entrance. Choreographed royalty, Sufi harmonies, and starlit sandstone ramparts. ✨👑 #WeddingFlora #RoyalWedding #JodhpurWedding",
    tag: "SANGEET REEL",
  },
  {
    id: "p2",
    type: "reel",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    videoUrl: "/videos/reel-2.mp4",
    likes: "8,910",
    comments: "412",
    caption: "Floating lotus Mandap on the tranquil waters of Lake Pichola. Hand-strung with 40,000 fragrant rajnigandhas and crystal chandeliers. 🌸🪷 #MandapDecor #LakePichola",
    tag: "DETAILING DECOR",
  },
  {
    id: "p3",
    type: "reel",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    videoUrl: "/videos/reel-3.mp4",
    likes: "5,830",
    comments: "198",
    caption: "A midnight lakefront Sangeet production under the stars. Concert-grade acoustics paired with historic palace architecture. 🎶💫 #SangeetNight #UdaipurWedding",
    tag: "SANGEET REEL",
  },
  {
    id: "p4",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    likes: "4,190",
    comments: "163",
    caption: "Golden marigold delirium! Traditional Haldi setup on the sun-drenched courtyards of Fairmont Jaipur. 💛🌼 #HaldiDecor #JaipurDiaries",
    tag: "HALDI CARNIVAL",
  },
  {
    id: "p5",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    likes: "7,310",
    comments: "305",
    caption: "Sunset Varmalas overlooking Lake Pichola as the Leela Palace glows in candlelit majesty. Moments that turn into family heirlooms. 💍✨ #VarmalaMagic",
    tag: "ROYAL CEREMONY",
  },
  {
    id: "p6",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=800&q=80",
    likes: "3,890",
    comments: "142",
    caption: "Details that define royal hospitality: hand-engraved brass welcome hampers, personalized safas, and sacred morning aarti. 🎁💐 #WeddingFloraHospitality",
    tag: "ROYAL HOSPITALITY",
  },
  {
    id: "p7",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    likes: "9,120",
    comments: "520",
    caption: "Sacred phere beneath hand-carved floral pillars. The eternal vow of seven steps amidst sacred Sanskrit hymns. 🪔🙏 #SacredPhere #IndianWeddingDecor",
    tag: "SACRED MANDAP",
  },
  {
    id: "p8",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    likes: "6,740",
    comments: "289",
    caption: "The grand Baraat arrives! Vintage convertibles, heritage Dhol beats, and showers of fresh red rose petals. 🥁🚗 #BaraatGoals #PalaceWeddings",
    tag: "GRAND BARAAT",
  },
  {
    id: "p9",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    likes: "5,320",
    comments: "215",
    caption: "Cocktail hour styling under illuminated Mughal banyan trees with bespoke cocktail mixology and brass candelabras. 🍸🕯️ #CocktailNight",
    tag: "BESPOKE STYLING",
  },
];

const highlights = [
  { label: "Mandaps", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80" },
  { label: "Sangeet", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80" },
  { label: "Palaces", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80" },
  { label: "Haldi", img: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=300&q=80" },
  { label: "Decor", img: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=300&q=80" },
  { label: "Vows", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=300&q=80" },
];

export const InstagramShowcase: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstaPost | null>(null);

  return (
    <div className="w-full bg-ivory rounded-2xl border border-gold/30 shadow-[0_10px_40px_rgba(43,43,43,0.06)] overflow-hidden">
      {/* ── Instagram Profile Header Mockup ── */}
      <div className="p-6 sm:p-8 border-b border-gold/20 bg-cream/40">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with live Instagram rainbow ring */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md">
              <div className="w-full h-full rounded-full bg-ivory p-1 overflow-hidden relative">
                <Image
                  src="/images/logo.png"
                  alt="Wedding Flora Instagram Avatar"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-gold to-amber-600 rounded-full p-1 text-white shadow">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Profile details */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h3 className="font-sans font-bold text-lg sm:text-xl text-charcoal flex items-center justify-center sm:justify-start gap-1.5">
                <span>weddingflora_theweddingplanner</span>
                <span title="Verified Planner" className="inline-block text-blue-500">
                  <svg className="w-4 h-4 fill-current inline" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
              </h3>

              <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 sm:pt-0">
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-md bg-gradient-to-r from-gold via-amber-600 to-gold text-white font-sans text-xs font-semibold hover:shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Follow</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  href="/contact"
                  className="px-4 py-1.5 rounded-md bg-ivory border border-gold/40 text-charcoal font-sans text-xs font-semibold hover:bg-gold/10 transition-colors"
                >
                  Enquire
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center sm:justify-start gap-6 text-sm text-charcoal pt-1">
              <div>
                <span className="font-bold">1,480</span> <span className="text-charcoal/80">posts</span>
              </div>
              <div>
                <span className="font-bold">142K</span> <span className="text-charcoal/80">followers</span>
              </div>
              <div>
                <span className="font-bold">380</span> <span className="text-charcoal/80">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="text-xs sm:text-sm text-charcoal/90 space-y-1 font-sans pt-1">
              <p className="font-bold text-charcoal">Wedding Flora | The Wedding Planner 👑</p>
              <p>✨ Curating Royal Indian Destination Weddings &amp; Floral Scenography</p>
              <p>📍 Udaipur • Jaipur • Jodhpur • Delhi NCR • Goa</p>
              <p>🌸 Bespoke Mandaps • Concert-grade Sangeets • Royal Hospitality</p>
              <p className="text-[#8C6D2D] font-semibold pt-1">
                🔗 <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">instagram.com/weddingflora_theweddingplanner</a>
              </p>
            </div>
          </div>
        </div>

        {/* Story Highlights Bar */}
        <div className="mt-8 pt-6 border-t border-gold/15 flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-2">
          {highlights.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] border-2 border-gold/60 group-hover:border-gold transition-colors">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image src={h.img} alt={h.label} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-[11px] font-sans font-semibold text-charcoal group-hover:text-gold transition-colors">
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Photo & Reel Grid (Interactive) ── */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
          {instaPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-charcoal/10"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tag / Type badge in top-right */}
              <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-charcoal/80 text-[10px] uppercase tracking-wider text-ivory font-bold backdrop-blur-md flex items-center gap-1">
                {post.type === "reel" && <Play className="w-2.5 h-2.5 fill-current text-gold" />}
                <span>{post.tag}</span>
              </div>

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-ivory text-center z-10">
                <div className="flex items-center gap-4 text-sm font-bold mb-2">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-ivory text-ivory" /> {post.comments}
                  </span>
                </div>
                <p className="text-[11px] line-clamp-2 text-ivory/90 font-sans">
                  {post.caption}
                </p>
                <span className="mt-3 text-[10px] uppercase tracking-widest text-gold font-bold underline">
                  Click to View Post
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Instagram Profile */}
        <div className="mt-6 text-center pt-4 border-t border-gold/15">
          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-charcoal text-ivory hover:bg-gold-gradient hover:text-charcoal font-sans text-xs uppercase tracking-wider font-bold transition-all shadow-md group"
          >
            <span>Explore Entire Feed on Instagram @weddingflora_theweddingplanner</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* ── Modal Post Preview ── */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl border border-gold/40 relative"
            >
              <button
                onClick={() => setSelectedPost(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-charcoal/80 text-white hover:bg-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video w-full bg-charcoal">
                {selectedPost.videoUrl ? (
                  <video
                    src={selectedPost.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={selectedPost.imageUrl}
                    alt={selectedPost.caption}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden">
                      <Image src="/images/logo-emblem.png" alt="Avatar" fill className="object-contain" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-charcoal block">weddingflora_theweddingplanner</span>
                      <span className="text-[10px] text-charcoal/70">{selectedPost.tag}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-charcoal">
                    <span className="flex items-center gap-1 text-rose-600"><Heart className="w-3.5 h-3.5 fill-current" /> {selectedPost.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {selectedPost.comments}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-charcoal/90 font-sans leading-relaxed">
                  {selectedPost.caption}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-gold/15">
                  <span className="text-[11px] text-[#8C6D2D] font-bold">Official Instagram Post</span>
                  <a
                    href={siteConfig.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-charcoal hover:text-gold transition-colors"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
