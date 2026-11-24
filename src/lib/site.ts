export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
}

export interface NavItemGroup {
  title: string;
  items: NavSubItem[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
  groups?: NavItemGroup[];
}

export const siteConfig = {
  name: "Wedding Flora",
  tagline: "Royal Grandeur & Bespoke Indian Weddings",
  description:
    "Premier luxury Indian wedding planning, royal palace celebrations, opulent floral mandaps, and bespoke event management across Udaipur, Jaipur, Jodhpur, and Goa.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://weddingflora.com",
  contact: {
    email: "enquiries@weddingflora.com", // TODO: replace with real client email
    phone: "+91 63671 25514",
    address: "D-52, Saket Colony, Shopping Centre, Adarsh Nagar, Jaipur, Rajasthan 302004",
    mapsUrl: "https://maps.app.goo.gl/MfUB3DwYFQhCr4S27",
    instagram: "https://www.instagram.com/weddingflora_theweddingplanner/",
    instagramHandle: "weddingflora_theweddingplanner",
    pinterest: "https://pinterest.com/weddingflora",
    whatsapp: "https://wa.me/916367125514",
  },
  navItems: [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      children: [
        {
          label: "About Us",
          href: "/about",
          description: "Our heritage, philosophy & artistry",
        },
        {
          label: "About Director",
          href: "/about/director",
          description: "The visionary behind Wedding Flora",
        },
      ],
    },
    {
      label: "Services",
      href: "/services",
      children: [
        {
          label: "Planning and reccee process",
          href: "/services#planning-reccee-process",
          description:
            "Comprehensive destination recces, technical audits, budget modeling, and turnkey orchestration.",
        },
        {
          label: "Destination and venue",
          href: "/services#destination-venue",
          description:
            "Procuring iconic palatial estates, private forts, and luxury waterfront sanctuaries.",
        },
        {
          label: "Event styling",
          href: "/services#event-styling",
          description:
            "Architectural 3D floral scenography, bespoke mandaps, and immersive thematic decor.",
        },
        {
          label: "Hospitality and logistics",
          href: "/services#hospitality-logistics",
          description:
            "White-glove 24/7 guest concierge, luxury chauffeur fleets, and airport transfers.",
        },
        {
          label: "Artist & entertainment",
          href: "/services#artist-entertainment",
          description:
            "Celebrity performers, Sufi maestros, symphony orchestras, and folk troupes.",
        },
        {
          label: "Production and technical",
          href: "/services#production-technical",
          description:
            "Concert-grade acoustics, intelligent architectural lighting, and synchronized SFX.",
        },
        {
          label: "Gifting and hampers",
          href: "/services#gifting-hampers",
          description:
            "Artisanal welcome baskets, bespoke room drops, and curated luxury keepsakes.",
        },
        {
          label: "Photography and BTS",
          href: "/services#photography-bts",
          description:
            "Cinematic 4K films, fine-art editorial photography, and same-day social BTS reels.",
        },
      ],
    },
    {
      label: "Wedding Destinations",
      href: "/destinations",
      groups: [
        {
          title: "RAJASTHAN",
          items: [
            { label: "Jaipur", href: "/destinations/jaipur", description: "The Pink City & Grand Royal Palaces" },
            { label: "Udaipur", href: "/destinations/udaipur", description: "City of Lakes & Fairytale Waterfronts" },
            { label: "Jodhpur", href: "/destinations/jodhpur", description: "The Blue City & Majestic Forts" },
            { label: "Bikaner", href: "/destinations/bikaner", description: "Red Sandstone Haveli Sanctuaries" },
            { label: "Pushkar", href: "/destinations/pushkar", description: "Sacred Lake Oasis & Luxury Glamping" },
            { label: "Ranthambore", href: "/destinations/ranthambore", description: "Royal Wilderness & Safari Lodges" },
            { label: "Jaisalmer", href: "/destinations/jaisalmer", description: "The Golden City & Starlit Dunes" },
            { label: "Jhunjhunu", href: "/destinations/jhunjhunu", description: "Shekhawati's Frescoed Havelis" },
          ],
        },
      ],
    },
    { label: "Working Process", href: "/working-process" },
    {
      label: "Gallery",
      href: "/gallery",
      children: [
        {
          label: "Photo Gallery",
          href: "/gallery/photos",
          description: "Opulent mandaps, palace florals & sacred decor",
          icon: "camera",
        },
        {
          label: "Video Gallery",
          href: "/gallery/videos",
          description: "4K cinematic reels & celebration highlights",
          icon: "video",
        },
      ],
    },
    { label: "Celebrations", href: "/celebrations" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};
