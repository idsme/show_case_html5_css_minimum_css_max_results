---
status: pending
priority: p3
issue_id: "021"
tags: [code-review, css, compatibility]
dependencies: []
---

# `color-mix()` used without fallback

## Problem Statement
Three uses of `color-mix()` (lines 272, 279, 430) have no fallback for browsers before early 2023.

## Proposed Solutions
Add a static rgba fallback before each `color-mix()` declaration.
- **Effort**: Small | **Risk**: None
