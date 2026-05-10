/* ============================================================
   KINGS FURNITURE GHANA — Projects Page
   assets/js/projects.js
   ============================================================ */

(async () => {
  const grid        = document.getElementById('projects-grid');
  const filterTabs  = document.querySelectorAll('.proj-filter-tab');
  const resultCount = document.getElementById('projects-result-count');
  const heroCount   = document.getElementById('projects-hero-count');

  if (!grid) return;

  const WA_NUMBER = '233503676484';

  // ── Load data ──
  let allProjects = [];
  try {
    const res = await fetch('../data/projects.json');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    allProjects = data.projects || [];
  } catch (err) {
    console.warn('Kings Furniture: Could not load projects.json', err);
    grid.innerHTML = `
      <div class="projects-empty">
        <div class="projects-empty__icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3 class="projects-empty__title">Unable to load projects</h3>
        <p class="projects-empty__body">Please try refreshing the page.</p>
      </div>`;
    return;
  }

  // ── Hero entrance animation ──
  if (typeof gsap !== 'undefined') {
    const heroLabel   = document.querySelector('.projects-hero__label');
    const heroHeading = document.querySelector('.projects-hero__heading');
    const heroMeta    = document.querySelector('.projects-hero__meta');
    const tl = gsap.timeline({ delay: 0.1 });
    if (heroLabel)   tl.from(heroLabel,   { y: 16, opacity: 0, duration: 0.7, ease: 'expo.out' }, 0.1);
    if (heroHeading) tl.from(heroHeading, { y: 32, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0.2);
    if (heroMeta)    tl.from(heroMeta,    { y: 16, opacity: 0, duration: 0.7, ease: 'expo.out' }, 0.45);
  }

  // ── Update counts ──
  if (heroCount) heroCount.textContent = allProjects.length;

  filterTabs.forEach(tab => {
    const cat = tab.dataset.filter;
    if (cat === 'all') {
      const span = tab.querySelector('.proj-filter-tab__count');
      if (span) span.textContent = allProjects.length;
    } else {
      const count = allProjects.filter(p => p.category === cat).length;
      const span = tab.querySelector('.proj-filter-tab__count');
      if (span) span.textContent = count;
      if (count === 0) tab.style.display = 'none';
    }
  });

  // ── Build card ──
  const buildCard = (project) => {
    return `
      <button
        class="project-grid-card project-grid-card--${project.size || 'medium'}"
        data-category="${project.category}"
        data-id="${project.id}"
        aria-label="View project: ${project.name}"
        type="button"
      >
        <figure class="project-grid-card__figure">
          <img
            src="${project.image}"
            alt="${project.name} — Kings Furniture Ghana"
            class="project-grid-card__img"
            loading="lazy"
            width="900"
            height="600"
          />
          <div class="project-grid-card__overlay" aria-hidden="true">
            <div class="project-grid-card__tags">
              <span class="project-grid-card__tag">${project.categoryLabel}</span>
              <span class="project-grid-card__tag project-grid-card__tag--location">${project.location}</span>
            </div>
            <h3 class="project-grid-card__name">${project.name}</h3>
            <p class="project-grid-card__desc">${project.description}</p>
            <span class="project-grid-card__cta">View Project →</span>
          </div>
        </figure>
      </button>
    `;
  };

  // ── Lightbox ──
  const lightbox         = document.getElementById('projectLightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose    = document.getElementById('lightboxClose');
  const lightboxImg      = document.getElementById('lightboxImg');
  const lightboxName     = document.getElementById('lightboxName');
  const lightboxDesc     = document.getElementById('lightboxDesc');
  const lightboxCat      = document.getElementById('lightboxCat');
  const lightboxLoc      = document.getElementById('lightboxLoc');
  const lightboxYear     = document.getElementById('lightboxYear');
  const lightboxScope    = document.getElementById('lightboxScope');
  const lightboxWa       = document.getElementById('lightboxWa');

  const openLightbox = (project) => {
    if (!lightbox) return;

    if (lightboxImg)   lightboxImg.src = project.image;
    if (lightboxImg)   lightboxImg.alt = project.name;
    if (lightboxName)  lightboxName.textContent = project.name;
    if (lightboxDesc)  lightboxDesc.textContent = project.description;
    if (lightboxCat)   lightboxCat.textContent  = project.categoryLabel;
    if (lightboxLoc)   lightboxLoc.textContent  = project.location;
    if (lightboxYear)  lightboxYear.textContent = project.year;
    if (lightboxScope) lightboxScope.textContent = project.scope;

    if (lightboxWa) {
      const msg = encodeURIComponent(
        `Hello Kings Furniture,\n\nI'm interested in a project similar to: ${project.name}.\n\nPlease tell me more about how you can help.`
      );
      lightboxWa.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
    }

    lightbox.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Trap focus
    if (lightboxClose) lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxClose)    lightboxClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) closeLightbox();
  });

  // ── Render ──
  const renderProjects = (projects) => {
    if (projects.length === 0) {
      grid.innerHTML = `
        <div class="projects-empty">
          <div class="projects-empty__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3 class="projects-empty__title">No projects found</h3>
          <p class="projects-empty__body">Try another category, or view all projects.</p>
        </div>`;
      if (resultCount) resultCount.textContent = '0 projects';
      return;
    }

    grid.innerHTML = projects.map(buildCard).join('');

    if (resultCount) {
      resultCount.textContent = `${projects.length} ${projects.length === 1 ? 'project' : 'projects'}`;
    }

    // Attach lightbox listeners
    grid.querySelectorAll('.project-grid-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const project = allProjects.find(p => p.id === id);
        if (project) openLightbox(project);
      });
    });

    // GSAP reveal
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      const cards = grid.querySelectorAll('.project-grid-card');
      gsap.set(cards, { opacity: 0, y: 40 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'expo.out',
      });
    } else {
      grid.querySelectorAll('.project-grid-card').forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'none';
      });
    }
  };

  // ── Filter logic ──
  let activeFilter = 'all';

  const hashCat = window.location.hash.replace('#', '');
  if (hashCat && ['residential', 'commercial', 'hospitality'].includes(hashCat)) {
    activeFilter = hashCat;
  }

  const applyFilter = (cat) => {
    activeFilter = cat;

    filterTabs.forEach(tab => {
      tab.classList.toggle('is-active', tab.dataset.filter === cat);
      tab.setAttribute('aria-pressed', tab.dataset.filter === cat ? 'true' : 'false');
    });

    const filtered = cat === 'all'
      ? allProjects
      : allProjects.filter(p => p.category === cat);

    renderProjects(filtered);
  };

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.filter;
      history.replaceState(null, '', cat === 'all' ? window.location.pathname : `#${cat}`);
      applyFilter(cat);
    });
  });

  // Sync active tab UI on init
  filterTabs.forEach(tab => {
    tab.classList.toggle('is-active', tab.dataset.filter === activeFilter);
  });

  // ── Initial render ──
  applyFilter(activeFilter);

})();