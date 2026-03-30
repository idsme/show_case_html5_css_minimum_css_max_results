# CSS Showcase

Minimal CSS that makes plain HTML5 look good. Just add `main.css` to your page.

## Quick Start

```html

<link rel="stylesheet" href="acme-labs-material-theme.css"/>
<link rel="stylesheet" href="brandvoice.css"/>
```

Structure your page as: `html > body > header > nav`, `main.container > section`, `footer`.

## Theming

Change a few CSS variables in `:root` to re-theme everything:

```css
--color__accent:       #006cac;   /* Primary brand color */
--color__accent--hover: #005a91;  /* Hover state */
--color__surface:      #fdfdfd;   /* Page background */
--color__text:         #282728;   /* Body text */
--font__family:        ui-monospace, ...; /* Font stack */
```

All css4 variables follow BEM naming except spacings and margins sizes: `--block__element--modifier`.

## Features

- Styles all common HTML5 tags directly (minimal classes)
- Light/dark mode with toggle (stored in localStorage)
- BEM-named design tokens for easy theming
- Responsive layout
- Font Awesome icons via CDN

## Files

| File | Purpose |
|------|---------|
| `main.css` | All styles and design tokens |
| `index.html` | Style guide showcase |
| `theme-toggle.js` | Dark/light mode toggle |

Greets, Ids Achterhof
