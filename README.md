# deload-marketing

The public marketing site for deload (https://deloadapp.io). Standalone Astro
5 + Tailwind project — no Clerk, no `@workspace/api-client-react`, no app
imports. It must remain deployable on its own.

## Run locally

Standalone Astro project — install once, then run the dev server:

```sh
pnpm install
pnpm run dev
```

Production build:

```sh
pnpm run build
```

Type-check:

```sh
pnpm run typecheck
```

## Routes

`/`, `/why`, `/features` (+ one page per feature), `/business-types`
(+ one per type), `/resources` (+ one per resource), `/pricing`, `/beta`
(Join Waitlist), `/book-a-demo`, `/elevate` (Deload Foundations, coming soon),
`/about`, `/contact`, `/landing-page` (ad page, not indexed).

`/privacy` and `/terms` forward to the app's legal pages
(`PUBLIC_APP_URL/privacy`, `/terms`), which are the one maintained copy.

## Private beta (2026-10-19)

- Every sign-up button reads **Join Waitlist** and goes to `/beta`. Its form
  posts to the backend's `/api/public/beta-signup`, which saves the signup
  (Admin → Beta invites), puts it on Clerk's waitlist and emails the
  questionnaire. `PUBLIC_SIGNUP_MODE=open` turns the buttons back into
  "Try for free" → the app's sign-up.
- `/pricing` shows "Pricing opens after the private beta". The tier data in
  `src/config.ts` is kept; `PUBLIC_SHOW_PRICES=1` shows it again.
- Features that are switched off for the beta (scheduling, client billing,
  reports, check-ins, white label) carry a **Coming soon** badge via
  `status: "soon"` in `src/config.ts`.
- The backend must allow this site's origin: `ALLOWED_ORIGINS` includes
  `https://deloadapp.io` (and `www`).

A sitemap is produced at build time (`/sitemap-index.xml`) by
`@astrojs/sitemap`. `public/robots.txt` allows all crawlers and points at it.

## Where to swap real copy in later

- `src/config.ts` — `absorbed`, `proofPoints`, and `faqs` arrays are mirrored
  from `artifacts/coach-ui/src/pages/home.tsx`. When the source-of-truth copy
  there changes, update this file too (do **not** import from `coach-ui`).
- `src/pages/index.astro` — social-proof block is a placeholder. Swap in real
  coach quotes when we have them; the `TODO` marks the spot.
- `src/pages/about.astro` — founder bio + portrait are placeholders.
- `src/pages/contact.astro` — form is non-functional. Wire to Formspree /
  Resend / our own endpoint per the deferred follow-up task.

## Env contract

| Var               | Default                      | Purpose                                       |
| ----------------- | ---------------------------- | --------------------------------------------- |
| `PUBLIC_APP_URL`  | `https://app.deloadapp.io`   | Where Log in and app links point.             |
| `PUBLIC_SITE_URL` | `https://deloadapp.io`       | Canonical site URL used for OG + sitemap.     |
| `PUBLIC_API_BASE_URL` | `https://app.deloadapp.io` | Where the forms post (waitlist, contact, demo). |
| `PUBLIC_SIGNUP_MODE` | `waitlist`                | `open` when sign-up opens to everyone.        |
| `PUBLIC_SHOW_PRICES` | unset                     | `1` shows the pricing tiers again.            |
| `PORT`            | `4321`                       | Dev/preview server port (set by the workflow). |
| `BASE_PATH`       | `/`                          | URL prefix when served behind the workspace proxy. |

`PUBLIC_APP_URL` and `PUBLIC_SITE_URL` must be `PUBLIC_`-prefixed so Astro
exposes them to client-rendered components.

## Deploy

This repo is the source of truth for the `deloadapp.io` marketing site. It
deploys to EC2 the same way `deload-coach-ui` does:

- Pushing to `main` triggers `.github/workflows/deploy.yml`, which SSHes into
  the production box, pulls, runs `pnpm install` + `pnpm run build`, and
  reloads Nginx to serve the new `dist/`.
- Pushing to `staging` triggers `.github/workflows/deploy-staging.yml` against
  the staging box.

Nginx serves the static `dist/` output directly. Set `PUBLIC_APP_URL` and
`PUBLIC_SITE_URL` in the environment if the defaults ever need to change;
nothing in the source needs editing.

## What lives outside this repo

- The product itself (signed-in coach + athlete experience) lives in the
  `deload-coach-ui`, `deload-athlete-ui`, and `deload-mobile` repos. This site
  links **out** to the product via `PUBLIC_APP_URL`; it never imports from
  those packages.
