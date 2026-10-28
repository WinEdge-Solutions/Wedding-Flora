export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
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
    { label: "Services", href: "/services" },
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
    { label: "Rituals", href: "/rituals" },
    { label: "Gallery", href: "/gallery" },
    { label: "Celebrations", href: "/celebrations" },
    { label: "Blog", href: "/blog" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};
