# WigOut — Project Context

**WigOut** is an AI-powered hairstyle preview app — users take a selfie, pick
from a catalog of hairstyles (braids, locs, fades, silk press, wigs, etc.),
and get a photo-realistic AI-generated preview of themselves wearing that
style. Targets primarily Black women and men looking to visualize protective
styles before committing to a salon visit.

This project covers **three codebases** under one product umbrella:

1. **iOS app** — Swift/SwiftUI, StoreKit 2, App Store submission in progress
2. **Android app** — Kotlin/Jetpack Compose, Google Play Billing, Play Store submission in progress
3. **Marketing website** — wigoutstyle.com, GitHub Pages, live

All three share the same Firebase backend and Cloud Functions for AI generation.

> **⚠️ PARTNER COORDINATION:** WigOut is co-owned by **Menelik Simmonds and
> Craig Foskey**. Strategic, branding, monetization, and pricing decisions
> require partner alignment — they're not unilateral. The website footer and
> App Store listing both display dual ownership. Anything that materially
> changes the product, brand, or revenue model gets flagged to Craig before
> action.

---

## Current Status

### iOS — pre-submission, metadata pending
- ✅ Build successful, runs on device
- ✅ StoreKit 2 fully implemented with server-side verification via Firebase Cloud Function
- ✅ Firebase backend deployed (incl. `verifyAndAddCredits`, `handleAppStoreNotification`)
- ✅ App Store Connect: pricing set to Free, all 4 In-App Purchases created (2 subscriptions + 2 consumables), App Privacy questionnaire complete
- ⚠️ **Blocked on subscription metadata** — both subscriptions show "Missing Metadata" in App Store Connect; need localization (display name, description) + pricing + review screenshots before final submission

### Android — pre-upload, billing products not created
- ✅ App code complete and functional on Samsung SM-T220 tablet + Android emulator (API 36)
- ✅ Signed AAB generated (`app-release.aab`), ready for Google Play upload
- ✅ Firebase registered (`com.wigoutapp.android`), AI generation working end-to-end
- ⚠️ **Google Play Billing products not yet created** — purchases spin indefinitely until 4 product IDs exist server-side
- ⚠️ Play Store listing incomplete (mid-flow on Data Safety questionnaire)
- ⚠️ AAB has NOT been uploaded to a release track yet

### Website — LIVE
- 🟢 https://wigoutstyle.com (GitHub Pages, custom domain via Namecheap)
- ✅ Privacy policy, support page, marketing content all live
- Brand: warm golden/cream colors, Playfair Display + DM Sans

### Marketing
- Video scripts created for TikTok / Instagram Reels using HeyGen + Veo 3
- HeyGen Avatar IV credits limited (199/200 used) — fall back to stock avatars

---

## Tech Stack

| Layer | iOS | Android | Shared |
|-------|-----|---------|--------|
| Language | Swift 5 | Kotlin | — |
| UI | SwiftUI | Jetpack Compose + Material 3 | — |
| Camera | AVFoundation | CameraX | — |
| Face detection | (built-in) | Google ML Kit (on-device) | — |
| Billing | StoreKit 2 | Google Play Billing v6+ | — |
| Backend | — | — | Firebase (Auth, Firestore, Storage, Cloud Functions) |
| AI generation | — | — | Replicate API (InstantID model) |
| Auth | — | — | Anonymous (Firebase Auth) |
| Image loading | — | Coil | — |
| Build target | iOS (Xcode) | minSdk 24, targetSdk 34 (Gradle Kotlin DSL) | — |

**Cloud Functions** (Node.js 24, Firebase Functions v2):
- `generateHairstyleWithReference` — main generation function
- `verifyAndAddCredits` — StoreKit 2 receipt verification (iOS)
- `handleAppStoreNotification` — App Store Server Notifications webhook
- (Android billing verification handled via Google Play Billing API)

---

## Key Decisions

