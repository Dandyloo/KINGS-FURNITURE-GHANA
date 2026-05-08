/* ============================================================
   KINGS FURNITURE GHANA — Homepage Featured Products
   assets/js/products-home.js
   ============================================================ */

(async () => {
  const grid = document.getElementById('featured-products-grid');
  if (!grid) return;

  // ── Fetch product data ──
  let products = [];
  try {
    const res = await fetch('./data/products.json');
    if (!res.ok) throw new Error('Failed to load products');
    const data = await res.json();
    products = data.featured || data.all || [];
  } catch (err) {
    console.warn('Kings Furniture: Could not load products.json', err);
    grid.innerHTML = `<p class="body-text text-muted" style="grid-column:1/-1;text-align:center;padding:var(--space-20) 0;">
      Unable to load products. <a href="./pages/products.html" class="text-brand">Browse our collection →</a>
    </p>`;
    return;
  }

  // Show first 6 featured products (3-column grid × 2 rows)
  const featured = products.slice(0, 6);

  // ── WhatsApp enquiry base URL ──
  const WA_NUMBER = '233503676484';

  // ── Build card HTML ──
  const buildCard = (product) => {
    const waMessage = encodeURIComponent(
      `Hello Kings Furniture,\n\nI'd like to enquire about: ${product.name}.\n\nPlease send me more details.`
    );
    const waURL = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

    return `
      <article class="product-card" data-stagger-child>
        <figure class="product-card__figure">
          <img
            src="${product.image}"
            alt="${product.name} — Kings Furniture Ghana"
            class="product-card__img"
            loading="lazy"
            width="800"
            height="600"
          />
          <span class="product-card__tag">${product.category}</span>
        </figure>
        <div class="product-card__body">
          <h3 class="product-card__name">${product.name}</h3>
          <p class="product-card__desc">${product.description}</p>
        </div>
        <div class="product-card__footer">
          <a
            href="${waURL}"
            target="_blank"
            rel="noopener noreferrer"
            class="product-card__cta"
            aria-label="Enquire about ${product.name} via WhatsApp"
          >
            Enquire About This Piece
            <em class="product-card__cta-arrow" aria-hidden="true">→</em>
          </a>
        </div>
      </article>
    `;
  };

  // ── Render cards ──
  grid.innerHTML = featured.map(buildCard).join('');

  // ── GSAP stagger reveal ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const cards = grid.querySelectorAll('.product-card');
    gsap.set(cards, { opacity: 0, y: 48 });

    ScrollTrigger.create({
      trigger: grid,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'expo.out',
        });
      }
    });
  } else {
    grid.querySelectorAll('.product-card').forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }
  
})();