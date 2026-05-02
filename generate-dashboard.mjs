#!/usr/bin/env node
// ============================================================================
// Bernie Dashboard Generator
// ============================================================================
// Reads all CLAUDE.md files across the workspace and generates a single-page
// HTML dashboard at ~/Bernie/dashboard.html. Run automatically by bernie-save.
//
// Run manually:  node ~/Bernie/generate-dashboard.mjs
// ============================================================================

import { readFile, writeFile, readdir, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

// Map of project slug → display name + sub-agent name
const PROJECTS = [
  { slug: 'cloud-deals',          name: 'Cloud Deals',           agent: 'cloud-deals-agent' },
  { slug: 'cloud-insurance',      name: 'Cloud Insurance',       agent: 'cloud-insurance-agent' },
  { slug: 'chris-burns-site',     name: 'Chris Burns Realtor',   agent: 'chris-burns-agent' },
  { slug: 'cloud-design-studio',  name: 'Cloud Design Studio',   agent: 'cds-agent' },
  { slug: 'zero-sugar-club',      name: 'Zero Sugar Club',       agent: 'zero-sugar-agent' },
  { slug: 'poll-pulse',           name: 'PollPulse',             agent: 'poll-pulse-agent' },
  { slug: 'wigout',               name: 'WigOut',                agent: 'wigout-agent' },
  { slug: 'dispatch-mvp',         name: 'Cloud Dispatch Ops',    agent: 'dispatch-agent' },
];

// ----------------------------------------------------------------------------
// Helpers to extract sections from each project's CLAUDE.md
// ----------------------------------------------------------------------------

function extractHealth(md) {
  // Looking for: **Health:** 🟢 LIVE / 🟡 IN PROGRESS / 🔴 BLOCKED
  const m = md.match(/\*\*Health:\*\*\s*(🟢|🟡|🔴)\s*([A-Z][A-Z\s\-_]*[A-Z])?/);
  if (!m) return { color: 'unknown', label: 'NOT TAGGED' };
  const emoji = m[1];
  const label = (m[2] || '').trim();
  const color = emoji === '🟢' ? 'green' : emoji === '🟡' ? 'yellow' : 'red';
  const defaults = { green: 'LIVE', yellow: 'IN PROGRESS', red: 'BLOCKED' };
  return { color, label: label || defaults[color] };
}

function extractStatusLine(md) {
  // Pull the first sentence of the "Current Status" section.
  const m = md.match(/##\s*Current Status\s*\n+([\s\S]*?)(?=\n##\s|\n---|\n$)/i);
  if (!m) return 'No status section found.';
  let body = m[1].trim();
  // Strip the **Health:** line if it leads
  body = body.replace(/^\*\*Health:\*\*[^\n]*\n+/, '').trim();
  // Take first non-empty paragraph, strip markdown formatting
  const para = body.split(/\n\s*\n/)[0];
  const clean = para
    .replace(/\*\*/g, '')
    .replace(/[`*_]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Truncate to ~180 chars for card display
  return clean.length > 180 ? clean.slice(0, 177) + '...' : clean;
}

function extractTopIssues(md) {
  // Looking for "## Open Issues" section, return first 3 items
  const m = md.match(/##\s*Open Issues[^\n]*\n+([\s\S]*?)(?=\n##\s|\n---)/i);
  if (!m) return [];
  const body = m[1];
  // Find numbered or bulleted top-level items (1. or - or *)
  // Specifically grab items that begin a line, not nested
  const items = [];
  const lines = body.split('\n');
  for (const line of lines) {
    // Match top-level numbered (1. **text**) or bullet (- **text**)
    const numbered = line.match(/^(\d+)\.\s+(.+)$/);
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (numbered) {
      items.push(numbered[2]);
    } else if (bullet) {
      items.push(bullet[1]);
    }
    if (items.length >= 3) break;
  }
  return items.map(i => i
    .replace(/\*\*/g, '')
    .replace(/[`*_]/g, '')
    .replace(/^—\s*/, '')
    .replace(/\.$/, '')
    .trim()
  ).map(i => i.length > 140 ? i.slice(0, 137) + '...' : i);
}

function extractLiveURL(md) {
  // Hunt for an https:// URL near "Site:" or "Production URL:" or "Deployed:"
  const patterns = [
    /(?:Site|Production URL|Deployed|Live URL|URL):\s*\[?([^\]\s]+\.(?:com|net|io|app|dev|co|org)[^\s\]]*)/i,
    /(?:Site|Production URL|Deployed|Live URL|URL):\s*(https?:\/\/[^\s\]]+)/i,
    /\*\*Site:\*\*\s*(https?:\/\/[^\s\]]+)/i,
    /\bhttps:\/\/(?!github\.com)([a-z0-9-]+\.(?:com|net|io|app|dev|co|org)[^\s\]'")]*)/i,
  ];
  for (const p of patterns) {
    const m = md.match(p);
    if (m) {
      let url = m[1] || m[0];
      if (!/^https?:/i.test(url)) url = 'https://' + url;
      // Clean trailing punctuation
      url = url.replace(/[).,;:]+$/, '');
      return url;
    }
  }
  return null;
}

