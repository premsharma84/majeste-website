/* ============================================================
   APS MAJESTE — Products page rendering & filtering
   ============================================================ */

import { PRODUCTS, CATEGORIES, GENDERS } from '../data/products.js';
import { link } from '../data/site.js';

/* Inline "Buy Now:" + clickable platform logos.
   Clean, premium presentation — no button containers.
   Order: Myntra first, then Amazon (per brand preference). */
const MYNTRA_LOGO = '<img src="/images/brand/myntra-logo.svg" alt="Buy on Myntra" class="buy-now-logo" width="70" height="22" loading="lazy" decoding="async">';
const AMAZON_LOGO = '<img src="/images/brand/amazon-logo.svg" alt="Buy on Amazon" class="buy-now-logo" width="60" height="18" loading="lazy" decoding="async">';

function buyNowLinks(p) {
  const links = [];
  if (p.myntraUrl) {
    links.push(`<a href="${p.myntraUrl}" class="buy-now-link" target="_blank" rel="noopener noreferrer" aria-label="Buy ${p.name} on Myntra">${MYNTRA_LOGO}</a>`);
  }
  if (p.amazonUrl) {
    links.push(`<a href="${p.amazonUrl}" class="buy-now-link" target="_blank" rel="noopener noreferrer" aria-label="Buy ${p.name} on Amazon">${AMAZON_LOGO}</a>`);
  }
  if (!links.length) return '';
  return `
    <div class="buy-now-inline">
      <span class="buy-now-inline__label">Buy Now:</span>
      <div class="buy-now-inline__logos">
        ${links.join('')}
      </div>
    </div>
  `;
}

function productCard(p) {
  const tag = p.tag ? `<span class="product-card__tag">${p.tag}</span>` : '';
  const genderBadge = p.gender
    ? `<span class="product-card__gender product-card__gender--${p.gender}">${genderLabel(p.gender)}</span>`
    : '';
  return `
    <article class="product-card reveal" data-category="${p.categorySlug}" data-gender="${p.gender || ''}">
      <a href="${link(`product.html?id=${p.slug}`)}" class="product-card__media" aria-label="View ${p.name}">
        ${tag}
        ${p.image
          ? `<img src="${p.image}" alt="${p.name} — ${p.category}" loading="lazy" width="800" height="800">`
          : `<div class="ph product-bg--${p.bg}" aria-hidden="true"><span style="font-size:1.1rem;opacity:.55">${p.name.split(' ')[0]}</span></div>`
        }
      </a>
      <div class="product-card__body">
        <div class="product-card__header">
          <span class="product-card__category">${p.category}</span>
          ${genderBadge}
        </div>
        <h3 class="product-card__name"><a href="${link(`product.html?id=${p.slug}`)}">${p.name}</a></h3>
        <p class="product-card__desc">${p.short}</p>
        <div class="product-card__footer">
          <span class="product-card__size">${p.size}</span>
          ${buyNowLinks(p)}
        </div>
      </div>
    </article>
  `;
}

function genderLabel(gender) {
  const map = { male: 'For Men', female: 'For Women', unisex: 'Unisex' };
  return map[gender] || '';
}

export function renderProducts() {
  const grid = document.querySelector('[data-products-grid]');
  const filterBar = document.querySelector('[data-filter-bar]');
  const genderBar = document.querySelector('[data-gender-bar]');
  if (!grid) return;

  // State: which category and gender are currently selected
  let activeCategory = 'all';
  let activeGender = 'all';

  function applyFilters() {
    grid.querySelectorAll('[data-category]').forEach((card) => {
      const cardCat = card.dataset.category;
      const cardGender = card.dataset.gender;
      const showCat = activeCategory === 'all' || cardCat === activeCategory;
      const showGender =
        activeGender === 'all' ||
        !cardGender || // face washes always show (no gender)
        cardGender === activeGender;
      card.style.display = showCat && showGender ? '' : 'none';
    });
  }

  // Build category filter chips
  if (filterBar && !filterBar.childElementCount) {
    filterBar.innerHTML = CATEGORIES.map((c, i) => `
      <button class="filter-chip${i === 0 ? ' is-active' : ''}" data-filter="${c.slug}" type="button">${c.label}</button>
    `).join('');

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCategory = btn.dataset.filter;
      applyFilters();

      // Show/hide gender filter bar — only visible when Perfumes is selected
      if (genderBar) {
        if (activeCategory === 'perfumes') {
          genderBar.style.display = '';
        } else {
          genderBar.style.display = 'none';
          // Reset gender filter when hiding
          activeGender = 'all';
          genderBar.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('is-active'));
          const allChip = genderBar.querySelector('[data-gender-filter="all"]');
          if (allChip) allChip.classList.add('is-active');
        }
      }
    });
  }

  // Build gender filter chips (initially hidden, only shows for Perfumes)
  if (genderBar && !genderBar.childElementCount) {
    genderBar.innerHTML = `
      <span class="gender-bar__label">For:</span>
      ${GENDERS.map((g, i) => `
        <button class="filter-chip filter-chip--gender${i === 0 ? ' is-active' : ''}" data-gender-filter="${g.slug}" type="button">${g.label}</button>
      `).join('')}
    `;
    genderBar.style.display = 'none'; // Hidden initially

    genderBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-gender-filter]');
      if (!btn) return;
      genderBar.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeGender = btn.dataset.genderFilter;
      applyFilters();
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
