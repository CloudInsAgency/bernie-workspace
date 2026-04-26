# WigOutApp — Handoff

## Purpose

WigOutApp is an iOS application that allows users to virtually try on different hairstyles using AI-powered image generation. Users select a hairstyle from a catalog of reference images, take a selfie, and the app uses InstantID (a face-preserving AI model) to generate a realistic preview of themselves with the selected hairstyle. The app is being developed by Cloud Design Studio LLC as a commercial product with a credit-based monetization model.

## Current Status

- **iOS App**: Built and running on device. Camera capture works, hairstyle selector works, but generation fails with "INTERNAL" error.

- **Firebase Cloud Functions**: Deployed to `wigoutapp` project with two functions:

  - `generateHairstyleWithReference` (main generation function)

  - `testInstantID` (test function)

- **Reference Images**: 10 hairstyle reference images uploaded to Firebase Storage in `reference-hairstyles/` folder with public read access.

- **Blocked**: Generation fails with "INTERNAL" error. Need to check Firebase Function logs to identify root cause. Likely issues: Replicate API key not accessible, InstantID model version mismatch, or network/permissions issue.

- **Minor UI Bug**: "Face Detected" green indicator not showing during camera preview.

## Tech Stack

- **iOS**: Swift 5, SwiftUI, AVFoundation (camera), Combine

- **Backend**: Firebase (Functions v2, Storage, Authentication)

- **Cloud Functions**: Node.js 24, axios for HTTP requests

- **AI Model**: InstantID via Replicate API (face-preserving style transfer)

- **IDE**: Xcode

- **Deployment**: Firebase CLI via `npx firebase-tools`

- **Package Management**: CocoaPods (iOS), npm (Functions)

## Key Decisions

- **Reference-based generation over text prompts**: Text prompts like "high bun" were unreliable and didn't consistently change hairstyles. Reference images provide exact visual targets for the AI, resulting in much better accuracy and consistency.

- **InstantID model selection**: Chosen for superior face preservation while transferring hairstyle. Better than generic Stable Diffusion for this use case.

- **Firebase Functions v2**: Required for longer timeouts (540 seconds) needed for AI generation. Uses `onCall` pattern for iOS integration.

- **Credit-based pricing model**: Planned tiers: $2.99/30 credits, $5.99/70 credits, $9.99/120 credits. Each generation costs 1 credit (~$0.10). Estimated 85% profit margin per generation.

- **Anonymous authentication**: Users sign in anonymously for simplicity; can upgrade to full auth later.

- **Legacy Firebase config fallback**: Using `functions.config().replicate?.api_key` as fallback since environment variables weren't working reliably.

## File & Repo Locations

- **Local Project**: `/Users/bpthomeyair15/Downloads/WigOutApp/`

- **Xcode Workspace**: `/Users/bpthomeyair15/Downloads/WigOutApp/WigOutApp.xcworkspace`

- **iOS Source Files**: `/Users/bpthomeyair15/Downloads/WigOutApp/WigOutApp/`

- **Cloud Functions**: `/Users/bpthomeyair15/Downloads/WigOutApp/functions/index.js`

- **Firebase Console**: https://console.firebase.google.com/project/wigoutapp/overview

- **Firebase Functions Logs**: https://console.firebase.google.com/project/wigoutapp/functions/list (then click "Logs" tab)

- **Firebase Storage**: https://console.firebase.google.com/project/wigoutapp/storage (reference images in `reference-hairstyles/`)

### Key iOS Files:

| File | Purpose |

|------|---------|

| `Hairstyle.swift` | Model with `referenceImageURL` property pointing to Firebase Storage |

| `CameraView.swift` | Main camera screen with hairstyle selector |

| `HairstylePickerView.swift` | Grid picker showing reference image previews |

| `ResultView.swift` | Shows captured photo with Retake/Generate buttons |

| `CameraManager.swift` | AVFoundation camera session management |

| `CameraPreviewView.swift` | UIViewRepresentable wrapper for camera preview |

| `FirebaseService.swift` | Handles upload, generation calls, and download |

