/* ============================================================
   KINGS FURNITURE GHANA — Projects Page
   projects.js
   ============================================================ */

(async () => {

  const grid        = document.getElementById('projects-grid');
  const filterTabs  = document.querySelectorAll('.filter-tab');
  const resultCount = document.getElementById('projects-result-count');
  const heroCount   = document.getElementById('projects-hero-count');

  if (!grid) return;

  const WA_NUMBER = '233503676484';

  /* ── FETCH DATA ── */
  let allProjects = [];

  try {
    const res  = await fetch('../data/projects.json');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    allProjects = data.projects || [];
  } catch (err) {
    console.warn('Could not load projects:', err);
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding: var(--space-32) 0;">
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-6);">Unable to load projects.</p>
        <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener" class="btn btn--primary">
          Contact Us Directly
        </a>
      </div>`;
    return;
  }

  /* ── UPDATE COUNTS ── */
  if (heroCount) heroCount.textContent = allProjects.length;

  filterTabs.forEach(tab => {
    const cat  = tab.dataset.filter;
    const span = tab.querySelector('.filter-tab__count');
    if (cat === 'all') {
      if (span) span.textContent = allProjects.length;
    } else {
      const count = allProjects.filter(p =>
        p.category.toLowerCase() === cat
      ).length;
      if (span) span.textContent = count;
      if (count === 0) tab.style.display = 'none';
    }
  });

  /* ── BUILD CARD HTML ── */
  const buildCard = (project) => {
    const waMessage = encodeURIComponent(
      `Hello Kings Furniture,\n\nI'd like to enquire about your project work.\n\nProject reference: ${project.name}.`
    );
    const waURL = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

    return `
      <article
        class="project-grid-card"
        data-category="${project.category.toLowerCase()}"
        data-id="${project.id}"
      >
        <figure class="project-grid-card__figure">
          <img
            src="${project.image}"
            alt="${project.name} — Kings Furniture Ghana"
            class="project-grid-card__img"
            loading="lazy"
            width="900"
            height="675"
          />
          <div class="project-grid-card__overlay">
            <div class="project-grid-card__meta">
              <span class="project-grid-card__tag">${project.category}</span>
              <span class="project-grid-card__tag">${project.location}</span>
            </div>
            <h3 class="project-grid-card__name">${project.name}</h3>
            <p class="project-grid-card__desc">${project.description}</p>
            <a href="${waURL}" target="_blank" rel="noopener noreferrer" class="project-grid-card__cta">
              Enquire about this project →
            </a>
          </div>
        </figure>
      </article>
    `;
  };

  /* ── RENDER ALL CARDS ── */
  grid.innerHTML = allProjects.map(buildCard).join('');

  /* CSS entrance animation */
  const cards = grid.querySelectorAll('.project-grid-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.06}s`;
    card.classList.add('card-animate-in');
  });

  if (resultCount) resultCount.textContent = `${allProjects.length} projects`;

  /* ── FILTER LOGIC ── */
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
      resultCount.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    }

    history.replaceState(null, '', cat === 'all'
      ? window.location.pathname
      : `#${cat}`
    );
  };

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
  });

  /* Apply hash filter on load */
  const hashCat = window.location.hash.replace('#', '');
  if (hashCat) applyFilter(hashCat);

})();