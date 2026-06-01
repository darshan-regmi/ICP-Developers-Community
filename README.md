# ICP Developers' Community

> A student-led developer movement from Informatics College, Pokhara.
> We build in public. We learn by shipping.

The public site for the **ICP Developers' Community**. Brutalist + Swiss
editorial design, content-driven via files in [`data/`](./data),
application forms wired through Resend with real email validation and
duplicate-submission detection.

- **Live:** [icp-developers-community.vercel.app](https://icp-developers-community.vercel.app)
- **Source:** [github.com/darshan-regmi/ICP-Developers-Community](https://github.com/darshan-regmi/ICP-Developers-Community)
- **Built by:** [Darshan Regmi](https://github.com/darshan-regmi), paired with Claude (Opus 4.7) by Anthropic. See [`/colophon`](https://icp-developers-community.vercel.app/colophon).

---

## Quick start

```bash
git clone https://github.com/darshan-regmi/ICP-Developers-Community.git
cd ICP-Developers-Community
cp .env.example .env.local        # then fill in RESEND_API_KEY (full access)
npm install
npm run dev                       # → http://localhost:3000
```

The site browses fine without env vars — only the application forms need
Resend. They return a friendly "service not configured" message if the
key is missing.

---

## Tech stack

| Layer            | Choice                                                       |
| ---------------- | ------------------------------------------------------------ |
| Framework        | Next.js 14 (App Router)                                      |
| Language         | TypeScript                                                   |
| Runtime          | React 18                                                     |
| Styling          | Tailwind CSS v3 + CSS variables                              |
| Email            | [Resend](https://resend.com) — transactional + audience      |
| Graphics         | Hand-written SVG → PNG via [sharp](https://sharp.pixelplumbing.com) |
| Hosting          | Vercel                                                       |
| Fonts            | Space Grotesk (display) · Inter (body) · JetBrains Mono      |

No CSS-in-JS, no UI library, no analytics scripts. First Load JS sits
around 110 kB.

---

## Project structure

```
.
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout, metadata, JSON-LD
│   ├── page.tsx                  # Home — assembles every section
│   ├── globals.css               # Design tokens + brutalist utilities
│   ├── providers.tsx             # Theme (dark/light) context
│   ├── not-found.tsx             # 404 page ("shame on you")
│   ├── locked/page.tsx           # 401 page (private-repo redirect target)
│   ├── colophon/page.tsx         # Credits page (g c to jump there)
│   ├── api/apply/route.ts        # Form submission endpoint
│   ├── sitemap.ts                # /sitemap.xml
│   ├── robots.ts                 # /robots.txt
│   ├── manifest.ts               # /manifest.webmanifest (PWA)
│   ├── icon.{svg,png}            # favicons
│   ├── apple-icon.png            # iOS home-screen icon
│   ├── opengraph-image.png       # 1200×630 social card
│   └── twitter-image.png         # 1200×630 (kept separate)
│
├── components/
│   ├── Frame.tsx                 # Persistent four-corner UI
│   ├── Hero.tsx, About.tsx, ...  # Each section is its own component
│   ├── Team.tsx                  # Roster with GitHub-avatar fetching
│   ├── Join.tsx                  # Core team + general member forms
│   └── ui/                       # Reusable primitives
│       ├── Modal.tsx
│       ├── MenuButton.tsx        # Top-right menu + keyboard shortcuts
│       ├── KineticHeadline.tsx
│       ├── LiveTime.tsx
│       └── ...
│
├── data/                         # ← edit these to update site content
│   ├── site.ts                   # Brand, URL, social, organization, SEO
│   ├── headline.ts               # Hero headline + slogans
│   ├── communityStatus.ts        # Hero terminal-panel rows
│   ├── threeTruths.ts            # About section
│   ├── modules.ts                # "What we do" + modal details
│   ├── ledger.ts                 # Upcoming + past events
│   ├── projects.ts               # Project showcase
│   ├── members.ts                # Core team roster (GitHub URL = auto avatar)
│   └── library.ts                # Resources page (roadmap + library)
│
├── lib/
│   ├── email.ts                  # HTML email templates
│   ├── email-validation.ts       # Syntax + MX + disposable check
│   └── github.ts                 # Avatar URL helpers
│
├── public/
│   ├── favicon.svg               # Editable SVG source
│   └── og-image.svg              # Editable SVG source
│
└── scripts/
    └── build-images.mjs          # Regenerate icons + OG from the SVGs
```

---

## Editing content

Every piece of content on the site lives in [`data/`](./data) as a typed
TypeScript module. **You do not need to touch the components to change
copy.**

| File                       | Controls                                                          |
| -------------------------- | ----------------------------------------------------------------- |
| `data/site.ts`             | Site name, URL, description, social links, SEO, parent org, email-domain restriction |
| `data/headline.ts`         | Hero static + rotating words, dwell time, slogans                 |
| `data/communityStatus.ts`  | The terminal panel in the hero                                    |
| `data/threeTruths.ts`      | The About-section bullets                                         |
| `data/modules.ts`          | The six "What we do" cards + their modal content                  |
| `data/ledger.ts`           | Upcoming and past events                                          |
| `data/projects.ts`         | Project showcase + `featuredCount` (default 4 shown, rest behind "view all") |
| `data/members.ts`          | Roster — name, role, quote, GitHub URL (auto-fetches avatar), portfolio link |
| `data/library.ts`          | Roadmap + curated reading list                                    |

Save the file, the dev server reloads, content updates.

### How GitHub avatars work

Each member entry has a `socials` array. If one of the entries is
`{ label: "github", href: "https://github.com/<username>" }`, the team
section automatically pulls that user's profile picture via
`https://github.com/<username>.png`. No avatar URL to maintain manually.
Fallback: if no GitHub URL is set or the request fails, the `initials`
field is shown instead.

---

## Email setup (Resend)

The two application forms (core team + general member) post to
`/api/apply` which uses Resend for sending and contact management.

### 1. Get a Resend API key — must be **Full access**

The dedup feature calls `resend.contacts.get()` and `resend.contacts.create()`,
which require contact-management permission. **A send-only key will not work
for dedup.**

1. Sign up at [resend.com](https://resend.com).
2. **API Keys → Create API Key** → permission **Full access** → copy the `re_...` value.
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```

### 2. Get the Audience ID (for dedup)

Resend's new UI gives each project one default audience. The ID isn't shown
in the UI, but it's available via API:

```bash
set -a; source .env.local; set +a
curl -s -H "Authorization: Bearer $RESEND_API_KEY" \
  https://api.resend.com/audiences | python3 -m json.tool
```

Copy the `id` from the response and add to `.env.local`:

```
RESEND_AUDIENCE_ID=78261eea-8f8b-4381-83c6-79fa7120f1cf
```

Once set, every accepted application creates a contact in the audience, and
repeat submissions from the same email get the `WOOOWWW. HOLD ON.` page.

Without this var, the form still works — it just doesn't dedup.

### 3. Use a verified domain in production

`onboarding@resend.dev` works but inbox providers tag it with "via resend.dev".

1. **Resend → Domains → Add Domain** (e.g. `icp-dc.com`).
2. Add the SPF / DKIM / DMARC DNS records Resend gives you.
3. Once the domain shows "verified", set:
   ```
   RESEND_FROM="ICP DC <apply@icp-dc.com>"
   ```

### 4. Domain restriction

Applications are locked to `@icp.edu.np` addresses. To allow another
domain, change `site.membership.emailDomain` in `data/site.ts`. To open
to any domain, delete the domain-check block in
`app/api/apply/route.ts` (the one labelled `Restrict to the configured
college domain`).

---

## Brand assets (favicon + OG image)

Both are generated from SVG sources in [`public/`](./public).

```
public/favicon.svg     # the </> mark
public/og-image.svg    # the 1200×630 social card
```

After editing either:

```bash
node scripts/build-images.mjs
```

That regenerates:

```
app/icon.svg           # modern browser favicon
app/icon.png           # 32×32 raster fallback
app/apple-icon.png     # 180×180 with dark backplate (iOS home screen)
app/opengraph-image.png  # 1200×630 social card
app/twitter-image.png    # 1200×630 (separate file so it can diverge later)
```

Next.js auto-discovers all five — no metadata wiring needed. Commit the
regenerated PNGs so Vercel builds don't need to run the script.

---

## Deployment (Vercel)

The site is set up for one-click Vercel deploys.

### First deployment

1. Push your fork to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. **Framework Preset:** Next.js (auto-detected).
4. **Environment Variables** — add the same vars from `.env.local`:
   - `RESEND_API_KEY` (required, full access)
   - `RESEND_AUDIENCE_ID` (recommended)
   - `RESEND_FROM` (optional, after you verify a domain)
   - `APPLY_TO_EMAIL` (optional, defaults to `dev@icp.edu.np`)
5. **Deploy.**

Every push to `main` triggers a redeploy automatically.

### Custom domain

Once you have a domain (e.g. `icp-dc.com`):

1. **Vercel project → Settings → Domains** → add the domain.
2. Point DNS at Vercel's IP / CNAME from your registrar.
3. Update `FALLBACK_URL` in `data/site.ts` so local builds and JSON-LD use
   the correct canonical URL.
4. `VERCEL_PROJECT_PRODUCTION_URL` is set automatically by Vercel — no
   other code change needed.

---

## Routes

| Path                     | Purpose                                                    |
| ------------------------ | ---------------------------------------------------------- |
| `/`                      | Home — all eight sections                                  |
| `/colophon`              | Editorial credits — who built it + tech stack              |
| `/locked`                | "Members only" page for redirecting from private repos     |
| (404)                    | "Shame on you" page (auto-served by `app/not-found.tsx`)   |
| `/api/apply`             | POST endpoint for both application forms                   |
| `/sitemap.xml`           | Auto-generated sitemap                                     |
| `/robots.txt`            | Crawl rules + sitemap pointer                              |
| `/manifest.webmanifest`  | PWA manifest (Add to Home Screen)                          |

### Using `/locked` for private repos

```
https://icp-developers-community.vercel.app/locked?from=github.com/icpdevelopers/secret
```

The `from` query param is rendered inside the page's access-log panel so
the visitor sees exactly what they tried to reach.

---

## Keyboard shortcuts

Press `?` anywhere on the site to open the menu + shortcuts overlay.

| Shortcut | Action                              |
| -------- | ----------------------------------- |
| `?`      | Open the menu                       |
| `g h`    | Home                                |
| `g a`    | About                               |
| `g w`    | What we do                          |
| `g e`    | Events                              |
| `g p`    | Projects                            |
| `g t`    | Team                                |
| `g r`    | Resources                           |
| `g j`    | Join                                |
| `g c`    | Colophon                            |
| `esc`    | Close any overlay                   |

Chords work from any page — `g p` on `/colophon` jumps to home and scrolls
to the projects section.

---

## npm scripts

```bash
npm run dev       # start dev server (http://localhost:3000)
npm run build     # production build
npm run start     # serve the production build
npm run lint      # run Next.js / ESLint
```

Plus the standalone image-regeneration script:

```bash
node scripts/build-images.mjs    # regenerate all icons + OG card from public/*.svg
```

---

## Production checklist

- [x] Full env-var documentation in `.env.example`
- [x] Comprehensive `.gitignore`
- [x] SEO: title template, canonical URL, OG, Twitter cards, JSON-LD (Organization + WebSite)
- [x] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`
- [x] All icons (favicon SVG + PNG, apple-touch, OG, Twitter)
- [x] Custom 404 + 401 (`/locked`) pages
- [x] Application forms with: syntax + MX + disposable + domain check + dedup + honeypot
- [x] Auto-reply emails to applicants (doubles as delivery test)
- [x] Theme color in `prefers-color-scheme` light + dark
- [x] Reduced-motion respect in `app/globals.css`
- [x] Keyboard navigation across all routes
- [x] First Load JS ≈ 110 kB (well under any sensible budget)

**Recommended next steps when traffic grows:**

- Rate-limit `/api/apply` (e.g. Upstash Redis sliding window) to prevent
  bursty Resend abuse.
- Add a `Content-Security-Policy` header via `next.config.mjs` headers().
- Verify your sending domain in Resend (move off `onboarding@resend.dev`).
- Submit `https://your-domain/sitemap.xml` in Google Search Console.

---

## Design language (one paragraph)

Swiss grid + brutalist edges + editorial pacing. One accent colour
(`#00ADB5`), used scarcely. Three weights of typography (display 600,
body 400/500, mono 400/500). Hover states invert instantly (no fades).
Persistent four-corner frame UI. No marketing fluff anywhere — every
section answers exactly one question. The full design brief is essentially
the [`/colophon`](./app/colophon/page.tsx) page.

---

## Status & legal

**Status:** Production. v0.1, shipped 2026-06.

**License:** All rights reserved. The code, design, and brand assets in
this repository are © 2026 ICP Developers' Community / Informatics
College Pokhara. Forking and inspection are welcome; redistribution or
reuse for any other organization requires written permission.

---

## Credits

Built by **[Darshan Regmi](https://github.com/darshan-regmi)** — design,
code, every decision worth making.

Paired with **Claude (Opus 4.7)** by Anthropic — sparring partner, second
pair of eyes, fast hands when needed.

See the full credit reel at
[`/colophon`](https://icp-developers-community.vercel.app/colophon).
