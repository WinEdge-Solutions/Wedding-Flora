# Design Guide

**Aesthetic:** classic, romantic, timeless. Think printed wedding stationery: generous white space, fine lines, elegant serif type, soft natural photography.

## Colour palette

The color theme directly revolves around the official **Wedding Flora crest & logo** palette (`/public/images/logo.png` and `logo-emblem.png`):

| Role | Name | Hex | Origin / Purpose |
| :--- | :--- | :--- | :--- |
| Primary Base | Ivory | `#FAF7F2` | Canvas & high-end wedding stationery background |
| Alt Base | Warm cream | `#F1EBE0` | Alternating section backgrounds & subtle cards |
| Floral Accent | Blossom Blush | `#F1DCE1` | Exact logo blossom petal hue; soft badges & aurora glow |
| Rich Floral | Petal Rose | `#E5B8C3` | Deeper floral tint for hover states & romantic accents |
| Brand Accent | Antique gold | `#AB9178` | Exact logo champagne bronze / antique leaf tone |
| Highlight Accent| Radiant gold | `#D4AF37` | Luminous metallic gold for CTAs, stars, borders, and shimmer |
| Botanical Accent| Dusty sage | `#9DB49B` | Natural floral foliage companion |
| Dark Neutral | Emblem Charcoal| `#5D5956` | Exact logo emblem linework & typography |
| Light Neutral | Warm grey | `#D7D3CF` | Soft logo-matched hairline borders & dividers |
| Night Backdrop | Midnight Onyx | `#030308` | Luxury nocturnal atmosphere for palace / royal theme |

Notes:
- Gold has low contrast on ivory. Use it for lines, icons, borders, large headings, and buttons with dark ink, **not** small body text.
- Buttons: gradient gold fill with dark ink, or subtle glass with gold outline and hover glow.
- Keep colour use restrained: 60% ivory/midnight canvas, 30% structural charcoal/linen, with gold and blossom blush as the 10% focal accents.

## Typography

- **Headings:** Cormorant Garamond (weights 400 to 600). Large, airy, slightly increased letter-spacing on small caps labels.
- **Body:** Lato (weights 300 to 400), 16 to 18px, line height 1.7.
- Optional script font (e.g. Pinyon Script) only for one or two decorative accents such as a logo or a short tagline.

| Element | Size (desktop) |
| :--- | :--- |
| H1 | 56 to 72px |
| H2 | 40 to 48px |
| H3 | 24 to 28px |
| Body | 16 to 18px |

## Layout and spacing

- Max content width about 1200px, centred.
- Very generous vertical spacing between sections (96 to 128px desktop, 64px mobile).
- Use a 12-column grid. Prefer asymmetry through image and text pairs.
- Thin 1px gold or warm-grey divider lines and small ornamental dividers instead of heavy boxes or shadows.
- Corners: square or very slightly rounded (2 to 4px). Avoid pill-shaped or bubbly elements.

## Imagery

- Soft, natural-light photography: florals, ceremonies, table settings, candid moments.
- Consistent warm tone across images. Avoid harsh filters.
- Full-width hero image with a light overlay for text legibility.
- Gallery: clean masonry or two-column grid with a gentle lightbox.

## Components

- **Navbar:** simple, centred logo, a few links, a clear "Enquire" button. Sticky with a soft ivory background.
- **Hero:** big serif headline, short subline, one primary call to action.
- **Service cards:** image on top, serif title, two lines of text, subtle hover lift.
- **Testimonials:** large serif quote, couple's names in small caps.
- **Enquiry form:** minimal underlined inputs, clear labels, friendly success message.
- **Footer:** contact details, social links, small monogram or logo.

## Motion

Subtle only: fade-in on scroll, 200 to 400ms hover transitions, smooth anchor scrolling. Respect `prefers-reduced-motion`.

## Tone of voice

Warm, graceful, reassuring and professional. Speak to couples directly ("your day", "your story"). Avoid slang and exclamation marks.

## Accessibility

- Text contrast of at least 4.5:1.
- Visible keyboard focus styles (gold or sage outline).
- Alt text on all images, labels on all form fields.
- Touch targets at least 44px on mobile.
