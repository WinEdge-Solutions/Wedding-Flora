import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Video Gallery | 4K Cinematic Wedding Reels | Wedding Flora",
  description:
    "Watch Wedding Flora's 4K cinematic wedding reels. High-energy Sangeet nights, royal palace entries, and sacred Vedic wedding films in Udaipur, Jaipur, and Jodhpur.",
};

export default function VideoGalleryPage() {
  return <DynamicSubpageView pageKey="gallery" galleryMode="videos" />;
}
