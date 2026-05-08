/* ============================================================
   KINGS FURNITURE GHANA — Animations JS (GSAP)
   animations.js
   ============================================================ */

// Runs after GSAP + ScrollTrigger are loaded via CDN in HTML

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded — animations disabled.');
    // Fallback: reveal everything immediately
    document.querySelectorAll('[data-reveal],[data-reveal-left],[data-reveal-right],[data-reveal-scale]')
      .forEach(el => el.classList.add('is-revealed'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Global defaults ──
  gsap.defaults({ ease: 'expo.out', duration: 1 });

  // ── Hero entrance (triggered on page load, not scroll) ──
  const heroTimeline = () => {
    const tl = gsap.timeline({ delay: 0.1 });
    const heroLabel = document.querySelector('[data-hero-label]');
    const heroHeading = document.querySelectorAll('[data-hero-heading]');
    const heroBody = document.querySelector('[data-hero-body]');
    const heroCta = document.querySelector('[data-hero-cta]');
    const heroBadge = document.querySelector('[data-hero-badge]');

    if (heroLabel) tl.from(heroLabel, { y: 16, opacity: 0, duration: 0.7 }, 0.2);
    if (heroHeading.length) tl.from(heroHeading, { y: 40, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.35);
    if (heroBody) tl.from(heroBody, { y: 20, opacity: 0, duration: 0.7 }, 0.6);
    if (heroCta) tl.from(heroCta, { y: 16, opacity: 0, duration: 0.6 }, 0.75);
    if (heroBadge) tl.from(heroBadge, { y: 16, opacity: 0, duration: 0.6 }, 0.9);

    return tl;
  };

  heroTimeline();

  // ── Hero parallax ──
  const heroImg = document.querySelector('[data-hero-img]');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImg.closest('[data-hero]') || heroImg,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
  }

  // ── Scroll reveals — generic ──
  document.querySelectorAll('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      }
    });
  });

  document.querySelectorAll('[data-reveal-left]').forEach(el => {
    gsap.from(el, {
      x: -40,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  document.querySelectorAll('[data-reveal-right]').forEach(el => {
    gsap.from(el, {
      x: 40,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  document.querySelectorAll('[data-reveal-scale]').forEach(el => {
    gsap.from(el, {
      scale: 0.94,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ── Staggered grid reveals ──
  document.querySelectorAll('[data-stagger-parent]').forEach(parent => {
    const children = parent.querySelectorAll('[data-stagger-child]');
    gsap.from(children, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        once: true,
      }
    });
  });

  // ── Stat number count-up ──
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate() {
        el.textContent = (Number.isInteger(target)
          ? Math.round(obj.val)
          : obj.val.toFixed(1)) + suffix;
      }
    });
  });

  // ── Section heading split lines ──
  // Simple version: wrap each word in a span and stagger
  document.querySelectorAll('[data-split-heading]').forEach(el => {
    const text = el.textContent.trim();
    const words = text.split(' ');
    el.innerHTML = words.map(w => `<span style="display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:0.05em;"><span style="display:inline-block;">${w}</span></span>`).join(' ');
    const spans = el.querySelectorAll('span span');
    gsap.from(spans, {
      y: '110%',
      duration: 0.9,
      stagger: 0.06,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  // ── Image reveal with clip ──
  document.querySelectorAll('[data-img-reveal]').forEach(el => {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // ── CTA banner reveal ──
  const ctaBanner = document.querySelector('[data-cta-banner]');
  if (ctaBanner) {
    const ctaChildren = ctaBanner.querySelectorAll('[data-cta-item]');
    gsap.from(ctaChildren, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      scrollTrigger: { trigger: ctaBanner, start: 'top 85%', once: true }
    });
  }

  // ── Horizontal rule draw ──
  document.querySelectorAll('[data-rule-draw]').forEach(el => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

});