function extractRecentChange(md) {
  const m = md.match(/##\s*Recent Changes\s*\n+([\s\S]*?)(?=\n##\s|\n---|\n$)/i);
  if (!m) return null;
  const lines = m[1].trim().split('\n');
  for (const line of lines) {
    const dated = line.match(/^[-*]\s+(\d{4}-\d{2}-\d{2}):?\s*(.+)$/);
    if (dated) {
      return { date: dated[1], note: dated[2].trim() };
    }
  }
  return null;
}

// ----------------------------------------------------------------------------
// Read each project, extract data
// ----------------------------------------------------------------------------

async function loadProject(p) {
  const path = join(ROOT, p.slug, 'CLAUDE.md');
  let md;
  try {
    md = await readFile(path, 'utf-8');
  } catch (e) {
    return { ...p, missing: true };
  }

  // Count context files
  let contextCount = 0;
  try {
    const ctxPath = join(ROOT, p.slug, 'context');
    const files = await readdir(ctxPath);
    contextCount = files.filter(f => f.endsWith('.md')).length;
  } catch (e) { /* no context dir */ }

  const health = extractHealth(md);
  const status = extractStatusLine(md);
  const issues = extractTopIssues(md);
  const liveURL = extractLiveURL(md);
  const recent = extractRecentChange(md);

  return {
    ...p,
    health,
    status,
    issues,
    liveURL,
    recent,
    contextCount,
  };
}

// ----------------------------------------------------------------------------
// Skills inventory
// ----------------------------------------------------------------------------

async function loadSkills() {
  const skillsDir = join(ROOT, '.claude', 'skills');
  try {
    const dirs = await readdir(skillsDir, { withFileTypes: true });
    return dirs
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort();
  } catch (e) {
    return [];
  }
}

// ----------------------------------------------------------------------------
// HTML escaping
// ----------------------------------------------------------------------------

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ----------------------------------------------------------------------------
// Render the HTML
// ----------------------------------------------------------------------------

function renderCard(p) {
  if (p.missing) {
    return `
      <article class="card card--unknown">
        <header class="card__header">
          <h2 class="card__title">${esc(p.name)}</h2>
          <span class="badge badge--unknown">NOT MIGRATED</span>
        </header>
        <p class="card__status">No CLAUDE.md found at ${esc(p.slug)}/CLAUDE.md</p>
      </article>`;
  }

  const issuesHTML = p.issues.length === 0
    ? '<li class="issues__empty">No open issues recorded.</li>'
    : p.issues.map(i => `<li>${esc(i)}</li>`).join('');

  const liveHTML = p.liveURL
    ? `<a class="card__url" href="${esc(p.liveURL)}" target="_blank" rel="noopener">${esc(p.liveURL.replace(/^https?:\/\//, ''))} ↗</a>`
    : '<span class="card__url card__url--none">Not deployed</span>';

  const recentHTML = p.recent
    ? `<time class="card__recent">Updated ${esc(p.recent.date)} — ${esc(p.recent.note)}</time>`
    : '<time class="card__recent card__recent--none">No recent changes recorded</time>';

  return `
    <article class="card card--${p.health.color}">
      <header class="card__header">
        <div>
          <h2 class="card__title">${esc(p.name)}</h2>
          <span class="card__agent">${esc(p.agent)} · ${p.contextCount} context file${p.contextCount === 1 ? '' : 's'}</span>
        </div>
        <span class="badge badge--${p.health.color}">${esc(p.health.label)}</span>
      </header>
      <p class="card__status">${esc(p.status)}</p>
      <div class="card__section">
        <h3 class="card__section-title">Top open issues</h3>
        <ol class="issues">${issuesHTML}</ol>
      </div>
      <footer class="card__footer">
        ${liveHTML}
        ${recentHTML}
      </footer>
    </article>`;
}

function renderHTML(projects, skills) {
  const generated = new Date();
  const generatedLabel = generated.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    year: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  let gitInfo = '';
  try {
    const sha = execSync('git rev-parse --short HEAD', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    gitInfo = ` · commit ${sha}`;
  } catch (e) { /* not a git repo or no commits */ }

  const cards = projects.map(renderCard).join('\n');
  const skillBadges = skills.map(s => `<span class="skill-badge">${esc(s)}</span>`).join('');

  const counts = projects.reduce((acc, p) => {
    if (p.missing) acc.unknown++;
    else acc[p.health.color] = (acc[p.health.color] || 0) + 1;
    return acc;
  }, { green: 0, yellow: 0, red: 0, unknown: 0 });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bernie · Workspace Dashboard</title>
<style>
  :root {
    --bg: #fafaf9;
    --surface: #ffffff;
    --border: #e7e5e4;
    --border-strong: #d6d3d1;
    --text: #1c1917;
    --text-muted: #57534e;
    --text-subtle: #78716c;
    --accent: #4353ff;
    --green: #16a34a;
    --green-soft: #dcfce7;
    --yellow: #ca8a04;
    --yellow-soft: #fef9c3;
    --red: #dc2626;
    --red-soft: #fee2e2;
    --unknown: #78716c;
    --unknown-soft: #f5f5f4;
    --shadow: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; color: var(--text); background: var(--bg); }
  body { max-width: 1400px; margin: 0 auto; padding: 48px 32px 96px; }
  header.page { margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
  .page__title { font-size: 32px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
  .page__subtitle { font-size: 15px; color: var(--text-muted); }
  .page__meta { font-size: 12px; color: var(--text-subtle); margin-top: 12px; font-variant-numeric: tabular-nums; }

  .summary { display: flex; gap: 24px; margin: 24px 0 40px; flex-wrap: wrap; }
  .summary__item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--text-muted); }
  .summary__count { font-size: 18px; font-weight: 600; color: var(--text); font-variant-numeric: tabular-nums; }
  .summary__dot { width: 10px; height: 10px; border-radius: 50%; }
  .summary__dot--green { background: var(--green); }
  .summary__dot--yellow { background: var(--yellow); }
  .summary__dot--red { background: var(--red); }
  .summary__dot--unknown { background: var(--unknown); }

  .skills { margin-bottom: 48px; }
  .skills__title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-subtle); margin-bottom: 12px; }
  .skills__grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-badge { font-size: 13px; font-family: 'SF Mono', Menlo, Consolas, monospace; padding: 4px 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 6px; color: var(--text-muted); }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; }

  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; box-shadow: var(--shadow); display: flex; flex-direction: column; gap: 16px; transition: border-color 0.15s, transform 0.15s; }
  .card:hover { border-color: var(--border-strong); transform: translateY(-1px); }
  .card--green { border-top: 3px solid var(--green); }
  .card--yellow { border-top: 3px solid var(--yellow); }
  .card--red { border-top: 3px solid var(--red); }
  .card--unknown { border-top: 3px solid var(--unknown); opacity: 0.85; }

  .card__header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .card__title { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
  .card__agent { display: block; margin-top: 2px; font-size: 12px; font-family: 'SF Mono', Menlo, Consolas, monospace; color: var(--text-subtle); }

  .badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; white-space: nowrap; }
  .badge--green { background: var(--green-soft); color: var(--green); }
  .badge--yellow { background: var(--yellow-soft); color: var(--yellow); }
  .badge--red { background: var(--red-soft); color: var(--red); }
  .badge--unknown { background: var(--unknown-soft); color: var(--unknown); }

  .card__status { font-size: 14px; line-height: 1.5; color: var(--text-muted); }

  .card__section-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-subtle); margin-bottom: 8px; }
  .issues { list-style: none; counter-reset: i; }
  .issues li { position: relative; padding: 6px 0 6px 24px; font-size: 13px; line-height: 1.45; color: var(--text); border-bottom: 1px solid var(--border); }
  .issues li:last-child { border-bottom: none; }
  .issues li::before { counter-increment: i; content: counter(i); position: absolute; left: 0; top: 6px; width: 18px; height: 18px; background: var(--bg); border: 1px solid var(--border); border-radius: 4px; font-size: 10px; font-weight: 600; color: var(--text-subtle); display: flex; align-items: center; justify-content: center; font-variant-numeric: tabular-nums; }
  .issues__empty { color: var(--text-subtle); font-style: italic; padding: 4px 0 !important; }
  .issues__empty::before { display: none !important; }

  .card__footer { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border); flex-wrap: wrap; }
  .card__url { font-size: 12px; font-family: 'SF Mono', Menlo, Consolas, monospace; color: var(--accent); text-decoration: none; }
  .card__url:hover { text-decoration: underline; }
  .card__url--none { color: var(--text-subtle); font-style: italic; }
  .card__recent { font-size: 11px; color: var(--text-subtle); font-variant-numeric: tabular-nums; }
  .card__recent--none { font-style: italic; }

  footer.page-footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--border); text-align: center; font-size: 12px; color: var(--text-subtle); }

  @media (max-width: 768px) {
    body { padding: 24px 16px 64px; }
    .grid { grid-template-columns: 1fr; }
    .page__title { font-size: 24px; }
  }
  @media print {
    body { padding: 16px; max-width: none; }
    .card { break-inside: avoid; box-shadow: none; }
  }
