export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  alt: string;
  description: string;
  keyPoints: string[];
  deliverable: string;
}

export interface SacredRitual {
  id: string;
  title: string;
  hindiTitle: string;
  significance: string;
  description: string;
  decorVibe: string;
  duration: string;
  image: string;
}

export interface RitualFaq {
  question: string;
  answer: string;
}

export const planningProcessSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discovery & Cultural Alignment",
    subtitle: "The Sacred Beginning",
    tagline: "Let's Get This Celebration Started",
    image: "/images/rituals/process-1.webp",
    alt: "Initial wedding consultation with Wedding Flora directors discussing themes and vision",
    description:
      "Every royal celebration begins with an intimate, unhurried conversation. We sit down with the couple and elders to listen deeply to your dreams, regional customs, astrological muhurats, and personal design inspirations. Capturing your unique family prestige lays the foundation for an unforgettable celebration.",
    keyPoints: [
      "In-depth discovery of family traditions & regional Vedic rites",
      "Astrological muhurat alignment and season recommendations",
      "Guest profile, traveling family logistics, and celebration scale",
      "Creative thematic brainstorming across royal eras and modern luxury",
    ],
    deliverable: "Master Celebration Brief & Vision Narrative",
  },
  {
    stepNumber: "02",
    title: "Palace Hunting & Heritage Scouting",
    subtitle: "Sanctuary Selection",
    tagline: "Venue Hunt Adventure",
    image: "/images/rituals/process-2.webp",
    alt: "Luxury wedding venue selection across heritage forts, palaces and beach resorts",
    description:
      "Embark on a private scouting quest to find the royal setting that speaks to your heart. Whether an ancient fortress in Jaipur, a shimmering lake palace in Udaipur, or a golden sandstone citadel in Jaisalmer, we evaluate technical acoustics, room inventory, and exclusive buyout privileges.",
    keyPoints: [
      "Private palace inspections & exclusive buyout negotiations",
      "Rigorous spatial audit of mandap courtyards, sangeet arenas & lawns",
      "Guest accommodation capacity & luxury suite allocations",
      "Licensing, sound curfews, and heritage preservation protocols",
    ],
    deliverable: "Comparative Venue Matrix & Commercial Feasibility Report",
  },
  {
    stepNumber: "03",
    title: "Tailor-Made Scenography & Artistry",
    subtitle: "The Design Synthesis",
    tagline: "Tailor-Made Wedding Magic",
    image: "/images/rituals/process-3.webp",
    alt: "Custom wedding decor, floral design and menu curation by Wedding Flora",
    description:
      "This is where the magic happens. Our in-house master florists, architects, and lighting scenographers dive into the fine details to craft a celebration that is uniquely yours. From fragrant tubular tuberose canopies and imported hydrangeas to Michelin-grade royal banqueting menus, every touchpoint reflects timeless luxury.",
    keyPoints: [
      "Signature floral mandap architecture and artisanal botanical installations",
      "Bespoke royal banquet curation, silver service & regional delicacies",
      "Ambient architectural palace illumination and lighting design",
      "Artist and musical curation — from classical shehnai to Bollywood headliners",
    ],
    deliverable: "Complete Scenography, Floral & Culinary Blueprint",
  },
  {
    stepNumber: "04",
    title: "Visual Symphony & 3D Dream Board",
    subtitle: "Spatial Precision",
    tagline: "Dream Board Bliss",
    image: "/images/rituals/process-4.webp",
    alt: "Wedding vision board with colour scheme, decor and styling details",
    description:
      "Visualizing your dream before execution is our hallmark. We produce photorealistic 3D renders, physical textile swatch boards, and detailed spatial schematics. You see exact table scapes, lighting perspectives, and floral arrangements before a single petal is placed on-site.",
    keyPoints: [
      "Full-scale 3D spatial renders of mandap, sangeet stage & reception",
      "Physical tactile material boards with brocades, velvets & silk swatches",
      "Custom branding, regal heraldry & bespoke stationery design",
      "Dynamic lighting and pyrotechnic simulation previews",
    ],
    deliverable: "Comprehensive 3D Lookbook & Material Swatch Suite",
  },
  {
    stepNumber: "05",
    title: "Budget Architecture & Governance",
    subtitle: "Financial Clarity",
    tagline: "Budget Bliss",
    image: "/images/rituals/process-5.webp",
    alt: "Transparent wedding budget planning and financial breakdown",
    description:
      "Orchestrating a multi-crore royal celebration while respecting financial stewardship is an art. We craft an itemized, transparent budget architecture that maximizes elegance without fiscal ambiguity. Our established industry stature unlocks preferred wholesale rates with zero hidden markups.",
    keyPoints: [
      "Transparent line-item budget ledger with milestone tracking",
      "Direct tier-1 vendor contracts with zero intermediary surcharges",
      "Strategic value engineering to maximize visual impact",
      "Contingency buffers for weather contingencies & guest variations",
    ],
    deliverable: "Transparent Financial Ledger & Master Contract Directory",
  },
  {
    stepNumber: "06",
    title: "Meticulous Logistics Coordination",
    subtitle: "The Master Blueprint",
    tagline: "The Big Plan",
    image: "/images/rituals/process-6.webp",
    alt: "Wedding logistics coordination and vendor timeline planning",
    description:
      "A flawless destination wedding requires clockwork precision. We orchestrate all logistical arteries — from chartered air transfers and palace baggage tag systems to artist technical riders and vendor coordination. Every participant knows their exact role and timing so you experience effortless joy.",
    keyPoints: [
      "Minute-by-minute multi-day master run-of-show timeline",
      "Airport VIP reception desks, vintage coach transfers & luggage drop-offs",
      "Artist technical rehearsals, green room management & sound engineering",
      "Dedicated personal shadow concierges for bride, groom & parents",
    ],
    deliverable: "Synchronized Multi-Day Production Master Timeline",
  },
  {
    stepNumber: "07",
    title: "Showtime & Royal Day Execution",
    subtitle: "White-Glove Grandeur",
    tagline: "Showtime!",
    image: "/images/rituals/process-7.webp",
    alt: "Live wedding day execution and event coordination by Wedding Flora",
    description:
      "The day you have envisioned has arrived. Our principal planning directors and discreet on-ground production command center oversee every single cue with poise and authority. While we handle all backstage choreography, you and your family celebrate your eternal bond in sheer peace and royal grandeur.",
    keyPoints: [
      "On-site command center with encrypted walkie-talkie synchronization",
      "Seamless pandit coordination, sacred havan wood & samagri staging",
      "White-glove guest assistance, beverage service & elder care",
      "Flawless transition management between ceremonies without delays",
    ],
    deliverable: "Effortless Regal Execution & Unforgettable Memories",
  },
];

