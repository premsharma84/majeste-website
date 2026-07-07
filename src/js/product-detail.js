/* ============================================================
   APS MAJESTE — Product detail page rendering
   No prices, no cart — just product info + Buy on Amazon link.
   ============================================================ */

import { PRODUCTS, getProduct } from '../data/products.js';
import { link } from '../data/site.js';
import { showToast } from './ui.js';

/* Amazon icon */
const AMAZON_ICON =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:16px;height:16px"><path d="M14.02 9.05c.07.86.27 1.65.59 2.36.32.71.77 1.36 1.34 1.95.57.59 1.18 1.07 1.84 1.45.66.38 1.39.7 2.18.96l.6-.93c-.71-.21-1.34-.45-1.9-.71-.55-.27-1.07-.62-1.55-1.05-.48-.43-.86-.91-1.13-1.45-.27-.54-.46-1.18-.57-1.93h-1.4c-.07.51-.07.93 0 1.27l-.05.08zM14.02 9.05c-.07.78-.21 1.5-.43 2.16-.22.66-.55 1.27-1 1.83-.45.55-.96 1.02-1.55 1.4-.59.38-1.27.7-2.05.95l.5.9c1.05-.3 1.96-.73 2.74-1.31.78-.58 1.38-1.29 1.81-2.14.43-.85.7-1.85.81-3l-.83-.79zM4.39 17.05c.71.32 1.45.57 2.21.76.76.19 1.57.28 2.42.28 1.13 0 2.18-.16 3.16-.48.98-.32 1.85-.78 2.62-1.38.77-.6 1.39-1.36 1.85-2.28.46-.92.7-1.96.7-3.12 0-.78-.13-1.5-.4-2.16-.27-.66-.65-1.27-1.15-1.83.13-.36.23-.74.29-1.13.06-.39.09-.79.09-1.21 0-.55-.07-1.07-.21-1.55-.14-.48-.34-.94-.6-1.38-.78.04-1.51.18-2.18.43-.67.25-1.31.6-1.92 1.05-.62-.16-1.27-.27-1.94-.32-.67-.06-1.36-.04-2.07.04-.71-.46-1.45-.81-2.21-1.07-.76-.25-1.55-.4-2.36-.45-.27.46-.47.94-.6 1.45-.13.51-.18 1.04-.16 1.6 0 .42.04.83.11 1.21.07.39.18.76.32 1.12-.5.55-.88 1.16-1.15 1.83-.27.66-.4 1.38-.4 2.16 0 1.16.23 2.2.7 3.12.46.92 1.08 1.68 1.85 2.28.77.6 1.64 1.06 2.62 1.38.98.32 2.04.48 3.16.48z"/></svg>';

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
  if (canonical) canonical.setAttribute('href', `https://apsmajeste.in/product.html?id=${slug}`);

  // Breadcrumb
  const crumb = document.querySelector('[data-product-breadcrumb]');
  if (crumb) crumb.textContent = product.name;

  const amazonBtn = product.amazonUrl
    ? `<a href="${product.amazonUrl}" class="btn btn--primary btn--lg btn--amazon" target="_blank" rel="noopener noreferrer">${AMAZON_ICON} Buy on Amazon</a>`
    : '';

  const myntraIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:16px;height:16px"><path d="M3 3h3l5 12 5-12h3v18h-3V9l-5 12-5-12v12H3z"/></svg>';
  const myntraBtn = product.myntraUrl
    ? `<a href="${product.myntraUrl}" class="btn btn--primary btn--lg btn--myntra" target="_blank" rel="noopener noreferrer">${myntraIcon} Buy on Myntra</a>`
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
          (p) => `
        <article class="product-card reveal">
          <a href="${link(`product.html?id=${p.slug}`)}" class="product-card__media">
            ${p.image
              ? `<img src="${p.image}" alt="${p.name} — ${p.category}" loading="lazy" width="800" height="800">`
              : `<div class="ph product-bg--${p.bg}" aria-hidden="true"><span style="font-size:1rem;opacity:.55">${p.name.split(' ')[0]}</span></div>`
            }
          </a>
          <div class="product-card__body">
            <span class="product-card__category">${p.category}</span>
            <h3 class="product-card__name"><a href="${link(`product.html?id=${p.slug}`)}">${p.name}</a></h3>
            <p class="product-card__desc">${p.short}</p>
            <div class="product-card__footer">
              <span class="product-card__size">${p.size}</span>
              ${p.amazonUrl ? `<a href="${p.amazonUrl}" class="btn btn--primary btn--amazon" target="_blank" rel="noopener noreferrer">${AMAZON_ICON} Amazon</a>` : ''}
            </div>
          </div>
        </article>`
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
        const title = r.title ? `<h4 class="review-card__title">${escapeHtml(r.title)}</h4>` : '';
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
        <a href="${product.amazonUrl}" class="btn btn--amazon" target="_blank" rel="noopener noreferrer">
          ${AMAZON_ICON} Read all reviews on Amazon
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
