# WigOut Android — Handoff

## Purpose

WigOut is an AI-powered hairstyle preview app that lets users take a selfie, choose a hairstyle from a catalog of 89 styles, and generate a photo-realistic preview of themselves wearing that hairstyle. The Android version is a full port of the existing iOS app (SwiftUI → Kotlin/Jetpack Compose), sharing the same Firebase backend and Cloud Functions. Revenue comes from monthly subscriptions (20 or 50 credits) and one-time top-up purchases. The app is being published under Cloud Design Studio LLC.

## Current Status

- **App code**: Complete and functional. Camera capture, face detection, hairstyle picker, AI generation, paywall, settings, and result screens all working on Samsung SM-T220 tablet and Android emulator.

- **Signed AAB**: Successfully generated (`app-release.aab`) and ready for Google Play upload.

- **Google Play Console**: App created as "WigOut App". Store listing, content ratings, target audience, and data safety sections are partially completed (user was mid-flow filling out Data Safety questionnaire). The `.aab` has NOT yet been uploaded to a release track.

- **Firebase**: Android app registered in WigOutApp Firebase project (`com.wigoutapp.android`). Anonymous auth enabled. `google-services.json` placed in `app/` folder. AI generation confirmed working end-to-end via Firebase Cloud Functions.

- **Google Play Billing**: Product IDs defined in code but NOT yet created in Google Play Console. Purchases spin indefinitely because no products exist server-side yet.

- **CameraViewModel**: Currently has the PRODUCTION billing flow restored (with `SubscriptionException` handling). The `totalCredits` in CameraScreen should be `totalCredits` (not `99` — that was a temporary test override, now reverted).

## Tech Stack

- **Language**: Kotlin

- **UI Framework**: Jetpack Compose + Material 3

- **Camera**: CameraX (Preview, ImageCapture, ImageAnalysis)

- **Face Detection**: Google ML Kit Face Detection (on-device)

- **Backend**: Firebase (Auth anonymous, Cloud Functions, Cloud Storage)

- **Billing**: Google Play Billing Library v6+

- **Image Loading**: Coil

- **Permissions**: Accompanist Permissions

- **Build**: Gradle (Kotlin DSL), minSdk 24, targetSdk 34

- **Deployment**: Google Play Store (pending)

- **Test Devices**: Samsung SM-T220 tablet (Android 12/14), Android Studio emulator (API 36)

## Key Decisions

- **TouchTransparentFrameLayout**: Custom `FrameLayout` wrapper around `PreviewView` that overrides `dispatchTouchEvent`, `onInterceptTouchEvent`, and `onTouchEvent` to all return `false`. This was the solution to AndroidView's native View touch system having higher dispatch priority than Compose — `zIndex` modifiers in Compose cannot override native View touch hierarchy.

- **Frame analysis throttled to ~8fps (120ms)**: Prevents process crashes from ML Kit face detection overloading the CPU on the tablet. Uses `AtomicLong` timestamp check in the ImageAnalysis callback.

- **JPEG/YUV dual format handling**: `imageProxyToBitmap()` checks `planes.size` — 1 plane means JPEG (from `ImageCapture.takePicture()`), 3 planes means YUV_420_888 (from `ImageAnalysis` frames). Each uses a different conversion path.

- **Portrait locked**: `android:screenOrientation="portrait"` in AndroidManifest.xml — consistent with iOS behavior and better selfie UX.

- **No free credits**: New users go straight to paywall after first photo capture. No trial/freemium credits.

- **Top-ups only for subscribers**: "Need credits now?" section in PaywallScreen only renders when `subscriptionTier != "none"` — prevents confusion for users who haven't subscribed yet.

- **Anonymous auth**: No user accounts or login. Firebase anonymous auth handles identity for billing/credit tracking.

- **All 89 hairstyle images are local drawables**: Previously loaded from Firebase Storage, now bundled in `res/drawable/`. Firebase Storage hairstyle folder was deleted.

- **Paywall renders over ResultScreen**: The `ModalBottomSheet` for the paywall is inside the `capturedImage != null` block (before `return`) in CameraScreen, so it can overlay the result screen. Earlier bug: it was rendered after `return` and never displayed.

## File & Repo Locations

### Local Project

~/AndroidStudioProjects/WigOut/ ├── app/ │ ├── google-services.json ← Firebase config (verify .json extension!) │ ├── build.gradle.kts │ ├── src/main/ │ │ ├── AndroidManifest.xml │ │ ├── res/ │ │ │ ├── drawable/ ← 89 hairstyle images (snake_case names) │ │ │ └── mipmap-*/ ← App icons (WigOut logo) │ │ └── java/com/wigoutapp/android/ │ │ ├── MainActivity.kt │ │ ├── WigOutApp.kt │ │ ├── billing/ │ │ │ └── BillingManager.kt ← Google Play Billing + SubscriptionException │ │ ├── service/ │ │ │ ├── FaceDetectionService.kt ← ML Kit face detection │ │ │ └── FirebaseService.kt ← Image upload + Cloud Function calls │ │ ├── ui/ │ │ │ ├── camera/ │ │ │ │ ├── CameraPreview.kt ← TouchTransparentFrameLayout + CameraX │ │ │ │ └── CameraScreen.kt ← Main camera UI + paywall integration │ │ │ ├── hairstyle/ │ │ │ │ ├── Hairstyle.kt ← Data model + HairstyleCatalog (89 styles) │ │ │ │ └── HairstylePickerScreen.kt │ │ │ ├── paywall/ │ │ │ │ └── PaywallScreen.kt ← Subscription + top-up purchasing │ │ │ ├── result/ │ │ │ │ └── ResultScreen.kt ← Post-capture: generate/retake/save/share │ │ │ ├── settings/ │ │ │ │ ├── ContactUsScreen.kt │ │ │ │ ├── PrivacyPolicyScreen.kt │ │ │ │ ├── SettingsScreen.kt │ │ │ │ └── SupportScreen.kt │ │ │ └── theme/ │ │ │ └── Theme.kt │ │ └── viewmodel/ │ │ ├── CameraViewModel.kt ← Camera state + generation + paywall logic │ │ └── SubscriptionViewModel.kt ← Billing state + credit tracking │ └── release/ │ └── app-release.aab ← Signed bundle for Play Store

