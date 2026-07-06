/* ============================================================
   APS MAJESTE — Product catalog
   ------------------------------------------------------------
   Products are stored as individual JSON files in /content/products/.
   They are managed via Decap CMS at /admin/ — every edit commits
   to GitHub and triggers a Pages rebuild.

   At build time, Vite's import.meta.glob loads all product JSON
   files eagerly and assembles the PRODUCTS array. No runtime
   fetching, no API calls — the catalog is baked into the bundle.

   To add a product:
     - Use the admin UI at /admin/, OR
     - Drop a new <slug>.json file into content/products/
   ============================================================ */

// Eagerly import every product JSON file at build time.
// Returns: { '/content/products/foo.json': { name: 'Foo', ... }, ... }
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
  { slug: 'fragrances', label: 'Perfumes' },
  { slug: 'cleansers', label: 'Face Wash' },
];

export function getProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

