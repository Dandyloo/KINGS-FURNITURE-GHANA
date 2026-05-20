/* Categories Slider
   Three interaction methods:
   1. Arrow buttons — click prev/next
   2. Mouse drag — click and drag left/right
   3. Touch swipe — finger swipe on mobile
*/

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("categoriesTrack");
  const progressBar = document.getElementById("categoriesProgress");
  const prevBtn = document.querySelector(".categories__arrow--prev");
  const nextBtn = document.querySelector(".categories__arrow--next");
  const counterCurrent = document.querySelector(".categories__counter-current");

  if (!track) return;

  const cards = Array.from(track.querySelectorAll(".cat-card"));
  const total = cards.length;
  let currentIdx = 0;
  let offset = 0; /* current translateX in pixels */

  /* HELPERS */

  /* Get width of one card including gap */
  const getCardWidth = () => {
    if (!cards[0]) return 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  };

  /* Maximum scroll distance */
  const getMaxOffset = () => {
    const wrapperWidth = track.parentElement.getBoundingClientRect().width;
    return Math.max(0, track.scrollWidth - wrapperWidth);
  };

  /* Clamp value between min and max */
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  /* APPLY POSITION 
     Moves the track and updates all UI elements.
  */
  const applyOffset = (x) => {
    offset = clamp(x, 0, getMaxOffset());
    track.style.transform = `translateX(-${offset}px)`;
    updateUI();
  };

  /* UPDATE UI */
  const updateUI = () => {
    const cardWidth = getCardWidth();
    const idx = cardWidth > 0 ? Math.round(offset / cardWidth) : 0;
    currentIdx = clamp(idx, 0, total - 1);

    /* Counter */
    if (counterCurrent) counterCurrent.textContent = currentIdx + 1;

    /* Progress bar width */
    if (progressBar) {
      const pct = total > 1 ? (currentIdx / (total - 1)) * 100 : 100;
      const minWidth = 100 / total;
      progressBar.style.width = `${Math.max(minWidth, pct)}%`;
    }

    /* Arrow disabled states */
    if (prevBtn) prevBtn.disabled = offset <= 0;
    if (nextBtn) nextBtn.disabled = offset >= getMaxOffset();
  };

  /* SLIDE TO INDEX */
  const slideTo = (idx) => {
    const cardWidth = getCardWidth();
    applyOffset(idx * cardWidth);
  };

  /* ARROW BUTTONS */
  if (prevBtn) prevBtn.addEventListener("click", () => slideTo(currentIdx - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => slideTo(currentIdx + 1));

  /* KEYBOARD */
  document.addEventListener("keydown", (e) => {
    /* Only respond if slider is visible on screen */
    const rect = track.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === "ArrowLeft") slideTo(currentIdx - 1);
    if (e.key === "ArrowRight") slideTo(currentIdx + 1);
  });

  /* MOUSE DRAG
    Three events: mousedown (start), mousemove (drag),
    mouseup (release and snap).
  */
  let isDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let hasDragged = false;

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    hasDragged = false;
    dragStartX = e.clientX;
    dragStartOffset = offset;
    /* Remove transition during drag so it follows finger instantly */
    track.style.transition = "none";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const delta = dragStartX - e.clientX;
    if (Math.abs(delta) > 4) hasDragged = true;
    applyOffset(dragStartOffset + delta);
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    /* Restore transition for snap animation */
    track.style.transition = "";
    slideTo(currentIdx);
  });

  /* Prevent card links from firing after a drag */
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (hasDragged) e.preventDefault();
    });
  });

  /* TOUCH SWIPE
    Same logic as mouse drag but using touch events.
  */
  let touchStartX = 0;
  let touchStartOffset = 0;

  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartOffset = offset;
      track.style.transition = "none";
    },
    { passive: true },
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      const delta = touchStartX - e.touches[0].clientX;
      applyOffset(touchStartOffset + delta);
    },
    { passive: true },
  );

  track.addEventListener("touchend", () => {
    track.style.transition = "";
    slideTo(currentIdx);
  });

  /* RESIZE */
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => slideTo(currentIdx), 150);
  });

  /* INIT */
  updateUI();
});
