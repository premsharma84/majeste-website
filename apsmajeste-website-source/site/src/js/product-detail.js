/* ============================================================
   APS MAJESTE — Product detail page rendering
   ============================================================ */

import { PRODUCTS, getProduct, formatPrice } from '../data/products.js';
import { showToast } from './ui.js';

function getQueryId() {
  const url = new URL(window.location.href);
  return url.searchParams.get('id') || '';
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
      <div class="product-detail__price">${formatPrice(product.price)}</div>
      <p class="product-detail__desc">${product.description}</p>
      <ul class="product-detail__list">
        ${product.benefits.map((b) => `<li>${b}</li>`).join('')}
      </ul>
      <div class="product-detail__actions">
        <div class="product-detail__qty" aria-label="Quantity">
          <button type="button" data-qty="dec" aria-label="Decrease quantity">−</button>
          <input type="number" value="1" min="1" max="9" aria-label="Quantity" data-qty-input>
          <button type="button" data-qty="inc" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn btn--primary btn--lg" data-add-to-cart>Add to Bag · ${formatPrice(product.price)}</button>
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
        <div class="product-detail__tab">
          <h3>Shipping & Returns</h3>
          <p>Complimentary carbon-neutral shipping on orders over $95. 30-day returns on unopened products. Sample sachets available with every order.</p>
        </div>
      </div>
    </div>
  `;

  // Quantity controls
  const qtyInput = root.querySelector('[data-qty-input]');
  root.querySelectorAll('[data-qty]').forEach((btn) => {
    btn.addEventListener('click', () => {
      let v = parseInt(qtyInput.value, 10) || 1;
      v = btn.dataset.qty === 'inc' ? Math.min(9, v + 1) : Math.max(1, v - 1);
      qtyInput.value = v;
    });
  });

  // Add to bag (demo)
  const addBtn = root.querySelector('[data-add-to-cart]');
  addBtn.addEventListener('click', () => {
    showToast(`${product.name} added to your bag.`);
  });

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
          <a href="/product.html?id=${p.slug}" class="product-card__media">
            <div class="ph product-bg--${p.bg}" aria-hidden="true"><span style="font-size:1rem;opacity:.55">${p.name.split(' ')[0]}</span></div>
          </a>
          <div class="product-card__body">
            <span class="product-card__category">${p.category}</span>
            <h3 class="product-card__name"><a href="/product.html?id=${p.slug}">${p.name}</a></h3>
            <p class="product-card__desc">${p.short}</p>
            <div class="product-card__footer">
              <span class="product-card__price">${formatPrice(p.price)}</span>
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
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://apsmajeste.example.com/product.html?id=${slug}`,
      seller: { '@type': 'Organization', name: 'APS MAJESTE' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: p.rating,
      reviewCount: p.reviews,
    },
  };
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'product-jsonld';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
