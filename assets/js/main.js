/* ============================================================
   KINGS FURNITURE GHANA — Main JS
   main.js

   Runs on every page. Handles:
   1. Page transitions
   2. Active nav link detection
   3. Back to top button
   4. WhatsApp floating button visibility
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PAGE TRANSITIONS ───────────────────────────────────────
     When a link is clicked, a white overlay scales up covering
     the page, then the new page loads.
  ── */
  const overlay = document.querySelector('.page-transition');

  if (overlay) {
    /* Fade out overlay on page load */
    overlay.style.transform = 'scaleY(0)';

    /* Intercept internal link clicks */
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');

      /* Skip external links, anchors, tel, mailto */
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.startsWith('tel') ||
        href.startsWith('mailto') ||
        href.startsWith('https://wa.me')
      ) return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        overlay.style.transformOrigin = 'top';
        overlay.style.transform = 'scaleY(1)';
        setTimeout(() => {
          window.location.href = href;
        }, 380);
      });
    });

    /* Reset on bfcache restore */
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        overlay.style.transition = 'none';
        overlay.style.transform = 'scaleY(0)';
      }
    });
  }

  /* ── ACTIVE NAV LINK DETECTION ──────────────────────────────
     Automatically marks the correct nav link as is-active
     based on the current page URL.
     This means you don't have to manually set is-active
     in every HTML file.
  ── */
  const currentPath = window.location.pathname;

  const navLinks = document.querySelectorAll('.nav__link, .nav__mobile-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (!linkPath) return;

    /* Normalize paths for comparison */
    const normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
    const normalizedLink    = linkPath.replace(/\/$/, '');

    /* Match exact page */
    if (
      normalizedCurrent.endsWith(normalizedLink) ||
      (normalizedLink.includes('index.html') && (normalizedCurrent === '/' || normalizedCurrent.endsWith('/')))
    ) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });

  /* ── BACK TO TOP BUTTON ─────────────────────────────────────
     Appears after scrolling 400px.
     Smooth scrolls back to top on click.
  ── */
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────────
     Uses Intersection Observer — no GSAP needed.
     Elements with data-reveal animate in when they
     enter the viewport.
  ── */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); /* only animate once */
        }
      });
    }, {
      threshold: 0.15,     /* fires when 15% of element is visible */
      rootMargin: '0px 0px -60px 0px'  /* slight offset from bottom */
    });

    revealElements.forEach(el => observer.observe(el));
  }

});