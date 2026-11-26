import React from "react";
import { DynamicSubpageView } from "@/components/cms/DynamicSubpageView";

export const metadata = {
  title: "Our Working Process & Royal Wedding Planning | Wedding Flora",
  description:
    "Explore Wedding Flora's proven 7-step royal working process and the sacred Indian wedding ceremonies we curate — from discovery and palace procurement to 3D floral scenography and royal day-of showtime.",
};

export default function WorkingProcessPage() {
  return <DynamicSubpageView pageKey="workingProcess" />;
}
