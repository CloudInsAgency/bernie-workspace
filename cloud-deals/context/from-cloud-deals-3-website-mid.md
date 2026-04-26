# CloudPriceDeals — Handoff

## Purpose

CloudPriceDeals (cloudpricedeals.com) is an Amazon affiliate deal aggregation and price comparison site built by Craig Foskey (Cloud Design Studio LLC, West Orange NJ). It surfaces curated product deals across Amazon, Best Buy, Walmart, Target, and eBay — updated weekly — and earns revenue through Amazon Associates commissions. The site compares prices across all five retailers for each product, tracks price history, and allows users to save deals to occasion-based wishlists. A companion iOS app (CloudDeals) is in development. The site is designed to rank on SEO terms like "best amazon deals under $150" and "price comparison electronics."

## Current Status

- **Live at:** cloudpricedeals.com and cloudpricedeals.vercel.app

- **Deployed via:** Vercel (auto-deploys on push to `main` branch of GitHub repo `CloudInsAgency/cloudpricedeals`)

- **Build status:** All 9 routes compiling cleanly as of April 2026

- **Recently completed:** Full dark-theme redesign (navy `#0A0E1A` + electric green `#00D084`), 35 new products across Electronics/Kitchen/Beauty/Fitness/Home/Gaming, mobile responsive fixes, Buying Guides section, Wishlist dark theme, product detail pages with Compare Prices panel

- **In progress:** Google Search Console setup, GA4 setup, SEO meta tags on all pages

- **Blocked:** `guides/page.js` was accidentally deleted from repo — needs to be recreated as a new file at `src/app/guides/page.js` (confirmed working content available from last session). Amazon affiliate links for new 35-product catalog not yet verified by Craig — still using `?tag=clouddeals20-20` ASIN format placeholders for new products.

## Tech Stack

- **Framework:** Next.js 14 (App Router, `src/app/` structure)

- **Styling:** Inline React styles + minimal global CSS classes in `globals.css` (no Tailwind component classes in JSX — this caused build errors previously)

- **Fonts:** DM Serif Display (headings) + DM Sans (body) via Google Fonts

- **Color system:** CSS variables in `:root` — `--bg: #0A0E1A`, `--surface: #111827`, `--surface2: #1A2235`, `--green: #00D084`, `--text: #F0F4FF`, `--text-2: #94A3B8`, `--text-3: #475569`

- **Data:** Static JS file `src/data/deals.js` — no database, no API calls, all product data hardcoded

- **Deployment:** Vercel (Hobby plan, project: `craig-foskeys-projects/cloudpricedeals`)

- **Repo:** GitHub (`CloudInsAgency/cloudpricedeals`)

- **Domain:** cloudpricedeals.com (registered on Namecheap, DNS pointed to Vercel)

- **Affiliate program:** Amazon Associates (`tag=clouddeals20-20`)

- **Image proxy:** `wsrv.nl` used to proxy Amazon CDN images (`m.media-amazon.com/images/P/ASIN.jpg`) to avoid hotlink blocking

- **Companion app:** CloudDeals iOS app (separate project, Firebase backend, StoreKit 2)

## Key Decisions

- **No database — static deals.js:** All product data lives in `src/data/deals.js`. Craig updates prices weekly by pasting a new version of this file. Simple, zero cost, zero latency. Tradeoff: manual updates only.

- **Inline styles only in JSX:** After multiple build failures, the decision was made to never use custom CSS class names (like `btn-primary`, `hide-mobile`) as `className` in JSX components. These classes exist in `globals.css` for CSS-only hover effects, but interactive/layout styles are always inline. Exception: Tailwind utility classes (`hidden`, `md:flex`) are fine.

- **Server vs client components:** Any file using `onMouseEnter`, `onMouseLeave`, `onClick`, `useState`, `useEffect`, or `useParams` MUST have `'use client'` at the top. Files with `export const metadata = {...}` CANNOT also have `'use client'` — they are mutually exclusive in Next.js 14 App Router. Hover effects in server components use `<style>` tags with CSS classes instead.

