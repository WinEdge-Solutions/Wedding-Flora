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
      "Working with Wedding Flora was the single best decision of our wedding. From our first meeting, they understood our vision of an intimate, timeless Italian-inspired garden celebration. Every detail was executed with absolute perfection.",
    couple: "Eleanor & James",
    venue: "Villa San Michele, Florence",
    date: "September 2025",
  },
  {
    id: "2",
    quote:
      "They brought a level of calm and sophistication that allowed us to truly savor every second of our wedding day. The floral installations were breathtaking—our guests are still talking about how magical the evening felt.",
    couple: "Sophia & Marcus",
    venue: "The Glasshouse Pavilion, Cotswolds",
    date: "June 2025",
  },
  {
    id: "3",
    quote:
      "Flawless elegance from start to finish. Wedding Flora transformed our venue into a poetic sanctuary. We didn't have to worry about a single vendor or timeline detail.",
    couple: "Charlotte & William",
    venue: "Château de Varennes, Burgundy",
    date: "August 2025",
  },
];
