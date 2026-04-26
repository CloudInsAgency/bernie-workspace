# PollPulse — Handoff

## Purpose

PollPulse is a daily opinion polling iOS app that auto-generates opinion polls based on trending news across 8 categories (Politics, Sports, Business, Tech, Health, Entertainment, World, Money). The backend scrapes news headlines via Python + Gemini AI and posts new polls to Firebase every morning at 6am via GitHub Actions. Users vote anonymously, see real-time results, and can share polls to social media. The app is built by Craig Foskey as a solo indie project under Cloud Design Studio LLC, monetized via AdMob banner ads.

## Current Status

- **iOS App:** LIVE in App Store (v1.0.4) - approved and available for download

- **App Store ID:** `id6757474796`

- **App Store URL:** `https://apps.apple.com/us/app/pollpulse/id6757474796`

- **Backend Scraper:** Running via GitHub Actions daily at 6am EST

- **AdMob Integration:** Working (production ad unit ID deployed, earning ~$0.02 so far, low fill rate expected for new apps)

- **Marketing Launch:** In progress

  - TikTok: @pollpulse101 - First video posted (1+ hour live)

  - YouTube: Channel setup in progress

  - Instagram: Not yet set up

  - Reddit: Posted to r/IMadeThis (low engagement), r/SideProject post was removed by spam filter (messaged mods for approval)

- **Reddit Karma Issue:** Craig's Reddit account is new with low karma, triggering spam filters on larger subreddits

## Tech Stack

**iOS App:**

- Swift / SwiftUI

- Firebase SDK (Firestore, Anonymous Auth)

- Google Mobile Ads SDK (AdMob)

- Xcode

**Backend/Scraper:**

- Python

- Google Gemini AI (for question generation)

- Firebase Admin SDK

- feedparser (RSS parsing)

- GitHub Actions (automation)

**News Sources (RSS):**

- CNN (Politics, World, Health)

- ESPN (Sports)

- CNBC (Business)

- Variety (Entertainment)

- TechCrunch (Technology)

- MarketWatch (Money)

**Deployment:**

- iOS App: Apple App Store

- Backend: GitHub Actions + Firebase Firestore

- No traditional server (serverless architecture)

**Third-Party Services:**

- Firebase (Firestore, Auth)

- Google AdMob (monetization)

- Google Gemini AI (question generation)

- GitHub Actions (CI/CD for scraper)

## Key Decisions

- **Anonymous Auth:** Chose Firebase Anonymous Auth so users don't need accounts to vote - reduces friction, improves engagement

- **Automated Question Generation:** Python + Gemini AI generates polls automatically rather than manual curation - enables daily fresh content without manual work

- **GitHub Actions for Scraper:** Runs at 6am daily for free via GitHub Actions instead of paid server

- **AdMob over Firebase Ads:** Switched to Google AdMob for better fill rates and industry standard

- **8 Categories:** Politics, Sports, Business, World, Health, Entertainment, Technology, Money - covers broad interests

- **SwiftUI:** Modern iOS framework for faster development and cleaner code

- **No Android Yet:** iOS-first approach, Android planned if traction proves concept

- **HeyGen Avatar for Marketing:** Using AI-generated avatar "Kim" for TikTok/social videos instead of filming self

## File & Repo Locations

**GitHub Repos:**

- iOS App: (local Xcode project, likely `~/Developer/PollPulse/` or similar)

- Scraper: `https://github.com/SoulFoodieSpots/pollpulse-scraper`

  - Main file: `news_scraper.py`

  - Workflow: `.github/workflows/` (daily 6am trigger)

**Firebase Console:**

- Project URL: `https://console.firebase.google.com/` (search for PollPulse project)

- Firestore collections: `questions`, `advertisements`, `users`

**Google AdMob Console:**

- URL: `https://apps.admob.google.com/`

- App: PollPulse (iOS)

**App Store Connect:**

- URL: `https://appstoreconnect.apple.com/`

- App: PollPulse

- Current version: 1.0.4

**Social Media Accounts:**

- TikTok: `@pollpulse101` (tiktok.com/@pollpulse101)

- YouTube: Poll Pulse (setup in progress)

- Instagram: Not created yet

