import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Photo Gallery | Royal Wedding Decor & Mandaps | Wedding Flora",
  description:
    "Explore Wedding Flora's royal photo gallery. High-resolution photography of opulent Vedic mandaps, palace florals, grand Sangeet stages, and regal celebrations across Rajasthan.",
};

export default function PhotoGalleryPage() {
  return <DynamicSubpageView pageKey="gallery" galleryMode="photos" />;
}
