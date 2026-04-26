# CloudDeals iOS App — Handoff

## Purpose

CloudDeals is a freemium iOS price comparison app that lets users search products across multiple retailers (Best Buy, eBay, Walmart, Amazon), track prices on a watchlist, and receive alerts when prices drop. The app uses a freemium model: free users get 3 permanent watchlist slots with daily digest alerts; premium subscribers ($3.99/month via StoreKit 2) get unlimited tracking, real-time push notifications, 30-min scan frequency, and full deal scoring. The app is built by Craig Foskey under Cloud Design Studio LLC, a newly formed NJ LLC, and is targeting App Store submission once the Apple Developer Organization enrollment completes.

## Current Status

**Deployed & Working:**

- Firebase Cloud Functions (`index.js`) with multi-retailer search (Best Buy + eBay live, Walmart + Amazon placeholders)

- Best Buy Products API — live with key `TppNTxH9TyuCRcK7E52Ph0mK`

- eBay Browse API — live with OAuth client credentials flow

- Firebase Auth (email/password) — working

- Firestore user profiles, products collection, watchlist subcollections — working

- iOS app runs in Xcode simulator: auth flow, search, watchlist, profile, upgrade screens all functional

- Product images load via AsyncImage from retailer CDNs

- StoreKit 2 subscription wired up with local StoreKit config file for simulator testing

- Watchlist entries now include product name, image, price, retailer (was previously showing "Unknown Product" — fixed)

**In Progress / Blocked:**

