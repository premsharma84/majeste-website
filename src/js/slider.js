/* ============================================================
   APS MAJESTE — Hero Slider
   Auto-rotating carousel with manual controls (dots + arrows).
   Pauses on hover. Respects reduced motion.
   ============================================================ */

export function initHeroSlider() {
  const slider = document.querySelector('[data-hero-slider]');
  if (!slider) return;

  const track = slider.querySelector('[data-slider-track]');
  const slides = slider.querySelectorAll('[data-slide]');
  const dots = slider.querySelectorAll('[data-go-to]');
  const prevBtn = slider.querySelector('[data-slider-prev]');
  const nextBtn = slider.querySelector('[data-slider-next]');

  if (!slides.length || !track) return;

  let current = 0;
  let autoRotateTimer = null;
  const AUTO_ROTATE_MS = 5000;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateTrackHeight() {
    const active = slides[current];
    if (!active) return;
    // Temporarily make the slide visible to measure its height
    active.style.visibility = 'hidden';
    active.style.display = 'block';
    const h = active.offsetHeight;
    active.style.visibility = '';
    active.style.display = '';
    track.style.height = h + 'px';
  }

  function goTo(index) {
    // Wrap around
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    // Remove active from all
    slides.forEach((s) => s.classList.remove('is-active'));
    dots.forEach((d) => d.classList.remove('is-active'));

    // Add active to target
    slides[index].classList.add('is-active');
    if (dots[index]) dots[index].classList.add('is-active');

    current = index;
    updateTrackHeight();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoRotate() {
    if (prefersReducedMotion) return;
    stopAutoRotate();
    autoRotateTimer = window.setInterval(next, AUTO_ROTATE_MS);
  }

  function stopAutoRotate() {
    if (autoRotateTimer) {
      window.clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }

  // Wire up controls
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.goTo, 10));
      startAutoRotate(); // Reset timer after manual interaction
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      startAutoRotate();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      startAutoRotate();
    });
  }

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoRotate);
  slider.addEventListener('mouseleave', startAutoRotate);

  // Pause when tab is not visible (saves battery + prevents slide skipping)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoRotate();
    },
    { passive: true }
  );

  slider.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        // Swipe threshold: 50px
        if (diff > 0) {
          next(); // Swipe left → next
        } else {
          prev(); // Swipe right → prev
        }
      }
      startAutoRotate();
    },
    { passive: true }
  );

  // Keyboard navigation
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prev();
      startAutoRotate();
    } else if (e.key === 'ArrowRight') {
      next();
      startAutoRotate();
    }
  });

  // Set initial track height
  updateTrackHeight();

  // Recalculate height once images finish loading — fixes incorrect height
  // measurements that happen when the slider initializes before the
  // hero images have loaded (a common cause of cropping/overflow).
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      updateTrackHeight();
    } else {
      img.addEventListener('load', updateTrackHeight, { once: true });
      img.addEventListener('error', updateTrackHeight, { once: true });
    }
  });

  // Update height on resize
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(updateTrackHeight, 100);
  });

  // Start auto-rotate
  startAutoRotate();
}
