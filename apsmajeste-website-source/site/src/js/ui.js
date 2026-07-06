/* ============================================================
   APS MAJESTE — Scroll reveal + small UI behaviors
   ============================================================ */

export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

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

  els.forEach((el) => io.observe(el));
}

/* ---------- Toast (newsletter / form feedback) ---------- */
export function showToast(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

/* ---------- Newsletter (footer) ---------- */
export function initNewsletter() {
  const form = document.querySelector('[data-newsletter]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (!email || !email.value) return;
    showToast('Thank you — welcome to the APS MAJESTE ritual.');
    form.reset();
  });
}

/* ---------- FAQ (handled natively via <details>, but allow analytics) ---------- */
export function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        // Close siblings in the same .faq group for an accordion feel
        const group = item.closest('.faq');
        if (!group) return;
        group.querySelectorAll('.faq__item').forEach((sib) => {
          if (sib !== item && sib.open) sib.open = false;
        });
      }
    });
  });
}

/* ---------- Contact form (demo, no backend) ---------- */
export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Message received. Our concierge will reply within 24 hours.');
    form.reset();
  });
}
