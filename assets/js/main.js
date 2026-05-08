/* ============================================================
   KINGS FURNITURE GHANA — Main JS
   main.js
   ============================================================ */

// Import modules (referenced via script tags in HTML)
// navbar.js, animations.js handle their own init

document.addEventListener('DOMContentLoaded', () => {

  // ── Page transition overlay ──
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    // On load: fade out overlay
    overlay.style.transform = 'scaleY(1)';
    requestAnimationFrame(() => {
      overlay.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      overlay.style.transformOrigin = 'top';
      overlay.style.transform = 'scaleY(0)';
    });

    // On link click: fade in overlay
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http')) return;
      link.addEventListener('click', e => {
        e.preventDefault();
        overlay.style.transformOrigin = 'bottom';
        overlay.style.transform = 'scaleY(1)';
        setTimeout(() => { window.location.href = href; }, 550);
      });
    });
  }

  // ── Active nav link ──
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('is-active');
    }
    if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
      link.classList.add('is-active');
    }
  });

});