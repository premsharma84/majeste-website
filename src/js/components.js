/* ============================================================
   APS MAJESTE — Reusable components (vanilla JS injection)
   Header + footer are injected into <div data-component="...">
   placeholders so every page stays DRY.
   ============================================================ */

import { SITE, NAV_LINKS, FOOTER_LINKS, link } from '../data/site.js';

/* ---------- Icons ---------- */
const ICONS = {
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor"/></svg>',
  pinterest:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 21c-.5-1.5-.5-3 0-5l1.5-6"/><path d="M9 11c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5-1.5 4-3.5 4-2.5-1-2.5-2"/></svg>',
  tiktok:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 4a4 4 0 0 0 4 4"/></svg>',
  amazon:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.02 9.05c.07.86.27 1.65.59 2.36.32.71.77 1.36 1.34 1.95.57.59 1.18 1.07 1.84 1.45.66.38 1.39.7 2.18.96l.6-.93c-.71-.21-1.34-.45-1.9-.71-.55-.27-1.07-.62-1.55-1.05-.48-.43-.86-.91-1.13-1.45-.27-.54-.46-1.18-.57-1.93h-1.4c-.07.51-.07.93 0 1.27l-.05.08zM14.02 9.05c-.07.78-.21 1.5-.43 2.16-.22.66-.55 1.27-1 1.83-.45.55-.96 1.02-1.55 1.4-.59.38-1.27.7-2.05.95l.5.9c1.05-.3 1.96-.73 2.74-1.31.78-.58 1.38-1.29 1.81-2.14.43-.85.7-1.85.81-3l-.83-.79zM4.39 17.05c.71.32 1.45.57 2.21.76.76.19 1.57.28 2.42.28 1.13 0 2.18-.16 3.16-.48.98-.32 1.85-.78 2.62-1.38.77-.6 1.39-1.36 1.85-2.28.46-.92.7-1.96.7-3.12 0-.78-.13-1.5-.4-2.16-.27-.66-.65-1.27-1.15-1.83.13-.36.23-.74.29-1.13.06-.39.09-.79.09-1.21 0-.55-.07-1.07-.21-1.55-.14-.48-.34-.94-.6-1.38-.78.04-1.51.18-2.18.43-.67.25-1.31.6-1.92 1.05-.62-.16-1.27-.27-1.94-.32-.67-.06-1.36-.04-2.07.04-.71-.46-1.45-.81-2.21-1.07-.76-.25-1.55-.4-2.36-.45-.27.46-.47.94-.6 1.45-.13.51-.18 1.04-.16 1.6 0 .42.04.83.11 1.21.07.39.18.76.32 1.12-.5.55-.88 1.16-1.15 1.83-.27.66-.4 1.38-.4 2.16 0 1.16.23 2.2.7 3.12.46.92 1.08 1.68 1.85 2.28.77.6 1.64 1.06 2.62 1.38.98.32 2.04.48 3.16.48z"/></svg>',
  leaf:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 19c0-9 6-14 14-14 0 9-5 14-14 14z"/><path d="M5 19c4-4 7-6 10-7"/></svg>',
  droplet:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
  shield:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>',
  spark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg>',
  map:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  arrow: '→',
};

export function getIcon(name) {
  return ICONS[name] || '';
}

/* ---------- Header ---------- */
function renderHeader() {
  const current = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  const navItems = NAV_LINKS.map((navLink) => {
    const linkPage = navLink.href.split('?')[0].split('/').pop().replace('.html', '') || 'index';
    const isCurrent =
      (current === 'index' && linkPage === 'index') ||
      (current === linkPage && current !== 'index');
    return `<li><a href="${link(navLink.href)}"${isCurrent ? ' aria-current="page"' : ''}>${navLink.label}</a></li>`;
  }).join('');

  return `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="site-header" data-site-header>
      <div class="container site-header__inner">
        <a href="${link('index.html')}" class="brand brand--logo" aria-label="${SITE.brand} home">
          <img src="/images/brand/brand-logo.jpg" alt="${SITE.brand} logo" class="brand__logo-img" width="1200" height="1200" loading="eager" decoding="async">
        </a>
        <nav class="primary-nav" aria-label="Primary">
          <ul>${navItems}</ul>
        </nav>
        <div class="header__actions">
          <a href="${link('products.html')}" class="btn btn--primary hide-mobile">Products</a>
          <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
        <ul>
          ${NAV_LINKS.map((l) => `<li><a href="${link(l.href)}">${l.label}</a></li>`).join('')}
        </ul>
        <a href="${link('products.html')}" class="btn btn--primary btn--block">Browse Products</a>
      </div>
    </header>
  `;
}

/* ---------- Footer ---------- */
function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div>
          <a href="${link('index.html')}" class="footer-brand footer-brand--logo">
            <img src="/images/brand/brand-logo.jpg" alt="${SITE.brand} logo" class="brand__logo-img brand__logo-img--footer" width="1200" height="1200" loading="lazy" decoding="async">
          </a>
          <p class="footer-tagline">${SITE.tagline}. Crafted in small batches in Udaipur, India.</p>
          <form class="footer-newsletter" data-newsletter aria-label="Newsletter signup">
            <label for="footer-email" class="sr-only">Email address</label>
            <input id="footer-email" type="email" name="email" placeholder="Email for ritual notes" required>
            <button type="submit" aria-label="Subscribe">${ICONS.arrow}</button>
          </form>
        </div>
        <div class="footer-col">
          <h4>Products</h4>
          <ul>
            ${FOOTER_LINKS.shop.map((l) => `<li><a href="${link(l.href)}">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            ${FOOTER_LINKS.company.map((l) => `<li><a href="${link(l.href)}">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Customer Care</h4>
          <ul>
            ${FOOTER_LINKS.legal.map((l) => `<li><a href="${l.href.startsWith('admin') ? link(l.href) : link(l.href)}">${l.label}</a></li>`).join('')}
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
          </ul>
          <div class="footer-social" style="margin-top:1.25rem">
            <a href="${SITE.social.instagram}" aria-label="Instagram" rel="noopener" target="_blank">${ICONS.instagram}</a>
            <a href="${SITE.social.pinterest}" aria-label="Pinterest" rel="noopener" target="_blank">${ICONS.pinterest}</a>
            <a href="${SITE.social.tiktok}" aria-label="TikTok" rel="noopener" target="_blank">${ICONS.tiktok}</a>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="footer-bottom">
          <span>© ${year} ${SITE.brand}. Made in Udaipur, India.</span>
          <span>Available on Amazon India</span>
        </div>
      </div>
    </footer>
    <div class="toast" data-toast role="status" aria-live="polite"></div>
  `;
}

/* ---------- Mount ---------- */
export function mountComponents() {
  const headerMount = document.querySelector('[data-component="header"]');
  const footerMount = document.querySelector('[data-component="footer"]');
  if (headerMount) headerMount.innerHTML = renderHeader();
  if (footerMount) footerMount.innerHTML = renderFooter();
}
