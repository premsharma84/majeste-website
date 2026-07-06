/* ============================================================
   APS MAJESTE — Shared site data (brand, nav)
   ============================================================ */

import { url } from '../js/utils.js';

export const SITE = {
  brand: 'APS MAJESTE',
  brandPrefix: 'APS',
  brandMain: 'MAJESTE',
  brandAccent: '',
  tagline: 'Majestic Personal Care, Crafted with Intention',
  domain: 'https://apsmajeste.example.com',
  email: 'concierge@apsmajeste.example.com',
  phone: '+91 12345 67890',
  address: {
    line1: '123 Lake Palace Road',
    city: 'Udaipur',
    region: 'Rajasthan',
    postalCode: '313001',
    country: 'India',
  },
  social: {
    instagram: 'https://instagram.com/apsmajeste',
    pinterest: 'https://pinterest.com/apsmajeste',
    tiktok: 'https://tiktok.com/@apsmajeste',
  },
  founded: 2019,
};

export const NAV_LINKS = [
  { href: url('/'), label: 'Home' },
  { href: url('/about.html'), label: 'About' },
  { href: url('/products.html'), label: 'Products' },
  { href: url('/why-choose-us.html'), label: 'Why APS MAJESTE' },
  { href: url('/contact.html'), label: 'Contact' },
];

export const FOOTER_LINKS = {
  shop: [
    { href: url('/products.html'), label: 'All Products' },
    { href: url('/products.html#fragrances'), label: 'Perfumes' },
    { href: url('/products.html#cleansers'), label: 'Face Wash' },
  ],
  company: [
    { href: url('/about.html'), label: 'Our Story' },
    { href: url('/why-choose-us.html'), label: 'Why APS MAJESTE' },
    { href: url('/contact.html'), label: 'Contact' },
    { href: url('/products.html'), label: 'View All' },
  ],
  legal: [
    { href: url('/privacy-policy.html'), label: 'Privacy Policy' },
    { href: url('/terms.html'), label: 'Terms & Conditions' },
    { href: url('/contact.html'), label: 'Customer Care' },
    { href: url('/admin/'), label: 'Admin' },
  ],
};
