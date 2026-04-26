---
name: amazon-affiliate
description: Use for adding products to CloudPriceDeals, formatting Amazon Associates links, and complying with FTC disclosure requirements.
---

# Amazon Affiliate Links

## Link format
- Always include the Associates tracking tag in the URL
- Use the canonical product URL (no extra query params beyond the tag)
- Strip refs except your own

## Required disclosure
- "As an Amazon Associate I earn from qualifying purchases."
- Must appear on any page with affiliate links
- Already in CloudPriceDeals footer — verify before deploying new pages

## Adding a product
1. Get the Amazon URL with your associate tag
2. Verify the link works (incognito test)
3. Add to product catalog with: title, price snapshot, image URL, category
4. Confirm Product schema renders the link correctly
5. Build + verify locally before push

## Compliance gotchas
- Don't quote Amazon prices as fixed (they change) — say "as of [date]" or use dynamic price
- Don't use Amazon images without their image API or product API permissions
- Don't claim products as "best" without basis

## Tracking
- Check Associates dashboard weekly for clicks vs. conversions
- Products with 0 conversions in 30 days → consider rotating out
