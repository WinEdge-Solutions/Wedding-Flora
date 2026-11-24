export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface OperationalPillar {
  title: string;
  description: string;
  iconName: string;
}

export const operationalPillars: OperationalPillar[] = [
  {
    title: "Contracts & Negotiations",
    description: "Direct commercial procurement, preferred tariff negotiations, and legally vetted vendor contracts ensuring complete financial transparency.",
    iconName: "FileCheck",
  },
  {
    title: "Master Timeline & Schedules",
    description: "Minute-by-minute critical path run-sheets harmonising Vedic muhurats, artist soundchecks, guest transfers, and ritual ceremonies.",
    iconName: "Clock",
  },
  {
    title: "Arrival & Departure Manifests",
    description: "Real-time flight tracking, dedicated airport concierge desks, and precision manifest synchronization across all transport hubs.",
    iconName: "Plane",
  },
  {
    title: "Room & Fleet Allocation",
    description: "Strategic palace inventory distribution, family VIP suite assignments, and private luxury chauffeur fleet routing.",
    iconName: "Key",
  },
  {
    title: "Dedicated Wedding Shadow Team",
    description: "A private bridal and family shadow brigade synchronizing every micro-detail, safa tying, and immediate need throughout the celebration.",
    iconName: "Crown",
  },
];

