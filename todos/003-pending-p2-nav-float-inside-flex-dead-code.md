---
status: pending
priority: p2
issue_id: "003"
tags: [code-review, css, dead-code]
dependencies: []
---

# Float inside flex container is dead code

## Problem Statement
`nav ul:first-child li { float: left; }` (main.css lines 159-161) has no effect. The parent `nav` is `display: flex`, and the `li` elements are `display: inline`. Float inside a flex item is redundant.

## Findings
- **Source**: performance-oracle, architecture-strategist, simplicity-reviewer
- Float is ignored by the flex layout algorithm
- Items already flow left-to-right by default

## Proposed Solutions
Remove lines 159-161 entirely.
- **Effort**: Small | **Risk**: None

## Technical Details
- **Affected files**: `main.css:159-161`

## Acceptance Criteria
- [ ] Rule removed
- [ ] Nav layout visually unchanged
