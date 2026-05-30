/* ============================================================
   KINGS FURNITURE GHANA — News Page
   news.js
   ============================================================ */

(async () => {

  const grid        = document.getElementById('news-grid');
  const filterTabs  = document.querySelectorAll('.filter-tab');
  const resultCount = document.getElementById('news-result-count');

  if (!grid) return;

  /* ── FETCH DATA ── */
  let allArticles = [];

  try {
    const res  = await fetch('../data/news.json');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    allArticles = data.articles || [];
  } catch (err) {
    console.warn('Could not load news:', err);
    grid.innerHTML = `
      <p style="grid-column:1/-1; text-align:center; padding:var(--space-20) 0; color:var(--color-text-secondary);">
        Unable to load articles.
      </p>`;
    return;
  }

  /* ── UPDATE FILTER COUNTS ── */
  filterTabs.forEach(tab => {
    const cat  = tab.dataset.filter;
    const span = tab.querySelector('.filter-tab__count');
    if (cat === 'all') {
      if (span) span.textContent = allArticles.length;
    } else {
      const count = allArticles.filter(a => a.categorySlug === cat).length;
      if (span) span.textContent = count;
      if (count === 0) tab.style.display = 'none';
    }
  });

  /* ── BUILD CARD ── */
  const buildCard = (article, index) => {
    const isFeatured = article.featured && index === 0;

    return `
      <article class="news-card ${isFeatured ? 'news-card--featured' : ''}" data-category="${article.categorySlug}">
        <figure class="news-card__figure">
          <img
            src="${article.image}"
            alt="${article.title}"
            class="news-card__img"
            loading="${index === 0 ? 'eager' : 'lazy'}"
            width="800"
            height="450"
          />
        </figure>
        <div class="news-card__body">
          <div class="news-card__meta">
            <span class="news-card__category">${article.category}</span>
            <span class="news-card__date">${article.dateFormatted}</span>
          </div>
          <h2 class="news-card__title">${article.title}</h2>
          <p class="news-card__excerpt">${article.excerpt}</p>
          <span class="news-card__cta">Read more →</span>
        </div>
      </article>
    `;
  };

  /* ── RENDER ── */
  grid.innerHTML = allArticles.map((article, i) => buildCard(article, i)).join('');

  /* CSS entrance animation */
  const cards = grid.querySelectorAll('.news-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
    card.classList.add('card-animate-in');
  });

  if (resultCount) resultCount.textContent = `${allArticles.length} articles`;

  /* ── FILTER ── */
  const applyFilter = (cat) => {
    filterTabs.forEach(tab => {
      const active = tab.dataset.filter === cat;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    let visible = 0;
    cards.forEach(card => {
      const matches = cat === 'all' || card.dataset.category === cat;
      card.classList.toggle('is-hidden', !matches);
      if (matches) visible++;
    });

    if (resultCount) {
      resultCount.textContent = `${visible} ${visible === 1 ? 'article' : 'articles'}`;
    }
  };

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
  });

})();