export const servicesData: ServiceItem[] = [
  {
    id: "planning-reccee-process",
    title: "Planning and reccee process",
    tagline: "Comprehensive Recces, Muhurat Timelines & Turnkey Palatial Orchestration",
    description:
      "Comprehensive destination recces, technical site audits, commercial negotiations, and minute-by-minute timeline orchestration so you can truly be a guest at your own wedding.",
    features: [
      "Dedicated Wedding Shadow team synchronizing every micro-detail across all ceremonies",
      "In-depth palace & destination recces, spatial flow feasibility & power audits",
      "Master critical path schedules harmonising Vedic muhurats, guest transfers & artists",
      "Transparent budgeting, preferred buyout contract vetting & 360-degree crisis prevention",
    ],
    imageUrl: "/images/hero-royal-stage.jpg",
  },
  {
    id: "destination-venue",
    title: "Destination and venue",
    tagline: "Curated Royal Palaces, Heritage Fortresses & Waterfront Sanctuaries",
    description:
      "Selecting the perfect stage is the foundation of an unforgettable celebration. We conduct extensive research, organize private site inspections, and negotiate preferred buyouts across Rajasthan's most coveted heritage palaces, beachfront sanctuaries in Goa, and bespoke global destinations.",
    features: [
      "Curated palace & fort procurement across Udaipur, Jaipur, Jodhpur & Goa",
      "Guaranteed room blocks, exclusive buyout contracts & favorable payment terms",
      "Heritage conservation clearances, government permissions & sound curfew liaison",
      "Comprehensive technical recces, acoustic audits & spatial flow evaluations",
    ],
    imageUrl: "/images/destinations/hotels/rambagh-palace.webp",
  },
  {
    id: "event-styling",
    title: "Event styling",
    tagline: "Architectural 3D Floral Scenography & Royal Mandap Installations",
    description:
      "Transforming palatial grounds into living works of art. Our architects and floral artists create bespoke thematic environments — from sacred Vedic mandaps adorned with thousands of cascading exotic blossoms to concert-grade starlit galas.",
    features: [
      "Photorealistic 3D spatial mandap visualisations, elevations & guest zoning",
      "Opulent botanical domes handcrafted with fresh seasonal and imported florals",
      "Intelligent architectural lighting, crystal chandeliers & fairy-light canopies",
      "Bespoke royal tablescaping, custom linen weaves, brassware & personalized stationery",
    ],
    imageUrl: "/images/services/service-space-management.webp",
  },
  {
    id: "hospitality-logistics",
    title: "Hospitality and logistics",
    tagline: "White-Glove Palatial Concierge & 24/7 Guest Care",
    description:
      "Atithi Devo Bhava — treating every guest as royalty. Our dedicated hospitality team manages round-the-clock desks, personalized airport welcomes, luxury fleets, room drops, and instant assistance for all attendees.",
    features: [
      "Dedicated 24/7 airport and hotel hospitality desks with traditional flower garlanding",
      "Express check-in assistance, room key distribution & luggage delivery direct to rooms",
      "Chauffeured luxury fleets (Mercedes, BMW, Audi) & air-conditioned executive coaches",
      "On-site guest concierge for saree draping, safa tying, ironing & local errands",
    ],
    imageUrl: "/images/services/service-hotel-bookings.webp",
  },
  {
    id: "artist-entertainment",
    title: "Artist & entertainment",
    tagline: "Celebrity Performers, Sufi Maestros & Symphony Orchestras",
    description:
      "Elevate your celebration into an awe-inspiring spectacle. We curate, contract, and manage headline artists — from renowned Bollywood playback singers and Sufi legends to international symphony ensembles and elite club DJs.",
    features: [
      "Direct contracting of celebrity singers, Sufi maestros, stand-up hosts & emcees",
      "Celebrity choreographers for family Sangeets, custom musical tracks & video edits",
      "Concert-grade line-array acoustics, panoramic LED walls & intelligent beam lighting",
      "Comprehensive artist hospitality, technical riders, security & green-room management",
    ],
    imageUrl: "/images/service-sangeet-dance.jpg",
  },
  {
    id: "production-technical",
    title: "Production and technical",
    tagline: "Concert-Grade Sound, Intelligent Illumination & SFX",
    description:
      "Flawless technical execution behind the glamour. From heavy-duty structural rigging and climate-controlled palace marquees to intelligent moving heads and synchronized cold pyrotechnics.",
    features: [
      "Heavy-duty German aluminium hangars, climate-controlled marquees & rainproof staging",
      "Concert-calibrated audio engineering with line-array systems & sound containment",
      "High-definition curved LED video backdrops, kinetic lighting & 3D projection mapping",
      "Synchronized cold-pyrotechnics, low-lying dry ice clouds, sparkulars & confetti cannons",
    ],
    imageUrl: "/images/destinations/hotels/le-meridien-jaipur-resort-spa.webp",
  },
  {
    id: "gifting-hampers",
    title: "Gifting and hampers",
    tagline: "Artisanal Palatial Welcome Baskets & Curated Favors",
    description:
      "Express your gratitude with unforgettable keepsakes. We design bespoke welcome hampers, room drops, and farewell gifts that showcase India's finest artisanal heritage and luxury culinary delicacies.",
    features: [
      "Bespoke arrival hampers with artisanal sweets, local savories, hangover kits & maps",
      "Handcrafted regional keepsakes: silver-plated artifacts, organic attars & blue pottery",
      "Personalized room drops aligned with daily celebration themes & ritual requirements",
      "Custom luxury packaging, embroidered gift bags & hand-calligraphed thank-you cards",
    ],
    imageUrl: "/images/services/service-social-gatherings.webp",
  },
  {
    id: "photography-bts",
    title: "Photography and BTS",
    tagline: "Cinematic 4K Films, Editorial Fine-Art Imagery & Same-Day Social BTS",
    description:
      "Capturing your family's royal heirlooms with world-class fine-art photographers, cinematic 4K drone cinematography, and dedicated same-day social media BTS content creators.",
    features: [
      "Editorial bridal portraiture & candid photojournalism capturing unscripted sacred emotions",
      "Cinematic 4K teaser reels, feature-length royal documentary films & aerial drone footage",
      "Same-day vertical reel editing formatted for instant family broadcast and Instagram",
      "Dedicated behind-the-scenes (BTS) media team preserving every intimate laugh and tear",
    ],
    imageUrl: "/images/service-crystal-reception.jpg",
  },
];

