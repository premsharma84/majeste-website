import { defineConfig } from 'vite';
import { resolve } from 'path';

const pages = [
  'index.html',
  'about.html',
  'products.html',
  'product.html',
  'why-choose-us.html',
  'contact.html',
  'privacy-policy.html',
  'terms.html',
  '404.html',
];

export default defineConfig({
  root: '.',
  publicDir: 'public',
  // Use '/' for root deployments (Netlify, Vercel, GitHub Pages user/org sites).
  // For GitHub Pages project sites (user.github.io/repo/), change to '/repo-name/'.
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2020',
    htmlMinify: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((p) => [p.replace('.html', ''), resolve(__dirname, p)])
      ),
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
