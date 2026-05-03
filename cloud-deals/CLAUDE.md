# Cloud Deals — Project Context

This folder contains TWO related codebases under one project umbrella:

1. **CloudPriceDeals website** — Next.js affiliate site at cloudpricedeals.com
2. **CloudDeals iOS app** — SwiftUI/Firebase/StoreKit 2 companion price-tracker

Both are owned by Cloud Design Studio LLC. The website is the marketing front
end; the iOS app is the price-tracking product. They share branding, the
Amazon Associates tag, and a deliberate strategy: the site generates affiliate
revenue while the app builds a subscriber base.

---

## Current Status

**Health:** 🟢 LIVE

CloudPriceDeals website live at cloudpricedeals.com with new cream + evergreen Mochi-&-Oak-style redesign deployed 2026-05-03 (commit `7adac40`); product pages now Amazon-only with cent-accurate currency formatting. CloudDeals iOS companion app in pre-submission development.

### Website — cloudpricedeals.com (LIVE)

Light theme. **Visual refresh shipped to production 2026-05-03** (commit `7adac40` on main, fast-forward merge from `redesign/visual-refresh-2026-05`). Boutique cream + evergreen palette (`#FAF6F0` bg, `#1F4E3D` primary, `#C2410C` accent, sand/sage/blush/slate color-block surfaces). DM Serif Display + DM Sans migrated to `next/font/google` (3 weights total).

Mochi-&-Oak-style homepage hero (commit `0485e3b`):
- Massive centered "CloudPriceDeals" wordmark in deep evergreen
- 3 saturated full-width hero tiles (sage `#7FA88A`, blush `#E8A88A`, burnt sienna `#C2410C`) with corner badges ("UP TO 60% OFF" / "TRENDING" / "ENDS SOON")
- "SHOP BY RETAILER" text-pill row (no real logos — Associates compliance), wired through `?retailer=...` query param

Product pages (commit `7adac40`, 2026-05-03):
- "Get this deal" panel renders **Amazon only** (Walmart/Target/Best Buy rows hidden in UI; data preserved in `comparePrices` for future affiliate accounts)
- All dollar math routes through `src/lib/currency.js` (`formatCurrency` + `calculateSavings` using cent-accurate `Math.round((a*100) - (b*100))/100`) — fixed prior `$19.999999999999993` float drift
- Amazon BUY button: `tag=clouddeals20-20`, `target="_blank"`, `rel="sponsored nofollow noopener noreferrer"`

Section flow: hero tiles → Shop by Retailer → Today's Top Deals → Trending → Retailer Comparisons → TrustSection (4th FTC disclosure surface) → Last Chance → email capture → full grid. DealCard heart bumped 34→44px. Build clean, 47 static pages. Production verified: homepage HTTP 200 TTFB ~210ms, sitemap 44 URLs intact, JSON-LD schemas intact.

Pre-Meta-ad UX/conversion pass shipped 2026-05-03 (commit `3f80043`):
- FTC affiliate disclosure: dismissible top banner + inline lines on home, browse, and product pages; footer disclosure contrast bumped
- Product pages now ship `Product` + `AggregateOffer` + `AggregateRating` + `BreadcrumbList` JSON-LD
- Sitemap converted from static 11-URL array to dynamic — now 44 URLs (11 static preserved verbatim + 33 product entries with per-deal `updatedAt`)
- `/browse?cat=...` query param wired (footer category links and ad UTMs now land on the filtered grid)
- Hardcoded "20 deals compared" replaced with dynamic `DEALS.length`
- 4 large local PNGs migrated to `next/image` with `priority` on above-fold instances
- `alert()` wishlist confirmations replaced with non-blocking Toast; heart icon flips to filled state
- Right-column featured-deal rows clickable to product pages with sponsored "Buy on Amazon" pills
- Build verified clean (47 static pages); homepage HTTP 200, TTFB ~88ms

Earlier baseline:
- 33 verified deals in catalog with Amazon affiliate tag `clouddeals20-20`
- Google Search Console verified (Domain property); 49 pages indexed
- Vercel domain redirect (www → non-www, 308) working
- Comparison page system built (`/compare/[slug]`) — first entry: Amazon vs Best Buy
- Facebook Page created (separate from Cloud Insurance Agency)

