---
title: "HTML/CSS Showcase Code Review: Fix broken markup, dead references, and accessibility gaps"
date: 2026-03-08
category: code-quality
tags:
  - html5
  - css
  - accessibility
  - static-site
  - github-pages
  - code-quality
  - wcag
  - security
severity:
  P1: 2
  P2: 9
  P3: 8
components:
  - index.html
  - brandvoice.css
symptoms:
  - Broken HTML entity rendering (&gt&gt; missing semicolon)
  - Malformed bold/italic tag nesting
  - 404 errors from dead project_card.css and main.js references
  - Cancel button styling not applied (wrong CSS class)
  - Inconsistent spacing due to missing CSS unit on custom property
  - Duplicate --spacing-xl variable with conflicting values
  - Missing lang attribute on html element (WCAG violation)
  - Form labels not associated with inputs (accessibility)
  - CDN resource loaded without SRI integrity hash (security)
  - Missing semicolon in tr:hover CSS rule
  - Redundant textarea CSS declarations
root_cause_summary: >
  Accumulated authoring oversights in a minimal showcase project: typos in HTML
  entities and CSS values, copy-paste errors in tag nesting and class names, a
  stale stylesheet reference to a never-committed file, and missing accessibility
  and security attributes that were never added during initial development.
---

## Problem Statement

A static HTML5/CSS showcase project -- designed as a minimal CSS template for proof-of-concept applications -- contained 11 defects spanning correctness, accessibility, security, and maintainability. These bugs caused visible rendering errors (broken entity, unstyled cancel button, malformed bold/italic text), silent failures (unitless CSS variable, duplicate variable override, missing semicolon), 404 network errors on every page load (dead file references), and WCAG accessibility violations (missing `lang` attribute, unlabelled form inputs). None of the defects produced build-time errors because the project is plain HTML/CSS with no toolchain, making them easy to ship undetected.

## Investigation

1. **HTML validation pass** -- Ran the markup through structural review. Found a broken HTML entity (`&gt&gt;` missing its semicolon), a malformed bold/italic tag pair (`<i></i>` opened and immediately closed before the text content), and a missing `lang` attribute on the `<html>` element.

2. **Asset reference audit** -- Checked every `<link>` and `<script>` in `<head>` against files in the repository. `project_card.css` and `main.js` do not exist anywhere in the repo, confirming two guaranteed 404s on every page load.

3. **CSS variable inspection** -- Reviewed the `:root` block. `--spacing-xs: 0.25` had no unit, making it invalid as a length value wherever consumed. `--spacing-xl` was declared twice (first as `1rem`, then immediately overridden by `11.5rem`), a copy-paste error that silently inflated spacing.

4. **CSS syntax scan** -- Found a missing semicolon after `color: var(--text-color-primary)` in the `tr:hover` rule. Also identified a `textarea` rule block that fully duplicated `padding`, `width`, `box-sizing`, and `border` already declared by the shared `input/select/textarea` rule above it.

5. **Class/selector cross-reference** -- The cancel button used `class="button alt"`, producing two separate classes `.button` and `.alt`. The intended selector `.button-alt` never matched because the hyphenated class name was never applied.

6. **Accessibility audit** -- No `for`/`id` associations existed between `<label>` elements and their corresponding form controls. The `<html>` tag lacked `lang="en"`, violating WCAG 3.1.1.

7. **Security review** -- The Font Awesome CDN `<link>` had no Subresource Integrity (`integrity`) or `crossorigin` attribute, leaving it vulnerable to CDN compromise.

## Root Cause

The defects fell into four categories:

- **Typos and syntax errors**: The broken HTML entity, malformed `<b><i>` nesting, missing CSS semicolon, and unitless CSS variable were all manual typing mistakes with no linting or validation step to catch them.
- **Stale references**: `project_card.css` and `main.js` were likely left over from an earlier iteration or template and never cleaned up. The duplicate `--spacing-xl` was a copy-paste artifact where the second declaration silently won.
- **Incorrect class naming**: `class="button alt"` vs. the required `class="button button-alt"` shows a misunderstanding of how space-separated HTML classes map to CSS compound selectors. The space creates two independent classes rather than a single hyphenated one.
- **Missing accessibility and security attributes**: The `lang` attribute, `for`/`id` label associations, and SRI attributes were simply never added -- a common gap when a project starts as a quick visual prototype without an accessibility or security checklist.

## Solution

### Fix 1 -- Broken HTML entity

**Before:**
```html
html&gt;header&gt;body&gt;main&gt;section&gt&gt;footer
```

**After:**
```html
html&gt;header&gt;body&gt;main&gt;section&gt;&gt;footer
```

Added the missing semicolon to `&gt;` so the browser renders `>` instead of displaying the raw entity text.

### Fix 2 -- Malformed bold/italic tags

**Before:**
```html
<p><b><i></i>This text is bold and italic</i></b></p>
```

**After:**
```html
<p><b><i>This text is bold and italic</i></b></p>
```

Removed the stray `</i>` that immediately closed the `<i>` before any text content.

### Fix 3 -- Dead file references removed

**Before:**
```html
<link rel="stylesheet" type="text/css" media="screen" href="project_card.css" />
<script src="main.js"></script>
```

**After:** Both lines deleted. Neither file exists in the repository; every page load produced two 404 errors.

