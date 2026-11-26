"use client";

import React, { useState } from "react";
import { MediaField } from "@/components/admin/MediaPickerModal";
import type { CmsCollections } from "@/lib/cms/types";
import type { GalleryItem } from "@/lib/content/gallery";
import type { BlogPost } from "@/lib/content/blog";
import type { HotelCategory } from "@/lib/content/destinations";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

type CollectionTab =
  | "services"
  | "gallery"
  | "celebrations"
  | "destinations"
  | "testimonials"
  | "blog"
  | "process";

const GALLERY_CATEGORIES: GalleryItem["category"][] = [
  "CINEMATIC REELS",
  "MANDAP & DECOR",
  "SANGEET",
  "MEHENDI & HALDI",
  "ROYAL BARAAT",
  "RECEPTION",
];

const BLOG_CATEGORIES: BlogPost["category"][] = [
  "Destination Planning",
  "Venue Guides",
  "NRI Concierge",
  "Decor & Scenography",
  "Rituals & Traditions",
];

export function CollectionsEditor({
  collections,
  onChange,
}: {
  collections: CmsCollections;
  onChange: (next: CmsCollections) => void;
}) {
  const [tab, setTab] = useState<CollectionTab>("services");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const tabs: { key: CollectionTab; label: string }[] = [
    { key: "services", label: `Services (${collections.services.length})` },
    { key: "gallery", label: `Gallery (${collections.gallery.length})` },
    { key: "celebrations", label: `Stories (${collections.celebrations.length})` },
    { key: "destinations", label: `Cities & Venues (${collections.destinations.length})` },
    { key: "testimonials", label: `Testimonials (${collections.testimonials.length})` },
    { key: "blog", label: `Journal (${collections.blogPosts.length})` },
    { key: "process", label: `Process & FAQs` },
  ];

  const switchTab = (next: CollectionTab) => {
    setTab(next);
    setSelectedIdx(0);
  };

  const moveArrayItem = <T,>(arr: T[], idx: number, delta: -1 | 1): T[] => {
    const target = idx + delta;
    if (target < 0 || target >= arr.length) return arr;
    const copy = [...arr];
    const [moved] = copy.splice(idx, 1);
    copy.splice(target, 0, moved);
    return copy;
  };

  return (
    <div className="space-y-4">
      {/* Collection Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-[3px] border border-gold/25">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => switchTab(t.key)}
            className={`px-3 py-1.5 rounded-[2px] text-[11px] font-bold uppercase tracking-wider transition-colors ${
              tab === t.key
                ? "bg-[#1A1209] text-white"
                : "bg-[#FAF7F2] text-[#5C5147] hover:text-[#1A1209]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. SERVICES */}
      {tab === "services" && (() => {
        const items = collections.services;
        const active = items[selectedIdx] ?? items[0];
        return (
          <div className="space-y-4">
            <ListSelectorBar
              title="Services"
              items={items.map((s) => s.title)}
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              onMove={(idx, delta) =>
                onChange({ ...collections, services: moveArrayItem(items, idx, delta) })
              }
              onAdd={() => {
                const next = [
                  ...items,
                  {
                    id: `service-${Date.now()}`,
                    title: "New Bespoke Service",
                    tagline: "Curated Royal Artistry",
                    description: "Describe this bespoke wedding offering.",
                    features: ["Turnkey coordination", "Custom visual design"],
                    imageUrl: "/images/hero-royal-stage.jpg",
                  },
                ];
                onChange({ ...collections, services: next });
                setSelectedIdx(next.length - 1);
              }}
              onDelete={(idx) => {
                if (items.length <= 1) return;
                onChange({
                  ...collections,
                  services: items.filter((_, i) => i !== idx),
                });
                setSelectedIdx(0);
              }}
            />

            {active && (
              <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
                <TextField
                  label="Service Slug / ID"
                  value={active.id}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      services: items.map((s, i) => (i === selectedIdx ? { ...s, id: val } : s)),
                    })
                  }
                />
                <TextField
                  label="Service Title"
                  value={active.title}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      services: items.map((s, i) => (i === selectedIdx ? { ...s, title: val } : s)),
                    })
                  }
                />
                <TextField
                  label="Tagline"
                  value={active.tagline}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      services: items.map((s, i) => (i === selectedIdx ? { ...s, tagline: val } : s)),
                    })
                  }
                />
                <TextAreaField
                  label="Description"
                  value={active.description}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      services: items.map((s, i) =>
                        i === selectedIdx ? { ...s, description: val } : s
                      ),
                    })
                  }
                />
                <MediaField
                  label="Service Image"
                  value={active.imageUrl}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      services: items.map((s, i) =>
                        i === selectedIdx ? { ...s, imageUrl: val } : s
                      ),
                    })
                  }
                />
                <StringListEditor
                  label="Included Highlights"
                  values={active.features}
                  onChange={(nextFeatures) =>
                    onChange({
                      ...collections,
                      services: items.map((s, i) =>
                        i === selectedIdx ? { ...s, features: nextFeatures } : s
                      ),
                    })
                  }
                />
              </div>
            )}
          </div>
        );
      })()}

      {/* 2. GALLERY */}
      {tab === "gallery" && (() => {
        const items = collections.gallery;
        const active = items[selectedIdx] ?? items[0];
        return (
          <div className="space-y-4">
            <ListSelectorBar
              title="Gallery Photos & Video Reels"
              items={items.map((g) => `${g.videoUrl ? "▶ " : ""}${g.title}`)}
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              onMove={(idx, delta) =>
                onChange({ ...collections, gallery: moveArrayItem(items, idx, delta) })
              }
              onAdd={() => {
                const next: GalleryItem[] = [
                  ...items,
                  {
                    id: `g-${Date.now()}`,
                    title: "New Royal Moment",
                    category: "MANDAP & DECOR",
                    location: "Udaipur, Rajasthan",
                    year: "2026",
                    imageUrl: "/images/service-varmala-mandap.jpg",
                    aspect: "landscape",
                    alt: "Royal celebration visual by Wedding Flora",
                    caption: "Bespoke palace decor & floral design.",
                  },
                ];
                onChange({ ...collections, gallery: next });
                setSelectedIdx(next.length - 1);
              }}
              onDelete={(idx) => {
                if (items.length <= 1) return;
                onChange({ ...collections, gallery: items.filter((_, i) => i !== idx) });
                setSelectedIdx(0);
              }}
            />
            {active && (
              <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
                <TextField
                  label="Title"
                  value={active.title}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      gallery: items.map((g, i) => (i === selectedIdx ? { ...g, title: val } : g)),
                    })
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                      Category
                    </label>
                    <select
                      value={active.category}
                      onChange={(e) =>
                        onChange({
                          ...collections,
                          gallery: items.map((g, i) =>
                            i === selectedIdx
                              ? { ...g, category: e.target.value as GalleryItem["category"] }
                              : g
                          ),
                        })
                      }
                      className="w-full px-2.5 py-2 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                    >
                      {GALLERY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <TextField
                    label="Location"
                    value={active.location}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        gallery: items.map((g, i) =>
                          i === selectedIdx ? { ...g, location: val } : g
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Year"
                    value={active.year}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        gallery: items.map((g, i) => (i === selectedIdx ? { ...g, year: val } : g)),
                      })
                    }
                  />
                </div>
                <MediaField
                  label="Cover / Photo Image"
                  value={active.imageUrl}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      gallery: items.map((g, i) => (i === selectedIdx ? { ...g, imageUrl: val } : g)),
                    })
                  }
                />
                <MediaField
                  label="Optional Video Reel (MP4/WEBM)"
                  value={active.videoUrl ?? ""}
                  acceptType="video"
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      gallery: items.map((g, i) =>
                        i === selectedIdx ? { ...g, videoUrl: val || undefined } : g
                      ),
                    })
                  }
                />
                <TextField
                  label="Alt Text"
                  value={active.alt}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      gallery: items.map((g, i) => (i === selectedIdx ? { ...g, alt: val } : g)),
                    })
                  }
                />
                <TextAreaField
                  label="Caption"
                  value={active.caption ?? ""}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      gallery: items.map((g, i) =>
                        i === selectedIdx ? { ...g, caption: val } : g
                      ),
                    })
                  }
                />
              </div>
            )}
          </div>
        );
      })()}

      {/* 3. CELEBRATIONS */}
      {tab === "celebrations" && (() => {
        const items = collections.celebrations;
        const active = items[selectedIdx] ?? items[0];
        return (
          <div className="space-y-4">
            <ListSelectorBar
              title="Celebration Stories"
              items={items.map((c) => `${c.couple} — ${c.title}`)}
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              onMove={(idx, delta) =>
                onChange({ ...collections, celebrations: moveArrayItem(items, idx, delta) })
              }
              onAdd={() => {
                const next = [
                  ...items,
                  {
                    id: `story-${Date.now()}`,
                    slug: `royal-story-${Date.now()}`,
                    title: "New Palace Celebration Story",
                    couple: "Bride & Groom",
                    venue: "Rambagh Palace",
                    location: "Jaipur, Rajasthan",
                    season: "Winter 2026",
                    guestCount: "300 Guests",
                    coverImage: "/images/hero-royal-stage.jpg",
                    tagline: "Timeless floral architecture & regal hospitality",
                    narrative: ["Write the wedding story narrative here."],
                    highlights: ["Royal Baraat arrival", "Custom Floral Mandap"],
                    gallery: [],
                    quote: {
                      text: "An unforgettable celebration from start to finish.",
                      author: "Couple Name",
                    },
                  },
                ];
                onChange({ ...collections, celebrations: next });
                setSelectedIdx(next.length - 1);
              }}
              onDelete={(idx) => {
                if (items.length <= 1) return;
                onChange({ ...collections, celebrations: items.filter((_, i) => i !== idx) });
                setSelectedIdx(0);
              }}
            />

            {active && (
              <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextField
                    label="Story Title"
                    value={active.title}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        celebrations: items.map((c, i) =>
                          i === selectedIdx ? { ...c, title: val } : c
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Couple Names"
                    value={active.couple}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        celebrations: items.map((c, i) =>
                          i === selectedIdx ? { ...c, couple: val } : c
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Venue"
                    value={active.venue}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        celebrations: items.map((c, i) =>
                          i === selectedIdx ? { ...c, venue: val } : c
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Location"
                    value={active.location}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        celebrations: items.map((c, i) =>
                          i === selectedIdx ? { ...c, location: val } : c
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Season"
                    value={active.season}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        celebrations: items.map((c, i) =>
                          i === selectedIdx ? { ...c, season: val } : c
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Guest Count"
                    value={active.guestCount}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        celebrations: items.map((c, i) =>
                          i === selectedIdx ? { ...c, guestCount: val } : c
                        ),
                      })
                    }
                  />
                </div>
                <TextField
                  label="Tagline"
                  value={active.tagline}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      celebrations: items.map((c, i) =>
                        i === selectedIdx ? { ...c, tagline: val } : c
                      ),
                    })
                  }
                />
                <MediaField
                  label="Cover Photo"
                  value={active.coverImage}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      celebrations: items.map((c, i) =>
                        i === selectedIdx ? { ...c, coverImage: val } : c
                      ),
                    })
                  }
                />
                <StringListEditor
                  label="Narrative Paragraphs"
                  multiline
                  values={active.narrative}
                  onChange={(nextNarrative) =>
                    onChange({
                      ...collections,
                      celebrations: items.map((c, i) =>
                        i === selectedIdx ? { ...c, narrative: nextNarrative } : c
                      ),
                    })
                  }
                />
                <StringListEditor
                  label="Highlights"
                  values={active.highlights}
                  onChange={(nextHighlights) =>
                    onChange({
                      ...collections,
                      celebrations: items.map((c, i) =>
                        i === selectedIdx ? { ...c, highlights: nextHighlights } : c
                      ),
                    })
                  }
                />
                <TextAreaField
                  label="Couple Quote"
                  value={active.quote.text}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      celebrations: items.map((c, i) =>
                        i === selectedIdx ? { ...c, quote: { ...c.quote, text: val } } : c
                      ),
                    })
                  }
                />
                <TextField
                  label="Quote Author"
                  value={active.quote.author}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      celebrations: items.map((c, i) =>
                        i === selectedIdx ? { ...c, quote: { ...c.quote, author: val } } : c
                      ),
                    })
                  }
                />
              </div>
            )}
          </div>
        );
      })()}

      {/* 4. DESTINATIONS & VENUES */}
      {tab === "destinations" && (() => {
        const items = collections.destinations;
        const active = items[selectedIdx] ?? items[0];
        return (
          <div className="space-y-4">
            <ListSelectorBar
              title="Destination Cities"
              items={items.map((d) => `${d.name} (${d.hotels.length} venues)`)}
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              onMove={(idx, delta) =>
                onChange({ ...collections, destinations: moveArrayItem(items, idx, delta) })
              }
              onAdd={() => {
                const next = [
                  ...items,
                  {
                    id: `city-${Date.now()}`,
                    name: "New Destination",
                    tagline: "Regal Palaces & Sanctuaries",
                    region: "Rajasthan",
                    description: "Describe this royal wedding destination.",
                    venues: ["Heritage Palace Hotel"],
                    hotels: [],
                    vibe: "Timeless Royal Elegance",
                    bestSeason: "October to March",
                    imageUrl: "/images/service-royal-night.jpg",
                  },
                ];
                onChange({ ...collections, destinations: next });
                setSelectedIdx(next.length - 1);
              }}
              onDelete={(idx) => {
                if (items.length <= 1) return;
                onChange({ ...collections, destinations: items.filter((_, i) => i !== idx) });
                setSelectedIdx(0);
              }}
            />

            {active && (
              <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <TextField
                    label="City Name"
                    value={active.name}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        destinations: items.map((d, i) =>
                          i === selectedIdx ? { ...d, name: val } : d
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Region"
                    value={active.region}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        destinations: items.map((d, i) =>
                          i === selectedIdx ? { ...d, region: val } : d
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Best Season"
                    value={active.bestSeason}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        destinations: items.map((d, i) =>
                          i === selectedIdx ? { ...d, bestSeason: val } : d
                        ),
                      })
                    }
                  />
                </div>
                <TextField
                  label="Tagline"
                  value={active.tagline}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      destinations: items.map((d, i) =>
                        i === selectedIdx ? { ...d, tagline: val } : d
                      ),
                    })
                  }
                />
                <TextField
                  label="Vibe Badge"
                  value={active.vibe}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      destinations: items.map((d, i) =>
                        i === selectedIdx ? { ...d, vibe: val } : d
                      ),
                    })
                  }
                />
                <TextAreaField
                  label="Description"
                  value={active.description}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      destinations: items.map((d, i) =>
                        i === selectedIdx ? { ...d, description: val } : d
                      ),
                    })
                  }
                />
                <MediaField
                  label="City Cover Image"
                  value={active.imageUrl}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      destinations: items.map((d, i) =>
                        i === selectedIdx ? { ...d, imageUrl: val } : d
                      ),
                    })
                  }
                />
                <StringListEditor
                  label="Featured Venue Names"
                  values={active.venues}
                  onChange={(nextVenues) =>
                    onChange({
                      ...collections,
                      destinations: items.map((d, i) =>
                        i === selectedIdx ? { ...d, venues: nextVenues } : d
                      ),
                    })
                  }
                />

                {/* Nested Hotels Manager */}
                <div className="pt-3 border-t border-gold/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C5147]">
                      Hotel &amp; Palace Directory ({active.hotels.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const nextHotels = [
                          ...active.hotels,
                          {
                            name: "New Heritage Palace",
                            slug: `venue-${Date.now()}`,
                            category: "heritage-palace" as HotelCategory,
                            categoryLabel: "Heritage Palace",
                            location: `${active.name}, ${active.region}`,
                            rooms: 120,
                            capacity: 300,
                            image: "/images/destinations/hotels/rambagh-palace.webp",
                            shortInfo: "Luxury palatial estate for destination weddings.",
                            highlights: ["Royal Architecture", "Lawn Capacity"],
                          },
                        ];
                        onChange({
                          ...collections,
                          destinations: items.map((d, i) =>
                            i === selectedIdx ? { ...d, hotels: nextHotels } : d
                          ),
                        });
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
                    >
                      + Add Hotel / Palace
                    </button>
                  </div>

                  {active.hotels.map((hotel, hIdx) => (
                    <div
                      key={`${hotel.slug}-${hIdx}`}
                      className="p-3 rounded-[2px] bg-[#FAF7F2] border border-gold/20 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={hotel.name}
                          onChange={(e) => {
                            const nextHotels = active.hotels.map((h, i) =>
                              i === hIdx ? { ...h, name: e.target.value } : h
                            );
                            onChange({
                              ...collections,
                              destinations: items.map((d, i) =>
                                i === selectedIdx ? { ...d, hotels: nextHotels } : d
                              ),
                            });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs font-semibold bg-white border border-gold/25 rounded-[2px]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const nextHotels = active.hotels.filter((_, i) => i !== hIdx);
                            onChange({
                              ...collections,
                              destinations: items.map((d, i) =>
                                i === selectedIdx ? { ...d, hotels: nextHotels } : d
                              ),
                            });
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={hotel.category}
                          onChange={(e) => {
                            const nextHotels = active.hotels.map((h, i) =>
                              i === hIdx
                                ? { ...h, category: e.target.value as HotelCategory }
                                : h
                            );
                            onChange({
                              ...collections,
                              destinations: items.map((d, i) =>
                                i === selectedIdx ? { ...d, hotels: nextHotels } : d
                              ),
                            });
                          }}
                          className="px-2 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                        >
                          <option value="heritage-palace">Heritage Palace</option>
                          <option value="luxury-resort">Luxury Resort</option>
                          <option value="boutique-fort">Boutique Fort</option>
                        </select>
                        <input
                          type="number"
                          value={hotel.rooms}
                          onChange={(e) => {
                            const nextHotels = active.hotels.map((h, i) =>
                              i === hIdx ? { ...h, rooms: Number(e.target.value) } : h
                            );
                            onChange({
                              ...collections,
                              destinations: items.map((d, i) =>
                                i === selectedIdx ? { ...d, hotels: nextHotels } : d
                              ),
                            });
                          }}
                          placeholder="Rooms"
                          className="px-2 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                        />
                        <input
                          type="number"
                          value={hotel.capacity}
                          onChange={(e) => {
                            const nextHotels = active.hotels.map((h, i) =>
                              i === hIdx ? { ...h, capacity: Number(e.target.value) } : h
                            );
                            onChange({
                              ...collections,
                              destinations: items.map((d, i) =>
                                i === selectedIdx ? { ...d, hotels: nextHotels } : d
                              ),
                            });
                          }}
                          placeholder="Capacity"
                          className="px-2 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                        />
                      </div>
                      <MediaField
                        label="Venue Photo"
                        value={hotel.image}
                        onChange={(val) => {
                          const nextHotels = active.hotels.map((h, i) =>
                            i === hIdx ? { ...h, image: val } : h
                          );
                          onChange({
                            ...collections,
                            destinations: items.map((d, i) =>
                              i === selectedIdx ? { ...d, hotels: nextHotels } : d
                            ),
                          });
                        }}
                      />
                      <textarea
                        rows={2}
                        value={hotel.shortInfo}
                        onChange={(e) => {
                          const nextHotels = active.hotels.map((h, i) =>
                            i === hIdx ? { ...h, shortInfo: e.target.value } : h
                          );
                          onChange({
                            ...collections,
                            destinations: items.map((d, i) =>
                              i === selectedIdx ? { ...d, hotels: nextHotels } : d
                            ),
                          });
                        }}
                        className="w-full px-2.5 py-1 text-xs bg-white border border-gold/25 rounded-[2px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* 5. TESTIMONIALS */}
      {tab === "testimonials" && (() => {
        const items = collections.testimonials;
        const active = items[selectedIdx] ?? items[0];
        return (
          <div className="space-y-4">
            <ListSelectorBar
              title="Testimonials"
              items={items.map((t) => `${t.couple} (${t.location})`)}
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              onMove={(idx, delta) =>
                onChange({ ...collections, testimonials: moveArrayItem(items, idx, delta) })
              }
              onAdd={() => {
                const next = [
                  ...items,
                  {
                    id: `${Date.now()}`,
                    couple: "New Couple",
                    venue: "Royal Palace",
                    location: "Jaipur, Rajasthan",
                    date: "Winter 2026",
                    tagline: "Sacred Vedic Ceremony",
                    quote: "Share the couple's heartfelt reflection here.",
                    imageUrl: "/images/service-varmala-mandap.jpg",
                    secondaryImageUrl: "/images/service-crystal-reception.jpg",
                  },
                ];
                onChange({ ...collections, testimonials: next });
                setSelectedIdx(next.length - 1);
              }}
              onDelete={(idx) => {
                if (items.length <= 1) return;
                onChange({ ...collections, testimonials: items.filter((_, i) => i !== idx) });
                setSelectedIdx(0);
              }}
            />
            {active && (
              <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextField
                    label="Couple Name"
                    value={active.couple}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        testimonials: items.map((t, i) =>
                          i === selectedIdx ? { ...t, couple: val } : t
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Venue"
                    value={active.venue}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        testimonials: items.map((t, i) =>
                          i === selectedIdx ? { ...t, venue: val } : t
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Location"
                    value={active.location}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        testimonials: items.map((t, i) =>
                          i === selectedIdx ? { ...t, location: val } : t
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Date"
                    value={active.date}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        testimonials: items.map((t, i) =>
                          i === selectedIdx ? { ...t, date: val } : t
                        ),
                      })
                    }
                  />
                </div>
                <TextField
                  label="Tagline"
                  value={active.tagline}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      testimonials: items.map((t, i) =>
                        i === selectedIdx ? { ...t, tagline: val } : t
                      ),
                    })
                  }
                />
                <TextAreaField
                  label="Quote"
                  value={active.quote}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      testimonials: items.map((t, i) =>
                        i === selectedIdx ? { ...t, quote: val } : t
                      ),
                    })
                  }
                />
                <MediaField
                  label="Primary Photo"
                  value={active.imageUrl}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      testimonials: items.map((t, i) =>
                        i === selectedIdx ? { ...t, imageUrl: val } : t
                      ),
                    })
                  }
                />
                <MediaField
                  label="Secondary Companion Photo"
                  value={active.secondaryImageUrl}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      testimonials: items.map((t, i) =>
                        i === selectedIdx ? { ...t, secondaryImageUrl: val } : t
                      ),
                    })
                  }
                />
              </div>
            )}
          </div>
        );
      })()}

      {/* 6. BLOG */}
      {tab === "blog" && (() => {
        const items = collections.blogPosts;
        const active = items[selectedIdx] ?? items[0];
        return (
          <div className="space-y-4">
            <ListSelectorBar
              title="Journal Articles"
              items={items.map((b) => b.title)}
              selectedIdx={selectedIdx}
              onSelect={setSelectedIdx}
              onMove={(idx, delta) =>
                onChange({ ...collections, blogPosts: moveArrayItem(items, idx, delta) })
              }
              onAdd={() => {
                const next: BlogPost[] = [
                  ...items,
                  {
                    slug: `journal-guide-${Date.now()}`,
                    title: "New Destination Wedding Guide",
                    excerpt: "A refined planning insight by Wedding Flora.",
                    category: "Destination Planning",
                    readTime: "5 min read",
                    publishedAt: "November 2026",
                    author: {
                      name: "Planning Directors",
                      role: "Editorial Desk",
                      avatar: "/images/logo-emblem.png",
                    },
                    coverImage: "/images/service-royal-night.jpg",
                    tags: ["Rajasthan", "Luxury Weddings"],
                    content: [
                      {
                        heading: "Introduction",
                        paragraphs: ["Write your article content here."],
                      },
                    ],
                  },
                ];
                onChange({ ...collections, blogPosts: next });
                setSelectedIdx(next.length - 1);
              }}
              onDelete={(idx) => {
                if (items.length <= 1) return;
                onChange({ ...collections, blogPosts: items.filter((_, i) => i !== idx) });
                setSelectedIdx(0);
              }}
            />
            {active && (
              <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
                <TextField
                  label="Slug (URL)"
                  value={active.slug}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      blogPosts: items.map((b, i) =>
                        i === selectedIdx ? { ...b, slug: val } : b
                      ),
                    })
                  }
                />
                <TextField
                  label="Article Title"
                  value={active.title}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      blogPosts: items.map((b, i) =>
                        i === selectedIdx ? { ...b, title: val } : b
                      ),
                    })
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
                      Category
                    </label>
                    <select
                      value={active.category}
                      onChange={(e) =>
                        onChange({
                          ...collections,
                          blogPosts: items.map((b, i) =>
                            i === selectedIdx
                              ? { ...b, category: e.target.value as BlogPost["category"] }
                              : b
                          ),
                        })
                      }
                      className="w-full px-2.5 py-2 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
                    >
                      {BLOG_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <TextField
                    label="Published Date"
                    value={active.publishedAt}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        blogPosts: items.map((b, i) =>
                          i === selectedIdx ? { ...b, publishedAt: val } : b
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Read Time"
                    value={active.readTime}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        blogPosts: items.map((b, i) =>
                          i === selectedIdx ? { ...b, readTime: val } : b
                        ),
                      })
                    }
                  />
                </div>
                <TextAreaField
                  label="Excerpt"
                  value={active.excerpt}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      blogPosts: items.map((b, i) =>
                        i === selectedIdx ? { ...b, excerpt: val } : b
                      ),
                    })
                  }
                />
                <MediaField
                  label="Cover Photo"
                  value={active.coverImage}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      blogPosts: items.map((b, i) =>
                        i === selectedIdx ? { ...b, coverImage: val } : b
                      ),
                    })
                  }
                />
                <div className="space-y-2 pt-2 border-t border-gold/15">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C5147]">
                      Article Content Blocks ({active.content.length})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...collections,
                          blogPosts: items.map((b, i) =>
                            i === selectedIdx
                              ? {
                                  ...b,
                                  content: [
                                    ...b.content,
                                    { heading: "New Section", paragraphs: [""] },
                                  ],
                                }
                              : b
                          ),
                        })
                      }
                      className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
                    >
                      + Add Block
                    </button>
                  </div>
                  {active.content.map((block, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-3 rounded-[2px] bg-[#FAF7F2] border border-gold/20 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={block.heading ?? ""}
                          placeholder="Section Heading"
                          onChange={(e) => {
                            const nextContent = active.content.map((blk, i) =>
                              i === bIdx ? { ...blk, heading: e.target.value } : blk
                            );
                            onChange({
                              ...collections,
                              blogPosts: items.map((b, i) =>
                                i === selectedIdx ? { ...b, content: nextContent } : b
                              ),
                            });
                          }}
                          className="flex-1 px-2.5 py-1 text-xs font-semibold bg-white border border-gold/25 rounded-[2px]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const nextContent = active.content.filter((_, i) => i !== bIdx);
                            onChange({
                              ...collections,
                              blogPosts: items.map((b, i) =>
                                i === selectedIdx ? { ...b, content: nextContent } : b
                              ),
                            });
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <StringListEditor
                        label="Paragraphs"
                        multiline
                        values={block.paragraphs}
                        onChange={(nextParas) => {
                          const nextContent = active.content.map((blk, i) =>
                            i === bIdx ? { ...blk, paragraphs: nextParas } : blk
                          );
                          onChange({
                            ...collections,
                            blogPosts: items.map((b, i) =>
                              i === selectedIdx ? { ...b, content: nextContent } : b
                            ),
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* 7. WORKING PROCESS, RITUALS & FAQs */}
      {tab === "process" && (
        <div className="space-y-6">
          {/* Process Steps */}
          <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-gold/15 pb-2">
              <h4 className="font-serif text-base font-bold text-[#1A1209]">
                Working Process Steps ({collections.processSteps.length})
              </h4>
            </div>
            {collections.processSteps.map((step, sIdx) => (
              <div
                key={step.stepNumber}
                className="p-3 rounded-[2px] bg-[#FAF7F2] border border-gold/20 space-y-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <TextField
                    label={`Step ${step.stepNumber} Title`}
                    value={step.title}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        processSteps: collections.processSteps.map((st, i) =>
                          i === sIdx ? { ...st, title: val } : st
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Subtitle"
                    value={step.subtitle}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        processSteps: collections.processSteps.map((st, i) =>
                          i === sIdx ? { ...st, subtitle: val } : st
                        ),
                      })
                    }
                  />
                  <TextField
                    label="Deliverable"
                    value={step.deliverable}
                    onChange={(val) =>
                      onChange({
                        ...collections,
                        processSteps: collections.processSteps.map((st, i) =>
                          i === sIdx ? { ...st, deliverable: val } : st
                        ),
                      })
                    }
                  />
                </div>
                <TextAreaField
                  label="Description"
                  value={step.description}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      processSteps: collections.processSteps.map((st, i) =>
                        i === sIdx ? { ...st, description: val } : st
                      ),
                    })
                  }
                />
                <MediaField
                  label="Step Image"
                  value={step.image}
                  onChange={(val) =>
                    onChange({
                      ...collections,
                      processSteps: collections.processSteps.map((st, i) =>
                        i === sIdx ? { ...st, image: val } : st
                      ),
                    })
                  }
                />
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="bg-white border border-gold/25 rounded-[3px] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-gold/15 pb-2">
              <h4 className="font-serif text-base font-bold text-[#1A1209]">
                FAQs ({collections.ritualFaqs.length})
              </h4>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...collections,
                    ritualFaqs: [
                      ...collections.ritualFaqs,
                      { question: "New Question?", answer: "Detailed answer." },
                    ],
                  })
                }
                className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
              >
                + Add FAQ
              </button>
            </div>
            {collections.ritualFaqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="p-3 rounded-[2px] bg-[#FAF7F2] border border-gold/20 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      onChange({
                        ...collections,
                        ritualFaqs: collections.ritualFaqs.map((q, i) =>
                          i === fIdx ? { ...q, question: e.target.value } : q
                        ),
                      })
                    }
                    className="flex-1 px-2.5 py-1.5 text-xs font-semibold bg-white border border-gold/25 rounded-[2px]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...collections,
                        ritualFaqs: collections.ritualFaqs.filter((_, i) => i !== fIdx),
                      })
                    }
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) =>
                    onChange({
                      ...collections,
                      ritualFaqs: collections.ritualFaqs.map((q, i) =>
                        i === fIdx ? { ...q, answer: e.target.value } : q
                      ),
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gold/25 rounded-[2px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Small Typed Helper Inputs ────────────────────────────────────────────── */
function ListSelectorBar({
  title,
  items,
  selectedIdx,
  onSelect,
  onMove,
  onAdd,
  onDelete,
}: {
  title: string;
  items: string[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
  onMove: (idx: number, delta: -1 | 1) => void;
  onAdd: () => void;
  onDelete: (idx: number) => void;
}) {
  return (
    <div className="bg-white border border-gold/25 rounded-[3px] p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-serif text-sm font-bold text-[#1A1209]">{title}</span>
        <button
          type="button"
          onClick={onAdd}
          className="px-2.5 py-1 rounded-[2px] bg-[#D4AF37] text-[#1A1209] hover:bg-[#1A1209] hover:text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
        >
          <Plus size={11} />
          <span>Add New</span>
        </button>
      </div>
      <div className="max-h-48 overflow-y-auto space-y-1">
        {items.map((label, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-[2px] border text-xs ${
              idx === selectedIdx
                ? "bg-[#FAF7F2] border-gold font-semibold"
                : "bg-white border-gold/15"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(idx)}
              className="flex-1 text-left truncate"
            >
              {idx + 1}. {label}
            </button>
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => onMove(idx, -1)}
                disabled={idx === 0}
                className="p-1 disabled:opacity-30"
              >
                <ArrowUp size={12} />
              </button>
              <button
                type="button"
                onClick={() => onMove(idx, 1)}
                disabled={idx === items.length - 1}
                className="p-1 disabled:opacity-30"
              >
                <ArrowDown size={12} />
              </button>
              <button
                type="button"
                onClick={() => onDelete(idx)}
                disabled={items.length <= 1}
                className="p-1 text-red-600 disabled:opacity-30"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147] block">
        {label}
      </label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px] focus:outline-none focus:border-gold"
      />
    </div>
  );
}

function StringListEditor({
  label,
  values,
  multiline = false,
  onChange,
}: {
  label: string;
  values: string[];
  multiline?: boolean;
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#5C5147]">
          {label} ({values.length})
        </label>
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="text-[10px] font-bold uppercase tracking-wider text-gold hover:text-[#1A1209]"
        >
          + Add
        </button>
      </div>
      {values.map((val, idx) => (
        <div key={idx} className="flex items-start gap-2">
          {multiline ? (
            <textarea
              rows={2}
              value={val}
              onChange={(e) => {
                const copy = [...values];
                copy[idx] = e.target.value;
                onChange(copy);
              }}
              className="flex-1 px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
            />
          ) : (
            <input
              type="text"
              value={val}
              onChange={(e) => {
                const copy = [...values];
                copy[idx] = e.target.value;
                onChange(copy);
              }}
              className="flex-1 px-2.5 py-1.5 text-xs bg-[#FAF7F2] border border-gold/25 rounded-[2px]"
            />
          )}
          <button
            type="button"
            onClick={() => onChange(values.filter((_, i) => i !== idx))}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}

