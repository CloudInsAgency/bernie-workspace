# Cloud Design Studio Site — Project Context

Marketing website for **Cloud Design Studio LLC** — Craig's web and app
development agency based in West Orange, NJ. Webflow-inspired light theme
showcasing services (mobile, web, UI/UX, SaaS, AI, consulting) and portfolio
projects (PollPulse, WigOut, etc.). Deployed on GitHub Pages as static HTML
with no build system.

> **Note on scope:** This project covers the **marketing site only**.
> Corporate/LLC business context (NJ Entity ID, D-U-N-S, Apple Developer Org
> enrollment, EIN, registered agent) lives in `cloud-deals/CLAUDE.md` because
> that's where it surfaced during the iOS app work. If/when you need that
> context here, reference it from there rather than duplicating.

---

## Current Status

**Live** at `https://[username].github.io/clouddesignstudio/` (GitHub Pages).

Design and content are complete:
- Webflow-style light theme with Inter font
- Blue/purple gradient accents, card-based layout
- Smooth fade-in animations via Intersection Observer
- Three custom WebP service-card images uploaded
- Contact info hardcoded: cfoskey@thecloudins.com, 201-500-7615, West Orange NJ

**Active blocker:** GitHub Pages build is failing because Jekyll is being
incorrectly triggered by the `assets/` folder. Fix is a one-line file:
add an empty `.nojekyll` to the repo root.

---

## Tech Stack

- HTML5 + CSS3 — no framework, all styles inline in a single `<style>` tag
- Google Fonts (Inter)
- CSS transitions + Intersection Observer API for scroll fade-ins
- WebP images for service cards, SVG for logo
- **No dependencies** — no npm, no bundler, no Jekyll
- Hosting: GitHub Pages (static, no build step)

---

## Key Decisions

- **Webflow-inspired light theme** — Craig pivoted from an earlier dark cyberpunk design (`#0A4A6E` + JetBrains Mono) after reviewing webflow.com. The clean professional SaaS aesthetic won.
- **No `assets/` folder** — images live in the repo root to keep paths simple. HTML references files directly (e.g., `src="Mobile_App_Developement.webp"`).
- **Single HTML file** — all CSS and JS inline for zero-dependency simplicity.
- **`.nojekyll` over Jekyll-compatible structure** — instead of restructuring to satisfy Jekyll, just bypass it entirely.
- **Emoji icons** for service cards without custom images — SaaS Development (🚀), AI Integration (🤖), Consulting (⚙️). Cheap, visually consistent.
- **Brand color alignment with Cloud Insurance Agency** (thecloudins.com) — the professional blue choice was deliberate to keep both Craig businesses visually related.

---

## Identifiers

**Business**
- Email: cfoskey@thecloudins.com
- Phone: 201-500-7615
- Location: West Orange, NJ

**GitHub**
- Account: CloudInsAgency (inferred from commit history)
- Repo: `clouddesignstudio`

**No API keys or secrets** — pure static site, no backend.

> Corporate/LLC details (NJ Entity ID, EIN, D-U-N-S, Apple Developer enrollment) live in `cloud-deals/CLAUDE.md`.

---

## Brand & Color System

**Current (live):**
- Primary blue: `#4353FF`
- Purple accent: `#7C3AED`
- Dark text: `#1A1A2E`
- Light backgrounds: `#F9FAFB`, `#FFFFFF`

**Archived (do not use):**
- `#0A4A6E` (old dark blue tech-forward theme)
- JetBrains Mono font (replaced with Inter)

If grep finds the old colors or font, they're leftovers from the abandoned dark theme — clean them up.

---

## File Inventory

**In repo root:**
- `index.html` — complete website
- `cloudDesignLogo1.svg` — logo (vector)
- `Mobile_App_Developement.webp` — service card image *(filename has a typo: "Developement")*
- `Web_Development.webp` — service card image
- `UI_UXDesign.webp` — service card image
- `assets/` — empty folder, can be deleted (and was the cause of the Jekyll issue)

**Stale files still in repo:**
- `index-webflow-style.html` — intermediate version from the redesign
- `cloudDesignLogo1-light.svg` — intermediate logo

**Missing (needs to be created):**
- `.nojekyll` — empty file in repo root to fix the build

---

## Open Issues (prioritized)

1. **Build failing on GitHub Pages.** Jekyll error triggered by the `assets/` folder. Fix is trivial: add an empty `.nojekyll` file to repo root, commit. **This is the single highest-priority item — the live site is currently broken.**

2. **Filename typo: `Mobile_App_Developement.webp`.** "Developement" is misspelled. Works fine because the HTML matches, but worth correcting both file and reference for consistency.

3. **Empty `assets/` folder** — unused, was the root cause of the Jekyll issue. Can be deleted after `.nojekyll` ships.

4. **Placeholder "Trusted by" logos** — TechCorp, StartupX, FinanceHub, etc. are fake. Either swap in real client logos or delete the section.

5. **Portfolio section uses emoji placeholders** (📊, 💇, 🏠, 📈) — should be real screenshots of PollPulse, WigOut, and client sites.

6. **Stale design files in repo** — `index-webflow-style.html` and `cloudDesignLogo1-light.svg` are leftovers from the dark→light transition. Delete after confirming nothing references them.

7. **No mobile nav menu** — responsive design currently hides nav links on mobile and shows only the "Get in Touch" CTA. Hamburger menu is a follow-up improvement.

---

## Next Steps (in priority order)

1. **Add `.nojekyll` to repo root** to unblock the GitHub Pages build.
2. **Verify the site is live and rendering correctly** — check GitHub Actions for a green build, then visit the live URL and walk through the page.
3. **Replace portfolio emoji placeholders** with actual screenshots of PollPulse, WigOut, CloudPriceDeals, Cloud Insurance, Chris Burns Realtor.
4. **Resolve the "Trusted by" section** — real logos or delete entirely. Fake logos are worse than nothing.
5. **Cleanup pass** — delete the empty `assets/` folder, fix the "Developement" filename typo, remove the stale `index-webflow-style.html` and `cloudDesignLogo1-light.svg`.

---

## Useful Context (gotchas)

- **GitHub Pages is case-sensitive** (Linux underneath). Filename references in HTML must exactly match repo filenames. Be strict about capitalization.
- **The "Developement" typo is a known landmine** — if you fix it in the filename without updating the HTML reference, the image breaks. Update both atomically.
- **Cross-business brand continuity** — the blue palette deliberately echoes Cloud Insurance Agency (thecloudins.com). Don't swap colors without considering both sites.
- **Phone number is `201-500-7615`** for *this* site — different from Cloud Insurance Agency's `(973) 449-3671` and Chris Burns Realtor's `(973) 953-5573`. Don't cross-contaminate.
- **Email is `cfoskey@thecloudins.com`** — same address as Cloud Insurance, intentional (single inbox for all Craig agency contact).
- **No build step means no surprises** — but also no preprocessing. CSS variables and modern features that need polyfills won't be polyfilled.

---

## Related Projects

- `cloud-deals/` — has the LLC corporate setup details (Entity ID, D-U-N-S, Apple Developer enrollment) since they came up during iOS app submission
- `cloud-insurance/` — sibling site (thecloudins.com), brand-related
- `poll-pulse/`, `wigout/` — featured in the portfolio section

---

## Source Context

- `context/from-cloud-design-studio-1.md` — original handoff document

---

## Recent Changes
- 2026-04-26: Migrated Cloud Design Studio Site project from Claude.ai into Bernie workspace
