# Cloud Dispatch Ops — Handoff

## Purpose

Cloud Dispatch Ops is a SaaS field service dispatch platform for HVAC/plumbing companies. It provides real-time job management with a Kanban board for dispatchers, mobile portal for technicians (with photo upload, digital signatures, and notes), technician management, and tiered subscription plans with automatic upgrade enforcement via Stripe. The product enforces plan limits (technicians per plan) and prompts users to upgrade when they hit capacity.

## Current Status

**Deployed & Working:**

- Production site live at https://dispatchops-three.vercel.app

- Complete rebrand to "Cloud Dispatch Ops" with logo across all pages (landing, signup, login, tech login, dashboards, technician management)

- Main Kanban Dashboard with job board, stats cards, sidebar toggle

- Dispatch Dashboard (table view) with search/filter, tech assignment

- Tech Dashboard (mobile portal) with tabbed interface (Active/Completed/All), photo upload (max 5, compressed), digital signature capture, tech notes, Google Maps navigation

- Technicians Management page with add/edit/delete functionality

- Firebase Authentication, Firestore database, Firebase Storage for photos/signatures

- Stripe integration configured with test mode products/prices

**In Progress:**

- Plan limit enforcement partially implemented but not working in production (the upgrade modal exists but doesn't trigger - user was able to add 11th technician on Starter plan without being prompted to upgrade)

**Blocked/Issue:**

- The `usePlanLimits` hook checks `userProfile?.subscription?.plan` but user documents in Firestore likely don't have a subscription field yet, so it defaults to 'starter' but doesn't enforce the 10-tech limit. Need to verify Firestore user document structure and either manually add subscription field or fix the default logic.

## Tech Stack

- **Frontend:** React 19.2.0, Vite 7.2.4, React Router DOM 7.13.0, Tailwind CSS 4.1.18

- **Backend/Database:** Firebase 12.8.0 (Auth, Firestore, Storage), Firebase Admin 13.6.0 (for webhooks)

- **Payments:** Stripe 20.3.0, @stripe/stripe-js 8.7.0, @stripe/react-stripe-js 5.4.1

- **UI/Icons:** react-icons 5.5.0, lucide-react 0.563.0

- **Utilities:** react-hot-toast 2.6.0 (notifications)

- **Deployment:** Vercel (auto-deploy from GitHub main branch)

- **Serverless Functions:** Vercel Functions in `/api` directory (create-checkout-session.js, webhook.js)

## Key Decisions

- **Rebrand to "Cloud Dispatch Ops":** Changed from "DispatchOps" to align with Cloud Design Studio LLC branding, added logo across all pages

- **Tiered Pricing with Hard Limits:** Starter ($149.95/mo, 10 techs), Growth ($199.95/mo, 20 techs), Professional ($275/mo, unlimited techs) with automatic upgrade prompts when limits are reached

- **Auto-Upgrade on Limit Hit:** When user tries to add technician beyond plan limit, show modal with upgrade CTA rather than soft warnings

- **Test Mode First:** All Stripe integration built in test mode first before switching to live keys

- **Photo Compression:** Technician photos compressed to 1920px max dimension at 85% quality before Firebase Storage upload to save costs

- **Tabbed Tech Portal:** Tech dashboard shows Active (scheduled + in_progress), Completed (today only), and All tabs for better mobile UX

- **Firebase Structure:** Jobs stored in `companies/{companyId}/jobs` subcollection; users in top-level `users` collection with `companyId` field

- **Firestore Security Rules:** Owners/dispatchers can manage techs in same company; techs can only read/update jobs assigned to them

## File & Repo Locations

- **GitHub Repo:** https://github.com/CloudInsAgency/dispatchops.git

- **Production URL:** https://dispatchops-three.vercel.app

- **Local Path:** ~/Downloads/web-dashboard

- **Vercel Project:** dispatchops (under Craig Foskey's account)

- **Firebase Project:** dispatchops-prod (Project ID in env vars)

- **Stripe Dashboard:** https://dashboard.stripe.com (Craig Foskey account, test mode active)

- **Logo File:** public/logo.png (CloudDispatchOpsLogo1.png, 449 KB PNG)

**Key Files:**

- `/api/create-checkout-session.js` - Stripe checkout session creation

- `/api/webhook.js` - Stripe webhook handler for subscription events

- `/src/config/stripe.js` - Stripe config, plan definitions, helper functions

- `/src/hooks/usePlanLimits.js` - Plan limit checker hook

- `/src/components/subscription/UpgradeModal.jsx` - Upgrade modal component

- `/src/components/dispatch/TechniciansPage.jsx` - Technician management with plan enforcement

- `/src/components/tech/TechDashboard.jsx` - Mobile tech portal

- `/.env` - Environment variables (gitignored)

- `/vercel.json` - Vercel config (simple rewrite setup)

## Credentials & IDs

**Environment Variables (in Vercel Production & .env):**

- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe test publishable key (pk_test_...)

- `VITE_STRIPE_SECRET_KEY` - Stripe test secret key (sk_test_...)

- `VITE_STRIPE_STARTER_PRICE_ID` - price_1Suu6GFMO5BrsZS9v3EA6yXe

- `VITE_STRIPE_GROWTH_PRICE_ID` - price_1Suu9BFMO5BrsZS9lwGp736l

- `VITE_STRIPE_PROFESSIONAL_PRICE_ID` - price_1SuuARFMO5BrsZS9qJ2Lwo6b

- `STRIPE_WEBHOOK_SECRET` - whsec_MxUV91MsiNQO5l6gNOzzRGN9H6lMFsvf

- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` (Firebase config)

- `VITE_FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (Firebase Admin for webhooks)

**Other IDs:**

- **Apple Developer Enrollment ID:** NQQ3FH3U2J (Cloud Design Studio LLC, pending org verification)

- **NJ Entity ID:** 0451424777 (Cloud Design Studio LLC)

- **Stripe Product IDs:** prod_TsfRBWz7CjIM15 (Starter), plus Growth/Professional products

- **Stripe Webhook Endpoint ID:** we_1Suv6rFMO5BrsZS9FAJGlp4n

## Open Issues

1. **Plan limit enforcement not working in production:** User added 11th technician on Starter plan (10-tech limit) without seeing upgrade modal. The `usePlanLimits` hook likely can't find `userProfile.subscription.plan` field in Firestore, so the check fails silently. Need to:

   - Check actual Firestore user document structure

   - Either add subscription field manually or update default logic

   - Test that upgrade modal appears on 11th tech add attempt

2. **Webhook handler untested:** Stripe webhook is configured and endpoint exists, but actual payment flow hasn't been tested end-to-end with a real (test mode) checkout. Need to verify webhook updates user subscription in Firestore correctly.

3. **No Firebase Admin credentials in environment yet:** The webhook.js file expects `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` but these may not be set in Vercel yet. Need Firebase service account key.

4. **Firestore Security Rules may need adjustment:** Current rules allow owner/dispatcher to create techs, but subscription upgrade logic (updating user.subscription field) happens via webhook with Admin SDK, which bypasses security rules. Should verify this works.

## Next Steps

1. **Fix plan limit enforcement:** Check Firestore user document structure in Firebase Console (users collection), add subscription field if missing, or update usePlanLimits.js to handle missing field properly

2. **Test full Stripe payment flow:** Attempt to add 11th tech → see upgrade modal → click upgrade → complete Stripe checkout with test card (4242...) → verify redirect → confirm subscription field updated in Firestore

3. **Add Firebase Admin environment variables to Vercel:** Get service account key from Firebase Console, add FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY to Vercel env vars, redeploy

4. **Implement subscription management page:** Allow users to view current plan, upgrade/downgrade, cancel subscription, view billing history

5. **Switch to Stripe live mode:** Once testing complete, create live mode products, update env vars with live keys, configure live webhook endpoint, deploy

## Useful Context

- **Craig's preferences:** Concise bullet-point formatting, systematic trackable approach, prefers free/low-cost deployment (Vercel free tier, Firebase free tier)

- **Company context:** Cloud Design Studio LLC is Craig's web/app dev operation with multiple SaaS products; this is one of several active projects

- **Pricing strategy:** These prices ($149.95/$199.95/$275) are final and significantly higher than initial discussion ($29/$79/$199) to reflect true market value for dispatch software

- **Design pattern:** Logo + Truck icon + "Cloud Dispatch Ops" text appears consistently across all pages in navigation headers

- **Trial structure:** 14-day free trial, no credit card required during trial

- **Firebase structure quirk:** Jobs are in subcollection under companies, not top-level, which affects query paths

- **Photo storage paths:** `jobs/{jobId}/` for job photos, `signatures/{jobId}/` for signatures in Firebase Storage

- **Completed jobs filter:** "Completed" tab in tech portal only shows jobs completed TODAY (not all completed jobs) to keep list manageable

- **Related projects:** CloudBooks (accounting SaaS), CloudPriceDeals (affiliate deals site), WigOut (AI hairstyle app) - all under Cloud Design Studio

Folder 3 Handoff…

