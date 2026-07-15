# APS MAJESTE — Personal Care Brand Website

A modern, fast, static website for **APS MAJESTE**, a premium personal care brand from Udaipur, India offering face washes and perfumes. Built with HTML5, CSS3, vanilla JavaScript, and Vite — no frameworks, no backend, no database.

> **Design ethos:** clean, modern, luxury. Mobile-first. Accessible. Optimized for Lighthouse > 95.
>
> **Business model:** This is a **catalog site**, not an e-commerce site. Products are listed without prices; each product page links to **Amazon India** for purchase.

---

## Quick start

```bash
# 1. Install dependencies (Vite only — ~10 packages)
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production (outputs to /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

**Requirements:** Node.js 18+ and npm 9+.

---

## Tech stack

| Layer       | Choice                                  | Why                                         |
| ----------- | --------------------------------------- | ------------------------------------------- |
| Markup      | HTML5 (semantic)                        | SEO + accessibility foundation              |
| Styling     | Hand-rolled CSS3 with design tokens     | No framework lock-in, fully themeable      |
| Scripting   | Vanilla JavaScript (ES modules)         | Minimal payload, no runtime overhead        |
| Build       | Vite 5                                  | Fastest dev server + lean production bundle |
| Fonts       | Cormorant Garamond + Inter (Google)     | Premium serif + clean sans pairing          |
| CMS         | Decap CMS (admin at /admin/)            | Edit products via form UI, saves to GitHub  |
| Backend     | None                                    | Static site, deploys anywhere               |

**Production bundle:** ~27 KB JS / ~28 KB CSS (gzipped: 9 KB / 5.7 KB) — across all 9 pages.

---

## Project structure

```
apsmajeste/
├── index.html                  # Home
├── about.html                  # About Us
├── products.html               # Products (filterable grid)
├── product.html                # Product Details (?id=slug)
├── why-choose-us.html          # Why APS MAJESTE
├── contact.html                # Contact
├── privacy-policy.html         # Privacy Policy
├── terms.html                  # Terms & Conditions
├── 404.html                    # Not found
├── vite.config.js              # Multi-page build config
├── package.json
├── .nvmrc                      # Pins Node.js 20
│
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages deployment
│
├── public/                     # Copied verbatim to /dist
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/                 # Product photography + brand assets
│   │   ├── products/           # 15 product photos (one per product, 1200×1200 JPEG)
│   │   ├── brand/              # Brand logo
│   │   └── uploads/            # Images uploaded via Decap CMS admin
│   └── admin/                  # Decap CMS admin UI
│       ├── index.html          # Loads Decap CMS from CDN
│       └── config.yml          # CMS configuration (collections, fields)
│
├── content/                    # Editable content (managed by Decap CMS)
│   ├── products/               # One JSON file per product (15 total)
│   │   ├── acnoshield-face-wash.json
│   │   ├── detan-face-wash.json
│   │   ├── papaya-face-wash.json
│   │   ├── vitamin-c-face-wash.json
│   │   ├── vitamin-e-b3-face-wash.json
│   │   ├── black-fury-eau-de-parfum.json
│   │   ├── brillia-eau-de-parfum.json
│   │   ├── dawn-eau-de-parfum.json
│   │   ├── destiny-eau-de-parfum.json
│   │   ├── florelle-eau-de-parfum.json
│   │   ├── hocco-eau-de-parfum.json
│   │   ├── kingdom-eau-de-parfum.json
│   │   ├── legend-eau-de-parfum.json
│   │   ├── white-oud-eau-de-parfum.json
│   │   └── coco-eau-de-parfum.json
│   └── settings/
│       └── site.json           # Brand contact info, social links
│
└── src/
    ├── styles/
    │   ├── main.css            # Entry — imports the chain
    │   ├── tokens.css          # Design tokens (colors, type, spacing)
    │   ├── base.css            # Reset + element defaults
    │   ├── components.css      # Buttons, cards, nav, footer, etc.
    │   └── utilities.css       # Layout helpers + animations
    │
    ├── js/
    │   ├── main.js             # Entry — orchestrates all modules
    │   ├── components.js       # Header + footer injection (DRY)
    │   ├── nav.js              # Mobile menu, scroll state
    │   ├── ui.js               # Reveal on scroll, FAQ, forms, toast
    │   ├── products.js         # Products grid + filtering
    │   └── product-detail.js   # Product detail + JSON-LD injection
    │
    └── data/
        ├── site.js             # Brand info, nav, footer links, link() helper
        └── products.js         # Reads from /content/products/*.json at build time
