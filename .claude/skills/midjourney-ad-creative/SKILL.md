---
name: midjourney-ad-creative
description: Use whenever a creative brief needs to be turned into actual ad imagery via Midjourney. Translates the marketing-creative skill's image descriptions into Midjourney-syntax prompts tuned for ad performance — pattern-interrupt aesthetic, native-feel framing, correct aspect ratios per platform, and per-project visual styles. Apply AFTER the marketing-creative skill produces a creative brief, when Craig needs the actual Midjourney prompt to paste into the platform.
---

# Midjourney Ad Creative — Translating Briefs Into Prompts

This skill takes a creative brief produced by the `marketing-creative` skill
and turns it into Midjourney prompts that produce ad-ready images. It's
specifically tuned for the Sabri Suby hyperdopamine-ad framework — meaning
the images should look **native, scroll-stopping, and not like ads.**

Use this skill AFTER the marketing-creative skill has produced a brief.
Don't try to write Midjourney prompts from scratch without going through
the brief first.

---

## The Big Idea: Make It Look Native, Not Polished

Midjourney's default output bias is toward **stunning, polished, hyper-real
photography.** For ads, that's a problem. Polished images look like ads.
Native-looking images look like content. Sabri's framework is explicit:
*"The first rule of advertising — do not make your ads look like ads."*

**This means most of your prompts should fight Midjourney's natural
tendencies** by adding modifiers like `iPhone photo`, `amateur photography`,
`unposed`, `candid`, `phone snapshot`, `imperfect lighting`, `flash photography`.

Save the polished cinematic look for cases where authority/luxury is the
goal (e.g., Cloud Insurance hero imagery, Cloud Design Studio agency site).

---

## The Three-Layer Prompt Structure

Every Midjourney ad prompt has three layers, in order:

```
[SUBJECT/SCENE] [STYLE/AESTHETIC] [TECHNICAL PARAMETERS]
```

### Layer 1: Subject/Scene (the WHAT)

Plain English description of what's in the frame. Be specific about:
- Who/what is the focal point
- What they're doing or holding
- The setting/environment
- Specific objects that create the pattern interrupt
- Facial expression / body language if a person is in frame

### Layer 2: Style/Aesthetic (the FEEL)

This is where you fight or embrace Midjourney's polish bias:

**For native/scroll-stopping ads (most cases):**
- `shot on iPhone`, `iPhone 15 photo`, `amateur photography`
- `candid`, `unposed`, `caught mid-action`
- `flash photography`, `harsh flash`, `direct flash`
- `slightly overexposed`, `imperfect lighting`
- `instagram story`, `phone snapshot`
- `mid-2010s digital camera`, `compact camera`

**For polished/authority ads (rare cases):**
- `cinematic`, `editorial photography`, `professional photography`
- `golden hour lighting`, `soft natural light`
- `high-end advertising`, `magazine photography`

### Layer 3: Technical Parameters (the HOW)

Midjourney's actual flag syntax. The critical ones:

- `--ar 1.91:1` for **Facebook feed ads (1200×628)**
- `--ar 1:1` for **Instagram feed ads (1080×1080)**
- `--ar 9:16` for **Stories/Reels/TikTok (1080×1920)**
- `--ar 4:5` for **Instagram feed portrait (1080×1350)** — often best CTR
- `--style raw` to suppress Midjourney's default polish bias (recommended for native ads)
- `--stylize 50` (lower = more literal, default = 100, max = 1000) — use 50-100 for native ads
- `--v 6.1` (or whatever the current version is — verify before use)
- `--no [thing]` to exclude common Midjourney failure modes (see below)

---

## Aspect Ratio Cheat Sheet (Memorize This)

| Platform & Placement | Pixel Dimensions | Midjourney Flag |
|----------------------|------------------|-----------------|
| Facebook feed | 1200×628 | `--ar 1.91:1` |
| Instagram feed (square) | 1080×1080 | `--ar 1:1` |
| Instagram feed (portrait — best CTR) | 1080×1350 | `--ar 4:5` |
| Stories / Reels / TikTok | 1080×1920 | `--ar 9:16` |
| Facebook right-column ad | 1200×628 (resized) | `--ar 1.91:1` |
| YouTube thumbnail | 1280×720 | `--ar 16:9` |
| Pinterest | 1000×1500 | `--ar 2:3` |
| LinkedIn feed | 1200×627 | `--ar 1.91:1` |

