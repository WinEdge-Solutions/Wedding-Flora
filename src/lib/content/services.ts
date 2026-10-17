export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "full-planning",
    title: "Full Wedding Planning & Design",
    tagline: "From the very first vision to your final dance",
    description:
      "A complete, bespoke planning journey. We oversee every element: budget curation, venue selection, vendor management, design concept, and seamless day-of execution.",
    features: [
      "Custom aesthetic & floral design boards",
      "Comprehensive budget allocation & tracking",
      "Full vendor curation, contracts & negotiations",
      "Unlimited planning meetings & venue walk-throughs",
      "Complete on-site rehearsal & day-of coordination",
    ],
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "partial-planning",
    title: "Partial Planning & Styling",
    tagline: "Expert guidance whenever and wherever you need it",
    description:
      "Designed for couples who have started their planning journey and secured key elements, but desire professional design polish, vendor matchmaking, and logistical expertise.",
    features: [
      "Design styling & stationery harmony",
      "Remaining vendor recommendations & liaison",
      "Timeline creation & logistical auditing",
      "Final venue inspection & walkthrough",
      "Full day-of coordination team on-site",
    ],
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "day-of-coordination",
    title: "Day-of & Month-of Coordination",
    tagline: "Be fully present while we handle every detail",
    description:
      "Four to six weeks prior to your celebration, we step in to take the reins. We review all vendor contracts, construct the master timeline, and orchestrate a flawless celebration.",
    features: [
      "Master minute-by-minute timeline construction",
      "Vendor liaison & arrival confirmation",
      "Ceremony rehearsal direction",
      "Full-day coordination with lead planner and assistant",
      "Emergency kit management & dispute resolution",
    ],
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "floral-decor",
    title: "Floral Styling & Event Decor",
    tagline: "Romantic botanical artistry tailored to your space",
    description:
      "Transforming grand ballrooms, historic estates, and garden pavilions into romantic sanctuaries through exquisite floral arches, tablescapes, and ambient candlelight.",
    features: [
      "Custom botanical archways & ceremony installations",
      "Fine linen, glassware & tableware curation",
      "Artisanal bridal bouquets & personal florals",
      "Warm ambient lighting & candle design",
      "Sustainable post-event floral repurposing",
    ],
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
  },
];
