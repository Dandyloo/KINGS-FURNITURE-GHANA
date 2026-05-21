/* ============================================================
   KINGS FURNITURE GHANA — Products Page
   products.js
   ============================================================ */

(async () => {

  const grid        = document.getElementById('products-grid');
  const filterTabs  = document.querySelectorAll('.filter-tab');
  const resultCount = document.getElementById('products-result-count');
  const heroCount   = document.getElementById('products-hero-count');

  if (!grid) return;

  const WA_NUMBER = '233503676484';

  /* ── FETCH DATA ── */
  let allProducts = [];

  try {
    const res  = await fetch('../data/products.json');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    allProducts = data.featured || [];
  } catch (err) {
    console.warn('Could not load products:', err);
    grid.innerHTML = `
      <div class="products-empty">
        <h3 class="products-empty__title">Unable to load products</h3>
        <p class="products-empty__body">Please try refreshing or contact us directly.</p>
        <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener" class="btn btn--primary">
          Chat on WhatsApp
        </a>
      </div>`;
    return;
  }

  /* ── UPDATE HERO COUNT ── */
  if (heroCount) heroCount.textContent = allProducts.length;

  /* ── UPDATE FILTER TAB COUNTS ── */
  filterTabs.forEach(tab => {
    const cat  = tab.dataset.filter;
    const span = tab.querySelector('.filter-tab__count');
    if (cat === 'all') {
      if (span) span.textContent = allProducts.length;
    } else {
      const count = allProducts.filter(p => p.categorySlug === cat).length;
      if (span) span.textContent = count;
      if (count === 0) tab.style.display = 'none';
    }
  });

  /* ── BUILD CARD HTML ── */
  const buildCard = (product) => {
    const waMessage = encodeURIComponent(
      `Hello Kings Furniture,\n\nI'd like to enquire about: ${product.name}.\n\nPlease send me more details.`
    );
    const waURL = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

    return `
      <article class="product-card" data-category="${product.categorySlug}">
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
          <a href="${waURL}" target="_blank" rel="noopener noreferrer" class="product-card__cta" aria-label="Enquire about ${product.name}">
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

  /* ── RENDER ALL CARDS ONCE ── */
  grid.innerHTML = allProducts.map(buildCard).join('');

  /* CSS entrance animation */
  const cards = grid.querySelectorAll('.product-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
    card.classList.add('card-animate-in');
  });

  /* Update result count */
  if (resultCount) resultCount.textContent = `${allProducts.length} pieces`;

  /* ── FILTER LOGIC ── */
  /* Reads URL hash on load — links like products.html#bedroom auto-filter */
  let activeFilter = window.location.hash.replace('#', '') || 'all';

  const applyFilter = (cat) => {
    activeFilter = cat;

    /* Update tab states */
    filterTabs.forEach(tab => {
      const active = tab.dataset.filter === cat;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    /* Show/hide cards */
    let visible = 0;
    cards.forEach(card => {
      const matches = cat === 'all' || card.dataset.category === cat;
      card.classList.toggle('is-hidden', !matches);
      if (matches) visible++;
    });

    /* Update result count */
    if (resultCount) {
      resultCount.textContent = `${visible} ${visible === 1 ? 'piece' : 'pieces'}`;
    }

    /* Update URL hash without reloading */
    history.replaceState(null, '', cat === 'all'
      ? window.location.pathname
      : `#${cat}`
    );
  };

  /* Tab click */
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
  });

  /* Apply initial filter from hash */
  if (activeFilter !== 'all') applyFilter(activeFilter);

})();