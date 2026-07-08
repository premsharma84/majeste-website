/* ============================================================
   APS MAJESTE — Product detail page rendering
   No prices, no cart — just product info + Buy on Amazon link.
   ============================================================ */

import { PRODUCTS, getProduct } from '../data/products.js';
import { link } from '../data/site.js';
import { showToast } from './ui.js';

/* Amazon + Myntra logos for "Buy Now" buttons */
const AMAZON_LOGO_LG = '<img src="/images/brand/amazon-logo.svg" alt="Amazon" class="buy-logo buy-logo--lg" width="84" height="25" loading="lazy" decoding="async">';
const MYNTRA_LOGO_LG = '<img src="/images/brand/myntra-logo.svg" alt="Myntra" class="buy-logo buy-logo--lg" width="92" height="25" loading="lazy" decoding="async">';
const AMAZON_LOGO_SM = '<img src="/images/brand/amazon-logo.svg" alt="Amazon" class="buy-logo" width="70" height="21" loading="lazy" decoding="async">';
const MYNTRA_LOGO_SM = '<img src="/images/brand/myntra-logo.svg" alt="Myntra" class="buy-logo" width="76" height="21" loading="lazy" decoding="async">';

function getQueryId() {
  const url = new URL(window.location.href);
  return url.searchParams.get('id') || '';
}

