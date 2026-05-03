# Nano Banana Image Creative — Install

This skill lets Bernie generate real PNG images by calling Google's Gemini
API with your saved API key. Pairs with the existing
`midjourney-ad-creative` skill (different aesthetic targets, both stay
installed).

## What's in this bundle

```
nano-banana-image-creative/
├── SKILL.md         The skill instructions Bernie loads
├── generate.mjs     The Node.js script that calls the API
└── INSTALL.md       (this file)
```

---

## Install (3 steps, ~5 minutes)

### Step 1 — Drop the skill into Bernie's skills folder

In Terminal:

```bash
cd ~/Downloads
unzip -o nano-banana-skill.zip
cp -r nano-banana-image-creative ~/Bernie/.claude/skills/
ls ~/Bernie/.claude/skills/
```

You should see `nano-banana-image-creative` listed alongside your existing
8 skills.

### Step 2 — Save your Gemini API key to ~/Bernie/.env

Open Terminal. Replace `PASTE_YOUR_KEY_HERE` with the new Gemini API key
you saved in your password manager:

```bash
echo 'GEMINI_API_KEY=PASTE_YOUR_KEY_HERE' > ~/Bernie/.env
```

After running, verify:

```bash
cat ~/Bernie/.env
```

Should print one line: `GEMINI_API_KEY=AIza...` (your full key).

### Step 3 — Make sure .env is git-ignored

Critical safety check. The `.env` file with your API key must NEVER be
pushed to GitHub. Run:

```bash
grep -q "^\.env$" ~/Bernie/.gitignore || echo ".env" >> ~/Bernie/.gitignore
cat ~/Bernie/.gitignore
```

You should see `.env` in the output. If it's not there, the second command
adds it automatically.

Then verify git won't track it:

```bash
cd ~/Bernie && git status
```

`.env` should NOT appear in the output. If it does appear under "Untracked
files" or "Changes," stop — something is wrong with the gitignore. Don't
proceed to a `bernie-save` until this is resolved.

---

## Smoke test (run this BEFORE asking Bernie to use the skill)

```bash
node ~/Bernie/.claude/skills/nano-banana-image-creative/generate.mjs \
  --prompt "A simple test image: a clean kitchen counter with morning light" \
  --model flash2 \
  --aspect 1:1 \
  --out ~/Bernie/test-nb.png
```

Expected output:
```
Nano Banana → model=flash2 (gemini-2.5-flash-image) · aspect=1:1 · n=1
Prompt: A simple test image: a clean kitchen counter with morning light
  ✓ Wrote /Users/.../Bernie/test-nb.png (XXX KB)

Saved 1 image:
  /Users/.../Bernie/test-nb.png
```

Open the result:

```bash
open ~/Bernie/test-nb.png
```

You should see a generated image of a kitchen counter. If it works, delete
the test file before committing:

```bash
rm ~/Bernie/test-nb.png
```

If it fails, check:
- `.env` exists at `~/Bernie/.env` and contains `GEMINI_API_KEY=...`
- The key is valid (no typos, no extra spaces, no quotes around it)
- Internet is working
- The error message — usually pinpoints the issue (quota, auth, model name)

---

## After install — commit the skill (NOT the .env)

```bash
bernie-save
```

Verify the commit doesn't include `.env`:

```bash
cd ~/Bernie && git log --stat -1
```

Should list: `SKILL.md`, `generate.mjs`, `INSTALL.md` — but NOT `.env`.

---

## Test in Bernie

Once installed and smoke-tested, give Bernie a real test:

```
Bernie, use the nano-banana-image-creative skill to generate a Cloud
Dispatch Ops landing-page hero image showing a clean SaaS dashboard
mockup. Use Nano Banana 2 (nb2) for higher quality. 16:9 aspect for
landing page hero. Save it to the dispatch-mvp workspace folder with
a dated filename.
```

Bernie should:
1. Load the SKILL.md and the dispatch-mvp CLAUDE.md
2. Compose a prompt using the patterns in the skill (UI mockup pattern)
3. Run the generate.mjs command via bash
4. Confirm the file was saved
5. Tell you the file path

Open the result and see if the dashboard mockup looks reasonable. If it
does — the full pipeline works end-to-end.

---

## Maintenance notes

**If the API key ever changes** (rotation, regeneration after a leak, new
key for a different project): just update `~/Bernie/.env`. Bernie picks
up the new value on the next generation.

**If the Gemini API model names change** (Google sometimes renames previews
to GA): edit `MODEL_MAP` at the top of `generate.mjs`. The aliases stay
the same (`flash2`, `nb2`, `pro`) so the skill instructions still apply.

**If Bernie keeps picking the wrong model**: tell it explicitly, e.g.,
"always default to flash2 unless I ask for nb2 or pro." Bernie can write
that to memory and it'll persist across sessions.

**If you start hitting free-tier quotas** (rare, but possible with heavy
use): enable billing on the Google AI Studio Spend page. Costs are
typically pennies per image at that point.

---

## Security reminders

- **`.env` lives only on your Mac and in iCloud Drive.** It's git-ignored, so it never goes to GitHub.
- **If you ever leak your API key** (paste it in chat, screenshot it publicly, commit it accidentally), revoke it immediately at https://aistudio.google.com/apikey and generate a fresh one.
- **The `Authorization` header in the API request uses your key.** Don't share screenshots of `generate.mjs` running with the URL visible if the URL contains `?key=...` (it does, by default — Gemini accepts the key as a query param).
