/* ============================================================
   KINGS FURNITURE GHANA — About Page Animations
   assets/js/about.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // No GSAP — make everything visible immediately
    document.querySelectorAll(
      '.about-story__figure, .about-story__text, .about-craft__header, .about-craft__scene, .about-craft__team-label'
    ).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Wait for all images to load so ScrollTrigger calculates positions correctly
  const allImgs = document.querySelectorAll('.about-story__figure img, .about-craft__scene img');
  const imgPromises = Array.from(allImgs).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(res => {
      img.addEventListener('load', res);
      img.addEventListener('error', res);
    });
  });

  Promise.all(imgPromises).then(() => {
    // Refresh ScrollTrigger after images have loaded and layout is final
    ScrollTrigger.refresh();

    // ── Brand story ──
    const storyFigure = document.querySelector('.about-story__figure');
    const storyText   = document.querySelector('.about-story__text');

    if (storyFigure) {
      gsap.from(storyFigure, {
        x: -48,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: storyFigure,
          start: 'top 85%',
          once: true,
        }
      });
    }

    if (storyText) {
      gsap.from(storyText, {
        x: 48,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: storyText,
          start: 'top 85%',
          once: true,
        }
      });
    }

    // ── Craftsmanship header ──
    const craftHeader = document.querySelector('.about-craft__header');
    if (craftHeader) {
      gsap.from(craftHeader, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: craftHeader,
          start: 'top 88%',
          once: true,
        }
      });
    }

    // ── Workshop scene ──
    const craftScene = document.querySelector('.about-craft__scene');
    if (craftScene) {
      gsap.from(craftScene, {
        y: 48,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: craftScene,
          start: 'top 88%',
          once: true,
        }
      });
    }

    // ── Team label ──
    const teamLabel = document.querySelector('.about-craft__team-label');
    if (teamLabel) {
      gsap.from(teamLabel, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: teamLabel,
          start: 'top 90%',
          once: true,
        }
      });
    }

    // ── Timeline header ──
    const timelineHeader = document.querySelector('.about-timeline__header');
    if (timelineHeader) {
      gsap.from(timelineHeader, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: timelineHeader,
          start: 'top 88%',
          once: true,
        }
      });
    }

    // ── Showrooms header ──
    const showroomsHeader = document.querySelector('.about-showrooms__header');
    if (showroomsHeader) {
      gsap.from(showroomsHeader, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: showroomsHeader,
          start: 'top 88%',
          once: true,
        }
      });
    }
  });
});