---
name: nano-banana-image-creative
description: Use whenever a project needs a polished, text-bearing, or diagram-style image generated automatically — infographics, UI mockups, brand assets, social posts with overlay text, hero images, charts, posters, product mockups, or any image where text legibility, character consistency, or precise composition matters. This skill calls Google's Gemini API (Nano Banana family) with Craig's API key and saves the resulting PNG to disk. Pairs with midjourney-ad-creative — use Nano Banana for polished/text-heavy work, use Midjourney for candid/native iPhone-feel work. Apply this skill when the agent needs a real image file produced, not just a prompt to paste.
---

# Nano Banana Image Creative — Generate Real Images, Not Just Prompts

This skill turns a creative brief into an actual PNG file on disk by calling
Google's Gemini API. Unlike `midjourney-ad-creative` which produces prompts
the user pastes manually, this skill **runs the generator script and saves
real images** to the project's workspace folder.

The skill assumes:

- A Gemini API key exists at `~/Bernie/.env` as `GEMINI_API_KEY=...`
- The generator script exists at `~/Bernie/.claude/skills/nano-banana-image-creative/generate.mjs`
- Both are installed; if they're not, tell Craig and stop.

---

## When to Use This Skill vs. Midjourney

This is the most important decision the skill encodes. The two skills are
complementary, not redundant.

### Use Nano Banana when:

- **The image needs legible text** (headlines on a poster, product names, callouts on an infographic, dollar amounts on a comparison chart, app UI labels). Nano Banana renders text correctly; Midjourney generates gibberish text.
- **The image is a diagram, infographic, or data visualization** — flow charts, before/after comparisons, process diagrams, market data charts.
- **The image is a UI mockup or product screenshot** — dashboard previews, app screens, web layouts.
- **Brand consistency matters across multiple frames** — Nano Banana keeps characters/objects consistent across edits (storyboards, ad sequences, multi-frame campaigns).
- **The aesthetic target is "professional polished"** — magazine editorial, brand hero shots, e-commerce product photography, agency portfolio assets.
- **The image needs accurate real-world content** — historical scenes, scientific diagrams, factually-anchored visuals.

### Use Midjourney instead when:

- **The image needs to look candid, native, iPhone-amateur** — the CloudPriceDeals "discovery moment" use case, Sabri Suby hyperdopamine ads, anything where "looks like a friend texted you this" is the goal.
- **The image needs realistic human faces with real-skin texture** — Midjourney still edges out Nano Banana on photorealistic people in unposed scenarios.
- **The aesthetic target is "doesn't look like an ad"** — Midjourney's `--style raw --stylize 25` is the better tool for this.

### When in doubt:

Ask Craig: *"Polished and text-heavy → Nano Banana. Candid and native-feeling → Midjourney. Which target are you going for?"*

---

## Per-Project Use Cases

Each project's CLAUDE.md may have specific needs. Here's where Nano Banana
typically wins per project:

**CloudPriceDeals**
- Composite ad creatives with overlay text ("UP TO 73% OFF", price callouts)
- "Today's deals" social cards with multiple products + prices
- Comparison graphics for the /compare pages
- ⚠️ Do NOT use Nano Banana for the candid "shopper at kitchen counter" hero shots — that's Midjourney's job.
- ⚠️ Compliance: never include the Amazon logo, branded packaging, or specific dollar prices that violate the Associates Operating Agreement.

