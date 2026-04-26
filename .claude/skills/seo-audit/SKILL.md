---
name: seo-audit
description: Use for SEO audits and on-page optimization. Covers meta tags, structured data (Product, LocalBusiness), Open Graph, sitemap, and Google Search Console workflow.
---

# SEO Audit

## On-page checks
1. **Title tag** — unique, 50-60 chars, primary keyword first
2. **Meta description** — 150-160 chars, includes CTA
3. **H1** — exactly one per page, matches search intent
4. **Open Graph** — og:title, og:description, og:image (1200×630)
5. **Canonical** — set on every page

## Structured data
- Affiliate/product pages → `Product` schema with offers, aggregateRating
- Realtor/local biz → `LocalBusiness` + `RealEstateAgent` schema
- Validate at https://validator.schema.org

## Sitemap
- Auto-generated for Next.js sites via `next-sitemap`
- Submit to Search Console after major content changes
- Confirm `robots.txt` references sitemap URL

## Search Console workflow
1. Pull last 28 days of queries
2. Filter for impressions > 100, position 5-15 (the strike zone)
3. For each: improve title/H1/meta to match the query better
4. Track CTR before/after over 14 days

## Local SEO (Cloud Insurance, Chris Burns)
- Google Business Profile must match site NAP exactly
- Embed Google Map on contact page
- Get reviews — request after every closed transaction
