---
status: pending
priority: p2
issue_id: "001"
tags: [code-review, architecture, dead-code]
dependencies: []
---

# Dead icons.svg and false "Zero dependencies" claim

## Problem Statement
`icons.svg` is no longer referenced by any HTML page (switched to Font Awesome CDN), but it still exists in the repo and is copied to `_site/` by `static.yml` line 39. Meanwhile, `about.html` line 73 claims "Zero dependencies -- no CDN" which is false.

## Findings
- **Source**: architecture-strategist, simplicity-reviewer, learnings-researcher
- `icons.svg` (33 lines) is dead code
- `static.yml` line 39 copies `icons.svg` to `_site/` unnecessarily
- `about.html` line 73: `<li>Zero dependencies -- no CDN, no build tools</li>` is factually wrong

## Proposed Solutions

### Option A: Delete icons.svg, fix claim
- Delete `icons.svg`, remove from `static.yml` copy step, update about.html text
- **Pros**: Clean, honest
- **Cons**: None
- **Effort**: Small
- **Risk**: None

### Option B: Revert to icons.svg, remove Font Awesome
- Switch back to SVG sprite, remove CDN dependency, make claim true
- **Pros**: Zero external dependencies, smaller payload, tighter CSP
- **Cons**: More work, user explicitly chose Font Awesome
- **Effort**: Medium
- **Risk**: Low

## Recommended Action
(to be filled during triage)

## Technical Details
- **Affected files**: `icons.svg`, `.github/workflows/static.yml:39`, `about.html:73`

## Acceptance Criteria
- [ ] No dead files in repo or deployment
- [ ] About page text matches reality

## Work Log
| Date | Action | Learnings |
|------|--------|-----------|
| 2026-03-09 | Created from code review | Multiple agents flagged this |

## Resources
- Past solution: `docs/solutions/code-quality/html-css-showcase-validation-and-quality-fixes.md`