- D-U-N-S number request submitted to Dun & Bradstreet (Case #10120617) — documentation (Certificate of Formation, EIN letter, Business Information Form) sent, awaiting processing

- Apple Developer Program Organization enrollment — blocked on D-U-N-S number

- Impact.com marketplace — application declined twice (VPN usage + unverified media property); direct affiliate signup to Walmart/Best Buy via their own pages is the fallback

- eBay Partner Network (affiliate commissions) — not yet applied

- Walmart API — blocked until affiliate approval (either via Impact or direct at affiliates.walmart.com)

- Push notifications — code not yet built; requires APNs certificate from Apple Developer account

- Price scanner scheduled function (checkPrices every 6 hours) — stubbed out in index.js but not implemented

- cloudstudiodesign.com website — GitHub Pages setup initiated, custom domain DNS configured but site content is minimal

## Tech Stack

**iOS App:**

- Swift / SwiftUI (iOS 16+, currently set to 26.2 minimum)

- Xcode (latest), targeting iPhone 17 Pro Max simulator

- Firebase iOS SDK: Auth, Firestore, Functions

- StoreKit 2 (auto-renewable subscription)

- AsyncImage for product photos

**Backend:**

- Firebase Cloud Functions (Node.js 18, firebase-functions v5)

- Firestore (user profiles, products, watchlists, priceHistory subcollections)

- Firebase Auth (email/password)

- Axios for HTTP calls to retailer APIs

**Third-Party APIs:**

- Best Buy Products API (REST, API key auth)

- eBay Browse API (OAuth 2.0 client credentials)

- Walmart Affiliate API (placeholder, needs Impact/affiliate approval)

- Amazon Product Advertising API (placeholder, needs 3 qualifying sales)

**Deployment:**

- Firebase project: `clouddeals` (deployed at clouddeals-3a958 or similar)

- iOS: local Xcode builds only (no App Store submission yet)

- Website: cloudstudiodesign.com on GitHub Pages (repo: cloudinsagency/clouddesignstudio)

## Key Decisions

- **Freemium model with permanent free slots**: Free users get exactly 3 watchlist slots that are permanent and cannot be removed. This creates urgency to choose wisely and incentivizes upgrading. Premium users can add/remove unlimited items.

- **StoreKit 2 over StoreKit 1**: Using modern async/await StoreKit 2 API for cleaner code and better subscription lifecycle management. Transaction listener handles renewals and refunds automatically.

- **Multi-retailer deduplication by UPC**: Products from different retailers are matched by UPC code and merged into a single result with per-retailer pricing. Products without UPC are shown as separate entries.

- **Product details stored on watchlist entries**: Initially watchlist entries only stored productId (referencing the products collection). This caused "Unknown Product" display issues. Fixed by denormalizing product name, image, price, and retailer directly onto each watchlist document for fast reads.

- **`StoreKit.Product` vs app `Product` disambiguation**: The app has its own `Product` struct for search results. StoreKit also has `Product`. Resolved by using `StoreKit.Product` explicitly and renaming the array to `storeProducts` in StoreManager.

- **`StoreKit.Transaction` disambiguation**: Firebase Firestore also has a `Transaction` type. All StoreKit transaction references use `StoreKit.Transaction` to avoid compiler ambiguity.

- **sheet(item:) over sheet(isPresented:)**: The AddToWatchlistSheet was showing blank on first tap due to a race condition with `selectedProduct` not being set before the sheet presented. Switched to `sheet(item: $selectedProduct)` pattern which only presents when the binding is non-nil.

- **Organization Apple Developer account**: Enrolling as Organization (not Individual) under Cloud Design Studio LLC for professional App Store presence and team management capability.

- **Northwest Registered Agent for all addresses**: LLC uses 971 US Highway 202N, Branchburg, NJ 08876 as registered agent, principal business, and mailing address to keep Craig's home address off public records.

## File & Repo Locations

**iOS Xcode Project:**

`/Users/bpthomeyair15/Projects/clouddeals/` (assumed Xcode project root)

**Firebase Cloud Functions:**

`/Users/bpthomeyair15/Projects/clouddeals/firebase/functions/index.js`

`/Users/bpthomeyair15/Projects/clouddeals/firebase/functions/package.json`

**Key Swift Files (in Xcode project):**

- `ClouddealsApp.swift` — app entry point, injects AuthViewModel + StoreManager as environment objects

- `RootView.swift` — routes between login and main tab view based on auth state

- `LoginView.swift` — email/password auth with CloudDeals logo

- `MainTabView.swift` — bottom tab bar: Watchlist, Search, Profile

- `SearchView.swift` — product search, Product model, ProductImageView, ProductRow

- `WatchlistView.swift` — displays tracked products with slots indicator

- `WatchlistViewModel.swift` — Firestore listener, addToWatchlist/removeFromWatchlist Cloud Function calls

- `AddToWatchlistSheet.swift` — modal for setting target price and adding product

- `ProfileView.swift` — user info, stats, premium status, upgrade button

- `UpgradeView.swift` — paywall screen with feature comparison, StoreKit purchase/restore

- `StoreManager.swift` — StoreKit 2 subscription manager (load products, purchase, restore, transaction listener, Firestore sync)

- `AuthViewModel.swift` — Firebase Auth state, user profile fetching

- `CloudDealsProducts.storekit` — StoreKit testing configuration file

**Other Firebase Projects on this machine:**

- PollPulse: `/Users/bpthomeyair15/pollpulse-backend/functions/`

- WigOut: `/Users/bpthomeyair15/Downloads/WigOutApp/functions/`

**Website:**

- GitHub Pages repo: `cloudinsagency/clouddesignstudio`

- Live at: `cloudstudiodesign.com` (DNS via Namecheap, A records pointing to GitHub Pages IPs)

**Firebase Console:**

- Project URL: `https://console.firebase.google.com/project/clouddeals-XXXXX/` (check Firebase CLI for exact project ID)

## Credentials & IDs

**LLC & Business:**

- Entity: Cloud Design Studio LLC (NJ)

- NJ Entity ID: 0451424777

- EIN: 41-XXXXXXX (Craig has the full number)

- NJ Taxpayer ID: XXX-XXX-475/000

- Filing Date: 03/05/2026

- Registered Agent: Northwest Registered Agent LLC, 971 US Highway 202N, Branchburg, NJ 08876

**Apple:**

- Bundle ID: `com.clouddesignstudio.Clouddeals`

- StoreKit Product ID: `com.clouddesignstudio.Clouddeals.premium.monthly`

- Apple Developer Enrollment: pending D-U-N-S (new Apple ID created with support@cloudstudiodesign.com)

- Previous personal Apple Developer Enrollment ID: NQQ3FH3U2J (separate from the org enrollment)

**API Keys (in index.js CONFIG):**

- Best Buy API Key: hardcoded in CONFIG fallback

- eBay App ID (Client ID): hardcoded in CONFIG fallback (`CloudDes-CloudDea-PRD-...`)

- eBay Cert ID (Client Secret): hardcoded in CONFIG fallback (`PRD-bf6891b71d80-...`)

- eBay Dev ID: `12bf3b54-ee2a-47a3-9757-7da1221732be` (not used in code but part of keyset)

- Walmart: placeholder `YOUR_WALMART_API_KEY`

- Amazon: placeholder, empty strings

**Impact.com:**

- Account ID: 7073883 (declined twice, may need new account or direct brand signup)

**eBay Developer:**

- Username: clouddeals101

- Portal: developer.ebay.com

**Email:**

- Business email: support@cloudstudiodesign.com (Namecheap email hosting)

- Also: info@cloudstudiodesign.com

**D-U-N-S:**

- Case #10120617, documentation submitted, awaiting number assignment

## Open Issues

- **Impact.com declined twice**: Reasons were VPN usage and unverified media property. Options: create new Impact account without VPN after verifying website, or apply directly to Walmart (affiliates.walmart.com) and Best Buy affiliate programs via their own signup pages.

- **Profile doesn't refresh watchlistCount in real-time**: After adding a product to watchlist, the Profile screen's "Products Tracked" and "Free Slots Remaining" don't update until the user signs out and back in. The `onChange(of: showUpgrade)` refreshes profile but a similar refresh is needed after watchlist changes.

- **Watchlist dots indicator (3 dots in top-right)**: May not be updating correctly after adding products. Needs investigation in WatchlistView.swift to confirm it reads from a real-time source.

- **API keys hardcoded in index.js**: Best Buy and eBay keys are in the source code as fallback values. Should move to Firebase Functions config (`firebase functions:config:set`) or Firebase Secrets for production.

- **Old "Unknown Product" entries in Firestore**: Two bad watchlist entries were created before the fix. Need to manually delete from Firestore Console and reset the user's watchlistCount.

- **cloudstudiodesign.com needs real content**: The website is minimal/default. Apple will check it during Developer enrollment, and Impact.com flagged it. Needs a proper landing page for Cloud Design Studio LLC.

- **StoreKit config only for testing**: The `CloudDealsProducts.storekit` file enables simulator testing. Real subscriptions require App Store Connect configuration once the Apple Developer Organization account is active.

- **iOS minimum deployment set to 26.2**: This is extremely high and would exclude most users. Should be lowered to iOS 16.0 or 17.0 for broader compatibility.

## Next Steps

1. **Push Notifications + Price Scanner**: Build the FCM push notification infrastructure on iOS (request permission, register token) and the scheduled Cloud Function (`checkPrices`) that runs every 6 hours, fetches current prices for all watchlisted products, compares against target prices, and sends FCM notifications when prices drop. This is the core value prop of the app. Code can be written now; testing requires APNs cert from Apple Developer account.

2. **Watchlist View UI Polish**: The watchlist currently shows basic text. Add product images (using ProductImageView), current price with color-coded deal labels, price-vs-target comparison, swipe-to-delete for premium users, and the retailer logo/name. This makes the app feel complete for screenshots and App Store submission.

3. **Cloud Design Studio Website**: Build a real landing page at cloudstudiodesign.com. This unblocks both Apple Developer enrollment verification and any future Impact.com/affiliate applications. Should include company info, app showcase, contact info, and privacy policy.

4. **App Store Submission Prep**: Once D-U-N-S and Apple Developer enrollment complete: create App Store Connect listing, configure the subscription product in App Store Connect (matching the product ID), generate screenshots, write description and metadata, add privacy policy URL, and submit for review.

5. **Walmart + Amazon API Integration**: Apply directly to Walmart affiliate program at affiliates.walmart.com. Once approved, wire up the Walmart API credentials in index.js (the search function is already written). Amazon requires 3 qualifying sales through Amazon Associates before API access is granted — this is a longer-term play.

## Useful Context

- **Craig's preferences**: Prefers concise bullet-point formatting, systematic trackable approaches, and always wants the entire file provided for copy-paste rather than partial edits. When updating code, always review the current version first and confirm all existing code is preserved.

- **Multiple projects in parallel**: Craig also maintains CloudPriceDeals (Next.js affiliate site on Vercel), CloudBooks (SaaS accounting app), Cloud Dispatch Ops (field service SaaS), WigOut (AI hairstyle app with business partner Menelik Simmonds), PollPulse (polling app), and several client websites. Context switching is common.

- **Mac setup**: MacBook Air, username `bpthomeyair15`, home dir `/Users/bpthomeyair15/`

- **Firebase CLI**: Installed globally via npm at `/Users/bpthomeyair15/.npm-global/`

- **Firebase Functions v1 syntax**: The current index.js uses `firebase-functions` v1-style exports (`functions.https.onCall`, `functions.auth.user().onCreate`), not the v2 modular imports. Keep this consistent unless migrating the whole file.

- **Product struct lives in SearchView.swift**: The `Product` model, `ProductImageView`, `ProductRow`, and `Equatable` extension are all defined in SearchView.swift. If splitting into separate files later, watch for import issues.

- **StoreKit naming conflicts**: Both `Product` and `Transaction` have naming conflicts between StoreKit and Firebase/app types. Always use `StoreKit.Product` and `StoreKit.Transaction` in StoreManager.swift.

- **Testing subscriptions**: Must set StoreKit Configuration to `CloudDealsProducts.storekit` in Edit Scheme → Run → Options. Without this, StoreKit products won't load in the simulator.

- **Firestore structure**: `users/{uid}` (profile), `users/{uid}/watchlists/{docId}` (tracked items), `products/{docId}` (product catalog), `products/{docId}/priceHistory/{docId}` (price snapshots)

- **Phone number**: (973) 449-3671 — used for LLC filings, Apple enrollment, D&B contact

- **New Flix job**: Craig recently accepted a Regional Sales and Agency Manager position at FlixBus covering the US Eastern region. Time availability for app development may vary.