export function renderProductDetail() {
  const root = document.querySelector('[data-product-detail]');
  if (!root) return;

  let slug = getQueryId();
  let product = getProduct(slug);

  // If no slug or product not found, show "not found" state instead of silently
  // falling back to a different product (which is confusing and a SEO risk).
  if (!product) {
    document.title = 'Product Not Found | APS MAJESTE';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'The product you were looking for could not be found. Browse our full collection of face washes and eau de parfums.');

    // Update breadcrumb
    const crumb = document.querySelector('[data-product-breadcrumb]');
    if (crumb) crumb.textContent = 'Not Found';

    // Hide pairings and reviews sections (they have nothing to show)
    const pairSection = document.querySelector('[data-product-pairings]')?.closest('section');
    if (pairSection) pairSection.style.display = 'none';
    const reviewsSection = document.querySelector('[data-product-reviews]')?.closest('section');
    if (reviewsSection) reviewsSection.style.display = 'none';

    root.innerHTML = `
      <div class="product-detail__not-found">
        <span class="eyebrow">404</span>
        <h1 class="product-detail__title">Product not found</h1>
        <p class="product-detail__desc">We couldn't find the product you were looking for. It may have been moved, renamed, or is no longer available.</p>
        <div class="product-detail__actions">
          <a href="${link('products.html')}" class="btn btn--primary btn--lg">Browse All Products</a>
          <a href="${link('index.html')}" class="btn btn--ghost btn--lg">Return Home</a>
        </div>
      </div>
    `;
    return;
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
  if (canonical) canonical.setAttribute('href', `https://apsmajeste.in/product.html?id=${slug}`);

  // Breadcrumb
  const crumb = document.querySelector('[data-product-breadcrumb]');
  if (crumb) crumb.textContent = product.name;

  const amazonBtn = product.amazonUrl
    ? `<a href="${product.amazonUrl}" class="btn btn--buy btn--buy-amazon btn--lg" target="_blank" rel="noopener noreferrer">${AMAZON_LOGO_LG}<span class="buy-now-text">Buy Now</span></a>`
    : '';

  const myntraBtn = product.myntraUrl
    ? `<a href="${product.myntraUrl}" class="btn btn--buy btn--buy-myntra btn--lg" target="_blank" rel="noopener noreferrer">${MYNTRA_LOGO_LG}<span class="buy-now-text">Buy Now</span></a>`
    : '';

  root.innerHTML = `
    <div class="product-detail__media" aria-label="${product.name} packaging">
      ${product.image
        ? `<img src="${product.image}" alt="${product.name} — ${product.category}" loading="lazy" width="800" height="800">`
        : `<div class="ph product-bg--${product.bg}" aria-hidden="true"><span style="font-size:1.5rem;opacity:.55;font-style:italic">${product.name.split(' ')[0]}</span></div>`
      }
    </div>
    <div>
      <span class="product-detail__subtitle">${product.category} · ${product.size}</span>
      <h1 class="product-detail__title">${product.name}</h1>
      ${product.rating && product.reviews ? `
        <div class="product-detail__rating">
          <span class="product-detail__rating-stars">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span class="product-detail__rating-value">${product.rating.toFixed(1)}</span>
          <span class="product-detail__rating-count">(${product.reviews} ${product.reviews === 1 ? 'review' : 'reviews'} on Amazon)</span>
        </div>
      ` : ''}
      <p class="product-detail__desc">${product.description}</p>
      <ul class="product-detail__list">
        ${product.benefits.map((b) => `<li>${b}</li>`).join('')}
      </ul>
      <div class="product-detail__actions">
        ${amazonBtn}
        ${myntraBtn}
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
          <h3>Shipping & Availability</h3>
          <p>Available on Amazon India with fast delivery across the country. Click "Buy on Amazon" to view current pricing, offers, and delivery options.</p>
        </div>
      </div>
    </div>
  `;

  // Pairings (other products — same category or explicitly paired)
  const pairRoot = document.querySelector('[data-product-pairings]');
  if (pairRoot) {
    // Show up to 3 other products, prioritizing explicitly paired ones
    const paired = (product.pairings || [])
      .map((s) => getProduct(s))
      .filter((p) => p && p.slug !== product.slug);
    const others = PRODUCTS.filter(
      (p) => p.slug !== product.slug && !paired.find((pp) => pp.slug === p.slug)
    ).slice(0, 3 - paired.length);
    const pairings = [...paired, ...others].slice(0, 3);

    if (pairings.length) {
      pairRoot.innerHTML = pairings
        .map(
          (p) => {
            const genderBadge = p.gender
              ? `<span class="product-card__gender product-card__gender--${p.gender}">${genderLabel(p.gender)}</span>`
              : '';
            const amazonBtn = p.amazonUrl
              ? `<a href="${p.amazonUrl}" class="btn btn--buy btn--buy-amazon" target="_blank" rel="noopener noreferrer">${AMAZON_LOGO_SM}<span class="buy-now-text">Buy Now</span></a>`
              : '';
            const myntraBtn = p.myntraUrl
              ? `<a href="${p.myntraUrl}" class="btn btn--buy btn--buy-myntra" target="_blank" rel="noopener noreferrer">${MYNTRA_LOGO_SM}<span class="buy-now-text">Buy Now</span></a>`
              : '';
            return `
        <article class="product-card reveal">
          <a href="${link(`product.html?id=${p.slug}`)}" class="product-card__media" aria-label="View ${p.name}">
            ${p.image
              ? `<img src="${p.image}" alt="${p.name} — ${p.category}" loading="lazy" width="800" height="800">`
              : `<div class="ph product-bg--${p.bg}" aria-hidden="true"><span style="font-size:1rem;opacity:.55">${p.name.split(' ')[0]}</span></div>`
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
              <div class="product-card__buy">
                ${amazonBtn}
                ${myntraBtn}
              </div>
            </div>
          </div>
        </article>`;
          }
        )
        .join('');
    } else {
      // Hide the pairings section entirely if no pairings
      const pairSection = pairRoot.closest('section');
      if (pairSection) pairSection.style.display = 'none';
    }
  }

  // Render customer reviews section
  renderProductReviews(product);

  // Inject product JSON-LD structured data (no price — Amazon offer only)
  injectProductJsonLd(product, slug);
}

