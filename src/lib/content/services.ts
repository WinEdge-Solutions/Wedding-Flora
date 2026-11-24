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
    id: "turnkey-planning",
    title: "Full-Service Turnkey Planning",
    tagline: "Single Point of Contact for End-to-End Palatial Orchestration",
    description:
      "While you focus on making each moment count and soaking it all in, let us do all the work for you. Wedding Flora operates on a turnkey basis for its clients, taking full responsibility as your single point-of-contact for the celebration, from destination and venue selection to planning the honeymoon. We take care of all details of organization, negotiations, meetings, and troubleshooting so you can truly be a guest at your own event.",
    features: [
      "Dedicated Wedding Shadow synchronizing every micro-detail with an entire team",
      "Comprehensive vendor contracts, preferred palace buyout rates & transparent budgets",
      "Master timeline management from first consult to final post-wedding wrap-up",
      "Seamless multi-day orchestration ensuring zero stress for bride, groom & families",
      "360-degree crisis prevention, on-ground medical & power redundancy protocols",
    ],
    imageUrl: "/images/hero-royal-stage.jpg",
  },
  {
    id: "destinations-venues",
    title: "Destinations & Venues",
    tagline: "Curated Royal Palaces, Fortresses & Iconic Waterfronts",
    description:
      "Selecting the perfect stage is the foundation of an unforgettable celebration. We conduct extensive research, organize private site inspections, and negotiate preferred buyouts across Rajasthan's most coveted heritage palaces, beachfront sanctuaries in Goa, and bespoke global destinations.",
    features: [
      "Curated palace & fort procurement across Udaipur, Jaipur, Jodhpur & Goa",
      "Comprehensive technical recces, acoustic audits & spatial flow evaluations",
      "Heritage conservation clearances, government permissions & sound curfew liaison",
      "Guaranteed room blocks, exclusive buyout contracts & favorable payment terms",
    ],
    imageUrl: "/images/destinations/hotels/rambagh-palace.webp",
  },
  {
    id: "design-decor",
    title: "Design & Décor",
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
    id: "experiences",
    title: "Curated Experiences",
    tagline: "Bespoke Cultural Immersions & Regal Heritage Rituals",
    description:
      "A royal Indian wedding is a multi-sensory tapestry. We design bespoke experiences that immerse your guests in authentic Rajasthani grandeur — regal elephant Baraats, vintage motorcades, Sufi evenings by candlelit palace pools, and sacred twilight pheras.",
    features: [
      "Regal Baraat processions with royal brass bands, caparisoned elephants & vintage cars",
      "Enchanting poolside Sufi soirees, candlelit baoris & traditional Rajasthani folk troupes",
      "Sacred Vedic havan coordination with revered pandits & personalized ritual guides",
      "Curated guest immersion: royal perfume bars, safa styling & artisan bangle craftsmen",
    ],
    imageUrl: "/images/service-crystal-reception.jpg",
  },
  {
    id: "artists-entertainment",
    title: "Artists & Entertainment",
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
    id: "food-beverage-catering",
    title: "Food & Beverage Catering",
    tagline: "Royal Palatial Feasts, Master Chefs & Bespoke Mixology",
    description:
      "Culinary artistry fit for royalty. We collaborate with master chefs, royal halwais, and world-class culinary brands to design custom menus that honor regional heritage while delivering contemporary international dining experiences.",
    features: [
      "Curated multi-course royal Rajputana banquets, regional Indian feasts & global cuisines",
      "Private tasting sessions, menu curation & synchronized white-glove service standards",
      "Bespoke molecular mixology bars, signature bridal cocktails & sommelier wine pairing",
      "Interactive live culinary theatres, artisanal dessert salons & midnight chaat streets",
    ],
    imageUrl: "/images/destinations/hotels/fairmont-jaipur.webp",
  },
  {
    id: "invitation-suites-collateral",
    title: "Invitation Suites & Collateral",
    tagline: "Gilded Royal Calligraphy, Bespoke Crests & Digital Portals",
    description:
      "The first whisper of your grand celebration. We craft bespoke invitation suites featuring hand-painted royal motifs, gilded calligraphy, artisanal wax seals, and modern luxury digital RSVP concierge platforms.",
    features: [
      "Custom royal family monogram, bespoke crest design & thematic visual identity",
      "Letterpress, gold foil & silk-screen printed boxed wedding invitation suites",
      "Private interactive digital wedding portals with RSVP tracking & itinerary access",
      "On-site branded collateral: luggage tags, room keycard sleeves, daily newsletters & menus",
    ],
    imageUrl: "/images/hero-bg.jpg",
  },
  {
    id: "hospitality-guest-management",
    title: "Hospitality & Guest Management",
    tagline: "White-Glove Palatial Concierge & 24/7 Guest Care",
    description:
      "Atithi Devo Bhava — treating every guest as royalty. Our dedicated hospitality team manages round-the-clock desks, personalized airport welcomes, room drops, wardrobe care, and instant assistance for all attendees.",
    features: [
      "Dedicated 24/7 airport and hotel hospitality desks with traditional flower garlanding",
      "Express check-in assistance, room key distribution & luggage delivery direct to rooms",
      "On-site guest concierge for saree draping, safa tying, ironing & local errands",
      "VIP bridal and family shadow team ensuring seamless comfort across every ritual",
    ],
    imageUrl: "/images/services/service-hotel-bookings.webp",
  },
  {
    id: "transportation-logistics",
    title: "Transportation & Logistics",
    tagline: "Luxury Chauffeur Fleets, Airport Transfers & Precision Manifests",
    description:
      "Seamless mobility across cities and destinations. We deploy fleets of luxury sedans, private coaches, and vintage royal convertibles, synchronized via real-time flight tracking and digital manifests.",
    features: [
      "Real-time flight tracking & dedicated airport dispatch managers across all terminals",
      "Chauffeured luxury fleets (Mercedes, BMW, Audi) & air-conditioned executive coaches",
      "Vintage Rolls-Royce and open-top royal convertibles for Baraat & couple entries",
      "Dedicated luggage transfer trucks with barcode tagging ensuring zero lost baggage",
    ],
    imageUrl: "/images/services/service-destination-management.webp",
  },
  {
    id: "gifting-hampers",
    title: "Gifting & Hampers",
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
    id: "production-technicals",
    title: "Production & Technicals",
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
    id: "post-wedding-plans",
    title: "Post-Wedding Plans & Honeymoons",
    tagline: "Seamless Wrap-Up, Asset Packing & Bespoke Honeymoon Itineraries",
    description:
      "Our commitment extends beyond the final farewell. We handle post-event vendor reconciliations, systematic packing of bridal trousseaus and wedding gifts, and curate unforgettable royal honeymoon retreats.",
    features: [
      "Systematic packing, cataloging & secured dispatch of bridal outfits, jewelry & gifts",
      "Transparent vendor account reconciliation, deposit recovery & final billing audit",
      "Curated luxury honeymoon itineraries: private island buyouts, palace suites & safaris",
      "Archival-grade wedding album curations & cinematic film master file delivery",
    ],
    imageUrl: "/images/services/service-luxury-offsites.webp",
  },
];