- Reddit: `u/Jumpy-Stuff-7863` (Craig's personal account, used for posting)

**Marketing Assets:**

- HeyGen Avatar: "Kim" (yellow shirt, coffee shop background)

- Avatar source image: `PollPulseInventor.webp` (Midjourney generated)

- Marketing PDF: `PollPulse_Marketing_Action_Plan.pdf`

## Credentials & IDs

**Apple:**

- Apple Developer Account: Cloud Design Studio LLC

- App Store App ID: `id6757474796`

- Bundle ID: (check Xcode project, likely `com.clouddesignstudio.pollpulse`)

**Google/Firebase:**

- Firebase Project: PollPulse

- Service Account Key: `serviceAccountKey.json` (stored locally and as GitHub Secret)

- GitHub Secret: `FIREBASE_SERVICE_ACCOUNT`

**Google AdMob:**

- Publisher ID: `ca-app-pub-4498392888887971`

- Banner Ad Unit ID: `ca-app-pub-4498392888887971/4843037568`

- Test Ad Unit ID (for development): `ca-app-pub-3940256099942544/2934735716`

**Gemini AI:**

- API Key stored as GitHub Secret: `GEMINI_API_KEY`

- Hardcoded fallback in `news_scraper.py` (should be removed for security)

**TikTok:**

- Account: `@pollpulse101`

- Email: `cfoskey23@gmail.com` (used for business account)

**Email for PollPulse:**

- Recommended: `pollpulseapp@gmail.com` (may or may not be created yet)

## Open Issues

**AdMob Low Fill Rate:**

- Banner ads only showing ~10-20% of the time

- Expected for brand new apps - should improve over 2-4 weeks

- Earnings so far: $0.02 (proves integration works)

**Reddit Spam Filter:**

- r/SideProject post removed automatically due to new account + low karma

- Messaged mods for manual approval - awaiting response

- r/technology blocked posting (requires established reputation)

**TikTok Link in Bio:**

- Cannot add clickable website link without full Business Registration

- Business Registration requires business license/documents Craig doesn't have

- Workaround: App Store link posted as pinned comment on videos

- Bio just says "Free iOS app" with search instructions

**Scraper Gemini Import:**

- Previously had import error: `from google import genai` should be `import google.generativeai as genai`

- Fixed in conversation but should verify current state of `news_scraper.py`

**App Store Screenshots:**

- Currently 0 of 10 screenshots uploaded

- Should add 5-10 screenshots showing app UI for better conversion

## Next Steps

1. **Complete YouTube Channel Setup:** Create channel, upload profile pic, add App Store link, post first Short (same video as TikTok)

2. **Set Up Instagram for PollPulse:** Create `@pollpulse` or `@pollpulseapp` Instagram account, post same video as Reel

3. **Check Reddit r/SideProject:** See if mods approved the removed post, follow up if needed

4. **Create Day 2 TikTok Video:** "24 hours after launch - here's what I learned" content, continue daily posting cadence

5. **Add App Store Screenshots:** Take 5-10 screenshots of app UI, upload to App Store Connect for better conversion

## Useful Context

**Craig's Situation:**

- Solo indie developer, founder of Cloud Design Studio LLC (West Orange/Branchburg, NJ)

- Recently accepted job at Flix (FlixBus) as Regional Sales and Agency Manager

- Previously 15+ years at Verizon (Associate Director level)

- Building multiple apps: PollPulse, WigOut (AI hairstyle preview), CloudDeals, CloudBooks, Cloud Dispatch Ops

- Prefers concise bullet-point formatting and systematic tracking

**Marketing Strategy:**

- Zero-budget organic marketing focus

- Using HeyGen + CapCut for video creation

- Same video posted to TikTok → YouTube Shorts → Instagram Reels

- Target: 100-200 initial downloads from social media

- Reddit was difficult due to new account - TikTok/Instagram/YouTube are primary channels

**Content Calendar (Week 1):**

- Day 1: Launch video ("I'm terrified") ✅ Posted to TikTok

- Day 2: "24 hours after launch - here's what I learned"

- Day 3: "Someone suggested [feature] - added it overnight"

- Day 4: "Most controversial poll results so far"

- Day 5: "How I automate 10-15 polls daily"

- Day 6: "5 things I learned from launching"

- Day 7: "Week 1 results - [X] downloads"

**Video Script Elements:**

- Hook: Vulnerability angle ("I'm terrified") performs well

- Show app footage: Home screen, poll question, results

- CTA: "Search PollPulse in iOS App Store" (since bio link is problematic)

- Hashtags: #indiedev #buildinpublic #iosapp #newapp #appdev #solopreneur #startup

**AdMob Timeline:**

- Week 1: 10-20% fill rate (normal for new apps)

- Week 2: 30-50% fill rate

- Week 3-4: 60-90% fill rate

- Don't panic about low ad serving - it improves with time and users

**Related Projects (Same Developer):**

- CloudPriceDeals/CloudDeals: Affiliate deal aggregation site + iOS app

- WigOut: AI hairstyle preview app (with partner Menelik Simmonds)

- CloudBooks: SaaS accounting app

- Cloud Dispatch Ops: Field service dispatch SaaS

- A&G Insurance Group: Partnership dispute (separate matter)

Poll Pulse 2 Handoff Info….

