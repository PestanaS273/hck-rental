// Registro único de medios. Ningún componente conoce rutas de archivo: para reemplazar una foto se cambia aquí.
// `status`: 'maqueta' = foto real de licencia libre (Unsplash/Pexels, uso comercial sin atribución obligatoria)
//           'hck'     = obra real del cliente (definitiva).
// Imágenes generadas por IA: prohibidas (DESIGN.md).

const MAQUETA = '/media/maqueta'

function photo(name, widths, ratio, alt, extra = {}) {
  const max = widths[widths.length - 1]
  return {
    src: `${MAQUETA}/${name}-${max}.webp`,
    srcSet: widths.map((w) => `${MAQUETA}/${name}-${w}.webp ${w}w`).join(', '),
    width: max,
    height: Math.round(max / ratio),
    alt,
    status: 'maqueta',
    ...extra,
  }
}

export const media = {
  hero: photo('hero', [960, 1600, 2400], 1.5,
    'Cubierta de una carpa de gran formato con cuatro mástiles contra un cielo azul con nubes',
    { position: 'center 70%', credit: 'Jan van der Wolf · Pexels 28529566' }),
  aireLibre: photo('aire-libre', [960, 1600, 2400], 1.5,
    'Carpas blancas tensadas en una pradera de altura con montañas nevadas al fondo',
    { position: '50% 62%', credit: 'Gang Liang · Pexels 35919525' }),

  bandaVideo: {
    src: '/media/video/carpa-aerea.mp4',
    poster: '/media/video/carpa-aerea-poster.webp',
    alt: 'Vista aérea de una cubierta tensada color arena montada sobre terreno seco',
    status: 'maqueta',
    credit: 'TheFullFrameFox · Pexels 12297586',
  },

  carpas: photo('carpas', [640, 1200], 1.5,
    'Carpa estructural blanca de gran longitud con ventanas, montada sobre césped',
    { position: '30% center', credit: 'Steven Van Elk · Unsplash 6WzXEYnPcgo' }),
  tarimas: photo('tarimas', [640, 1200], 1.5,
    'Estructura de truss curvo con luces robotizadas y parlantes sobre un escenario',
    { position: '60% center', credit: 'Magda Ehlers · Pexels 12787862' }),
  pistas: photo('pistas', [640, 1200], 1.5,
    'Interior de carpa con piso de madera, mesas redondas y cerramientos de vidrio',
    { position: '35% center', credit: 'Jacques Dillies · Unsplash j1EOu_UnXNs' }),

  institucional: photo('institucional', [640, 1200], 1200 / 1803,
    'Salón con mesas largas en filas paralelas bajo una bóveda con claraboyas',
    { credit: 'Adrien Olichon · Unsplash iDr7G1kh0Cs' }),
  corporativo: photo('corporativo', [640, 1200], 1200 / 1800,
    'Interior luminoso de carpa con mesas redondas y sillas de madera',
    { credit: 'Hannah Busing · Unsplash URVe89DA5Cw' }),
  boda: photo('boda', [640, 1200], 1.5,
    'Mesa con centro floral dentro de una carpa blanca preparada para una boda',
    { credit: 'Munoz Photo · Pexels 19024675' }),

  montaje: photo('montaje', [960, 1800], 1.5,
    'Equipo con cascos y chalecos armando plataformas modulares en un estadio',
    { credit: 'Jacques Dillies · Unsplash Wcx6h3I2os8' }),
  detalle: photo('detalle', [720, 1430], 1430 / 848,
    'Cumbrera de una carpa blanca tensada con cables contra el cielo',
    { position: 'center 40%', credit: 'Mitchell Luo · Unsplash lKYu9NiypR0 (recorte)' }),
  cubierta: photo('cubierta', [960, 1800], 0.75,
    'Vista desde abajo de postes de madera que convergen bajo una lona blanca',
    { position: 'center 45%', credit: 'Kathleen McInnis · Pexels 10388006' }),
  laPaz: photo('la-paz', [960, 1800], 1.5,
    'El Illimani nevado sobre las casas de ladrillo de La Paz',
    { credit: 'Nair Cristopher Sánchez Muñoz · Pexels 6792494' }),
}
