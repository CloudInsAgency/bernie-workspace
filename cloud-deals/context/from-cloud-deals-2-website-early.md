# CloudPriceDeals — Handoff

## Purpose

CloudPriceDeals (cloudpricedeals.com) is an Amazon affiliate deal aggregation website and companion iOS price-tracking app built and owned by Cloud Design Studio LLC (Craig, West Orange NJ). The website surfaces curated Amazon product deals with affiliate links (tag: clouddeals20-20), earns commission on qualifying purchases, and serves as the marketing front-end for the CloudDeals iOS app — a StoreKit 2-powered price tracker that monitors Amazon, Best Buy, eBay, and Walmart and fires push notifications when items hit a user's target price. The primary near-term goal is generating 3 qualifying Amazon sales within 180 days to permanently activate the Associates account.

## Current Status

**Deployed / Live:**

- Website live at: `cloudinsagency.github.io/clouddeals/` (GitHub Pages)

- Custom domain `cloudpricedeals.com` registered at Namecheap — DNS A records and CNAME pointed at GitHub Pages IPs; CNAME file needs to be committed to repo root to complete domain attachment

- All 9 site pages built and committed to GitHub

- 9 product images uploaded to `assets/images/` in repo

- Amazon Associates account approved (tag: clouddeals20-20)

- Privacy policy page live at `/privacy.html`

- Cookie consent banner built (`cookie-banner.js`) — needs to be committed to `assets/js/`

**In Progress:**

- Brand rename from "CloudDeals" → "CloudPriceDeals" across all pages — homepage (`index.html`) and deals page (`deals/index.html`) have been updated and are ready to commit; remaining pages (guides, compare, app) still show old brand in some places

- Custom domain propagation — DNS set up in Namecheap but `CNAME` file not yet added to GitHub repo root

- Google Search Console verification — not yet started; `sitemap.xml` and `robots.txt` built and ready to commit

- GA4 — not yet set up; tracking code not yet added to any pages

**Blocked / Pending:**

