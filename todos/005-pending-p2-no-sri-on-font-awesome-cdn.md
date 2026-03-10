---
status: pending
priority: p2
issue_id: "005"
tags: [code-review, security]
dependencies: []
---

# No Subresource Integrity (SRI) on Font Awesome CDN link

## Problem Statement
Font Awesome CSS loaded from cdnjs without `integrity` or `crossorigin` attributes. Supply chain risk if CDN is compromised.

## Findings
- **Source**: security-sentinel, learnings-researcher (flagged in past review too)

## Proposed Solutions
Add SRI hash and crossorigin to all 3 HTML files:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
  crossorigin="anonymous" referrerpolicy="no-referrer" />
```
- **Effort**: Small | **Risk**: None

## Technical Details
- **Affected files**: `index.html:9`, `about.html:9`, `contact.html:9`
