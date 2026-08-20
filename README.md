# Asem Alhammadi — Portfolio Website

Personal portfolio for **Asem Alhammadi, M.Sc., PMP®** — Senior Systems Integrator & IT Project
Manager. Career history, services, portfolio projects, technical articles, and a contact form.

A fully static site: React + TypeScript + Vite + Tailwind, built to plain HTML/CSS/JS and hosted
free on GitHub Pages. There is no backend.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
cp .env.example .env.local   # then fill in VITE_WEB3FORMS_KEY
npm run dev
```

The dev server prints a local URL. `npm run lint` typechecks; `npm run build` produces `dist/`.

## Configuration

Both values are injected at build time — see [.env.example](.env.example).

| Variable | Purpose |
| --- | --- |
| `VITE_WEB3FORMS_KEY` | Web3Forms access key for the contact form. Stored as a GitHub repo secret of the same name. Without it, the form tells visitors to email directly instead of failing silently. |
| `VITE_BASE_PATH` | URL prefix for built assets. The deploy workflow sets this to `/<repo-name>/`. Set to `/` if you move to a custom domain. |

Analytics runs on Cloudflare Web Analytics, wired in [index.html](index.html). The beacon token is
public by design and cookieless, so the site needs no consent banner. Figures are in the Cloudflare
dashboard, not on the site.

Setup instructions for the site owner (how to obtain the Web3Forms key and the analytics ID) live
in [docs/OWNER-SETUP.md](docs/OWNER-SETUP.md).

## Editing site content

All content — bio, jobs, education, projects, services, articles, skills, certifications, awards —
lives in [src/data/portfolioData.ts](src/data/portfolioData.ts). Edit that file and push; the
deploy workflow rebuilds automatically. The profile photo is [public/asem_alhammadi_photo.png](public/asem_alhammadi_photo.png).

## Deployment

Pushing to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which
typechecks, builds, and publishes to GitHub Pages.

One-time repo setup:

1. **Settings → Pages → Source: GitHub Actions**
2. **Settings → Secrets and variables → Actions → New repository secret**, named
   `VITE_WEB3FORMS_KEY`
3. The repo must be **public** for Pages on a free GitHub account

## Bringing back the AI assistant

[src/components/AICareerAssistantModal.tsx](src/components/AICareerAssistantModal.tsx) is a
complete Gemini-powered career assistant, currently dormant and not rendered. It needs a server to
hold `GEMINI_API_KEY` — the key cannot be shipped to the browser. To revive it, deploy to Vercel or
Netlify instead of Pages, restore the `/api/chat` handler (see `server.ts` in git history before
the static migration), and re-add the entry points in `Header`, `Hero`, and `Footer`.

Git history also contains the removed Express server, the localStorage-backed admin panel, and the
visitor-analytics modal, should any of them be worth revisiting.
