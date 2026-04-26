---
name: context-update
description: Use after completing any meaningful work on a project to update its CLAUDE.md so the next session has fresh context. Bernie should invoke this proactively at the end of work sessions.
---

# Keeping Project Context Fresh

## When to update a project's CLAUDE.md

- After a deploy
- After a significant decision (architecture, vendor, pricing)
- When a feature ships or a bug is closed
- When a new blocker appears
- At the end of any work session that produced commits

## What to update

In the project's `CLAUDE.md`:

1. **Current Status** — replace stale state with new state
2. **Recent Changes** — append a dated bullet (`- 2026-04-26: Deployed dark theme refresh`)
3. **Open Issues** — add new, remove resolved
4. **Next Steps** — refresh based on what just happened

## What NOT to do

- Don't move things into `context/from-*.md` files — those are read-only history
- Don't bloat CLAUDE.md beyond ~200 lines — summarize, don't accumulate
- Don't duplicate info from sub-agent definitions — those load separately

## Template snippet

```markdown
## Recent Changes
- 2026-04-26: <what happened>
- 2026-04-22: <what happened>
- (keep last ~10, archive older to context/changelog.md)

## Open Issues
- [ ] <issue> — <next action>
- [x] <resolved issue> — <date resolved> ← remove on next update
```
