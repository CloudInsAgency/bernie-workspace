---
name: storekit-android-billing
description: Use for iOS StoreKit 2 and Android Play Billing work — subscription products, purchase verification, restore flows. Covers WigOut and PollPulse subscription patterns.
---

# Mobile Subscription Billing

## iOS — StoreKit 2

### Product setup
- Define products in App Store Connect first
- Match product IDs in code exactly (case-sensitive)
- Use `Product.products(for:)` to fetch

### Purchase flow
```swift
let result = try await product.purchase()
switch result {
case .success(let verification):
    // verify, then deliver content
case .userCancelled, .pending:
    // handle
@unknown default: break
}
```

### Verification
- Always verify with `checkVerified(_:)` — never trust unverified
- For server-side, send the `JWSRepresentation` to your backend

## Android — Play Billing (BillingClient)

### Setup
- Connect via `BillingClient.startConnection`
- Query products with `queryProductDetailsAsync`
- Launch billing flow with `launchBillingFlow`

### Verification
- Send purchase token to backend
- Backend calls `purchases.subscriptions.get` to verify
- Acknowledge purchase within 3 days or it auto-refunds

## Cross-platform parity (WigOut)
- Keep iOS product IDs and Android SKUs aligned by feature, not by name
- Maintain a mapping doc in `wigout/context/billing-skus.md`
- Price changes must be coordinated — App Store and Play Store don't sync

## Common bugs
- iOS: forgetting to call `Transaction.finish()` → ghost purchases
- Android: not acknowledging purchase → auto-refund after 3 days
- Both: restore flow doesn't restore — verify your entitlement check uses current transactions, not stored receipts
