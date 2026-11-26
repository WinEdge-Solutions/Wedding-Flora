import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Celebrations & Royal Wedding Stories | Wedding Flora",
  description:
    "Explore sample stories, real royal weddings, opulent floral mandaps, and grand Sangeet productions curated by Wedding Flora across palaces in India.",
};

export default function CelebrationsPage() {
  return <DynamicSubpageView pageKey="celebrations" />;
}
