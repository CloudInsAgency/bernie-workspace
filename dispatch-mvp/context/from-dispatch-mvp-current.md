# Cloud Dispatch Ops — Handoff

## Purpose

Cloud Dispatch Ops is a SaaS dispatch management platform built for HVAC, plumbing, and electrical field service companies. It enables business owners to manage technicians, create and assign jobs via a real-time dispatch board, track job completion, and handle subscription billing. The platform includes a dedicated technician portal where field workers can view assigned jobs and update their status. The project was built to provide small-to-medium service companies (5-40 technicians) with enterprise-grade dispatch tools at an affordable price point, created by someone with 15+ years of dispatch management experience.

## Current Status

**Deployed & Working:**

- Full owner dashboard with dispatch board, drag-and-drop job assignment, technicians page, settings (profile, company, business hours, service area), reports with CSV export, and billing page

- Technician portal at `/tech` with login, job viewing, and status updates

- 14-day free trial system with TrialGate enforcement that blocks access after trial expires (users can still access billing page to subscribe)

- Stripe integration: checkout sessions, customer portal, webhook handlers for subscription lifecycle

- Firebase Auth for both owners and technicians (secondary app pattern to create tech accounts without logging out owner)

- Add Technician modal creates real Firebase Auth accounts with auto-generated passwords and credential display with copy buttons

- Forgot Password flow on tech login using Firebase sendPasswordResetEmail

- Landing page with demo video modal (YouTube embed), pricing section, features, how-it-works

- Support pages: Help Center (searchable FAQ), Contact Us, System Status, About, Privacy Policy, Terms of Service

- Firebase security rules deployed for Firestore and Storage

- Footer links all wired up

**In Progress / Blocked:**

- Stripe live keys not yet configured — owner seeing `mk_1...` when trying to copy secret key instead of `sk_live_...`

- Need to create live products/prices in Stripe for Starter ($149.95), Growth ($199.95), Professional ($275)

- Missing Vercel environment variables: `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `STRIPE_WEBHOOK_SECRET`

- Stripe webhook endpoint not yet created in Stripe dashboard

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router v6, React Hot Toast

- **Backend:** Firebase (Auth, Firestore, Storage, Functions), Vercel Serverless Functions (Node.js)

- **Payments:** Stripe (Checkout, Customer Portal, Webhooks, Subscriptions)

- **Icons:** React Icons (Feather Icons - `fi-*`)

- **Deployment:** Vercel (auto-deploy from GitHub main branch)

- **Domain:** dispatchops-three.vercel.app (production)

- **Firebase Project:** dispatchops-prod

- **CLI Tools:** Firebase CLI 15.3.0

## Key Decisions

- **Secondary Firebase App for tech account creation:** When owners add technicians, a secondary Firebase app instance is created to call `createUserWithEmailAndPassword` without logging out the current owner. The secondary app is immediately deleted after account creation.

- **Trial enforcement via TrialGate component:** Wraps all admin routes except `/billing`. Checks `subscription.status` and `trialEndsAt` timestamp. Expired trials show a blocking modal with "Choose a Plan" button.

- **Company ID = Owner UID:** For simplicity, the company document ID matches the owner's Firebase Auth UID. This makes lookups straightforward and avoids extra queries.

- **Technicians stored both in users collection and subcollection:** Tech gets a `/users/{uid}` doc with `role: 'tech'` for auth purposes, plus a `/companies/{companyId}/technicians/{techId}` doc for company-specific data and listing.

- **No separate tech mobile app:** Technicians use a mobile-optimized web portal at `/tech` — no app store deployment needed.

- **Webhook-driven subscription updates:** Stripe webhooks update Firestore `subscriptionStatus` on checkout complete, subscription update, and subscription delete events.

## File & Repo Locations

- **GitHub:** https://github.com/CloudInsAgency/dispatchops

- **Production URL:** https://dispatchops-three.vercel.app

- **Tech Portal:** https://dispatchops-three.vercel.app/tech

- **Local Path:** `~/Downloads/web-dashboard`

- **Firebase Console:** https://console.firebase.google.com/project/dispatchops-prod

- **Stripe Dashboard:** https://dashboard.stripe.com (account owned by Craig)

- **Vercel Dashboard:** https://vercel.com (dispatchops project)

**Key Files:**

- `src/contexts/AuthContext.jsx` — Auth logic, signup with trialEndsAt, user profile loading

- `src/components/TrialGate.jsx` — Trial enforcement wrapper

- `src/components/billing/BillingPage.jsx` — Plan comparison, upgrade modal trigger

- `src/components/subscription/UpgradeModal.jsx` — Stripe checkout initiation

- `src/components/technicians/AddTechnicianModal.jsx` — Creates Firebase Auth + Firestore docs

- `src/config/secondaryAuth.js` — Secondary app pattern for tech account creation

- `src/config/stripe.js` — Plan definitions, price IDs, helper functions

- `api/create-checkout-session.js` — Vercel serverless function for Stripe checkout

- `api/webhook.js` — Stripe webhook handler (checkout.session.completed, subscription.updated, subscription.deleted)

- `firestore.rules` — Security rules (deployed)

- `storage.rules` — Storage security rules (deployed)

- `firebase.json` — Firebase config

## Credentials & IDs

**Firebase (dispatchops-prod):**

- `VITE_FIREBASE_API_KEY` — Set in Vercel ✓

- `VITE_FIREBASE_AUTH_DOMAIN` — Set in Vercel ✓

- `VITE_FIREBASE_PROJECT_ID` — Set in Vercel ✓

- `VITE_FIREBASE_STORAGE_BUCKET` — Set in Vercel ✓

- `VITE_FIREBASE_MESSAGING_SENDER_ID` — Set in Vercel ✓

- `VITE_FIREBASE_APP_ID` — Set in Vercel ✓

- `VITE_FIREBASE_MEASUREMENT_ID` — Set in Vercel ✓

- `FIREBASE_CLIENT_EMAIL` — **NOT SET** (needed for webhook Firebase Admin SDK)

- `FIREBASE_PRIVATE_KEY` — **NOT SET** (needed for webhook Firebase Admin SDK)

**Stripe:**

- `VITE_STRIPE_PUBLISHABLE_KEY` — **NOT SET in Vercel** (test key exists in .env locally)

- `VITE_STRIPE_SECRET_KEY` — **NOT SET in Vercel** (test key exists in .env locally)

- `VITE_STRIPE_STARTER_PRICE_ID` — **NOT SET in Vercel** (test price exists in .env locally)

- `VITE_STRIPE_GROWTH_PRICE_ID` — **NOT SET in Vercel** (test price exists in .env locally)

- `VITE_STRIPE_PROFESSIONAL_PRICE_ID` — **NOT SET in Vercel** (test price exists in .env locally)

- `STRIPE_WEBHOOK_SECRET` — **NOT SET** (webhook endpoint not yet created in Stripe)

**Local .env has test keys:**

- `pk_test_51SuiLLFMO5BrsZS9...`

- `sk_test_51SuiLLFMO5BrsZS9...`

- Test price IDs for all three tiers

**Business Info:**

- Company: Cloud Design Studio, LLC

- Phone: (201) 500-7615

- Location: West Orange, NJ

**Firebase CLI Account:** cfoskey23@gmail.com (used for `firebase deploy`)

## Open Issues

- **Stripe live secret key confusion:** When copying secret key from Stripe dashboard, it shows `mk_1...` (merchant/restricted key) instead of `sk_live_...`. Need to find "Reveal live key" or create new standard key.

- **Missing Vercel env vars blocking production billing:** Without `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, and `STRIPE_WEBHOOK_SECRET`, the webhook won't work and subscription status won't update in Firestore after payment.

