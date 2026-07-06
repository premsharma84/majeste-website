/* ============================================================
   APS MAJESTE — Products page rendering & filtering
   ============================================================ */

import { PRODUCTS, CATEGORIES, formatPrice } from '../data/products.js';

function productCard(p) {
  const tag = p.tag ? `<span class="product-card__tag">${p.tag}</span>` : '';
  return `
    <article class="product-card reveal" data-category="${p.categorySlug}">
      <a href="/product.html?id=${p.slug}" class="product-card__media" aria-label="${p.name}">
        ${tag}
        <div class="ph product-bg--${p.bg}" aria-hidden="true">
          <span style="font-size:1.1rem;opacity:.55">${p.name.split(' ')[0]}</span>
        </div>
      </a>
      <div class="product-card__body">
        <span class="product-card__category">${p.category}</span>
        <h3 class="product-card__name"><a href="/product.html?id=${p.slug}">${p.name}</a></h3>
        <p class="product-card__desc">${p.short}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${formatPrice(p.price)}</span>
          <span class="link-arrow" aria-hidden="true"></span>
        </div>
      </div>
    </article>
  `;
}

export function renderProducts() {
  const grid = document.querySelector('[data-products-grid]');
  const filterBar = document.querySelector('[data-filter-bar]');
  if (!grid) return;

  // Build filter chips
  if (filterBar && !filterBar.childElementCount) {
    filterBar.innerHTML = CATEGORIES.map((c, i) => `
      <button class="filter-chip${i === 0 ? ' is-active' : ''}" data-filter="${c.slug}" type="button">${c.label}</button>
    `).join('');

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      const slug = btn.dataset.filter;
      grid.querySelectorAll('[data-category]').forEach((card) => {
        const show = slug === 'all' || card.dataset.category === slug;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  grid.innerHTML = PRODUCTS.map(productCard).join('');

  // Re-observe newly added reveal elements
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    grid.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
  } else {
    grid.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
}

/* ---------- Featured products (home page) ---------- */
export function renderFeatured() {
  const grid = document.querySelector('[data-featured-grid]');
  if (!grid) return;
  const featured = PRODUCTS.filter((p) => p.tag).slice(0, 3);
  grid.innerHTML = featured.map(productCard).join('');
}
