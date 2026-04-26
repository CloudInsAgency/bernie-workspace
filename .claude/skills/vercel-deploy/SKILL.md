---
name: vercel-deploy
description: Use when deploying or troubleshooting any Next.js site on Vercel. Covers preview deploys, prod promotion, env var checks, and common build errors.
---

# Vercel Deployment

## Pre-flight checklist
1. `npm run build` locally — must pass
2. Check `.env.local` matches Vercel env vars (Settings → Environment Variables)
3. Confirm `next.config.js` is committed
4. No `console.log` in client components going to prod

## Deploy
- Push to `main` → auto-deploys to production
- Push to any other branch → preview URL
- Manual: `vercel --prod`

## Common errors
- **"Module not found"** → check case sensitivity (Mac is forgiving, Vercel is not)
- **"Event handlers cannot be passed to client component props"** → missing `"use client"` directive
- **URL-encoded folder names** → rename folders without spaces or special chars before pushing
- **Hydration mismatch** → check for `Date.now()` or `Math.random()` in render

## Post-deploy verification
1. Hit prod URL, check console for errors
2. Test critical user flow
3. Check Vercel logs for runtime errors
