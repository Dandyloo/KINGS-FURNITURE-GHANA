/* ============================================================
   KINGS FURNITURE GHANA — Categories Slider
   assets/js/categories-slider.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const track       = document.getElementById('categoriesTrack');
  const progressBar = document.getElementById('categoriesProgress');
  const prevBtn     = document.querySelector('.categories__arrow--prev');
  const nextBtn     = document.querySelector('.categories__arrow--next');
  const counterCurrent = document.querySelector('.categories__counter-current');

  if (!track) return;

  const cards      = Array.from(track.querySelectorAll('.cat-card'));
  const total      = cards.length;
  let   currentIdx = 0;
  let   offset     = 0; // current translateX in px

  // ── Helpers ──

  const getCardWidth = () => {
    if (!cards[0]) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  };

  const maxOffset = () => {
    // Max scroll = total track width minus wrapper width
    const wrapperW = track.parentElement.getBoundingClientRect().width;
    const trackW   = track.scrollWidth;
    return Math.max(0, trackW - wrapperW);
  };

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const applyOffset = (x) => {
    offset = clamp(x, 0, maxOffset());
    track.style.transform = `translateX(-${offset}px)`;
    updateUI();
  };

  const updateUI = () => {
    const cardW   = getCardWidth();
    const idx     = cardW > 0 ? Math.round(offset / cardW) : 0;
    currentIdx    = clamp(idx, 0, total - 1);

    // Counter
    if (counterCurrent) counterCurrent.textContent = currentIdx + 1;

    // Progress bar — position within total range
    if (progressBar) {
      const pct = total > 1 ? (currentIdx / (total - 1)) * 100 : 100;
      // Show at least 1/total width so bar is always visible
      const minW = 100 / total;
      progressBar.style.width = `${Math.max(minW, pct)}%`;
    }

    // Arrow states
    if (prevBtn) prevBtn.disabled = offset <= 1;
    if (nextBtn) nextBtn.disabled = offset >= maxOffset() - 1;
  };

  const slideTo = (idx) => {
    const cardW = getCardWidth();
    applyOffset(idx * cardW);
  };

  // ── Arrow buttons ──
  if (prevBtn) prevBtn.addEventListener('click', () => slideTo(currentIdx - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => slideTo(currentIdx + 1));

  // ── Keyboard ──
  document.addEventListener('keydown', (e) => {
    const wrapper = track.closest('.categories__track-wrapper');
    if (!wrapper) return;
    if (e.key === 'ArrowLeft')  slideTo(currentIdx - 1);
    if (e.key === 'ArrowRight') slideTo(currentIdx + 1);
  });

  // ── Drag (mouse) ──
  let isDragging  = false;
  let dragStartX  = 0;
  let dragStartOffset = 0;
  let hasDragged  = false;

  track.addEventListener('mousedown', (e) => {
    isDragging       = true;
    hasDragged       = false;
    dragStartX       = e.clientX;
    dragStartOffset  = offset;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = dragStartX - e.clientX;
    if (Math.abs(delta) > 4) hasDragged = true;
    applyOffset(dragStartOffset + delta);
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    // Snap to nearest card
    slideTo(currentIdx);
  });

  // Prevent click-through on links after drag
  track.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (hasDragged) e.preventDefault();
    });
  });

  // ── Touch (mobile swipe) ──
  let touchStartX     = 0;
  let touchStartOffset = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX      = e.touches[0].clientX;
    touchStartOffset = offset;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    const delta = touchStartX - e.touches[0].clientX;
    applyOffset(touchStartOffset + delta);
  }, { passive: true });

  track.addEventListener('touchend', () => {
    track.style.transition = '';
    slideTo(currentIdx);
  });

  // ── Init ──
  updateUI();

  // Re-calc on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      slideTo(currentIdx);
    }, 120);
  });

  // ── GSAP entrance ──
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.set(cards, { opacity: 0, y: 40 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: track,
        start: 'top 88%',
        once: true,
      }
    });
  } else {
    // CSS fallback
    cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
  }
});