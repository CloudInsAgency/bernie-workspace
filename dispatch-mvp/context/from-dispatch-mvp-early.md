# DispatchOps — Handoff

## Purpose

DispatchOps is a SaaS field service dispatch management platform designed for HVAC, plumbing, and similar service companies. It provides a multi-tenant web dashboard for managers to create, assign, and track jobs using a drag-and-drop Kanban board, plus a mobile-optimized technician portal where field workers can view their assigned jobs and update statuses in real-time. The project was built to solve the pain points of dispatch managers who previously relied on spreadsheets and phone calls.

## Current Status

**Deployed and functional.** The main dashboard and technician portal are live at https://dispatchops-three.vercel.app. Core features are complete:

- User authentication with Firebase Auth

- Multi-tenant company structure with 14-day free trial

- Job management with drag-and-drop Kanban board

- Technician management (add/edit/delete)

- Search and advanced filtering

- Real-time stats dashboard

- Detailed activity logging with change tracking

- Toast notifications

- Mobile-optimized technician portal at `/tech`

- Technicians can view jobs and update status (Start Job → Mark Complete)

**Last deployment:** Tech portal with job list and status updates was just committed and pushed. Vercel auto-deploys from GitHub main branch.

## Tech Stack

- **Frontend:** React 18 + Vite, React Router DOM v6

- **Styling:** Tailwind CSS (via CDN for now)

- **State Management:** React Context API (AuthContext)

- **Database:** Firebase Firestore (real-time sync)

- **Authentication:** Firebase Auth (email/password)

- **Drag & Drop:** @dnd-kit/core, @dnd-kit/sortable

- **Icons:** react-icons (Feather icons - Fi prefix)

- **Notifications:** react-hot-toast

- **Deployment:** Vercel (auto-deploy from GitHub)

- **Version Control:** GitHub

## Key Decisions

- **Tailwind via CDN** instead of PostCSS build — avoided npm installation issues; works fine but shows console warning in production. Can be properly installed later.

- **Multi-tenant architecture** — Each company has its own subcollections (`/companies/{companyId}/jobs`, `/companies/{companyId}/technicians`). Users are linked to companies via `companyId` field.

- **Technician portal as web app** instead of native iOS/Android — Works on any device, no app store approval needed, instant updates.

- **Technicians query by name match** — Jobs are filtered by `assignedToName` field matching the logged-in user's `fullName`. This means managers can also test the tech portal by logging in and viewing jobs assigned to their name.

- **Activity log stored as array in job document** — Each job has an `activityLog` array with entries tracking all changes (status, assignment, notes, etc.). Uses Firestore `arrayUnion()` for atomic updates.

- **Firebase security rules use helper functions** — `isSignedIn()`, `belongsToCompany()`, `isCompanyOwner()` for cleaner, reusable rule logic.

## File & Repo Locations

- **GitHub Repo:** https://github.com/CloudInsAgency/dispatchops

- **Production URL:** https://dispatchops-three.vercel.app

- **Tech Portal URL:** https://dispatchops-three.vercel.app/tech

- **Vercel Dashboard:** https://vercel.com/craig-foskeys-projects/dispatchops

- **Firebase Console:** https://console.firebase.google.com (project: dispatchops-prod)

- **Local Development Path:** `~/Downloads/web-dashboard/`

### Key Files

- `/src/App.jsx` — Main router with all routes

- `/src/main.jsx` — Entry point with BrowserRouter and Toaster

- `/src/contexts/AuthContext.jsx` — Authentication state and user profile

- `/src/config/firebase.js` — Firebase configuration

- `/src/components/dashboard/Dashboard.jsx` — Main manager dashboard

- `/src/components/jobs/JobBoard.jsx` — Kanban board with drag-and-drop

- `/src/components/jobs/JobFilters.jsx` — Search and filter component

- `/src/components/jobs/CreateJobModal.jsx` — Job creation form

- `/src/components/jobs/JobDetailsModal.jsx` — Job details with edit/delete