- **Dynamic routes use `[id]` folders:** GitHub web editor URL-encodes brackets as `%5Bid%5D`. When creating new dynamic route files via GitHub web UI, type the full path (e.g. `src/app/guides/[id]/page.js`) in the filename box — GitHub will create the `[id]` folder correctly. Never create the folder via the UI first.

- **Image strategy:** Amazon CDN `images/P/ASIN.jpg` works for ~60% of ASINs. For products where this returns a blank image, direct `m.media-amazon.com/images/I/XXXX.jpg` URLs are used (obtained by right-clicking the product image on Amazon). Fallback is emoji via `onError` handler.

- **Mobile overflow:** `overflow-x: hidden` on both `html` and `body`, `max-width: 100vw` on html. Product page uses CSS class `.product-layout` with a `<style>` tag to switch from 2-column to 1-column on mobile, stacking Compare Prices below the product image.

- **Weekly update workflow:** Craig goes to Amazon each Monday, verifies prices, right-clicks product images to get CDN URLs, grabs affiliate links from SiteStripe bar, then pastes a new `deals.js` via GitHub web editor.

## File & Repo Locations

- **GitHub repo:** https://github.com/CloudInsAgency/cloudpricedeals

- **Live site:** https://cloudpricedeals.com

- **Vercel dashboard:** https://vercel.com/craig-foskeys-projects/cloudpricedeals

- **Key source files:**

  - `src/app/page.js` — Homepage (hero, ticker, hot deals, all deals grid)

  - `src/app/globals.css` — Global styles, CSS variables, animations, mobile breakpoints

  - `src/app/layout.js` — Root layout, SEO metadata, viewport meta tag

  - `src/app/browse/page.js` — Browse page with sidebar filters

  - `src/app/product/[id]/page.js` — Product detail page with compare prices panel

  - `src/app/wishlist/page.js` — Wishlist page (localStorage-based)

  - `src/app/guides/page.js` — Buying guides index ⚠️ NEEDS TO BE RECREATED

  - `src/app/guides/[id]/page.js` — Individual guide article pages

  - `src/app/about/page.js` — About page

  - `src/app/privacy/page.js` — Privacy policy

  - `src/components/Navbar.js` — Sticky navbar with mobile hamburger

  - `src/components/Footer.js` — Footer with links, affiliate disclosure

  - `src/components/DealCard.js` — Product card (grid + list views)

  - `src/components/RetailerBadge.js` — Colored retailer pill badges

  - `src/components/EmailCapture.js` — Email signup (banner + inline variants)

  - `src/data/deals.js` — All product data, RETAILERS, CATEGORIES, WISHLIST_OCCASIONS

## Credentials & IDs

- **Amazon Associates tag:** `clouddeals20-20`

- **Amazon Associates dashboard:** https://affiliate-program.amazon.com

- **Vercel project:** `craig-foskeys-projects/cloudpricedeals`

- **GitHub org:** `CloudInsAgency`

- **Apple Developer Enrollment ID:** `NQQ3FH3U2J` (Cloud Design Studio LLC, pending org verification)

- **NJ Entity ID:** `0451424777`

- **EIN:** On file with Craig (used for Apple Developer enrollment)

- **Domain registrar:** Namecheap (cloudpricedeals.com)

- **No environment variables currently in use** — all data is static, no API keys needed for current functionality

- **Future env vars needed:** GA4 Measurement ID (when analytics set up), email service API key (when email capture is wired to a real provider)

## Open Issues

- **`guides/page.js` missing from repo:** The file was accidentally deleted during a bad paste operation. The route shows 404. Needs to be recreated via GitHub "Add file → Create new file" at path `src/app/guides/page.js`. Working content was confirmed in terminal session — see last session for full file content.

- **New 35-product affiliate links not verified:** The new deals catalog (added April 2026) uses manually constructed `https://www.amazon.com/dp/ASIN?tag=clouddeals20-20` links. Craig has not yet visited each product page and grabbed the SiteStripe short link. Some ASINs may be wrong or products discontinued.

- **New product images may be blank:** Several products in the new 35-product catalog use `img(ASIN)` format which fails for ~40% of ASINs. Craig needs to right-click each blank product image on Amazon and paste the direct `m.media-amazon.com/images/I/XXXX.jpg` URL into deals.js.

