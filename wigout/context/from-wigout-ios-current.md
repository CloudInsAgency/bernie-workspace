# WigOut App — Handoff

## Purpose

WigOut is an AI-powered iOS app that lets users preview hairstyles on their own face before committing to a salon visit. Users upload a selfie, browse 90+ hairstyle options (braids, locs, fades, wigs, etc.), and see AI-generated images of themselves with each style. The app targets primarily Black women and men looking to visualize protective styles, braids, locs, and other hairstyles. It monetizes through a freemium model with monthly subscriptions ($4.99 Basic/20 credits, $9.99 Premium/50 credits) and one-time credit top-ups ($4.99/25 credits, $9.99/50 credits).

## Current Status

- **App Development:** Build successful, StoreKit 2 properly implemented for Apple In-App Purchases

- **Firebase Backend:** Deployed and functional with all Cloud Functions including new `verifyAndAddCredits` and `handleAppStoreNotification` for StoreKit 2 verification

- **App Store Connect:** In progress — pricing set to Free, In-App Purchases created (2 subscriptions + 2 consumables), App Privacy questionnaire completed

- **Website:** Live at wigoutstyle.com via GitHub Pages with privacy policy, support page, and marketing content

- **Blocked:** Need to complete subscription metadata (localization, pricing, screenshots) before final App Store submission

- **Marketing:** Video scripts created for TikTok/Instagram Reels using HeyGen and Veo 3

## Tech Stack

- **iOS App:** Swift, SwiftUI, StoreKit 2

- **Backend:** Firebase (Firestore, Cloud Functions, Authentication, Storage)

- **AI Image Generation:** Replicate API (model: c98b2e7a196828d00955767813b81fc05c5c9b294c670c6d147d545fed4ceecf)

- **Payments:** Apple StoreKit 2 (NOT Stripe — Apple handles all payments)

- **Website:** HTML/CSS/JS, GitHub Pages, custom domain via Namecheap

- **Deployment:** Xcode for iOS, Firebase CLI for Cloud Functions

- **Video Marketing:** HeyGen (AI avatars), Veo 3 (video generation), Midjourney (image prompts)

## Key Decisions

- **StoreKit 2 over Stripe:** Apple requires all iOS in-app digital purchases to use their payment system. Implemented proper StoreKit 2 with server-side verification via Firebase Cloud Function.

- **Anonymous Authentication:** Users sign in anonymously via Firebase Auth to reduce friction. User ID links to their credits, purchases, and generated images.

- **Credit-based model:** Each hairstyle generation costs 1 credit. Monthly subscribers get credits that reset each billing cycle. Top-up credits never expire and are used first.

- **Async job processing:** Hairstyle generation uses a job queue pattern (Firestore `hairstyle_jobs` collection) because Replicate API can take 30-180 seconds. Client polls for status.

- **4-tier pricing:** Basic ($4.99/20 monthly), Premium ($9.99/50 monthly), Top-up 25 ($4.99), Top-up 50 ($9.99)

- **Dual ownership:** App is co-owned by Menelik Simmonds & Craig Foskey (displayed on website)

## File & Repo Locations

- **iOS Project:** `~/Downloads/WigOutApp/` (local)

- **GitHub Repo:** `menelikllc/WigOutApp` (GitHub Pages enabled)

- **Website Files:** `index.html`, `support.html`, `privacy.html` in repo root; assets in `/assets/`

- **Firebase Console:** https://console.firebase.google.com/project/wigoutapp/overview

- **App Store Connect:** Wig Out App (search in App Store Connect)

- **Website URL:** https://wigoutstyle.com

- **Key Swift Files:**

  - `WigOutApp/SubscriptionManager.swift` — StoreKit 2 implementation

  - `functions/index.js` — All Firebase Cloud Functions

## Credentials & IDs

- **Firebase Project ID:** `wigoutapp`

- **Apple Developer Account:** Cloud Design Studio LLC

- **Apple Enrollment ID:** NQQ3FH3U2J

- **NJ Entity ID:** 0451424777

- **Bundle ID:** (check Xcode project settings)

- **Product IDs:**

  - `com.wigoutapp.monthly.basic.20credits`

  - `com.wigoutapp.monthly.premium.50credits`

  - `com.wigoutapp.topup.25credits`

  - `com.wigoutapp.topup.50credits`

- **Environment Variables (in Firebase):**

  - `REPLICATE_API_KEY` — stored in `.env` in functions directory

- **App Store Server Notifications URL:** `https://us-central1-wigoutapp.cloudfunctions.net/handleAppStoreNotification`

- **Domain Registrar:** Namecheap (wigoutstyle.com)

## Open Issues

- **Subscription metadata incomplete:** Both subscriptions show "Missing Metadata" in App Store Connect — need to add localization (display name, description) and pricing for each

- **Screenshots needed:** App Store requires screenshots of purchase UI for In-App Purchase review

- **App icon sizes:** Previously had missing icon errors (120x120, 152x152) — verify all sizes are in asset catalog before submission

- **Firebase Functions outdated warning:** `package.json indicates an outdated version of firebase-functions` — run `npm install --save firebase-functions@latest`

- **HeyGen credits:** Creator plan Avatar IV credits limited (199/200 used) — use stock avatars instead

## Next Steps

1. **Complete subscription metadata in App Store Connect:** Add localization (display name, description), set pricing ($4.99 and $9.99), add review screenshot for both Basic Monthly and Premium Monthly subscriptions

2. **Complete consumable metadata:** Same localization and screenshot requirements for the two top-up products

3. **Verify app icons:** Ensure all required sizes (120x120 @2x iPhone, 180x180 @3x iPhone, 152x152 @2x iPad, 167x167 @2x iPad Pro, 1024x1024 App Store) are in Assets.xcassets

4. **Submit for App Review:** Once all metadata complete, submit version 1.01 for review

5. **Create marketing videos:** Use provided Veo 3 scripts and Midjourney prompts to produce TikTok/Instagram Reels for launch

## Useful Context

- **Partner:** Menelik Simmonds is a business partner on this project

- **Support email:** support@clouddesignstudio.com (used on website and App Store)

- **Privacy policy effective date:** February 4, 2026

- **Website design:** Warm golden/cream brand colors, Playfair Display + DM Sans fonts

- **Encryption compliance:** App uses "Standard encryption algorithms" (HTTPS/TLS for API calls) — not proprietary encryption

- **App Privacy labels:** Collects Photos (for generation), User ID (Firebase auth), Purchase History (credits) — all for App Functionality, all linked to identity, none used for tracking

- **Tax category:** App Store software

- **Target audience:** Primarily Black women/men looking to preview braids, locs, fades, protective styles

- **Craig's other projects:** Cloud Design Studio LLC also runs CloudBooks, Cloud Dispatch Ops, PollPulse, and client websites — don't confuse payment systems (Stripe is used in web SaaS apps, StoreKit in iOS apps)

Wigout - Android 6 Folder Handoff