export const sacredRitualsList: SacredRitual[] = [
  {
    id: "ganesh-pujan",
    title: "Ganesh Pujan & Mandap Muhurat",
    hindiTitle: "श्री गणेश पूजन एवं मंडप मुहूर्त",
    significance: "Invoking Lord Ganesha to remove obstacles and bless the sanctified wedding grounds.",
    description:
      "The auspicious commencement of all Indian wedding celebrations. Performed with revered Vedic priests, the ritual cleanses the ceremony spaces with sacred mantras, holy water, and fragrant sandalwood, enveloping the upcoming days in spiritual grace.",
    decorVibe: "Auspicious yellow marigold garlands, brass urns, betel leaves, and traditional rangolis.",
    duration: "1 to 2 Hours (Morning Muhurat)",
    image: "/images/services/service-space-management.webp",
  },
  {
    id: "mehendi",
    title: "Mehendi Ki Raat & Chooda",
    hindiTitle: "मेहंदी की रात एवं चूड़ा रस्म",
    significance: "Adorning the bride's hands and feet with intricate bridal henna as a symbol of prosperity and love.",
    description:
      "A vibrant, music-filled afternoon celebration under colorful sunshades or palace courtyards. Skilled artists apply intricate botanical henna motifs while family members sing traditional folk suhaag songs amidst laughter, cocktails, and live bangle-making stalls.",
    decorVibe: "Bohemian silk draperies, lively Rajasthani cushions, fragrant floral jewelry, and flute melodies.",
    duration: "4 to 6 Hours (Afternoon into Evening)",
    image: "/images/services/service-mehendi-carnival.webp",
  },
  {
    id: "haldi",
    title: "Haldi & Phoolon Ki Holi",
    hindiTitle: "हल्दी एवं फूलों की होली",
    significance: "Purifying and blessing the bride and groom with fragrant turmeric paste for an auspicious glow.",
    description:
      "A jubilant ceremony of affection and laughter. Families apply golden saffron-infused turmeric paste onto the bride and groom. At Wedding Flora, we culminate the ceremony with an ethereal Phoolon Ki Holi — a shower of thousands of fresh rose and marigold petals.",
    decorVibe: "Sunshine-yellow fabrics, terracotta urli vessels, brass bells, and cascades of fresh marigold blooms.",
    duration: "2 to 3 Hours (Morning)",
    image: "/images/services/service-haldi-sanctuary.webp",
  },
  {
    id: "sangeet",
    title: "The Royal Sangeet Gala & Cocktails",
    hindiTitle: "शाही संगीत एवं कॉकटेल संध्या",
    significance: "The grand musical union where both families celebrate love through dance and song.",
    description:
      "An electrifying night of high-production performances, concert sound engineering, and celebratory glamour. From professionally choreographed family dance face-offs to live celebrity performances, the Sangeet is an unforgettable sensory spectacle beneath illuminated palace facades.",
    decorVibe: "Midnight crystal chandeliers, LED tunnel entrances, mirror-dance floors, and bespoke cocktail lounges.",
    duration: "5 to 7 Hours (Evening into Late Night)",
    image: "/images/services/service-sangeet-spectacular.webp",
  },
  {
    id: "shahi-baraat",
    title: "The Shahi Baraat & Swagat",
    hindiTitle: "शाही बारात एवं भव्य स्वागत",
    significance: "The groom's regal royal procession accompanied by joyous dancing and aristocratic family welcome.",
    description:
      "A spectacle of princely pomp. The groom arrives in a vintage open-top convertible or atop a royally caparisoned horse, escorted by energetic brass bands, dhol players, and fireworks. At the palace gates, the bride's family welcomes them with traditional royal aarti and rose water sprays.",
    decorVibe: "Torches, royal saffron turbans, velvet chhatras (umbrellas), dhol drums, and rose petal cannons.",
    duration: "2 to 3 Hours (Sunset / Dusk)",
    image: "/images/services/service-shahi-baraat.webp",
  },
  {
    id: "jaimala-pheras",
    title: "Vedic Pheras & Sacred Varmala",
    hindiTitle: "वैदिक फेरे एवं पावन वरमाला",
    significance: "The sacred heart of the wedding: the exchange of floral garlands and the 7 sacred steps around Agni.",
    description:
      "Under an architecturally magnificent mandap, the couple exchanges fragrant floral varmalas. Guided by learned Vedic scholars reciting timeless Sanskrit mantras, they take the sacred Saptapadi (seven circumambulations) around the holy fire, sealing their eternal bond of devotion.",
    decorVibe: "Floating mandap over palace waterbodies, fragrant tuberoses, carved sandstone pillars, and sacred ghee lamps.",
    duration: "2 to 3 Hours (Night Muhurat)",
    image: "/images/services/service-sacred-vedic-mandap.webp",
  },
  {
    id: "vidaai",
    title: "Kanyadaan & The Emotional Vidaai",
    hindiTitle: "कन्यादान एवं भावुक विदाई",
    significance: "The profound parental blessing of giving away the daughter and her emotional journey to her new life.",
    description:
      "A deeply poignant moment where parents bestow their most sacred blessings. As the bride tosses handfuls of rice over her shoulder to wish prosperity upon her maternal home, she steps into an illuminated palanquin or flower-adorned vintage car amidst bittersweet tears and heartfelt love.",
    decorVibe: "Soft candlelit lanterns, gentle violin or sitar acoustics, white petal pathways, and floral palanquins.",
    duration: "1 Hour (Post-Pheras)",
    image: "/images/services/service-curated-entertainment.webp",
  },
  {
    id: "reception",
    title: "The Grand Royal Reception",
    hindiTitle: "भव्य शाही रिसेप्शन",
    significance: "The first formal appearance of the newly married couple to society, celebrated with banquet feast.",
    description:
      "A black-tie evening of sophisticated luxury, heartfelt speeches, champagne toasts, and Michelin-inspired royal dining. Guests greet the newlyweds against a backdrop of royal palace ramparts, while classical symphonies and smooth jazz set an atmosphere of refined joy.",
    decorVibe: "Cascading wisteria ceilings, bespoke mirror tables, monogrammed ice sculptures, and champagne towers.",
    duration: "4 to 5 Hours (Evening)",
    image: "/images/services/service-grand-reception.webp",
  },
];

