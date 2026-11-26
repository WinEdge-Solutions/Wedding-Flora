import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "About the Director | Wedding Flora • Royal Wedding Planner",
  description:
    "Meet the visionary founder and director behind Wedding Flora — orchestrating royal heritage weddings, bespoke mandap scenography, and luxury celebrations across Udaipur, Jaipur, and beyond.",
};

export default function DirectorPage() {
  return <DynamicSubpageView pageKey="director" />;
}
