import { media } from './media'

// Servicios organizados por necesidad del evento.
// `includes` describe alcance general; medidas, capacidades y modelos exactos deben confirmarse con HCK antes de publicarlos.
export const services = [
  {
    id: 'carpas',
    label: 'Cubrir',
    title: 'Carpas y toldos arquitectónicos',
    summary: 'Carpas de gran formato y toldos arquitectónicos tensados para recepciones, ferias y eventos al aire libre, con cerramientos para el clima del altiplano.',
    includes: ['Carpas estructurales de gran formato', 'Toldos arquitectónicos tensados', 'Cerramientos laterales y ventanas', 'Forrado y ambientación interior'],
    image: media.carpas,
  },
  {
    id: 'tarimas',
    label: 'Elevar',
    title: 'Tarimas y escenarios',
    summary: 'Plataformas para música, protocolo y presentaciones, niveladas al terreno y listas para sonido e iluminación.',
    includes: ['Tarimas modulares a distintas alturas', 'Escaleras, rampas y faldones', 'Estructura para sonido e iluminación', 'Podios y áreas de protocolo'],
    image: media.tarimas,
  },
  {
    id: 'pistas',
    label: 'Recibir',
    title: 'Pistas y pisos',
    summary: 'Pistas de baile y pisos continuos que resuelven desniveles de jardín, cancha o terraza bajo la carpa.',
    includes: ['Pistas de baile', 'Pisos nivelados bajo carpa', 'Cubrimiento de canchas y terrazas', 'Circulaciones y accesos'],
    image: media.pistas,
  },
  {
    id: 'estructuras',
    label: 'Sostener',
    title: 'Estructuras y soportes',
    summary: 'Estructuras metálicas y soportes técnicos para pantallas, iluminación, señalética y escenografía.',
    includes: ['Estructura de truss', 'Soportes para pantallas y sonido', 'Backings y escenografía', 'Anclajes y lastres'],
    image: media.detalle,
  },
  {
    id: 'logistica',
    label: 'Resolver',
    title: 'Logística integral',
    summary: 'Transporte, montaje, operación y desmontaje coordinados con el recinto y el resto de proveedores del evento.',
    includes: ['Visita técnica y plano de montaje', 'Transporte e instalación', 'Personal en sitio durante el evento', 'Desmontaje y entrega del espacio'],
    image: media.montaje,
  },
]
