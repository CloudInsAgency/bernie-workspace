# Chris Burns Realtor Website — Handoff

## Purpose

A fully custom, multi-page real estate website built for Chris Burns, an independent

realtor serving Monmouth County, Ocean County, and Middlesex County, NJ. The site

replaced a previous Century 21 branded presence and establishes Chris as an

independent agent under "Chris Burns Realtor - Monmouth County." It is designed to

generate leads via organic SEO, Google Business Profile, and direct contact/booking,

with no physical address listed (phone-only NAP strategy). The site is static HTML/CSS/JS

hosted on GitHub Pages with a custom Namecheap domain.

## Current Status

- **Deployed & Live:** https://chrisburnsrealtornj.com (GitHub Pages + Namecheap DNS)

- **index.html:** Complete — hero, about, services, why choose, FAQ, contact form,

  Calendly booking, footer. Responsive fixes applied. Canonical tag added.

- **Phase 2 Service Pages (6):** Complete — buyer-representation, seller-representation,

  first-time-homebuyer-assistance, investment-property-sales, real-estate-consulting,

  foreclosure-assistance.

- **Phase 3 Sub-Pages (30 of 41):** Complete. 11 pages still need to be created

  (see Next Steps).

- **Contact Form:** Formspree integrated (form ID: xgowknpz), sends to

  chrisburnshomes1@gmail.com. SMS via carrier email-to-SMS gateway — carrier

  not yet confirmed, placeholder in code.

- **Calendly:** Integrated in hero, contact section, and footer footer.

- **Google Search Console:** Verified via Namecheap DNS TXT record. Sitemap submitted.

  Currently only 2 pages indexed out of 49. Critical indexing issues identified and

  partially fixed (see Open Issues).

- **Google Business Profile:** In setup — description written, services and Q&A being

  added manually via Google Maps.

- **sitemap.xml + robots.txt:** Created and uploaded to GitHub root.

- **Canonical tags:** Added to index.html only — all other pages still need them.

## Tech Stack

- **Languages:** HTML5, CSS3, Vanilla JavaScript

- **Fonts:** Google Fonts — Cormorant Garamond (headings), Montserrat (body)

- **Hosting:** GitHub Pages (static, no server-side code)

- **Domain Registrar:** Namecheap (chrisburnsrealtornj.com)

- **DNS:** Namecheap Advanced DNS — includes Google TXT verification record

- **Form Handling:** Formspree.io (free tier, 50 submissions/month)