### Cloud Consoles

- **Firebase Console**: https://console.firebase.google.com → Project "WigOutApp"

  - iOS app: `com.craigfoskey.WigOutApp`

  - Android app: `com.wigoutapp.android`

- **Google Play Console**: https://play.google.com/console → "WigOut App"

- **Apple Developer**: (iOS version) Enrollment ID: NQQ3FH3U2J

### iOS Companion App

- Separate Xcode project (SwiftUI)

- Bundle ID: `com.craigfoskey.WigOutApp`

- Shares same Firebase project and Cloud Functions

## Credentials & IDs

- **Package name**: `com.wigoutapp.android`

- **Firebase Project**: WigOutApp (project number in `google-services.json`)

- **Firebase Android App ID**: `1:370171888702:android:0ffbd3de921c5589767d6f`

- **Keystore**: Created during signed bundle generation — location chosen by Craig (check `~/AndroidStudioProjects/WigOut/` or keychain). Key alias: likely `wigout`. **CRITICAL: Do not lose this keystore — it's required for all future updates.**

- **Google Play Developer Account**: Active (associated with Cloud Design Studio LLC)

- **Contact email**: `wigoutcontact@gmail.com` (used in content ratings)

- **EIN**: On file for Cloud Design Studio LLC

- **NJ Entity ID**: 0451424777

### Google Play Billing Product IDs (not yet created in Play Console)

- `monthly_basic_20credits` — Basic subscription ($4.99/mo, 20 credits)

- `monthly_premium_50credits` — Premium subscription ($9.99/mo, 50 credits)

- `topup_25credits` — One-time 25 credits ($4.99)

- `topup_50credits` — One-time 50 credits ($9.99)

## Open Issues

- **Google Play Billing products not created**: The 4 product IDs above need to be set up in Google Play Console → Monetize → Products (2 subscriptions + 2 in-app products). Until these exist, purchases will spin/fail.

- **Play Store listing incomplete**: Data Safety questionnaire was mid-flow. Store listing needs: full description, screenshots (phone + tablet), feature graphic (1024x500), privacy policy URL.

- **Privacy policy URL needed**: Google Play requires a public URL. Should match iOS app's privacy policy. Can host on GitHub Pages or similar.

- **FileProvider authority mismatch potential**: AndroidManifest uses `${applicationId}.fileprovider` but ResultScreen's share function uses `${context.packageName}.provider` — these must match or sharing will crash.

- **`enablePendingPurchases()` deprecation warning**: BillingManager uses deprecated `BillingClient.Builder` method. Not blocking but should be updated.

- **Gradle deprecation warning**: "Deprecated Gradle features were used in this build, making it incompatible with Gradle 10."

- **No error UI for generation failures**: If `FirebaseService.generateHairstyle` fails (network, timeout, etc.), the red error banner shows but there's no retry button — user must retake photo.

- **Debug test code**: Verify `totalCredits = 99` is NOT still in CameraScreen.kt — should be `totalCredits = totalCredits`.

## Next Steps

1. **Create billing products in Google Play Console**: Go to Monetize → Products → Subscriptions (create `monthly_basic_20credits` and `monthly_premium_50credits`) and In-app products (create `topup_25credits` and `topup_50credits`). Match pricing to iOS.

2. **Complete Play Store listing**: Upload `.aab` to Production release track. Add screenshots, feature graphic, full description, and privacy policy URL. Finish remaining Data Safety questions.

3. **Upload AAB and submit for review**: Production → Create new release → Upload `app-release.aab` → Submit for review.

4. **Set up closed testing first (recommended)**: Before production, create a closed testing track to verify billing works end-to-end with real Google Play test accounts. Add test account emails in Play Console → License Testing.

5. **Fix FileProvider authority**: Ensure ResultScreen's share code uses `.fileprovider` (matching manifest) not `.provider`, or sharing will crash on first use.

## Useful Context

- **Craig's preferences**: Concise bullet-point formatting, systematic approach, prefers full file replacements over partial diffs (avoids paste errors).

- **The touch interception bug took 6+ sessions to solve**: AndroidView wrapping PreviewView is a known Compose interop pain point. The `TouchTransparentFrameLayout` pattern is the definitive fix — do not remove it.

- **Samsung SM-T220 quirks**: Android 12 tablet with limited RAM. Frame analysis at full 30fps caused process crashes. The 120ms throttle is necessary.

- **iOS app is the reference implementation**: When in doubt about behavior, match the iOS version. Same Firebase Cloud Functions, same hairstyle catalog, same pricing tiers.

- **Hairstyle image naming**: Android requires lowercase snake_case for drawable resources. iOS uses camelCase. The `imageName` field in `Hairstyle.kt` stores the Android-format name.

- **Business partner**: Menelik Simmonds is Craig's partner on WigOut.

- **Craig recently started a new job at Flix (FlixBus)** as Regional Sales and Agency Manager, so development time may be limited.

- **Related projects under Cloud Design Studio LLC**: CloudPriceDeals, CloudBooks, Cloud Dispatch Ops, PollPulse — all separate codebases.