---
status: pending
priority: p2
issue_id: "002"
tags: [code-review, css, quality]
dependencies: []
---

# Duplicate `nav > *` CSS rule blocks

## Problem Statement
`nav > *` appears twice in `main.css` with different properties (lines 163-165: `text-align: center`, lines 177-179: `width: 100%`). Should be one block.

## Findings
- **Source**: architecture-strategist, simplicity-reviewer, pattern-recognition
- Both rules apply to the same elements
- Split was likely introduced during incremental editing

## Proposed Solutions

### Option A: Merge into single block
```css
nav > * {
  text-align: center;
  width: 100%;
}
```
- **Effort**: Small | **Risk**: None

### Option B: Replace with flex: 1 (recommended by architecture agent)
```css
nav > * {
  flex: 1;
  text-align: center;
}
```
- **Effort**: Small | **Risk**: Low (test visual result)

## Technical Details
- **Affected files**: `main.css:163-165, 177-179`

## Acceptance Criteria
- [ ] Only one `nav > *` rule block exists
- [ ] Nav layout visually unchanged
