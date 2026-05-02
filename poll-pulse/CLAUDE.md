# PollPulse — Project Context

**PollPulse** is a daily opinion polling iOS app that auto-generates polls
from trending news across 8 categories (Politics, Sports, Business, Tech,
Health, Entertainment, World, Money). A Python + Gemini AI scraper runs daily
via GitHub Actions at 6am EST and pushes 10-15 fresh polls to Firestore.
Users vote anonymously, see real-time results, and share to social media.
Solo project under Cloud Design Studio LLC, monetized via AdMob banner ads.

---

## Current Status

**Health:** 🟢 LIVE

**🟢 LIVE in App Store** — v1.0.4, approved and downloadable.

- App Store ID: `id6757474796`
- App Store URL: https://apps.apple.com/us/app/pollpulse/id6757474796
- Backend scraper: running daily via GitHub Actions (6am EST / 11:00 UTC)
- AdMob: integrated and serving (production ad unit deployed, ~$0.02 earned so far — low fill rate is normal for a brand-new app, expected to improve over 2-4 weeks)

**Marketing launch in progress** — TikTok up, the rest still to do:

| Channel | Status |
|---------|--------|
| TikTok `@pollpulse101` | ✅ First video live |
| YouTube | ⏳ Channel setup in progress |
| Instagram | ❌ Not yet set up |
| Reddit | ⚠️ Stuck on karma issue (see below) |

**Reddit blocker:** Craig's Reddit account is new and low-karma, triggering spam filters on bigger subs. r/SideProject post was auto-removed; mods messaged for manual approval. r/technology blocks new posters outright. r/IMadeThis went through but got low engagement.

---

## Tech Stack

**iOS app**
- Swift / SwiftUI
- Firebase SDK (Firestore + Anonymous Auth)
- Google Mobile Ads SDK (AdMob banner)
- Xcode

**Backend / scraper**
- Python — `news_scraper.py`
- Google Gemini AI (question generation)
- Firebase Admin SDK
- `feedparser` for RSS
- GitHub Actions (daily cron at 11:00 UTC)
- **No traditional server** — fully serverless

**News sources (RSS feeds)**

| Category | Source |
|----------|--------|
| Politics, World, Health | CNN |
| Sports | ESPN |
| Business | CNBC |
| Entertainment | Variety |
| Technology | TechCrunch |
| Money | MarketWatch |

---

## Key Decisions

- **Anonymous Auth** over account-based — no signup friction. Users vote without creating accounts.
- **Automated question generation** via Gemini — daily fresh content with zero manual curation.
- **GitHub Actions over a paid server** — daily 6am scraper runs free.
- **AdMob over Firebase Ads** — better fill rates, industry standard.
- **8 categories** chosen for broad-interest coverage without dilution.
- **SwiftUI** for faster iteration over UIKit.
- **iOS-first, no Android yet** — port only if traction validates.
- **HeyGen AI avatar "Kim"** for marketing videos — yellow shirt, coffee shop background, generated from a Midjourney source image (`PollPulseInventor.webp`). Avoids filming on camera.

---

## Identifiers

**Apple**
- Apple Developer account: Cloud Design Studio LLC
- App Store App ID: `id6757474796`
- Bundle ID: likely `com.clouddesignstudio.pollpulse` (verify in Xcode)
- Current version: 1.0.4

**Firebase**
- Project: PollPulse
- Service Account Key: `serviceAccountKey.json` (local file + GitHub Secret `FIREBASE_SERVICE_ACCOUNT`)
- Firestore collections: `questions`, `advertisements`, `users`

**AdMob**
- Publisher ID: `ca-app-pub-4498392888887971`
- Production banner ad unit: `ca-app-pub-4498392888887971/4843037568`
- Test ad unit (dev only): `ca-app-pub-3940256099942544/2934735716`

**Gemini AI**
- Production key in GitHub Secret `GEMINI_API_KEY`
- ⚠️ Hardcoded fallback exists in `news_scraper.py` — **needs to be removed for security**

**Repos**
- Scraper: https://github.com/SoulFoodieSpots/pollpulse-scraper (`news_scraper.py`, workflow under `.github/workflows/`)
- iOS app: local Xcode project (likely `~/Developer/PollPulse/`)

