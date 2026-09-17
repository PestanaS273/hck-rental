// SEO por ruta: única fuente para el título/descripción en el navegador (useDocumentMeta),
// el prerenderizado (scripts/prerender.mjs) y el sitemap.
//
// El dominio se define en el build con VITE_SITE_URL (sin barra final):
//   hoy      → https://hckrental.spestanam.com
//   después  → https://hckrental.com  (solo cambiar la variable en Coolify y redesplegar)

export const DEFAULT_SITE_URL = 'https://hckrental.spestanam.com'

export const routes = [
  {
    path: '/',
    title: 'HCK Rental by VIP Planners | Carpas y toldos arquitectónicos para eventos en Bolivia',
    description:
      'Carpas de gran formato, toldos arquitectónicos, tarimas, pistas de baile y logística para bodas, eventos corporativos e institucionales en La Paz y toda Bolivia.',
    priority: '1.0',
  },
  {
    path: '/servicios',
    title: 'Servicios: carpas, toldos arquitectónicos, tarimas y pistas | HCK Rental',
    description:
      'Alquiler y montaje de carpas, toldos arquitectónicos, tarimas, pistas de baile, estructuras y logística integral para eventos en La Paz y Bolivia.',
    priority: '0.9',
  },
  {
    path: '/galeria',
    title: 'Galería de montajes para eventos | HCK Rental',
    description:
      'Montajes de carpas, toldos arquitectónicos, tarimas y pistas para bodas, eventos corporativos e institucionales en Bolivia.',
    priority: '0.8',
  },
  {
    path: '/nosotros',
    title: 'Sobre HCK Rental by VIP Planners | Infraestructura para eventos en Bolivia',
    description:
      'HCK Rental by VIP Planners diseña y monta carpas, toldos arquitectónicos e infraestructura para eventos desde La Paz, con cobertura en toda Bolivia.',
    priority: '0.7',
  },
  {
    path: '/contacto',
    title: 'Cotizar carpas y toldos para tu evento | HCK Rental',
    description:
      'Solicita una cotización de carpas, toldos arquitectónicos, tarimas, pistas y logística para tu evento en La Paz o cualquier ciudad de Bolivia.',
    priority: '0.8',
  },
]

export const notFound = {
  path: '/404',
  title: 'Página no encontrada | HCK Rental',
  description: 'La página que buscas no existe.',
}

export function seoFor(path) {
  return routes.find((r) => r.path === path) ?? notFound
}
