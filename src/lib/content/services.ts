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
    id: "royal-destinations",
    title: "Royal Palace & Destination Weddings",
    tagline: "Grandeur across Udaipur, Jaipur, Jodhpur & scenic Goa sanctuaries",
    description:
      "Full-service royal wedding planning across heritage fortresses, lakeside palaces, and coastal retreats. We oversee royal hospitality, multi-day itinerary curation, vendor matchmaking, and ceremonial perfection.",
    features: [
      "Heritage palace & 5-star venue procurement",
      "Multi-day function curation (Mehendi, Sangeet, Haldi, Varmala)",
      "Royal Baraat logistics (vintage cars, royal procession, brass bands)",
      "Dedicated guest concierge & airport welcome desks",
      "Comprehensive multi-day budget & contract management",
    ],
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mandap-floral-decor",
    title: "Opulent Mandap & Floral Scenography",
    tagline: "Bespoke floral architecture blending heritage craft with exotic blooms",
    description:
      "Creating breathtaking floral mandaps, grand entry arches, and ethereal dining pavilions using fragrant rajnigandha, marigold cascades, Dutch roses, and crystal chandeliers.",
    features: [
      "Bespoke 3D mandap architecture & sacred fire staging",
      "Scented floral chandeliers & ceiling drapery",
      "Custom entry pathways, floral rangoli & photobooths",
      "Royal dining tablescapes & candlelit walkways",
      "Eco-conscious post-event floral repurposing",
    ],
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sangeet-production",
    title: "Sangeet & Stage Production",
    tagline: "Concert-grade acoustics, bespoke stages & celebrity artist management",
    description:
      "Elevating your Sangeet and cocktail night into an unforgettable concert experience with dynamic intelligent lighting, LED pixel mapping, choreographed performances, and renowned artists.",
    features: [
      "Concert-grade sound engineering & hydraulic stages",
      "Celebrity artists, Bollywood DJs & Sufi troupe bookings",
      "Thematic royal bar design & mixology coordination",
      "SFX, cold pyro, haze effects & synchronised fireworks",
      "Professional family choreography rehearsal direction",
    ],
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hospitality-guest-experience",
    title: "Royal Hospitality & Guest Experience",
    tagline: "Atithi Devo Bhava — seamless care for every distinguished guest",
    description:
      "Providing bespoke royal hospitality for multi-day celebrations: personalized welcome hampers, luxury fleet logistics, round-the-clock guest desks, and customized wedding apps.",
    features: [
      "Curated welcome hampers & bespoke wedding stationery",
      "Luggage assistance & personalized room allocation",
      "Safa (turban) tying & bridal jewellery concierge",
      "Shadow coordination team for the Bride, Groom & families",
      "Round-the-clock emergency hospitality desks",
    ],
    imageUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
  },
];