## Credentials & IDs

- **Firebase Project ID**: `wigoutapp`

- **Firebase Storage Bucket**: `wigoutapp.firebasestorage.app`

- **Replicate API Key**: Stored in two places:

  - Firebase Functions config: `replicate.api_key` (set via `firebase functions:config:set`)

  - Environment file: `/Users/bpthomeyair15/Downloads/WigOutApp/functions/.env.local`

- **Apple Developer Account**: Cloud Design Studio LLC

- **Apple Developer Enrollment ID**: `NQQ3FH3U2J`

- **Firebase Auth User**: cfoskey3@gmail.com

- **InstantID Model Version** (Replicate): `a1d0c4e1fa5cc0e29d9d2f267c2bc37db8ad8a8e5d89e2e1fae7e90e72f9e4c5`

## Open Issues

1. **INTERNAL Error on Generate**: Cloud Function fails silently. Need to check Firebase Function logs to see actual error message. Suspected causes:

   - Replicate API key not being read correctly

   - InstantID model version string may be outdated

   - Storage bucket permissions for saving generated images

   

2. **Face Detection Indicator Missing**: The green "Face Detected" overlay that was present in the original app no longer appears. UI feedback issue only; camera still works.

3. **Firebase Functions Deprecation Warning**: `functions.config()` is deprecated and will stop working March 2026. Should migrate to `defineSecret()` or environment variables properly.

4. **npm Global Install Permission Error**: User's system has npm permission issues. Workaround is using `npx firebase-tools` instead of global `firebase` command.

5. **Loading Indicator Missing**: No spinner shown while generation is processing (takes 20-40 seconds).

## Next Steps

1. **Debug the INTERNAL error**: Navigate to Firebase Console → Functions → Logs. Find the error entry from the failed generation attempt. The log will show the actual error message (API key missing, model error, etc.).

2. **Verify Replicate API key accessibility**: In Terminal, run:

```bash

   npx firebase-tools functions:config:get

```

   Confirm `replicate.api_key` is set. If not, re-set it.

3. **Test with correct InstantID model**: The model version string may be outdated. Check https://replicate.com/zsxkib/instant-id for current version and update `index.js`.

4. **Add loading state to UI**: Update `CameraView.swift` to show a spinner/progress indicator while `isGenerating` is true.

5. **Restore Face Detection UI**: Check if `CameraManager` has face detection code that needs to be re-integrated, or add Vision framework face detection.

## Useful Context

- **Business Partner**: Menelik Simmonds (co-developer on WigOut)

- **Craig's Background**: 15+ years at Verizon, now founder of Cloud Design Studio LLC, recently accepted role at Flix (FlixBus)

- **Development Style**: Prefers concise bullet points, systematic step-by-step guidance, and explicit file paths

- **Terminal Quirks**: Using zsh on Mac. `nano` editor sometimes creates empty files when pasting large code blocks; the `cat > file << 'ENDCODE'` heredoc method works better

- **Firebase CLI**: Must use `npx firebase-tools` instead of `firebase` due to npm permission issues

- **Replicate Free Tier**: First $5 of API usage is free, enough for ~250-500 test generations

- **Reference Images Source**: Downloaded from Pexels/Unsplash (free commercial use)

- **Storage Rules**: `reference-hairstyles/` folder is publicly readable; `uploads/` and `generated/` require authentication

### Hairstyle Reference Images in Firebase Storage:

1. `high-bun.jpg` (Women)

2. `long-wavy-hair-portrait.jpg` (Women)

3. `bob-cut-hairstyle.jpg` (Women)

4. `pixie-cut-hairstyle.jpg` (Women)

5. `box-braids-hairstyle.jpg` (Natural)

6. `afro-hairstyle-portrait.jpg` (Natural)

7. `locs-hairstyle.jpg` (Natural)

8. `cornrows-hairstyle.jpg` (Natural)

9. `man-fade-haircut.jpg` (Men)

10. `buzz-cut-hairstyle.jpg` (Men)

Wigout 3 Folder Handoff

