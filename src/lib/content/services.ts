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
    id: "varmala-mandap-scenography",
    title: "Sacred Varmala & Royal Mandap Scenography",
    tagline: "Opulent floral arches, rose petal showers & timeless Vedic rituals",
    description:
      "Curating sacred pheras and breathtaking Varmala moments beneath architectural floral domes. Handcrafted with thousands of fragrant roses, cascading blooms, and royal palace backdrops across Rajasthan.",
    features: [
      "Bespoke 3D dome mandap & botanical arch architecture",
      "Celebratory rose petal showers & cold-pyro celebration staging",
      "Vedic pandit matchmaking & sacred fire ergonomics",
      "Royal procession pathways & traditional musical brass bands",
      "Heritage palace courtyard & lakeside mandap procurement",
    ],
    imageUrl: "/images/service-varmala-mandap.jpg",
  },
  {
    id: "palace-night-scenography",
    title: "Regal Palace & Amber Night Scenography",
    tagline: "Illuminated silk canopies, crystal chandeliers & royal night ceremonies",
    description:
      "Transforming historical courtyards into glowing royal night dreamscapes. Featuring warm amber silk drapes, hanging crystal chandeliers, fairy-light canopies, and majestic heritage ambiance.",
    features: [
      "Grand illuminated silk canopies & candlelit walkways",
      "Hand-strung crystal chandeliers & ambient architectural lighting",
      "Heritage palace & fortress night venue styling in Jaipur & Jodhpur",
      "Traditional safa tying & royal family jewellery concierge",
      "Bespoke stage scenography for nighttime Varmalas & receptions",
    ],
    imageUrl: "/images/service-royal-night.jpg",
  },
  {
    id: "crystal-glamour-reception",
    title: "Crystal Glamour & Haute Reception Lounges",
    tagline: "Bespoke velvet seating, celestial crystal curtains & couture styling",
    description:
      "Crafting high-fashion reception stages and intimate couple lounges adorned with shimmering crystal cascades, exotic florals, and plush velvet furnishings tailored for modern royal elegance.",
    features: [
      "Cascading crystal bead curtains & celestial fairy backdrops",
      "Plush velvet vintage sofas & bespoke couple seating",
      "Exotic Dutch floral crescent arches & ambient mood lighting",
      "VIP family lounge clusters & bespoke champagne bars",
      "Cinematic photo-op corners & royal portrait staging",
    ],
    imageUrl: "/images/service-crystal-reception.jpg",
  },
  {
    id: "sangeet-production-dance",
    title: "Sangeet Production & First Dance Magic",
    tagline: "Low-fog clouds, concert-grade acoustics & joyous choreographed celebrations",
    description:
      "Bringing Bollywood glamour and concert-grade energy to your Sangeet and cocktail night. Featuring dreamlike cloud-fog dance floors, intelligent beam lighting, celebrity DJs, and joyous celebrations.",
    features: [
      "Low-lying dry ice fog machines & stage pyrotechnics",
      "Concert-grade acoustics & dynamic intelligent beam lighting",
      "Family choreography direction & celebrity artist management",
      "Spacious customized dance floors with bespoke monogramming",
      "After-party sound, mixology lounges & midnight entertainment",
    ],
    imageUrl: "/images/service-sangeet-dance.jpg",
  },
];
