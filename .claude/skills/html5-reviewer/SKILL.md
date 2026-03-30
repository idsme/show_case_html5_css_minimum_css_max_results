---
name: html5-reviewer
description: >
  Review HTML and CSS files against the project's golden reference (brandvoice.html + brandvoice.css).
  Enforces defensive CSS styling, required HTML structure, CSS variable-only values, and
  navigation patterns. Use when the user asks to "review html", "check my page",
  "validate html5", "review css", "check the page", or creates a new page.
  Also use proactively after creating or modifying any HTML or CSS file.
version: 2.0.0
tools: Read, Glob, Grep, Bash, Agent
---

# HTML5 & CSS Defensive Style Reviewer

Reviews HTML and CSS files against this project's golden reference implementation (`brandvoice.html` + `brandvoice.css`). Enforces a **defensive styling philosophy**: the CSS styles `*` elements uniformly first, then applies custom styling on top — ensuring even non-pure HTML5 pages look acceptable.

## Design Philosophy

This project uses a **defensive CSS strategy**:

1. **Universal reset first** — `*` selector normalizes margin and box-sizing for ALL elements
2. **Body inherits** — `body` sets font-family, font-size, line-height, color (inherited by all children)
3. **Structural selectors** — `body >`, `main >`, `section >` apply layout margins via negation selectors
4. **Element-level styling** — HTML5 tags are styled directly (no classes needed for most elements)
5. **Minimal utility classes** — Only `.container`, `.button`, `.button-alt`, `.float-right`, `.form-field-validation-error`
6. **CSS variables everywhere** — No hardcoded values in rule bodies (only in `:root` and `[data-theme="dark"]`)

## Golden Reference Files

Before reviewing, ALWAYS read these two files as the source of truth:

```
Read: brandvoice.html   (HTML structure reference)
Read: acmelabs_brandvoice_theming.css  (CSS theming architecture reference)
Read: brandvoice.css     (CSS architecture reference)
```

## Review Process

### Step 1: Read the Golden References

Read `brandvoice.html` and `acmelabs_brandvoice_theming.css` and `brandvoice.css` from the project root. These define the correct patterns. Every other HTML and CSS file must conform to these patterns.

### Step 2: Discover Files to Review

```
Glob: *.html, *.css (project root only)
```

Skip: `brandvoice.html` (it IS the reference), `node_modules/`, `.claude/`, `docs/`, `todos/`.

### Step 3: HTML Structure Enforcement

Every HTML page MUST have this exact nesting structure matching `brandvoice.html`:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="utf-8" />
    <title>[Page Title] — CSS Showcase</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Security-Policy" content="[same CSP as brandvoice.html]">
    <link rel="stylesheet" href="[Font Awesome with SRI]" />
    <link rel="stylesheet" type="text/css" media="screen" href="acmelabs_brandvoice_theming.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="brandvoice.css" />
</head>
<body>
    <header>
        <nav>
            <ul><!-- left links --></ul>
            <span>CSS Showcase</span>
            <ul><!-- right links --></ul>
        </nav>
    </header>
    <main class="container">
        <section id="section-{name}">
            <h2>[Section Title]</h2>
            <h3>[Optional subtitle]</h3>
            <!-- content -->
        </section>
        <article id="section-{name}">
            <h2>[Article Title]</h2>
            <!-- self-contained content -->
        </article>
        <!-- more sections/articles -->
    </main>
    <footer>
        <ul>
            <li><a href="brandvoice.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
        <p>Powered by: Minimal CSS</p>
    </footer>
    <script src="theme-toggle.js"></script>
</body>
</html>
```

#### Required HTML Structure Rules (P1 violations)

| Rule | Check                                                                                                       |
|------|-------------------------------------------------------------------------------------------------------------|
| DOCTYPE | `<!DOCTYPE html>` must be first line                                                                        |
| Language | `<html lang="en" data-theme="light">` required                                                              |
| Charset | `<meta charset="utf-8" />` must be first in `<head>`                                                        |
| Viewport | `<meta name="viewport" content="width=device-width, initial-scale=1" />` required                           |
| CSP | `<meta http-equiv="Content-Security-Policy">` must match brandvoice.html exactly                            |
| Font Awesome | Must include SRI `integrity` and `crossorigin` attributes                                                   |
| Stylesheet | `<link rel="stylesheet" ... href="acmelabs_brandvoice_theming.css" />` required                             |
| Stylesheet | `<link rel="stylesheet" ... href="brandvoice.css" />` required                                              |
| Header | `<header><nav>` must be first child of `<body>`                                                             |
| Nav structure | Nav must contain only `<ul><li><a>` links — NO `<button>` elements in nav                                   |
| Nav links | Left `<ul>`: page links with Font Awesome icons. Right `<ul>`: utility links                                |
| Nav title | `<span>CSS Showcase</span>` centered between the two `<ul>` elements                                        |
| aria-current | Active page link must have `aria-current="page"`                                                            |
| Main | `<main class="container">` must wrap all content                                                            |
| Section IDs | Every `<section>` and `<article>` must have `id="section-{name}"` where `{name}` is a kebab-case descriptor |
| Sections | Content must be in `<section>` or `<article>` elements inside `<main>`                                      |
| Article usage | Use `<article>` for self-contained content (blog post, card); use `<section>` for parts of a whole          |
| Article styling | `<article>` is styled identically to `<section>` in CSS (same indent rule)                                  |
| Section headings | Each `<section>` or `<article>` should start with `<h2>`, optionally followed by `<h3>`                     |
| Footer | Must match brandvoice.html footer exactly (same links, same order, same text)                               |
| Script | `<script src="theme-toggle.js"></script>` before `</body>`                                                  |

### Step 4: CSS Variable Enforcement

#### No Hardcoded Values Rule (P1 violation)

CSS rule bodies must NOT contain hardcoded values. Every value must reference a CSS variable from `:root`.

**Allowed hardcoded values (exceptions):**
- `0` (zero)
- `none`, `auto`, `inherit`, `currentColor`, `transparent`
- `100%`
- `left`, `center`, `right`, `middle`
- `block`, `inline`, `inline-block`, `flex`
- `solid`, `dotted`, `dashed`, `wavy`
- `normal`, `bold`, `italic`
- `collapse`, `pointer`, `help`
- Fallback values before a `color-mix()` or modern CSS function
- Values inside `:root` and `[data-theme="dark"]` variable definitions

**Everything else must use `var(--...)`:**
- Colors → `var(--color__...)`
- Spacing/padding/margin → `var(--space--...)`
- Font sizes → `var(--font__size--...)`
- Border widths → `var(--border__width...)`
- Border radius → `var(--border__radius)`
- Border colors → `var(--border__color...)`
- Line heights → `var(--line__height...)`
- Layout dimensions → `var(--layout__...)`
- Component sizes → `var(--icon__size)`, `var(--checkbox__size)`, etc.

### Step 5: Required CSS Selectors (Must Match Exactly)

These selectors in `brandvoice.css` define the defensive foundation. They must NOT be modified, overridden, or contradicted by any other CSS:

```css
/* Universal reset — MUST be exactly this */
* {
  margin: 0;
  box-sizing: border-box;
}

