import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Royal Rajasthan Wedding Destinations | Wedding Flora",
  description:
    "Explore iconic royal wedding destinations across Rajasthan: Jaipur, Udaipur, Jodhpur, Bikaner, Pushkar, Ranthambore, Jaisalmer, and Jhunjhunu.",
};

export default function DestinationsPage() {
  return <DynamicSubpageView pageKey="destinations" />;
}