**Default to `--ar 4:5` for Meta if you're not sure** — Instagram portrait
4:5 takes up the most vertical screen real estate in feed and consistently
produces the highest CTR across most niches.

---

## The "--no" List for Ads

Midjourney has known failure modes that wreck ads. Always include some
version of `--no` to suppress them:

**Universal --no list for ad imagery:**
```
--no text, watermark, logo, signature, deformed hands, extra fingers,
mutated, stock photo aesthetic, generic, oversaturated
```

**For people in frame, add:**
```
--no airbrushed, plastic skin, model pose, fashion shoot, magazine cover
```

**For product shots, add:**
```
--no studio lighting, white backdrop, e-commerce style, isolated product
```

The `--no` list keeps Midjourney from regressing to its defaults.

---

## Per-Project Visual Styles

Each project has a baseline aesthetic. Pull from the project's CLAUDE.md
for color palette and brand details, then layer the style direction below.

### CloudPriceDeals
- **Aesthetic goal:** Raw native, looks like a real shopper's iPhone screenshot or candid mid-action photo
- **Default style additions:** `iPhone photo, candid, amateur photography, kitchen counter or living room setting, natural daylight from window, slight motion blur`
- **Avoid:** Studio lighting, polished e-commerce shots, models, hand-modeling
- **Pattern-interrupt go-to:** Person actually using/unboxing the product, casual home environment, screen-grab-style framing

### Cloud Insurance Agency
- **Aesthetic goal:** Authority + locality. Real Essex County feel.
- **Default style additions:** `New Jersey suburban setting, real homes, autumn or winter NJ weather, slightly overcast, documentary photography`
- **Avoid:** Generic stock-photo "happy family" imagery, palm trees, anything that doesn't read as Northeast US
- **Pattern-interrupt go-to:** Storm damage in real-looking homes, before/after with clear NJ markers (vinyl siding, dormer windows, basement flooding), local landmarks if useful

### Chris Burns Realtor
- **Aesthetic goal:** Local insider. Monmouth/Ocean/Middlesex County NJ specifically.
- **Default style additions:** `New Jersey shore-area home, suburban street, real estate photography but slightly candid`
- **Avoid:** Mansion fantasy, generic "luxury real estate" stock
- **Pattern-interrupt go-to:** A specific recognizable house style (NJ split-level, colonial, ranch), front porch, sold sign, key-handover moment

### PollPulse
- **Aesthetic goal:** Indie-builder vulnerability. Behind-the-scenes solo developer.
- **Default style additions:** `home office, laptop screen visible, casual clothing, evening lighting, slightly tired-looking, real apartment`
- **Avoid:** Slick startup-bro aesthetic, cofounder-pair imagery, glossy office spaces
- **Pattern-interrupt go-to:** First-person POV of a phone showing a poll, a single person at a laptop with a controversial poll result on screen

### WigOut
- **Aesthetic goal:** Visual transformation. Hairstyle confidence.
- **Default style additions:** `beauty/lifestyle photography, natural light, real-feeling Black women and men in everyday settings, salon-adjacent or home`
- **Avoid:** Stock-photo Black models in white-backdrop poses, the generic "woman touching her hair" trope
- **⚠️ Partner coordination flag:** Strategic visual direction for WigOut requires partner alignment with Menelik Simmonds (per `wigout/CLAUDE.md`). Any new branding direction in imagery should be flagged before generating finals.

### ZeroSugar Club
- **Aesthetic goal:** Science-credible + everyday relatable. Not weight-loss-product look.
- **Default style additions:** `home kitchen, real food, hand holding a phone with an app on screen, morning natural light`
- **Avoid:** Before/after body shots (Meta auto-flags), scale imagery, supplement-bottle aesthetic, any direct weight-loss claim visualization
- **Pattern-interrupt go-to:** Hand holding a familiar product (a soda can, a granola bar) with a phone showing a sugar-tracker reading, or a cluttered breakfast table with a coffee cup

