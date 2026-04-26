# Cloud Design Studio Website — Handoff

## Purpose

Cloud Design Studio, LLC is Craig's web and app development agency based in West Orange, NJ. This project is the company's marketing website — a clean, modern, Webflow-inspired design showcasing services (mobile app development, web development, UI/UX design, SaaS development, AI integration, and consulting), portfolio projects (PollPulse, WigOutApp, etc.), tech stack, and contact information. The site is deployed on GitHub Pages as a simple static HTML site with no build system.

## Current Status

- **Deployed:** The site is live on GitHub Pages at `https://[username].github.io/clouddesignstudio/`
- **In Progress:** A `.nojekyll` file needs to be added to fix the GitHub Pages build error (Jekyll was incorrectly triggered by the `assets` folder)
- **Design Complete:** Webflow-style light theme with Inter font, blue/purple gradient accents, card-based layout, and smooth fade-in animations
- **Images Integrated:** Three custom service images (Mobile App Development, Web Development, UI/UX Design) are uploaded to the repo root
- **Contact Info Configured:** Email (cfoskey@thecloudins.com), Phone (201-500-7615), Location (West Orange, NJ)

## Tech Stack

- **Frontend:** Plain HTML5, CSS3 (no framework, all styles inline in `<style>` tag)
- **Typography:** Google Fonts (Inter)
- **Animations:** CSS transitions + Intersection Observer API for scroll-triggered fade-ins
- **Deployment:** GitHub Pages (static hosting, no build step required)
- **Assets:** WebP images for service cards, SVG for logo
- **No dependencies:** No npm, no bundler, no Jekyll — pure static HTML

## Key Decisions

- **Webflow-inspired design over original dark theme:** Craig preferred the clean, light, professional SaaS aesthetic of Webflow.com over the initial dark blue cyberpunk design
- **No assets folder:** Images placed in repo root to avoid path complexity; code references files directly (e.g., `src="Mobile_App_Developement.webp"`)
- **Single HTML file:** All CSS and JS inline for simplicity — no external stylesheets or scripts to manage
- **`.nojekyll` approach:** GitHub Pages was trying to process with Jekyll unnecessarily; adding this file bypasses Jekyll entirely
- **Emoji icons for non-image service cards:** SaaS Development, AI Integration, and Consulting cards use emoji icons (🚀, 🤖, ⚙️) since no custom images were provided

## File & Repo Locations

- **GitHub Repo:** `clouddesignstudio` (public repository)
- **Live Site:** `https://[username].github.io/clouddesignstudio/`
- **Main Files in Repo Root:**
  - `index.html` — Complete website
  - `cloudDesignLogo1.svg` — Logo (SVG vector)
  - `Mobile_App_Developement.webp` — Service card image (note: typo in filename "Developement")
  - `Web_Development.webp` — Service card image
  - `UI_UXDesign.webp` — Service card image
  - `assets/` — Empty folder (can be deleted)
  - `.nojekyll` — Needs to be created to fix build

## Credentials & IDs

- **GitHub Account:** CloudInsAgency (based on screenshot commit history)
- **No API keys or secrets required** — This is a static HTML site with no backend
- **Contact Email:** cfoskey@thecloudins.com (hardcoded in HTML)
- **Phone:** 201-500-7615 (hardcoded in HTML)

## Open Issues

1. **Build failing on GitHub Pages:** Jekyll build error due to `assets` folder — fix by adding empty `.nojekyll` file to repo root
2. **Filename typo:** `Mobile_App_Developement.webp` has "Developement" misspelled — works fine but may want to correct for consistency
3. **Empty `assets` folder:** Exists in repo but unused — can be deleted to clean up
4. **Placeholder trusted logos:** "TechCorp", "StartupX", "FinanceHub", etc. are placeholder text — replace with real client logos or remove section
5. **Portfolio section uses emoji placeholders:** Real project screenshots should replace the emoji icons (📊, 💇, 🏠, 📈) in portfolio cards

## Next Steps

1. **Add `.nojekyll` file:** Create empty file named `.nojekyll` in repo root → Add file → Create new file → name it `.nojekyll` → leave empty → commit
2. **Verify deployment:** After `.nojekyll` is added, wait 1-2 minutes, check GitHub Actions for green build, then visit live URL
3. **Add real portfolio images:** Replace emoji placeholders in portfolio section with actual screenshots of PollPulse, WigOutApp, client sites
4. **Update or remove "Trusted by" section:** Either add real client logos or delete the placeholder section entirely
5. **Optional cleanup:** Delete empty `assets` folder, fix "Developement" typo in filename

## Useful Context

- **Design evolution:** Started as dark blue (#0A4A6E) tech-forward design with JetBrains Mono font, then pivoted to light Webflow-style after Craig reviewed webflow.com
- **Brand colors (current):** Primary blue (#4353FF), purple accent (#7C3AED), dark text (#1A1A2E), light backgrounds (#F9FAFB, #FFFFFF)
- **Original dark theme files still exist:** `index-webflow-style.html` and `cloudDesignLogo1-light.svg` were intermediate versions
- **Related business:** Cloud Insurance Agency (thecloudins.com) — Craig wanted some brand consistency between the two businesses, which influenced the professional blue color choice
- **Craig's preferences:** Prefers concise bullet-point formatting, systematic approach, free/low-cost deployment (GitHub Pages, Vercel, Firebase free tiers)
- **Image paths are case-sensitive:** GitHub Pages on Linux is case-sensitive — filenames in HTML must exactly match repo filenames
- **No mobile nav menu:** Current responsive design hides nav links on mobile and only shows "Get in Touch" CTA button — may want to add hamburger menu later
