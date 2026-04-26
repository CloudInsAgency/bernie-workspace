# Cloud Dispatch Ops — Project Context

**Cloud Dispatch Ops** is a SaaS dispatch management platform for HVAC,
plumbing, and electrical field service companies. It lets business owners
manage technicians, create and assign jobs via a real-time Kanban dispatch
board, and handle subscription billing. Field technicians use a
mobile-optimized web portal at `/tech` to view assigned jobs, update status,
upload photos, capture digital signatures, and add notes.

Built by Craig, who brings 15+ years of field service operations experience
from Verizon (Associate Director managing 4 regional centers, 50+ employees).
The platform targets small-to-medium service companies (5-40 technicians)
that want enterprise-grade dispatch tools at an affordable price.

This is **the most feature-complete project in your portfolio** — full SaaS
with auth, multi-tenancy, subscription billing, and role-based access.

---

## Current Status

**🟢 Production deployed** at https://dispatchops-three.vercel.app

The app is fundamentally working — owners can sign up, run a 14-day trial, manage technicians, dispatch jobs via Kanban, and technicians can use the mobile portal. The platform is **one credentials configuration away from accepting real money.**

**Working end-to-end:**
- Owner dashboard — dispatch board, drag-and-drop assignment, technician management, settings (profile/company/business hours/service area), reports with CSV export, billing page
- Technician portal at `/tech` — login, job viewing, status updates, photo upload, signature capture, notes, timer
- 14-day free trial with TrialGate enforcement (blocks admin routes after expiry; users can still reach `/billing` to subscribe)
- Stripe in **test mode** — checkout sessions, customer portal, webhook handlers all coded
- Firebase Auth (owners + technicians via secondary-app pattern)
- Add Technician modal creates real Firebase Auth accounts with auto-generated passwords
- Forgot Password flow on tech login (Firebase `sendPasswordResetEmail`)
- Landing page with demo video modal (YouTube), pricing section, features
- Support pages: Help Center, Contact Us, System Status, About, Privacy, Terms
- Firebase security rules deployed for Firestore + Storage

**🚨 Blocked on production billing — 4 things missing:**

1. **Stripe live secret key** — Craig has been seeing `mk_1...` (a merchant/restricted key) when trying to copy the live secret key from the Stripe dashboard, instead of `sk_live_...`. Need "Reveal live key" or to create a new standard key. May require completing account verification.
2. **Live Stripe products + prices not yet created** — Need three monthly recurring products: Starter ($149.95), Growth ($199.95), Professional ($275).
3. **Vercel env vars missing:**
   - `FIREBASE_CLIENT_EMAIL` (needed for webhook Firebase Admin SDK)
   - `FIREBASE_PRIVATE_KEY` (needed for webhook Firebase Admin SDK)
   - `STRIPE_WEBHOOK_SECRET` (needed for webhook signature verification)
   - All `VITE_STRIPE_*` keys (publishable, secret, three price IDs) — currently only in local `.env`
4. **Stripe webhook endpoint not yet created** in Stripe dashboard.

Until these four are done, **subscription state cannot update in Firestore after payment**, even if a customer completes Stripe checkout.

---

## Tech Stack

**Frontend**
- React 18, Vite, React Router v6
- Tailwind CSS (currently via CDN — see Open Issues)
- React Hot Toast for notifications
- React Icons (Feather Icons, `fi-*`)

**Backend**
- Firebase: Auth, Firestore, Storage, Functions
- Vercel Serverless Functions (Node.js) for Stripe API calls + webhook handler

**Payments**
- Stripe — Checkout, Customer Portal, Webhooks, Subscriptions
- Currently configured in **test mode**; live mode pending (see Current Status)

**Deployment**
- Vercel (auto-deploy from GitHub `main`)
- Production: dispatchops-three.vercel.app
- Firebase project: `dispatchops-prod`
- Firebase CLI: 15.3.0

---

## Architecture

### Auth & Multi-tenancy

