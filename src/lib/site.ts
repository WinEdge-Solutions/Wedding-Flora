export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Wedding Flora",
  tagline: "Royal Grandeur & Bespoke Indian Weddings",
  description:
    "Premier luxury Indian wedding planning, royal palace celebrations, opulent floral mandaps, and bespoke event management across Udaipur, Jaipur, Jodhpur, and Goa.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://weddingflora.com",
  contact: {
    email: "enquiries@weddingflora.com", // TODO: replace with real client email
    phone: "+91 98101 23456", // TODO: replace with real client phone
    address: "DLF Phase 5, Golf Course Road, Gurugram, Delhi NCR • Studio in Civil Lines, Jaipur", // TODO: replace with real client address
    instagram: "https://instagram.com/weddingflora",
    pinterest: "https://pinterest.com/weddingflora",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Celebrations", href: "/portfolio" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};
