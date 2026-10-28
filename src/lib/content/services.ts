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
    id: "destination-wedding-planning",
    title: "Destination Wedding Planning",
    tagline: "Bespoke Royal Celebrations Tailored to Your Sacred Love Story",
    description:
      "Your wedding day should be nothing short of extraordinary. We specialise in planning destination weddings that are as unique as your love story. From selecting scenic palace locations to coordinating with local vendors, we manage every detail so you can focus on enjoying your special day. Our goal is to create a wedding experience that you and your guests will cherish forever.",
    features: [
      "Curated heritage palace & fort procurement across Udaipur, Jaipur, Jodhpur & Goa",
      "End-to-end wedding blueprint, timeline design & transparent financial forecasting",
      "Local vendor ecosystem orchestration, contract negotiation & compliance",
      "Personalized multi-day celebration itineraries for families and guests",
      "Dedicated bridal and groom shadow management on-site throughout rituals",
    ],
    imageUrl: "/images/services/service-destination-wedding-planning.webp",
  },
  {
    id: "destination-management",
    title: "Destination Management",
    tagline: "Flawless On-Ground Logistics, Clearances & Multi-City Execution",
    description:
      "We take the stress out of organizing events in unfamiliar locations. From selecting the perfect venue to managing logistics, we ensure your event is executed flawlessly, regardless of where in the world it takes place. Our expert team handles everything, including local permits, vendor coordination, and cultural nuances, allowing you to enjoy the experience without any worries.",
    features: [
      "End-to-end luxury airport & railway fleet transfers with private chauffeurs",
      "Local municipal permits, sound clearances, police liaison & fire safety",
      "Regional cultural alignment & traditional ritual harmonization",
      "Complete multi-tier contingency planning with uninterrupted power back-up",
      "Comprehensive multi-city vendor and logistics orchestration",
    ],
    imageUrl: "/images/services/service-destination-management.webp",
  },
  {
    id: "space-management",
    title: "Space Management & Scenography",
    tagline: "Transforming Palatial Canvas Into Living Works of Architectural Art",
    description:
      "Your venue is more than just a location; it's the canvas for your event. We specialise in transforming spaces to align perfectly with your event's theme and purpose. Whether it's an empty courtyard or a luxurious ballroom, we optimize the layout, design, and flow to create an environment that is both functional and aesthetically beautiful.",
    features: [
      "3D spatial floorplans, architectural mandap schematics & guest movement zoning",
      "Opulent botanical mandap domes handcrafted with cascading fragrant florals",
      "Intelligent architectural illumination, crystal chandeliers & fairy-light canopies",
      "Royal banquet tablescaping, luxury brassware & bespoke stationery styling",
      "Acoustic zoning, customized dance floors & plush VIP lounge clusters",
    ],
    imageUrl: "/images/services/service-space-management.webp",
  },
  {
    id: "experiential-events",
    title: "Experiential Events & Entertainment",
    tagline: "Immersive Sensory Celebrations & Concert-Grade Production",
    description:
      "We go beyond traditional event planning to create fully immersive experiences that resonate with your audience. From interactive artistic installations to unique entertainment, every element is crafted to leave a lasting impression on your guests. We design celebrations that engage all senses with unforgettable energy and artistry.",
    features: [
      "Curated headline performers: Sufi maestros, Bollywood playback & top DJs",
      "Concert-grade line array acoustics & high-definition panoramic LED walls",
      "Low-lying dry ice cloud fog, celebratory cold-pyro & SFX staging",
      "Celebrity choreographers for family Sangeet performances & custom track mixes",
      "Interactive cultural counters, royal Rajasthani folk troupes & live percussionists",
    ],
    imageUrl: "/images/services/service-experiential-events.webp",
  },
  {
    id: "hotel-bookings",
    title: "Hotel Bookings & Luxury Hospitality",
    tagline: "Atithi Devo Bhava: Exceptional Comfort & Personalized Concierge",
    description:
      "Finding the perfect accommodation for your event is crucial. We offer a comprehensive hotel booking service that ensures you and your guests enjoy the highest standards of comfort and convenience. Whether you need a boutique heritage palace in Rajasthan or a sprawling beachfront resort, we secure the best options to suit your needs and budget.",
    features: [
      "Guaranteed group room blocks & exclusive preferential tariffs",
      "Dedicated personalized check-in hospitality desks with traditional welcomes",
      "Bespoke welcome hampers, personalized itineraries & custom keycards",
      "24/7 guest concierge desk for wardrobe steaming, beauty & local transit",
      "Luxury bridal and family VIP hospitality suites with round-the-clock service",
    ],
    imageUrl: "/images/services/service-hotel-bookings.webp",
  },
  {
    id: "social-gatherings",
    title: "Social Gatherings & Milestone Events",
    tagline: "Reflective Milestone Celebrations From Intimate Dinners to Royal Galas",
    description:
      "Celebrating life's milestones should be as unique as the individuals marking them. We specialise in curating personalised social gatherings, from intimate dinner parties to lavish galas. Our approach is to understand your vision and translate it into an event that is reflective of your personality and taste, ensuring that your guests feel the warmth and joy of the occasion.",
    features: [
      "Themed Mehendi, Haldi, poolside sundowners & starlit cocktail soirees",
      "Royal anniversary galas, milestone birthdays & bespoke engagement ceremonies",
      "Curated gourmet multi-cuisine dining with interactive live culinary stations",
      "Bespoke mixology bars, signature bridal mocktails & sommelier curation",
      "Artisanal return gifts, personalized packaging & handcrafted favors",
    ],
    imageUrl: "/images/services/service-social-gatherings.webp",
  },
  {
    id: "luxury-offsites",
    title: "Luxury Offsites & Bespoke Retreats",
    tagline: "Exclusive Retreats Blending Heritage Splendor, Relaxation & Inspiration",
    description:
      "Take your intimate family circle or executive team beyond the boardroom and into a world of luxury and inspiration. We organise exclusive offsite experiences that blend celebration with rejuvenation. From remote heritage sanctuaries in the hills to beachfront retreats, we handle all aspects of planning, ensuring your gathering is productive, rejuvenating, and truly memorable.",
    features: [
      "Private buyouts of boutique heritage havelis, luxury desert camps & fortresses",
      "Curated wellness itineraries: Ayurvedic spas, morning yoga & royal high teas",
      "Private charter flights, helicopter transfers & vintage car motorcades",
      "Starlit desert dining beneath the dunes with authentic royal hospitality",
      "Curated heritage safaris, cultural walking tours & private polo matches",
    ],
    imageUrl: "/images/services/service-luxury-offsites.webp",
  },
];
