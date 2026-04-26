# Cloud Insurance Agency Site — Project Context

Local-SEO-focused static site for **Cloud Insurance Agency**, an independent
insurance agency based in West Orange, NJ serving Essex County. The site
covers six insurance categories (Homeowners, Flood, Condo, Renters, Landlord,
Earthquake) with deeply-localized coverage pages designed to rank for Essex
County keywords. Pure static HTML/CSS, deploys to GitHub Pages.

---

## Current Status

**26 of 30 pages complete (87%)** — site largely built, deployment + Formspree wiring still pending.

**Done:**
- `index.html` (homepage with contact form, quiz, carrier logos)
- `services.html` hub
- All 5 Homeowners pages
- All 5 Flood pages
- All 5 Condo pages
- All 5 Renters pages
- All 5 Landlord pages
- 1 of 5 Earthquake pages (`earthquake-structural-damage.html`)

**Remaining (4 Earthquake pages):**
- `earthquake-personal-property.html`
- `earthquake-living-expenses.html`
- `earthquake-deductible-options.html`
- `earthquake-coverage-limits.html`

**Not yet wired:**
- Formspree account not created — `YOUR_FORM_ID` placeholder still in `index.html`
- No GitHub repo / GitHub Pages deployment yet
- No `sitemap.xml` or `robots.txt`
- No Google Analytics / tracking

---

## Tech Stack

- HTML5 + CSS3 — **all inline styles**, no external stylesheets, no frameworks
- No build tools, no npm, no JavaScript dependencies (except quiz + smooth-scroll on `index.html`)
- Form handling: Formspree (free tier, 50 submissions/month) — *not yet activated*
- SMS notifications: Verizon email-to-SMS gateway (`9734493671@vtext.com`)
- Deployment target: GitHub Pages

---

## Key Decisions

- **Static HTML over CMS** — simpler, faster, free hosting, full SEO control
- **Inline CSS, not external stylesheets** — each page is self-contained for easy editing and zero dependency issues
- **Placeholder image divs with replacement instructions** — pages have styled placeholders (icon + description text) instead of actual images. Easier to ship pages now, swap real images in later.
- **Real Essex County scenarios** on every coverage page — 4 localized damage/claim scenarios with itemized costs to build trust and target local search intent
- **Earthquake deductible education (10-20%)** — flagged prominently as the key differentiator vs. standard homeowners
- **Formspree over custom backend** — zero infra, free, includes spam protection
- **Verizon email-to-SMS** — free text notifications without paid SMS API
- **Consistent page template across all coverage pages**: hero → danger box → scenarios → coverage details → what's covered/not covered → claims process → testimonials → CTA
- **6 testimonials per page** — fictional first-name + last-initial format with Essex County town names and realistic damage amounts

---

## Identifiers

**Business**
- Email: cfoskey@thecloudins.com
- Phone: (973) 449-3671
- Address: 634 Eagle Rock Ave. Suite 261, West Orange, NJ 07052

**SMS Gateway (Verizon)**
- SMS: `9734493671@vtext.com`
- MMS alt: `9734493671@vzwpix.com`

**Forms**
- Formspree Form ID: **`YOUR_FORM_ID`** ← placeholder, not yet replaced

**Related (Cloud Design Studio LLC umbrella)**
- NJ Entity ID: 0451424777
- Apple Developer Enrollment: NQQ3FH3U2J (separate project — not used here)

---

## Open Issues (prioritized)

1. **Formspree not activated** — `YOUR_FORM_ID` placeholder still in `index.html`. Needs account creation, form generation, ID swap, and email verification on first submission. Site cannot capture leads until this is done.

2. **No GitHub repo / no Pages deployment** — site exists only as files in `/mnt/user-data/outputs/`. Needs to be pushed to a real repo and Pages enabled before any of this is live.

3. **4 Earthquake pages still missing** — blocks the "30 pages" milestone and the sitemap.

4. **All images are placeholder divs** — 60+ images needed across the site (2 per page). Recommended sources: Unsplash, Pexels.

5. **No `sitemap.xml` or `robots.txt`** — must be created before submitting to Google Search Console.

6. **No analytics** — no GA4, no GSC verification yet.

7. **Mobile nav is broken** — current nav is a horizontal list with no mobile fallback. Needs hamburger menu before mobile traffic matters.

8. **Meta descriptions unaudited** — each page has a meta description but they should be reviewed for the 150-160 char sweet spot.

9. **Cross-category internal linking is thin** — pages link to siblings within their own category (e.g., a Flood page links to other Flood pages) but rarely cross-link across categories. Limits topical authority.

10. **Old `process-form.php` reference removed** — was in earlier `index.html`; file never existed. Clean now, but worth knowing if grep ever surfaces it.

---

## Next Steps (in priority order)

1. **Finish the 4 Earthquake pages** — same template as `earthquake-structural-damage.html`. Unblocks the "30 of 30 complete" milestone and the sitemap.
2. **Create the GitHub repo + push the site + enable GitHub Pages.** Without this nothing is live.
3. **Activate Formspree** — register at formspree.io, generate a form, replace `YOUR_FORM_ID` in `index.html`, verify the email on first test submission.
4. **Generate `sitemap.xml` and `robots.txt`** listing all 30 pages, submit to GSC.
5. **Replace placeholder images** with real photos from Unsplash/Pexels (60+ images).
6. **Wire up Google Analytics 4** + verify the property in GSC.
7. **Build hamburger mobile nav.**
8. **Audit meta descriptions** for length and keyword targeting.

---

## Useful Context (gotchas)

- **Same `(973) 449-3671` number** is used for both this site and Craig's other Cloud Design Studio business contact — don't confuse with Chris Burns Realtor's `(973) 953-5573`.
- **Damage costs are illustrative**, based on typical NJ claim data, not actual client cases. Don't represent them as historical data.
- **Testimonial names are fictional** — first name + last initial format. If a real testimonial ever comes in, follow the same format.
- **Page length target is hefty** — each coverage page is 1,000-1,200 lines / 3,500-4,200 words. This is intentional for SEO depth; don't trim.
- **Logo file `Cloud_Insurance-Logo2.png`** is referenced across all pages — make sure it exists in the repo before deploying or every page will show a broken image.
- **Carrier logos on `index.html`** reference multiple PNG files (AmTrust, Chubb, Progressive, etc.) — same caveat, ensure they're in the repo.
- **Color palette locked:** primary blue `#0A7DC2`, dark blue `#085A8D`, accent yellow `#FFC107`.
- **Essex County towns referenced** across testimonials and scenarios: West Orange, Montclair, Newark, Bloomfield, South Orange, Livingston, East Orange, Maplewood, Millburn, Glen Ridge, Nutley, Belleville, Cedar Grove, Verona, Caldwell, Fairfield, North Caldwell, Essex Fells, Roseland, Orange.
- **No JavaScript on coverage pages** — only the homepage has JS (quiz + smooth scroll). If a coverage page suddenly needs JS, that's a structural change worth flagging.

---

## Source Context

- `context/from-cloud-insurance-site.md` — original handoff document

---

## Recent Changes
- 2026-04-26: Migrated Cloud Insurance Site project from Claude.ai into Bernie workspace
