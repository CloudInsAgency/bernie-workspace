# Chris Burns Realtor Site — Project Context

Static HTML site for Chris Burns, an independent realtor serving Monmouth,
Ocean, and Middlesex Counties in NJ. Replaced a previous Century 21 branded
presence; positions Chris as an independent agent under "Chris Burns Realtor —
Monmouth County." Lead generation via organic SEO, Google Business Profile,
and Calendly bookings. Phone-only NAP — no physical address listed.

---

## Current Status

**Health:** 🟢 LIVE

**LIVE** at https://chrisburnsrealtornj.com (GitHub Pages + Namecheap DNS)

**Working:**
- Homepage complete — hero, about, services, why choose, FAQ, contact form, Calendly, footer
- 6 Phase 2 service pages live (buyer-rep, seller-rep, first-time-homebuyer, investment, consulting, foreclosure)
- 30 of 41 Phase 3 sub-pages built
- Formspree contact form (ID: `xgowknpz`) sends to chrisburnshomes1@gmail.com
- Calendly booking embedded in hero, contact section, and footer
- Google Search Console verified via Namecheap DNS TXT record
- Sitemap submitted, robots.txt live
- JSON-LD RealEstateAgent schema on all pages

**In progress:**
- Google Business Profile setup (description written, services and Q&A being added manually)
- Canonical tags added to `index.html` only — all other pages still need them

