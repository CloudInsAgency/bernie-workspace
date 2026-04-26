# Cloud Deals — Project Context

This folder contains TWO related codebases under one project umbrella:

1. **CloudPriceDeals website** — Next.js affiliate site at cloudpricedeals.com
2. **CloudDeals iOS app** — SwiftUI/Firebase/StoreKit 2 companion price-tracker

Both are owned by Cloud Design Studio LLC. The website is the marketing front
end; the iOS app is the price-tracking product. They share branding, the
Amazon Associates tag, and a deliberate strategy: the site generates affiliate
revenue while the app builds a subscriber base.

---

## Current Status (as of April 2026)

### Website — cloudpricedeals.com (LIVE)

Recently completed a full refresh:
- Light theme migration complete (dark mode removed entirely)
- Orange `#FF6B35` accent for "hot deal" badges
- 33 verified deals in catalog with Amazon affiliate links
- Google Search Console verified (Domain property)
- Sitemap submitted, 9 pages indexed
- Vercel domain redirect fixed (www → non-www, 308)
- Comparison page system built (`/compare/[slug]`) — first entry: Amazon vs Best Buy
- Facebook Page created (separate from Cloud Insurance Agency)

In progress:
- Compare pages are orphans — need navbar + homepage links
- Meta Pixel install prompt prepared but not executed (need real Pixel ID)
- GSC redirect errors on `/guides`, `/about`, `/browse` need "Validate Fix" clicked
- Bad GSC URL `/compare/amazon-vs-best-buy.html` returns 404 — needs removal

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
- 2026-04-26: Migrated four Claude.ai projects into this consolidated workspace