- **Owner sign-up flow** sets `trialEndsAt = now + 14 days` on the user profile.
- **Company ID = Owner UID.** The company document ID matches the owner's Firebase Auth UID. Simplifies lookups and avoids extra queries. Don't change this — too much downstream code assumes it.
- **Technicians are stored in two places:** `/users/{uid}` with `role: 'tech'` for auth purposes, AND `/companies/{companyId}/technicians/{techId}` for company-specific data and listing. Both must stay in sync — the Add Technician modal handles this atomically.
- **Secondary Firebase App pattern** — when an owner adds a tech, the app creates a *second* Firebase app instance, calls `createUserWithEmailAndPassword` on it, then immediately deletes the secondary app. This creates the tech's account without logging out the owner. Lives in `src/config/secondaryAuth.js`. **Do not refactor this away** — the obvious "just use the main app" approach kicks the owner out of their session.

### Trial Enforcement

- **TrialGate component** wraps all admin routes except `/billing`.
- Checks `subscription.status` and `trialEndsAt` timestamp on every protected render.
- Expired trials show a blocking modal with a "Choose a Plan" button → routes to `/billing`.
- File: `src/components/TrialGate.jsx`.
- ⚠️ **Existing test users don't have `trialEndsAt`** — only signups after the TrialGate commit have the timestamp. Old users won't be blocked even if they should be. If you ever need a clean test, create a new email.

### Billing & Subscriptions

**Plan tiers** (latest pricing per the most recent handoff):

| Plan | Price/mo | Tech limit | Job limit/mo |
|------|---------|------------|---------------|
| Starter | $149.95 | 10 | 200 |
| Growth | $199.95 | 20 | 400 |
| Professional | $275 | 40 (or unlimited per earlier handoffs) | 800 |

**Note:** Earlier handoffs used different price points and called the top tier "Enterprise." Current tier names are Starter / Growth / Professional, and the prices above are what should appear in the live Stripe products.

**Webhook-driven subscription state:**
- Stripe webhook (`/api/webhook.js`) handles `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
- Updates Firestore `subscriptionStatus` on each event.
- Webhook signature verification requires `STRIPE_WEBHOOK_SECRET` to be set in Vercel.
- Firebase Admin SDK in the webhook needs `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`.

### Dispatch Core

**Kanban board columns** (most recent state, evolved over time):

`Unassigned → Scheduled → En Route → In Progress → Completed`

The "En Route" column was added in a later phase — earlier handoffs show only 4 columns. If you grep the codebase and find references to a 4-column board, that's stale code or comments.

**Job timer:**
- localStorage persistence
- Pause / resume / reset controls
- Auto-starts when a tech taps "Start Job"
- Timer state survives page refresh

**Tech onboarding flow:**
- Owner generates an invite link
- Tech clicks → auto-provisioning creates account + tech profile
- No app store deployment — the tech "app" is just the mobile-optimized `/tech` route

### Real-time Updates

- Sidebar tech-status indicators show "En Route" or "Working" badges with the customer name
- Real-time updates flow through Firestore listeners — no polling

---

## File & Repo Locations

- **GitHub:** https://github.com/CloudInsAgency/dispatchops
- **Production URL:** https://dispatchops-three.vercel.app
- **Tech Portal:** https://dispatchops-three.vercel.app/tech
- **Local Path:** `~/Downloads/web-dashboard`
- **Firebase Console:** https://console.firebase.google.com/project/dispatchops-prod
- **Stripe Dashboard:** https://dashboard.stripe.com (Craig's account)
- **Vercel Dashboard:** https://vercel.com (`dispatchops` project)

**Critical files:**
- `src/contexts/AuthContext.jsx` — auth logic, signup with `trialEndsAt`, profile loading
- `src/components/TrialGate.jsx` — trial enforcement wrapper
- `src/components/billing/BillingPage.jsx` — plan comparison, upgrade modal trigger
- `src/components/subscription/UpgradeModal.jsx` — Stripe checkout initiation
- `src/components/technicians/AddTechnicianModal.jsx` — Firebase Auth + Firestore atomic creation
- `src/config/secondaryAuth.js` — secondary app pattern for tech account creation
- `src/config/stripe.js` — plan definitions, price IDs, helper functions
- `api/create-checkout-session.js` — Vercel serverless function for Stripe checkout
- `api/webhook.js` — Stripe webhook handler
- `firestore.rules`, `storage.rules`, `firebase.json` — Firebase config (deployed)

---

## Identifiers

**Firebase (`dispatchops-prod`)**

Set in Vercel ✓:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

❌ Not set in Vercel (blocking webhook):
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

**Stripe**

❌ Not set in Vercel (test keys exist locally in `.env`):
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_SECRET_KEY`
- `VITE_STRIPE_STARTER_PRICE_ID`
- `VITE_STRIPE_GROWTH_PRICE_ID`
- `VITE_STRIPE_PROFESSIONAL_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`

