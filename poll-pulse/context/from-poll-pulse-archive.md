# PollPulse — Handoff

## Purpose

PollPulse is an iOS opinion polling app that delivers fresh daily polls on current events across 8 categories (Politics, Sports, Business, World, Health, Entertainment, Technology, Money). The app uses AI-powered news scraping to generate engaging opinion questions from trending stories, allowing users to vote anonymously, see real-time results with percentages, and share to social media. The goal is to reach 50K daily votes and monetize through AdMob banner ads and sponsored polls.

## Current Status

- **iOS App:** Fully functional with SwiftUI, purple gradient UI matching app icon, search functionality, social sharing, and vote tracking

- **Backend:** Firebase (Firestore, Cloud Functions, Anonymous Auth) deployed and operational

- **News Scraper:** Python script with Gemini AI running via GitHub Actions daily at 6am EST, generating 10-15 questions per day

- **AdMob:** Approved and integrated (Publisher ID: pub-4498392888887971), banner ads implemented

- **App Store:** Version 1.0 previously submitted; Version 1.1 (with AdMob) ready to submit

- **Blocked:** User reported "Something went wrong" error on all views after recent FirebaseService.swift updates — needs debugging (likely a Firestore query issue with compound queries requiring an index)

## Tech Stack

- **iOS App:** Swift 5, SwiftUI, Firebase SDK (Firestore, Auth)

- **Backend:** Firebase Cloud Functions (Node.js), Firestore database, Anonymous Authentication

- **Scraper:** Python 3.9, google-generativeai, firebase-admin, feedparser

- **AI:** Google Gemini 2.5 Flash API for question generation

- **Automation:** GitHub Actions (daily cron at 11:00 UTC / 6am EST)

- **Monetization:** Google AdMob (banner ads)

- **Deployment:** Xcode → App Store Connect, GitHub → GitHub Actions

- **News Sources:** RSS feeds from CNN, ESPN, CNBC, BBC, Variety, TechCrunch, MarketWatch

## Key Decisions

- **Anonymous Authentication:** No user accounts required — reduces friction, protects privacy, enables immediate voting

- **Daily AI Generation:** Gemini AI creates opinion polls from real news, keeping content fresh and relevant without manual curation

- **10 Polls Per Category:** Each category always shows up to 10 polls, backfilling from previous days if today has fewer

- **Purple Gradient Theme:** UI designed to match the colorful bar chart app icon with yellow/orange accents

- **GitHub Actions over Local Cron:** Cloud-based automation ensures reliability even when developer's Mac is off

- **AdMob + Sponsored Polls Monetization:** Start with AdMob for passive income ($2-3K/mo), scale to sponsored polls ($5K+/mo) for higher revenue

- **Firestore Direct Queries:** Using client-side Firestore queries rather than Cloud Functions for fetching questions (faster, simpler)

## File & Repo Locations

- **GitHub Repo:** https://github.com/SoulFoodieSpots/pollpulse-scraper (private)

- **Local iOS Project:** Xcode project on MacBook Air (exact path not specified)

- **Local Scraper:** `~/pollpulse-scraper/`

- **Firebase Console:** https://console.firebase.google.com/project/pollpulse-1d3da

- **Firestore:** `questions` collection, `votes` collection

- **App Store Connect:** https://appstoreconnect.apple.com (PollPulse app)

- **AdMob Console:** https://apps.admob.com/

- **Google AI Studio:** https://aistudio.google.com/

## Credentials & IDs

- **Firebase Project ID:** `pollpulse-1d3da`

- **Gemini API Key:** Stored in GitHub Secrets as `GEMINI_API_KEY` (also hardcoded in local script — starts with `AIzaSy...`)

- **Firebase Service Account:** Stored in GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT` (JSON blob)

- **Local Service Account:** `~/pollpulse-scraper/serviceAccountKey.json`

- **AdMob Publisher ID:** `pub-4498392888887971`

- **GitHub Username:** `SoulFoodieSpots`

- **Apple Developer Account:** Cloud Design Studio LLC (Enrollment ID: NQQ3FH3U2J)

- **App Bundle ID:** Not specified in conversation (likely `com.clouddesignstudio.pollpulse` or similar)

## Open Issues

1. **"Something went wrong" error on all views:** After updating FirebaseService.swift to show last 10 polls per category with compound queries (whereField + orderBy + limit), app shows error. Likely cause: Firestore requires a composite index for queries combining `whereField("dateActive", isLessThan:)` with `orderBy("dateActive")` — need to create index in Firebase Console or click the link in Xcode console error

2. **App Store Rejection History:** App was previously rejected (user mentioned needing images) — unclear if fully resolved

3. **Python Version Warning:** Scraper shows warning about Python 3.9.6 being unsupported by google.api_core — works but should upgrade to Python 3.10+

4. **Some RSS Feeds Return Empty:** Politics, World, Health, Money categories sometimes return no articles — need more reliable RSS sources or fallback logic

5. **Hardcoded API Key:** Gemini API key is hardcoded in local script as fallback — security risk if repo ever becomes public

## Next Steps

1. **Debug "Something went wrong" error:** Run app in Xcode, check console for Firestore index errors, create required composite index in Firebase Console

2. **Submit Version 1.1 to App Store:** Archive in Xcode, upload to App Store Connect, fill out "What's New" with AdMob banner info, submit for review

3. **Create App Store Screenshots:** Capture 5-10 screenshots showing main screen, voting, results, search, categories, share feature (need iPhone 15 Pro Max and iPhone 14 Plus sizes)

4. **Set Up Sponsored Polls System:** Add ability for brands to submit paid poll questions ($500-2K each) — huge revenue opportunity

5. **Add More RSS Sources:** Add backup feeds for categories that frequently return empty (BBC, Reuters, AP News, etc.)

## Useful Context

- **User Profile:** Craig is founder of Cloud Design Studio LLC, detail-oriented, prefers concise bullet points, systematic approach. Has 50% stake in A&G Insurance Group (separate from this project). Recently accepted job at Flix (FlixBus).

- **Monetization Strategy:** Target 50K daily votes. Start with AdMob ($2-3K/mo), add sponsored polls ($500-2K per poll), eventually direct ad sales ($10-20K/mo). Political campaigns and movie studios are ideal sponsors.

- **Scraper Timing:** GitHub Actions runs at 11:00 UTC (6:00 AM EST). Can also trigger manually via GitHub Actions UI or run locally with `python3 news_scraper.py`.

- **Gemini API Quota:** Free tier has 1,500 requests/day but user enabled billing for unlimited. Model is `gemini-2.5-flash` (NOT `gemini-2.0-flash-exp` which doesn't exist).

- **Code Style:** SwiftUI with @MainActor ViewModels, async/await for Firebase calls, Combine for @Published properties

- **App Icon:** Beautiful purple gradient with colorful bar chart and sparkles, filename `PollPulseIconFinal.png`, added to Assets.xcassets

- **UI Theme Colors:** Purple background (#3D2555 / RGB 0.24, 0.15, 0.33), yellow/orange gradient accents for selected states

- **Category Badge Colors:** Each category has unique gradient (Politics=blue/purple, Sports=orange/red, Business=green/mint, etc.)

- **Date Format:** Questions use `dateActive` field in `YYYY-MM-DD` format, displayed to users as "MMM d, yyyy"

- **Share Text Format:** Formatted with emoji (📊) showing question, percentages, and total votes

- **Testing:** No user accounts needed — app uses Firebase Anonymous Auth, automatically signs in on launch