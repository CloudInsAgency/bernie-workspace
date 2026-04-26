---
name: firebase-ops
description: Use for any Firebase work — Auth, Firestore rules, Cloud Functions, Hosting, emulator suite, and Stripe integration patterns used in CloudBooks and Cloud Dispatch Ops.
---

# Firebase Operations

## Local development
- Always use the emulator suite: `firebase emulators:start`
- Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` in `.env.local`

## Firestore rules
- Test rules with `firebase emulators:exec --only firestore "npm test"`
- Default deny — explicit allow per collection
- Subscription state lives in `users/{uid}/subscription`

## Cloud Functions
- Deploy single function: `firebase deploy --only functions:functionName`
- Stripe webhook function should verify signature before any DB write
- Long-running tasks → use Cloud Tasks, not setTimeout

## Common patterns (Craig's stack)
- **Trial enforcement**: check `users/{uid}/trialEndsAt` server-side, not client
- **Plan limits**: store limits in `plans/{planId}` doc, gate features off subscription tier
- **Promo codes**: `promoCodes/{code}` with `usedBy` array

## Troubleshooting
- 403 on Firestore → rules issue, check emulator UI rules tab
- Function cold starts → consider min instances for Stripe webhook
- Auth state lost on reload → ensure persistence is set to `LOCAL`
