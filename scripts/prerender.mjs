// Prerenderizado estático posterior a `vite build`.
// Genera un HTML completo por ruta (contenido + metadatos + datos estructurados), 404.html, sitemap.xml y robots.txt.
//
// Variables de build (Coolify › Environment Variables, marcadas como "Build Variable"):
//   VITE_SITE_URL          dominio canónico sin barra final   (por defecto https://hckrental.spestanam.com)
//   VITE_GA_ID             ID de Google Analytics 4, G-XXXXXXX (opcional)
//   VITE_GSC_VERIFICATION  contenido de la meta de verificación de Search Console (opcional)

import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { DEFAULT_SITE_URL, notFound, routes } from '../src/content/seo.js'
import { media } from '../src/content/media.js'
import { site } from '../src/content/site.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const SITE_URL = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')
const GA_ID = process.env.VITE_GA_ID?.trim()
const GSC = process.env.VITE_GSC_VERIFICATION?.trim()

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (path) => `${SITE_URL}${path}`
const ogImage = `${SITE_URL}/og-image.jpg`

function head(route, { indexable }) {
  const url = abs(route.path)
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    indexable ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="es_BO" />',
    `<meta property="og:site_name" content="${esc(site.legalName)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    indexable && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    GSC && `<meta name="google-site-verification" content="${esc(GSC)}" />`,
  ]

  if (route.path === '/') {
    const hero = media.hero
    tags.push(
      `<link rel="preload" as="image" href="${hero.src}" imagesrcset="${hero.srcSet}" imagesizes="100vw" fetchpriority="high" />`,
      `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: site.legalName,
        description: route.description,
        url: `${SITE_URL}/`,
        image: ogImage,
        telephone: site.whatsapp,
        address: { '@type': 'PostalAddress', addressLocality: site.baseCity, addressCountry: 'BO' },
        areaServed: { '@type': 'Country', name: 'Bolivia' },
        sameAs: [site.instagram].filter(Boolean),
        knowsAbout: ['Carpas para eventos', 'Toldos arquitectónicos', 'Tarimas', 'Pistas de baile', 'Logística de eventos'],
      })}</script>`,
    )
  }

  if (GA_ID) {
    tags.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(GA_ID)}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(GA_ID)}');</script>`,
    )
  }

  return tags.filter(Boolean).join('\n    ')
}

function page(route, { indexable = true } = {}) {
  return template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, head(route, { indexable }))
    .replace('<!--app-html-->', render(route.path))
}

for (const route of routes) {
  const file = route.path === '/' ? join(dist, 'index.html') : join(dist, route.path.slice(1), 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(route))
  console.log(`  prerender ${route.path}`)
}

writeFileSync(join(dist, '404.html'), page(notFound, { indexable: false }))
console.log('  prerender 404.html')

const today = new Date().toISOString().slice(0, 10)
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${abs(r.path)}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`,
)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`  sitemap.xml + robots.txt → ${SITE_URL}`)

rmSync(ssrDir, { recursive: true, force: true })
