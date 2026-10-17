"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { galleryData, GalleryItem } from "@/lib/content/gallery";

/* ── Interactive Hover-to-Play Reel Card ─────────────────── */
function ReelCard({ item, index, inView }: { item: GalleryItem; index: number; inView: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleMouseEnter = () => {
    if (!videoRef.current) return;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Autoplay with sound or user policy block fallback
    });
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: index === 1 ? 28 : 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
      className="group flex flex-col cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Reel container with 4:5 vertical proportion */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream rounded-[2px] mb-4 shadow-[0_4px_24px_rgba(43,43,43,0.06)] group-hover:shadow-[0_16px_40px_rgba(183,154,91,0.22)] transition-all duration-500">
        
        {/* Poster image (stays visible while loading or before video starts) */}
        <Image
          src={item.imageUrl}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover transition-opacity duration-700 ease-out ${
            isPlaying ? "opacity-0" : "opacity-100"
          } group-hover:scale-105 transition-transform duration-700`}
        />

        {/* Video Reel */}
        {item.videoUrl && (
          <video
            ref={videoRef}
            src={item.videoUrl}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isPlaying ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        )}

        {/* Gradient shadow overlay for readable captions */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

        {/* Top badges: Reel Tag + Audio toggle */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 bg-charcoal/80 backdrop-blur-md px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory font-medium rounded-[1px] border border-gold/30">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-gold animate-pulse" : "bg-warmgrey"}`} />
            REEL 0{index + 1}
          </span>

          {item.videoUrl && (
            <button
              onClick={handleToggleMute}
              title={isMuted ? "Unmute reel" : "Mute reel"}
              className="p-1.5 rounded-full bg-charcoal/60 hover:bg-charcoal/90 text-ivory/90 hover:text-gold backdrop-blur-md transition-all duration-300 border border-white/10 hover:border-gold/40 focus:outline-none"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold" />}
            </button>
          )}
        </div>

        {/* Center play icon indicator (fades out when hovered/playing) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 pointer-events-none z-10 ${
            isPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"
          }`}
        >
          <div className="w-13 h-13 rounded-full bg-charcoal/60 backdrop-blur-md border border-gold/50 flex items-center justify-center text-gold shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 fill-gold ml-0.5" />
          </div>
          <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ivory/90 font-sans font-medium drop-shadow-sm bg-charcoal/40 px-2 py-0.5 rounded backdrop-blur-sm">
            Hover to play
          </span>
        </div>

        {/* Bottom live video progress line */}
        {isPlaying && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-charcoal/40 z-20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold via-champagne to-gold transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Gold border on hover */}
        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 transition-all duration-500 rounded-[2px] pointer-events-none" />

        {/* Shimmer sweep effect */}
        <div className="shimmer-card absolute inset-0 pointer-events-none" />
      </div>

      {/* Metadata caption below reel */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
            {item.category}
          </span>
          <span className="text-warmgrey/40 text-xs">•</span>
          <span className="text-xs font-sans text-warmgrey uppercase tracking-wider">
            {item.year}
          </span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-xs font-sans text-warmgrey tracking-wide">
          {item.location}
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
          eyebrow="The Portfolio"
          title="Recent Celebrations"
          subtitle="A cinematic glimpse into our heartfelt ceremonies, historic destinations, and bespoke florals. Hover to watch each celebration come to life."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
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
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Button href="/portfolio" variant="primary" size="md">
            View Complete Gallery
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
};
