/* ============================================================
   APS MAJESTE — Shared site data (brand, nav)
   ============================================================ */

export const SITE = {
  brand: 'APS MAJESTE',
  brandPrefix: 'APS',
  brandMain: 'MAJESTE',
  brandAccent: '',
  tagline: 'Majestic Personal Care, Crafted with Intention',
  domain: 'https://apsmajeste.example.com',
  email: 'concierge@apsmajeste.example.com',
  phone: '+1 (212) 555-0184',
  address: {
    line1: '118 Mercer Street',
    city: 'New York',
    region: 'NY',
    postalCode: '10012',
    country: 'USA',
  },
  social: {
    instagram: 'https://instagram.com/apsmajeste',
    pinterest: 'https://pinterest.com/apsmajeste',
    tiktok: 'https://tiktok.com/@apsmajeste',
  },
  founded: 2019,
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about.html', label: 'About' },
  { href: '/products.html', label: 'Products' },
  { href: '/why-choose-us.html', label: 'Why APS MAJESTE' },
  { href: '/contact.html', label: 'Contact' },
];

export const FOOTER_LINKS = {
  shop: [
    { href: '/products.html', label: 'All Products' },
    { href: '/products.html#serums', label: 'Serums' },
    { href: '/products.html#fragrances', label: 'Perfumes' },
    { href: '/products.html#cleansers', label: 'Face Wash & Cleansers' },
  ],
  company: [
    { href: '/about.html', label: 'Our Story' },
    { href: '/why-choose-us.html', label: 'Why APS MAJESTE' },
    { href: '/contact.html', label: 'Contact' },
    { href: '/products.html', label: 'Shop All' },
  ],
  legal: [
    { href: '/privacy-policy.html', label: 'Privacy Policy' },
    { href: '/terms.html', label: 'Terms & Conditions' },
    { href: '/contact.html', label: 'Customer Care' },
  ],
};