/* ---------- Customer Reviews (from Amazon) ---------- */
function renderProductReviews(product) {
  const reviewsRoot = document.querySelector('[data-product-reviews]');
  if (!reviewsRoot) return;

  const reviews = product.customerReviews || [];
  const rating = product.rating;
  const reviewCount = product.reviews || 0;

  // If no reviews at all, hide the section
  if (reviews.length === 0 && reviewCount === 0) {
    const section = reviewsRoot.closest('section');
    if (section) section.style.display = 'none';
    return;
  }

  // Build rating summary
  const stars = rating ? '★★★★★'.slice(0, Math.round(rating)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(rating)) : '';
  const ratingSummary = rating
    ? `<div class="reviews-summary">
        <div class="reviews-summary__rating">
          <span class="reviews-summary__stars">${stars}</span>
          <span class="reviews-summary__value">${rating.toFixed(1)}</span>
        </div>
        <div class="reviews-summary__count">Based on ${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'} on Amazon India</div>
      </div>`
    : '';

  // Build individual review cards
  const reviewCards = reviews.length
    ? reviews.map((r) => {
        const rStars = r.rating ? '★★★★★'.slice(0, Math.round(r.rating)) + '☆☆☆☆☆'.slice(0, 5 - Math.round(r.rating)) : '';
        const verifiedBadge = r.verified ? '<span class="review-card__verified">✓ Verified Purchase</span>' : '';
        const title = r.title ? `<h3 class="review-card__title">${escapeHtml(r.title)}</h3>` : '';
        const body = r.body ? `<p class="review-card__body">${escapeHtml(r.body)}</p>` : '';
        const date = r.date ? `<span class="review-card__date">${escapeHtml(r.date)}</span>` : '';
        return `
          <article class="review-card">
            <div class="review-card__head">
              <div class="review-card__avatar" aria-hidden="true">${escapeHtml((r.reviewer || '?').charAt(0).toUpperCase())}</div>
              <div class="review-card__meta">
                <div class="review-card__reviewer">${escapeHtml(r.reviewer || 'Anonymous')}</div>
                ${date}
              </div>
              <div class="review-card__rating">
                <span class="review-card__stars">${rStars}</span>
                ${verifiedBadge}
              </div>
            </div>
            ${title}
            ${body}
          </article>
        `;
      }).join('')
    : '<p class="reviews-empty">No detailed reviews yet. Be the first to review this product on Amazon India.</p>';

  reviewsRoot.innerHTML = `
    ${ratingSummary}
    <div class="reviews-list">
      ${reviewCards}
    </div>
    ${product.amazonUrl ? `
      <div class="reviews__cta">
        <a href="${product.amazonUrl}" class="btn btn--buy btn--buy-amazon" target="_blank" rel="noopener noreferrer">
          ${AMAZON_LOGO_SM}<span class="buy-now-text">Read all reviews on Amazon</span>
        </a>
      </div>
    ` : ''}
  `;
}

/* Escape HTML to prevent XSS from review text */
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* Gender label helper (mirrors products.js) */
function genderLabel(gender) {
  const map = { male: 'For Men', female: 'For Women', unisex: 'Unisex' };
  return map[gender] || '';
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
    url: `https://apsmajeste.in/product.html?id=${slug}`,
    image: `https://apsmajeste.in/images/products/${slug}.jpg`,
    offers: p.amazonUrl
      ? {
          '@type': 'Offer',
          url: p.amazonUrl,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Amazon India' },
          ...(p.amazonAsin ? { sku: p.amazonAsin, mpn: p.amazonAsin } : {}),
        }
      : undefined,
    aggregateRating:
      p.rating && p.reviews
        ? {
            '@type': 'AggregateRating',
            ratingValue: p.rating,
            reviewCount: p.reviews,
          }
        : undefined,
    // Include individual reviews in structured data for Google rich results
    review: (p.customerReviews || []).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.reviewer || 'Anonymous' },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      name: r.title || '',
      reviewBody: r.body || '',
    })),
  };
  // Remove undefined fields
  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);
  if (data.review && data.review.length === 0) delete data.review;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'product-jsonld';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
