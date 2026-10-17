# Contributing

Two people work on this repo, plus an AI agent. These rules keep our changes from colliding.

## Golden rules

1. **Never push directly to `main`.** Always use a branch and a Pull Request (PR).
2. **Pull before you start** every work session.
3. **Review the agent's diff** before committing. Agents can touch many files at once.
4. **Never commit secrets** (`.env*`, API keys, passwords).
5. Each person uses **their own GitHub account**. Do not share logins.

## Daily workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/short-description

# ...make changes, test locally with npm run dev...

git add .
git commit -m "feat: add services section to home page"
git push -u origin feature/short-description
```

Then open a Pull Request on GitHub, ask the other person to review, and merge once approved. Delete the branch after merging.

## Branch names

| Prefix | Use for |
| :--- | :--- |
| `feature/` | New pages or features |
| `fix/` | Bug fixes |
| `style/` | Visual or design tweaks |
| `docs/` | Documentation only |
| `chore/` | Setup, dependencies, config |

Examples: `feature/gallery-page`, `fix/contact-form-validation`.

## Commit messages

Format: `type: short description` (present tense, under 70 characters).

Types: `feat`, `fix`, `style`, `docs`, `refactor`, `chore`.

## Avoiding conflicts

- Agree who works on which page or component before starting (see `PROJECT_PLAN.md`).
- Do not both edit the same file on different branches at once.
- Keep PRs small. One feature per PR.
- If you hit a merge conflict, use the merge editor in Antigravity's Source Control panel, or ask the other person before resolving.

## Pull Request checklist

- [ ] Runs locally with no errors (`npm run dev`)
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Checked on mobile width and desktop
- [ ] Follows `DESIGN_GUIDE.md`
- [ ] No secrets or unused files committed

## Git identity

```bash
git config --global user.name "Your Name"
git config --global user.email "you@company.com"
```