- `/src/components/jobs/JobActivityLog.jsx` — Activity log display

- `/src/components/dashboard/StatsCards.jsx` — Real-time stats dashboard

- `/src/components/tech/TechLogin.jsx` — Technician login page

- `/src/components/tech/TechDashboard.jsx` — Technician job list and status updates

- `/src/components/technicians/TechnicianSidebar.jsx` — Technician list sidebar

- `/src/components/technicians/AddTechnicianModal.jsx` — Add technician form

- `/src/components/onboarding/OnboardingFlow.jsx` — New user onboarding

## Credentials & IDs

**Environment Variables (stored in Vercel and local `.env`):**

- `VITE_FIREBASE_API_KEY`

- `VITE_FIREBASE_AUTH_DOMAIN` — dispatchops-prod.firebaseapp.com

- `VITE_FIREBASE_PROJECT_ID` — dispatchops-prod

- `VITE_FIREBASE_STORAGE_BUCKET` — dispatchops-prod.firebasestorage.app

- `VITE_FIREBASE_MESSAGING_SENDER_ID`

- `VITE_FIREBASE_APP_ID`

- `VITE_FIREBASE_MEASUREMENT_ID`

- `VITE_STRIPE_PUBLISHABLE_KEY` — (empty, Stripe not yet implemented)

- `VITE_ENV` — development

**Firebase Project:** dispatchops-prod (region: us-east1)

**GitHub Token:** Personal access token used for pushing (stored in macOS keychain)

**Note:** Actual secret values are NOT in the repo. The `.env` file is gitignored. Environment variables are configured in Vercel dashboard.

## Open Issues

- **Tailwind CDN warning** — Console shows "cdn.tailwindcss.com should not be used in production". Should install Tailwind properly via PostCSS, but npm had issues during initial attempt.

- **Technicians don't have separate Firebase Auth accounts** — Currently, technicians are stored in Firestore only. To login to tech portal, users must have a Firebase Auth account. Workaround: managers can login and see jobs assigned to their name.

- **Firestore composite index required** — The tech dashboard query (`where('assignedToName') + orderBy('scheduledDateTime')`) requires a composite index. Index was created manually; may need to export index config for easier setup.

- **No password reset flow** — Login errors show generic "Invalid email or password" but no forgot password option.

- **Active Technicians stat shows 0** — The StatsCards component reads `technicianCount` from company doc but this may not be updating when technicians are added.

## Next Steps

1. **Add Stripe payments** — Implement subscription management, trial-to-paid conversion, billing portal. Stripe publishable key env var already exists but is empty.

2. **Proper Tailwind installation** — Install via PostCSS to eliminate CDN warning and enable production optimization.

3. **Technician authentication system** — When adding a technician, optionally create a Firebase Auth account and send them login credentials via email.

4. **Password reset flow** — Add "Forgot Password?" link to login pages using Firebase Auth's `sendPasswordResetEmail()`.

5. **Custom domain** — Set up dispatchops.com or similar domain in Vercel.

## Useful Context

- **Owner:** Craig Foskey (Cloud Design Studio LLC)

- **GitHub Username:** CloudInsAgency

- **Company in test account:** "Bpt Homeys" (Starter Plan, 14-day trial)

- **Dev server command:** `npm run dev` (runs on localhost:5173)

- **The hamburger menu (☰)** toggles the technician sidebar visibility, not a dropdown menu — this is intentional.

- **Jobs have color-coded priority borders:** red (high), yellow (medium), green (low)

- **Activity log tracks all changes** including old/new values for status, notes, assignments, scheduled times, etc.

- **Toast notifications** replaced all `alert()` calls for better UX

- **The tech dashboard shows jobs assigned to the logged-in user's `fullName`** — so to test, create a job assigned to a technician with the same name as your user account.

- **Firestore rules are already published** — they allow authenticated users to read/write their own company's data.

- **Vercel auto-deploys** on every push to main branch — no manual deployment needed.

Folder 2 Hand off

