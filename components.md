# Components Guide

A reference for the reusable components and patterns used across the Kings Furniture Ghana website. Use this when adding new pages or editing existing ones to keep everything consistent.

---

## Design Tokens

All colours, fonts, spacing and other visual values are defined as CSS variables in `assets/css/tokens.css`. **Never hardcode these values** — always reference the variable.

### Brand Colours

| Variable | Value | Use |
|----------|-------|-----|
| `--color-brand` | `#1E2761` | Primary navy |
| `--color-brand-deep` | `#151D4A` | Darker navy, hovers |
| `--color-gold` | `#B89A6A` | Gold accents |
| `--color-bg` | `#FFFFFF` | Default background |
| `--color-bg-soft` | `#F8F8F6` | Section backgrounds |

### Fonts

| Variable | Font | Use |
|----------|------|-----|
| `--font-display` | Cormorant Garamond | Headings |
| `--font-body` | DM Sans | Body text, labels, buttons |

### Spacing

Spacing follows a 4px grid: `--space-1` (4px) through `--space-40` (160px). Always use these instead of arbitrary pixel values.

---

## Naming Convention — BEM

All classes follow **Block__Element--Modifier**:
.product-card              /* Block /
.product-card__name        / Element /
.product-card--featured    / Modifier */

---

## Navbar

**Files:** `navbar.css`, `navbar.js`

The navbar has three states:
1. **Transparent** — over a hero image (default)
2. **Scrolled** (`.is-scrolled`) — white frosted background after scrolling past the hero
3. **Immediate scrolled** — applied automatically on pages with no hero

For the navbar to start transparent, the page must have an element with class `hero` (e.g. `class="contact-hero hero"`). Pages without it get the white navbar immediately.

The mobile menu is a custom split-panel design — contact info on the left, large nav links on the right.

---

## Buttons

**File:** `main.css`

| Class | Appearance |
|-------|-----------|
| `.btn .btn--primary` | Solid navy (gold over hero) |
| `.btn .btn--secondary` | Outlined |
| `.btn .btn--ghost` | Text with underline |
| `.btn--lg` | Larger size modifier |

Combine base `.btn` with a variant: `class="btn btn--primary btn--lg"`

---

## Page Hero Pattern

Every inner page (products, projects, about, contact, news) uses the same hero structure:

```html
<section class="[page]-hero hero">
  <div class="[page]-hero__media">
    <img src="..." fetchpriority="high" />
    <div class="[page]-hero__overlay"></div>
  </div>
  <div class="container">
    <div class="[page]-hero__inner">
      <!-- label + heading -->
    </div>
  </div>
</section>
```

A dark image with a left-to-right navy gradient overlay so white text stays readable. The `hero` class makes the navbar start transparent.

---

## Filter Bar Pattern

**Used on:** products, projects, news pages

A sticky bar with pill-shaped tabs. Each tab shows a count. Filtering toggles an `is-hidden` class on cards (display none) rather than removing them — this keeps it fast and animation-friendly.

```html
<button class="filter-tab is-active" data-filter="all">
  All <span class="filter-tab__count"></span>
</button>
```

The matching JS counts items per category, fills the counts, and handles tab clicks. Products and projects pages also support URL hash routing (e.g. `products.html#bedroom`).

---

## Cards

### Product Card (`products-home.js`, `products.js`)
Image with category tag, name, description, WhatsApp enquiry button. Hover lifts the card and reveals a WhatsApp icon.

### Project Card (`projects.js`)
Image with gradient overlay revealing category and location tags, name, and description on hover.

### News Card (`news.js`)
Image, category badge, date, title, excerpt. The first featured article spans full width.

### Testimonial Card (`testimonials.css`)
Quote with star rating and author. The centre card uses `--featured` modifier (navy background, raised).

All card grids use a CSS entrance animation (`card-animate-in` / `cardFadeUp`) staggered by index.

---

## Footer

**File:** `footer.css`

Identical across every page — four columns (brand, products, company, find us) plus a bottom bar with copyright and social icons. When copying to a new page in the `pages/` folder, all links use `../` paths.

---

## Global UI

**Files:** `global.css`, `main.js`

- **WhatsApp floating button** (`.wa-float`) — fixed bottom-right, green, pulsing ring
- **Back to top button** (`.back-to-top`) — appears after 400px scroll
- **Page transitions** — white overlay scales up on internal link clicks
- **Active nav detection** — `main.js` marks the correct nav link automatically by URL
- **Scroll reveal** — elements with `data-reveal` fade up when scrolled into view (Intersection Observer)

Both the WhatsApp and back-to-top button HTML must be added before `</body>` on every page.

---

## Data Files

**Folder:** `data/`

Dynamic content (products, projects, news) lives in JSON files, separate from the HTML. To add a new product or article, edit the JSON — no HTML or CSS changes needed. The matching JS file fetches the JSON and builds the cards.

---

## Adding a New Page — Checklist

1. Copy an existing inner page (e.g. `products.html`) as a starting point
2. Update `<title>`, meta description, and canonical URL
3. Keep the navbar and footer identical (use `../` paths)
4. Add `class="hero"` to the hero section so the navbar starts transparent
5. Link the page's own CSS file and any needed JS
6. Add the WhatsApp float and back-to-top button before `</body>`
7. Link `global.css` and `main.js`
8. Add the page to `sitemap.xml`