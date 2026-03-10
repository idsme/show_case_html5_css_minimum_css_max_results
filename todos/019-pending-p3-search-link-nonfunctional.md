---
status: pending
priority: p3
issue_id: "019"
tags: [code-review, html, ux]
dependencies: []
---

# Search link is non-functional

## Problem Statement
Nav "Search" link points to `index.html` -- it's a placeholder with no search functionality.

## Proposed Solutions
Either remove it, add `aria-disabled="true"`, or implement a basic search.
- **Effort**: Small-Medium | **Risk**: None
