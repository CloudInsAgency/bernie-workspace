#!/usr/bin/env node
// ============================================================================
// Nano Banana Image Generator
// ============================================================================
// Calls the Gemini API to generate images via the Nano Banana model family
// and saves the result to disk. Reads GEMINI_API_KEY from ~/Bernie/.env.
//
// Usage:
//   node generate.mjs --prompt "your prompt" \
//                     [--model flash2|nb2|pro] \
//                     [--out path/to/output.png] \
//                     [--aspect 1:1|4:5|16:9|9:16|4:3|3:4] \
//                     [--n 1]
//
// Defaults:
//   --model  flash2     (cheapest, fastest, gemini-2.5-flash-image)
//   --out    workspace/nb-{timestamp}.png
//   --aspect 1:1
//   --n      1
//
// Models:
//   flash2 = gemini-2.5-flash-image          (Nano Banana original, 1024px)
//   nb2    = gemini-3.1-flash-image-preview  (Nano Banana 2, up to 4K)
//   pro    = gemini-3-pro-image-preview      (Nano Banana Pro, premium)
// ============================================================================

import { writeFile, mkdir, readFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { existsSync } from 'fs';
import { homedir } from 'os';

// ----------------------------------------------------------------------------
// Load API key from ~/Bernie/.env (KEY=value format, one per line)
// ----------------------------------------------------------------------------

async function loadEnv() {
  const envPath = join(homedir(), 'Bernie', '.env');
  if (!existsSync(envPath)) {
    console.error(`ERROR: ${envPath} not found.`);
    console.error('Create it with: echo "GEMINI_API_KEY=your_key" > ~/Bernie/.env');
    process.exit(1);
  }
  const text = await readFile(envPath, 'utf-8');
  const env = {};
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  if (!env.GEMINI_API_KEY) {
    console.error('ERROR: GEMINI_API_KEY missing from ~/Bernie/.env');
    process.exit(1);
  }
  return env;
}

// ----------------------------------------------------------------------------
// Parse CLI args
// ----------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { model: 'flash2', aspect: '1:1', n: 1 };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--prompt')      args.prompt = argv[++i];
    else if (a === '--model')  args.model  = argv[++i];
    else if (a === '--out')    args.out    = argv[++i];
    else if (a === '--aspect') args.aspect = argv[++i];
    else if (a === '--n')      args.n      = parseInt(argv[++i], 10);
    else if (a === '--help' || a === '-h') { printHelp(); process.exit(0); }
  }
  if (!args.prompt) { printHelp(); process.exit(1); }
  return args;
}

function printHelp() {
  console.log(`
Nano Banana Image Generator

Usage:
  node generate.mjs --prompt "your prompt here" [options]

Options:
  --prompt   Text prompt (required)
  --model    flash2 | nb2 | pro    (default: flash2)
  --out      Output path           (default: workspace/nb-{timestamp}.png)
  --aspect   1:1 | 4:5 | 16:9 | 9:16 | 4:3 | 3:4   (default: 1:1)
  --n        Number of variants    (default: 1, max: 4)
  --help     Show this message

Cost guardrails:
  flash2: free tier covers heavy use
  nb2:    free tier available, ~\$0.04/image on paid tier
  pro:    pricier; only use for hero/brand work
`);
}

// ----------------------------------------------------------------------------
// Model resolver
// ----------------------------------------------------------------------------

const MODEL_MAP = {
  flash2: 'gemini-2.5-flash-image',
  nb2:    'gemini-3.1-flash-image-preview',
  pro:    'gemini-3-pro-image-preview',
};

function resolveModel(alias) {
  const m = MODEL_MAP[alias];
  if (!m) {
    console.error(`Unknown --model "${alias}". Use one of: flash2, nb2, pro`);
    process.exit(1);
  }
  return m;
}

// ----------------------------------------------------------------------------
// Aspect ratio resolver — Gemini API accepts ratios in imageConfig
// ----------------------------------------------------------------------------

function resolveAspect(ratio) {
  const valid = ['1:1', '4:5', '5:4', '16:9', '9:16', '4:3', '3:4', '21:9', '9:21'];
  if (!valid.includes(ratio)) {
    console.error(`Unknown --aspect "${ratio}". Use one of: ${valid.join(', ')}`);
    process.exit(1);
  }
  return ratio;
}

// ----------------------------------------------------------------------------
// Default output path
// ----------------------------------------------------------------------------

function defaultOutPath() {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').replace(/T/, '_').replace(/Z$/, '');
  const cwd = process.cwd();
  // Default to ./workspace/ if cwd has one, else cwd
  const wsPath = join(cwd, 'workspace');
  const dir = existsSync(wsPath) ? wsPath : cwd;
  return join(dir, `nb-${ts}.png`);
}

// ----------------------------------------------------------------------------
// Call the Gemini API
// ----------------------------------------------------------------------------

async function generateImage({ apiKey, model, prompt, aspect }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      { role: 'user', parts: [{ text: prompt }] },
    ],
    generationConfig: {
      responseModalities: ['IMAGE'],
      imageConfig: { aspectRatio: aspect },
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API ${res.status}: ${errText}`);
  }

  const data = await res.json();

  // Find image part(s) in the response
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const imageParts = parts.filter(p => p.inlineData?.data);
  if (imageParts.length === 0) {
    const textParts = parts.filter(p => p.text).map(p => p.text).join('\n');
    throw new Error(`No image in response.${textParts ? ' Model said: ' + textParts : ''}`);
  }

  // Return base64-decoded buffers
  return imageParts.map(p => Buffer.from(p.inlineData.data, 'base64'));
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  const env = await loadEnv();
  const model = resolveModel(args.model);
  const aspect = resolveAspect(args.aspect);
  const n = Math.min(Math.max(args.n || 1, 1), 4);

  console.log(`Nano Banana → model=${args.model} (${model}) · aspect=${aspect} · n=${n}`);
  console.log(`Prompt: ${args.prompt.slice(0, 100)}${args.prompt.length > 100 ? '...' : ''}`);

  const outPaths = [];
  for (let i = 0; i < n; i++) {
    const buffers = await generateImage({
      apiKey: env.GEMINI_API_KEY,
      model,
      prompt: args.prompt,
      aspect,
    });

    // Use first image returned per call (Gemini returns one per request)
    const buf = buffers[0];

    let outPath = args.out || defaultOutPath();
    if (n > 1) {
      // Suffix the variant index if generating multiples
      outPath = outPath.replace(/(\.[^.]+)?$/, `-v${i + 1}$1`);
      if (!/\.\w+$/.test(outPath)) outPath += '.png';
    }
    outPath = resolve(outPath);
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, buf);
    outPaths.push(outPath);
    console.log(`  ✓ Wrote ${outPath} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  // Final summary line — the file path is what Bernie shows the user
  console.log(`\nSaved ${outPaths.length} image${outPaths.length === 1 ? '' : 's'}:`);
  for (const p of outPaths) console.log(`  ${p}`);
}

main().catch(e => {
  console.error('\nGeneration failed:', e.message);
  process.exit(1);
});
