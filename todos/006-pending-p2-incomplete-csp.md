---
status: pending
priority: p2
issue_id: "006"
tags: [code-review, security]
dependencies: []
---

# Incomplete Content Security Policy

## Problem Statement
CSP is missing `script-src`, `object-src`, `base-uri`, `form-action`, and `frame-ancestors` directives. Falls back to `default-src 'self'` which works but isn't explicit.

## Findings
- **Source**: security-sentinel

## Proposed Solutions
Update CSP in all 3 HTML files to:
```
default-src 'self'; script-src 'self'; style-src 'self' https://cdnjs.cloudflare.com; font-src https://cdnjs.cloudflare.com; img-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
```
- **Effort**: Small | **Risk**: None

## Technical Details
- **Affected files**: `index.html:8`, `about.html:8`, `contact.html:8`