**Architecture & monetization**
- **StoreKit 2 (iOS) and Google Play Billing (Android), NOT Stripe.** Apple and Google require their own billing for in-app digital purchases. Stripe is used in Craig's web SaaS apps (CloudBooks, Cloud Dispatch Ops); never confuse the two.
- **Anonymous Firebase Auth** — no signup friction. User ID links to credits, purchases, generated images.
- **Credit-based model** — each generation costs 1 credit. Subscription credits reset monthly; top-up credits never expire and are used first.
- **4-tier pricing (mirrored across iOS + Android):**
  - Basic Monthly: $4.99 / 20 credits
  - Premium Monthly: $9.99 / 50 credits
  - Top-up: $4.99 / 25 credits
  - Top-up: $9.99 / 50 credits
- **Async job processing** — generation goes through a Firestore `hairstyle_jobs` collection because Replicate API takes 30-180 seconds. Client polls for status.
- **No free credits / freemium** — new users hit the paywall after their first photo capture. Deliberate choice; do not soften without partner alignment.
- **Top-ups only shown to subscribers** — the "Need credits now?" section only renders when `subscriptionTier != "none"` (prevents confusion for non-subscribers).

**Cross-platform parity**
- **iOS is the reference implementation.** When Android behavior is ambiguous, match iOS. Same Firebase Cloud Functions, same hairstyle catalog, same pricing tiers.
- **Hairstyle image naming differs by platform.** iOS uses camelCase, Android requires lowercase snake_case for drawable resources. The `imageName` field stores the Android-format name on Android.
- **Hairstyle catalog: 89 styles bundled locally on Android** (in `res/drawable/`); previously loaded from Firebase Storage but moved local. iOS may still load from Storage — verify before any catalog change.
- **Portrait locked** on both platforms for consistent selfie UX.

**Android-specific quirks**
- **`TouchTransparentFrameLayout`** — custom FrameLayout wrapper around CameraX `PreviewView` that overrides all touch dispatch methods to return `false`. This is the definitive fix for AndroidView native View touch priority overriding Compose `zIndex`. Took 6+ sessions to solve. **Do not remove it.**
- **Frame analysis throttled to ~8fps (120ms)** — prevents process crashes from ML Kit overloading the Samsung tablet's CPU. Uses `AtomicLong` timestamp check.
- **JPEG/YUV dual-format handling** — `imageProxyToBitmap()` checks `planes.size`: 1 = JPEG (from ImageCapture), 3 = YUV_420_888 (from ImageAnalysis frames). Different conversion paths.
- **Paywall must render INSIDE the `capturedImage != null` block** in CameraScreen, before `return` — prior bug had it after `return` and it never displayed.

---

## Identifiers

**Apple / iOS**
- Apple Developer Account: Cloud Design Studio LLC
- Apple Enrollment ID: NQQ3FH3U2J
- Bundle ID: `com.craigfoskey.WigOutApp`
- App: "Wig Out App" in App Store Connect
- StoreKit Product IDs:
  - `com.wigoutapp.monthly.basic.20credits`
  - `com.wigoutapp.monthly.premium.50credits`
  - `com.wigoutapp.topup.25credits`
  - `com.wigoutapp.topup.50credits`
- App Store Server Notifications URL: `https://us-central1-wigoutapp.cloudfunctions.net/handleAppStoreNotification`

**Google / Android**
- Package: `com.wigoutapp.android`
- Firebase Android App ID: `1:370171888702:android:0ffbd3de921c5589767d6f`
- Google Play Console: "WigOut App" (active, associated with Cloud Design Studio LLC)
- Contact email (used in content ratings): `wigoutcontact@gmail.com`
- **Keystore: created during signed bundle generation. Location chosen by Craig — likely `~/AndroidStudioProjects/WigOut/` or in keychain. Key alias likely `wigout`. 🚨 CRITICAL: do not lose this keystore — it's required for all future updates. No keystore = no app updates ever.**
- Google Play Billing Product IDs (**NOT yet created in Play Console**):
  - `monthly_basic_20credits`
  - `monthly_premium_50credits`
  - `topup_25credits`
  - `topup_50credits`

**Firebase (shared)**
- Project ID: `wigoutapp`
- Console: https://console.firebase.google.com/project/wigoutapp/overview
- Environment variable: `REPLICATE_API_KEY` in `.env` in functions directory
- Replicate model version: `c98b2e7a196828d00955767813b81fc05c5c9b294c670c6d147d545fed4ceecf`

