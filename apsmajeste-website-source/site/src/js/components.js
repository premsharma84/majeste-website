/* ============================================================
   APS MAJESTE — Reusable components (vanilla JS injection)
   Header + footer are injected into <div data-component="...">
   placeholders so every page stays DRY.
   ============================================================ */

import { SITE, NAV_LINKS, FOOTER_LINKS } from '../data/site.js';

/* ---------- Icons ---------- */
const ICONS = {
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor"/></svg>',
  pinterest:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 21c-.5-1.5-.5-3 0-5l1.5-6"/><path d="M9 11c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5-1.5 4-3.5 4-2.5-1-2.5-2"/></svg>',
  tiktok:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 4a4 4 0 0 0 4 4"/></svg>',
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
  const navItems = NAV_LINKS.map((link) => {
    const linkPage = link.href.split('/').pop().replace('.html', '') || 'index';
    const isCurrent =
      (current === 'index' && linkPage === 'index') ||
      (current === linkPage && current !== 'index');
    return `<li><a href="${link.href}"${isCurrent ? ' aria-current="page"' : ''}>${link.label}</a></li>`;
  }).join('');

  return `
    <a href="#main" class="skip-link">Skip to content</a>
    <header class="site-header" data-site-header>
      <div class="container site-header__inner">
        <a href="/" class="brand" aria-label="${SITE.brand} home">
          <span class="brand__prefix">${SITE.brandPrefix}</span>
          <span class="brand__main">${SITE.brandMain}</span>
        </a>
        <nav class="primary-nav" aria-label="Primary">
          <ul>${navItems}</ul>
        </nav>
        <div class="header__actions">
          <a href="/products.html" class="btn btn--primary hide-mobile">Shop</a>
          <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
        <ul>
          ${NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
        </ul>
        <a href="/products.html" class="btn btn--primary btn--block">Shop the Collection</a>
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
          <a href="/" class="footer-brand">
            <span class="brand__prefix">${SITE.brandPrefix}</span>
            <span class="brand__main">${SITE.brandMain}</span>
          </a>
          <p class="footer-tagline">${SITE.tagline}. Crafted in small batches in Provence and finished in New York.</p>
          <form class="footer-newsletter" data-newsletter aria-label="Newsletter signup">
            <label for="footer-email" class="sr-only">Email address</label>
            <input id="footer-email" type="email" name="email" placeholder="Email for ritual notes" required>
            <button type="submit" aria-label="Subscribe">${ICONS.arrow}</button>
          </form>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            ${FOOTER_LINKS.shop.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            ${FOOTER_LINKS.company.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Customer Care</h4>
          <ul>
            ${FOOTER_LINKS.legal.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
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
          <span>© ${year} ${SITE.brand} Maison. All rights reserved.</span>
          <span>Crafted in Provence · Finished in New York</span>
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
