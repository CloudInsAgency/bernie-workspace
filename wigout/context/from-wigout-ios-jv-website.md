# WigOut App & Website — Handoff

## Purpose

WigOut is an AI-powered iOS hairstyle try-on app that allows users to see how they would look with different hairstyles before committing to a salon visit. Users snap a selfie, browse 99+ curated hairstyles (braids, locs, fades, silk press, etc.), and receive a realistic AI-generated preview in seconds. The project includes the iOS app (Swift/SwiftUI), Firebase backend, Cloud Functions for AI processing via Replicate, and a marketing website hosted on GitHub Pages. This is a joint venture between Craig Foskey (Cloud Design Studio LLC) and Menelik Simmonds.

## Current Status

**Deployed & Live:**

- Marketing website live at wigoutstyle.com (GitHub Pages)

- Website includes: index.html (with step images), support.html, privacy.html

- 99 hairstyles implemented with local Assets (migrated from Firebase Storage)

- 2-column grid layout with 150x180px images for better mobile visibility

- Support email updated to wigoutcontact@gmail.com across all pages

**In Progress:**

- Apple Developer Program enrollment pending organization verification (Enrollment ID: NQQ3FH3U2J)

- App Store submission preparation

- Marketing video content creation (Veo 3 prompts and HeyGen scripts created)

**Completed Recently:**

- Updated index.html with promotional images (ChooseAStyle.png, TakeASelfie.png, SeeYourNewLook.png)

- Updated support.html with new email (2 locations)

- Updated privacy.html with new email (1 location)

- Created multiple video ad concepts and scripts for YouTube, Instagram, TikTok

## Tech Stack

**iOS App:**

- Swift / SwiftUI

- Firebase Authentication

- Firebase Firestore (user data, credits, subscriptions)

- Firebase Storage (temporary photo uploads for processing)

- Firebase Cloud Functions (Node.js)

- Replicate API (InstantID AI model for hairstyle generation)

- StoreKit 2 (subscriptions: $3.99/month tiers)

**Website:**

- Pure HTML5 / CSS3 (no frameworks)

- Google Fonts (Playfair Display, DM Sans)

- GitHub Pages hosting (free)

- Custom domain: wigoutstyle.com

**Design:**

