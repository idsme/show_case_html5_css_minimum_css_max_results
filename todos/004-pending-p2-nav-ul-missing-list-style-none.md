---
status: pending
priority: p2
issue_id: "004"
tags: [code-review, css, consistency]
dependencies: []
---

# Missing `list-style: none` on `nav ul`

## Problem Statement
`nav ul` (main.css lines 171-175) has `margin: 0; padding: 0` but no `list-style: none`. Footer ul correctly includes it. Bullets are hidden only because `li` is `display: inline`, which is relying on a side effect.

## Findings
- **Source**: simplicity-reviewer, pattern-recognition

## Proposed Solutions
Add `list-style: none;` to `nav ul` rule.
- **Effort**: Small | **Risk**: None

## Technical Details
- **Affected files**: `main.css:171-175`
