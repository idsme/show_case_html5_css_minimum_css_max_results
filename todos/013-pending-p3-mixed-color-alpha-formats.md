---
status: pending
priority: p3
issue_id: "013"
tags: [code-review, css, consistency]
dependencies: []
---

# Mixed color-with-alpha formats

## Problem Statement
Error colors use hex-alpha (`#ff010130`), dark mode uses `rgba()`, computed transparency uses `color-mix()`. The hex-alpha and rgba serve the same purpose but use different formats.

## Proposed Solutions
Standardize on one format for static alpha colors (either all hex-alpha or all rgba).
- **Effort**: Small | **Risk**: None
