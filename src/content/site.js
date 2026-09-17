// Datos de negocio. Todo lo marcado `verify` debe confirmarse con el cliente antes de publicar.

export const site = {
  name: 'HCK Rental',
  legalName: 'HCK Rental by VIP Planners',
  whatsapp: '+591 77797997',
  whatsappDigits: '59177797997',
  baseCity: 'La Paz',
  tagline: 'Carpas de gran formato y toldos arquitectónicos para eventos',
  coverage: 'Cobertura nacional',
  email: null, // verify
  instagram: 'https://www.instagram.com/hck_rental/',
  instagramHandle: '@hck_rental',
  facebook: null, // verify
}

export function whatsappUrl(message = 'Hola, quiero cotizar infraestructura para un evento.') {
  return `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`
}

// Experiencia de trabajo (PRODUCT.md). Nombres como texto, nunca logotipos sin autorización.
export const experience = [
  'BancoSol',
  'Embajada de Estados Unidos',
  'Embajada del Perú',
  'Colegio Franco Boliviano',
  'Colegio Alemán',
  'Colegio Calvert',
  'Colegio San Andrés',
  'Centro de Convenciones Chuquiago Marka',
]

export const navLinks = [
  { to: '/servicios', label: 'Servicios' },
  { to: '/galeria', label: 'Galería' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

// Tipos de evento atendidos (PRODUCT.md). Se usan en Servicios y como opciones del formulario.
export const eventTypes = [
  'Boda',
  'Evento corporativo',
  'Evento institucional o diplomático',
  'Colegio o graduación',
  'Fiesta de fin de año',
  'Feria o evento de gran formato',
  'Otro',
]
