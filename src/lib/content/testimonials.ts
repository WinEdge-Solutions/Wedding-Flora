export interface TestimonialItem {
  id: string;
  quote: string;
  couple: string;
  venue: string;
  location: string;
  date: string;
  imageUrl: string;
  secondaryImageUrl: string;
  tagline: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "Wedding Flora turned our dream palace wedding into pure royalty. From the vibrant Mehendi by Lake Pichola to our starlit Sangeet and ethereal royal Mandap, their attention to every traditional ritual and luxury detail was magnificent.",
    couple: "Aanya & Kabir",
    venue: "The Oberoi Udaivilas & Jagmandir Island",
    location: "Udaipur, Rajasthan",
    date: "November 2025",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    secondaryImageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    tagline: "Lake Pichola Floating Mandap Ceremony",
  },
  {
    id: "2",
    quote:
      "The decor and floral architecture took everyone's breath away. The team coordinated our 600-guest Baraat, multi-cuisine banquets, and Sufi night with effortless grace. We truly felt like guests at our own wedding.",
    couple: "Meera & Devraj",
    venue: "Rambagh Palace & Jai Mahal",
    location: "Jaipur, Rajasthan",
    date: "December 2025",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    secondaryImageUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80",
    tagline: "Historic Sandstone Palace Courtyard Gala",
  },
  {
    id: "3",
    quote:
      "Every ritual was honored with immense elegance and modern finesse. Our guests from around the globe are still raving about the royal hospitality, regal procession, and magical fireworks over the lake.",
    couple: "Rhea & Arjun",
    venue: "Umaid Bhawan Palace",
    location: "Jodhpur, Rajasthan",
    date: "January 2025",
    imageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1600&q=85",
    secondaryImageUrl: "https://images.unsplash.com/photo-1519225438128-406cb75ee6bb?auto=format&fit=crop&w=1000&q=80",
    tagline: "Royal Fortress Sunset Phere & Banquet",
  },
];
