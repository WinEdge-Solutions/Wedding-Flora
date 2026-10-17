export interface PackageTier {
  id: string;
  name: string;
  eyebrow: string;
  priceNote: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const packagesData: PackageTier[] = [
  {
    id: "month-of",
    name: "The Day-Of & Coordination",
    eyebrow: "Flawless Execution",
    priceNote: "Starting from $3,500", // TODO: replace with client pricing or 'Pricing upon enquiry'
    description:
      "For couples who have completed their planning and desire complete tranquility and professional oversight during the final month and wedding day.",
    features: [
      "Master timeline creation & logistical review 6 weeks prior",
      "Vendor communication & arrival schedules finalized",
      "Ceremony rehearsal coordination & direction",
      "10 hours of day-of lead coordination + assistant",
      "Emergency kit on-site and full guest direction",
    ],
    recommended: false,
  },
  {
    id: "full-production",
    name: "The Complete Flora Experience",
    eyebrow: "Our Signature Service",
    priceNote: "Starting from $9,800", // TODO: replace with client pricing
    description:
      "A fully comprehensive planning and design partnership. We bring your romantic vision to life with bespoke curation, meticulous vendor oversight, and breathtaking styling.",
    features: [
      "End-to-end bespoke wedding design & styling boards",
      "Complete venue scouting & curated vendor recommendations",
      "Budget development, payment schedules & contract negotiations",
      "Custom floral installation & tableware design oversight",
      "Unlimited planning sessions & venue walkthroughs",
      "Full rehearsal & all-day wedding event management",
    ],
    recommended: true,
  },
  {
    id: "partial-design",
    name: "The Design & Styling Suite",
    eyebrow: "Visual Mastery",
    priceNote: "Starting from $6,200", // TODO: replace with client pricing
    description:
      "Perfect for couples who have their venue and core vendors booked, but want an experienced editorial eye to elevate their aesthetic, florals, and timeline.",
    features: [
      "Cohesive aesthetic direction: color palette, stationery & textures",
      "Liaison with florists, lighting designers, and rentals",
      "Floor plans, lighting design & tablescape layout",
      "Final 8 weeks timeline coordination & vendor checks",
      "Day-of styling management & coordination team",
    ],
    recommended: false,
  },
];
