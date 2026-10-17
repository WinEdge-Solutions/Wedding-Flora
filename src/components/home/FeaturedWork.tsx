"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { galleryData, GalleryItem } from "@/lib/content/gallery";

/* ── Luxury Indian Wedding Reel Card ──────────────────────── */
function ReelCard({
  item,
  index,
  inView,
  isMobileActive,
}: {
  item: GalleryItem;
  index: number;
  inView: boolean;
  isMobileActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Desktop hover controls
  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  // Sound toggle
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Live progress bar
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  // Mobile tap-to-toggle
  const handleCardClick = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  // Sync mobile active state from parent carousel
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;
    const video = videoRef.current;
    if (!video) return;

    if (isMobileActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isMobileActive]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: index === 1 ? 24 : 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="group flex flex-col cursor-pointer snap-center w-[84vw] sm:w-[60vw] md:w-auto flex-shrink-0 md:flex-shrink select-none"
      style={{ scrollSnapStop: "always", scrollSnapAlign: "center" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Reel container with 9:16 portrait proportions (compact aspect-4/5 on mobile so it fits in screen) */}
      <div className="relative aspect-[4/5] sm:aspect-[9/16] w-full overflow-hidden bg-[#181513] rounded-[3px] mb-3.5 shadow-[0_8px_30px_rgba(43,43,43,0.08)] group-hover:shadow-[0_20px_45px_rgba(183,154,91,0.25)] transition-all duration-500">
        
        {/* Native Video Element — displays the real Indian wedding reel frame as poster */}
        {item.videoUrl && (
          <video
            ref={videoRef}
            src={`${item.videoUrl}#t=0.001`}
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isPlaying ? "scale-100" : "scale-[1.03] group-hover:scale-100"
            }`}
          />
        )}

        {/* Ambient dark gradient vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30 pointer-events-none" />

        {/* Top Badges: Category (Sangeet / Detailing Decor) + Audio toggle */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10 pointer-events-auto">
          <span className="inline-block bg-charcoal/85 backdrop-blur-md px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold rounded-[2px] border border-gold/40 shadow-sm">
            {item.category}
          </span>

          {item.videoUrl && (
            <button
              onClick={handleToggleMute}
              title={isMuted ? "Unmute reel" : "Mute reel"}
              className="p-1.5 rounded-full bg-charcoal/70 hover:bg-charcoal/90 text-ivory/90 hover:text-gold backdrop-blur-md transition-all duration-300 border border-gold/30 hover:border-gold focus:outline-none"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold" />}
            </button>
          )}
        </div>

        {/* Live golden progress line on playback */}
        {isPlaying && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-charcoal/40 z-20 overflow-hidden pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-gold via-champagne to-gold transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Subtle gold border reveal on hover */}
        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 transition-all duration-500 rounded-[3px] pointer-events-none" />

        {/* Shimmer sweep */}
        <div className="shimmer-card absolute inset-0 pointer-events-none" />
      </div>

      {/* Caption & Location metadata */}
      <div className="space-y-1 px-1">
        <p className="text-[11px] font-sans text-[#8C6D2D] uppercase tracking-[0.2em] font-bold">
          {item.category}
        </p>
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-charcoal font-semibold group-hover:text-gold transition-colors duration-300 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs font-sans text-charcoal/90 font-medium tracking-wide">
          {item.location} • {item.year}
        </p>
        {/* Animated underline */}
        <div className="h-px w-0 group-hover:w-16 bg-gradient-to-r from-gold to-gold/30 transition-all duration-500 mt-2" />
      </div>
    </motion.div>
  );
}

export const FeaturedWork: React.FC = () => {
  const featured = galleryData.slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  // Smooth scroll to card index
  const scrollToIndex = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const cards = el.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  }, []);

  // Update active index on scroll
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.clientWidth * 0.84;
    const newIndex = Math.round(scrollLeft / (cardWidth || 1));
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < featured.length) {
      setActiveIndex(newIndex);
    }
  };

  // 1-swipe gesture detection (light 35px flick immediately jumps to next/prev reel)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 35) {
      if (diff > 0 && activeIndex < featured.length - 1) {
        scrollToIndex(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        scrollToIndex(activeIndex - 1);
      }
    }
  };

  return (
    <Section variant="ivory">
      <Container>
        <SectionHeading
          eyebrow="Royal Celebrations"
          title="Recent Wedding Celebrations"
          subtitle="Glimpses into bespoke Sangeet productions, grand palace Mandaps, and royal celebrations across India. Hover on desktop or swipe on mobile to experience each moment."
        />

        {/* Mobile Swipe Navigation Controls Bar */}
        <div className="md:hidden flex items-center justify-between text-xs text-charcoal mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D2D] font-bold">
              Reel {activeIndex + 1} of {featured.length}
            </span>
          </div>

          {/* Quick Prev / Next Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous reel"
              className="p-1.5 rounded-full border border-gold/30 bg-ivory text-charcoal disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-charcoal" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5 px-1">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to reel ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-5 bg-gold" : "w-1.5 bg-charcoal/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => scrollToIndex(Math.min(featured.length - 1, activeIndex + 1))}
              disabled={activeIndex === featured.length - 1}
              aria-label="Next reel"
              className="p-1.5 rounded-full border border-gold/30 bg-ivory text-charcoal disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-charcoal" />
            </button>
          </div>
        </div>

        {/* Responsive Grid on Desktop / 1-Swipe Smooth Carousel on Mobile */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none gap-4 pb-4 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 lg:gap-10 md:overflow-visible md:mx-0 md:px-0"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {featured.map((item, index) => (
            <ReelCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
              isMobileActive={index === activeIndex}
            />
          ))}
        </div>

        <motion.div
          className="mt-12 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Button href="/portfolio" variant="primary" size="md">
            View All Royal Celebrations
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
