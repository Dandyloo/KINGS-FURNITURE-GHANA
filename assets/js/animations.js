/*  Uses GSAP + ScrollTrigger for:
   1. Hero entrance — elements animate in on page load
   2. Scroll reveals — elements animate in as you scroll
 */

window.addEventListener('load', () => {

  /* GSAP CHECK
    If GSAP fails to load, make everything visible immediately
    so the page isn't broken.
  */
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* HERO ENTRANCE
    A timeline plays elements in sequence on page load.
    Each .from() animates FROM the values listed TO the
    element's natural CSS state.
  */
  const heroLabel   = document.querySelector('.hero__label');
  const heroHeading = document.querySelector('.hero__heading');
  const heroBody    = document.querySelector('.hero__body');
  const heroActions = document.querySelector('.hero__actions');
  const heroBadge   = document.querySelector('.hero__badge');
  const heroScroll  = document.querySelector('.hero__scroll');

  if (heroLabel) {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(heroLabel, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'expo.out'
    })
    .from(heroHeading, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out'
    }, '-=0.4')              /* starts 0.4s before previous finishes */
    .from(heroBody, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'expo.out'
    }, '-=0.5')
    .from(heroActions, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'expo.out'
    }, '-=0.4')
    .from(heroBadge, {
      x: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'expo.out'
    }, '-=0.5')
    .from(heroScroll, {
      opacity: 0,
      duration: 0.5,
      ease: 'expo.out'
    }, '-=0.2');
  }

  /* SCROLL REVEALS
    Any element with data-reveal animates in when it
    enters the viewport during scroll.
    once: true means it only animates once, not every time.
  */
  document.querySelectorAll('[data-reveal]').forEach(el => {
    /* Skip hero elements — they already have their own animation */
    if (el.closest('.hero')) return;

    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',  /* fires when element is 88% from top of viewport */
        once: true
      }
    });
  });

  /* STAGGER GRIDS
    When a parent has data-stagger, its children animate in
    one after another with a small delay between each.
    */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.children;
    if (!children.length) return;

    gsap.from(children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,   /* 0.12s delay between each child */
      ease: 'expo.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 85%',
        once: true
      }
    });
  });

});