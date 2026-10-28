export type HotelCategory = 'heritage-palace' | 'luxury-resort' | 'boutique-fort';

export interface HotelVenue {
  name: string;
  slug: string;
  category: HotelCategory;
  categoryLabel: string;
  location: string;
  rooms: number;
  capacity: number;
  image: string;
  shortInfo: string;
  highlights: string[];
  priceTier?: string;
}

export interface DestinationCity {
  id: string;
  name: string;
  tagline: string;
  region: string;
  description: string;
  venues: string[];
  hotels: HotelVenue[];
  vibe: string;
  bestSeason: string;
  imageUrl: string;
}

export interface DestinationRegion {
  region: string;
  description: string;
  cities: DestinationCity[];
}

export const rajasthanDestinations: DestinationCity[] = [
  {
    "id": "jaipur",
    "name": "Jaipur",
    "tagline": "The Pink City • Majestic Palaces & Royal Fortresses",
    "region": "Rajasthan",
    "description": "The undisputed crown jewel of royal Indian weddings. Jaipur blends monumental architecture with opulent heritage hospitality — from grand fireworks over the Aravalli hills to ceremonial elephant welcomes.",
    "venues": [
      "The Leela Palace Jaipur",
      "Fairmont Jaipur",
      "Rambagh Palace",
      "Jai Mahal Palace",
      "Samode Palace, Chomu",
      "Alila Fort Bishangarh"
    ],
    "vibe": "Regal Splendor & Monumental Architecture",
    "bestSeason": "October to March",
    "imageUrl": "/images/service-royal-night.jpg",
    "hotels": [
      {
        "name": "The Leela Palace Jaipur",
        "slug": "the-leela-palace-jaipur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 194,
        "capacity": 400,
        "image": "/images/destinations/hotels/the-leela-palace-jaipur.webp",
        "shortInfo": "Weddings at the Leela Palace redefine luxury with royal architecture, exquisite venues, and bespoke planning that create memorable celebrations.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Hyatt Regency Jaipur Mansarovar",
        "slug": "hyatt-regency-jaipur-mansarovar",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 245,
        "capacity": 500,
        "image": "/images/destinations/hotels/hyatt-regency-jaipur-mansarovar.webp",
        "shortInfo": "Host your wedding at Hyatt Regency Jaipur Mansarovar, where luxury meets elegant Rajasthani charm. Ideal for grand celebrations with premium venues and world-class hospitality.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Curated Destination Hospitality"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Ananta Spa & Resort Jaipur",
        "slug": "ananta-spa-resort-jaipur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 200,
        "capacity": 400,
        "image": "/images/destinations/hotels/ananta-spa-resort-jaipur.webp",
        "shortInfo": "Celebrate your wedding at Ananta Spa & Resort Jaipur, a serene luxury retreat surrounded by the Aravalli hills. Perfect for destination weddings with scenic venues and premium hospitality.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Raffles, Jaipur",
        "slug": "raffles-jaipur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 50,
        "capacity": 100,
        "image": "/images/destinations/hotels/raffles-jaipur.webp",
        "shortInfo": "Host a regal destination wedding at Raffles Jaipur, where timeless luxury meets royal Rajasthani elegance. Perfect for exclusive celebrations with opulent venues and world-class service.",
        "highlights": [
          "50 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Fairmont, Jaipur",
        "slug": "fairmont-jaipur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 245,
        "capacity": 500,
        "image": "/images/destinations/hotels/fairmont-jaipur.webp",
        "shortInfo": "Experience the epitome of royal grandeur at Fairmont Jaipur, the ultimate destination for luxury weddings in the heart of the Aravalli hills.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Le Meridien Jaipur Resort & Spa",
        "slug": "le-meridien-jaipur-resort-spa",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 106,
        "capacity": 250,
        "image": "/images/destinations/hotels/le-meridien-jaipur-resort-spa.webp",
        "shortInfo": "Plan your wedding at Le Meridien Jaipur Resort & Spa, where heritage charm meets modern luxury. Ideal for elegant destination weddings with scenic venues and premium hospitality.",
        "highlights": [
          "106 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Alila Fort Bishangarh",
        "slug": "alila-fort-bishangarh",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 107,
        "capacity": 200,
        "image": "/images/destinations/hotels/alila-fort-bishangarh.webp",
        "shortInfo": "Experience a majestic \"warrior-royal\" wedding at Alila Fort Bishangarh, a 230-year-old heritage fortress offering sweeping panoramic views of the Aravalli hills.",
        "highlights": [
          "107 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Samode Palace, Chomu",
        "slug": "samode-palace-chomu",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 43,
        "capacity": 86,
        "image": "/images/destinations/hotels/samode-palace-chomu.webp",
        "shortInfo": "Experience a majestic destination wedding at Samode Palace, a 475-year-old heritage marvel renowned for its striking Indo-Saracenic architecture and the iconic Sheesh Mahal.",
        "highlights": [
          "43 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Chomu Palace, Chomu",
        "slug": "chomu-palace-chomu",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 100,
        "capacity": 200,
        "image": "/images/destinations/hotels/chomu-palace-chomu.webp",
        "shortInfo": "Celebrate your royal union at Chomu Palace, a striking 300-year-old heritage hotel that seamlessly blends authentic Rajput history with luxury destination wedding amenities.",
        "highlights": [
          "100 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Taj Devi Ratn",
        "slug": "taj-devi-ratn",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 145,
        "capacity": 300,
        "image": "/images/destinations/hotels/taj-devi-ratn.webp",
        "shortInfo": "Experience a vibrant luxury wedding at Taj Devi Ratn, Jaipur, where bold avant-garde architecture meets the ethereal beauty of the Aravalli hills for a truly unique celebration.",
        "highlights": [
          "145 Palatial Rooms",
          "Intimate Royal Setting",
          "Scenic Nature Backdrop"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "The Palace By Park Jewels Hotels And Resorts",
        "slug": "the-palace-by-park-jewels-hotels-and-resorts",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 106,
        "capacity": 350,
        "image": "/images/destinations/hotels/the-palace-by-park-jewels-hotels-and-resorts.webp",
        "shortInfo": "Experience the perfect blend of modern amenities and traditional Rajasthani splendor, making it a premier choice for a spectacular and affordable palace wedding.",
        "highlights": [
          "106 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Bhanwar Singh Palace",
        "slug": "bhanwar-singh-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 120,
        "capacity": 300,
        "image": "/images/destinations/hotels/bhanwar-singh-palace.webp",
        "shortInfo": "Host a regal wedding at Bhanwar Singh Palace, inspired by traditional Rajasthani design. Enjoy grand courtyards, opulent venues, and a royal celebration experience.",
        "highlights": [
          "120 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Anantara Jewel Bagh",
        "slug": "anantara-jewel-bagh",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 150,
        "capacity": 300,
        "image": "/images/destinations/hotels/anantara-jewel-bagh.webp",
        "shortInfo": "Plan a luxury destination wedding at Anantara Jewel Bagh Jaipur, where regal Rajasthani elegance meets world-class hospitality in a serene setting.",
        "highlights": [
          "150 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Jai Mahal Palace",
        "slug": "jai-mahal-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 100,
        "capacity": 200,
        "image": "/images/destinations/hotels/jai-mahal-palace.webp",
        "shortInfo": "Host a royal wedding at Jai Mahal Palace, set amidst lush Mughal gardens. Celebrate with heritage charm, elegant venues, and signature Taj hospitality.",
        "highlights": [
          "100 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Rambagh Palace",
        "slug": "rambagh-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 78,
        "capacity": 160,
        "image": "/images/destinations/hotels/rambagh-palace.webp",
        "shortInfo": "Experience the pinnacle of royal grandeur at Rambagh Palace, Jaipur, the former residence of Maharajas offering an authentic \"rich and royal\" heritage backdrop for a legendary destination wedding.",
        "highlights": [
          "78 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "ITC Rajputana, a Luxury Collection Hotel",
        "slug": "itc-rajputana-a-luxury-collection-hotel",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 218,
        "capacity": 450,
        "image": "/images/destinations/hotels/itc-rajputana-a-luxury-collection-hotel.webp",
        "shortInfo": "Plan a regal wedding at ITC Rajputana with haveli-style architecture and luxurious venues. Enjoy curated experiences and world-class hospitality.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Curated Destination Hospitality"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Sawai Man Mahal",
        "slug": "sawai-man-mahal",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 47,
        "capacity": 50,
        "image": "/images/destinations/hotels/sawai-man-mahal.webp",
        "shortInfo": "Celebrate an ultra-luxury wedding at Sawai Man Mahal, offering refined elegance and exclusive venues. Experience bespoke services and signature Taj hospitality.",
        "highlights": [
          "47 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Mementos by ITC Hotels",
        "slug": "mementos-by-itc-hotels",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 64,
        "capacity": 130,
        "image": "/images/destinations/hotels/mementos-by-itc-hotels.webp",
        "shortInfo": "A 12-acre ITC resort near Kukas at the foot of the Aravali hills, with Mughal-inspired gardens, 64 suites and villas and a lawn for up to 1,000 guests.",
        "highlights": [
          "64 Palatial Rooms",
          "Intimate Royal Setting",
          "Scenic Nature Backdrop"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Indana Palace",
        "slug": "indana-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 118,
        "capacity": 250,
        "image": "/images/destinations/hotels/indana-palace.webp",
        "shortInfo": "Embrace the opulence of a bygone era at Indana Palace, where intricate stone carvings and grand courtyards create a mesmerizing backdrop for a heritage wedding.",
        "highlights": [
          "118 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Buena Vista Luxury Garden Spa Resort",
        "slug": "buena-vista-luxury-garden-spa-resort",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 75,
        "capacity": 104,
        "image": "/images/destinations/hotels/buena-vista-luxury-garden-spa-resort.webp",
        "shortInfo": "Discover a unique fusion of French sophistication and Rajasthani tradition at Buena Vista, an all-villa luxury resort perfect for an intimate boutique wedding.",
        "highlights": [
          "75 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Mundota Fort and Palace",
        "slug": "mundota-fort-and-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 125,
        "capacity": 250,
        "image": "/images/destinations/hotels/mundota-fort-and-palace.webp",
        "shortInfo": "Host a grand wedding at Mundota Fort and Palace, a 450-year-old heritage fort. Enjoy regal venues and timeless charm.",
        "highlights": [
          "125 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "The Raj Palace by Small Luxury Hotels of The World",
        "slug": "the-raj-palace-by-small-luxury-hotels-of-the-world",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 50,
        "capacity": 100,
        "image": "/images/destinations/hotels/the-raj-palace-by-small-luxury-hotels-of-the-world.webp",
        "shortInfo": "Host an incomparable celebration amidst gold-leafed suites and majestic courtyards at this award-winning heritage landmark, the ultimate Jaipur venue for a grand and historic luxury union.",
        "highlights": [
          "50 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Jai bagh Palace",
        "slug": "jai-bagh-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 62,
        "capacity": 130,
        "image": "/images/destinations/hotels/jai-bagh-palace.webp",
        "shortInfo": "Set in the foothills of the Aravallis, Jai Bagh Palace offers a beautiful blend of rustic charm and royal elegance for a scenic destination wedding.",
        "highlights": [
          "62 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Taj Amer",
        "slug": "taj-amer",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 245,
        "capacity": 500,
        "image": "/images/destinations/hotels/taj-amer.webp",
        "shortInfo": "Host a luxury wedding at Taj Amer Jaipur with scenic Aravalli views. Celebrate with elegant venues and refined hospitality.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Scenic Nature Backdrop"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Brij Bageecha",
        "slug": "brij-bageecha",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaipur, Rajasthan",
        "rooms": 20,
        "capacity": 50,
        "image": "/images/destinations/hotels/brij-bageecha.webp",
        "shortInfo": "Celebrate a charming destination wedding at Brij Bageecha, set amidst lush gardens and heritage-inspired design. Experience intimate venues, serene vibes, and bespoke hospitality.",
        "highlights": [
          "20 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "InterContinental Jaipur",
        "slug": "intercontinental-jaipur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 218,
        "capacity": 250,
        "image": "/images/destinations/hotels/intercontinental-jaipur.webp",
        "shortInfo": "Experience the perfect blend of global hospitality and local Rajasthani flair at this premier venue, ideal for large-scale destination weddings and sophisticated receptions.",
        "highlights": [
          "High Room Inventory",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Westin Resort & Spa Jaipur",
        "slug": "westin-resort-spa-jaipur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 135,
        "capacity": 270,
        "image": "/images/destinations/hotels/westin-resort-spa-jaipur.webp",
        "shortInfo": "Plan a serene and luxurious destination wedding at The Westin Resort & Spa, offering a tranquil oasis of lush greenery and elegant modern venues away from the city bustle.",
        "highlights": [
          "135 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "The Ozen Villas Jaipur",
        "slug": "the-ozen-villas-jaipur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 200,
        "capacity": 1000,
        "image": "/images/destinations/hotels/the-ozen-villas-jaipur.webp",
        "shortInfo": "Set in a scenic location where luxury meets natural beauty, our wedding destination resort offers a memorable setting for your special day.",
        "highlights": [
          "High Room Inventory",
          "Grand Lawn & Banquets",
          "Curated Destination Hospitality"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Ananta Spa and Resort Ajabgarh",
        "slug": "ananta-spa-and-resort-ajabgarh",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaipur, Rajasthan",
        "rooms": 135,
        "capacity": 450,
        "image": "/images/destinations/hotels/ananta-spa-and-resort-ajabgarh.webp",
        "shortInfo": "Host a royal destination wedding at Ananta Spa and Resort Ajabgarh near Jaipur  in Rajasthan. Enjoy scenic surroundings, versatile venues, and a memorable wedding experience.",
        "highlights": [
          "135 Palatial Rooms",
          "Expansive Celebrations",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "5-Star Luxury Resort"
      }
    ]
  },
  {
    "id": "udaipur",
    "name": "Udaipur",
    "tagline": "The City of Lakes • Fairytale Waterfront Venues",
    "region": "Rajasthan",
    "description": "Consistently voted among the world's most romantic wedding destinations. Exchange sacred vows surrounded by tranquil waters, shimmering lake palaces, and glowing candlelit ghats beneath starlit skies.",
    "venues": [
      "The Oberoi Udaivilas",
      "The Leela Palace Udaipur",
      "ITC Mementos Udaipur",
      "Taj Aravali Resort & Spa",
      "Shiv Niwas Palace",
      "RAAS Devigarh"
    ],
    "vibe": "Ethereal Romance & Floating Palaces",
    "bestSeason": "September to March",
    "imageUrl": "/images/service-varmala-mandap.jpg",
    "hotels": [
      {
        "name": "ITC Mementos Udaipur",
        "slug": "itc-mementos-udaipur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Udaipur, Rajasthan",
        "rooms": 117,
        "capacity": 234,
        "image": "/images/destinations/hotels/itc-mementos-udaipur.webp",
        "shortInfo": "IWP's top pick in Udaipur: a private 50-acre ITC hill resort with its own lake, 117 suites and villas and lawns for up to 1,000 guests.",
        "highlights": [
          "117 Palatial Rooms",
          "Intimate Royal Setting",
          "Lakeside Romance"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Taj Aravali Resort & Spa",
        "slug": "taj-aravali-resort-spa",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Udaipur, Rajasthan",
        "rooms": 176,
        "capacity": 350,
        "image": "/images/destinations/hotels/taj-aravali-resort-spa.webp",
        "shortInfo": "Plan a luxury wedding at Taj Aravali Resort & Spa, set amidst the scenic Aravalli hills. Celebrate with elegant venues, serene landscapes, and signature Taj hospitality.",
        "highlights": [
          "High Room Inventory",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Aurika Udaipur-Luxury by Lemon Tree Hotels",
        "slug": "aurika-udaipur-luxury-by-lemon-tree-hotels",
        "category": "boutique-fort",
        "categoryLabel": "Boutique & Fort Estate",
        "location": "Udaipur, Rajasthan",
        "rooms": 139,
        "capacity": 280,
        "image": "/images/destinations/hotels/aurika-udaipur-luxury-by-lemon-tree-hotels.webp",
        "shortInfo": "Host a stylish wedding at Aurika Udaipur – Luxury by Lemon Tree Hotels, offering hilltop views and contemporary elegance. Enjoy modern venues and personalized wedding experiences.",
        "highlights": [
          "139 Palatial Rooms",
          "Intimate Royal Setting",
          "Scenic Nature Backdrop"
        ],
        "priceTier": "Boutique Luxury"
      },
      {
        "name": "Raffles Udaipur Resort",
        "slug": "raffles-udaipur-resort",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Udaipur, Rajasthan",
        "rooms": 101,
        "capacity": 200,
        "image": "/images/destinations/hotels/raffles-udaipur-resort.webp",
        "shortInfo": "Celebrate your love at India’s first Raffles, an exclusive private island sanctuary on Udai Sagar Lake offering unparalleled luxury and a \"rich and royal\" European-inspired aesthetic.",
        "highlights": [
          "101 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "The Leela Palace Udaipur",
        "slug": "the-leela-palace-udaipur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 80,
        "capacity": 160,
        "image": "/images/destinations/hotels/the-leela-palace-udaipur.webp",
        "shortInfo": "Experience the pinnacle of lakeside luxury at The Leela Palace, a striking masterpiece of Mewari craftsmanship perfect for an opulent \"rich and royal\" destination wedding.",
        "highlights": [
          "80 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "The Oberoi Udaivilas",
        "slug": "the-oberoi-udaivilas",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Udaipur, Rajasthan",
        "rooms": 87,
        "capacity": 174,
        "image": "/images/destinations/hotels/the-oberoi-udaivilas.webp",
        "shortInfo": "Celebrate your union with unmatched personalized luxury and lakeside views at this architectural marvel, consistently ranked as one of the globe's premier destination wedding venues.",
        "highlights": [
          "87 Palatial Rooms",
          "Intimate Royal Setting",
          "Lakeside Romance"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Trident Hotel Udaipur",
        "slug": "trident-hotel-udaipur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 142,
        "capacity": 290,
        "image": "/images/destinations/hotels/trident-hotel-udaipur.webp",
        "shortInfo": "Set within 43 acres of lush greenery on the banks of Lake Pichola, Trident offers a serene and elegant heritage setting for a beautiful Udaipur wedding.",
        "highlights": [
          "142 Palatial Rooms",
          "Intimate Royal Setting",
          "Lakeside Romance"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "The Ananta Udaipur",
        "slug": "the-ananta-udaipur",
        "category": "boutique-fort",
        "categoryLabel": "Boutique & Fort Estate",
        "location": "Udaipur, Rajasthan",
        "rooms": 243,
        "capacity": 500,
        "image": "/images/destinations/hotels/the-ananta-udaipur.webp",
        "shortInfo": "Host a picturesque hillside wedding at The Ananta, where Balinese-inspired luxury meets the rugged beauty of the Aravalli Range for a unique destination experience.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Scenic Nature Backdrop"
        ],
        "priceTier": "Boutique Luxury"
      },
      {
        "name": "RAAS Devigarh",
        "slug": "raas-devigarh",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 39,
        "capacity": 80,
        "image": "/images/destinations/hotels/raas-devigarh.webp",
        "shortInfo": "Step into an 18th-century fortress palace at RAAS Devigarh, where minimalist modern interiors meet historic Mewari grandeur for a high-fashion, boutique destination wedding.",
        "highlights": [
          "39 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Taj Fatej Prakash Palace",
        "slug": "taj-fatej-prakash-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 65,
        "capacity": 130,
        "image": "/images/destinations/hotels/taj-fatej-prakash-palace.webp",
        "shortInfo": "Celebrate your union within the historic walls of the City Palace complex, where original royal artifacts and Lake Pichola views create an authentic \"rich and royal\" wedding.",
        "highlights": [
          "65 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Shiv Niwas Palace",
        "slug": "shiv-niwas-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 36,
        "capacity": 72,
        "image": "/images/destinations/hotels/shiv-niwas-palace.webp",
        "shortInfo": "Experience the true lifestyle of Maharajas at Shiv Niwas Palace, a crescent-shaped heritage jewel offering an intimate and opulent setting for a royal Udaipur wedding.",
        "highlights": [
          "36 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "The LaLiT Laxmi Vilas Palace",
        "slug": "the-lalit-laxmi-vilas-palace",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 55,
        "capacity": 110,
        "image": "/images/destinations/hotels/the-lalit-laxmi-vilas-palace.webp",
        "shortInfo": "Perched on a hill overlooking Fateh Sagar Lake, this 1911 heritage palace offers a majestic and historic backdrop for a grand \"rich and royal\" wedding celebration.",
        "highlights": [
          "55 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Radisson Blu Palace Resort & Spa",
        "slug": "radisson-blu-palace-resort-spa",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 244,
        "capacity": 500,
        "image": "/images/destinations/hotels/radisson-blu-palace-resort-spa.webp",
        "shortInfo": "Host a grand celebration at this lakeside palace resort, featuring one of Udaipur’s largest ballroom spaces and a beautiful two-tier pool deck for a luxury wedding.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "HolyMont",
        "slug": "holymont",
        "category": "boutique-fort",
        "categoryLabel": "Boutique & Fort Estate",
        "location": "Udaipur, Rajasthan",
        "rooms": 150,
        "capacity": 300,
        "image": "/images/destinations/hotels/holymont.webp",
        "shortInfo": "Plan a personalized and unique destination wedding at this contemporary hilltop retreat, offering a peaceful escape and sophisticated charm in the City of Lakes.",
        "highlights": [
          "150 Palatial Rooms",
          "Intimate Royal Setting",
          "Lakeside Romance"
        ],
        "priceTier": "Boutique Luxury"
      },
      {
        "name": "Fairmont Udaipur",
        "slug": "fairmont-udaipur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 327,
        "capacity": 654,
        "image": "/images/destinations/hotels/fairmont-udaipur.webp",
        "shortInfo": "Experience the ultimate in \"rich and royal\" grandeur at Fairmont Udaipur, a majestic hilltop palace inspired by traditional Mughal architecture and overlooking the rugged Aravalli hills.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Marriott Hotel Udaipur",
        "slug": "marriott-hotel-udaipur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 226,
        "capacity": 500,
        "image": "/images/destinations/hotels/marriott-hotel-udaipur.webp",
        "shortInfo": "Set by Fateh Sagar Lake with the Aravalli Hills as its backdrop, the Udaipur Marriott Hotel blends contemporary luxury with Udaipur’s royal heritage.",
        "highlights": [
          "High Room Inventory",
          "Expansive Celebrations",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Taj Lalit Bagh Udaipur",
        "slug": "taj-lalit-bagh-udaipur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Udaipur, Rajasthan",
        "rooms": 155,
        "capacity": 310,
        "image": "/images/destinations/hotels/taj-lalit-bagh-udaipur.webp",
        "shortInfo": "A wedding at the Taj has meant something special for generations. At the Taj elevate your big day into a memorable and momentous celebration.",
        "highlights": [
          "High Room Inventory",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Royal Palace Collection"
      }
    ]
  },
  {
    "id": "jodhpur",
    "name": "Jodhpur",
    "tagline": "The Blue City • Towering Citadels & Golden Sandstone",
    "region": "Rajasthan",
    "description": "Dominated by the formidable Mehrangarh Fort and the majestic art-deco Umaid Bhawan Palace. Jodhpur offers an unparalleled regal backdrop for couples seeking royal grandeur on a legendary scale.",
    "venues": [
      "Umaid Bhawan Palace",
      "Taj Hari Mahal",
      "Ajit Bhawan Palace",
      "Welcomhotel by ITC Hotels",
      "Radisson Hotel Jodhpur"
    ],
    "vibe": "Legendary Heritage & Art Deco Opulence",
    "bestSeason": "October to March",
    "imageUrl": "/images/service-crystal-reception.jpg",
    "hotels": [
      {
        "name": "Umaid Bhawan Palace, Jodhpur",
        "slug": "umaid-bhawan-palace-jodhpur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jodhpur, Rajasthan",
        "rooms": 71,
        "capacity": 142,
        "image": "/images/destinations/hotels/umaid-bhawan-palace-jodhpur.webp",
        "shortInfo": "Host a royal wedding at Umaid Bhawan Palace, one of the world’s grandest heritage palaces. Celebrate with opulent venues, regal charm, and unmatched luxury.",
        "highlights": [
          "71 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Taj Hari Mahal, Jodhpur",
        "slug": "taj-hari-mahal-jodhpur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jodhpur, Rajasthan",
        "rooms": 93,
        "capacity": 186,
        "image": "/images/destinations/hotels/taj-hari-mahal-jodhpur.webp",
        "shortInfo": "Host a grand wedding celebration at Taj Hari Mahal, where 14th-century Marwar architecture meets modern luxury in a beautiful 450,000-square-foot palatial estate.",
        "highlights": [
          "93 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Radisson Hotel Jodhpur",
        "slug": "radisson-hotel-jodhpur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jodhpur, Rajasthan",
        "rooms": 96,
        "capacity": 192,
        "image": "/images/destinations/hotels/radisson-hotel-jodhpur.webp",
        "shortInfo": "Plan a stylish and convenient destination wedding at Radisson Jodhpur, featuring elegant red-sandstone architecture that reflects the heritage of the \"Blue City.\"",
        "highlights": [
          "96 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Ajit Bhawan, Jodhpur",
        "slug": "ajit-bhawan-jodhpur",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jodhpur, Rajasthan",
        "rooms": 65,
        "capacity": 130,
        "image": "/images/destinations/hotels/ajit-bhawan-jodhpur.webp",
        "shortInfo": "Step into India’s first heritage hotel for an intimate and authentic \"rich and royal\" wedding experience within a beautifully preserved ancestral home of the Jodhpur royal family.",
        "highlights": [
          "65 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Welcomhotel by ITC Hotels, Jodhpur",
        "slug": "welcomhotel-by-itc-hotels-jodhpur",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jodhpur, Rajasthan",
        "rooms": 98,
        "capacity": 196,
        "image": "/images/destinations/hotels/welcomhotel-by-itc-hotels-jodhpur.webp",
        "shortInfo": "Discover the rugged beauty of the Thar Desert at this expansive luxury resort, where traditional Rajasthani design meets eco-conscious modern elegance for a grand wedding retreat.",
        "highlights": [
          "98 Palatial Rooms",
          "Intimate Royal Setting",
          "Desert Dune Setup"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Welcomhotel by ITC Hotels, Fort and Dunes, Khimsar",
        "slug": "welcomhotel-by-itc-hotels-fort-and-dunes-khimsar",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jodhpur, Rajasthan",
        "rooms": 89,
        "capacity": 178,
        "image": "/images/destinations/hotels/welcomhotel-by-itc-hotels-fort-and-dunes-khimsar.webp",
        "shortInfo": "A 1523 Rathore fort and a desert dunes village, 95 km from Jodhpur: 89 rooms, fort lawns, a poolside inside the old walls and an oasis for the sangeet.",
        "highlights": [
          "89 Palatial Rooms",
          "Intimate Royal Setting",
          "Desert Dune Setup"
        ],
        "priceTier": "Royal Palace Collection"
      }
    ]
  },
  {
    "id": "bikaner",
    "name": "Bikaner",
    "tagline": "The Desert Oasis • Red Sandstone Heritage & Courtyards",
    "region": "Rajasthan",
    "description": "Famous for its intricate carved red sandstone architecture and unspoiled regal tranquility. Bikaner provides an intimate, authentic royal palace sanctuary away from commercial wedding circuits.",
    "venues": [
      "The Laxmi Niwas Palace, Bikaner",
      "Narendra Bhawan Bikaner"
    ],
    "vibe": "Timeless Aristocracy & Architectural Intricacy",
    "bestSeason": "November to February",
    "imageUrl": "/images/hero-bg.jpg",
    "hotels": [
      {
        "name": "The Laxmi Niwas Palace, Bikaner",
        "slug": "the-laxmi-niwas-palace-bikaner",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Bikaner, Rajasthan",
        "rooms": 60,
        "capacity": 120,
        "image": "/images/destinations/hotels/the-laxmi-niwas-palace-bikaner.webp",
        "shortInfo": "Host a grand \"rich and royal\" wedding at this red sandstone architectural masterpiece, the former residence of Maharaja Ganga Singh featuring exquisite filigree work and hand-painted friezes.",
        "highlights": [
          "60 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Narendra Bhawan Bikaner",
        "slug": "narendra-bhawan-bikaner",
        "category": "boutique-fort",
        "categoryLabel": "Boutique & Fort Estate",
        "location": "Bikaner, Rajasthan",
        "rooms": 82,
        "capacity": 162,
        "image": "/images/destinations/hotels/narendra-bhawan-bikaner.webp",
        "shortInfo": "Experience a high-fashion boutique wedding at this curated luxury residence, where the eclectic life of the last reigning Maharaja is reflected through sophisticated Art Deco and traditional design.",
        "highlights": [
          "82 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Boutique Luxury"
      }
    ]
  },
  {
    "id": "pushkar",
    "name": "Pushkar",
    "tagline": "Sacred Lake Oasis • Spiritual Aura & Desert Glamping",
    "region": "Rajasthan",
    "description": "A mystical, spiritual setting enveloped by the holy Pushkar Lake and golden sand dunes. Perfect for soul-stirring Vedic pheras, bohemian desert sunset cocktails, and luxury glamping celebrations.",
    "venues": [
      "The Westin Pushkar Resort & Spa",
      "Ananta Spa & Resort",
      "Taj Pushkar Resort & Spa"
    ],
    "vibe": "Spiritual Serenity & Desert Elegance",
    "bestSeason": "October to March",
    "imageUrl": "/images/services/service-social-gatherings.webp",
    "hotels": [
      {
        "name": "The Westin Pushkar Resort & Spa",
        "slug": "the-westin-pushkar-resort-spa",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Pushkar, Rajasthan",
        "rooms": 138,
        "capacity": 300,
        "image": "/images/destinations/hotels/the-westin-pushkar-resort-spa.webp",
        "shortInfo": "Experience a tranquil and \"rich and royal\" destination wedding at this luxury oasis, where elegant villas and serene water bodies are framed by the majestic Aravalli hills.",
        "highlights": [
          "138 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Ananta Spa & Resort",
        "slug": "ananta-spa-resort",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Pushkar, Rajasthan",
        "rooms": 88,
        "capacity": 200,
        "image": "/images/destinations/hotels/ananta-spa-resort.webp",
        "shortInfo": "Plan a striking hillside wedding at Ananta Pushkar, where Balinese-inspired luxury meets traditional Rajasthani charm across 11 acres of lush, sprawling greenery.",
        "highlights": [
          "88 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Taj Pushkar Resort & Spa",
        "slug": "taj-pushkar-resort-spa",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Pushkar, Rajasthan",
        "rooms": 110,
        "capacity": 250,
        "image": "/images/destinations/hotels/taj-pushkar-resort-spa.webp",
        "shortInfo": "Rajasthan's most sacred town finally has a Taj. A 110-key resort of courtyards and arches in the Aravalli foothills, built for intimate and mid-size celebrations.",
        "highlights": [
          "110 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      }
    ]
  },
  {
    "id": "ranthambore",
    "name": "Ranthambore",
    "tagline": "Royal Wilderness • Luxury Jungle Sanctuaries & Glamping",
    "region": "Rajasthan",
    "description": "Where royal Rajasthani heritage embraces wild natural majesty. Celebrate beneath ancient banyan trees, starlit safari canopies, and lavish Mughal-inspired tented palaces nestled in the hills.",
    "venues": [
      "Six Senses Fort Barwara",
      "Nahargarh, Ranthambore",
      "The Oberoi Vanyavilas Wildlife Resort",
      "JW Marriott Ranthambore Resort & Spa",
      "Taj Sawai Ranthambore"
    ],
    "vibe": "Wilderness Romance & Exclusive Safari Luxury",
    "bestSeason": "October to April",
    "imageUrl": "/images/services/service-luxury-offsites.webp",
    "hotels": [
      {
        "name": "Six Senses Fort Barwara",
        "slug": "six-senses-fort-barwara",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Ranthambore, Rajasthan",
        "rooms": 48,
        "capacity": 96,
        "image": "/images/destinations/hotels/six-senses-fort-barwara.webp",
        "shortInfo": "Host an ultra-luxury wedding at Six Senses Fort Barwara, a beautifully restored 14th-century fort. Celebrate with regal venues, wellness experiences, and striking heritage charm.",
        "highlights": [
          "48 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Nahargarh, Ranthambore",
        "slug": "nahargarh-ranthambore",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Ranthambore, Rajasthan",
        "rooms": 99,
        "capacity": 200,
        "image": "/images/destinations/hotels/nahargarh-ranthambore.webp",
        "shortInfo": "Plan a royal wedding at Nahargarh Ranthambore, designed like a traditional Rajput palace. Enjoy grand courtyards, vibrant architecture, and a cultural celebration setting.",
        "highlights": [
          "99 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "The Oberoi Vanyavilas Wildlife Resort",
        "slug": "the-oberoi-vanyavilas-wildlife-resort",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Ranthambore, Rajasthan",
        "rooms": 25,
        "capacity": 50,
        "image": "/images/destinations/hotels/the-oberoi-vanyavilas-wildlife-resort.webp",
        "shortInfo": "Celebrate an intimate luxury wedding at The Oberoi Vanyavilas Wildlife Resort, set near the national park. Experience elegant venues, lush surroundings, and signature Oberoi hospitality.",
        "highlights": [
          "25 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "JW Marriott Ranthambore Resort & Spa",
        "slug": "jw-marriott-ranthambore-resort-spa",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Ranthambore, Rajasthan",
        "rooms": 127,
        "capacity": 254,
        "image": "/images/destinations/hotels/jw-marriott-ranthambore-resort-spa.webp",
        "shortInfo": "Celebrate a grand destination wedding at the luxurious JW Marriott Ranthambore Resort & Spa, set against the dramatic backdrop of Ranthambore National Park.",
        "highlights": [
          "127 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Taj Sawai Ranthambore",
        "slug": "taj-sawai-ranthambore",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Ranthambore, Rajasthan",
        "rooms": 60,
        "capacity": 150,
        "image": "/images/destinations/hotels/taj-sawai-ranthambore.webp",
        "shortInfo": "Celebrate your wedding at Taj Sawai, Ranthambore, where luxury meets nature. With elegant spaces and exceptional hospitality, it offers a memorable setting for a beautiful destination wedding.",
        "highlights": [
          "60 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      }
    ]
  },
  {
    "id": "jaisalmer",
    "name": "Jaisalmer",
    "tagline": "The Golden City • Thar Desert Magic & Sandstone Castles",
    "region": "Rajasthan",
    "description": "Rising like a mirage from the golden sands of the Thar Desert. Jaisalmer delivers an exotic Arabian Nights ambiance featuring flame-lit fortress ramparts, folk musicians, and dune glamping.",
    "venues": [
      "Suryagarh Jaisalmer",
      "Jaisalmer Marriott Resort & Spa",
      "Jaisalkot - A Luxury Boutique Hotel",
      "Storii by ITC Hotels Jaisalmer"
    ],
    "vibe": "Thar Desert Magic & Glowing Golden Forts",
    "bestSeason": "November to March",
    "imageUrl": "/images/services/service-destination-wedding-planning.webp",
    "hotels": [
      {
        "name": "Suryagarh Jaisalmer",
        "slug": "suryagarh-jaisalmer",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaisalmer, Rajasthan",
        "rooms": 101,
        "capacity": 202,
        "image": "/images/destinations/hotels/suryagarh-jaisalmer.webp",
        "shortInfo": "Host a royal desert wedding at Suryagarh Jaisalmer, known for its majestic fort-style architecture. Celebrate with grand courtyards, cultural experiences, and regal luxury.",
        "highlights": [
          "101 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Jaisalmer Marriott Resort & Spa",
        "slug": "jaisalmer-marriott-resort-spa",
        "category": "luxury-resort",
        "categoryLabel": "Luxury 5-Star Resort",
        "location": "Jaisalmer, Rajasthan",
        "rooms": 137,
        "capacity": 274,
        "image": "/images/destinations/hotels/jaisalmer-marriott-resort-spa.webp",
        "shortInfo": "Plan a luxury wedding at Jaisalmer Marriott Resort & Spa, offering modern elegance with desert views. Enjoy spacious venues and world-class hospitality.",
        "highlights": [
          "137 Palatial Rooms",
          "Intimate Royal Setting",
          "Luxury Spa & Wellness"
        ],
        "priceTier": "5-Star Luxury Resort"
      },
      {
        "name": "Jaisalkot - A Luxury Boutique Hotel",
        "slug": "jaisalkot-a-luxury-boutique-hotel",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaisalmer, Rajasthan",
        "rooms": 50,
        "capacity": 100,
        "image": "/images/destinations/hotels/jaisalkot-a-luxury-boutique-hotel.webp",
        "shortInfo": "Step back in time at Jaisalkot, a majestic fort-style estate offering 25 acres of secluded \"rich and royal\" grandeur away from the hustle of the city.",
        "highlights": [
          "50 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      },
      {
        "name": "Storii by ITC Hotels Jaisalmer",
        "slug": "storii-by-itc-hotels-jaisalmer",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jaisalmer, Rajasthan",
        "rooms": 80,
        "capacity": 160,
        "image": "/images/destinations/hotels/storii-by-itc-hotels-jaisalmer.webp",
        "shortInfo": "Discover a bespoke wedding experience at Storii, where timeless heritage and the mystique of Jaisalmer are woven into a curated, high-fashion retreat.",
        "highlights": [
          "80 Palatial Rooms",
          "Intimate Royal Setting",
          "Curated Destination Hospitality"
        ],
        "priceTier": "Royal Palace Collection"
      }
    ]
  },
  {
    "id": "jhunjhunu",
    "name": "Jhunjhunu",
    "tagline": "Shekhawati Splendor • Painted Havelis & Living Open-Air Art",
    "region": "Rajasthan",
    "description": "The cultural epicenter of Shekhawati's open-air fresco art galleries. Step into privately restored aristocratic havelis adorned with antique murals, hand-carved jharokhas, and intimate courtyards.",
    "venues": [
      "Abheygarh, Khetri"
    ],
    "vibe": "Artisanal Frescoes & Aristocratic Heritage",
    "bestSeason": "October to March",
    "imageUrl": "/images/services/service-space-management.webp",
    "hotels": [
      {
        "name": "Abheygarh, Khetri",
        "slug": "abheygarh-khetri",
        "category": "heritage-palace",
        "categoryLabel": "Heritage Palace",
        "location": "Jhunjhunu, Rajasthan",
        "rooms": 99,
        "capacity": 250,
        "image": "/images/destinations/hotels/abheygarh-khetri.webp",
        "shortInfo": "Celebrate a royal wedding at Abheygarh, Khetri, where heritage charm meets luxury. A perfect setting for a memorable destination wedding in Rajasthan.",
        "highlights": [
          "99 Palatial Rooms",
          "Intimate Royal Setting",
          "Royal Ceremonial Entry"
        ],
        "priceTier": "Royal Palace Collection"
      }
    ]
  }
];
