# Cloud Dispatch Ops — Handoff

## Purpose

Cloud Dispatch Ops is a SaaS field service dispatch platform for HVAC/plumbing companies. It provides an admin dashboard for dispatchers to manage jobs via a Kanban board, a technician portal for field workers to view assigned jobs, update status, upload photos, capture signatures, and add notes. The platform uses a tiered subscription model (Starter/Growth/Professional) with per-plan limits on technicians and monthly jobs.

## Current Status

**Deployed and working:**

- Admin dashboard with Kanban board (Unassigned → Scheduled → In Progress → Completed)

- Job creation with technician assignment

- Technician management (add/edit techs in subcollection)

- Plan limit enforcement (200/400/800 jobs per month by tier)

- AppShell navigation with sidebar (Dispatch Board, Technicians, Settings, Billing)

- Tech login portal at `/tech` route

- Tech dashboard shows "Tech 1" name in header correctly

**Blocked — Active Bug:**

Tech dashboard shows "No active jobs" even though jobs are assigned to "Tech 1" in the admin dashboard. Root cause identified but not yet fixed:

1. The Firestore query runs successfully (no permission errors now)

2. `DEBUG snapshot size: 0` indicates the query returns no documents

3. Jobs exist in `companies/CAllEfit5UPyUZs1jGFBj51YgO23/jobs` with `assignedToName: "Tech 1"`

4. **Suspected issue:** The `companyId` variable resolution in TechDashboard.jsx may not be passing correctly to the `onSnapshot` callback, or there's a closure issue where the callback still uses an undefined value

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router DOM

- **Backend:** Firebase (Auth, Firestore, Storage)

- **Payments:** Stripe (subscription billing, not fully integrated yet)

- **Deployment:** Vercel (auto-deploy from GitHub main branch)

- **Icons:** react-icons (Fi* icons from Feather)

- **Notifications:** react-hot-toast

## Key Decisions

- **Jobs stored in subcollection:** `companies/{companyId}/jobs` rather than top-level, enabling company-scoped security rules

- **Technicians dual storage:** Both in `companies/{companyId}/technicians` (for admin listing) and `users/{uid}` (for auth/login). The technician doc ID in the subcollection is NOT the same as the Firebase Auth UID — this was a source of bugs

- **Client-side job filtering for techs:** Changed from Firestore `where()` query to fetching all company jobs and filtering in JS, to avoid needing a composite index on `assignedToName` + `scheduledDateTime`

- **Plan limits enforced client-side:** `usePlanLimits` hook queries job count with `createdAt >= firstOfMonth` and blocks job creation in UI when limit reached

- **Field naming convention:** Use `companyId` (camelCase with lowercase 'd') consistently — a `companyID` (capital D) variant caused bugs

## File & Repo Locations

- **GitHub:** https://github.com/CloudInsAgency/dispatchops

- **Production URL:** https://dispatchops-three.vercel.app

- **Tech Portal:** https://dispatchops-three.vercel.app/tech

- **Local path:** `~/Downloads/web-dashboard`

- **Firebase Console:** Project `dispatchops-prod`

- **Vercel Dashboard:** dispatchops-three project

## Credentials & IDs

- **Firebase Project ID:** `dispatchops-prod`

- **Company ID (test):** `CAllEfit5UPyUZs1jGFBj51YgO23`

- **Admin User UID:** `CAllEfit5UPyUZs1jGFBj51YgO23` (Bernie Williams, bernie51bpt@gmail.com)

- **Tech User UID:** `rR7VAUuUiPO27cAZlucDykvs6Rl1` (Tech 1, tech1@test.com, password: Test1234!)

- **Environment variables in `.env`:** `VITE_FIREBASE_*`, `VITE_STRIPE_*` keys

- **Stripe:** Test mode, price IDs in `src/config/stripe.js`

## Open Issues

### Critical Bug: Tech Dashboard Not Showing Jobs

- Jobs assigned to "Tech 1" in admin Kanban don't appear in tech dashboard

- Firestore query returns 0 documents despite jobs existing

- Debug logs show `companyId` is correct in userProfile but snapshot returns empty

- **Likely cause:** Closure issue in useEffect where `companyId` variable isn't available inside onSnapshot callback, or the fallback `companyId || companyID` resolution isn't being used in the collection path

### Technical Debt

- Debug `console.log` statements still in TechDashboard.jsx — need to remove after fix

- `companyId` vs `companyID` inconsistency in some Firestore docs — should normalize all to lowercase 'd'

- Tailwind CDN warning in console — should install via PostCSS for production

- No composite Firestore indexes created — relying on client-side filtering instead

### Minor Issues

- Tech dashboard logo path may be wrong (`/logo.png`)

- Company name fetch in tech dashboard could fail silently

## Next Steps

1. **Fix TechDashboard job query** — The `companyId` variable defined before the guard clause needs to be used inside the `onSnapshot` callback. Check if it's a closure/scope issue. The line `const jobsRef = collection(db, 'companies', companyId, 'jobs')` should use the resolved `companyId` variable, not `userProfile.companyId`.

2. **Add debug logging inside onSnapshot** — Add `console.log("Querying path:", 'companies/' + companyId + '/jobs')` right before the collection() call to verify the exact path being queried.

3. **Remove debug console.logs** — After fixing, clean up all the DEBUG statements added during troubleshooting.

4. **Normalize companyId field naming** — Update any Firestore docs using `companyID` (capital D) to use `companyId` (lowercase d) for consistency.

5. **End-to-end test workflow** — Create job in admin → assign to Tech 1 → verify appears in tech dashboard → tech updates status → verify reflects in admin Kanban.

## Useful Context

### Firestore Structure

Folder 5 Handoff…