export const ritualsFaqs: RitualFaq[] = [
  {
    question: "How do you align traditional Vedic rituals with luxury hotel logistics?",
    answer:
      "Our directors work closely with your family’s Rajpurohit (family priest) and the palace management. We establish exact muhurat windows well in advance, ensuring havan permits, sacred fire safety compliance, and sound permissions are seamlessly handled without ever interrupting the sanctity of the rituals.",
  },
  {
    question: "Can Wedding Flora arrange learned Vedic priests and authentic puja samagri?",
    answer:
      "Yes. We collaborate with esteemed Vedic scholars versed in North Indian, South Indian, Marwari, Punjabi, and Gujarati traditions. We source 100% authentic sacred samagri, including pure Cow Ghee, organic haldi, fresh gangajal, mango wood for havan, and fresh sacred flowers.",
  },
  {
    question: "What is the recommended sequence of ceremonies for a 3-day destination wedding?",
    answer:
      "Typically: Day 1 begins with guest arrivals, traditional aarti welcome, and an intimate Mehendi & Welcome Dinner. Day 2 features the vibrant morning Haldi & Phoolon Ki Holi, followed by the evening Royal Sangeet & Cocktails. Day 3 features the afternoon Shahi Baraat, sunset Varmala, auspicious Vedic Pheras, and an opulent late-evening Reception banquet.",
  },
  {
    question: "Do you cater to cross-cultural or fusion ceremonies?",
    answer:
      "Absolutely. We frequently orchestrate dual-ceremony weddings (e.g. Hindu Vedic ceremony alongside a Christian White Wedding or Sikh Anand Karaj) with dedicated spaces, respectful ceremonial adherence, and harmonious transitions.",
  },
  {
    question: "How far in advance should we commence the 7-step planning process?",
    answer:
      "For premier palace buyouts in Rajasthan (such as Udaipur and Jaipur), we recommend commencing Step 01 between 9 to 14 months prior to your wedding date to ensure your preferred palace dates and auspicious muhurats are secured.",
  },
];
