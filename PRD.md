# Product Requirements Document — Ids Achterhof Personal Blog

## Overview

A personal blog and portfolio site for **Ids Achterhof**, an independent solutions architect operating under the **ACMELabs** brand. The site is built with pure HTML5 and CSS — no JavaScript frameworks, no build tools, no static site generators. It uses a single shared stylesheet (`brandvoice.css`) and a shared page template defined in the golden reference (`brandvoice.html`).

**Production URL:** Deployed via GitHub Pages
**Repository:** `show_case_html5_css_minimum_css_max_results`

---

## Design System Reference

All pages MUST use `brandvoice.css` as their only stylesheet (besides Font Awesome). All pages MUST follow the HTML structure defined in `brandvoice.html`. See `BRANDBRIEF.md` for the full design token reference.

### Key Design Constraints

- **Zero inline styles** — the CSP blocks `<style>` blocks; all CSS lives in `brandvoice.css`
- **CSS variables only** — no hardcoded colors, sizes, or spacing in rule bodies
- **Monospace typography** — `ui-monospace` stack for all text
- **Defensive CSS** — `*` selector resets everything; pages look acceptable even with unexpected HTML
- **Light + dark mode** — via `data-theme` attribute and CSS variable overrides
- **768px max-width** — single-column, reading-optimized layout
- **Mobile breakpoint at 550px** — buttons go full-width, nav text collapses

---

## Shared Components

### Navigation (header)

Every page includes this identical header:

```
<header>
  <nav>
    <ul>
      <li><a href="index.html">Ids Achterhof</a></li>       ← Brand/home link
    </ul>
    <ul>
      <li><a href="posts.html"> Posts</a></li>                ← fa-newspaper icon
      <li><a href="about.html"> About</a></li>                ← fa-circle-info icon
      <li><a href="search.html"> Search</a></li>              ← fa-magnifying-glass icon
      <li><a href="brandvoice.html"> Brandvoice</a></li>      ← fa-palette icon
      <li><a href="#" data-action="toggle-theme"> ☀/🌙</a></li> ← theme toggle
    </ul>
  </nav>
</header>
```

- Active page gets `aria-current="page"` on its link
- Sub-pages (e.g. `posts/2026/hello-world.html`) use `../../` relative paths
- Theme toggle is an `<a>` with `data-action="toggle-theme"`, never a `<button>`

### Footer

Every page includes this identical footer:

```
<footer>
  <ul>Home | Posts | About | Search | Brandvoice</ul>
  <p>GitHub | LinkedIn | X/Twitter | Email (icon links)</p>
  <p><small>Ids Achterhof — ACMELabs · Content CC BY 4.0 · Code MIT</small></p>
</footer>
```

### Social Links

Used in hero section (index.html) and contact sections:

| Platform | URL | Icon |
|----------|-----|------|
| GitHub | `https://github.com/idsme` | `fa-brands fa-github` |
| LinkedIn | `https://www.linkedin.com/in/idsachterhof/` | `fa-brands fa-linkedin` |
| X/Twitter | `https://x.com/idsmedev` | `fa-brands fa-x-twitter` |
| Email | `mailto:idsmedev@gmail.com` | `fa-solid fa-envelope` |

### `<head>` Template

```html
<meta charset="utf-8" />
<title>[Page Title] — Ids Achterhof</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="[page-specific description]">
<meta name="author" content="Ids Achterhof">
<!-- Blog posts also include og:title, og:description, og:type="article" -->
<link rel="stylesheet" href="[Font Awesome 6.5.1 with SRI]" />
<link rel="stylesheet" type="text/css" media="screen" href="acme-labs-material-theme.css" />
<link rel="stylesheet" type="text/css" media="screen" href="brandvoice.css" />
```

---

## Page Specifications

### PAGE 1: index.html (Homepage)

**Title:** `Ids Achterhof — ACMELabs`
**Description:** Independent solutions architect with 30+ years building enterprise systems. Based in the Netherlands.
**Purpose:** Landing page with personal introduction and recent blog posts.

#### Sections

**1. Hero** (`.hero` class, centered layout)
- Circular avatar image (`images/avatar.svg`, 128x128, `.avatar` class)
- `<h1>` "Hi, I'm Ids Achterhof"
- Intro paragraph: "Independent solutions architect with 30+ years building enterprise systems. Based in the Netherlands, helping organizations architect resilient and scalable solutions. Every insight lands here for you to read and remix."
- Social links row (`.social-links` — GitHub, LinkedIn, X, Email icons)

