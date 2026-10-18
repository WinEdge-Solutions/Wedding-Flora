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
    id: "royal-mandap-scenography",
    name: "The Royal Mandap & Scenography Suite",
    eyebrow: "Sacred Architectural Grandeur",
    priceNote: "₹ XXXX",
    description:
      "Bespoke floral architecture, sacred Mandap design, fragrant rajnigandha & marigold installations, floral arches, and thematic dining scenography for your key wedding rituals.",
    features: [
      "Custom 3D Mandap architecture tailored to palace or resort heritage",
      "Sacred havan kund setup with scented floral canopies & crystal chandeliers",
      "Grand floral entry walkway with brass urli floating candles",
      "Thematic royal dining tablescapes with custom linen & brass centrepieces",
      "Dedicated floral master craftsmen & day-of styling management",
    ],
    recommended: false,
  },
  {
    id: "complete-regal-wedding",
    name: "The Complete Regal Palace Wedding Experience",
    eyebrow: "Our Signature End-to-End Partnership",
    priceNote: "₹ XXXX",
    description:
      "Our premier 360-degree planning, design, and production partnership. We manage every nuance of your multi-day celebration across Rajasthan, Delhi NCR, or scenic beach sanctuaries.",
    features: [
      "End-to-end multi-day curation (Mehendi, Sangeet, Haldi, Varmala, Reception)",
      "Palace & 5-star destination venue scouting & contract negotiations",
      "Celebrity artist, Sufi ensemble & Bollywood DJ management",
      "Grand Baraat production (vintage Rolls Royce, royal elephants/horses & brass bands)",
      "Bespoke 3D scenography, intelligent concert lighting & cold pyro SFX",
      "24/7 Royal guest concierge, luxury airport transfers & hospitality desks",
      "Bridal & Groom shadow team with round-the-clock coordination",
    ],
    recommended: true,
  },
  {
    id: "sangeet-spectacular",
    name: "The Sangeet Spectacular & Entertainment Suite",
    eyebrow: "Concert-Grade Night of Euphoria",
    priceNote: "₹ XXXX",
    description:
      "Designed for families wanting their Sangeet and cocktail evening transformed into an electric, high-octane concert with stadium acoustics and celebrity curation.",
    features: [
      "Concert-grade line-array acoustics, trussing & hydraulic performance stages",
      "Intelligent beam lights, LED wall pixel mapping & immersive visual graphics",
      "Celebrity emcee, artist bookings & choreographer rehearsals liaison",
      "Thematic royal bar design with signature mixologists & flair bartenders",
      "Synchronized cold pyro, haze atmosphere & midnight after-party coordination",
    ],
    recommended: false,
  },
  {
    id: "destination-concierge",
    name: "The Destination Concierge & Hospitality Suite",
    eyebrow: "Atithi Devo Bhava Excellence",
    priceNote: "₹ XXXX",
    description:
      "Flawless hospitality, logistics, and guest care management for multi-day destination weddings with 200 to 1,000+ traveling guests.",
    features: [
      "Bespoke digital RSVP system & custom family wedding mobile app",
      "Airport & railway luxury fleet transfers with personalized signage",
      "Welcome desk in hotel lobbies with royal aarti & floral tika greetings",
      "Custom wedding hampers, itinerary booklets & bespoke welcome gifts",
      "Safa (turban) tying counters, bindi & bangle bars for ceremonies",
      "Round-the-clock emergency desk, medical liaison & luggage logistics",
    ],
    recommended: false,
  },
];
