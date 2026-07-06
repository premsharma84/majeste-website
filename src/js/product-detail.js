/* ============================================================
   APS MAJESTE — Product detail page rendering
   ============================================================ */

import { PRODUCTS, getProduct } from '../data/products.js';
import { showToast } from './ui.js';
import { url } from './utils.js';

function getQueryId() {
  const parsed = new URL(window.location.href);
  return parsed.searchParams.get('id') || '';
}

export function renderProductDetail() {
  const root = document.querySelector('[data-product-detail]');
  if (!root) return;

  let slug = getQueryId();
  let product = getProduct(slug);
  if (!product) {
    product = PRODUCTS[0];
    slug = product.slug;
  }

  // Update document title and meta
  document.title = `${product.name} — ${product.category} | APS MAJESTE`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', product.short);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${product.name} | APS MAJESTE`);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', product.short);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `https://apsmajeste.example.com/product.html?id=${slug}`);

  // Breadcrumb
  const crumb = document.querySelector('[data-product-breadcrumb]');
  if (crumb) crumb.textContent = product.name;

  root.innerHTML = `
    <div class="product-detail__media ph product-bg--${product.bg}" aria-label="${product.name} packaging">
      <span style="font-size:1.5rem;opacity:.55;font-style:italic">${product.name.split(' ')[0]}</span>
    </div>
    <div>
      <span class="product-detail__subtitle">${product.category} · ${product.size}</span>
      <h1 class="product-detail__title">${product.name}</h1>
      <p class="product-detail__desc">${product.description}</p>
      <ul class="product-detail__list">
        ${product.benefits.map((b) => `<li>${b}</li>`).join('')}
      </ul>
      <div class="product-detail__actions">
        <a href="${product.amazonUrl}" class="btn btn--primary btn--lg" target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
      </div>
      <div class="product-detail__tabs">
        <div class="product-detail__tab">
          <h3>Key Ingredients</h3>
          <p>${product.ingredients.join(' · ')}</p>
        </div>
        <div class="product-detail__tab">
          <h3>How to Use</h3>
          <p>${product.usage}</p>
        </div>
      </div>
    </div>
  `;

  // Buy on Amazon (external link)
  const buyBtn = root.querySelector('a[href*="amazon"]');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      showToast(`Opening ${product.name} on Amazon…`);
    });
  }

  // Pairings
  const pairRoot = document.querySelector('[data-product-pairings]');
  if (pairRoot && product.pairings.length) {
    const pairings = product.pairings
      .map((s) => getProduct(s))
      .filter(Boolean);
    pairRoot.innerHTML = pairings
      .map(
        (p) => `
        <article class="product-card reveal">
          <a href="${url('/product.html?id=')}${p.slug}" class="product-card__media">
            <div class="ph product-bg--${p.bg}" aria-hidden="true"><span style="font-size:1rem;opacity:.55">${p.name.split(' ')[0]}</span></div>
          </a>
          <div class="product-card__body">
            <span class="product-card__category">${p.category}</span>
            <h3 class="product-card__name"><a href="${url('/product.html?id=')}${p.slug}">${p.name}</a></h3>
            <p class="product-card__desc">${p.short}</p>
            <div class="product-card__footer">
              <span class="product-card__cta">View details</span>
            </div>
          </div>
        </article>`
      )
      .join('');
  }

  // Inject product JSON-LD structured data
  injectProductJsonLd(product, slug);
}

function injectProductJsonLd(p, slug) {
  const existing = document.getElementById('product-jsonld');
  if (existing) existing.remove();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.short,
    category: p.category,
    brand: { '@type': 'Brand', name: 'APS MAJESTE' },
    productID: slug,
    url: `https://apsmajeste.example.com/product.html?id=${slug}`,
    image: `https://apsmajeste.example.com/images/products/${slug}.jpg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: p.rating,
      reviewCount: p.reviews,
    },
  };
  if (p.amazonUrl) {
    data.offers = {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: p.amazonUrl,
      seller: { '@type': 'Organization', name: 'Amazon' },
    };
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'product-jsonld';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
