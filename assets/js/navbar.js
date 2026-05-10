/* ============================================================
   KINGS FURNITURE GHANA — Navbar JS
   navbar.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const isLightPage = nav.dataset.light === 'true';

  // ── Single source of truth for nav appearance ──
  // Called on every scroll event AND on menu close
  const updateNavAppearance = () => {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('is-scrolled');
      nav.classList.remove('nav--light');
    } else {
      nav.classList.remove('is-scrolled');
      // Only restore light if this page has a dark hero
      if (isLightPage) {
        nav.classList.add('nav--light');
      }
    }
  };

  // ── Scroll behaviour ──
  let lastScroll = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    updateNavAppearance();

    // Hide on scroll down, show on scroll up
    if (scrollY > lastScroll && scrollY > 200) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }

    lastScroll = scrollY;
  };

  // Set transition BEFORE first scroll so it doesn't flash on page load
  nav.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.5s ease, padding 0.4s ease, box-shadow 0.4s ease';

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Run once on init to set correct state
  updateNavAppearance();

  // ── Mobile menu ──
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileNav   = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile-close');
  const overlay     = document.querySelector('.nav__overlay');

  if (hamburger && mobileNav) {
    const openMenu = () => {
      hamburger.classList.add('is-open');
      mobileNav.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      // Hamburger lines: always white when menu is open
      if (hamburger) {
        hamburger.querySelectorAll('span').forEach(s => s.style.background = '#fff');
      }
    };

    const closeMenu = () => {
      hamburger.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // Reset hamburger lines — let CSS handle colour based on scroll state
      if (hamburger) {
        hamburger.querySelectorAll('span').forEach(s => s.style.background = '');
      }
      // Re-sync nav appearance after menu close
      updateNavAppearance();
    };

    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      mobileNav.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    if (overlay)     overlay.addEventListener('click', closeMenu);

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeMenu();
    });
  }
});