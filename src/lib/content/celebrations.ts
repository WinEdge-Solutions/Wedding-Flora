export interface CelebrationStory {
  id: string;
  slug: string;
  title: string;
  couple: string;
  venue: string;
  location: string;
  season: string;
  guestCount: string;
  coverImage: string;
  tagline: string;
  narrative: string[];
  highlights: string[];
  gallery: {
    url: string;
    caption: string;
  }[];
  quote: {
    text: string;
    author: string;
  };
}

export const celebrationStories: CelebrationStory[] = [
  {
    id: "story-1",
    slug: "aanya-kabir-jagmandir-udaipur",
    title: "A Starlit Palace Fairytale on Lake Pichola",
    couple: "Aanya & Kabir",
    venue: "Jagmandir Island Palace & The Oberoi Udaivilas",
    location: "Udaipur, Rajasthan",
    season: "Winter 2025",
    guestCount: "450 Guests",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    tagline: "30,000 fragrant rajnigandha blooms floating over tranquil royal waters",
    narrative: [
      "Set against the ethereal backdrop of Lake Pichola, Aanya and Kabir's three-day royal wedding was conceived as a living ode to Mewari architecture and heritage poetry. Guests arrived on private royal shikaras lit with brass oil lamps.",
      "The Sangeet was hosted on the marble courtyard of Jagmandir Island with concert-grade acoustics and a 12-piece live Sufi symphony. For the Phere, Wedding Flora created a 360-degree floating floral mandap hand-crafted with white rajnigandha, heritage brass bells, and cascading jasmine strings that perfumed the night air.",
      "As the couple exchanged Varmalas under the moonlight, synchronized cold pyro waterfalls erupted along the island walls, mirrored across the serene lake surface."
    ],
    highlights: [
      "Royal Shikara guest fleet with traditional Shehnai serenades",
      "Floating floral Mandap suspended over Lake Pichola water reflection",
      "12-piece Sufi symphony & Bollywood live band for Sangeet",
      "Signature royal Mewari feast served on silver thalis",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "The sacred floating floral Mandap during twilight vows",
      },
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
        caption: "Starlit lakefront Sangeet stage and acoustic production",
      },
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        caption: "Royal Baraat reception at the historic palace gateway",
      },
      {
        url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
        caption: "Intricate floral rangoli and brass urli table accents",
      },
    ],
    quote: {
      text: "Wedding Flora transformed our wildest royal dreams into reality. Every guest felt like royalty from the moment their shikara docked at Jagmandir. Their attention to sacred details and floral scent was pure magic.",
      author: "Aanya & Kabir Singhania",
    },
  },
  {
    id: "story-2",
    slug: "meera-devraj-rambagh-palace-jaipur",
    title: "Pink City Regal Splendour at Rambagh Palace",
    couple: "Meera & Devraj",
    venue: "Rambagh Palace & Jai Mahal Palace",
    location: "Jaipur, Rajasthan",
    season: "Spring 2025",
    guestCount: "550 Guests",
    coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85",
    tagline: "A majestic Baraat procession with vintage convertibles and rose petal showers",
    narrative: [
      "Meera and Devraj wanted their celebration to honour the timeless grandeur of the Maharajas of Jaipur. The celebration unfolded over four majestic venues across the historic grounds of Rambagh Palace.",
      "The Haldi featured a vibrant sunlit carnival with 20,000 marigold garlands, customized lac bangle artisans from the old bazaars of Jaipur, and a live dhol ensemble. The Baraat saw Devraj arrive in a vintage 1938 Rolls Royce flanked by decorated royal Marwari horses.",
      "The Varmala took place in front of the palace facade illuminated by thousands of clay diyas and warm amber wash lighting, followed by a royal banquet under crystal canopies."
    ],
    highlights: [
      "Grand Marwari horse and vintage Rolls Royce Baraat procession",
      "Traditional Rajasthani lac bangle maker & live puppet shows at Haldi",
      "Rose petal showers dropped from traditional palace balconies",
      "Crystal canopy dining pavilion styled with gilded brass candelabras",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        caption: "Royal palace facade illuminated for the wedding banquet",
      },
      {
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
        caption: "Vibrant yellow marigold Haldi setup on the royal palace lawns",
      },
      {
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
        caption: "Romantic couple portrait under the grand sandstone archways",
      },
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "Sacred pheras inside the lotus-motif hand-carved mandap",
      },
    ],
    quote: {
      text: "The grace and royal poise Wedding Flora brought to our Rambagh Palace wedding left our families speechless. From the vintage cars to the scent of Mogra in every corner, it was unforgettable.",
      author: "Meera & Devraj Rathore",
    },
  },
  {
    id: "story-3",
    slug: "rhea-arjun-umaid-bhawan-jodhpur",
    title: "Sandstone Grandeur & Sufi Nights at Umaid Bhawan",
    couple: "Rhea & Arjun",
    venue: "Umaid Bhawan Palace & Mehrangarh Fort",
    location: "Jodhpur, Rajasthan",
    season: "Autumn 2024",
    guestCount: "600 Guests",
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85",
    tagline: "Golden sandstone ramparts, world-class DJ sets, and bespoke royal hospitality",
    narrative: [
      "Rising majestically above the Blue City of Jodhpur, Umaid Bhawan Palace hosted Rhea and Arjun's high-energy 4-day wedding celebration. The couple wanted to balance traditional royal rituals with world-class modern entertainment.",
      "The welcome dinner kicked off at Mehrangarh Fort with torchlit pathways, Rajasthani folk vocalists, and a grand banquet under the desert sky. The following night, the palace gardens were converted into a concert arena for the Sangeet featuring headliner Bollywood performances.",
      "The wedding ceremony itself was held at sunset under the grand palace dome, with an architectural floral mandap crafted entirely from terracotta tones, tuberoses, and deep burgundy Dutch roses."
    ],
    highlights: [
      "Torchlit welcome dinner atop Mehrangarh Fort ramparts",
      "Hydraulic performance stage with concert line-array sound engineering",
      "Bespoke Safa bar featuring heritage Jodhpuri Leheriya silks",
      "Grand 20-minute fireworks display across the Jodhpur skyline",
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
        caption: "Electrifying Sangeet stage design with dynamic LED visuals",
      },
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
        caption: "Sunset cocktail setup on the Umaid Bhawan palace terrace",
      },
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        caption: "The grand dome mandap adorned with tuberoses and crystal",
      },
      {
        url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
        caption: "Bespoke welcome gift boxes with handmade brass mementos",
      },
    ],
    quote: {
      text: "Not a single beat was missed. Planning a multi-venue destination wedding with 600 international guests seemed daunting until Wedding Flora took charge. Pure perfection.",
      author: "Rhea & Arjun Kapur",
    },
  },
];
