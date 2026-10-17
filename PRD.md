# Product Requirements Document (PRD)

**Product:** Wedding Flora website  
**Owner:** WinEdge Solutions  
**Status:** Draft v0.1  

## 1. Overview

Wedding Flora is a wedding planning and management company. This website is its public face: it builds trust, shows past work and turns visitors into enquiries. The look and feel is classic, elegant and timeless (see `DESIGN_GUIDE.md`).

## 2. Goals

| # | Goal | How we measure it |
|---|------|-------------------|
| G1 | Generate qualified enquiries | Enquiry form submissions per month |
| G2 | Build credibility | Portfolio and testimonial views, time on site |
| G3 | Look polished on every device | Lighthouse score 90+ on mobile, no layout bugs |
| G4 | Be found on search | Indexed pages, ranking for "wedding planner [city]" |

## 3. Target users

- **Engaged couples (primary):** aged 24 to 38, browsing mostly on mobile, want to see real work, understand packages and feel they can trust the planner.
- **Parents / family members (secondary):** often involved in decisions and payment, want clear information and reassurance.
- **Company staff (admin):** need to update content and receive enquiries without developer help (later phase).

## 4. User stories

- As a couple, I want to see photos of past weddings so I can judge the company's taste and quality.
- As a couple, I want to understand the services and packages so I can pick what fits my budget.
- As a couple, I want to send an enquiry with my date, venue and guest count so the planner can respond with a quote.
- As a visitor on my phone, I want pages to load quickly and be easy to read.
- As a family member, I want to read testimonials so I feel confident hiring them.
- As the company owner, I want enquiries emailed to me instantly so I never miss a lead.

## 5. Functional requirements

### Must have (MVP)

| ID | Requirement |
|----|-------------|
| F1 | Pages: Home, About, Services, Portfolio, Packages, Contact |
| F2 | Responsive layout for mobile, tablet and desktop |
| F3 | Enquiry form: name, email, phone, wedding date, venue/city, guest count, message |
| F4 | Form validation, spam protection and a clear success or error message |
| F5 | Enquiry delivered by email to the company inbox |
| F6 | Portfolio gallery with lightbox viewer |
| F7 | Testimonials section |
| F8 | SEO basics: page titles, meta descriptions, Open Graph tags, sitemap, robots.txt |
| F9 | Click-to-call and WhatsApp / email links |

### Should have

| ID | Requirement |
|----|-------------|
| F10 | Portfolio filters (style, venue type, season) |
| F11 | Consultation booking embed (e.g. Calendly) |
| F12 | Instagram link or feed |
| F13 | Analytics (privacy-friendly) |

### Could have (later)

| ID | Requirement |
|----|-------------|
| F14 | Blog with planning tips |
| F15 | Admin / CMS for editing content |
| F16 | Multi-language support |
| F17 | Downloadable planning checklist (email capture) |

## 6. Non-functional requirements

- **Performance:** Largest Contentful Paint under 2.5s on mobile; images optimised and lazy-loaded.
- **Accessibility:** WCAG 2.1 AA (contrast, keyboard navigation, labels, alt text).
- **Browser support:** latest two versions of Chrome, Safari, Firefox and Edge; iOS Safari and Android Chrome.
- **Security:** HTTPS, no secrets in the repo, server-side validation of the form, rate limiting on the form endpoint.
- **Privacy:** short privacy notice; no personal data stored beyond the enquiry email unless agreed.
- **Maintainability:** typed code, reusable components, documented workflow.

## 7. Out of scope (for MVP)

- Online payments or booking deposits
- Client login or planning dashboard
- Vendor marketplace
- Native mobile app

## 8. Assumptions

- Stack is Next.js + TypeScript + Tailwind, hosted on Vercel.
- The company will supply photos, copy, logo and testimonials; until then we use marked placeholders.
- Enquiries are handled by email; no CRM integration at launch.

## 9. Risks

| Risk | Mitigation |
|------|------------|
| Real content (photos, copy) arrives late | Use placeholders marked `TODO: replace`; build layouts to handle varied image sizes |
| Large images slow the site | Use `next/image`, compress source files, set size limits |
| Form spam | Honeypot field, rate limiting, optional captcha |
| Two people editing the same files | Branch workflow and file ownership in `CONTRIBUTING.md` |

## 10. Milestones

| Milestone | Target |
|-----------|--------|
| M1: Repo, setup and design system | Week 1 |
| M2: All MVP pages built with placeholders | Weeks 2 to 3 |
| M3: Form, SEO and real content | Week 4 |
| M4: Testing and launch | Week 5 |

Dates are estimates; adjust once the client confirms content delivery.

## 11. Open questions

- Final brand name, logo and colours?
- Package names and whether prices are shown?
- Cities or regions served?
- Preferred contact channels (email, phone, WhatsApp)?
- Domain name and who owns it?
- Does the client want to edit content themselves (CMS)?
