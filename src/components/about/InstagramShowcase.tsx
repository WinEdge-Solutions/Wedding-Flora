"use client";

import React, { useState } from "react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import {
  RotateCw,
  Lock,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Film,
  Globe,
  Heart,
} from "lucide-react";

export const InstagramShowcase: React.FC = () => {
  const [iframeKey, setIframeKey] = useState(1);
  const [isReloading, setIsReloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"realtime" | "reels">("reels");

  const profileUrl = "https://www.instagram.com/weddingflora_theweddingplanner/";
  const embedUrl = "https://www.instagram.com/weddingflora_theweddingplanner/embed";

  const handleReload = () => {
    setIsReloading(true);
    setIframeKey((prev) => prev + 1);
    setTimeout(() => {
      setIsReloading(false);
    }, 700);
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[#D4AF37]/40 bg-[#1E1E1E] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-300">
      {/* ══════════════════════════════════════════════════
          1. DUMMY WEBVIEW WINDOW TOP CHROME (macOS Titlebar)
         ══════════════════════════════════════════════════ */}
      <div className="px-4 py-2.5 bg-[#252526] border-b border-[#3E3E42] flex items-center justify-between text-xs select-none">
        {/* Left: Window Traffic Lights + Tab */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-sm" />
          </div>

          {/* Active Tab */}
          <div className="hidden min-[400px]:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-[#1E1E1E] border-t border-x border-[#3E3E42] rounded-t-md text-stone-200 font-sans text-[10px] sm:text-[11px] shadow min-w-0">
            <InstagramIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400 shrink-0" />
            <span className="truncate max-w-[110px] sm:max-w-[260px] font-medium">weddingflora</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" title="Live Connection" />
          </div>
        </div>

        {/* Center: Window Label */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] font-sans font-medium text-stone-400">
          <span className="text-[#D4AF37] font-semibold tracking-wider uppercase text-[10px]">Real-Time Webview</span>
          <span className="text-stone-500">•</span>
          <span className="text-stone-300">Instagram Profile Window</span>
        </div>

        {/* Right: Quick Launch on Instagram */}
        <div className="flex items-center gap-2">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#333336] hover:bg-[#3E3E42] text-stone-200 hover:text-white transition-colors text-[11px] font-semibold"
            title="Open in Instagram App"
          >
            <span>Open in App</span>
            <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          2. DUMMY WEBVIEW NAVIGATION & ADDRESS BAR
         ══════════════════════════════════════════════════ */}
      <div className="p-3 bg-[#1E1E1E] border-b border-[#3E3E42] flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
        {/* Navigation Controls */}
        <div className="flex items-center gap-1.5 shrink-0 text-stone-400">
          <button
            type="button"
            className="p-1.5 rounded hover:bg-[#2D2D30] text-stone-400 hover:text-white transition-colors"
            title="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-[#2D2D30] text-stone-400 hover:text-white transition-colors"
            title="Forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReload}
            className={`p-1.5 rounded hover:bg-[#2D2D30] text-stone-400 hover:text-white transition-colors ${
              isReloading ? "animate-spin text-[#D4AF37]" : ""
            }`}
            title="Reload Live Instagram Feed"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Address Input Pill with SSL Lock */}
        <div className="flex-1 flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#2D2D30] border border-[#3E3E42] text-stone-300 font-mono text-xs shadow-inner">
          <div className="flex items-center gap-2 min-w-0">
            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate select-all text-stone-200">
              https://www.instagram.com/weddingflora_theweddingplanner/
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 rounded hover:bg-[#3E3E42] text-stone-400 hover:text-stone-200 transition-colors"
              title="Copy Profile URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-[#3E3E42] text-stone-400 hover:text-stone-200 transition-colors"
              title="Open profile in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-[#252526] border border-[#3E3E42] shrink-0 text-xs font-sans">
          <button
            type="button"
            onClick={() => setViewMode("realtime")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              viewMode === "realtime"
                ? "bg-[#D4AF37] text-charcoal font-bold shadow-sm"
                : "text-stone-300 hover:text-white hover:bg-[#333336]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Real-Time Feed</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("reels")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              viewMode === "reels"
                ? "bg-[#D4AF37] text-charcoal font-bold shadow-sm"
                : "text-stone-300 hover:text-white hover:bg-[#333336]"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Video Reels</span>
          </button>
        </div>
      </div>

      {/* Animated Loading Bar when reloading */}
      {isReloading && (
        <div className="h-0.5 w-full bg-[#2D2D30] overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] animate-[shimmer_1s_infinite] w-full" />
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          3. REAL-TIME INSTAGRAM PROFILE CONTENT
         ══════════════════════════════════════════════════ */}
      <div className="bg-white min-h-[600px] relative">
        {viewMode === "realtime" ? (
          <div className="w-full flex flex-col items-center justify-center bg-[#FAFAFA]">
            {/* Live Instagram Profile iFrame rendered inside dummy window */}
            <iframe
              key={iframeKey}
              src={embedUrl}
              title="Wedding Flora Real-Time Instagram Profile"
              className="w-full h-[780px] sm:h-[860px] border-0 bg-white"
              loading="eager"
              allowFullScreen
            />
          </div>
        ) : (
          /* Reels Player View */
          <div className="p-6 sm:p-8 space-y-6 bg-ivory">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#8C6D2D] font-bold">
                Royal Wedding Film Archives
              </span>
              <h4 className="font-serif text-2xl font-semibold text-charcoal">
                Watch High-Production Wedding Reels
              </h4>
              <p className="text-xs text-charcoal/80 font-medium">
                Streamed directly from our verified celebration portfolio in Udaipur, Jaipur, and Jodhpur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  id: "r1",
                  title: "Sangeet Night",
                  desc: "Umaid Bhawan Palace, Jodhpur. Sandstone ramparts & royal Sufi melodies.",
                  video: "/videos/reel-1.mp4",
                  poster: "/images/reel-1-poster.jpg",
                  likes: "6,420",
                },
                {
                  id: "r2",
                  title: "Mandap Decor",
                  desc: "Floating Lotus Mandap with 40,000 fragrant Rajnigandhas on Lake Pichola.",
                  video: "/videos/reel-2.mp4",
                  poster: "/images/reel-2-poster.jpg",
                  likes: "8,910",
                },
                {
                  id: "r3",
                  title: "Midnight Sangeet",
                  desc: "Concert-grade acoustics & starlit palace courtyards in Udaipur.",
                  video: "/videos/reel-3.mp4",
                  poster: "/images/reel-3-poster.jpg",
                  likes: "5,830",
                },
              ].map((reel) => (
                <div
                  key={reel.id}
                  className="rounded-2xl overflow-hidden border border-gold/30 bg-charcoal shadow-lg flex flex-col"
                >
                  <div className="relative aspect-[9/16] w-full bg-charcoal">
                    <video
                      src={reel.video}
                      poster={reel.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-charcoal/80 backdrop-blur-md text-[10px] font-bold text-gold uppercase tracking-wider">
                      {reel.title}
                    </div>
                  </div>

                  <div className="p-4 bg-ivory space-y-2 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-charcoal/90 font-medium line-clamp-3">
                      {reel.desc}
                    </p>
                    <div className="pt-2 border-t border-gold/15 flex items-center justify-between text-xs font-bold text-charcoal">
                      <span className="flex items-center gap-1 text-rose-600">
                        <Heart className="w-3.5 h-3.5 fill-current" /> {reel.likes}
                      </span>
                      <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-gold hover:underline flex items-center gap-1"
                      >
                        <span>Watch on App</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          4. DUMMY WEBVIEW STATUS & ACTION FOOTER
         ══════════════════════════════════════════════════ */}
      <div className="p-3 bg-[#252526] border-t border-[#3E3E42] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300 font-sans">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-stone-300">
            Real-Time Profile of <strong className="text-white">@weddingflora_theweddingplanner</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReload}
            className="text-stone-400 hover:text-white transition-colors text-[11px] flex items-center gap-1"
          >
            <RotateCw className="w-3 h-3" />
            <span>Refresh Feed</span>
          </button>
          <span className="text-stone-600">•</span>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-sans text-xs font-bold shadow-sm hover:shadow transition-all"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>Follow on Instagram</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
