# Agent Instructions

These rules apply to every AI agent session in this repository. Read this file and `DESIGN_GUIDE.md` before making changes.

## Project

Wedding Flora is a marketing website for a wedding planning and management company. The goal is to convert visitors into enquiries. The look is **classic, elegant and timeless**, not trendy or flashy.

## Tech stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Fonts through `next/font`: Cormorant Garamond (headings), Lato (body)
- Deployed on Vercel

Do not add new frameworks or heavy libraries without asking. Prefer what is already installed.

## Rules

1. **Follow `DESIGN_GUIDE.md`** for colours, fonts, spacing and tone. Do not invent new colours or fonts.
2. Use Tailwind theme tokens (defined in `tailwind.config`), not hard-coded hex values in components.
3. Build reusable components in `src/components/`. Keep pages in `src/app/` thin.
4. Write TypeScript with explicit types. No `any`.
5. Every image needs meaningful `alt` text and should use `next/image`.
6. The site must be **mobile-first and responsive**, and meet basic accessibility (contrast, focus states, semantic HTML, labelled form fields).
7. Keep animations subtle (soft fades, gentle hover transitions). No flashy or heavy motion.
8. Use placeholder copy that sounds warm and refined, and mark it clearly with `TODO: replace` so we can swap in real content.
9. Never commit or print secrets. Read config from environment variables.
10. Do not delete or rewrite files outside the scope of the task.

## Git behaviour

- Work on a feature branch, never on `main`.
- Make small, focused changes and use the commit style in `CONTRIBUTING.md`.
- Before finishing, run `npm run lint` and `npm run build`, and report any failures.

## When unsure

Ask a short clarifying question instead of guessing, especially about business details (pricing, packages, contact info, service areas).