- **Booking:** Calendly (https://calendly.com/chrisburnshomes1/30min)

- **Maps:** Google Maps iframe embed (Monmouth County, NJ)

- **Schema Markup:** JSON-LD RealEstateAgent schema on all pages

- **Analytics/SEO:** Google Search Console (verified), Google Business Profile (in setup)

- **No CMS, no build tools, no frameworks, no npm — pure static files**

## Key Decisions

- **Static HTML only** — GitHub Pages doesn't support PHP or server-side code.

  Formspree was chosen as the zero-infrastructure form solution over self-hosted PHP.

- **No physical address on any page** — Client uses phone-only NAP

  (Name + Phone: 973-953-5573) across the entire site and all citations.

- **Phone number is (973) 953-5573** — NOT the 800 number that appeared in early

  versions. The 800 number was a previous draft artifact and has been fully replaced.

- **Formspree ID xgowknpz** is the live form endpoint — do not replace without

  updating the form action URL in index.html.

- **Color scheme locked:** Gold #C9A961, Navy #1A2332, Cream #F8F6F1,

  Burgundy #8B4049, Text Dark #2C3E50, Text Light #6C757D.

- **9-card content grid** is the standard structure for all sub-service pages.

- **File naming is critical** — parent pages link to exact filenames. Three files were

  previously misnamed and corrected: mortgage-preapproval.html (not

  mortgage-preapproval-help.html), closing-costs-budget.html (not

  closing-cost-budget-planning.html), fix-flip-opportunities.html (not

  fix-and-flip-opportunities.html).

- **Google Maps embed kept in hero** — Tested alternatives; map is industry standard

  for real estate, provides strong local SEO signals, and outperforms photo alternatives

  on trust and functionality metrics. Gold border (3px) added for branding.

- **min-height: 100vh with padding** used on hero instead of fixed height: 100vh —

  prevents content cutoff on smaller screens and phones.

- **Canonical tags being added across all pages** to fix the "Duplicate without

  user-selected canonical" error in Search Console.

## File & Repo Locations

- **GitHub Repo:** [Chris Burns Realtor GitHub repo — confirm exact URL with client]

- **Live Site:** https://chrisburnsrealtornj.com

- **Sitemap:** https://chrisburnsrealtornj.com/sitemap.xml

- **Robots.txt:** https://chrisburnsrealtornj.com/robots.txt

- **Formspree Dashboard:** https://formspree.io (login with chrisburnshomes1@gmail.com)

- **Google Search Console:** https://search.google.com/search-console

  (property: chrisburnsrealtornj.com)

- **Google Business Profile:** https://business.google.com

- **Calendly:** https://calendly.com/chrisburnshomes1/30min

- **Namecheap Account:** https://www.namecheap.com (domain management + DNS)

- **Local output path (Claude sessions):** /mnt/user-data/outputs/

## Credentials & IDs

- **Business Email:** chrisburnshomes1@gmail.com

- **Contact Phone:** (973) 953-5573 | +19739535573

- **Formspree Form ID:** xgowknpz (live — in index.html form action URL)

- **Google Search Console TXT Record:**

  google-site-verification=s8aGt8Snqpx_x1dojupGVmDGHFuaizmUv0fWiKRrCIY

  (added to Namecheap Advanced DNS as TXT @ record)

- **Calendly URL:** https://calendly.com/chrisburnshomes1/30min

- **SMS Gateway:** 9739535573@[CARRIER].com — carrier NOT yet confirmed.

  Placeholder in index.html hidden field `_cc`. Options: @vtext.com (Verizon),

  @txt.att.net (AT&T), @tmomail.net (T-Mobile).

- **Schema telephone field:** +19739535573

- **Namecheap login:** stored with client — not in codebase

- **GitHub login:** stored with client — not in codebase

## Open Issues

- **42 pages "Discovered - currently not indexed"** in Google Search Console.

  Root causes identified: (1) backup/duplicate files in GitHub repo

  (foreclosure-assistance-backup.html, index-backup-original.html,

  index-updated.html) must be deleted; (2) canonical tags missing from all pages

  except index.html; (3) possible thin/similar content on sub-pages causing

  Google to deprioritize crawling.

- **3 pages with redirects** flagged in Search Console — likely HTTP→HTTPS or

  www vs non-www. Specific URLs not yet identified; need to click into that

  report in Search Console to see which pages.

- **1 page returning 404** — specific URL not identified yet. Check sitemap.xml

  for URLs that don't match actual filenames.

- **Canonical tags only on index.html** — all 44+ other pages still need

  `<link rel="canonical" href="...">` added to the `<head>`.

- **SMS via carrier gateway not confirmed** — client's carrier for 973-953-5573

  unknown. The `_cc` hidden field in the contact form has a placeholder value.

  Client needs to confirm carrier and update.

- **11 sub-pages not yet created** (Phase 3 incomplete) — see Next Steps.

- **Formspree free tier limit:** 50 submissions/month. If lead volume increases,

  will need to upgrade ($10/month) or switch services.

- **No thank-you page** — Formspree redirects to a generic page after submission.

  A custom thank-you.html would improve UX and allow conversion tracking.

- **No Google Analytics** — currently only Search Console. UA/GA4 not set up.

- **Mobile nav has no hamburger menu** — nav links are hidden on mobile

  (`display: none`) with no replacement. Users on mobile cannot navigate between

  sections via menu.

## Next Steps

1. **Delete backup files from GitHub** and re-submit sitemap in Search Console.

   This is the single highest-impact action for fixing indexing.

   Files to delete: foreclosure-assistance-backup.html, index-backup-original.html,

   index-updated.html.

2. **Add canonical tags to all remaining pages** — bulk edit all 44 HTML files to

   insert `<link rel="canonical" href="https://chrisburnsrealtornj.com/[filename]">`

   in each `<head>`. This fixes the "Duplicate without user-selected canonical" error.

3. **Create the 11 remaining Phase 3 sub-pages:**

   Real Estate Consulting: market-trends-forecasts.html, school-district-rankings.html.

   Foreclosure Assistance: foreclosure-prevention.html, short-sale-assistance.html,

   pre-foreclosure-sales.html, deed-in-lieu.html, buying-foreclosure-properties.html,

   distressed-property-sales.html, foreclosure-auction-guide.html,

   bank-negotiation.html, foreclosure-impact-analysis.html.

4. **Confirm carrier for SMS gateway** and update the `_cc` hidden field in the

   contact form in index.html, then test a form submission end-to-end.

5. **Add mobile hamburger menu** — the nav is completely hidden on mobile.

   Add a simple CSS/JS hamburger toggle so mobile users can access navigation.

## Useful Context

- **Client is non-technical** — all changes should be production-ready files

  that can be drag-and-dropped into GitHub. No build steps, no CLI commands.

- **"Keep everything exactly the same"** is a frequent instruction — always use

  surgical str_replace edits rather than rewriting whole files.

- **Page structure template for sub-pages:** Fixed nav with ChrisBurnsLogo.png +

  "Chris Burns Realtor - Monmouth County" text logo, hero with gradient navy

  background, 9-card content grid, dual CTA buttons (gold "Call" + burgundy

  "Request Consultation"), 4-column footer. Every sub-page follows this pattern.

- **The 800 number (800-299-2129) is WRONG** — it appeared in early drafts and

  was a placeholder. The real number is (973) 953-5573 everywhere.

- **GitHub Pages caches aggressively** — after pushing changes, wait 3-5 minutes

  and hard-refresh (Cmd+Shift+R) before concluding a change didn't work.

- **Google Search Console data lags 2-3 days** — don't panic if changes don't

  reflect immediately. Indexing after canonical/robots fixes typically takes 1-2 weeks.

- **Google Maps iframe is intentionally centered in the hero** — this was a

  deliberate design decision kept after reviewing alternatives. Do not move or

  replace without client approval.

- **All pages use identical CSS variable set** — changes to color scheme must be

  applied globally across all 48 files, not just index.html.

- **Related project:** Menelik Epoxy Floors (Connecticut) — separate client site

  also managed by Craig through Cloud Design Studio LLC. Unrelated but same workflow.

- **Cloud Design Studio LLC** is Craig's dev entity (West Orange / Branchburg, NJ)

  through which this client work is managed.

