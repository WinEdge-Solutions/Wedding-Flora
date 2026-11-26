import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Royal Wedding Gallery & Visual Archives | Wedding Flora",
  description:
    "Browse Wedding Flora's luxury wedding gallery. Authentic photography and 4K reels of palace mandaps, grand Sangeet productions, and sacred Vedic ceremonies in Udaipur, Jaipur, and Jodhpur.",
};

export default function GalleryPage() {
  return <DynamicSubpageView pageKey="gallery" galleryMode="all" />;
}
