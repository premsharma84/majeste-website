/* ============================================================
   APS MAJESTE — Shared site data (brand, nav)
   ============================================================ */

export const SITE = {
  brand: 'APS MAJESTE',
  brandPrefix: 'APS',
  brandMain: 'MAJESTE',
  brandAccent: '',
  tagline: 'Look Good, Feel Confident, and Leave a Lasting Impression',
  domain: 'https://www.apsmajeste.com',
  email: 'office@apsmajeste.com',
  phone: '+91 83067 15754',
  phoneRaw: '+918306715754',
  whatsapp: 'https://wa.me/918306715754',
  address: {
    line1: 'Redsky Retail Private Limited, S206, 2nd Floor, Amrti Shree',
    line2: 'Ashok Nagar, Near City Center',
    city: 'Udaipur',
    region: 'Rajasthan',
    postalCode: '313001',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/apsmajeste',
    facebook: 'https://facebook.com/apsmajeste',
    whatsapp: 'https://wa.me/918306715754',
  },
  founded: 2019,
  amazonStore: 'https://www.amazon.in/stores/APSMajeste/page/A020038B-14E3-4ECE-91C7-F662B0771842',
  myntraStore: 'https://www.myntra.com',
  flipkartStore: 'https://www.flipkart.com',
  jioMartStore: 'https://www.jiomart.com',
  // Partner / Distributor / Retailer / Modern Trade / Bulk & Corporate enquiry Google Form.
  partnerFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfK2-p8kjsHyZ4d9K6aC_92kJdB04Z78jp2HMDvWwdPSLO85Q/viewform?embedded=true',
  partnerFormLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfK2-p8kjsHyZ4d9K6aC_92kJdB04Z78jp2HMDvWwdPSLO85Q/viewform?usp=dialog',
};

/**
 * Build a base-path-aware internal URL.
 */
export function link(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}

export const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'about.html', label: 'About' },
  { href: 'products.html', label: 'Products' },
  { href: 'why-choose-us.html', label: 'Why APS MAJESTE' },
  { href: 'contact.html', label: 'Contact Us' },
];

export const FOOTER_LINKS = {
  shop: [
    { href: 'products.html', label: 'All Products' },
    { href: 'products.html#face-wash', label: 'Face Wash' },
    { href: 'products.html#perfumes', label: 'Perfumes' },
  ],
  company: [
    { href: 'about.html', label: 'Our Story' },
    { href: 'why-choose-us.html', label: 'Why APS MAJESTE' },
    { href: 'contact.html', label: 'Contact Us' },
    { href: 'products.html', label: 'Browse Products' },
  ],
  business: [
    { href: 'contact.html#partner', label: 'Enquiry' },
  ],
  legal: [
    { href: 'privacy-policy.html', label: 'Privacy Policy' },
    { href: 'terms.html', label: 'Terms & Conditions' },
    { href: 'contact.html', label: 'Customer Care' },
    { href: 'admin/', label: 'Admin' },
  ],
};