**2. `<hr>` divider**

**3. Recent Posts** (`.post-list` class)
- `<h2>` "Recent Posts"
- 6 article cards, each containing:
  - `<h3>` with linked title
  - `.post-meta`: `<time>` · read duration · tags (`.tag` class)
  - Summary paragraph

**Posts to display (in order):**

| # | Title | Date | Duration | Tags | Link |
|---|-------|------|----------|------|------|
| 1 | Hello World: Building in the Open | 2026-03-10 | 5 min | meta, blog | `posts/2026/hello-world.html` |
| 2 | Enterprise Architecture in the Age of AI | 2026-02-28 | 8 min | architecture, ai | `#` (placeholder) |
| 3 | Why HTML and CSS Still Matter | 2026-02-15 | 4 min | html, css | `#` (placeholder) |
| 4 | 30 Years of Solutions Architecture | 2026-01-20 | 12 min | career, architecture | `#` (placeholder) |
| 5 | The Case for Minimal CSS | 2025-12-05 | 6 min | css, design | `#` (placeholder) |
| 6 | Building Resilient Systems | 2025-11-12 | 9 min | architecture, resilience | `#` (placeholder) |

**4. "View all posts" link** — links to `posts.html`

---

### PAGE 2: about.html

**Title:** `About — Ids Achterhof`
**Description:** About Ids Achterhof — Independent solutions architect with 30+ years of enterprise architecture experience, based in the Netherlands.
**Purpose:** Personal bio, skills, workspace photo, career timeline, and contact info.

#### Sections (separated by `<hr>`)

**1. Introduction**
- `<h1>` "About"
- Profile photo (`images/avatar.svg`, 300x300, `.profile-photo` figure class, centered)
- Comment: `<!-- Replace src with your actual profile photo (export CR3 to JPG) -->`
- Bio paragraph 1: "I'm **Ids Achterhof** — an independent solutions architect based in the Netherlands with over 30 years of experience in enterprise architecture. I help organizations design, build, and evolve systems that are resilient, scalable, and fit for purpose."
- Bio paragraph 2: "Deep in building mode — tinkering with architecture patterns, chasing fresh ideas, and bridging the gap between business needs and technical solutions. After decades of working with enterprise systems, every new challenge still feels like a puzzle worth solving."

**2. What I Do**
- `<h2>` "What I Do"
- Intro paragraph about intersection of business strategy and technical execution
- Definition list (`<dl>`):
  - **Enterprise Architecture** — Designing systems that align technology with business goals
  - **Solutions Architecture** — Translating complex requirements into scalable solutions
  - **Technical Leadership** — Guiding teams through architectural decisions
  - **System Resilience** — Building systems that handle the unexpected gracefully

**3. My Workspace**
- `<h2>` "My Workspace"
- Placeholder image (`placeholder.svg`) in `<figure>` with `<figcaption>`
- Comment: `<!-- Replace src with your desk setup photo (export CR3 to JPG) -->`
- Caption: "Where the architecture happens — multi-monitor setup, sticky notes for ideas, and plenty of screen real estate."

**4. Career Timeline**
- `<h2>` "Career Timeline"
- Intro paragraph about three decades
- `<table>` with columns: Period | Role | Focus

| Period | Role | Focus |
|--------|------|-------|
| 2020–Present | Independent Solutions Architect | Enterprise architecture consulting, system modernization, AI integration |
| 2010–2020 | Lead Enterprise Architect | Cloud migration, microservices adoption, DevOps transformation |
| 2000–2010 | Senior Solutions Architect | Service-oriented architecture, enterprise integration, web platforms |
| 1995–2000 | Software Engineer / Architect | Client-server systems, database design, early web applications |

**5. Connect**
- `<h2>` "Connect"
- Paragraph: "I'm always interested in challenging architecture problems and meaningful collaborations."
- `<address>` with icon links (Email, GitHub, LinkedIn, X)

---

### PAGE 3: posts.html (Archive)

**Title:** `Posts — Ids Achterhof`
**Description:** Blog posts by Ids Achterhof — enterprise architecture, system design, and lessons from 30+ years in tech.
**Purpose:** Chronological post archive grouped by year.

#### Sections

**1. Intro**
- `<h1>` "Posts"
- Paragraph: "Writing about enterprise architecture, system design, and lessons learned along the way."

**2. Year groups** (`.archive-year` class per year)

