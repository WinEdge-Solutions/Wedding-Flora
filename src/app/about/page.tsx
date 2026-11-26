import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "About Us | Wedding Flora • The Wedding Planner",
  description:
    "Discover the story, royal heritage philosophy, and floral artistry behind Wedding Flora — luxury Indian wedding planners across Udaipur, Jaipur, Jodhpur, and Delhi NCR.",
};

export default function AboutPage() {
  return <DynamicSubpageView pageKey="about" />;
}
