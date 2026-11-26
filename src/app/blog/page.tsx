import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Royal Wedding Journal & Guides | Wedding Flora",
  description:
    "Expert destination wedding cost breakdowns, Udaipur vs Jaipur venue guides, NRI planning playbooks, and sacred Vedic ceremony wisdom by Wedding Flora.",
};

export default function BlogHubPage() {
  return <DynamicSubpageView pageKey="blog" />;
}
