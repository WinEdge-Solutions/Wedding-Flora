"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play } from "lucide-react";
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
  isMobileActive = false,
  isDesktop = false,
}: {
  item: GalleryItem;
  index: number;
  inView: boolean;
  isMobileActive?: boolean;
  isDesktop?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Desktop hover controls
  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if (!videoRef.current) return;
    videoRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {});
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

  // Tap-to-toggle
  const handleCardClick = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
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
      animate={inView ? { opacity: 1, y: isDesktop && index === 1 ? 24 : 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="group flex flex-col cursor-pointer w-full select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Reel container with portrait proportions */}
      <div className="relative aspect-[4/5] sm:aspect-[9/16] w-full overflow-hidden bg-[#181513] rounded-[3px] mb-3.5 shadow-[0_8px_30px_rgba(43,43,43,0.08)] group-hover:shadow-[0_20px_45px_rgba(183,154,91,0.25)] transition-all duration-500">
        {/* Native Video Element */}
        {item.videoUrl && (
          <video
            ref={videoRef}
            src={`${item.videoUrl}#t=0.001`}
            poster={item.imageUrl}
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

        {/* Play Icon Overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-charcoal/60 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold shadow-lg group-hover:scale-110 group-hover:bg-charcoal/80 transition-all duration-300">
              <Play className="w-5 h-5 fill-gold translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Ambient dark gradient vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30 pointer-events-none" />

        {/* Top Badges: Category + Audio toggle */}
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

  // Mobile Carousel State — strictly controlled single-slide stepper
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  // Touch gesture handlers: precisely advance ONLY 1 reel per swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    // Detect direction lock on first movement
    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 8 || Math.abs(diffY) > 8) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      // Rubber-band resistance on boundary edges
      let resistedDiff = diffX;
      if (
        (activeIndex === 0 && diffX > 0) ||
        (activeIndex === featured.length - 1 && diffX < 0)
      ) {
        resistedDiff = diffX * 0.25;
      }
      setDragOffset(resistedDiff);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (isHorizontalSwipe.current) {
      // Light flick threshold (35px): strictly advance or retreat by 1 reel ONLY
      if (dragOffset < -35 && activeIndex < featured.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (dragOffset > 35 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }

    setDragOffset(0);
    isHorizontalSwipe.current = null;
  };

  const handleTouchCancel = () => {
    setIsDragging(false);
    setDragOffset(0);
    isHorizontalSwipe.current = null;
  };

  return (
    <Section variant="ivory">
      <Container>
        <div ref={containerRef}>
        <SectionHeading
          eyebrow="Royal Celebrations"
          title="Recent Wedding Celebrations"
          subtitle="Glimpses into bespoke Sangeet productions, grand palace Mandaps, and royal celebrations across India. Hover on desktop or swipe on mobile to experience each moment."
        />

        {/* ── Mobile Carousel Navigation Bar (md:hidden) ── */}
        <div className="md:hidden flex items-center justify-between text-xs text-charcoal mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D2D] font-bold">
              Reel {activeIndex + 1} of {featured.length}
            </span>
          </div>

          {/* Quick Prev / Next Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
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
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to reel ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-5 bg-gold" : "w-1.5 bg-charcoal/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => Math.min(featured.length - 1, prev + 1))}
              disabled={activeIndex === featured.length - 1}
              aria-label="Next reel"
              className="p-1.5 rounded-full border border-gold/30 bg-ivory text-charcoal disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-charcoal" />
            </button>
          </div>
        </div>

        {/* ── Mobile 1-Reel-Per-Swipe Carousel (md:hidden) ── */}
        <div
          className="md:hidden relative w-full overflow-hidden pb-4 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          <div
            className="flex items-center gap-4 will-change-transform"
            style={{
              transform: `translateX(calc(8vw - ${activeIndex} * (84vw + 16px) + ${dragOffset}px))`,
              transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {featured.map((item, index) => (
              <div
                key={item.id}
                className={`w-[84vw] flex-shrink-0 transition-opacity duration-300 ${
                  index === activeIndex ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => {
                  if (index !== activeIndex) {
                    setActiveIndex(index);
                  }
                }}
              >
                <ReelCard
                  item={item}
                  index={index}
                  inView={inView}
                  isMobileActive={index === activeIndex}
                  isDesktop={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop 3-Column Grid (hidden md:grid) ── */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8 lg:gap-10">
          {featured.map((item, index) => (
            <ReelCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
              isMobileActive={false}
              isDesktop={true}
            />
          ))}
        </div>

        <motion.div
          className="mt-12 md:mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Button href="/celebrations" variant="primary" size="md">
            View All Royal Celebrations
          </Button>
        </motion.div>
        </div>
      </Container>
    </Section>
  );
};
