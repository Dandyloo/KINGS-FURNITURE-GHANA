/* ============================================================
   KINGS FURNITURE GHANA — Main JS
   main.js
   ============================================================ */

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

  // ── Handle back/forward cache (bfcache) restore ──
  // Fires when user hits back button — Samsung Browser uses bfcache aggressively
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      // Page restored from cache — reset scroll and overlay
      window.scrollTo(0, 0);

      if (overlay) {
        overlay.style.transition = 'none';
        overlay.style.transform = 'scaleY(0)';
      }

      // Clear any frozen GSAP opacity states on hero elements
      if (typeof gsap !== 'undefined') {
        const heroEls = document.querySelectorAll(
          '[data-hero-label],[data-hero-heading],[data-hero-body],[data-hero-cta],[data-hero-badge],[data-hero-img]'
        );
        gsap.set(heroEls, { clearProps: 'all' });

        // Re-run hero animation
        const heroLabel   = document.querySelector('[data-hero-label]');
        const heroHeading = document.querySelectorAll('[data-hero-heading]');
        const heroBody    = document.querySelector('[data-hero-body]');
        const heroCta     = document.querySelector('[data-hero-cta]');
        const heroBadge   = document.querySelector('[data-hero-badge]');

        if (heroLabel || heroHeading.length) {
          const tl = gsap.timeline({ delay: 0.05 });
          if (heroLabel)          tl.from(heroLabel,   { y: 16, opacity: 0, duration: 0.7 }, 0.1);
          if (heroHeading.length) tl.from(heroHeading, { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.2);
          if (heroBody)           tl.from(heroBody,    { y: 20, opacity: 0, duration: 0.7 }, 0.45);
          if (heroCta)            tl.from(heroCta,     { y: 16, opacity: 0, duration: 0.6 }, 0.6);
          if (heroBadge)          tl.from(heroBadge,   { y: 16, opacity: 0, duration: 0.6 }, 0.75);
        }
      }
    }
  });

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