**Business / Cloud Design Studio LLC**
- NJ Entity ID: 0451424777
- (Full corporate context in `cloud-deals/CLAUDE.md`)

**Website**
- Domain: wigoutstyle.com (Namecheap registrar)
- GitHub repo: `menelikllc/WigOutApp` (GitHub Pages enabled)
- Files: `index.html`, `support.html`, `privacy.html` in repo root; assets in `/assets/`
- Support email: `support@clouddesignstudio.com`
- Privacy policy effective date: February 4, 2026

---

## File Locations

**iOS**
- Project root: `~/Downloads/WigOutApp/`
- Key Swift files:
  - `WigOutApp/SubscriptionManager.swift` — StoreKit 2 implementation
  - `functions/index.js` — all Firebase Cloud Functions

**Android**
- Project root: `~/AndroidStudioProjects/WigOut/`
- Signed bundle: `app/release/app-release.aab`
- Critical files:
  - `MainActivity.kt`, `WigOutApp.kt`
  - `billing/BillingManager.kt` — Google Play Billing + `SubscriptionException` handling
  - `service/FaceDetectionService.kt` — ML Kit
  - `service/FirebaseService.kt` — image upload + Cloud Function calls
  - `ui/camera/CameraPreview.kt` — `TouchTransparentFrameLayout` + CameraX
  - `ui/camera/CameraScreen.kt` — main camera UI + paywall integration
  - `ui/hairstyle/Hairstyle.kt` — data model + 89-style catalog
  - `ui/paywall/PaywallScreen.kt` — subscription + top-up purchasing
  - `viewmodel/CameraViewModel.kt` — camera state + generation + paywall logic
  - `viewmodel/SubscriptionViewModel.kt` — billing state + credit tracking
  - `app/google-services.json` (verify `.json` extension!)
- 89 hairstyle drawables in `res/main/res/drawable/` (snake_case names)

---

## Open Issues (prioritized)

### iOS
1. **Subscription metadata incomplete** — both subs show "Missing Metadata" in App Store Connect. Need localization (display name + description), pricing ($4.99 / $9.99), and review screenshot for each. **Blocks final submission.**
2. **Consumable metadata** — same requirements (localization + screenshot) for the two top-up products.
3. **App icon sizes** — previously had missing icon errors (120×120, 152×152). Verify all required sizes are in `Assets.xcassets` before submission: 120, 180, 152, 167, 1024.
4. **Firebase Functions outdated warning** — `package.json indicates an outdated version of firebase-functions`. Run `npm install --save firebase-functions@latest` in the functions directory.

### Android
5. **Google Play Billing products not created** — 4 product IDs need to be set up in Play Console → Monetize → Products. Until they exist, purchases spin/fail. **Blocks any release.**
6. **Play Store listing incomplete** — Data Safety questionnaire mid-flow. Store listing needs: full description, screenshots (phone + tablet), feature graphic (1024×500), privacy policy URL.
7. **FileProvider authority mismatch potential** — AndroidManifest uses `${applicationId}.fileprovider` but ResultScreen's share function uses `${context.packageName}.provider`. These MUST match or sharing crashes on first use.
8. **Verify `totalCredits = 99` debug override is removed** in `CameraScreen.kt` — should be `totalCredits = totalCredits` (production billing flow). Earlier sessions flagged this as a potential leftover.
9. **`enablePendingPurchases()` deprecation warning** — `BillingManager` uses a deprecated `BillingClient.Builder` method. Not blocking but should be updated.
10. **No error UI for generation failures** — if `FirebaseService.generateHairstyle` fails (network, timeout), red error banner shows but no retry button. User must retake photo.
11. **Gradle deprecation warning** — incompatible with Gradle 10. Fix before next major Gradle upgrade.

### Marketing
12. **HeyGen credits exhausted** (199/200 used) — Avatar IV no longer usable; switch to stock avatars or upgrade plan.

---

## Next Steps (in priority order)

### iOS — get to App Store
1. Complete subscription metadata in App Store Connect (localization + pricing + review screenshots × 2 subs).
2. Complete consumable metadata (localization + screenshots × 2 top-ups).
3. Verify all required app icon sizes in `Assets.xcassets`.
4. Submit version 1.01 for App Review.

