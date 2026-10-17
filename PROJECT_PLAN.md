# Project Plan

Wedding Flora: a classic, elegant website for a wedding planning and management company.

## Goals

1. Present the company as trustworthy, refined and experienced.
2. Showcase past work and services.
3. Convert visitors into enquiries.

## Sitemap

| Page | Purpose |
| :--- | :--- |
| **Home** | Hero, services overview, featured work, testimonials, call to action |
| **About** | Company story, team, approach |
| **Services** | Full planning, partial planning, day-of coordination, decor and florals, vendor management |
| **Portfolio** | Gallery of weddings, filterable by style or venue |
| **Packages** | Package tiers and what is included |
| **Testimonials** | Reviews from couples (can be a section on Home first) |
| **Contact / Enquire** | Enquiry form, phone, email, location |
| **Blog (optional, later)** | Planning tips, real weddings |

## Features

### Must have
- Responsive layout (mobile, tablet, desktop)
- Enquiry form with validation and email delivery
- Image gallery with lightbox
- Basic SEO (titles, meta descriptions, Open Graph images, sitemap)

### Nice to have
- WhatsApp / click-to-call buttons
- Instagram feed or link-out
- Blog or planning checklist download
- Consultation booking (Calendly embed)
- Analytics

## Roles

| Person | Focus (edit names) |
| :--- | :--- |
| **Person A** | Layout, design system, Home, Services, Portfolio |
| **Person B** | Contact form and API, About, Packages, SEO, deployment |

Agree on file ownership before starting each task to avoid merge conflicts.

## Task checklist

### Phase 0: Setup
- [ ] Create GitHub org, repo and invite teammate
- [ ] Initialise Next.js + TypeScript + Tailwind project
- [ ] Add `.gitignore`, `.env.example`, and these `.md` files
- [ ] Set up Tailwind theme with palette and fonts from `DESIGN_GUIDE.md`
- [ ] Protect `main` (require pull requests)

### Phase 1: Foundation
- [ ] Layout: navbar, footer, container, section components
- [ ] Reusable Button, SectionHeading, Divider components
- [ ] Home page hero

### Phase 2: Pages
- [ ] Home: services overview, featured work, testimonials, CTA
- [ ] About
- [ ] Services
- [ ] Portfolio gallery with lightbox
- [ ] Packages
- [ ] Contact page and enquiry form (with API route and email)

### Phase 3: Polish
- [ ] Replace placeholder copy and images with real content
- [ ] Image optimisation and alt text
- [ ] Accessibility pass (contrast, keyboard, labels)
- [ ] SEO: metadata, sitemap, robots, Open Graph
- [ ] Cross-browser and mobile testing

### Phase 4: Launch
- [ ] Deploy to Vercel
- [ ] Connect custom domain and HTTPS
- [ ] Test enquiry form in production
- [ ] Add analytics

## Open questions for the client

- Final company name, logo and brand colours (if they already exist)
- Package names and pricing (shown or "on request"?)
- Service locations
- Real photos and testimonials
- Contact email, phone and social links
- Domain name