</style>
</head>
<body>
  <header class="page">
    <h1 class="page__title">Bernie</h1>
    <p class="page__subtitle">Cloud Design Studio · 8-project orchestrator workspace</p>
    <p class="page__meta">Generated ${esc(generatedLabel)}${esc(gitInfo)}</p>
  </header>

  <section class="summary">
    <div class="summary__item"><span class="summary__dot summary__dot--green"></span><span class="summary__count">${counts.green}</span> live</div>
    <div class="summary__item"><span class="summary__dot summary__dot--yellow"></span><span class="summary__count">${counts.yellow}</span> in progress</div>
    <div class="summary__item"><span class="summary__dot summary__dot--red"></span><span class="summary__count">${counts.red}</span> blocked</div>
    ${counts.unknown ? `<div class="summary__item"><span class="summary__dot summary__dot--unknown"></span><span class="summary__count">${counts.unknown}</span> untagged</div>` : ''}
  </section>

  <section class="skills">
    <h2 class="skills__title">Available skills (${skills.length})</h2>
    <div class="skills__grid">${skillBadges}</div>
  </section>

  <section class="grid">
    ${cards}
  </section>

  <footer class="page-footer">
    Auto-generated by <code>generate-dashboard.mjs</code> on bernie-save · iCloud-synced · GitHub-versioned
  </footer>
</body>
</html>
`;
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
  const projects = await Promise.all(PROJECTS.map(loadProject));
  const skills = await loadSkills();
  const html = renderHTML(projects, skills);
  const outPath = join(ROOT, 'dashboard.html');
  await writeFile(outPath, html);

  // Brief CLI summary
  console.log('Bernie dashboard regenerated:');
  for (const p of projects) {
    if (p.missing) {
      console.log(`  · ${p.name.padEnd(24)} (no CLAUDE.md)`);
    } else {
      const tag = p.health.color === 'green' ? '🟢' : p.health.color === 'yellow' ? '🟡' : p.health.color === 'red' ? '🔴' : '⚪';
      console.log(`  ${tag} ${p.name.padEnd(24)} ${p.health.label}`);
    }
  }
  console.log(`Wrote ${outPath}`);
}

main().catch(e => {
  console.error('Dashboard generation failed:', e);
  process.exit(1);
});
