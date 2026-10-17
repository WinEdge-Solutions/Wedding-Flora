export interface GalleryItem {
  id: string;
  title: string;
  category: "Estate" | "Destination" | "Garden" | "Floral";
  location: string;
  year: string;
  imageUrl: string;
  aspect: "portrait" | "landscape" | "square";
  alt: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "Château de Varennes Serenade",
    category: "Estate",
    location: "Burgundy, France",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    alt: "Outdoor wedding ceremony setup with white floral arch and rose petals",
  },
  {
    id: "g2",
    title: "Lake Como Botanical Romance",
    category: "Destination",
    location: "Bellagio, Italy",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    alt: "Elegantly set wedding table with crystal glassware, taper candles, and floral centerpieces",
  },
  {
    id: "g3",
    title: "The Cotswolds Secret Garden",
    category: "Garden",
    location: "Gloucestershire, UK",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    alt: "Bride and groom sharing an emotional moment under natural sunlight in a garden setting",
  },
  {
    id: "g4",
    title: "Blush Peony & Garden Rose Dream",
    category: "Floral",
    location: "Provence, France",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    alt: "Artisanal wedding bouquet featuring blush peonies, antique roses, and eucalyptus",
  },
  {
    id: "g5",
    title: "Tuscan Sunset Olive Grove",
    category: "Destination",
    location: "Florence, Italy",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    aspect: "landscape",
    alt: "Romantic alfresco wedding dinner under fairy lights in an olive grove",
  },
  {
    id: "g6",
    title: "Historic Manor Grandeur",
    category: "Estate",
    location: "Charlottesville, Virginia",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    aspect: "portrait",
    alt: "Grand historic estate venue with classical columns and refined floral urns",
  },
];
