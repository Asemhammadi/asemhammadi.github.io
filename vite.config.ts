import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Single source of truth for where this site lives. A repo rename only needs a
// change here (or the env vars the Pages workflow already supplies), instead of
// hunting down absolute URLs scattered across index.html, robots.txt and sitemap.xml.
const OWNER = process.env.VITE_OWNER || 'asemhammadi';
const REPO = process.env.VITE_REPO_NAME || 'AsemAlhammadi';

// GitHub Pages serves a project site from /<repo>/. A custom domain would set
// VITE_BASE_PATH=/ and VITE_SITE_URL to the domain.
const base = process.env.VITE_BASE_PATH || `/${REPO}/`;
const siteUrl = (process.env.VITE_SITE_URL || `https://${OWNER}.github.io${base}`).replace(/\/+$/, '') + '/';

// Injects the canonical origin into index.html and emits robots.txt + sitemap.xml
// so all three can never drift apart.
function siteUrlPlugin(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__/', siteUrl).replaceAll('__SITE_URL__', siteUrl);
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `  <url>\n    <loc>${siteUrl}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          '</urlset>\n'
      });
    }
  };
}

export default defineConfig(() => {
  return {
    base,
    plugins: [react(), tailwindcss(), siteUrlPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
