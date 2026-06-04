# Hunters Services — Website

Production marketing site for **Hunters Services Inc.** — family-owned, eco-friendly pest control
in Northern California since 1992.

## Tech
Static site generated with **Eleventy (11ty)** — Node.js. Shared chrome (head, nav, footer,
JSON-LD schema) lives in one Nunjucks layout; each page holds only its unique content.

## Develop
```bash
cd hunters-services-11ty
npm install        # first time
npm run dev        # live-reload dev server → http://localhost:8123
npm run build      # production build → _site/
```

## Deploy (Netlify)
- **Manual:** `npm run build`, then drag `_site/` to https://app.netlify.com/drop
- **Git (recommended):** connect this repo in Netlify with
  - Base directory: `hunters-services-11ty`
  - Build command: `npm run build`
  - Publish directory: `hunters-services-11ty/_site`

## Repo layout
| Path | What |
|---|---|
| `hunters-services-11ty/` | **Source of truth** — Eleventy project (edit here) |
| `hunters-services-site/` | Earlier flat-HTML snapshot (reference only) |
| `_tools/` | One-off migration / image-optimization scripts |
| `HANDOFF.md` | Full handoff: build, deploy, domain, forms, edit guide |
| `WIX-CONTENT-MAP.md` | Page-by-page copy/structure map (for Wix porting) |

See **HANDOFF.md** for the complete operations guide (forms, custom domain, SEO, acceptance status).