```

---

## What's inside

### Pages (9)
Home · About · Products · Product Details · Why Choose Us · Contact · Privacy Policy · Terms & Conditions · 404

### Products (15) — real product photography included
**Face Wash (5):** AcnoShield, De-Tan Radiance Cleanse, Papaya Glow, Vitamin C Glow, Vitamin E+B3 Clear & Glow
**Perfumes (10):** Black Fury, Brillia, Dawn, Destiny, Florelle, Hocco, Kingdom, Legend, White Oud, Coco

All 15 products have real product photography (sourced from the `apsmajeste/product-images` GitHub repo), optimized to ~50-170 KB per image (1200×1200 max, JPEG quality 82). The brand logo is also integrated into the hero section.

### Reusable components
Header · Navigation (desktop + mobile) · Hero · Product Cards (with Buy on Amazon button) · Testimonials · FAQ accordion · CTA bands · Footer · Forms · Toast · Breadcrumbs · Page headers · Filter chips · Stats · Steps · Feature cards

### No e-commerce
This site is a **catalog only**. No prices, no cart, no checkout. Each product page has a "Buy on Amazon" button linking to the product on Amazon India. The `amazonUrl` field in each product JSON file controls where the button points.

### SEO (built in)
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Per-page `<title>`, meta description, keywords
- Open Graph + Twitter Card tags on every page
- Canonical URLs
- `robots.txt` and `sitemap.xml` (with all 14 URLs)
- Image alt text (where images are used; placeholders are `aria-hidden`)
- Clean, keyword-rich URLs

### AEO + GEO (built in)
- **Organization schema** (JSON-LD) on every page
- **WebSite schema** with SearchAction
- **FAQPage schema** with 7 Q&As on home
- **Product schema** dynamically injected per product detail page (no price — Amazon offer URL only)
- **ItemList schema** on products listing
- **ContactPage + LocalBusiness** schema on contact
- **AboutPage** schema on about
- Entity-rich content (Udaipur, Rajasthan, Indian ingredient sources: Kashmiri saffron, Mysore sandalwood, Tamil Nadu jasmine, Kannauj rose)

### Performance
- Total JS: ~27 KB (9 KB gzipped) — site-wide
- Total CSS: ~28 KB (5.7 KB gzipped)
- Fonts loaded with `preconnect` + `preload` + `media="print"` swap
- IntersectionObserver-based scroll reveal (no scroll listeners)
- `prefers-reduced-motion` respected throughout
- No images on initial load (CSS gradient placeholders); add `<img loading="lazy">` when you drop in real photography
- Minimal DOM, minimal reflow

### Accessibility
- Skip-to-content link
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)
- `aria-current="page"` on active nav links
- `aria-expanded` on mobile menu toggle
- Visible `:focus-visible` outlines
- Keyboard-dismissable mobile menu (Escape key)
- All interactive elements are real `<button>`, `<a>`, `<input>` — no `div` clicks
- Color contrast meets WCAG AA

### Base path aware (GitHub Pages fix)
All internal navigation links use a `link()` helper that reads `import.meta.env.BASE_URL` at build time. This means the site works correctly whether deployed to:
- A root domain (`https://example.com/`)
- A GitHub Pages user site (`https://username.github.io/`)
- A GitHub Pages project site (`https://username.github.io/repo-name/`)

No manual config needed — the GitHub Action auto-detects the repo type and sets the base path.