**Cloud Insurance Agency**
- Storm/flood scenario diagrams with annotation
- Coverage breakdown infographics (what's included vs. excluded)
- Localized landing-page hero images for Essex County towns
- Agent profile cards with brand colors `#0A7DC2`, `#085A8D`, `#FFC107`

**Chris Burns Realtor**
- Monmouth County market data infographics
- Neighborhood comparison cards
- Listing thumbnails with overlay text (price reductions, "JUST LISTED")
- ⚠️ Phone number compliance: always (973) 953-5573, NEVER the dead 800 number.

**PollPulse**
- Daily poll-result graphics with vote percentages clearly displayed
- App Store screenshot mockups
- TikTok-ready square graphics with the question + result split

**WigOut**
- Hairstyle gallery thumbnails
- Before/after composite layouts
- Pricing/feature comparison cards
- ⚠️ Partner coordination: Strategic visual direction (branding, positioning) requires alignment with Menelik Simmonds before generating finals.

**ZeroSugar Club**
- Sugar-content comparison infographics ("How much sugar in...")
- Recipe cards with macro callouts
- AHA-cited fact graphics
- ⚠️ NEVER before/after weight loss imagery — Meta auto-flags. NEVER unverified sugar reduction claims — only AHA-cited facts.

**Cloud Dispatch Ops**
- Dashboard screenshots and UI mockups for the landing page
- Feature comparison tables (vs. competitors)
- Pricing-tier comparison graphics ($149.95 / $199.95 / $275)
- Sample dispatch board / Kanban screenshots

**Cloud Design Studio**
- Portfolio thumbnails for client work
- Service-tier comparison graphics
- Process/timeline infographics

---

## The Three Models — When to Pick Which

```
flash2  →  gemini-2.5-flash-image          (cheapest, fastest, 1024px)
nb2     →  gemini-3.1-flash-image-preview  (Nano Banana 2, up to 4K)
pro     →  gemini-3-pro-image-preview      (Nano Banana Pro, premium)
```

### Default to `flash2` for:

- Daily ad iteration / testing
- Drafts and concept exploration
- Social posts where 1024px is plenty
- High-volume work (10+ images in a session)

### Use `nb2` for:

- Final ad creatives that need 4K detail
- Hero images for landing pages
- Marketing assets with critical text rendering
- Anything that will be printed or scaled large

### Reserve `pro` for:

- Brand-defining hero work (homepage hero, App Store feature graphic)
- Complex multi-element compositions (4+ subjects, intricate layouts)
- Final brand-launch assets

**Cost discipline:** Default to `flash2` unless Craig explicitly asks for higher.
Pro is meaningfully more expensive on the paid tier; only invoke when justified.
If Bernie picks `pro` without explicit request, surface the choice: *"Using
Nano Banana Pro for this hero image — say 'use flash2' if you want cheaper."*

---

## Aspect Ratios (Same Discipline as Midjourney Skill)

| Use case | Aspect | Pixel guidance |
|----------|--------|----------------|
| Facebook feed | `1.91:1` (use `16:9` closest) | 1200×628 |
| Instagram feed (square) | `1:1` | 1080×1080 |
| Instagram feed (portrait — best CTR) | `4:5` | 1080×1350 |
| Stories / Reels / TikTok | `9:16` | 1080×1920 |
| YouTube thumbnail | `16:9` | 1280×720 |
| Pinterest | `4:5` (closest to 2:3) | 1000×1500 |
| Default for Meta cross-platform | `4:5` | — |

Pass to the script with `--aspect 4:5`.

---

## Prompt Patterns That Work With Nano Banana

Nano Banana follows complex instructions better than Midjourney. Be specific
and verbose — it rewards detail.

### Pattern 1 — Polished Marketing Hero

```
A high-end editorial photograph of [subject], [setting], [lighting],
shot on a professional camera with shallow depth of field, magazine
cover quality, [color palette specifics], [composition direction].
```

### Pattern 2 — Infographic with Text

```
Create an infographic showing [data/comparison]. Use a clean modern
layout with [color palette]. Title at top: "[exact title text]".
Three columns showing: [column 1], [column 2], [column 3]. Use
sans-serif typography. The text must be legible and accurate.
```

Nano Banana handles this; Midjourney cannot.

### Pattern 3 — Product Mockup

```
A photorealistic product mockup of [product] displayed [setting].
The product shows [specific details]. Lighting is [direction/quality].
Background is [description]. Render in [aspect ratio context].
```

### Pattern 4 — UI / Dashboard Screenshot

```
A clean SaaS dashboard interface showing [specific features visible].
Modern flat design, [primary color] accent. The interface displays:
[list of UI elements with exact text]. Render at retina quality with
crisp typography.
```

### Pattern 5 — Comparison Card / Social Post

```
A vertical social media graphic for [platform]. Top half: [content/image].
Bottom half: [comparison or callout text — be exact]. [Color palette]
background. The text "[exact wording]" must appear clearly.
```

---

## Negative Prompting Doesn't Work the Same Way

Unlike Midjourney's `--no` flag, Nano Banana doesn't accept negative prompts
as a separate parameter. **Phrase exclusions positively in the main prompt:**

- ❌ Midjourney: `--no text, watermark, logo`
- ✅ Nano Banana: `Clean composition with no text overlays, no watermarks, no brand logos visible.`

For your common compliance cases:

- *"No Amazon logo, no Amazon branding, no branded packaging visible. Generic unbranded boxes only."*
- *"No specific dollar prices on the image. Use percentage ranges only (e.g., 'Up to 70% off')."*
- *"No before/after body imagery. No weight scale. No body measurement visualizations."*

---

## How to Invoke the Generator

The generator script is at:
`~/Bernie/.claude/skills/nano-banana-image-creative/generate.mjs`

### Basic call

```bash
node ~/Bernie/.claude/skills/nano-banana-image-creative/generate.mjs \
  --prompt "your full prompt here" \
  --model flash2 \
  --aspect 4:5 \
  --out ~/Bernie/cloud-deals/workspace/hero-2026-04-27.png
```

### Multiple variants (max 4)

```bash
node ~/Bernie/.claude/skills/nano-banana-image-creative/generate.mjs \
  --prompt "..." \
  --n 3 \
  --out ~/Bernie/cloud-deals/workspace/hero.png
# Outputs: hero-v1.png, hero-v2.png, hero-v3.png
```

### Important: always save to the project's workspace/ folder

Default output path is `./workspace/nb-{timestamp}.png` if a `workspace/`
folder exists in the current directory. **When invoked for a project, always
pass an explicit `--out` path under that project's workspace folder** so the
file lands where Craig expects it and gets backed up by `bernie-save`.

Format: `~/Bernie/{project-slug}/workspace/{descriptive-name}-{date}.png`

Example: `~/Bernie/cloud-deals/workspace/hero-launch-2026-04-27.png`

---

## The End-to-End Workflow

When asked to produce an actual image (not just a prompt) for a project:

### Step 1 — Verify prerequisites
- Check `~/Bernie/.env` exists and contains `GEMINI_API_KEY`
- Check the generator script exists at the path above
- If either is missing, stop and tell Craig to install the skill properly.

### Step 2 — Read the project's CLAUDE.md
Pull brand colors, voice, dream-buyer details, compliance flags, and
allowed-claim list. Don't skip this even if Craig's request seems obvious.

### Step 3 — Decide Nano Banana vs Midjourney
Apply the decision tree at the top of this skill. If it's clearly a
Nano Banana job, proceed. If it's borderline, ask Craig.

### Step 4 — Pick the model
Default to `flash2`. Bump to `nb2` only if 4K detail or critical text
rendering matters. Use `pro` only on explicit request or for hero brand work.

### Step 5 — Pick the aspect ratio
Use the table above. Default to `4:5` for Meta cross-platform.

### Step 6 — Write the prompt
Use the appropriate pattern (1-5 above). Be verbose; Nano Banana rewards
specificity. Include exact text wording where text appears in the image.
Phrase exclusions positively.

### Step 7 — Construct the output path
`~/Bernie/{project-slug}/workspace/{descriptive-name}-{YYYY-MM-DD}.png`

If running multiple variants (`--n 2-4`), the script suffixes `-v1.png`,
`-v2.png`, etc. automatically.

### Step 8 — Run the script
Use the `bash` tool to execute the node command. Show Craig the command
before running if it's the first generation in the session, so they can
veto.

### Step 9 — Confirm and present
After the script completes, the final lines of stdout show the file paths
written. Tell Craig:
- Where the file(s) were saved
- Which model was used
- Aspect ratio and approximate pixel size
- Suggest a quick visual check before they ship/use the image

### Step 10 — Iterate if needed
If the result misses the brief, refine the prompt and run again. Common
fixes:
- **Image is too generic** → add more specific brand/aesthetic anchors
- **Text rendered wrong** → quote the exact text in double quotes in the prompt
- **Composition off** → describe composition explicitly ("subject in left third, negative space on right")
- **Color palette wrong** → cite hex codes directly

---

## Cost Guardrails

- **Default to `flash2`** unless explicitly requested otherwise. Free tier covers heavy daily use.
- **Default to `--n 1`** unless multiple variants are explicitly requested. Don't burn 4 generations when 1 will do.
- **Cap `--n` at 4** in any single invocation. If Craig wants more variants, run again with different prompts (which is more useful anyway than re-rolling the same prompt).
- **For Pro**, Bernie surfaces the choice explicitly: *"Using Nano Banana Pro for this — costs more on paid tier. Say 'use nb2' or 'use flash2' if you'd rather."*
- If a generation fails with a quota or rate-limit error, fall back to `flash2` or wait — never silently retry on a more expensive model.

---

## Compliance Reminders (Critical)

These rules carry over from each project's CLAUDE.md. The skill is the
compliance gatekeeper because images are higher-risk than text.

**Always exclude from generated imagery:**
- Brand logos that aren't Craig's (Amazon, Apple, Google, sports leagues, etc.)
- Trademarked characters or IP (Disney, Marvel, sports team logos, music IP)
- Specific Amazon prices (only ranges/percentages allowed)
- Real identifiable people other than Craig himself
- Weight-loss before/after imagery (Meta auto-flags)
- Health/medical claim visualizations not backed by cited research

**For ZeroSugar specifically:**
- AHA-cited science only — no exaggerated reduction claims in graphics
- No body imagery, no scale imagery, no measurement imagery

**For Cloud Insurance:**
- No specific claim payout numbers unless they're real cited industry stats
- No coverage promises in image text — coverage decisions are case-by-case

**For Chris Burns:**
- Phone in any image overlay must be (973) 953-5573, never the dead 800 number
- No specific "homes sold" or "average days on market" stats unless verified

**For WigOut:**
- Strategic visual direction requires Menelik partner alignment before generating finals
- No medical claims in graphics about hair products, scalp health, etc.

---

## What This Skill Doesn't Do

- **Doesn't replace `midjourney-ad-creative`.** Both stay installed. Different aesthetic targets.
- **Doesn't generate video.** For video, use the project-specific skills (HeyGen for PollPulse/WigOut, Veo for higher-end work). A `nano-banana-video` skill could be added later if Veo via Gemini becomes valuable; not built yet.
- **Doesn't composite images.** If a creative brief calls for primary+secondary layout (per Sabri framework), generate them as separate files and composite in Canva, Photoshop, or via the existing `generate-facebook-ads.mjs` script in CloudPriceDeals.
- **Doesn't replace Craig's creative judgment.** Craig still picks winners from variants and approves before shipping.

---

## Source

This skill is grounded in:
- Google AI Studio's Nano Banana documentation (ai.google.dev/gemini-api/docs/image-generation)
- The Nano Banana 2 / Pro release notes (Nov 2025 / 2026)
- Craig's existing `midjourney-ad-creative` skill (paired skill)
- Each project's CLAUDE.md compliance rules

---

## Recent Changes
- 2026-05-02: Skill created — paired with midjourney-ad-creative, full
  automation via Gemini API, all 3 Nano Banana models supported.