**Stuck on indexing:** Only 2 pages indexed out of 49 in GSC. Critical issue (see Open Issues #1).

---

## Tech Stack

- HTML5, CSS3, vanilla JavaScript — **no CMS, no frameworks, no build tools**
- Fonts: Cormorant Garamond (headings) + Montserrat (body) via Google Fonts
- Hosting: GitHub Pages (static)
- Domain: Namecheap (chrisburnsrealtornj.com)
- Form handling: Formspree.io (free tier — 50 submissions/month)
- Booking: Calendly
- Maps: Google Maps iframe embed
- Schema: JSON-LD RealEstateAgent on every page

---

## Key Decisions

- **Static HTML only** — GitHub Pages doesn't support server-side code. Formspree picked over self-hosted PHP for zero-infrastructure form handling.
- **No physical address anywhere** — phone-only NAP across the site and all citations.
- **Phone is (973) 953-5573** — *NOT* the (800) 299-2129 number from earlier drafts. The 800 number was a draft artifact and has been fully replaced. Don't reintroduce it.
- **Color scheme locked:** Gold `#C9A961`, Navy `#1A2332`, Cream `#F8F6F1`, Burgundy `#8B4049`, Text Dark `#2C3E50`, Text Light `#6C757D`
- **9-card content grid** is the standard structure for sub-service pages
- **File naming is critical** — parent pages link to exact filenames. Three previously misnamed files were corrected:
  - `mortgage-preapproval.html` (not `mortgage-preapproval-help.html`)
  - `closing-costs-budget.html` (not `closing-cost-budget-planning.html`)
  - `fix-flip-opportunities.html` (not `fix-and-flip-opportunities.html`)
- **Google Maps embed kept in hero** — tested alternatives, map outperforms photos on trust + local SEO. Gold border (3px) for branding.
- **`min-height: 100vh` with padding** on hero, not fixed `height: 100vh` — prevents content cutoff on small screens.
- **Canonical tag rollout in progress** to fix "Duplicate without user-selected canonical" GSC error.

---

## Identifiers

**Business**
- Email: chrisburnshomes1@gmail.com
- Phone: (973) 953-5573 (display) / +19739535573 (tel: links and schema)
- Schema telephone: `+19739535573`

**Form & Booking**
- Formspree Form ID: `xgowknpz` — live in `index.html` form action URL. Don't replace without updating the action.
- Calendly: https://calendly.com/chrisburnshomes1/30min

**SEO**
- GSC verification TXT: `google-site-verification=s8aGt8Snqpx_x1dojupGVmDGHFuaizmUv0fWiKRrCIY` (in Namecheap Advanced DNS as TXT @ record)

**SMS gateway (UNCONFIRMED)**
- Pattern: `9739535573@[CARRIER].com`
- Placeholder lives in `index.html` hidden field `_cc`
- Carrier still unknown — options: `@vtext.com` (Verizon), `@txt.att.net` (AT&T), `@tmomail.net` (T-Mobile)
- Client needs to confirm carrier and update

**Logins (not in codebase)**
- Namecheap and GitHub credentials stored with client

---

## Open Issues (prioritized)

1. **42 pages "Discovered – currently not indexed" in GSC.** Root causes identified: (a) backup/duplicate files in repo causing crawl confusion, (b) canonical tags missing from all pages except index, (c) possible thin/similar content. Fix order in Next Steps.

2. **3 pages flagged with redirects** in GSC — likely HTTP→HTTPS or www vs non-www. Specific URLs not yet identified; need to drill into the GSC report.

3. **1 page returning 404** — specific URL not identified. Cross-check sitemap.xml against actual filenames in the repo.

4. **Canonical tags only on `index.html`** — all 44+ other pages still need `<link rel="canonical" href="...">` in `<head>`. This is the bulk fix for issue #1(b).

5. **SMS carrier unconfirmed** — `_cc` hidden field has a placeholder. Until confirmed, lead-text-notifications won't fire correctly.

6. **11 sub-pages still missing** (Phase 3 incomplete).

7. **Formspree free-tier limit** — 50 submissions/month. If lead volume grows, upgrade ($10/mo) or switch services.

8. **No thank-you page** — Formspree redirects to its generic page after submission. A custom `thank-you.html` would improve UX and enable conversion tracking.

9. **No Google Analytics** — only Search Console. GA4 not yet set up.

10. **Mobile nav broken** — nav links are `display: none` on mobile with no hamburger replacement. Mobile users can't navigate via menu.

---

## Next Steps (in priority order)

1. **Delete backup files from the GitHub repo and re-submit sitemap.** Single highest-impact action for indexing. Files to delete:
   - `foreclosure-assistance-backup.html`
   - `index-backup-original.html`
   - `index-updated.html`

2. **Bulk-add canonical tags to all 44+ HTML files.** Insert `<link rel="canonical" href="https://chrisburnsrealtornj.com/[filename]">` in each `<head>`. Fixes the "Duplicate without user-selected canonical" error.

3. **Triage the 3 redirect-flagged pages** in GSC and the 1 unidentified 404. Both require clicking into GSC reports to identify URLs.

4. **Build the 11 remaining Phase 3 sub-pages.**

5. **Confirm SMS carrier with Chris** and update the `_cc` placeholder in `index.html`.

6. **Add `thank-you.html`** for post-submission UX + conversion tracking.

7. **Wire up Google Analytics 4.**

8. **Add a hamburger mobile nav.**

---

## Useful Context (gotchas)

- **Don't reintroduce the 800 number** — `(800) 299-2129` is dead. Always use `(973) 953-5573`. If grep finds the 800 number anywhere, it's a stale artifact and should be removed.
- **Filename typos exist in some hero image references** — e.g., `comparaive-market1.jpg` (should be `comparative-`), `forclosure-auction1.jpg` (should be `foreclosure-`). Either fix the HTML refs or name files to match. Pick one and be consistent.
- **No build process** — edit HTML, push to GitHub, GitHub Pages serves it. No compilation, bundling, or deploy pipeline.
- **Schema goes before `</body>`** — every page has JSON-LD RealEstateAgent in a `<script>` tag right before the closing body tag.
- **Service area emphasis order:** Monmouth County (primary), Ocean County, Middlesex County. Town-level mentions: Marlboro, Manalapan, Freehold, Holmdel, Red Bank.
- **Inline SVG charts** — custom data viz embedded directly in HTML on 12+ pages (no chart libraries). Style is locked: white backgrounds, 12px rounded corners, box shadows, color-coded sections (green=good, red=warning, blue=info, gold=highlight).
- **An older handoff snapshot exists** in `context/from-chris-burns-site-archive.md` that references the dead 800 number, Phase 8 chart work, and a January 2026 sitemap. Useful for history but **do not pull current facts from it.**

---

## Source Context

- `context/from-chris-burns-site-1.md` — primary handoff (current state)
- `context/from-chris-burns-site-archive.md` — older snapshot, historical reference only

---

## Recent Changes
- 2026-04-26: Migrated Chris Burns Site project from Claude.ai into Bernie workspace
