"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { galleryData, GalleryItem } from "@/lib/content/gallery";

/* ── Luxury Indian Wedding Reel Card ──────────────────────── */
function ReelCard({ item, index, inView }: { item: GalleryItem; index: number; inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Desktop hover controls
  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  const handleMouseLeave = () => {
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

  // Mobile: Autoplay when card enters viewport
  useEffect(() => {
    const cardEl = cardRef.current;
    const videoEl = videoRef.current;
    if (!cardEl || !videoEl) return;

    // Only apply scroll-based autoplay on touch/mobile screens
    if (typeof window !== "undefined" && window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
            videoEl.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            videoEl.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.7 }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: index === 1 ? 24 : 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="group flex flex-col cursor-pointer snap-center min-w-[80vw] sm:min-w-[60vw] md:min-w-0 flex-shrink-0 md:flex-shrink select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Reel container with 9:16 portrait proportions */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#181513] rounded-[3px] mb-4 shadow-[0_8px_30px_rgba(43,43,43,0.08)] group-hover:shadow-[0_20px_45px_rgba(183,154,91,0.25)] transition-all duration-500">
        
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
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isPlaying ? "scale-100" : "scale-[1.03] group-hover:scale-100"
            }`}
          />
        )}

        {/* Ambient dark gradient vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30 pointer-events-none" />

        {/* Top Badges: Category (Sangeet / Detailing Decor) + Audio toggle */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-auto">
          <span className="inline-block bg-charcoal/85 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-semibold rounded-[2px] border border-gold/40 shadow-sm">
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
      <div className="space-y-1.5 px-1">
        <p className="text-[11px] font-sans text-gold uppercase tracking-[0.2em] font-medium">
          {item.category}
        </p>
        <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal group-hover:text-gold transition-colors duration-300 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs font-sans text-warmgrey tracking-wide">
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section variant="ivory">
      <Container>
        <SectionHeading
          eyebrow="Royal Celebrations"
          title="Recent Wedding Celebrations"
          subtitle="Glimpses into bespoke Sangeet productions, grand palace Mandaps, and royal celebrations across India. Hover to experience each moment come to life."
        />

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] text-warmgrey uppercase tracking-wider mb-3 px-1">
          <span>Swipe to explore reels</span>
          <span className="text-gold font-medium">3 Celebrations</span>
        </div>

        {/* Responsive Grid / Mobile Horizontal Swipe Carousel */}
        <div
          ref={ref}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-5 pb-6 -mx-4 px-4 md:grid md:grid-cols-3 md:gap-8 lg:gap-10 md:overflow-visible md:mx-0 md:px-0"
        >
          {featured.map((item, index) => (
            <ReelCard
              key={item.id}
              item={item}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        <motion.div
          className="mt-14 md:mt-20 text-center"
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
