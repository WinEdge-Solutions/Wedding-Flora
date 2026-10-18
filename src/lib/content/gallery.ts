export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  imageUrl: string;
  videoUrl?: string;
  aspect: "portrait" | "landscape" | "square";
  alt: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "The Royal Jodhpur Sangeet & Sufi Night",
    category: "SANGEET",
    location: "Umaid Bhawan Palace, Jodhpur",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/videos/reel-1.mp4",
    aspect: "portrait",
    alt: "Royal Sangeet celebration at Umaid Bhawan Palace, Jodhpur",
  },
  {
    id: "g2",
    title: "Grand Palace Mandap & Floral Scenography",
    category: "DETAILING DECOR",
    location: "The Oberoi Udaivilas, Udaipur",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/videos/reel-2.mp4",
    aspect: "portrait",
    alt: "Opulent Indian wedding mandap and floral decor at Udaivilas",
  },
  {
    id: "g3",
    title: "Starlit Lakefront Sangeet Celebration",
    category: "SANGEET",
    location: "Jagmandir Island Palace, Lake Pichola",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "/videos/reel-3.mp4",
    aspect: "portrait",
    alt: "Grand Sangeet night by the lake at Jagmandir Island Palace",
  },
  {
    id: "g4",
    title: "Golden Hour Mehendi Carnival",
    category: "MEHENDI",
    location: "Fairmont Jaipur, Rajasthan",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    alt: "Vibrant Indian wedding Mehendi celebration in Jaipur",
  },
  {
    id: "g5",
    title: "Regal Varmala & Lakeside Fireworks",
    category: "ROYAL WEDDING",
    location: "The Leela Palace, Udaipur",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    alt: "Royal Varmala ceremony with fireworks over Lake Pichola",
  },
  {
    id: "g6",
    title: "Courtyard Haldi & Marigold Euphoria",
    category: "DETAILING DECOR",
    location: "Taj Falaknuma Palace, Hyderabad",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    alt: "Royal courtyard Haldi ceremony with marigold flowers",
  },
];
