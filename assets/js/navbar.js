/* ============================================================
   KINGS FURNITURE GHANA — Navbar JS
   navbar.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  // ── Scroll behaviour ──
  let lastScroll = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('is-scrolled');
      nav.classList.remove('nav--light');
    } else {
      nav.classList.remove('is-scrolled');
      // Restore light mode if hero is dark
      if (nav.dataset.light === 'true') nav.classList.add('nav--light');
    }

    // Hide on scroll down, show on scroll up
    if (scrollY > lastScroll && scrollY > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScroll = scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  nav.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, padding 0.4s ease, box-shadow 0.4s ease';

  // ── Mobile menu ──
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile-close');
  const overlay = document.querySelector('.nav__overlay');

  if (hamburger && mobileNav) {
    console.log('Mobile menu initialized');

    const openMenu = () => {
      hamburger.classList.add('is-open');
      mobileNav.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (nav) nav.classList.add('nav--light');
    };

    const closeMenu = () => {
      hamburger.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // Restore light mode if still in hero section
      if (window.scrollY < 60 && nav.dataset.light === 'true') {
        nav.classList.add('nav--light');
      } else {
        nav.classList.remove('nav--light');
      }
    };

    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      mobileNav.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeMenu();
    });
  } else {
    console.warn('Mobile menu elements not found');
  }
});