- Color scheme: Gold (#E8A849), Deep Brown (#2A1810), Warm Cream (#FFF8EE)

- Fonts: Playfair Display (headings), DM Sans (body)

- Mobile-responsive design

## Key Decisions

- **Local Assets over Firebase Storage**: Migrated 99 hairstyle images to local Assets.xcassets for instant loading (10x faster) and offline capability. Trade-off: larger app size (~150-200MB vs ~50MB)

- **2-column grid layout**: Changed from 3-column to 2-column in HairstylePickerView for 50% larger images (150x180px) improving mobile visibility and touch targets

- **Subcategory organization**: 99 hairstyles organized into 2 main categories (Textured Hair, Straight & Wavy) with 16 subcategories for better browsing

- **Backward compatibility preserved**: All original Hairstyle struct properties maintained; new features (subcategory, imageName, assetImage) are additive

- **GitHub Pages for website**: Free hosting, reliable, easy updates via git commits

- **Joint ownership structure**: App owned by partnership (Menelik Simmonds & Craig Foskey), may formalize as separate LLC for clean legal structure

## File & Repo Locations

**iOS App:**

- Local path: `/Users/bpthomeyair15/Downloads/WigOutApp/`

- Key files:

  - `Hairstyle.swift` → Replace with `Hairstyle_COMPLETE.swift`

  - `HairstylePickerView.swift` → Replace with `HairstylePickerView_COMPLETE.swift`

  - `ContactUsView.swift` → Update website URL after deployment

**Website:**

- GitHub repo: `wigout-website` (or similar name on user's GitHub)

- Live URL: https://wigoutstyle.com

- Files:

  - `index.html` - Homepage with step images

  - `support.html` - FAQ and contact (email: wigoutcontact@gmail.com)

  - `privacy.html` - Privacy policy (email: wigoutcontact@gmail.com)

  - `styles.css` - All styling

  - `assets/` folder: icon.png, ChooseAStyle.png, TakeASelfie.png, SeeYourNewLook.png, WigOutAd.mp4, WigOutAd2.mp4

**Firebase Console:**

- Project for authentication, Firestore, Storage, Cloud Functions

**Replicate:**

- AI model hosting for InstantID hairstyle generation

## Credentials & IDs

**Apple Developer:**

- Enrollment ID: NQQ3FH3U2J (Cloud Design Studio LLC)

- Status: Pending organization verification

**Cloud Design Studio LLC:**

- EIN: [stored securely, not in code]

- NJ Entity ID: 0451424777

**Firebase:**

- Project credentials in Firebase Console

- Environment variables needed: Firebase config keys

**Replicate:**

- API key stored as environment variable in Cloud Functions

**Contact:**

- Support email: wigoutcontact@gmail.com

## Open Issues

- **GitHub rate limiting**: User experienced "Too many requests" error, likely from multiple GitHub accounts on same IP. Solution: use single primary GitHub account, wait 30 minutes for reset

- **Apple Developer verification pending**: Organization enrollment submitted, awaiting Apple's verification of Cloud Design Studio LLC

- **Enum duplicate raw value error**: Fixed by changing subcategory raw values from "Updos" to "Updos (Textured)" and "Updos (Straight)"

- **Image naming convention**: Textured styles end with "1" (e.g., Box_Braids1), Straight styles end with "2" (e.g., Blunt_Cut2) - must be consistent in Assets.xcassets

- **Partnership structure**: Two LLCs collaborating - may need formal Joint Venture Agreement or new LLC for clean ownership

## Next Steps

1. **Complete Apple Developer enrollment**: Follow up on organization verification, provide any requested documentation to Apple

2. **Add 99 hairstyle images to Assets.xcassets**: Drag PNG files into Xcode Assets catalog following naming convention (Box_Braids1.png, etc.)

3. **Replace Swift files and test build**: Replace Hairstyle.swift and HairstylePickerView.swift with complete versions, verify all 99 styles display correctly

4. **Update ContactUsView with website URL**: Change `websiteURL` constant to actual GitHub Pages URL (e.g., https://wigoutstyle.com)

5. **Create and publish marketing videos**: Use Veo 3 prompts and HeyGen scripts to generate video ads, edit in CapCut, publish to YouTube/Instagram/TikTok

## Useful Context

**Hairstyle Categories:**

- Textured Hair (57 styles): Braids (14), Twists (6), Locs (4), Natural (11), Straight (4), Weave/Wigs (8), Ponytails (4), Updos (6)

- Straight & Wavy (42 styles): Haircuts (11), Bangs (2), Blowouts (5), Styling (5), Color (10), Extensions (4), Wigs (2), Updos (3)

**Video Ad Concepts Created:**

- "The FaceTime Call" - Bestie engagement announcement

- "The Job Interview" - Professional transformation

- "The Salon Chair" - Pure visual storytelling (no devices)

- "Mirror Moment" - Magic mirror transformation

- "The Street Stop" - Viral street interview style

- "The Honest Review" - Authentic testimonial

- "GRWM Birthday" - Get ready with me format

**Social Media Presence:**

- Instagram bio options created

- YouTube/TikTok/Instagram descriptions created

- Hashtag strategies documented

**Craig's Preferences:**

- Prefers concise bullet-point formatting

- Systematic, trackable approach

- Free/low-cost deployment (GitHub Pages, Firebase free tier, Vercel)

**Related Projects:**

- CloudPriceDeals (cloudpricedeals.com) - Affiliate deal aggregation

- CloudBooks - SaaS accounting app

- Cloud Dispatch Ops - Field service dispatch platform

- PollPulse - Daily opinion polling app

- A&G Insurance Group LLC - Partnership dispute ongoing

**Previous Transcript:**

- Full conversation history at: `/mnt/transcripts/2026-02-09-08-22-44-wigout-99-hairstyles-2column-layout.txt`

WigOut Android 5 Folder Handoff

