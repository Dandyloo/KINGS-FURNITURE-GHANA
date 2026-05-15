/* ============================================================
   KINGS FURNITURE GHANA — Navbar JS
   navbar.js — full rewrite
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // ── Find the hero section on the current page ──
  // Each page uses a different class for its hero
  const hero =
    document.querySelector('.hero') ||          // homepage
    document.querySelector('.about-hero') ||    // about
    document.querySelector('.products-hero') || // products
    document.querySelector('.projects-hero') || // projects
    null;

  // ── Scroll threshold ──
  // Switches navbar when the bottom of the hero scrolls past the top of the viewport
  // Falls back to 80px if no hero found (contact, 404, promotions)
  const getThreshold = () => {
    if (!hero) return 80;
    return hero.offsetTop + hero.offsetHeight - nav.offsetHeight;
  };

  // ── Apply nav state ──
  const updateNav = () => {
    const scrollY = window.scrollY;
    const threshold = getThreshold();

    if (scrollY >= threshold) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };

  // ── Listen ──
  window.addEventListener('scroll', updateNav, { passive: true });

  // ── Run once on load ──
  updateNav();

  // ── Recalculate threshold on resize (hero height can change) ──
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateNav, 120);
  });

  // ── Mobile menu ──
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileNav   = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile-close');
  const overlay     = document.querySelector('.nav__overlay');

  if (!hamburger || !mobileNav) return;

  const lockScroll   = () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const unlockScroll = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.classList.add('is-visible');
    lockScroll();
  };

  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('is-visible');
    unlockScroll();
  };

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);

  // Close on nav link click (navigates away)
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ── Sync nav state after bfcache restore (back button) ──
  window.addEventListener('pageshow', e => {
    if (e.persisted) {
      closeMenu();
      updateNav();
    }
  });
});