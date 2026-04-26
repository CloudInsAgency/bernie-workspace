# Cloud Dispatch Ops — Handoff

## Purpose

Cloud Dispatch Ops is a SaaS field service dispatch platform for HVAC/plumbing companies. It provides a three-portal system (Dispatcher Portal, Technician Portal, Client Portal) with drag-and-drop job management, real-time updates via Firebase, and subscription-based plan limits. The platform is built with React/Vite/Firebase and deployed on Vercel, with Stripe integration for subscription management and plan enforcement.

## Current Status

**Deployed**: Production app is live at `https://dispatchops-three.vercel.app` with full authentication, dispatch board, and technician management working.

**In Progress**: Subscription plan limit enforcement. The upgrade modal system is fully coded but not triggering when users exceed their plan limits (Starter: 10 techs, Growth: 20 techs, Professional: unlimited).

**Blocked**: Debug logging never appears in console (even locally), making it impossible to diagnose why the upgrade modal doesn't trigger. The `/technicians` route redirects to `/` instead of showing the Technicians page. Unclear which component is actually handling the "+ Add Technician" button in production.

**Critical Issue**: User has 24 technicians (way over the 10-tech Starter plan limit) but can continue adding more without any upgrade prompt.

## Tech Stack

- **Frontend**: React 18 + Vite 7.3.1, React Router, Tailwind CSS

- **Backend**: Firebase (Firestore, Auth, Storage)

- **Payments**: Stripe (test keys configured)

- **Deployment**: Vercel (auto-deploy from GitHub)

- **State Management**: React Context API (AuthContext)

- **Icons**: react-icons (Feather Icons)

- **Notifications**: react-hot-toast

- **Drag & Drop**: @hello-pangea/dnd

## Key Decisions

- **Subscription field in Firestore**: Decided to add subscription data directly to user documents rather than a separate collection to simplify queries and reduce reads

- **Plan limits enforced client-side**: Using `usePlanLimits` hook to check Firestore tech count against plan limits before allowing actions (will need server-side enforcement later)

- **Stripe integration without backend**: Using Stripe Checkout with client-side redirect flow (no server webhooks yet, relying on client completion)

- **Three-tier pricing**: Starter ($149.95/mo, 10 techs, 100 jobs), Growth ($199.95/mo, 20 techs, unlimited jobs), Professional ($275/mo, unlimited)

- **Trial period**: 14-day free trial with no credit card required, subscription field provisioned immediately on signup

- **Firestore security rules**: Fixed to validate `companyId` matches user's company (not user's ID) when creating technicians

## File & Repo Locations

- **GitHub**: `https://github.com/CloudInsAgency/dispatchops` (branch: main)

- **Production**: `https://dispatchops-three.vercel.app`

- **Local Dev**: `~/Downloads/web-dashboard`

- **Firebase Project**: `dispatchops-prod` (Firebase Console)

- **Vercel Project**: `dispatchops` under craig-foskeys-projects (Hobby tier)

- **Key Files**:

  - Subscription hook: `src/hooks/usePlanLimits.js`

  - Upgrade modal: `src/components/subscription/UpgradeModal.jsx`

  - Technicians page: `src/components/dispatch/TechniciansPage.jsx`

  - Plan config: `src/config/stripe.js`

  - Auth signup: `src/components/auth/SignupPage.jsx`

  - Firestore rules: `firebase/firestore.rules`

## Credentials & IDs

- **Firebase Project ID**: `dispatchops-prod`

- **Apple Developer**: Cloud Design Studio LLC (Enrollment ID: NQQ3FH3U2J) - pending organization verification

- **EIN**: (for Cloud Design Studio LLC)

- **NJ Entity ID**: 0451424777

- **Test User**: craigfoskey@yahoo.com (primary account, has 24 technicians)