### Android — get to Play Store
5. Create the 4 billing products in Google Play Console — match pricing to iOS exactly.
6. **Set up closed testing first** (before production) — verify billing works end-to-end with real Google Play test accounts. Add test emails in Play Console → License Testing.
7. Complete Play Store listing — screenshots, feature graphic (1024×500), full description, privacy policy URL, finish Data Safety.
8. Fix the FileProvider authority mismatch before users hit share.
9. Upload AAB to a closed testing release first; promote to production after billing is verified.

### Marketing — post-launch
10. Produce TikTok / Instagram Reels using the existing Veo 3 + Midjourney scripts.

---

## Useful Context (gotchas)

**Cross-platform**
- **iOS is the reference; Android matches.** Don't introduce platform-specific behavior without explicit reason.
- **Pricing must stay aligned across iOS and Android** — App Store and Play Store don't sync prices automatically. If you change one, change the other in the same session or you'll have arbitrage confusion.
- **Hairstyle catalog parity** — same 89 styles must exist on both platforms with corresponding image filenames (camelCase iOS / snake_case Android).
- **Subscription state lives in Firestore**, not in the platform billing system. Both iOS and Android verify receipts server-side and write to the same Firestore document.

**Android landmines**
- **The touch interception pattern took 6+ sessions to solve.** `TouchTransparentFrameLayout` is the only known fix. If anyone tries to "clean up" the camera component by removing it, the camera tap-to-capture stops working.
- **Samsung SM-T220 has limited RAM.** Frame analysis at full 30fps caused process crashes. The 120ms throttle is mandatory; do not "optimize" it away.
- **`google-services.json` filename** — verify the `.json` extension. Has been miscategorized in the past.

**iOS landmines**
- **`StoreKit.Product` and `StoreKit.Transaction`** — always use the explicit namespace to avoid type conflicts with Firebase / app code.
- **Use `sheet(item:)`, NOT `sheet(isPresented:)`** for purchase sheets — fixed a blank-sheet race condition. Same pattern Craig uses across iOS apps.

**Don't confuse with other Cloud Design Studio projects**
- WigOut uses StoreKit 2 (iOS) + Play Billing (Android). It does NOT use Stripe.
- CloudBooks and Cloud Dispatch Ops use Stripe — that's web SaaS.
- Don't cross-pollinate billing patterns between iOS apps and web SaaS.

**Partner protocol**
- Anything that changes pricing, branding, the dual-ownership display on the website, or the strategic direction of the product → flag to Craig for partner alignment with Menelik before shipping.
- Anything technical (bug fixes, new features within agreed scope, deploy operations) → proceed normally.

**Historical**
- Two earlier handoff snapshots exist in the context folder for historical reference: an early-stage iOS handoff with a then-unsolved "INTERNAL" Replicate error (since resolved), and a joint-venture-era handoff covering the website. **Do not pull current facts from those** — the iOS app is now StoreKit-2-complete with 99 styles and the website is live.

---

## Related Projects

- `cloud-design-studio/` — agency umbrella + corporate identity
- `cloud-deals/` — has full Cloud Design Studio LLC corporate context (NJ Entity ID, EIN, D-U-N-S, Apple Developer enrollment)
- `poll-pulse/` — sibling iOS app under same LLC (different stack — SwiftUI + Firebase, no AI generation)
- `zero-sugar-club/` — sibling iOS app (different category, different monetization)

---

## Source Context

- `context/from-wigout-ios-current.md` — primary iOS handoff (current state, StoreKit 2, App Store submission in progress)
- `context/from-wigout-android.md` — primary Android handoff (Kotlin port, AAB ready, Play Store submission in progress)
- `context/from-wigout-ios-jv-website.md` — joint-venture-era handoff covering the website (historical reference)
- `context/from-wigout-ios-early.md` — early iOS handoff with broken InstantID generation (historical reference, issue resolved)

---

## Recent Changes
- 2026-04-26: Migrated WigOut project from Claude.ai (4 source snapshots) into Bernie workspace