In progress / pending:
- 🟡 Meta Pixel still placeholder `'YOUR_PIXEL_ID'` in `src/components/MetaPixel.js:13` — Craig launching ads without it for now (audit Fix 1A)
- 🟡 Email-capture form is a stub (`setTimeout` no-op); ESP not yet picked (audit Fix 2A)
- 🟡 Strategic backlog parked: NJ landing page (3A), comparison content factory (3B), wishlist→email handoff (3C)
- Compare pages are orphans — need navbar + homepage links
- GSC redirect errors on `/guides`, `/about`, `/browse` need "Validate Fix" clicked
- Bad GSC URL `/compare/amazon-vs-best-buy.html` returns 404 — needs GSC Removals tool (do NOT redirect)
- Cookie-consent banner not visible in `src/components/` — confirm exists in DOM or install one
- Section 5 audit items need real-device verification: iPhone hero stack at 375px, heart tap target (still 34×34), Lighthouse mobile, wsrv.nl proxy reliability sweep
- Full audit reference: `~/Bernie/cloud-deals/workspace/site-audit-2026-05-03.md`

### iOS App — CloudDeals (IN DEVELOPMENT)

Built and runs in simulator:
- Firebase Auth + Firestore + Functions wired up
- Best Buy API and eBay API live; Walmart + Amazon are placeholders
- StoreKit 2 subscription at $3.99/month, free tier = 3 permanent watchlist slots
- Watchlist now stores denormalized product data (fixed "Unknown Product" bug)
- Bundle ID: `com.clouddesignstudio.Clouddeals`