Each year section:
- `<h2>` with year and post count: e.g. "2026 `<small>`(4 posts)`</small>`"
- Nested `.post-list` section containing articles
- Each article: `<h3>` linked title, `.post-meta` (date · duration), summary paragraph

**2026 (4 posts):** Hello World, Enterprise Architecture AI, HTML CSS Still Matter, 30 Years Architecture
**2025 (2 posts):** Case for Minimal CSS, Building Resilient Systems

---

### PAGE 4: search.html

**Title:** `Search — Ids Achterhof`
**Description:** Search blog posts by Ids Achterhof.
**Purpose:** Search interface for finding posts.

#### Sections

**1. Search input**
- `<h1>` "Search"
- `<form role="search">` with `<input type="search">` (autofocus, placeholder "Search any article ...")
- Hidden label: "Search articles" (`.visually-hidden`)

**2. `<hr>` divider**

**3. Results** (`#search-results`, `.post-list` class)
- Hint paragraph (`.search-hint`): "Type a keyword to search across all posts. Results appear as you type."
- All 6 posts displayed as article cards (same as index.html but without tags, summaries truncated with `...`)

---

### PAGE 5: posts/2026/hello-world.html (Blog Post)

**Title:** `Hello World: Building in the Open — Ids Achterhof`
**Description:** Welcome to my corner of the internet. After three decades of building enterprise systems, I'm starting to write about what I've learned.
**Purpose:** First blog post — introduces the blog, explains the tech stack, sets expectations.

#### Special `<head>` additions
- `og:title`, `og:description`, `og:type="article"`

#### Structure

All paths use `../../` prefix (page lives at `posts/2026/`).

**Uses `<article>` as main content wrapper** (not `<section>`).

**1. Post Header** (`.post-header` div)
- `<h1>` "Hello World: Building in the Open"
- `.post-meta`: March 10, 2026 · 5 min read · By Ids Achterhof (linked)
- `.post-meta`: Tags — meta, blog, architecture

**2. TL;DR aside**
- `<aside>` with bold "TL;DR" summary

**3. Post Content** (`.post-content` section)

Subsections with `<h2>`:

- **Why Now?** — Two paragraphs about motivation + Dieter Rams blockquote
- **The Tech Stack** — Explanation of pure HTML/CSS approach + `<pre><code>` example showing the page skeleton
- **What to Expect** — Bulleted list of planned topics (5 items) + "Posting Cadence" `<h3>` subsection
- **The Content Workflow** — Ordered list (4 steps: Markdown → HTML → commit → deploy)
- **Let's Connect** — Contact address block (same as about.html)
- Closing paragraph: "Thanks for reading. Here's to building in the open."

**4. `<hr>` divider**

**5. Article footer** (`<footer>` inside `<article>`)
- Share links (`.share-links`): X, LinkedIn, WhatsApp, Email
- Post navigation (`.post-nav`): "Enterprise Architecture in the Age of AI →"

---

### PAGE 6: brandvoice.html (Style Guide)

**Title:** `Brandvoice - Ids Achterhof`
**Description:** CSS Showcase brandvoice — minimal CSS design tokens and HTML5 element styling reference.
**Purpose:** Living style guide showing every HTML5 element styled by `brandvoice.css`. This is the golden reference — all other pages must conform to its patterns.

**THIS FILE MUST NEVER BE MODIFIED** — it is the source of truth.

#### Sections (each with `id="section-{name}"`)

1. **section-style-guide** — H1 "Style Guide", H2 subtitle, description paragraph
2. **section-headings** — H1–H4 examples, paragraph with bold/italic, small text
3. **section-inline-text** — code, kbd, mark, abbr, ins, del, sup, sub
4. **section-code** — `<pre><code>` block with HTML example
5. **section-blockquote** — Dieter Rams quote with cite
6. **section-aside** — aside element example
7. **section-horizontal-rule** — hr element
8. **section-buttons** — default and alt buttons, float-right variants
9. **section-form** — text, email, select, textarea, radio, checkbox, submit, cancel, validation error
10. **section-ordered-list** — ol with 3 items
11. **section-unordered-list** — ul with 3 items
12. **section-definition-list** — dl with HTML, CSS, JavaScript definitions
13. **section-table** — 5-column table with 3 data rows
14. **section-figure** — figure with img and figcaption
15. **section-details** — details/summary (one closed, one open)
16. **section-progress** — progress bar (65%) and meter (70%)
17. **section-address** — address block with email link
18. **section-article** — article element explanation
19. **section-links** — text link, button link, alt button link

