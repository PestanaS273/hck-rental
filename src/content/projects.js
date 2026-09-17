import { media } from './media'

// Montajes para Inicio y Galería. El orden del arreglo es el orden de publicación: lo nuevo va arriba.
//
// Para sumar un evento:
//   1. Convertir fotos a WebP en public/media/proyectos/<slug>/ (ver AGENTS.md › Contenido).
//   2. Registrar las fotos en media.js (o usar `photo()` allí mismo).
//   3. Agregar aquí { slug, category, title, place, year, scope, cover, images }.
//
// `category` debe ser un id de `categories`. Mientras no haya obra real, las entradas son `placeholder: true`
// y NO describen eventos que hayan ocurrido.

export const categories = [
  { id: 'todos', label: 'Todos' },
  { id: 'bodas', label: 'Bodas' },
  { id: 'corporativos', label: 'Corporativos' },
  { id: 'institucionales', label: 'Institucionales' },
]

export const projects = [
  {
    slug: 'recepcion-institucional',
    category: 'institucionales',
    type: 'Institucional',
    title: 'Recepción institucional',
    place: 'La Paz',
    year: null,
    scope: 'Distribución de mesas en filas, tarima de protocolo y logística',
    cover: media.institucional,
    images: [media.institucional, media.tarimas],
    placeholder: true,
  },
  {
    slug: 'cena-corporativa',
    category: 'corporativos',
    type: 'Corporativo',
    title: 'Cena de fin de año',
    place: 'La Paz',
    year: null,
    scope: 'Carpa, piso nivelado y mobiliario de banquete',
    cover: media.corporativo,
    images: [media.corporativo, media.pistas],
    placeholder: true,
  },
  {
    slug: 'boda-jardin',
    category: 'bodas',
    type: 'Boda',
    title: 'Boda en jardín',
    place: 'Valle de La Paz',
    year: null,
    scope: 'Carpa blanca con forrado interior y pista de baile',
    cover: media.boda,
    images: [media.boda, media.pistas, media.carpas],
    placeholder: true,
  },
  {
    slug: 'evento-aire-libre',
    category: 'corporativos',
    type: 'Corporativo',
    title: 'Activación al aire libre',
    place: 'Altiplano',
    year: null,
    scope: 'Cubiertas tensadas en terreno abierto',
    cover: media.aireLibre,
    images: [media.aireLibre, media.detalle],
    placeholder: true,
  },
  {
    slug: 'escenario-festival',
    category: 'institucionales',
    type: 'Institucional',
    title: 'Escenario para concierto',
    place: 'La Paz',
    year: null,
    scope: 'Tarima, truss de iluminación y soporte de sonido',
    cover: media.tarimas,
    images: [media.tarimas, media.montaje],
    placeholder: true,
  },
  {
    slug: 'boda-carpa-estructural',
    category: 'bodas',
    type: 'Boda',
    title: 'Boda bajo carpa estructural',
    place: 'La Paz',
    year: null,
    scope: 'Carpa estructural con ventanas y piso de madera',
    cover: media.carpas,
    images: [media.carpas, media.pistas],
    placeholder: true,
  },
]
