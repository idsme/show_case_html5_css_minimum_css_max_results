---
status: pending
priority: p3
issue_id: "015"
tags: [code-review, css, dead-code]
dependencies: []
---

# `--border__radius--full: 9999px` is unused

## Problem Statement
No CSS rule references this variable. YAGNI violation.

## Proposed Solutions
Remove the variable from `:root`.
- **Effort**: Small | **Risk**: None
