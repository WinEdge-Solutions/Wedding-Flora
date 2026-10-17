# Wedding Flora

Website for Wedding Flora, a wedding planning and management company. The site presents our services, portfolio and packages with a classic, elegant look, and lets couples send us an enquiry.

Maintained by the WinEdge Solutions team.

## Tech stack

| Area | Choice |
| :--- | :--- |
| **Framework** | Next.js (App Router) + TypeScript |
| **Styling** | Tailwind CSS |
| **Fonts** | Cormorant Garamond (headings), Lato (body) via `next/font` |
| **Forms / email** | Next.js API route + Resend (or any SMTP provider) |
| **Hosting** | Vercel |
| **Version control** | GitHub (`WinEdge-Solutions/Wedding-Flora`) |

## Getting started

Requirements: Node.js 20+ and Git.

```bash
git clone https://github.com/WinEdge-Solutions/Wedding-Flora.git
cd Wedding-Flora
npm install
cp .env.example .env.local # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Check code style |

## Environment variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Project docs

- [PRD.md](PRD.md): product requirements, user stories, and scope
- [ARCHITECTURE.md](ARCHITECTURE.md): technical architecture, folder structure, and tech choices
- [PROJECT_PLAN.md](PROJECT_PLAN.md): pages, features and task checklist
- [DESIGN_GUIDE.md](DESIGN_GUIDE.md): colours, typography, layout and tone
- [CONTRIBUTING.md](CONTRIBUTING.md): Git workflow for the team
- [AGENTS.md](AGENTS.md): rules for the AI agent (Antigravity)

## Folder structure

```text
src/
  app/          # pages and routes (App Router)
  components/   # reusable UI components
  lib/          # helpers, constants, form validation
public/
  images/       # optimised photos and logos
```