---

## Customization guide

### Change brand name, email, social links
Edit `src/data/site.js`. The header, footer, contact page, and structured data all read from this file.

> 💡 **Easier:** Use the admin UI at `/admin/` → "Site Settings" to edit brand contact info without touching code. See [Admin (Decap CMS)](#admin-decap-cms) below.

### Add or edit products
**Option A — Use the admin UI (recommended):** Go to `/admin/` → "Products" → click any product to edit, or "New Product" to add one. Every save commits to GitHub and auto-deploys. See [Admin (Decap CMS)](#admin-decap-cms) below.

**Option B — Edit JSON files directly:** Each product is a single JSON file at `content/products/<slug>.json`. Required fields: `name`, `category` ("Face Wash" or "Perfume"), `categorySlug` ("face-wash" or "perfumes"), `size`, `tag` ("" / "Bestseller" / "New" / "Signature"), `bg` (rose/amber/sage/cream/noir/blush), `amazonUrl` (required — Amazon India URL), `short`, `description`, `benefits` (array), `ingredients` (array), `usage`, `rating`, `reviews`. The slug is derived from the filename.

> ⚠️ When you add a product, also add its URL to `public/sitemap.xml`.

### Change the Amazon link for a product
Edit the `amazonUrl` field in the product's JSON file at `content/products/<slug>.json`. This controls where the "Buy on Amazon" button on the product card and detail page points. Use either:
- A direct product URL: `https://www.amazon.in/dp/PRODUCTASIN`
- An Amazon Associates affiliate link: `https://www.amazon.in/dp/PRODUCTASIN?tag=your-tag-21`
- A search URL (fallback): `https://www.amazon.in/s?k=APS+MAJESTE+Product+Name`

### Change colors or typography
Edit `src/styles/tokens.css`. All colors, fonts, spacing, radii, and shadows are CSS custom properties — change them once and the whole site updates.

### Add a new page
1. Create `your-page.html` in the project root (use `about.html` as a template)
2. Add the page to the `pages` array in `vite.config.js`
3. Add the page to `public/sitemap.xml`
4. Add it to the `NAV_LINKS` array in `src/data/site.js` if it should appear in the nav

### Swap CSS placeholders for real product photography
Replace `<div class="ph product-bg--rose">` blocks in `src/js/products.js` and `src/js/product-detail.js` with:
```html
<img src="/images/your-image.jpg" alt="Rose Damascena Elixir bottle" loading="lazy" width="800" height="800">
```
And drop the image files into `public/images/`. You can also upload images via the admin UI — they'll be stored in `public/images/uploads/`.

---

## Admin (Decap CMS)

A full admin UI is built in at **`/admin/`**. It lets you add, edit, and delete products through a form-based interface — no code editing required. Every save commits directly to your GitHub repo and triggers a Pages rebuild via the workflow in `.github/workflows/deploy.yml`.

### How it works

```
Browser  →  /admin/  →  Decap CMS UI (from CDN)
                            ↓
                       GitHub OAuth (PKCE, no proxy server)
                            ↓
                       Commits JSON to content/products/<slug>.json
                            ↓
                       GitHub Actions triggers
                            ↓
                       Vite build → GitHub Pages
                            ↓
                       Live in ~30s
```

### One-time setup (5 minutes)

**1. Create a GitHub OAuth App**

- Go to: GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
- Fill in:
  - **Application name:** `APS MAJESTE Admin`
  - **Homepage URL:** `https://<your-username>.github.io/<repo>/`
  - **Authorization callback URL:** `https://<your-username>.github.io/<repo>/admin/`
- Click **Register**
- Copy the **Client ID** (starts with `Iv1.`)

**2. Edit `public/admin/config.yml`**

Replace these two placeholder values:

```yaml
backend:
  name: github
  repo: your-username/apsmajeste           # ← your GitHub username/repo
  app_id: Iv1.xxxxxxxxxxxxxxxx             # ← your OAuth App Client ID
  ...

site_url: https://your-username.github.io/apsmajeste  # ← your live URL
```

**3. Commit and push**

```bash
git add public/admin/config.yml
git commit -m "Configure Decap CMS"
git push
```

**4. Visit `/admin/`** and click **"Login with GitHub"**. Authorize the OAuth app when prompted.

That's it. You can now:
- ✏️ Edit any of the 15 products through form fields (name, Amazon URL, description, benefits, ingredients, etc.)
- ➕ Add new products (auto-generates a new JSON file)
- 🗑️ Delete products
- 📸 Upload product images (stored in `public/images/uploads/`)
- 🔗 Set product pairings via a searchable dropdown (relation field)
- 📝 Edit brand contact info, social links, address (Site Settings collection)
- 📋 Use draft → review → publish workflow (`publish_mode: editorial_workflow`)

### Multi-user access

Anyone you grant write access to your GitHub repo can use the admin. To add a content editor:
1. GitHub → your repo → **Settings → Collaborators → Add people**
2. They visit `/admin/`, log in with their own GitHub account, and can start editing

### Troubleshooting

- **"Login with GitHub" button does nothing** → Check that `app_id` in `config.yml` matches your OAuth App Client ID, and the callback URL in the OAuth App is exactly `https://<user>.github.io/<repo>/admin/`
- **404 after login redirect** → Your OAuth callback URL doesn't match the deployed URL. Update both the OAuth App on GitHub and `site_url` in `config.yml`.
- **Edits don't appear on the site** → Check the **Actions** tab in your GitHub repo — the workflow should be running. If it fails, check the build log.
- **"Cannot find module" build error after editing** → Make sure your JSON files are valid (no trailing commas, no comments). Validate at jsonlint.com.

---

## Deployment

The site builds to a static `/dist` folder. Deploy it anywhere that serves static files.

### GitHub Pages (recommended — zero config)

A ready-to-use workflow is included at `.github/workflows/deploy.yml`. It auto-detects whether your repo is a **project site** (`<user>.github.io/<repo>/`) or a **user/org site** (`<user>.github.io/`) and sets Vite's `base` path accordingly — no manual config needed.

**One-time setup:**
1. Push this folder to a GitHub repo (e.g. `your-username/apsmajeste`)
2. In GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**
3. Push to `main` (or `master`) — the workflow runs automatically

**Your site goes live at:**
- Project repo (`apsmajeste`): `https://<your-username>.github.io/apsmajeste/`
- User site (`<your-username>.github.io`): `https://<your-username>.github.io/`

The workflow also runs a build check on pull requests (without deploying) so you can catch issues before merging.

**Manual trigger:** Go to **Actions → Deploy to GitHub Pages → Run workflow** to deploy on demand.

### Netlify
1. Push to a Git repo
2. New site → import repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Done

### Vercel
1. Push to a Git repo
2. New project → import repo (Vercel auto-detects Vite)
3. Build command: `npm run build` (auto)
4. Output directory: `dist` (auto)
5. Done

---

## Notes

- Replace placeholder contact details in `src/data/site.js` and `content/settings/site.json` with your real values before going live (email, phone, address, social handles).
- Replace placeholder Amazon search URLs in `content/products/*.json` with your actual Amazon India product URLs or affiliate links.
- The `og:image` references `https://www.apsmajeste.com/images/og-cover.jpg` — create and upload this 1200×630 image before launch.
- The contact + newsletter forms are front-end only and show a toast on submit. Wire them to Formspree, Netlify Forms, or your email service when ready.
- Product imagery uses CSS gradient placeholders. Drop real product photography into `public/images/` and swap the `<div class="ph …">` blocks in `src/js/products.js` and `src/js/product-detail.js` for `<img loading="lazy">` tags.
- Domain `www.apsmajeste.com` is a placeholder — replace with your real domain in `src/data/site.js`, `public/sitemap.xml`, `public/robots.txt`, and all JSON-LD schema blocks before launch.

---

## License

MIT — use it, fork it, ship it.