### Cloud Dispatch Ops
- **Aesthetic goal:** Real working contractor / blue-collar service worker. Truck. Tools. Phone in hand.
- **Default style additions:** `HVAC technician or plumber, real work van or truck, work boots, hands holding a smartphone or tablet, residential driveway`
- **Avoid:** Suit-and-tie SaaS aesthetic, sterile office environments, stock-photo "happy customer" handshakes
- **Pattern-interrupt go-to:** A grizzled tradesman looking at his phone in surprise, a service van with the back doors open and gear visible, a Kanban board on a tablet next to a toolbox

### Cloud Design Studio
- **Aesthetic goal:** Indie agency. Real workspace. Solo founder energy.
- **Default style additions:** `home office or co-working space, multiple monitors, casual professional, real workspace not staged`
- **Avoid:** Glass-tower agency aesthetic, large team shots, generic "creative agency" stock
- **Pattern-interrupt go-to:** Behind-the-scenes of a website launch, real client sites visible on screen, solo developer at a kitchen table

---

## The Translation Workflow

When asked to produce a Midjourney prompt from a creative brief:

### Step 1 — Read the brief carefully
Pull these elements from the marketing-creative output:
- Primary image description
- Secondary image description (if specified)
- Project context (which CLAUDE.md applies)
- Any compliance flags that affect imagery (e.g., no Amazon logo, no
  before/after for ZeroSugar, no health claims visualized)

### Step 2 — Identify the platform
Determine the aspect ratio from the platform:
- "Facebook ad" without specification → default to `--ar 4:5` (Instagram-feed-friendly cross-platform)
- "Facebook feed specifically" → `--ar 1.91:1`
- "TikTok" / "Reels" / "Stories" → `--ar 9:16`

### Step 3 — Determine the aesthetic baseline
Pull the project's per-project style from the section above. If the
project isn't in that list, default to native iPhone-photo aesthetic.

### Step 4 — Write the three-layer prompt

```
[Subject/Scene in plain English, specific], [Style/aesthetic modifiers],
[Lighting], [Setting details] --ar [ratio] --style raw --stylize 50
--v 6.1 --no [failure modes]
```

### Step 5 — Generate variants if multiple needed

For an ad test, produce **3-4 prompts that vary one element of the same
concept** — same as the marketing-creative skill says about copy. Don't
generate 4 wildly different visual concepts. Pick the locked concept
from the brief and vary:
- Subject angle (close-up vs. wide)
- Setting (kitchen vs. living room)
- Time of day (morning vs. evening light)
- Or: composition (centered vs. rule-of-thirds)

### Step 6 — Add usage notes

After the prompts, include:
- **Imagine count:** how many `/imagine` runs this represents (each prompt = 1 imagine = 4 image variants)
- **Selection guidance:** what to look for when picking the winner from the 4 variants
- **Upscale recommendation:** which variant to upscale (U1/U2/U3/U4) if a clear winner emerges
- **Vary recommendation:** if the first batch is close but not quite right, what to "vary subtle" or "vary strong" toward

---

## Example: Translating a CloudPriceDeals Brief to Midjourney

Suppose the marketing-creative brief calls for:
> Primary image: Person in a kitchen looking at their phone with a
> surprised expression, kitchen gadget visible on counter. Pattern
> interrupt: the phone's screen is clearly visible showing a deal page.
> Secondary image: A close-up of the gadget itself, candid, on a
> cluttered counter.

**Translated Midjourney prompts:**

**Primary image (`--ar 4:5` for Meta cross-platform):**
```
A woman in her late 30s in a Northeast US suburban kitchen, holding her
iPhone close to her face with a slightly surprised expression, an
unboxed kitchen gadget on the counter beside her, morning light from a
window, slight kitchen clutter in background, candid mid-action, looks
like a friend texted you this photo, iPhone photo, unposed, harsh
direct flash, instagram story aesthetic --ar 4:5 --style raw --stylize
50 --v 6.1 --no text, watermark, logo, deformed hands, model pose,
studio lighting, polished, magazine cover, oversaturated
```

