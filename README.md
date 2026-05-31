# Kings Furniture Ghana

The official website for Kings Furniture Ghana — premium furniture handcrafted in Takoradi since 1992.

**Live site:** https://kingsfurnituregh.com

---

## About

Kings Furniture Ghana is one of Ghana's most recognised furniture brands. This website showcases the product collection, completed projects, and brand story, and drives customer enquiries through WhatsApp.

The site is built with plain HTML, CSS and JavaScript — no frameworks — for fast load times and easy long-term maintenance.

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties (design tokens), BEM naming, one stylesheet per section
- **Vanilla JavaScript** — no frameworks or build step
- **GSAP** — homepage hero entrance animation only
- **Cloudinary** — image hosting and automatic optimisation
- **Cloudflare Pages** — hosting and continuous deployment
- **GitHub** — version control

---

## Project Structure
KINGS-FURNITURE-GHANA/
├── index.html              # Homepage
├── robots.txt              # Search engine crawler rules
├── sitemap.xml             # Page index for search engines
├── _redirects              # Cloudflare 404 handling
├── README.md
│
├── assets/
│   ├── css/                # One stylesheet per section
│   │   ├── tokens.css      # Design system — all variables
│   │   ├── main.css        # Reset, typography, buttons, utilities
│   │   ├── animations.css  # Keyframes and reduced-motion rules
│   │   ├── global.css      # WhatsApp float + back to top button
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── categories.css
│   │   ├── featured-products.css
│   │   ├── about-strip.css
│   │   ├── projects-teaser.css
│   │   ├── testimonials.css
│   │   ├── why-us.css
│   │   ├── cta-banner.css
│   │   ├── footer.css
│   │   ├── products.css
│   │   ├── projects.css
│   │   ├── about.css
│   │   ├── contact.css
│   │   ├── news.css
│   │   └── 404.css
│   │
│   └── js/
│       ├── main.js             # Global — transitions, nav, back to top, scroll reveal
│       ├── navbar.js           # Navbar scroll states + mobile menu
│       ├── animations.js       # GSAP hero entrance
│       ├── categories-slider.js
│       ├── products-home.js    # Homepage featured products
│       ├── products.js         # Products page filter
│       ├── projects.js         # Projects page filter
│       ├── contact.js          # Contact form → WhatsApp
│       └── news.js             # News page filter
│
├── data/
│   ├── products.json       # Product catalogue
│   ├── projects.json       # Completed projects
│   └── news.json           # News articles
│
└── pages/
├── products.html
├── projects.html
├── about.html
├── contact.html
├── news.html
└── 404.html

---

## Local Development

This is a static site with no build step. To run it locally:

1. Open the project folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html` and select **Open with Live Server**
4. The site opens at `http://127.0.0.1:5500`

---

## Deployment

Deployment is automatic. Pushing to the `main` branch triggers a Cloudflare Pages build and deploy within seconds.

```bash
git add -A
git commit -m "your message"
git push origin main
```

---

## Contact

For all enquiries: **+233 50 367 6484** (call or WhatsApp)
Showrooms in Takoradi and Accra.