### Fix 4 -- Cancel button class corrected

**Before:**
```html
<a href="#" class="button alt">Cancel</a>
```

**After:**
```html
<a href="#" class="button button-alt">Cancel</a>
```

`class="button alt"` applies classes `.button` and `.alt` separately. The CSS selector `.button-alt` requires the literal class name `button-alt`, so the correct attribute is `class="button button-alt"`.

### Fix 5 -- CSS unit added to variable

**Before:**
```css
--spacing-xs: 0.25;
```

**After:**
```css
--spacing-xs: 0.25rem;
```

A unitless `0.25` is valid as a number but invalid as a length.

### Fix 6 -- Duplicate CSS variable removed

**Before:**
```css
--spacing-xl: 1rem;
--spacing-xl: 11.5rem;
```

**After:**
```css
--spacing-xl: 1rem;
```

The second declaration silently overrode the first.

### Fix 7 -- Missing lang attribute

**Before:**
```html
<html>
```

**After:**
```html
<html lang="en">
```

Required by WCAG 3.1.1 (Level A). Screen readers use this to select the correct pronunciation engine.

### Fix 8 -- Form label accessibility

**Before:**
```html
<label>First Name</label>
<input type="text" name="firstname" placeholder="...">
```

**After:**
```html
<label for="firstname">First Name</label>
<input type="text" id="firstname" name="firstname" placeholder="...">
```

Applied `for`/`id` pairing to all labels (`firstname`, `lastname`, `city`, `email`, `description`). Also removed commented-out dead code.

### Fix 9 -- SRI on CDN resource

**Before:**
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
```

**After:**
```html
<link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
```

Subresource Integrity ensures the browser rejects the stylesheet if the CDN serves tampered content.

### Fix 10 -- Missing CSS semicolon

**Before:**
```css
tr:hover {
  background-color: var(--primary-light);
  color: var(--text-color-primary)
}
```

**After:**
```css
tr:hover {
  background-color: var(--primary-light);
  color: var(--text-color-primary);
}
```

### Fix 11 -- Redundant textarea CSS removed

**Before:**
```css
textarea {
  padding: 0.6rem 0.6rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: var(--border-width) var(--border-style) var(--border-color);
  line-height: 1.6rem;
}
```

**After:**
```css
textarea {
  height: 100%;
  line-height: 1.6rem;
}
```

`padding`, `width`, `box-sizing`, and `border` were already set identically by the shared `input[type="text"], ... textarea` rule block above.

## Prevention Strategies

### 1. HTML Validation Errors
- Use an HTML validator (`htmlhint`, `html-validate`, or W3C Nu Checker) in CI
- Use an editor with real-time linting (VS Code + HTMLHint extension)

### 2. Dead File References
- Run a link/resource checker that resolves every `src` and `href` to a real file
- Treat asset deletion as a two-step task: delete the file, then search for all references

### 3. CSS Bugs
- Use **Stylelint** with `stylelint-config-standard` -- catches missing units, duplicate properties, missing semicolons, and redundant declarations
- Enable editor format-on-save with Prettier or Stylelint `--fix`

### 4. Accessibility Gaps
- Use `axe-core` or `pa11y` in CI to flag missing `lang`, unlabelled form controls, and ARIA violations
- Start from a validated HTML boilerplate that includes `lang` and proper form structure

### 5. Security (SRI)
- Always add `integrity` and `crossorigin` attributes when loading from third-party CDNs
- Lint for missing SRI using `html-validate` or a custom CI check

### 6. CSS Class Mismatches
- Use a consistent naming convention (BEM or kebab-case) and document it
- Use PurgeCSS in audit mode to detect selectors that match zero elements

## Pre-Deploy Checklist

- [ ] HTML validates with zero errors (`htmlhint *.html`)
- [ ] All referenced files exist (every `src`, `href` resolves)
- [ ] CSS lints clean (`stylelint "**/*.css"`)
- [ ] `<html lang="...">` is set on every page
- [ ] Every `<input>` has an associated `<label>` (or `aria-label`)
- [ ] Every `<img>` has meaningful `alt` text
- [ ] External CDN resources have `integrity` and `crossorigin` attributes
- [ ] CSS class names in HTML match CSS selectors
- [ ] Accessibility scan passes (`pa11y index.html`)
- [ ] No console errors in browser (404s, syntax errors)

## Recommended Tooling

| Category | Tool | What It Catches |
|---|---|---|
| HTML validation | HTMLHint | Broken entities, malformed nesting, empty tags |
| HTML validation | html-validate | Dead file refs, missing SRI, structural errors |
| CSS linting | Stylelint | Missing units, duplicate props, missing semicolons |
| Accessibility | axe-core | Missing lang, label gaps, contrast, ARIA misuse |
| Security | html-validate SRI rule | Missing integrity hashes on CDN resources |
| Dead references | hyperlink | Broken asset paths, dead links |
| Class mismatches | PurgeCSS (audit mode) | CSS selectors that match nothing in HTML |

## References

- [W3C HTML Validator](https://validator.w3.org/)
- [WAVE Accessibility Tool](https://wave.webaim.org/)
- [MDN: Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- Project README: `README.MD`
- GitHub Pages workflow: `.github/workflows/static.yml`
