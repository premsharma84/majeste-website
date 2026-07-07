/* ============================================================
   APS MAJESTE — Main entry
   Mounts shared components, then page-specific modules.
   ============================================================ */

import { mountComponents } from './components.js';
import { initNav } from './nav.js';
import { initReveal, initFaq, initBackToTop } from './ui.js';
import { renderProducts, renderFeatured } from './products.js';
import { renderProductDetail } from './product-detail.js';
import { initHeroSlider } from './slider.js';

function init() {
  // 1. Mount shared header/footer (depends on DOM mount points)
  mountComponents();

  // 2. Wire nav (header is now in the DOM)
  initNav();

  // 3. Page-specific renderers
  renderFeatured();
  renderProducts();
  renderProductDetail();

  // 4. UI behaviors
  initReveal();
  initFaq();
  initHeroSlider();
  initBackToTop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