**Social**
- TikTok: `@pollpulse101` (email: cfoskey23@gmail.com)
- YouTube: Poll Pulse (in setup)
- Instagram: not created yet
- Reddit: `u/Jumpy-Stuff-7863` (Craig's personal account)
- Recommended business email (may not exist yet): `pollpulseapp@gmail.com`

**Marketing assets**
- HeyGen avatar: "Kim"
- Source image: `PollPulseInventor.webp` (Midjourney)
- `PollPulse_Marketing_Action_Plan.pdf`

---

## Open Issues (prioritized)

1. **AdMob low fill rate (10-20%)** — banner ads serve only sometimes. Normal for new apps; expected to climb to 30-50% in week 2 and 60-90% by weeks 3-4. Don't panic, don't tune ad logic. Just wait it out.

2. **Reddit spam filter** — r/SideProject post removed automatically due to new-account + low-karma. Mods messaged for manual approval, awaiting response. r/technology blocked outright. Reddit is effectively closed as a channel until karma builds up; pivot focus to TikTok/Instagram/YouTube.

3. **TikTok bio link blocked** — TikTok requires Business Registration (with actual business license docs Craig doesn't have) for clickable bio links. **Workaround:** App Store link as pinned comment on each video; bio just says "Free iOS app" with search instructions.

4. **Hardcoded Gemini API key fallback in `news_scraper.py`** — security issue. The GitHub Secret works; remove the hardcoded fallback.

5. **Scraper Gemini import previously broken** — `from google import genai` had been used; correct import is `import google.generativeai as genai`. Fix was applied in conversation but **verify the current state of `news_scraper.py`** before assuming.

6. **0 of 10 App Store screenshots uploaded** — listing has no visual proof of the app. Major conversion drag. Should add 5-10 screenshots ASAP.

---

## Next Steps (in priority order)

1. **Add App Store screenshots** — 5-10 frames showing app UI. Single biggest conversion lever right now since the listing is bare.
2. **Finish YouTube channel setup** — profile pic, App Store link, post the same launch video as a Short.
3. **Create Instagram account** (`@pollpulse` or `@pollpulseapp`) — post the launch video as a Reel.
4. **Follow up with r/SideProject mods** if no approval response within a few more days.
5. **Day 2 TikTok video** — "24 hours after launch — here's what I learned." Maintain daily posting cadence.

---

## Marketing Playbook

**Zero-budget organic strategy** — same video repurposed across TikTok → YouTube Shorts → Instagram Reels. Tools: HeyGen for the avatar, CapCut for editing.

**Target:** 100-200 initial downloads from social.

**Week 1 content calendar**

| Day | Topic | Status |
|-----|-------|--------|
| 1 | Launch video ("I'm terrified") | ✅ Posted to TikTok |
| 2 | "24 hours after launch — here's what I learned" | ⏳ |
| 3 | "Someone suggested [feature] — added it overnight" | ⏳ |
| 4 | "Most controversial poll results so far" | ⏳ |
| 5 | "How I automate 10-15 polls daily" | ⏳ |
| 6 | "5 things I learned from launching" | ⏳ |
| 7 | "Week 1 results — [X] downloads" | ⏳ |

**Video script elements**
- Hook: vulnerability angle ("I'm terrified") performs well
- Show app footage: home screen, poll question, results
- CTA: *"Search PollPulse in iOS App Store"* (because bio link is blocked)
- Hashtags: `#indiedev #buildinpublic #iosapp #newapp #appdev #solopreneur #startup`

---

## Useful Context (gotchas)

- **AdMob fill rate panic** — 10-20% is normal for a brand-new app. Don't change ad placement or logic in the first month. Just wait.
- **TikTok bio link is permanently restricted** until Business Registration. Pinned-comment workaround is fine. Don't burn time fighting it.
- **Reddit is karma-gated**, not a near-term channel for Craig's account. New accounts get filtered on bigger subs regardless of post quality.
- **Hardcoded Gemini fallback** in `news_scraper.py` is a known security issue — the env-based path works, the fallback is just leftover dev convenience.
- **Don't break the GitHub Actions cron** — the daily 6am EST scrape is the entire content pipeline. If `news_scraper.py` breaks silently, the app shows yesterday's polls indefinitely. Add logging or alerting before any non-trivial scraper changes.
- **Verify imports before deploying scraper changes** — the `google.generativeai` import gotcha bit this codebase once.
- **An older PollPulse handoff exists** in `context/from-poll-pulse-archive.md` from when v1.1 (with AdMob) was being prepped and there was an active "Something went wrong" Firestore index error. Useful for history but **do not pull current facts from it** — the app is now live as v1.0.4 and that bug is resolved.

---

## Related Projects

- `cloud-design-studio/` — agency umbrella
- `cloud-deals/` — sibling iOS app (CloudDeals) under same LLC, plus full corporate context (NJ Entity ID, EIN, D-U-N-S, Apple Developer enrollment)
- `wigout/` — sibling iOS app (with partner Menelik Simmonds)
- `zero-sugar-club/` — sibling iOS app (different category — health)

---

## Source Context

- `context/from-poll-pulse-3.md` — primary handoff (current state, v1.0.4 live, marketing in progress)
- `context/from-poll-pulse-archive.md` — older snapshot from v1.0/v1.1 era, historical reference only

---

## Recent Changes
- 2026-04-26: Migrated PollPulse project from Claude.ai into Bernie workspace