/* Body — inherited properties set here */
body {
  background-color: var(--color__surface);
  font-family: var(--font__family);
  font-size: var(--font__size--base);
  line-height: var(--line__height);
  color: var(--color__text);
  padding-top: var(--space--2xl);
}

/* Layout margins */
body > *:not(header):not(footer):not(aside) {
  margin-left: var(--space--md);
}

main > *:not(:first-child) {
  margin-top: var(--space--xl);
}

section > *:not(h1):not(h2),
article > *:not(h1):not(h2) {
  margin-left: var(--space--sm);
}

/* Container */
.container {
  width: 90%;
  max-width: var(--layout__max-width);
  margin: var(--space--xl) auto 0 auto;
  padding: var(--layout__padding);
}

/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: var(--space--sm) var(--space--md);
  background-color: var(--color__accent);
  color: var(--color__text--inverse);
  z-index: 10;
}

/* Footer */
footer {
  background-color: var(--color__accent);
  color: var(--color__text--inverse);
  padding: var(--space--sm) 0;
  text-align: center;
}
```

If any reviewed CSS file modifies, overrides, or conflicts with these selectors, flag as **P1**.

### Step 6: Navigation Rules

Navigation MUST only use links (`<a>`) inside `<ul><li>`:

- **NO `<button>` elements** in `<nav>`
- **NO `<div>` or `<span>`** as nav items (only `<span>` for the centered title)
- Theme toggle must be an `<a href="#">` with `data-action="toggle-theme"` and `aria-label`
- Search must be an `<a>` link
- Icon elements use `<i class="fa-solid fa-...">` (Font Awesome)
- Nav links use `color: inherit` (inheriting from header's color)
- `nav a:visited` should NOT be separately declared (inherit handles it)

### Step 7: Cross-Page Consistency

Compare each reviewed page against `brandvoice.html`:

| Element | Must Match |
|---------|-----------|
| `<head>` content | CSP, Font Awesome link (with SRI), brandvoice.css link — byte-identical |
| `<header><nav>` | Same structure, same links, same order. Only `aria-current` moves |
| `<footer>` | Byte-identical across all pages |
| `<script>` | Same `theme-toggle.js` reference |
| Navigation order | Home, About, Contact (left). Search, Toggle (right) |
| Footer order | Home, About, Contact |

## Output Format

Present ALL deviations in three priority tables:

### P1 — Must Fix (Structural / Security / Broken)

Deviations that break the defensive styling contract, cause rendering issues, or create security problems.

```markdown
| # | File:Line | Deviation | Required Pattern | Reasoning |
|---|-----------|-----------|------------------|-----------|
| 1 | new.html:3 | Missing `data-theme="light"` | `<html lang="en" data-theme="light">` | Theme toggle won't work without initial state |
```

### P2 — Should Fix (Consistency / Convention)

Deviations from the golden reference that don't break functionality but hurt maintainability.

```markdown
| # | File:Line | Deviation | Required Pattern | Reasoning |
|---|-----------|-----------|------------------|-----------|
| 1 | new.html:85 | Footer links in wrong order | Home, About, Contact | Must match nav order for consistency |
```

### P3 — Nice to Have (Style / Optimization)

Minor improvements that would bring the file closer to the golden reference.

```markdown
| # | File:Line | Deviation | Required Pattern | Reasoning |
|---|-----------|-----------|------------------|-----------|
| 1 | new.css:12 | Using rgba() instead of color-mix() | color-mix() with fallback | Modern approach used in golden reference |
```

### Summary

After the tables, show:

```
Total: X deviations (P1: N, P2: N, P3: N)

Reply "fix all" to apply all fixes automatically.
Reply with specific numbers (e.g., "fix 1, 3, 5") to fix selectively.
```

## Important Notes

- NEVER modify `brandvoice.html` or `brandvoice.css` — they are the golden reference
- New pages inherit ALL patterns from `brandvoice.html`
- New CSS files must not duplicate or override `brandvoice.css` foundation selectors
- The `*` reset and `body` inheritance are NON-NEGOTIABLE — this is the defensive strategy
- `fix all` must be offered and must work when the user types it
