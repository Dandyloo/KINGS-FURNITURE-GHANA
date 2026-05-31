# Changelog

All notable changes to the Kings Furniture Ghana website are recorded here.

This project follows a phased build. Each phase is listed with what was added or changed.

---

## [1.0.0] — 2025-05-30

First complete version of the website. All core pages built and live on Cloudflare Pages.

### Foundation
- Design system established in `tokens.css` — brand colours, typography, spacing, shadows, transitions
- Base styles, reset, typography classes and buttons in `main.css`
- Keyframe animations and reduced-motion support in `animations.css`

### Navigation
- Responsive navbar with transparent / scrolled states
- Custom mobile split-panel menu with contact info and WhatsApp badge
- Scroll detection and full mobile menu interactions in `navbar.js`

### Homepage
- Hero section with full-viewport image, gold accent heading, Est. 1992 badge and GSAP entrance animation
- Categories slider with drag, swipe, arrow controls, counter and progress bar
- Featured products grid loaded dynamically from JSON
- About strip with stats grid
- Projects teaser with asymmetric grid
- Testimonials with featured centre card
- Why Us four-column section
- CTA banner
- Footer

### Pages
- Products page with sticky category filter, hash routing and WhatsApp enquiry
- Projects page with category filter and hover overlays
- About page with brand story, stats strip, milestone timeline, values, showrooms and CTA
- Contact page with validated form that submits to WhatsApp
- News page with category filter and featured article
- 404 page with centered layout and quick links

### Data
- `products.json` — product catalogue
- `projects.json` — completed projects
- `news.json` — news articles

### Global Features
- WhatsApp floating button on every page
- Back to top button
- Page transition overlay on internal navigation
- Automatic active nav link detection
- Scroll reveal system (Intersection Observer)

### SEO & Infrastructure
- `robots.txt` for crawler rules
- `sitemap.xml` indexing all pages
- `_redirects` for Cloudflare 404 handling
- Schema.org FurnitureStore structured data on homepage
- Open Graph tags for social sharing
- Cloudinary image optimisation across all images

### Documentation
- `README.md` — project overview and setup
- `CLOUDINARY.md` — image hosting guide
- `COMPONENTS.md` — component and pattern reference
- `CHANGELOG.md` — this file

---

## Planned

Features scoped but pending approval before development:

- Apply scroll reveal animations across all page sections
- Individual news article pages
- Promotions page
- Dark mode toggle
- Product search
- Instagram feed integration
- Newsletter signup
- Google Maps embed on contact page