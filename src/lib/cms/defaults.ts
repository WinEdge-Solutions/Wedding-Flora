import { siteConfig } from "@/lib/site";
import { servicesData, operationalPillars } from "@/lib/content/services";
import { galleryData } from "@/lib/content/gallery";
import { celebrationStories } from "@/lib/content/celebrations";
import { rajasthanDestinations } from "@/lib/content/destinations";
import { testimonialsData } from "@/lib/content/testimonials";
import { blogPosts } from "@/lib/content/blog";
import { planningProcessSteps, sacredRitualsList, ritualsFaqs } from "@/lib/content/rituals";
import { packagesData } from "@/lib/content/packages";
import type { SiteCmsData } from "@/lib/cms/types";

export const DEFAULT_CMS_DATA: SiteCmsData = {
  version: 1,
  updatedAt: "2026-11-26T00:00:00.000Z",
  theme: {
    colors: {
      paper: "#FDFAF5",
      stationery: "#FAF7F2",
      cream: "#F7F3EC",
      ivoryInk: "#1A1209",
      warmgrey: "#7A6B59",
      gold: "#D4AF37",
      antiquegold: "#AB9178",
      blush: "#F1DCE1",
      rose: "#E5B8C3",
      sage: "#9DB49B",
    },
    typography: {
      displayFont: "cinzel",
      headingScale: "standard",
      bodySize: "md",
    },
    radius: "classic",
    sectionSpacing: "standard",
    effects: {
      enableParticles: true,
      enableAurora: true,
      enableParallax: true,
    },
  },
  site: {
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    logoEmblemUrl: "/images/logo-emblem.png",
    logoFullUrl: "/images/logo.png",
    contact: {
      email: siteConfig.contact.email,
      phone: siteConfig.contact.phone,
      address: siteConfig.contact.address,
      mapsUrl: siteConfig.contact.mapsUrl,
      mapsEmbedUrl:
        "https://maps.google.com/maps?q=Wedding+Flora+D-52+Saket+Colony+Adarsh+Nagar+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed",
      instagram: siteConfig.contact.instagram,
      instagramHandle: siteConfig.contact.instagramHandle,
      pinterest: siteConfig.contact.pinterest,
      whatsapp: siteConfig.contact.whatsapp,
      whatsappDefaultMessage:
        "Hello Wedding Flora team! I would love to enquire about wedding planning and design for our upcoming celebration.",
      consultationHours: "Monday – Sunday: 10:00 AM – 8:00 PM IST (By Appointment)",
    },
    navbar: {
      showBrandTextMobile: true,
      showBrandTextDesktop: false,
      showEnquireCta: true,
      enquireLabel: "Enquire",
      enquireHref: "/contact",
      items: siteConfig.navItems.map((item) => ({
        ...item,
        visible: item.label !== "Contact",
      })),
    },
    footer: {
      brandSubtitle: "The Wedding Planner • Royal Celebrations",
      brandDescription:
        "Curating regal palace weddings, bespoke Sangeet productions, and sacred Mandap ceremonies across Udaipur, Jaipur, Jodhpur, and destination sanctuaries in India.",
      citiesLabel: "Jaipur · Udaipur · Jodhpur",
      copyrightText: "Wedding Flora. All rights reserved.",
      showQuickLinks: true,
      showSocialLinks: true,
    },
  },
  pages: {
    home: {
      key: "home",
      label: "Home Page",
      route: "/",
      seoTitle: "Wedding Flora | Luxury Indian Wedding Planning & Royal Floral Artistry",
      seoDescription:
        "Premier luxury wedding planning, royal palace celebrations, opulent floral mandaps, and bespoke Sangeet productions across Udaipur, Jaipur, Jodhpur, and Goa.",
      sections: [
        {
          id: "home-hero",
          kind: "home-hero",
          name: "Hero Video Showcase",
          visible: true,
          bgVariant: "charcoal",
          layout: "centered",
          content: {
            title: "Crafting Royal Weddings",
            titleHighlight: "Royal",
            subtitle:
              "With Grandeur & Soul",
            paragraphs: [
              "From starlit palace Sangeets in Udaipur to ethereal Mandap ceremonies across heritage fortresses, we curate unforgettable Indian wedding heirlooms tailored to your family's heritage.",
            ],
            primaryCtaLabel: "Plan Your Royal Wedding",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Celebrations",
            secondaryCtaHref: "/celebrations",
            videoUrl: "/videos/hero-bg.mp4",
            imageUrl: "/images/hero-bg.jpg",
            showCrest: true,
            showDivider: true,
            overlayOpacity: 30,
          },
        },
        {
          id: "home-services",
          kind: "home-services",
          name: "Services Overview",
          visible: true,
          bgVariant: "cream",
          layout: "split-left",
          columns: 3,
          itemLimit: 8,
          content: {
            eyebrow: "Royal Wedding Services & Artistry",
            title: "Grandeur in Every Celebration",
            subtitle:
              "From historic palace procurement to bespoke floral mandap scenography, we orchestrate unforgettable royal heirlooms.",
            primaryCtaLabel: "Explore Our Services",
            primaryCtaHref: "/services",
          },
        },
        {
          id: "home-featured-work",
          kind: "home-featured-work",
          name: "Featured Video Reels",
          visible: true,
          bgVariant: "ivory",
          layout: "grid-3",
          columns: 3,
          itemLimit: 3,
          content: {
            eyebrow: "Royal Celebrations",
            title: "Recent Wedding Celebrations",
            subtitle:
              "Glimpses into bespoke Sangeet productions, grand palace Mandaps, and royal celebrations across India. Hover on desktop or swipe on mobile to experience each moment.",
            primaryCtaLabel: "View All Royal Celebrations",
            primaryCtaHref: "/celebrations",
          },
        },
        {
          id: "home-horizontal-gallery",
          kind: "home-horizontal-gallery",
          name: "Legacy Horizontal Gallery",
          visible: true,
          bgVariant: "cream",
          layout: "carousel",
          columns: 3,
          itemLimit: 6,
          content: {
            eyebrow: "Royal Celebrations",
            title: "A Legacy of Grand Moments",
            subtitle: "Swipe sideways to view all celebrations →",
          },
        },
        {
          id: "home-testimonials",
          kind: "home-testimonials",
          name: "Couples & Family Testimonials",
          visible: true,
          bgVariant: "ivory",
          layout: "split-left",
          columns: 3,
          content: {
            eyebrow: "Love Stories & Royal Reflections",
            title: "Vows Celebrated in Royal Splendor",
            secondaryImageAlt: "Secondary wedding moment",
          },
        },
        {
          id: "home-cta",
          kind: "home-cta",
          name: "Royal Consultation CTA Banner",
          visible: true,
          bgVariant: "ivory",
          layout: "centered",
          content: {
            eyebrow: "Your Royal Celebration Awaits",
            title: "Let Us Craft Your",
            titleHighlight: "Royal Wedding",
            titleSuffix: "Celebration",
            subtitle:
              "We curate a select number of luxury palace and destination weddings each season across India, ensuring undivided devotion, opulent floral artistry, and seamless coordination for your family.",
            primaryCtaLabel: "Begin Planning",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Royal Services",
            secondaryCtaHref: "/services",
            showDivider: true,
          },
        },
      ],
    },
    about: {
      key: "about",
      label: "About Us",
      route: "/about",
      seoTitle: "About Us | Wedding Flora • The Wedding Planner",
      seoDescription:
        "Discover the story, royal heritage philosophy, and floral artistry behind Wedding Flora — luxury Indian wedding planners across Udaipur, Jaipur, Jodhpur, and Delhi NCR.",
      sections: [
        {
          id: "about-hero",
          kind: "page-hero",
          name: "About Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "The Wedding Planner • Born from Heritage & Passion",
            title: "Curating Royal Heirlooms,",
            titleHighlight: "Not Just Weddings",
            subtitle:
              "At Wedding Flora, we weave the opulent grandeur of royal Indian palaces with fragrant botanical artistry and flawless multi-day guest care. Every celebration is an immortal tapestry of love, tradition, and soul.",
            showCrest: true,
            showDivider: true,
          },
        },
        {
          id: "about-story",
          kind: "about-story",
          name: "Philosophy & Genesis Story",
          visible: true,
          bgVariant: "ivory",
          layout: "split-left",
          content: {
            eyebrow: "Our Genesis & Devotion",
            title: "Where Sacred Tradition Meets Haute Couture Scenography",
            paragraphs: [
              "Founded with a deep reverence for India's royal heritage and architectural magnificence, Wedding Flora emerged as the premier choice for couples who value authentic tradition elevated with contemporary high design.",
              "From procuring centuries-old lakeside palaces in Udaipur and sandstone fortresses in Jodhpur to sourcing farm-fresh tuberoses, Marigold, and Dutch hydrangeas at dawn, our master floral sculptors and event producers treat every ceremony as sacred.",
            ],
            imageUrl:
              "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
            imageAlt: "Royal Palace Wedding Architecture by Wedding Flora",
            badgeText: "Heritage Excellence",
            quoteText:
              "Over a decade of orchestrating regal destination celebrations in Rajasthan.",
            secondaryImageUrl:
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
            secondaryImageAlt: "Handcrafted Floral Mandap Detail",
            extraNote: "Est. 2014 • Jaipur • Udaipur • Goa",
            stats: [
              { value: "10+", label: "Years of Royal Mastery" },
              { value: "350+", label: "Regal Celebrations" },
              { value: "100%", label: "Bespoke Dedication" },
            ],
          },
        },
        {
          id: "about-pillars",
          kind: "about-pillars",
          name: "Three Pillars of Craft",
          visible: true,
          bgVariant: "cream",
          layout: "grid-3",
          columns: 3,
          content: {
            eyebrow: "The Wedding Flora Promise",
            title: "The Pillars of Royal Wedding Craft",
            subtitle:
              "Every celebration we undertake is anchored in three non-negotiable standards of luxury and devotion.",
            cards: [
              {
                icon: "crown",
                title: "Palace Scenography",
                description:
                  "We transform historical fortresses and 5-star properties into living dreamscapes with custom 3D mandap architecture, intelligent concert lighting, and sacred fire staging.",
              },
              {
                icon: "sparkles",
                title: "Bespoke Floral Architecture",
                description:
                  "Thousands of scented Mogra, fragrant Rajnigandha, yellow Marigold, and exotic European imports sculpted into cascading mandaps, chandeliers, and floral rangolis.",
              },
              {
                icon: "heart",
                title: "Atithi Devo Bhava",
                description:
                  "Every traveling guest is welcomed like family. From airport welcome desks and luxury convoys to safa-tying bars, we ensure effortless comfort across every hour.",
              },
            ],
          },
        },
        {
          id: "about-instagram",
          kind: "about-instagram",
          name: "Instagram Atelier Showcase",
          visible: true,
          bgVariant: "ivory",
          layout: "centered",
          content: {
            eyebrow: "Explore Our Live Instagram Profile",
            title: "@weddingflora_theweddingplanner",
            subtitle:
              "Dive into our daily reels, behind-the-scenes palace builds, sacred mandap setups, and real Indian wedding stories directly from our official Instagram feed.",
          },
        },
        {
          id: "about-cta",
          kind: "page-cta",
          name: "Bottom Consultation CTA",
          visible: true,
          bgVariant: "cream",
          layout: "centered",
          content: {
            eyebrow: "Start Your Journey",
            title: "Ready to Plan Your Royal Indian Wedding?",
            subtitle:
              "Connect directly with our master planning team in Delhi NCR or Jaipur to discuss venues, floral scenography, and customized packages.",
            primaryCtaLabel: "Enquire For Your Date",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Our Services & Packages",
            secondaryCtaHref: "/services",
          },
        },
      ],
    },
    director: {
      key: "director",
      label: "About Director",
      route: "/about/director",
      seoTitle: "About the Director | Wedding Flora • Royal Wedding Planner",
      seoDescription:
        "Meet the visionary founder and director behind Wedding Flora — orchestrating royal heritage weddings, bespoke mandap scenography, and luxury celebrations across Udaipur, Jaipur, and beyond.",
      sections: [
        {
          id: "director-hero",
          kind: "page-hero",
          name: "Director Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "The Visionary Behind Wedding Flora",
            title: "A Lifelong Devotion to",
            titleHighlight: "Regal Grandeur & Floral Artistry",
            subtitle:
              "Meet the creative force curating India's most sought-after royal celebrations. Blending royal Rajasthani heritage with modern haute couture scenography, our director leads every wedding as a sacred masterpiece.",
            showCrest: true,
            showDivider: true,
          },
        },
        {
          id: "director-narrative",
          kind: "director-narrative",
          name: "Director Portrait & Philosophy",
          visible: true,
          bgVariant: "ivory",
          layout: "split-left",
          content: {
            eyebrow: "The Director's Philosophy",
            title: "“A wedding is not merely an event; it is an emotional coronation.”",
            paragraphs: [
              "With a background deeply rooted in classical Indian art, spatial architecture, and luxury event design, our Director founded Wedding Flora out of an enduring love for the royal splendor of Udaipur, Jaipur, and Jodhpur.",
              "Rather than treating celebrations as commercial productions, the Director personally curates every celebration as an intimate, bespoke heirloom. From hand-sketching mandap blueprints beneath historic cenotaphs to curating dawn flower auctions for rare white lilies and scented tuberose, no detail escapes the director's personal devotion.",
            ],
            imageUrl:
              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
            imageAlt: "Director and Principal Wedding Architect of Wedding Flora",
            badgeText: "Leadership & Vision",
            extraNote: "Creative Director & Founder • Wedding Flora • Est. 2014",
            quoteText:
              "When a family invites us into their sacred celebrations, we treat that honor with reverent care. Every flower garland, every chandelier, and every guest greeting must reflect the timeless dignity of their family history.",
            quoteAuthor: "— Director, Wedding Flora",
            primaryCtaLabel: "Book a Private Consultation",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Company Story",
            secondaryCtaHref: "/about",
            showCrest: true,
          },
        },
        {
          id: "director-pillars",
          kind: "director-pillars",
          name: "Four Signature Pillars",
          visible: true,
          bgVariant: "cream",
          layout: "grid-4",
          columns: 4,
          content: {
            eyebrow: "Curatorial Devotion",
            title: "The Director's Four Signature Pillars",
            subtitle:
              "The non-negotiable principles that shape every grand celebration orchestrated by Wedding Flora.",
            cards: [
              {
                icon: "crown",
                title: "Royal Scenography",
                description:
                  "Deep architectural harmony with historic forts and 5-star palace courtyards, creating grand stages that honor their regal surroundings.",
              },
              {
                icon: "sparkles",
                title: "Floral Sculpting",
                description:
                  "Pioneering botanical architecture that uses tens of thousands of natural Mogra, Rajnigandha, and exotic blooms as sculptural art.",
              },
              {
                icon: "heart",
                title: "Direct Family Care",
                description:
                  "Personal involvement at every planning milestone, giving couples and families direct executive access from day one through the wedding night.",
              },
              {
                icon: "compass",
                title: "Flawless Precision",
                description:
                  "Managing multi-day destination logistics with calm, military precision — ensuring hosts and guests can soak in every blissful second.",
              },
            ],
          },
        },
        {
          id: "director-cta",
          kind: "page-cta",
          name: "Executive Consultation CTA",
          visible: true,
          bgVariant: "cream",
          layout: "centered",
          content: {
            eyebrow: "Executive Consultation",
            title: "Bring Your Dream Wedding to Life",
            subtitle:
              "Our Director and master production team accept only a limited number of destination weddings each season to guarantee undivided artistry and attention.",
            primaryCtaLabel: "Request Director Consultation",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "View Curated Portfolio",
            secondaryCtaHref: "/celebrations",
          },
        },
      ],
    },
    services: {
      key: "services",
      label: "Services",
      route: "/services",
      seoTitle: "Full-Service Wedding Planners | Wedding Flora",
      seoDescription:
        "Turnkey luxury wedding planning, palace procurement, architectural 3D floral scenography, and white-glove event management across Udaipur, Jaipur, Jodhpur, Goa, and global destinations.",
      sections: [
        {
          id: "services-showcase",
          kind: "services-showcase",
          name: "Full-Service Royal Atelier",
          visible: true,
          bgVariant: "ivory",
          layout: "split-left",
          columns: 3,
          content: {
            eyebrow: "Turnkey Palatial Production & Bespoke Curation",
            title: "Full-Service Wedding Planners",
            subtitle:
              "Eight bespoke architectural, floral, hospitality, and technical suites designed so every celebration unfolds seamlessly from initial reccee to final vidaai.",
            primaryCtaLabel: "Request a Bespoke Proposal",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Editorial Gallery",
            secondaryCtaHref: "/gallery",
          },
        },
      ],
    },
    destinations: {
      key: "destinations",
      label: "Wedding Destinations",
      route: "/destinations",
      seoTitle: "Royal Rajasthan Wedding Destinations | Wedding Flora",
      seoDescription:
        "Explore iconic royal wedding destinations across Rajasthan: Jaipur, Udaipur, Jodhpur, Bikaner, Pushkar, Ranthambore, Jaisalmer, and Jhunjhunu.",
      sections: [
        {
          id: "destinations-hero",
          kind: "page-hero",
          name: "Destinations Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "Royal Indian Wedding Destinations",
            title: "Rajasthan's Grandest Wedding Sanctuaries",
            subtitle:
              "From the shimmering fairytale lake palaces of Udaipur to the pink sandstone fortresses of Jaipur and golden sands of Jaisalmer, immerse your celebration in timeless regal heritage.",
            showDivider: true,
            showQuickJump: true,
          },
        },
        {
          id: "destinations-directory",
          kind: "destinations-directory",
          name: "Cities & Palatial Venues Showcase",
          visible: true,
          bgVariant: "ivory",
          layout: "split-left",
          columns: 2,
          content: {
            eyebrow: "Royal Sanctuaries",
            title: "Curated Cities & Heritage Estates",
          },
        },
        {
          id: "destinations-cta",
          kind: "page-cta",
          name: "Destination Consultation CTA",
          visible: true,
          bgVariant: "cream",
          layout: "centered",
          content: {
            eyebrow: "Bespoke Destination Planning",
            title: "Planning a Royal Destination Wedding?",
            subtitle:
              "Our destination scouting concierges arrange private palace inspections, preferential room tariffs, and customized multi-day itineraries across Rajasthan.",
            primaryCtaLabel: "Book Destination Consultation",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Our Services",
            secondaryCtaHref: "/services",
          },
        },
      ],
    },
    workingProcess: {
      key: "workingProcess",
      label: "Working Process",
      route: "/working-process",
      seoTitle: "Our Working Process & Royal Wedding Planning | Wedding Flora",
      seoDescription:
        "Explore Wedding Flora's proven 7-step royal working process and the sacred Indian wedding ceremonies we curate.",
      sections: [
        {
          id: "process-hero",
          kind: "page-hero",
          name: "Working Process Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "Proven Methodology & Royal Curation",
            title: "Our Working Process",
            subtitle:
              "Inspired by centuries of aristocratic heritage, we deliver seamless palace wedding productions through our signature 7-step working process and reverent ceremonial curation.",
            showCrest: true,
            showDivider: true,
            showQuickJump: true,
          },
        },
        {
          id: "process-steps",
          kind: "process-steps",
          name: "7-Step Planning Blueprint",
          visible: true,
          bgVariant: "ivory",
          layout: "default",
          content: {
            eyebrow: "Turnkey Methodology",
            title: "The 7-Step Working Process",
          },
        },
        {
          id: "process-rituals",
          kind: "process-rituals",
          name: "Sacred Ceremonies We Curate",
          visible: true,
          bgVariant: "cream",
          layout: "grid-2",
          columns: 2,
          content: {
            eyebrow: "Vedic & Cultural Curation",
            title: "Sacred Ceremonies We Curate",
          },
        },
        {
          id: "process-faqs",
          kind: "process-faqs",
          name: "Process & Timing FAQ",
          visible: true,
          bgVariant: "ivory",
          layout: "default",
          content: {
            eyebrow: "Guidance & Clarity",
            title: "Process & Timing FAQ",
          },
        },
        {
          id: "process-cta",
          kind: "page-cta",
          name: "Begin Journey CTA",
          visible: true,
          bgVariant: "cream",
          layout: "centered",
          content: {
            eyebrow: "Begin Your Royal Journey",
            title: "Ready to Begin Your Working Process with Wedding Flora?",
            subtitle:
              "Connect with our principal directors in Jaipur to schedule your private consultation, inspect palace dates, and receive a bespoke proposal tailored to your vision.",
            primaryCtaLabel: "Schedule Private Consultation",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Instant WhatsApp Concierge",
            secondaryCtaHref: siteConfig.contact.whatsapp,
          },
        },
      ],
    },
    gallery: {
      key: "gallery",
      label: "Gallery",
      route: "/gallery",
      seoTitle: "Royal Wedding Gallery & Visual Archives | Wedding Flora",
      seoDescription:
        "Browse Wedding Flora's luxury wedding gallery. Authentic photography and 4K reels of palace mandaps, grand Sangeet productions, and sacred Vedic ceremonies in Udaipur, Jaipur, and Jodhpur.",
      sections: [
        {
          id: "gallery-hero",
          kind: "page-hero",
          name: "Gallery Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "Visual Masterpieces & Palace Archives",
            title: "Royal Wedding Gallery",
            subtitle:
              "Step inside our living archives of majestic palace mandaps, electrifying Sangeet concerts, vibrant Mehendi carnivals, and sacred Vedic ceremonies curated across Rajasthan.",
            showCrest: true,
            showDivider: true,
            stats: [
              { value: "16+", label: "Curated Palace Visuals" },
              { value: "4K", label: "Cinematic Video Reels" },
              { value: "Verified", label: "Royal Productions" },
            ],
          },
        },
        {
          id: "gallery-grid",
          kind: "gallery-grid",
          name: "Filterable Photo & Video Grid",
          visible: true,
          bgVariant: "ivory",
          layout: "grid-3",
          columns: 3,
          content: {},
        },
        {
          id: "gallery-cta",
          kind: "page-cta",
          name: "Gallery Consultation CTA",
          visible: true,
          bgVariant: "cream",
          layout: "centered",
          content: {
            eyebrow: "Inspired by Our Archives?",
            title: "Bring Your Royal Vision to Life",
            subtitle:
              "Every celebration featured in our gallery was tailored specifically to the couple's family heritage and aesthetic dreams. Connect with our directors to begin crafting yours.",
            primaryCtaLabel: "Book Private Consultation",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Royal Services",
            secondaryCtaHref: "/services",
          },
        },
      ],
    },
    celebrations: {
      key: "celebrations",
      label: "Celebrations",
      route: "/celebrations",
      seoTitle: "Celebrations & Royal Wedding Stories | Wedding Flora",
      seoDescription:
        "Explore sample stories, real royal weddings, opulent floral mandaps, and grand Sangeet productions curated by Wedding Flora across palaces in India.",
      sections: [
        {
          id: "celebrations-hero",
          kind: "page-hero",
          name: "Celebrations Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "Real Royal Wedding Stories & Visual Archives",
            title: "Love Celebrated in Regal Grandeur",
            subtitle:
              "Step inside our world of regal palace celebrations across Udaipur, Jaipur, Jodhpur, and coastal sanctuaries. Explore sample stories, sacred rituals, and bespoke floral architecture.",
            showDivider: true,
          },
        },
        {
          id: "celebrations-stories",
          kind: "celebrations-stories",
          name: "Real Wedding Stories Showcase",
          visible: true,
          bgVariant: "ivory",
          layout: "default",
          content: {
            eyebrow: "Featured Heirlooms",
            title: "Real Royal Wedding Stories",
            subtitle:
              "Explore how we curated three days of unforgettable palace ceremonies for each of our distinguished couples.",
          },
        },
        {
          id: "celebrations-reels",
          kind: "celebrations-reels",
          name: "Living Video Archives",
          visible: true,
          bgVariant: "cream",
          layout: "grid-3",
          columns: 3,
          itemLimit: 3,
          content: {
            eyebrow: "Cinematic Celebrations",
            title: "The Living Video Archives",
            subtitle:
              "Glimpses into our live Sangeet concerts, Mandap flower falls, and regal palace processions across India.",
          },
        },
        {
          id: "celebrations-cta",
          kind: "page-cta",
          name: "Celebrations CTA",
          visible: true,
          bgVariant: "cream",
          layout: "centered",
          content: {
            eyebrow: "Create Your Own Story",
            title: "Begin Your Celebration With Wedding Flora",
            subtitle:
              "Let us craft an immortal celebration in Rajasthan, Delhi NCR, or scenic Goa with bespoke floral architecture and unforgettable hospitality.",
            primaryCtaLabel: "Plan Your Celebration",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Our Services",
            secondaryCtaHref: "/services",
          },
        },
      ],
    },
    blog: {
      key: "blog",
      label: "Blog & Journal",
      route: "/blog",
      seoTitle: "Royal Wedding Journal & Guides | Wedding Flora",
      seoDescription:
        "Expert destination wedding cost breakdowns, Udaipur vs Jaipur venue guides, NRI planning playbooks, and sacred Vedic ceremony wisdom by Wedding Flora.",
      sections: [
        {
          id: "blog-hero",
          kind: "page-hero",
          name: "Blog Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "The Wedding Flora Journal",
            title: "Royal Wedding Journal & Guides",
            subtitle:
              "Transparent cost blueprints, venue comparisons, NRI planning playbooks, and ancient Vedic wisdom authored by our principal wedding directors.",
            showCrest: true,
            showDivider: true,
            stats: [
              { value: "Editorial", label: "In-Depth Editorial Guides" },
              { value: "Direct", label: "Direct Industry Insights" },
              { value: "100%", label: "Transparent Advice" },
            ],
          },
        },
        {
          id: "blog-grid",
          kind: "blog-grid",
          name: "Journal Articles Grid",
          visible: true,
          bgVariant: "charcoal",
          layout: "grid-3",
          columns: 3,
          content: {
            eyebrow: "Expert Planning Compendium",
            title: "Editorial Insights & Destination Guides",
            subtitle:
              "Curated articles and cost blueprints authored by Wedding Flora's principal directors.",
          },
        },
        {
          id: "blog-cta",
          kind: "page-cta",
          name: "Proposal Request CTA",
          visible: true,
          bgVariant: "cream",
          layout: "centered",
          content: {
            eyebrow: "Have Specific Questions for Your Dates?",
            title: "Request a Bespoke Proposal",
            subtitle:
              "Every family's celebration is unique. Share your envisioned dates, guest counts, and destination preferences for a personalized feasibility review.",
            primaryCtaLabel: "Begin Your Consultation",
            primaryCtaHref: "/contact",
            secondaryCtaLabel: "Explore Rajasthan Destinations",
            secondaryCtaHref: "/destinations",
          },
        },
      ],
    },
    contact: {
      key: "contact",
      label: "Contact & Enquire",
      route: "/contact",
      seoTitle: "Enquire & Contact | Wedding Flora • The Wedding Planner",
      seoDescription:
        "Schedule a personal consultation with Wedding Flora. Plan your royal Indian wedding across Udaipur, Jaipur, Jodhpur, and Delhi NCR.",
      sections: [
        {
          id: "contact-hero",
          kind: "page-hero",
          name: "Contact Hero Header",
          visible: true,
          bgVariant: "stationery",
          layout: "centered",
          content: {
            eyebrow: "Private Consultations & Bespoke Proposals",
            title: "Begin Planning Your Royal Celebration",
            subtitle:
              "We look forward to honoring your family's heritage. Share your envisioned dates and destinations below, or connect with our directors directly.",
            showCrest: true,
            showDivider: true,
          },
        },
        {
          id: "contact-main",
          kind: "contact-main",
          name: "Enquiry Form & Studio Details",
          visible: true,
          bgVariant: "ivory",
          layout: "split-left",
          content: {
            badgeText: "Fastest Response",
            title: "Instant WhatsApp Concierge",
            subtitle:
              "Have an urgent date check for palace venues? Our planning directors answer directly on WhatsApp with itemized feasibility notes.",
            extraNote:
              "Strictly confidential consultations. We regularly sign NDAs for high-profile and celebrity family celebrations.",
          },
        },
      ],
    },
  },
  collections: {
    services: servicesData,
    operationalPillars,
    editorialSlides: [
      {
        image: "/images/service-varmala-mandap.jpg",
        title: "Vedic Mandap Under Starlit Aravali Skies",
        subtitle: "Over 15,000 cascading fresh blossoms & sacred architectural geometry",
        venue: "Udaipur Waterfront Palace",
      },
      {
        image: "/images/service-sangeet-dance.jpg",
        title: "Concert-Grade Sangeet Productions",
        subtitle: "Panoramic LED visual staging, synchronized SFX & celebrity choreographers",
        venue: "Jaipur Heritage Fortress",
      },
      {
        image: "/images/destinations/hotels/rambagh-palace.webp",
        title: "Royal Palatial Buyouts & Fortresses",
        subtitle: "Turnkey heritage permissions, exclusive room blocks & private chauffeurs",
        venue: "Rambagh Palace, Jaipur",
      },
      {
        image: "/images/service-crystal-reception.jpg",
        title: "Bespoke Reception Scenography",
        subtitle: "Crystal chandeliers, imperial brassware & synchronized white-glove dining",
        venue: "Jodhpur Sandstone Haveli",
      },
      {
        image: "/images/destinations/hotels/fairmont-jaipur.webp",
        title: "Grand Royal Courtyard Celebrations",
        subtitle: "Elephant Baraat processions, Rajasthani folk maestros & midnight galas",
        venue: "Fairmont, Jaipur",
      },
    ],
    gallery: galleryData,
    celebrations: celebrationStories,
    destinations: rajasthanDestinations,
    testimonials: testimonialsData,
    blogPosts,
    processSteps: planningProcessSteps,
    sacredRituals: sacredRitualsList,
    ritualFaqs: ritualsFaqs,
    packages: packagesData,
  },
};

