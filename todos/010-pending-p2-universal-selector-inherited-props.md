---
status: pending
priority: p2
issue_id: "010"
tags: [code-review, css, performance]
dependencies: []
---

# Universal `*` selector sets inherited properties

## Problem Statement
`*` reset (main.css lines 94-100) sets `font-family`, `line-height`, and `color` on every element. These are inherited properties and should be set on `body` instead, allowing natural CSS inheritance.

## Findings
- **Source**: performance-oracle
- This anti-pattern forces `header, header *` and `footer, footer *` workarounds (the `*` overrides inheritance)

## Proposed Solutions
Move `font-family`, `line-height`, `color` from `*` to `body`. Then simplify `header, header *` to just `header` and `footer, footer *` to just `footer`.
- **Effort**: Medium | **Risk**: Medium (must verify all elements still inherit correctly)

## Technical Details
- **Affected files**: `main.css:94-100, 148-151, 225-228`