- **GitHub web editor paste truncation:** Long files get silently truncated when pasted via GitHub web editor. Always verify the commit diff shows the complete file. If Vercel shows "Unexpected eof" error, the file was truncated. Fix: use shorter files or split into multiple commits.

- **No real email capture backend:** EmailCapture component shows a fake success state after 800ms timeout. Not connected to Mailchimp, ConvertKit, or any real service.

- **Google Search Console not set up:** Site has never been submitted to GSC. No sitemap.xml generated yet.

- **Beauty category prices very low ($19-$35):** Several beauty products (CeraVe, Neutrogena, Mighty Patch, Tangle Teezer) are priced under the stated $35-$75 target range. These should either be replaced or the range adjusted on the homepage copy.

- **Browse page may need updating:** `src/app/browse/page.js` has not been updated with the new dark theme — it may still use old cream/blue color scheme.

- **About page not updated:** Still uses old styling.

- **`RETAILERS` object in deals.js** was updated to use `bg`/`text`/`border` keys but `RetailerBadge.js` now reads `bg`/`text` directly — verify these are in sync if badge colors look wrong.

## Next Steps

1. **Recreate `src/app/guides/page.js`** — Create the file via GitHub web UI at `https://github.com/CloudInsAgency/cloudpricedeals/new/main/src/app/guides`, filename `page.js`. Content is in the last terminal session. This fixes the 404 on `/guides`.

2. **Verify and fix new product images** — Go through the 35 new products in `deals.js`, visit each Amazon page, right-click the main product photo, copy the `m.media-amazon.com/images/I/XXXX.jpg` URL and update deals.js for any that show blank.

3. **Verify affiliate links for new 35 products** — Visit each Amazon product URL, confirm the product is correct and in stock, grab the SiteStripe short link (`amzn.to/XXXXXXX`) and update deals.js.

4. **Update Browse and About pages to dark theme** — `src/app/browse/page.js` and `src/app/about/page.js` still use old cream/blue styling. Apply the same dark theme (`#0A0E1A` background, `#00D084` green accents, `DM Serif Display` / `DM Sans` fonts).

5. **Set up Google Search Console + sitemap** — Add `cloudpricedeals.com` to GSC, verify ownership via Vercel DNS, generate `sitemap.xml` (Next.js can do this via `src/app/sitemap.js`), and submit. This is the single highest-leverage SEO action remaining.

## Useful Context

- **Never use `git push --force`** from any terminal — Craig manages the repo exclusively via GitHub web editor. All changes must go through the GitHub UI or a clean push from a fresh clone.

- **Vercel deploys automatically** on every push to `main`. Build takes ~2 minutes. Check https://vercel.com/craig-foskeys-projects/cloudpricedeals/deployments for status. A red dot = build error. Click the deployment to see logs.

- **To roll back:** In Vercel deployments list, find the last green deployment, click the three dots `...` and hit "Redeploy."

- **File paste strategy:** Due to GitHub web editor character limits, very long files sometimes get silently truncated. For files over ~300 lines, consider splitting or verifying the diff after commit. The terminal build (`npm run build`) is the ground truth — if it passes locally, it will pass on Vercel.

- **CSS class vs inline style rule:** The hard-learned rule is: hover effects → CSS classes in a `<style>` tag or `globals.css`. Everything else → inline styles. Never put custom class names in `className` props unless they are defined in globals.css or are Tailwind utilities.

- **Server component rule:** If a component or page uses any React hook or event handler, it needs `'use client'`. If it exports `metadata`, it cannot have `'use client'`. These two patterns are mutually exclusive in Next.js 14 App Router.

- **Related projects by Craig:** WigOut (AI hairstyle iOS/Android app), PollPulse (polling iOS app), CloudBooks (SaaS accounting app), Cloud Dispatch Ops (field service SaaS), A&G Insurance Group LLC (50% stake, partnership dispute in progress), new Flix (FlixBus) Regional Sales & Agency Manager role starting soon.

- **Craig's preferences:** Concise bullet-point responses, always provide full file content for copy-paste (not diffs or partial snippets), confirm builds pass in terminal before providing files, dark professional aesthetic for all UI work.

