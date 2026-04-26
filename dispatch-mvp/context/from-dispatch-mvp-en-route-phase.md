# Cloud Dispatch Ops — Handoff

## Purpose

Cloud Dispatch Ops is a SaaS field service dispatch platform for HVAC, plumbing, and similar service companies. It enables business owners to manage technicians, create and assign jobs via a Kanban-style dispatch board, and allows field technicians to update job status, capture photos, collect signatures, and track time on jobs through a mobile-friendly tech portal. The platform includes subscription tiers (Starter/Professional/Enterprise) with Stripe billing integration.

## Current Status

**Deployed and working:**

- Owner/dispatch dashboard with 5-column Kanban board (Unassigned → Scheduled → En Route → In Progress → Completed)

- Tech portal with full job workflow: En Route → Start Job (auto-starts timer) → Mark Complete

- Job timer with localStorage persistence, pause/resume/reset controls

- Photo uploads (fixed for desktop compatibility), signature capture, technician notes

- Real-time tech status indicators on sidebar cards (shows "En Route" or "Working" badges with customer name)

- Tech onboarding flow with invite links and auto-provisioning

- Subscription/billing with Stripe integration and plan limits

**Just completed (this session):**

- Added En Route status step to tech workflow

- Added job timer that auto-starts on "Start Job"

- Added En Route column to owner dispatch board

- Added real-time tech status badges on sidebar tech cards

- Fixed photo upload button not working on desktop (removed `capture="environment"` attribute)

**Not yet implemented from ranked priorities:**

- Job duration display on completed jobs in owner view

- Job detail modal improvements (show photos, signature, tech notes submitted by tech)

- Nav layout fixes (sidebar vs top nav consistency)

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router

- **Backend/Database:** Firebase (Firestore, Auth, Storage)

- **Payments:** Stripe (subscriptions, customer portal)

- **Deployment:** Vercel (auto-deploys from GitHub main branch)

- **Icons:** react-icons (Feather icons - Fi prefix)

- **Drag & Drop:** @dnd-kit for Kanban board

- **State:** React hooks, Firebase onSnapshot for real-time updates

## Key Decisions

- **Firestore structure:** `companies/{companyId}/jobs`, `companies/{companyId}/technicians`, `techInvites/{inviteCode}` for tech onboarding

- **Tech auth flow:** Invite link → tech creates Firebase Auth account → auto-provisioned into company's technicians subcollection

- **Job status enum:** `unassigned` → `scheduled` → `en_route` → `in_progress` → `completed`

- **Timer persistence:** localStorage (`jobTimers` key) to survive page refreshes; duration saved to Firestore `jobDuration` field on completion

- **Real-time updates:** Using Firestore `onSnapshot` listeners throughout for live data sync between dispatch and tech views

- **Photo uploads:** Removed `capture="environment"` for desktop compatibility; works on both desktop file picker and mobile camera

- **Plan limits:** Enforced via `usePlanLimits` hook checking technician count against plan tier

## File & Repo Locations

- **GitHub:** `https://github.com/CloudInsAgency/dispatchops.git`

- **Production URL:** `https://dispatchops-three.vercel.app`

- **Tech Portal:** `https://dispatchops-three.vercel.app/tech/dashboard`

- **Vercel Dashboard:** `vercel.com/craig-foskeys-projects` → dispatchops project

- **Firebase Console:** Project `dispatchops-prod`

- **Local path:** `~/web-dashboard` (on Craig's MacBook Air)

**Key source files:**

- `src/components/tech/TechDashboard.jsx` — Tech portal with timer, status flow, photo/signature

- `src/components/jobs/JobBoard.jsx` — Owner Kanban board with 5 columns

- `src/components/technicians/TechnicianSidebar.jsx` — Tech list with real-time status badges

- `src/components/dispatch/DispatchDashboard.jsx` — Owner dashboard wrapper

- `src/contexts/AuthContext.jsx` — Firebase auth context

## Credentials & IDs

- **Firebase project:** `dispatchops-prod`

- **Stripe:** Keys in environment variables (Vercel env vars)

- **Test tech account:** `tech1@test.com` (used for testing tech portal)

- **Test owner account:** Bernie Williams / Bernie HVAC company

- **Environment variables needed:** `VITE_FIREBASE_*` (apiKey, authDomain, projectId, etc.), `VITE_STRIPE_*`

## Open Issues

- **Vercel webhook delays:** During this session, Vercel had intermittent issues picking up GitHub pushes. Workaround: `git commit --allow-empty -m "Force deploy" && git push` or use `npx vercel --prod`

- **Terminal backtick escaping:** sed commands with backticks are unreliable in zsh; use Python scripts for string replacements involving template literals

- **Tech name matching:** Real-time status lookup uses `assignedToName` field — ensure jobs have this populated (not just `assignedTo` ID)

- **Timer badge on job cards:** Implemented but may need styling refinement for mobile

## Next Steps

1. **Job duration display:** Show "Time on Job: X:XX" for completed jobs in owner's job detail modal (data already saved as `jobDuration` in Firestore)

2. **Job detail modal improvements:** When owner clicks completed job, show the photos uploaded, signature captured, and tech notes submitted

3. **Pull-to-refresh on tech dashboard:** Code is implemented but needs mobile testing

4. **Nav layout cleanup:** Reconcile sidebar nav (Dispatch Board/Technicians/Settings/Billing) with top nav bar for consistent UX

5. **Mobile testing:** Full end-to-end test of tech workflow on actual mobile device (iPhone/Android)

## Useful Context

- **Craig's preferences:** Concise bullet points, systematic approach, prefers free/low-cost deployment (Vercel free tier, Firebase free tier)

- **Testing pattern:** Use incognito window for tech portal to avoid auth conflicts with owner session

- **Company in test data:** "Bernie HVAC" with multiple test technicians (Tech 1 through Tech 9)

- **Completed job validation:** Requires 1+ photo, signature, and tech notes before allowing completion

- **Activity log:** Jobs track status changes with timestamps and user names in `activityLog` array

- **Firestore timestamps:** Jobs store `enRouteAt`, `startedAt`, `completedAt`, `jobDuration` for tracking

- **Related projects by Craig:** CloudBooks (accounting SaaS), CloudPriceDeals (affiliate site), PollPulse (polling app), WigOut (AI hairstyle app)

Folder 6 Handoff….

