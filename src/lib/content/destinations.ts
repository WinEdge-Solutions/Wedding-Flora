export interface DestinationCity {
  id: string;
  name: string;
  tagline: string;
  region: string;
  description: string;
  venues: string[];
  vibe: string;
  bestSeason: string;
  imageUrl: string;
}

export interface DestinationRegion {
  region: string;
  description: string;
  cities: DestinationCity[];
}

export const rajasthanDestinations: DestinationCity[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    tagline: "The Pink City • Majestic Palaces & Royal Fortresses",
    region: "Rajasthan",
    description:
      "The undisputed crown jewel of royal Indian weddings. Jaipur blends monumental architecture with opulent heritage hospitality — from grand fireworks over the Aravalli hills to ceremonial elephant welcomes.",
    venues: [
      "Rambagh Palace (The Jewel of Jaipur)",
      "City Palace & The Royal Courtyards",
      "Samode Palace & Bagh",
      "Fairmont Jaipur",
      "The Leela Palace Jaipur",
      "Jai Mahal Palace",
    ],
    vibe: "Regal Splendor & Monumental Architecture",
    bestSeason: "October to March",
    imageUrl: "/images/service-royal-night.jpg",
  },
  {
    id: "udaipur",
    name: "Udaipur",
    tagline: "The City of Lakes • Fairytale Waterfront Venues",
    region: "Rajasthan",
    description:
      "Consistently voted among the world's most romantic wedding destinations. Exchange sacred vows surrounded by tranquil waters, shimmering lake palaces, and glowing candlelit ghats beneath starlit skies.",
    venues: [
      "Taj Lake Palace (Floating Palace)",
      "The Oberoi Udaivilas",
      "The Leela Palace Udaipur",
      "Jagmandir Island Palace",
      "City Palace Complex (Zenana Mahal)",
      "Raffles Udaipur",
    ],
    vibe: "Ethereal Romance & Floating Palaces",
    bestSeason: "September to March",
    imageUrl: "/images/service-varmala-mandap.jpg",
  },
  {
    id: "jodhpur",
    name: "Jodhpur",
    tagline: "The Blue City • Towering Citadels & Golden Sandstone",
    region: "Rajasthan",
    description:
      "Dominated by the formidable Mehrangarh Fort and the majestic art-deco Umaid Bhawan Palace. Jodhpur offers an unparalleled regal backdrop for couples seeking royal grandeur on a legendary scale.",
    venues: [
      "Umaid Bhawan Palace (Art Deco Grandeur)",
      "Mehrangarh Fort (Bespoke Night Receptions)",
      "Ajit Bhawan Palace",
      "Indana Palace Jodhpur",
      "Welcomhotel by ITC Hotels",
    ],
    vibe: "Legendary Heritage & Art Deco Opulence",
    bestSeason: "October to March",
    imageUrl: "/images/service-crystal-reception.jpg",
  },
  {
    id: "bikaner",
    name: "Bikaner",
    tagline: "The Desert Oasis • Red Sandstone Heritage & Courtyards",
    region: "Rajasthan",
    description:
      "Famous for its intricate carved red sandstone architecture and unspoiled regal tranquility. Bikaner provides an intimate, authentic royal palace sanctuary away from commercial wedding circuits.",
    venues: [
      "Laxmi Niwas Palace (Royal Residence of Maharaja Ganga Singh)",
      "Narendra Bhawan Bikaner",
      "Gajner Palace & Lakeside Sanctuary",
      "Heritage Resort Bikaner",
    ],
    vibe: "Timeless Aristocracy & Architectural Intricacy",
    bestSeason: "November to February",
    imageUrl: "/images/hero-bg.jpg",
  },
  {
    id: "pushkar",
    name: "Pushkar",
    tagline: "Sacred Lake Oasis • Spiritual Aura & Desert Glamping",
    region: "Rajasthan",
    description:
      "A mystical, spiritual setting enveloped by the holy Pushkar Lake and golden sand dunes. Perfect for soul-stirring Vedic pheras, bohemian desert sunset cocktails, and luxury glamping celebrations.",
    venues: [
      "The Westin Pushkar Resort & Spa",
      "Ananta Spa & Resort",
      "Pushkar Fort Heritage Resort",
      "Brahma Horizon",
    ],
    vibe: "Spiritual Serenity & Desert Elegance",
    bestSeason: "October to March",
    imageUrl: "/images/services/service-social-gatherings.webp",
  },
  {
    id: "ranthambore",
    name: "Ranthambore",
    tagline: "Royal Wilderness • Luxury Jungle Sanctuaries & Glamping",
    region: "Rajasthan",
    description:
      "Where royal Rajasthani heritage embraces wild natural majesty. Celebrate beneath ancient banyan trees, starlit safari canopies, and lavish Mughal-inspired tented palaces nestled in the hills.",
    venues: [
      "The Oberoi Vanyavilas Wildlife Resort",
      "Suján The Serai / Sher Bagh",
      "Nahargarh Ranthambore (Palatial Fort Setting)",
      "Aman-i-Khás Luxury Tents",
      "Six Senses Fort Barwara",
    ],
    vibe: "Wilderness Romance & Exclusive Safari Luxury",
    bestSeason: "October to April",
    imageUrl: "/images/services/service-luxury-offsites.webp",
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    tagline: "The Golden City • Thar Desert Magic & Sandstone Castles",
    region: "Rajasthan",
    description:
      "Rising like a mirage from the golden sands of the Thar Desert. Jaisalmer delivers an exotic Arabian Nights ambiance featuring flame-lit fortress ramparts, folk musicians, and dune glamping.",
    venues: [
      "Suryagarh Jaisalmer (The Desert Fortress)",
      "Jaisalmer Marriott Resort & Spa",
      "Fort Rajwada",
      "Gorbandh Palace",
      "The Serai Luxury Desert Camp",
    ],
    vibe: "Thar Desert Magic & Glowing Golden Forts",
    bestSeason: "November to March",
    imageUrl: "/images/services/service-destination-wedding-planning.webp",
  },
  {
    id: "jhunjhunu",
    name: "Jhunjhunu",
    tagline: "Shekhawati Splendor • Painted Havelis & Living Open-Air Art",
    region: "Rajasthan",
    description:
      "The cultural epicenter of Shekhawati's open-air fresco art galleries. Step into privately restored aristocratic havelis adorned with antique murals, hand-carved jharokhas, and intimate courtyards.",
    venues: [
      "Alsisar Mahal (17th Century Battle-Hardened Fort)",
      "Castle Mandawa",
      "The Grand Haveli & Resort Nawalgarh",
      "Khandela Haveli",
    ],
    vibe: "Artisanal Frescoes & Aristocratic Heritage",
    bestSeason: "October to March",
    imageUrl: "/images/services/service-space-management.webp",
  },
];
