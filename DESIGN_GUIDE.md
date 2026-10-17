# Design Guide

**Aesthetic:** classic, romantic, timeless. Think printed wedding stationery: generous white space, fine lines, elegant serif type, soft natural photography.

## Colour palette

| Role | Name | Hex |
| :--- | :--- | :--- |
| Background | Ivory | `#FAF7F2` |
| Alt background | Warm cream | `#F1EBE0` |
| Soft accent | Blush | `#E8D5D0` |
| Primary accent | Antique gold | `#B79A5B` |
| Deep accent | Dusty sage | `#7A8B78` |
| Text | Charcoal | `#2B2B2B` |
| Muted text | Warm grey | `#6B645C` |

Notes:
- Gold has low contrast on ivory. Use it for lines, icons, borders and large headings, **not** small body text.
- Buttons: charcoal or deep sage fill with ivory text, or a gold outline with charcoal text.
- Keep colour use restrained: mostly ivory, cream and charcoal, with gold as the highlight.

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
