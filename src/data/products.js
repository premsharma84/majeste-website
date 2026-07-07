/* ============================================================
   APS MAJESTE — Product catalog
   ------------------------------------------------------------
   Products are stored as individual JSON files in /content/products/.
   They are managed via Decap CMS at /admin/ — every edit commits
   to GitHub and triggers a Pages rebuild.

   At build time, Vite's import.meta.glob loads all product JSON
   files eagerly and assembles the PRODUCTS array. No runtime
   fetching, no API calls — the catalog is baked into the bundle.

   NOTE: APS MAJESTE does not sell directly from this site.
   Each product has an `amazonUrl` field linking to Amazon.in
   where customers can purchase. No prices are shown on-site.

   To add a product:
     - Use the admin UI at /admin/, OR
     - Drop a new <slug>.json file into content/products/
   ============================================================ */

// Eagerly import every product JSON file at build time.
const productModules = import.meta.glob('/content/products/*.json', {
  import: 'default',
  eager: true,
});

function deriveSlug(filePath) {
  return filePath.split('/').pop().replace('.json', '');
}

export const PRODUCTS = Object.entries(productModules)
  .map(([filePath, data]) => ({
    slug: deriveSlug(filePath),
    ...data,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const CATEGORIES = [
  { slug: 'all', label: 'All' },
  { slug: 'face-wash', label: 'Face Wash' },
  { slug: 'perfumes', label: 'Perfumes' },
];

export const GENDERS = [
  { slug: 'all', label: 'All' },
  { slug: 'male', label: 'For Men' },
  { slug: 'female', label: 'For Women' },
  { slug: 'unisex', label: 'Unisex' },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}