---

## File Structure

```
/
├── index.html                    ← Homepage
├── about.html                    ← About page
├── posts.html                    ← Post archive
├── search.html                   ← Search page
├── brandvoice.html               ← Style guide (golden reference — DO NOT EDIT)
├── brandvoice.css                ← Stylesheet (golden reference — DO NOT EDIT)
├── theme-toggle.js               ← Light/dark mode toggle script
├── placeholder.svg               ← 600x300 gray placeholder image
├── images/
│   └── avatar.svg                ← Profile avatar (circular, 128px in hero)
├── posts/
│   └── 2026/
│       └── hello-world.html      ← First blog post
├── .claude/
│   └── skills/
│       └── html5-reviewer/
│           ├── SKILL.md           ← Review automation skill
│           ├── BRANDBRIEF.md      ← Brand design reference
│           ├── brandvoice.html    ← Skill's copy of golden HTML reference
│           ├── brandvoice.css     ← Skill's copy of golden CSS reference
│           └── [logo files]       ← ACMELabs logo variants
└── PRD.md                        ← This document
```

---

## Content Inventory

### Blog Posts

| # | Title | Date | Duration | Tags | Status |
|---|-------|------|----------|------|--------|
| 1 | Hello World: Building in the Open | 2026-03-10 | 5 min | meta, blog, architecture | Published (`posts/2026/hello-world.html`) |
| 2 | Enterprise Architecture in the Age of AI | 2026-02-28 | 8 min | architecture, ai | Placeholder (`#`) |
| 3 | Why HTML and CSS Still Matter | 2026-02-15 | 4 min | html, css | Placeholder (`#`) |
| 4 | 30 Years of Solutions Architecture | 2026-01-20 | 12 min | career, architecture | Placeholder (`#`) |
| 5 | The Case for Minimal CSS | 2025-12-05 | 6 min | css, design | Placeholder (`#`) |
| 6 | Building Resilient Systems | 2025-11-12 | 9 min | architecture, resilience | Placeholder (`#`) |

### Images

| File | Usage | Status |
|------|-------|--------|
| `images/avatar.svg` | Profile photo (hero + about page) | SVG placeholder — replace with CR3→JPG headshot |
| `placeholder.svg` | Workspace photo on about page | 600x300 gray — replace with desk setup CR3→JPG |

---

## CSS Classes Used Across Pages

These are the only custom classes used beyond base HTML5 element styling:

| Class | Used On | Purpose |
|-------|---------|---------|
| `.container` | `<main>` | Centered, max-width content wrapper |
| `.hero` | index.html section | Centered intro with avatar |
| `.avatar` | index.html img | Circular profile image |
| `.social-links` | index.html ul | Horizontal icon link row |
| `.post-list` | index, posts, search | Article card list |
| `.post-meta` | All post cards | Date/duration/author line |
| `.tag` | index.html, hello-world | Inline tag pill |
| `.archive-year` | posts.html | Year group wrapper |
| `.post-header` | hello-world.html | Post title + meta block |
| `.post-content` | hello-world.html | Article body with spacing |
| `.share-links` | hello-world.html | Share button row |
| `.post-nav` | hello-world.html | Prev/next post navigation |
| `.profile-photo` | about.html | Centered figure for headshot |
| `.search-hint` | search.html | Centered muted help text |
| `.visually-hidden` | search.html | Screen-reader-only label |
| `.separator` | post-meta spans | Dot separator (·) |
| `.button` | brandvoice.html | Link styled as button |
| `.button-alt` | brandvoice.html | Outline button variant |
| `.float-right` | brandvoice.html | Float utility |
| `.form-field-validation-error` | brandvoice.html | Red error state |

---

## Reconstruction Instructions

To recreate any page from this PRD:

1. Start with the `<head>` template (charset, title, viewport, description, author, Font Awesome with SRI, brandvoice.css)
2. Add the shared header/nav (copy from any existing page, set `aria-current="page"` on the active link)
3. Add `<main class="container">` with the page-specific sections described above
4. Add the shared footer (identical on all pages)
5. Add `<script src="theme-toggle.js"></script>` before `</body>`
6. For sub-pages in `posts/YYYY/`, use `../../` relative paths for all links and assets

**Do not add inline `<style>` blocks** — the CSP will block them. All styling must go through `brandvoice.css`.
**Do not modify `brandvoice.html` or `brandvoice.css`** — they are the immutable golden reference.
