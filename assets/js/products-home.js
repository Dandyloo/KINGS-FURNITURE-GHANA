/*
KINGS FURNITURE GHANA — Homepage Featured Products
products-home.js

What this file does:
1. Fetches product data from data/products.json
2. Builds HTML cards from that data
3. Injects them into the grid
4. Animates them in with GSAP
*/

(async () => {
  /* async/await lets us fetch data without blocking the page.
     The () => { }() at the end means it runs immediately. */

  const grid = document.getElementById('featured-products-grid');
  if (!grid) return;

  const WA_NUMBER = '233503676484';

  /*  FETCH DATA
    fetch() loads the JSON file.
    await means wait for it to finish before continuing.
    If it fails we show an error message instead.
  */
  let products = [];

  try {
    const response = await fetch('./data/products.json');
    if (!response.ok) throw new Error('Failed to load products');
    const data = await response.json();
    products = data.featured || [];
  } catch (err) {
    console.warn('Could not load products:', err);
    grid.innerHTML = `
      <p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary); padding: var(--space-20) 0;">
        Unable to load products.
        <a href="https://wa.me/${WA_NUMBER}" target="_blank" style="color: var(--color-brand);">
          Contact us directly →
        </a>
      </p>`;
    return;
  }

  /*  BUILD CARD HTML
    A function that takes one product object and returns
    the HTML string for that card.
  */
  const buildCard = (product) => {
    /* Pre-build the WhatsApp message URL */
    const waMessage = encodeURIComponent(
      `Hello Kings Furniture,\n\nI'd like to enquire about: ${product.name}.\n\nPlease send me more details.`
    );
    const waURL = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

    /* Template literal — backticks let us write multi-line HTML */
    return `
      <article class="product-card">
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
          <a href="${waURL}" target="_blank" rel="noopener noreferrer" class="product-card__cta" aria-label="Enquire about ${product.name} via WhatsApp">
            Enquire About This Piece
            <em class="product-card__cta-arrow" aria-hidden="true">→</em>
          </a>
          <a href="${waURL}" target="_blank" rel="noopener noreferrer" class="product-card__wa" aria-label="WhatsApp enquiry for ${product.name}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
        </div>
      </article>
    `;
  };

  /*  RENDER CARDS  */
  grid.innerHTML = products.map(buildCard).join('');

/* ── ANIMATION ── */
  /* CSS handles the animation — no GSAP needed */
  const cards = grid.querySelectorAll('.product-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('card-animate-in');
  });

})();