Local test keys (in `.env`, working):
- `pk_test_51SuiLLFMO5BrsZS9...`
- `sk_test_51SuiLLFMO5BrsZS9...`
- Test price IDs for all three tiers

**Business**
- Cloud Design Studio LLC
- Phone: (201) 500-7615
- Location: West Orange, NJ
- Firebase CLI account: `cfoskey23@gmail.com`

**Demo / Marketing**
- Demo video (YouTube): https://youtu.be/PG-5KhLoakA — embedded on landing page

**Test Accounts**
- `paulpierce@test.com` already exists. Use a fresh email for new signup tests.

---

## Open Issues (prioritized)

1. **Stripe live secret key access blocked** — copying from dashboard returns `mk_1...` instead of `sk_live_...`. Likely needs "Reveal live key" or account verification. **Hard blocker for live billing.**

2. **3 Vercel env vars missing** — `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `STRIPE_WEBHOOK_SECRET`. Without them, the webhook can't authenticate with Firebase Admin or verify Stripe signatures, so subscription state will never update in Firestore after payment. **Hard blocker.**

3. **All `VITE_STRIPE_*` keys not in Vercel** — only in local `.env`. Production frontend can't initialize Stripe.js with live keys until these are set. **Hard blocker.**

4. **Stripe webhook endpoint not created in Stripe dashboard** — needs URL `https://dispatchops-three.vercel.app/api/webhook` and three events subscribed.

5. **No live products in Stripe** — three monthly products + prices need to be created in Live mode.

6. **Existing test users have no `trialEndsAt`** — they bypass the TrialGate. Cosmetic for production but pollutes test data.

7. **Tailwind CDN warning** — `cdn.tailwindcss.com should not be used in production`. Need to compile Tailwind properly.

8. **Bundle size warning** — Vite chunk >500KB. Code splitting opportunity.

---

## Next Steps (in execution order)

1. **Get the Stripe live secret key.** Stripe dashboard → switch to Live mode → Developers → API Keys → "Reveal live key" or create a new standard secret key. May require finishing account verification (tax ID, bank info, business details).

2. **Create the three live products in Stripe** (Live mode):
   - Starter — $149.95/mo recurring
   - Growth — $199.95/mo recurring
   - Professional — $275/mo recurring
   - Copy each `price_xxx` ID for env vars.

3. **Add all Stripe env vars to Vercel:** `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_STRIPE_SECRET_KEY`, and the three price IDs — all live values.

4. **Generate Firebase Admin credentials.** Firebase Console → Project Settings → Service Accounts → Generate New Private Key → Download JSON → Extract `client_email` and `private_key` → add to Vercel as `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY`.

5. **Create the Stripe webhook.** Stripe Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://dispatchops-three.vercel.app/api/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy signing secret → Vercel env var `STRIPE_WEBHOOK_SECRET`.

6. **Test end-to-end** with a real card on a Stripe test account before announcing.

After steps 1-5 land, **the platform is ready to take real money.**

---

## Useful Context (gotchas, patterns, history)