- **Existing test users don't have trialEndsAt:** Only new signups after the TrialGate commit will have the 14-day trial timestamp. Existing users won't be blocked even if they should be.

- **Tailwind CDN warning in console:** "cdn.tailwindcss.com should not be used in production" — may need to properly compile Tailwind.

- **Large bundle size warning:** Vite shows chunk >500KB warning. Could implement code splitting for optimization.

## Next Steps

1. **Get Stripe live keys:** In Stripe dashboard (Live mode), go to Developers → API Keys → Click "Reveal live key" or create a new standard secret key. May require completing account verification.

2. **Create live products in Stripe:** In Live mode, create three products with monthly recurring prices: Starter ($149.95), Growth ($199.95), Professional ($275). Copy the live price IDs.

3. **Add all Stripe env vars to Vercel:** Add `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_STRIPE_SECRET_KEY`, and all three price IDs with live values.

4. **Get Firebase Admin credentials:** Firebase Console → Project Settings → Service Accounts → Generate New Private Key. Download JSON, extract `client_email` and `private_key`, add to Vercel as `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`.

5. **Create Stripe webhook:** Stripe Dashboard → Developers → Webhooks → Add endpoint. URL: `https://dispatchops-three.vercel.app/api/webhook`. Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`. Copy signing secret to Vercel as `STRIPE_WEBHOOK_SECRET`.

## Useful Context

- **Craig's background:** 15+ years managing field service operations at Verizon (Associate Director managing 4 regional centers, 50+ employees). Recently accepted a Regional Sales role at Flix. Also runs Cloud Design Studio LLC for web/app development.

- **Pricing tiers:** Starter (up to 10 techs, 200 jobs/mo), Growth (up to 20 techs, 400 jobs/mo), Professional (up to 40 techs, 800 jobs/mo).

- **Craig's preferences:** Prefers concise bullet-point formatting, systematic approach, free/low-cost deployment options.

- **Related project:** WigOut app (different Firebase project: wigoutapp) is on a different Google account.

- **Demo video:** YouTube link `https://youtu.be/PG-5KhLoakA` embedded in landing page "Watch Demo" button.

- **Testing accounts:** paulpierce@test.com already exists. Create new emails for fresh signup testing.

- **Git workflow:** Push to main → Vercel auto-deploys. Firebase rules deployed separately via `firebase deploy --only firestore:rules --account cfoskey23@gmail.com`.