Blocked / pending:
- Apple Developer Org enrollment (27+ days past Apple's 5–14 day window)
- Push notifications + scheduled price scanner not yet built
- Walmart and Amazon API integrations blocked on affiliate approval
- iOS minimum deployment is set to 26.2 — must lower to 16/17 before submit

---

## Tech Stack

**Website**
- Next.js 14 (App Router), JavaScript (no TypeScript)
- Tailwind CSS + CSS variables for theming
- lucide-react icons, clsx for conditional classes
- DM Serif Display (headings) + DM Sans (body)
- Hosted on Vercel, domain via Namecheap DNS
- Image proxy via wsrv.nl (some local PNGs in `/public`)

**iOS App**
- Swift / SwiftUI, Xcode, iOS 16+ target (currently misconfigured to 26.2)
- Firebase iOS SDK: Auth, Firestore, Functions
- StoreKit 2 (auto-renewable subscription)
- AsyncImage for product photos

**Backend (Cloud Functions)**
- Node.js 18, firebase-functions v1 syntax (don't migrate to v2 piecemeal)
- Axios for HTTP calls to retailer APIs
- Best Buy Products API + eBay Browse API live

**Repos & Hosting**
- GitHub: `CloudInsAgency/cloudpricedeals` (Next.js site)
- Vercel: Craig Foskey's Projects (Hobby plan, auto-deploy from main)
- Firebase project: `clouddeals` (us-central1, Blaze plan)
- Local clones: `~/Documents/cloudpricedeals` and Xcode project under `/Users/bpthomeyair15/Projects/clouddeals/`

---

## Key Decisions

**Website**
- Light theme only — competitor analysis showed all major deal sites use light
- CSS variables everywhere — color palette changes are one-file edits
- Domain canonical is non-www
- Sitemap is dynamic (`src/app/sitemap.js`), not static XML
- Comparison pages are dynamic routes backed by `src/data/comparisons.js`
- Facebook Page is separate from Cloud Insurance Agency page

**iOS App**
- Freemium with 3 PERMANENT free slots (creates upgrade pressure)
- StoreKit 2 over StoreKit 1 (modern async/await)
- Multi-retailer dedup by UPC, denormalize product data on watchlist entries
- Always use `StoreKit.Product` and `StoreKit.Transaction` to avoid Firebase/app type conflicts
- Use `sheet(item:)` not `sheet(isPresented:)` — fixed blank-sheet race condition

**Workflow**
- GitHub web editor for quick edits, Claude Code locally for refactors
- Avoid `git push --force` (prior incident)
- Always confirm "before I commit" — Craig wants to see plans first

---

## Identifiers

**Business**
- Cloud Design Studio LLC (NJ Entity ID: 0451424777)
- Address: 971 US Highway 202N, Branchburg, NJ 08876
- D-U-N-S: 144968291
- Apple Developer Enrollment: NQQ3FH3U2J (pending since March 30, 2026)

**Affiliate / Site**
- Amazon Associates tag: `clouddeals20-20`
- GSC verification token: `q3dzwJoaHqaZuCcc_oKxzjPkKQSnmDfy5hSYt-N9WB4`
- Facebook Ad account: 10152459191974550 ($250 limit, $231 used)
- Facebook Page: facebook.com/CloudPriceDeals (Page ID: 615690020622170)

**iOS**
- Bundle ID: `com.clouddesignstudio.Clouddeals`
- StoreKit Product ID: `com.clouddesignstudio.Clouddeals.premium.monthly`

**Accounts**
- Apple Developer: info@cloudstudiodesign.com
- Claude Code login: cfoskey23@gmail.com
- GitHub org: CloudInsAgency
- eBay developer: clouddeals101

---

## Open Issues (prioritized)

1. **Compare pages are orphans** — paste prepared Claude Code prompt to add `/compare` to navbar, add a comparison section on the homepage, and cross-link comparison pages. Single highest-ROI SEO move.

2. **Apple Developer enrollment stuck** — 27+ days pending. Contact Apple Developer Support at https://developer.apple.com/contact/ citing Enrollment ID NQQ3FH3U2J. Check info@cloudstudiodesign.com for missed verification emails.

3. **Meta Pixel install** — get Pixel ID from `business.facebook.com/events_manager`, then run prepared install prompt. Required before any meaningful FB ads.

4. **GSC redirect validation** — click "Validate Fix" on `/guides`, `/about`, `/browse` in Search Console (Vercel redirect already fixed).

5. **Bad GSC URL** — remove `/compare/amazon-vs-best-buy.html` (404) via GSC Removals tool.

6. **iOS deployment target** — lower from 26.2 to 16.0 or 17.0 before App Store submission.

7. **Push notifications + price scanner** — build FCM infrastructure on iOS and the scheduled `checkPrices` Cloud Function (every 6h). Core value prop. Code can be written now; testing needs APNs cert.

8. **API keys hardcoded** in `index.js` — move Best Buy and eBay keys to Firebase Secrets before any public release.

9. **Old "Unknown Product" entries** — manually delete from Firestore Console and reset user's `watchlistCount`.

10. **Watchlist UI polish** — add product images, color-coded deal labels, swipe-to-delete for premium, retailer badges.

---

## Useful Context (gotchas)

- `#0A0E1A` may still appear in code as button text color on green buttons — **intentional** during dark→light migration. Current refresh changed to `#FFFFFF`. Don't be alarmed if grep finds either.
- wsrv.nl image proxy can be flaky — fallback is to save screenshot to `/public` rather than retrying the proxy.
- Tailwind classes sometimes fail on certain components — that's why the About page uses inline styles with CSS variables.
- Firebase Functions v1 syntax used throughout `index.js` — keep consistent unless migrating the whole file.
- `Product` model lives in `SearchView.swift` along with `ProductImageView`, `ProductRow`, and `Equatable` extension.
- StoreKit testing requires `CloudDealsProducts.storekit` configured in Edit Scheme → Run → Options.
- Firestore structure: `users/{uid}` (profile), `users/{uid}/watchlists/{docId}`, `products/{docId}`, `products/{docId}/priceHistory/{docId}`.

---

## Source Context

Detailed history from each of the four merged Claude.ai projects lives in:

- `context/from-cloud-deals-1-ios-app.md` — iOS app development
- `context/from-cloud-deals-2-website-early.md` — early GitHub Pages era
- `context/from-cloud-deals-3-website-mid.md` — comparison features added
- `context/from-cloud-deals-4-website-current.md` — current Next.js/Vercel state

Read the relevant context file when working on a specific area; this CLAUDE.md
is the always-loaded summary.

---

## Recent Changes
- 2026-05-03: Visual redesign deployed to prod (cream + evergreen palette, Mochi-&-Oak hero, TrustSection); product pages restricted to Amazon-only with cent-accurate currency utility; pre-Meta-ad UX/conversion fixes shipped (FTC banner, Product/Breadcrumb JSON-LD, dynamic 44-URL sitemap, browse `?cat=` and `?retailer=` filters)
- 2026-04-26: Migrated four Claude.ai projects into this consolidated workspace
