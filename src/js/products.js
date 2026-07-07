/* ============================================================
   APS MAJESTE — Products page rendering & filtering
   ============================================================ */

import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { link } from '../data/site.js';

/* Amazon icon for "Buy on Amazon" button */
const AMAZON_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:14px;height:14px"><path d="M14.02 9.05c.07.86.27 1.65.59 2.36.32.71.77 1.36 1.34 1.95.57.59 1.18 1.07 1.84 1.45.66.38 1.39.7 2.18.96l.6-.93c-.71-.21-1.34-.45-1.9-.71-.55-.27-1.07-.62-1.55-1.05-.48-.43-.86-.91-1.13-1.45-.27-.54-.46-1.18-.57-1.93h-1.4c-.07.51-.07.93 0 1.27l-.05.08zM14.02 9.05c-.07.78-.21 1.5-.43 2.16-.22.66-.55 1.27-1 1.83-.45.55-.96 1.02-1.55 1.4-.59.38-1.27.7-2.05.95l.5.9c1.05-.3 1.96-.73 2.74-1.31.78-.58 1.38-1.29 1.81-2.14.43-.85.7-1.85.81-3l-.83-.79zM4.39 17.05c.71.32 1.45.57 2.21.76.76.19 1.57.28 2.42.28 1.13 0 2.18-.16 3.16-.48.98-.32 1.85-.78 2.62-1.38.77-.6 1.39-1.36 1.85-2.28.46-.92.7-1.96.7-3.12 0-.78-.13-1.5-.4-2.16-.27-.66-.65-1.27-1.15-1.83.13-.36.23-.74.29-1.13.06-.39.09-.79.09-1.21 0-.55-.07-1.07-.21-1.55-.14-.48-.34-.94-.6-1.38-.78.04-1.51.18-2.18.43-.67.25-1.31.6-1.92 1.05-.62-.16-1.27-.27-1.94-.32-.67-.06-1.36-.04-2.07.04-.71-.46-1.45-.81-2.21-1.07-.76-.25-1.55-.4-2.36-.45-.27.46-.47.94-.6 1.45-.13.51-.18 1.04-.16 1.6 0 .42.04.83.11 1.21.07.39.18.76.32 1.12-.5.55-.88 1.16-1.15 1.83-.27.66-.4 1.38-.4 2.16 0 1.16.23 2.2.7 3.12.46.92 1.08 1.68 1.85 2.28.77.6 1.64 1.06 2.62 1.38.98.32 2.04.48 3.16.48z"/></svg>';

/* Myntra icon for "Buy on Myntra" button */
const MYNTRA_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:14px;height:14px"><path d="M3 3h3l5 12 5-12h3v18h-3V9l-5 12-5-12v12H3z"/></svg>';

function productCard(p) {
  const tag = p.tag ? `<span class="product-card__tag">${p.tag}</span>` : '';
  const amazonBtn = p.amazonUrl
    ? `<a href="${p.amazonUrl}" class="btn btn--primary btn--amazon" target="_blank" rel="noopener noreferrer">${AMAZON_ICON} Amazon</a>`
    : '';
  const myntraBtn = p.myntraUrl
    ? `<a href="${p.myntraUrl}" class="btn btn--primary btn--myntra" target="_blank" rel="noopener noreferrer">${MYNTRA_ICON} Myntra</a>`
    : '';
  return `
    <article class="product-card reveal" data-category="${p.categorySlug}">
      <a href="${link(`product.html?id=${p.slug}`)}" class="product-card__media" aria-label="${p.name}">
        ${tag}
        ${p.image
          ? `<img src="${p.image}" alt="${p.name} — ${p.category}" loading="lazy" width="800" height="800">`
          : `<div class="ph product-bg--${p.bg}" aria-hidden="true"><span style="font-size:1.1rem;opacity:.55">${p.name.split(' ')[0]}</span></div>`
        }
      </a>
      <div class="product-card__body">
        <span class="product-card__category">${p.category}</span>
        <h3 class="product-card__name"><a href="${link(`product.html?id=${p.slug}`)}">${p.name}</a></h3>
        <p class="product-card__desc">${p.short}</p>
        <div class="product-card__footer">
          <span class="product-card__size">${p.size}</span>
          <div class="product-card__buy">
            ${amazonBtn}
            ${myntraBtn}
          </div>
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
  // Show up to 6 tagged products (Bestseller, New, Signature), prioritizing Bestseller first
  const priority = { Bestseller: 0, Signature: 1, New: 2 };
  const featured = PRODUCTS.filter((p) => p.tag)
    .sort((a, b) => (priority[a.tag] ?? 9) - (priority[b.tag] ?? 9))
    .slice(0, 6);
  grid.innerHTML = featured.map(productCard).join('');
}
