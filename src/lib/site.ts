export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Wedding Flora",
  tagline: "Timeless elegance for your special day",
  description:
    "Luxury wedding planning, styling, and coordination tailored to capture the beauty and romance of your love story.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://weddingflora.com",
  contact: {
    email: "enquiries@weddingflora.com", // TODO: replace with real client email
    phone: "+1 (555) 234-5678", // TODO: replace with real client phone
    address: "142 Beverly Hills Avenue, Suite 400", // TODO: replace with real client address
    instagram: "https://instagram.com/weddingflora",
    pinterest: "https://pinterest.com/weddingflora",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
};
