/* ============================================================
   APS MAJESTE — Partner / Enquiry form embed
   ------------------------------------------------------------
   Renders the Google Form iframe on /contact.html#partner when
   SITE.partnerFormUrl is a real, embeddable Google Form URL.

   If the URL still contains the placeholder token
   "DEMO-REPLACE-WITH-REAL-FORM-ID", a polished fallback CTA
   card is rendered instead of a broken iframe. This keeps the
   page looking professional until the real form URL is dropped
   into src/data/site.js.
   ============================================================ */

import { SITE } from '../data/site.js';

const PLACEHOLDER_TOKEN = 'DEMO-REPLACE-WITH-REAL-FORM-ID';

export function initPartnerForm() {
  const mount = document.querySelector('[data-partner-form]');
  if (!mount) return;

  const url = SITE.partnerFormUrl || '';

  // Detect placeholder URL → render fallback CTA card
  if (!url || url.includes(PLACEHOLDER_TOKEN)) {
    mount.innerHTML = `
      <div class="partner-form-fallback">
        <div class="partner-form-fallback__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 7l9 6 9-6"/>
            <rect x="3" y="5" width="18" height="14" rx="2"/>
          </svg>
        </div>
        <h3 class="partner-form-fallback__title">Partner enquiry form — coming soon</h3>
        <p class="partner-form-fallback__body">
          Our online partner enquiry form is being finalised. In the meantime, we'd love to
          hear from you directly — reach out via email, phone, or WhatsApp and our partnerships
          team will respond within 1–2 business days.
        </p>
        <div class="partner-form-fallback__actions">
          <a href="mailto:office@apsmajeste.com" class="btn btn--primary btn--lg">Email Us</a>
          <a href="tel:${SITE.phoneRaw}" class="btn btn--ghost btn--lg">Call ${SITE.phone}</a>
          <a href="${SITE.social.whatsapp}" target="_blank" rel="noopener noreferrer"
             class="btn btn--ghost btn--lg" style="background:#25D366; color:#fff; border-color:#25D366">
            WhatsApp Us
          </a>
        </div>
        <p class="partner-form-fallback__note">
          Please include your firm name, contact person, phone number, city &amp; state with pincode,
          and the partnership type you're interested in (Distributor / Retailer / Modern Trade / Bulk &amp; Corporate).
        </p>
      </div>
    `;
    return;
  }

  // Real URL → render the iframe
  mount.innerHTML = `
    <iframe
      src="${url}"
      title="APS MAJESTE Partner Enquiry Form"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade">
      Loading…
    </iframe>
  `;
}
