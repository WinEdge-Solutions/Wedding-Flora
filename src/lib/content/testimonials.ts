export interface TestimonialItem {
  id: string;
  quote: string;
  couple: string;
  venue: string;
  date: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "Wedding Flora turned our dream palace wedding into pure royalty. From the vibrant Mehendi by Lake Pichola to our starlit Sangeet and ethereal royal Mandap, their attention to every traditional ritual and luxury detail was magnificent.",
    couple: "Aanya & Kabir",
    venue: "The Oberoi Udaivilas, Udaipur",
    date: "November 2025",
  },
  {
    id: "2",
    quote:
      "The decor and floral architecture took everyone's breath away. The team coordinated our 600-guest Baraat, multi-cuisine banquets, and Sufi night with effortless grace. We truly felt like guests at our own wedding.",
    couple: "Meera & Devraj",
    venue: "Rambagh Palace, Jaipur",
    date: "December 2025",
  },
  {
    id: "3",
    quote:
      "Every ritual was honored with immense elegance and modern finesse. Our guests from around the globe are still raving about the royal hospitality, regal procession, and magical fireworks over the lake.",
    couple: "Rhea & Arjun",
    venue: "Umaid Bhawan Palace, Jodhpur",
    date: "January 2025",
  },
];
