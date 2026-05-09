document.addEventListener('DOMContentLoaded', () => {

  // ── Prevent browser restoring scroll on back navigation ──
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // ── Page transition overlay ──
  const overlay = document.querySelector('.page-transition');
  if (overlay) {
    overlay.style.transform = 'scaleY(1)';
    overlay.style.transition = 'none';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
        overlay.style.transformOrigin = 'top';
        overlay.style.transform = 'scaleY(0)';
      });
    });

    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.includes('#') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        href.startsWith('http')
      ) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        overlay.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        overlay.style.transformOrigin = 'bottom';
        overlay.style.transform = 'scaleY(1)';
        setTimeout(() => { window.location.href = href; }, 520);
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
    if (
      href === '/' ||
      href === './index.html' ||
      href === '../index.html'
    ) {
      if (
        currentPath === '/' ||
        currentPath.endsWith('/index.html') ||
        currentPath.endsWith('/KINGS-FURNITURE-GHANA/')
      ) {
        link.classList.add('is-active');
      }
    }
  });

});
