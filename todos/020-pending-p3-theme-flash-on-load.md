---
status: pending
priority: p3
issue_id: "020"
tags: [code-review, javascript, ux]
dependencies: []
---

# Theme flash on page load (FOUT)

## Problem Statement
`theme-toggle.js` loads at bottom of body. Page renders with `data-theme="light"` first, then switches to dark if stored. Causes a flash.

## Proposed Solutions
Move the localStorage read to a tiny inline script in `<head>` (requires CSP update with script hash).
- **Effort**: Medium | **Risk**: Low (CSP change needed)
