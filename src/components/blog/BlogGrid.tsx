"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/content/blog";
import { Search, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BlogGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "ALL", label: "All Guides" },
    { id: "Destination Planning", label: "Destination Planning" },
    { id: "Venue Guides", label: "Venue Guides" },
    { id: "NRI Concierge", label: "NRI Concierge" },
    { id: "Decor & Scenography", label: "Decor & Scenography" },
    { id: "Rituals & Traditions", label: "Rituals & Traditions" },
  ];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "ALL" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Search & Filter Controls ── */}
      <div className="bg-[#090614]/70 backdrop-blur-xl border border-gold/20 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-[0.2em] mb-1">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Expert Planning Compendium</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
              Editorial Insights &amp; Destination Guides
            </h2>
            <p className="text-sm text-ivory/70 mt-1">
              Curated articles and cost blueprints authored by Wedding Flora&apos;s principal directors.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, costs, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-ivory placeholder-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            const count =
              cat.id === "ALL"
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === cat.id).length;

            if (cat.id !== "ALL" && count === 0) return null;

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
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Articles Grid ── */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-[#090614]/40 rounded-2xl border border-white/10 p-8 space-y-4">
          <p className="text-ivory/60 font-serif text-xl">
            No articles found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="text-gold text-xs uppercase tracking-widest font-bold underline hover:text-white"
          >
            Clear Filters &amp; View All Guides
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between bg-[#090614]/80 backdrop-blur-xl border border-white/10 hover:border-gold/60 rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]"
              >
                <div>
                  {/* Cover Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090614] via-[#090614]/20 to-transparent opacity-80" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-midnight/90 backdrop-blur-md text-gold border border-gold/30">
                        {post.category}
                      </span>
                    </div>

                    {/* Reading Time */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] text-ivory/90 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                      <Clock size={12} className="text-gold" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    <div className="text-[11px] text-ivory/50 flex items-center gap-2">
                      <span className="text-gold font-bold uppercase tracking-wider">
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span>By {post.author.name}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-gold transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-ivory/70 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.04] text-ivory/60 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 sm:p-6 pt-0 border-t border-white/5 mt-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="w-full inline-flex items-center justify-between py-2 px-3 rounded-[2px] bg-white/[0.04] hover:bg-gold hover:text-midnight text-ivory text-xs uppercase tracking-wider font-extrabold transition-all border border-white/10 hover:border-gold"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
