/* Three jobs:
1. Detect scroll position — switch nav between transparent
and is-scrolled states
2. Handle pages with no hero — apply is-scrolled immediately
3. Mobile menu — open, close, keyboard, backdrop click
*/

document.addEventListener('DOMContentLoaded', () => {

  const nav         = document.querySelector('.nav');
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileNav   = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile-close');
  const backdrop    = document.querySelector('.nav__backdrop');

  if (!nav) return;

  // ── SCROLL DETECTION ──
  const hero =
    document.querySelector('.hero')          ||
    document.querySelector('.about-hero')    ||
    document.querySelector('.products-hero') ||
    document.querySelector('.projects-hero') ||
    document.querySelector('.page-hero')     ||
    null;

  if (!hero) {
    nav.classList.add('is-scrolled');
  } else {
    const updateNav = () => {
      const threshold = hero.offsetTop + hero.offsetHeight - nav.offsetHeight;
      if (window.scrollY >= threshold) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateNav, 150);
    });
  }

  // ── MOBILE MENU ──
  const lockScroll   = () => { document.body.style.overflow = 'hidden'; };
  const unlockScroll = () => { document.body.style.overflow = ''; };

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('is-visible');
    // FIX 1 — hide the white navbar bar inside the menu
    nav.classList.add('is-menu-open');
    lockScroll();
  };

  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('is-visible');
    // FIX 1 — restore navbar
    nav.classList.remove('is-menu-open');
    unlockScroll();
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.contains('is-open') ? closeMenu() : openMenu();
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (backdrop)    backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // FIX 2 — close menu if window resizes to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) closeMenu();
  });

});