**Secondary image (close-up product shot, also `--ar 4:5`):**
```
Close-up overhead phone snapshot of an air fryer or kitchen gadget on
a slightly cluttered kitchen counter, coffee mug and a banana visible
in the corner of frame, real home not staged, natural window light,
candid, iPhone photo, slightly imperfect composition, looks like
someone took it quickly to text a friend --ar 4:5 --style raw --stylize
50 --v 6.1 --no text, watermark, logo, e-commerce style, white
backdrop, isolated product, studio lighting, polished
```

**Notes:**
- Imagine count: 2 (so 8 total image variants, ~$0.16-0.30 in Midjourney
  fast hours depending on plan)
- Selection guidance: Pick the variant where the woman's expression reads
  as "wait, what?" surprise rather than posed or fake-shocked. For the
  product close-up, pick the one with the most natural clutter, not the
  cleanest composition.
- Upscale recommendation: Upscale 1 winner from each prompt for ad use.
  Run `--vary subtle` on the winner if you want minor tweaks.
- If results feel too polished despite the modifiers, add `--stylize 25`
  (further reduces Midjourney's polish bias) or `--style raw` more
  aggressively in retry.

---

## Common Failure Modes & Fixes

**Failure: Image looks too polished / "stock photo"**
Fix: Add `--style raw`, lower `--stylize` to 25-50, add more amateur
modifiers (`flash photography`, `iPhone photo`, `unposed`, `candid`)

**Failure: People look airbrushed / fake**
Fix: Add `realistic skin texture, real human skin, pores visible, no
retouching` to subject layer; add `--no airbrushed, plastic skin,
model, beauty filter` to negatives

**Failure: Hands are deformed (Midjourney's classic weakness)**
Fix: Reduce hand visibility (have the person hold something, frame
hands out of shot, or have hands in pockets); always include `--no
deformed hands, extra fingers, mutated hands` in negatives

**Failure: Product looks like a 3D render, not real**
Fix: Add `real product, photographed, scuffed, used, lived-in`; avoid
words like "rendered," "CGI," "3D"; ensure no `--style raw` is helping
here too

**Failure: Doesn't look American / Northeast US**
Fix: Add specific markers — `Northeast US suburban home, vinyl siding,
fall leaves, NJ-style colonial home, American kitchen with stainless
steel appliances`. Midjourney defaults to vaguely-European aesthetics
without geographic anchors.

**Failure: Text appears in image despite --no text**
Fix: Midjourney generates fake gibberish text on phones, signs, etc. —
this is partially unavoidable. Either accept (since most ad viewers
don't zoom in) or generate without text-bearing surfaces visible.

**Failure: Brand logo of a real company appears**
Fix: Add specific `--no` for that brand or category. Midjourney
randomly generates fake-looking branded items. For Amazon, add `--no
amazon logo, branded packaging`.

---

## What This Skill Doesn't Do

- **Doesn't generate actual images** — only produces prompts. You paste
  them into Midjourney's web app or Discord. Midjourney does the rendering.
- **Doesn't replace human selection** — you still pick the winner from
  the 4 variants Midjourney returns per prompt.
- **Doesn't handle compositing** — if the ad needs the two images merged
  into a single frame (like the Sabri "primary + secondary" examples), you
  still need to composite them in Canva, Photoshop, or via the existing
  `generate-facebook-ads.mjs` script.
- **Doesn't replace platform-specific image generation skills** — for
  short-form video creative (TikTok / Reels), use HeyGen-based scripts
  per the PollPulse and WigOut workflows in those projects' CLAUDE.md
  files.

---

## When in Doubt

The whole skill collapses to one rule:

> **Make Midjourney produce images that look like real iPhone photos
> from real homes, not advertising imagery from a stock library.**

Everything in this skill serves that one rule. If your prompt isn't
producing native-feeling images, add more amateur modifiers and lower
the stylize value until it does.

---

## Recent Changes
- 2026-04-26: Skill created — paired with marketing-creative skill, tuned
  for Midjourney v6.1 syntax and Sabri Suby framework integration