- Apple Developer Program org enrollment blocked pending D&B/Apple sync (Enrollment ID: NQQ3FH3U2J, D&B Case: #34357827, D-U-N-S: 144968291)

- Amazon Product Advertising API (PA API 5.0) access requires 3 qualifying sales first — no real product images possible until then

- eBay Partner Network and Walmart affiliate approvals still pending

**iOS App:**

- CloudDeals iOS app in active development (SwiftUI, Firebase backend)

- Bundle ID: `com.clouddesignstudio.Clouddeals`

- StoreKit 2 subscription at $3.99/month, free tier = 3 watchlist slots

- Firebase project: `clouddeals-dev` (Blaze plan, us-central1)

- Not yet submitted to App Store — blocked on Apple Developer org enrollment

## Tech Stack

**Website:**

- Pure HTML/CSS/JS — no build tools, no frameworks

- Hosted on GitHub Pages (free tier)

- Custom domain: cloudpricedeals.com (Namecheap)

- CSS design system in `assets/css/style.css` — CSS variables, light blue/white editorial theme, Changa One + DM Sans fonts

- JS in `assets/js/main.js` (scroll reveal, carousel, email signup form) and `assets/js/cookie-banner.js` (GDPR consent)

- Product data previously attempted via `assets/js/deals-data.js` (dynamic rendering) — abandoned in favor of static HTML for reliability

**iOS App:**

- SwiftUI

- Firebase Auth, Firestore, Cloud Functions, Cloud Messaging

- StoreKit 2 (subscriptions)

- Apple Developer Program (org enrollment pending)

**Services / APIs:**

- Amazon Associates Program (affiliate links, tag: clouddeals20-20)

- Amazon PA API 5.0 (pending — needs 3 sales to unlock)

- Firebase (Blaze plan)

- Namecheap (domain registrar)

- GitHub Pages (static hosting)

- Google Search Console (not yet set up)

- Google Analytics 4 (not yet set up)

## Key Decisions

- **Static HTML over Next.js/React for the website** — Originally considered Next.js (Craig has a separate Next.js site at cloudpricedeals.com in development). GitHub Pages requires no build pipeline, zero hosting cost, instant deploys via git commit. Right decision for MVP affiliate site.

- **No Amazon CDN images** — Amazon blocks hotlinking of `m.media-amazon.com` and `images-na.ssl-images-amazon.com` from external domains. Tried PA-API widget URLs (`ws-na.amazon-adsystem.com`) — also blocked. Solution: manually save product JPGs and host in `assets/images/`. PA API will solve this permanently once unlocked.

- **SVG product illustrations as fallback** — Built a full library of 9 custom SVG product illustrations (echo dot sphere, Fire TV stick, AirPods case, Kindle, Ring doorbell, Roomba, Echo Show, tablet) that auto-display via `onerror` if image files are missing. These are embedded inline in older page versions but the current approach uses `onerror` fallback to emoji on the deals page.

- **Affiliate tag is `clouddeals20-20`** — Note: an older broken tag `clouddeals-20` (missing the trailing `-20`) appears in earlier versions of some pages. Any page still using `clouddeals-20` will not earn commission. Always verify tag on every page update.

- **Static deals page over dynamic JS rendering** — Attempted a JS-rendered approach loading from `deals-data.js`. Abandoned because GitHub Pages has no server, the script loading order caused blank pages, and static HTML is more reliable and SEO-friendly.

- **Cookie banner is self-contained JS** — No external cookie consent library (OneTrust etc.). Lightweight custom implementation using localStorage. Integrates with GA4 consent mode when GA4 is added.

- **Domain: cloudpricedeals.com** — clouddeals.com was taken. CloudPriceDeals.com chosen because it contains "cloud" (matches Cloud Design Studio LLC brand), "price" (core function), and "deals" (core value prop). Registered March 2026 at Namecheap ~$12/year.

## File & Repo Locations

**GitHub:**

- Repo: `github.com/CloudInsAgency/clouddeals`

- GitHub Pages URL: `https://cloudinsagency.github.io/clouddeals/`

- Branch: `main`

**Repo structure:**

**Live URLs (once custom domain propagates):**

- Homepage: `https://cloudpricedeals.com/`

- Deals: `https://cloudpricedeals.com/deals/`

- Guides: `https://cloudpricedeals.com/guides/`

- Compare: `https://cloudpricedeals.com/compare/`

- App: `https://cloudpricedeals.com/app/`

- Privacy: `https://cloudpricedeals.com/privacy.html`

**Firebase Console:** `clouddeals-dev` project (us-central1, Blaze plan)

**Namecheap:** cloudpricedeals.com — Advanced DNS panel

**Apple Developer:** Enrollment ID NQQ3FH3U2J (org enrollment pending)

## Credentials & IDs

| What | Value / Location |

|---|---|

| Amazon Associates tag | `clouddeals20-20` — hardcoded in all HTML files |

| Amazon Store ID | `clouddeals20-20` |

| Apple Developer Enrollment ID | `NQQ3FH3U2J` |

| D-U-N-S Number | `144968291` |

| D&B Case Number | `#34357827` |

| NJ Entity ID | `0451424777` |

| EIN | Obtained — stored securely offline |

| Firebase Project ID | `clouddeals-dev` |

| iOS Bundle ID | `com.clouddesignstudio.Clouddeals` |

| Business email | `info@cloudstudiodesign.com` |

| Registered agent address | 971 US Highway 202N, Branchburg, NJ 08876 |

| GA4 Measurement ID | Not yet created — create at analytics.google.com |

| Search Console verification TXT | Not yet created — generate at search.google.com/search-console |

**Note:** No actual secrets, API keys, or passwords are stored in the repo or in this document. Firebase config lives in the iOS app's `GoogleService-Info.plist` (not committed to any public repo).

## Open Issues

- **Space in Fire TV image filename** — `amazon_fire tv_stick 4K.jpg` has a space. All `src` attributes must use the exact filename with the space. Long-term fix: rename the file in GitHub to `amazon_fire_tv_stick_4K.jpg` and update all references simultaneously.

- **Brand rename incomplete** — `guides/index.html`, `guides/best-amazon-echo-deals.html`, `guides/airpods-deals.html`, `compare/index.html`, `compare/amazon-vs-best-buy.html`, and `app/index.html` still reference "CloudDeals" instead of "CloudPriceDeals" in title tags, canonical URLs, nav, and footer. Each needs the same treatment applied to `index.html` and `deals/index.html`.

- **CNAME file missing from repo** — Custom domain won't activate until a file named `CNAME` (no extension) is committed to the repo root containing exactly: `cloudpricedeals.com`

- **`cookie-banner.js` not yet committed** — File is built and ready but needs to be added to `assets/js/` in GitHub.

- **`sitemap.xml` and `robots.txt` not yet committed** — Both files are built and ready for repo root.

- **No GA4 tracking** — Analytics not yet set up. No visibility into traffic until GA4 Measurement ID is obtained and added to all pages.

- **Amazon qualifying sales = 0** — Associates account is provisionally approved but requires 3 sales within 180 days to permanently activate. Priority: drive real purchase clicks through the Echo deals guide and share with friends/family.

- **Product images will keep going stale** — Amazon discontinues products regularly. Any product marked "Currently unavailable" must be replaced. Verified in-stock ASINs as of March 2026: B09B8V1LZ3, B0F7Z4QZTT, B0CHWRXH8B, B0CFPJYX7P, B08CKHPP52, B0DX6KZR9T, B09B2SBHQK, B0D6SX8VLQ, B0BL5XPDR6.

- **Email signup form is non-functional** — The signup form on the homepage has no backend. Submitting it does nothing except show a success message via JS. Needs a real email service (Mailchimp, ConvertKit, or Firebase function) connected.

- **`terms.html` linked but doesn't exist** — Footer links to `terms.html` on every page but the file has never been created.

## Next Steps

1. **Complete GitHub commits** — In this order: (a) create `CNAME` file with `cloudpricedeals.com`, (b) commit `assets/js/cookie-banner.js`, (c) commit `sitemap.xml` and `robots.txt` to root, (d) verify custom domain is active in GitHub Settings → Pages → Custom domain.

2. **Finish brand rename** — Update the 5 remaining pages (`guides/index.html`, `guides/best-amazon-echo-deals.html`, `guides/airpods-deals.html`, `compare/index.html`, `compare/amazon-vs-best-buy.html`, `app/index.html`) — change title tags, canonical URLs, nav logos, footer logos, and body copy from "CloudDeals" to "CloudPriceDeals". Also create `terms.html`.

3. **Set up Google Search Console + GA4** — Verify domain ownership via TXT record in Namecheap, submit `sitemap.xml`, create GA4 property, add `G-XXXXXXXXXX` measurement ID to all pages before `</head>`.

4. **Drive 3 qualifying Amazon sales** — Share the Echo deals guide (`/guides/best-amazon-echo-deals.html`) with friends and family. This is the single most important action — it permanently activates the Associates account and unlocks PA API access for real product images.

5. **Create `terms.html`** — A basic Terms of Service page matching the style of `privacy.html`. Required because the footer links to it on every page and currently 404s.

## Useful Context

- **Affiliate tag gotcha** — The correct tag is `clouddeals20-20`. An older broken variant `clouddeals-20` (missing trailing `-20`) appears in some early page versions and earns zero commission. Run a grep for `clouddeals-20"` (with closing quote, no trailing `-20`) before every deploy to catch regressions.

- **Amazon image hosting** — Amazon actively blocks hotlinking from external domains on all their CDN URLs (`m.media-amazon.com`, `images-na.ssl-images-amazon.com`, `ws-na.amazon-adsystem.com`). The only reliable solution is self-hosting product images in `assets/images/`. PA API 5.0 (unlocked after 3 sales) provides programmatic image access and is the long-term solution.

- **GitHub Pages deployment lag** — After committing, allow 2–5 minutes for Pages to rebuild. Hard refresh (`Cmd+Shift+R`) the live URL to bypass browser cache when verifying changes.

- **Static over dynamic** — Multiple attempts to use JavaScript-rendered deal cards from a data file (`deals-data.js`) failed due to script loading order on GitHub Pages. The current static HTML approach is the correct one — don't revert to JS rendering unless a proper build pipeline is introduced.

- **Commission rates by category** — Echo/Amazon devices: 4%, Fire Tablets/TV: 4%, Home/Roomba: 3%, Audio/Headphones: 3%, Electronics: 2.5%. Higher-commission products should be prioritized in featured slots.

- **Related projects** — Craig also runs: CloudBooks (SaaS accounting, React/Vite/Firebase at cloudbooks-3a958.web.app), Cloud Dispatch Ops (SaaS field service, clouddispatchops.com), WigOut (AI hairstyle app, iOS+Android, partner: Menelik Simmonds), PollPulse (daily polling iOS app). All under Cloud Design Studio LLC.

- **Craig's new day job** — Starting a Regional Sales & Agency Manager role at Flix (FlixBus) covering the US Eastern region. CloudPriceDeals is a side venture — expect part-time attention going forward.

- **A&G Insurance Group** — Craig holds a 50% stake in a Connecticut insurance agency currently in a binding arbitration dispute. Unrelated to this project but may affect available time.

- **SEO content priority** — The Echo deals guide (`/guides/best-amazon-echo-deals.html`) is the highest-value SEO asset. It targets "best amazon echo deals 2026" — a high-intent, commercially valuable keyword. Keep it updated weekly and share aggressively to build early backlinks and drive the qualifying sales needed for PA API access.

