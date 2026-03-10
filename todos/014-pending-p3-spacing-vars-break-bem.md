---
status: pending
priority: p3
issue_id: "014"
tags: [code-review, css, naming]
dependencies: []
---

# Spacing variables break BEM naming convention

## Problem Statement
`--space--xs` through `--space--2xl` skip the `__element` segment that all other token groups use. Convention says `--block__element--modifier`.

## Proposed Solutions
Either rename to `--space__scale--xs` or document the exception in the CSS header comment.
- **Effort**: Small | **Risk**: Low