- **Environment Variables** (all set in Vercel Settings):

  - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, etc.

  - `VITE_STRIPE_PUBLISHABLE_KEY` (pk_test_51SuiLLFMO5BrsZS9Kvva...)

  - `VITE_STRIPE_SECRET_KEY` (sk_test_51SuiLLFMO5BrsZS9wwv...)

  - `VITE_STRIPE_STARTER_PRICE_ID` (price_1Suu6GFMO5BrsZS9v3EA6yXe)

  - `VITE_STRIPE_GROWTH_PRICE_ID` (price_1Suu9BFMO5BrsZS9lwGp736l)

  - `VITE_STRIPE_PROFESSIONAL_PRICE_ID` (price_1SuuARFMO5BrsZS9qJ2Lwo6b)

## Open Issues

1. **Upgrade modal never triggers**: Despite having 24 techs (way over 10 limit), the upgrade modal doesn't appear when clicking "+ Add Technician"

2. **Debug logs missing**: Added extensive `console.log` statements with 🚀 emoji to `handleAddTech` function but they never appear in console (even running locally)

3. **Routing broken**: Navigating to `http://localhost:5173/technicians` redirects to `/` - unclear where Technicians page is actually accessed

4. **Vercel deployment inconsistency**: Multiple commits pushed but Vercel kept deploying old code without debug logging. Latest deployed commit is `debe156` which has routing fix but not the debug code from earlier commits

5. **vercel.json drama**: Had to remove and re-add `vercel.json` multiple times. Original version referenced Vercel Secrets (`@stripe-publishable-key`) that didn't exist, causing deployment failures. Now using simple `rewrites` config

6. **Dashboard metrics incorrect**: "Active Technicians" card shows total count (24) instead of filtering by "Available" status

7. **Tech count mismatch**: UI shows different tech counts in different places - dashboard metrics vs. technician list vs. Firestore query

8. **`handleAddTech` not executing**: Even locally, the function doesn't seem to be called when clicking "+ Add" button (no logs appear)

## Next Steps

1. **Find the actual route to Technicians page**: Grep for routes, check App.jsx routing config, determine correct URL path to access technician management UI

2. **Verify button onClick binding**: Check that the "+ Add" button in TechniciansPage.jsx is actually wired to `handleAddTech` function

3. **Confirm usePlanLimits hook execution**: Add debug logs to the hook's useEffect to verify it's running and returning correct values

4. **Test with exactly 10 techs**: Delete technicians in Firestore down to exactly 10, then try adding 11th to trigger modal (currently have 24, so limit check always fails)

5. **Fix Vercel auto-deploy**: Ensure GitHub webhooks are working and new commits actually deploy (may need to reconnect GitHub integration)

6. **Add server-side plan enforcement**: Client-side checks can be bypassed - need Firebase Functions or Firestore rules to enforce limits

## Useful Context

- **Owner preference**: Detail-oriented, prefers bullet-point formatting, systematic approach to tracking progress

- **Working style**: Multiple simultaneous ventures (SaaS, mobile apps, client sites), preference for free/low-cost deployment (Vercel free tier, Firebase free tier)

- **Recent session duration**: 5+ hours of debugging deployment issues and trying to get debug logs to appear

- **Quirk**: The subscription field in Firestore had to be manually added to existing user (`LMVnTWatcFclPwswUzhpGqhP8Hf1`) via Firebase Console because early signups didn't auto-provision it

- **Related projects**: Also working on CloudPriceDeals (affiliate site), CloudBooks (accounting SaaS), WigOut (AI hairstyle app), PollPulse (polling app)

- **Common pattern**: Builds full-featured apps then struggles with deployment/environment configuration rather than core functionality

- **Tech debt**: Using Tailwind CDN in production (should be PostCSS plugin), no server-side validation, client-side plan enforcement only

- **Gotcha**: When running locally with `npm run dev`, the `.env` file has all credentials but they need to match what's in Vercel Settings for production

- **Firestore structure**: Users collection with `companyId` field linking to company, technicians have `role: 'tech'` and `companyId` to filter by company

- **Authentication flow**: Firebase Auth → Check user document → Redirect based on role (dispatcher/tech/client)

Folder 4 Handoff…

