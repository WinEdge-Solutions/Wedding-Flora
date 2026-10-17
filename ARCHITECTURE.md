# Architecture

Technical overview of the Wedding Flora website. Update this file when structure or major decisions change.

## 1. Summary

A mostly static, content-driven marketing site built with Next.js (App Router). Pages are server-rendered or statically generated for speed and SEO. The only dynamic piece at launch is the enquiry form, handled by a server route that sends an email.

```
Browser  -->  Vercel (Next.js)  -->  Static pages (HTML, CSS, JS, images)
                    |
                    +--> /api/contact  -->  Email provider (Resend)  -->  Company inbox
```

## 2. Technology choices

| Concern | Choice | Why |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | SEO, image optimisation, simple routing, easy Vercel deploys |
| **Language** | TypeScript | Fewer bugs, easier for two people plus an agent to edit safely |
| **Styling** | Tailwind CSS | Fast, consistent, design tokens in one config |
| **Fonts** | `next/font` (Cormorant Garamond, Lato) | Self-hosted, no layout shift |
| **Forms** | React Hook Form + Zod | Client and server validation share one schema |
| **Email** | Resend (or SMTP) | Simple API, reliable delivery |
| **Images** | `next/image` | Automatic resizing and lazy loading |
| **Hosting** | Vercel | Git-based deploys, preview URL per PR |
| **Content (MVP)** | Typed data files in `src/lib/content/` | No database needed; easy to move to a CMS later |

## 3. Folder structure

```text
Wedding-Flora/
├── public/
│   └── images/               # logos, hero, gallery (optimised)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # root layout, fonts, navbar, footer
│   │   ├── page.tsx          # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── packages/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/contact/route.ts   # enquiry endpoint
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/           # Navbar, Footer, Container, Section
│   │   ├── ui/               # Button, Divider, SectionHeading, Card
│   │   ├── home/             # Hero, ServicesOverview, FeaturedWork
│   │   ├── portfolio/        # Gallery, Lightbox, FilterBar
│   │   └── contact/          # EnquiryForm
│   └── lib/
│       ├── content/          # services.ts, packages.ts, testimonials.ts, gallery.ts
│       ├── validation.ts     # Zod schemas
│       ├── email.ts          # email sending helper
│       └── site.ts           # site name, URLs, contact details, social links
├── .env.example
├── .gitignore
├── tailwind.config.ts        # palette, fonts, spacing tokens
├── next.config.ts
├── README.md
├── PRD.md
├── ARCHITECTURE.md
├── PROJECT_PLAN.md
├── DESIGN_GUIDE.md
├── CONTRIBUTING.md
└── AGENTS.md
```

## 4. Routing

| Route | Rendering | Notes |
| :--- | :--- | :--- |
| `/` | Static | Hero, services, featured work, testimonials, CTA |
| `/about` | Static | |
| `/services` | Static | Data from `lib/content/services.ts` |
| `/portfolio` | Static | Gallery with client-side filters and lightbox |
| `/packages` | Static | Data from `lib/content/packages.ts` |
| `/contact` | Static page, dynamic form | Form posts to `/api/contact` |
| `/api/contact` | Server (POST only) | Validate, rate-limit, send email |

## 5. Component conventions

- **Server components by default.** Add `"use client"` only where needed (form, lightbox, filters, mobile menu).
- Page files only compose sections. Visual and logic code lives in `components/`.
- Styling uses Tailwind theme tokens (`bg-ivory`, `text-charcoal`, `text-gold`), never raw hex values.
- Shared content (copy, packages, testimonials) lives in `lib/content/` so text can be changed without touching components.

## 6. Design tokens

Defined once in `tailwind.config.ts`, matching `DESIGN_GUIDE.md`:

```text
colors:  ivory #FAF7F2, cream #F1EBE0, blush #E8D5D0,
         gold #B79A5B, sage #7A8B78, charcoal #2B2B2B, warmgrey #6B645C
fonts:   serif -> Cormorant Garamond, sans -> Lato
```

## 7. Enquiry form flow

1. User fills the form (`EnquiryForm`), validated client-side with Zod.
2. Form POSTs JSON to `/api/contact`.
3. The route re-validates with the same Zod schema, checks the honeypot field, and applies a simple rate limit per IP.
4. `lib/email.ts` sends the enquiry to `CONTACT_TO_EMAIL` via Resend. An optional auto-reply goes to the couple.
5. The route returns `{ ok: true }` or an error; the UI shows a success or error message.

Nothing is stored in a database at launch. If enquiries need tracking later, add a database (e.g. Supabase) or CRM webhook behind the same route.

## 8. Environment variables

| Variable | Purpose |
| :--- | :--- |
| `RESEND_API_KEY` | Email provider key (server only) |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO and Open Graph |

Only variables prefixed `NEXT_PUBLIC_` reach the browser. Keep real values in `.env.local` and in Vercel project settings. Never commit them.

## 9. SEO

- Per-page `metadata` (title, description, Open Graph image).
- `sitemap.ts` and `robots.ts` generated by Next.js.
- Semantic HTML with one `h1` per page.
- JSON-LD structured data (`LocalBusiness` or `Organization`) on Home and Contact.
- Descriptive image alt text and clean URLs.

## 10. Performance and accessibility

- Hero and gallery images through `next/image` with explicit sizes and `priority` only on the hero.
- Fonts via `next/font` with `display: swap`.
- Minimal client-side JavaScript; avoid heavy animation libraries.
- Respect `prefers-reduced-motion`.
- Visible focus states, labelled inputs, sufficient contrast.

## 11. Deployment and workflow

- GitHub repo `winedgesolutions/Wedding-Flora`, `main` is protected.
- Each Pull Request gets a Vercel preview URL for review.
- Merging to `main` deploys to production.
- Before merging: `npm run lint` and `npm run build` must pass (see `CONTRIBUTING.md`).

## 12. Future extensions

- Headless CMS (Sanity or similar) so the client can edit content.
- Blog under `/blog` using MDX.
- Booking widget (Calendly) on `/contact`.
- Multi-language routing with `next-intl`.
- Database or CRM integration for enquiry tracking.

## 13. Decision log

| Date | Decision | Reason |
| :--- | :--- | :--- |
| (add) | Next.js + Tailwind on Vercel | Fast, SEO-friendly, simple for a small team |
| (add) | Content in typed files, no CMS at MVP | Keeps scope small; can migrate later |