**Auth landmines**
- **Don't refactor the secondary Firebase App pattern.** It looks weird. It's necessary. Removing it kicks the owner out of their session whenever they add a tech. Took non-trivial debugging to land on; well-documented in `src/config/secondaryAuth.js`.
- **Tech accounts live in two places** (`/users/{uid}` and `/companies/{companyId}/technicians/{techId}`). The Add Technician modal writes to both atomically — don't introduce a code path that only writes to one.
- **Company ID = Owner UID** — many lookups depend on this. Don't generate a separate company ID even if it feels cleaner.

**Trial state**
- TrialGate wraps every admin route *except* `/billing` — the explicit reason is that expired-trial users still need to be able to subscribe. If you ever add a new admin route, audit whether it should be inside or outside the TrialGate.
- Trial logic checks both `subscription.status` and `trialEndsAt` — both need to be present for a user to access protected routes.

**Stripe & webhook**
- The webhook is the *only* path that updates `subscriptionStatus` in Firestore. If checkout completes but the webhook fails, the user pays and stays on a free trial — terrible UX. Always verify the webhook is firing in Stripe dashboard logs after a test purchase.
- Webhook signature verification will silently fail if `STRIPE_WEBHOOK_SECRET` is wrong — you'll get a 400 from your own endpoint with no obvious cause.

**Evolution history (for context, not action)**
The dispatch board went through several major phases captured in the archived context files:
- **Early "DispatchOps"** — basic Kanban, no Stripe yet
- **Rebrand to "Cloud Dispatch Ops"** — Stripe in test mode, photo uploads, signatures
- **Three-portal phase** — added a Client Portal idea (later dropped/simplified to Owner + Tech), plan-limit work coded but broken
- **Plan-limits phase** — job-count caps per tier (200/400/800), AppShell navigation
- **En Route + timers phase** — added 5th Kanban column, job timer, tech invite/onboarding
- **Current** — TrialGate, full Stripe integration, landing page, support pages

If you're ever confused by a feature that "used to work differently," the older context files explain the path.

**Don't confuse with sibling projects**
- Cloud Dispatch Ops and CloudBooks both use Stripe — they're separate codebases, separate Stripe accounts, separate Firebase projects. Don't cross-reference price IDs or webhook secrets.
- WigOut is on a different Google account entirely (`wigoutapp` Firebase project) — not relevant here.

**Craig's preferences**
- Concise bullet-point formatting
- Free / low-cost deployment (Vercel + Firebase + Stripe webhooks, all on free or pay-as-you-go tiers)
- Real industry knowledge — Craig actually built this for the workflow he managed at Verizon, so feature decisions tend to come from real operational pain, not theory

---

## Related Projects

- `cloud-design-studio/` — agency umbrella (LLC owns this product)
- `cloud-deals/` — has full Cloud Design Studio LLC corporate context (NJ Entity ID, EIN, D-U-N-S, Apple Developer enrollment)
- (None of the iOS/Android apps share code with this project — different stacks entirely)

---

## Source Context

Six handoff snapshots show the project's evolution. The current one is canonical; the others are useful only when something seems weird or contradictory:

- `context/from-dispatch-mvp-current.md` — **primary, current state** (TrialGate live, Stripe test mode complete, blocked on live billing config)
- `context/from-dispatch-mvp-en-route-phase.md` — added En Route column + job timer + tech invite flow
- `context/from-dispatch-mvp-plan-limits-phase.md` — plan-limit enforcement (job-count caps)
- `context/from-dispatch-mvp-three-portal-phase.md` — three-portal experiment + plan-limit debug logging issues
- `context/from-dispatch-mvp-rebrand-phase.md` — rebrand to "Cloud Dispatch Ops", photo uploads, signatures
- `context/from-dispatch-mvp-early.md` — earliest "DispatchOps" Kanban + 14-day trial concept

**Always pull current facts from `current.md`. Use the older files only for archaeological lookups** ("when did we add the En Route column?", "why does this old comment mention a Client Portal?").

---

## Recent Changes
- 2026-04-26: Migrated Cloud Dispatch Ops project from Claude.ai (6 source snapshots) into Bernie workspace
