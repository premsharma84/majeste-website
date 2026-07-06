# APS MAJESTE — Personal Care Brand Website

A modern, fast, static website for **APS MAJESTE**, a fictional premium botanical skincare and fragrance maison. Built with HTML5, CSS3, vanilla JavaScript, and Vite — no frameworks, no backend, no database.

> **Design ethos:** clean, modern, luxury. Mobile-first. Accessible. Optimized for Lighthouse > 95.

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
| Backend     | None                                    | Static site, deploys anywhere               |

**Production bundle:** ~22 KB JS / ~28 KB CSS (gzipped: 8 KB / 5.6 KB) — across all 9 pages.

---

## Project structure

```
apsmajeste/
├── index.html                  # Home
├── about.html                  # About Us
├── products.html               # Products (filterable grid)
├── product.html                # Product Details (?id=slug)
├── why-choose-us.html          # Why Choose Us
├── contact.html                # Contact
├── privacy-policy.html         # Privacy Policy
├── terms.html                  # Terms & Conditions
├── 404.html                    # Not found
├── vite.config.js              # Multi-page build config
├── package.json
│
├── public/                     # Copied verbatim to /dist
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/                 # (Add product/lifestyle imagery here)
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
        ├── site.js             # Brand info, nav, footer links
        └── products.js         # Product catalog (single source of truth)
```

---

## What's inside

### Pages (9)
Home · About · Products · Product Details · Why Choose Us · Contact · Privacy Policy · Terms & Conditions · 404

### Reusable components
Header · Navigation (desktop + mobile) · Hero · Product Cards · Testimonials · FAQ accordion · CTA bands · Footer · Forms · Toast · Breadcrumbs · Page headers · Filter chips · Stats · Steps · Feature cards

### SEO (built in)
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Per-page `<title>`, meta description, keywords
- Open Graph + Twitter Card tags on every page
- Canonical URLs
- `robots.txt` and `sitemap.xml` (with all 13 URLs)
- Image alt text (where images are used; placeholders are `aria-hidden`)
- Clean, keyword-rich URLs (`/products.html`, `/product.html?id=rose-damascena-elixir`)

### AEO + GEO (built in)
- **Organization schema** (JSON-LD) on every page
- **WebSite schema** with SearchAction
- **FAQPage schema** with 6 Q&As on home
- **Product schema** dynamically injected per product detail page
- **ItemList schema** on products listing
- **ContactPage + LocalBusiness** schema on contact
- **AboutPage** schema on about
- Entity-rich content (named growers, founded year, locations, ingredient INCI lists)
- Clear, plain-language descriptions answer the questions AI assistants are asked

### Performance
- Total JS: ~22 KB (8 KB gzipped) — site-wide
- Total CSS: ~28 KB (5.6 KB gzipped)
- Fonts loaded with `preconnect` + `preload` + `media="print"` swap
- IntersectionObserver-based scroll reveal (no scroll listeners)
- `prefers-reduced-motion` respected throughout
- No images on initial load (CSS gradient placeholders); add `<img loading="lazy">` when you drop in real photography
- `crossorigin` attributes on assets for proper caching
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

### UX details
- Sticky header that gains a border on scroll
- Smooth scrolling (native, with `prefers-reduced-motion` opt-out)
- Subtle scroll-reveal animations (staggered via `data-delay`)
- Mobile menu slides in from the right with body scroll lock
- FAQ accordion (native `<details>`, enhanced with sibling-collapse)
- Toast notifications for form submissions
- Sticky product media on detail page (desktop)
- Filter chips with active state

---

## Customization guide

### Change brand name, email, social links
Edit `src/data/site.js`. The header, footer, contact page, and structured data all read from this file.

### Add or edit products
Edit `src/data/products.js`. Each product needs: `slug`, `name`, `category`, `categorySlug`, `price`, `size`, `tag`, `bg` (one of: `rose`, `amber`, `sage`, `cream`, `noir`, `blush`), `short`, `description`, `benefits`, `ingredients`, `usage`, `pairings`, `rating`, `reviews`. The products page, product detail page, and sitemap all read from this file.

> ⚠️ When you add a product, also add its URL to `public/sitemap.xml`.

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
And drop the image files into `public/images/`.

---

## Deployment

The site builds to a static `/dist` folder. Deploy it anywhere that serves static files.

### Netlify
1. Push this folder to a Git repo
2. New site → import repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Done — Netlify will auto-deploy on every push

### Vercel
1. Push this folder to a Git repo
2. New project → import repo (Vercel auto-detects Vite)
3. Build command: `npm run build` (auto)
4. Output directory: `dist` (auto)
5. Done

### GitHub Pages
1. Push to a repo
2. Settings → Pages → Source → GitHub Actions (recommended)
3. Add a workflow that runs `npm run build` and uploads `/dist`

**For GitHub Pages project sites** (e.g. `username.github.io/repo-name/`), edit `vite.config.js` and change `base: '/'` to `base: '/repo-name/'` before building.

---

## Notes

- This is a **demo brand** — APS MAJESTE, founded 2019, NYC + Provence. Replace with your real brand info in `src/data/site.js` and the HTML page metadata before going live.
- The `og:image` references `https://apsmajeste.example.com/images/og-cover.jpg` — create and upload this 1200×630 image before launch.
- Forms (newsletter, contact, add-to-bag) are front-end only and show a toast on submit. Wire them to your backend, Formspree, Netlify Forms, or Klaviyo when ready.
- The product imagery uses CSS gradient placeholders. Drop real product photography into `public/images/` and swap the `<div class="ph …">` blocks in `src/js/products.js` and `src/js/product-detail.js` for `<img loading="lazy">` tags.

---

## License

MIT — use it, fork it, ship it.
