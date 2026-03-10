---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, css, accessibility]
dependencies: []
---

# `aria-current="page"` has no CSS rule

## Problem Statement
All 3 pages use `aria-current="page"` on the active nav link, but there is no CSS rule targeting `[aria-current="page"]`. The attribute does nothing visually. A border-bottom rule was added earlier but appears to have been lost.

## Findings
- **Source**: simplicity-reviewer

## Proposed Solutions
Add to nav section in main.css:
```css
nav a[aria-current="page"] {
  border-bottom: 2px solid var(--color__text--inverse);
  padding-bottom: var(--space--xs);
}
```
- **Effort**: Small | **Risk**: None

## Technical Details
- **Affected files**: `main.css` (nav section)
