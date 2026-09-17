import Container from './ui/Container'
import Photo from './ui/Photo'
import { media } from '../content/media'
import { site } from '../content/site'

// Secuencia real de trabajo: la numeración aporta información, no es decoración.
const method = [
  ['Visita técnica', 'Medimos el lugar, accesos, pendientes y puntos de anclaje.'],
  ['Propuesta', 'Definimos estructura, superficies y distribución según invitados y programa.'],
  ['Montaje', 'Nuestro equipo instala y nivela con los tiempos del recinto.'],
  ['Operación y desmontaje', 'Acompañamos el evento y retiramos todo al cierre.'],
]

export default function MethodBlock({ image = media.laPaz }) {
  return (
    <Container as="section" aria-labelledby="metodo-titulo" className="mt-section">
      <div className="reveal-media media-hover aspect-[16/9] overflow-hidden bg-adobe-deep md:aspect-[21/9]">
        <Photo image={image} sizes="(min-width: 1200px) 1200px, 100vw" />
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-8">
        <div className="reveal">
          <h2 id="metodo-titulo" className="text-heading font-light text-cobre">Cómo trabajamos</h2>
          <p className="mt-4 max-w-prose text-body-lg text-ink">
            Partimos desde {site.baseCity} y llegamos a cualquier ciudad del país con el mismo equipo y el
            mismo método. Cada montaje empieza en el terreno, no en un catálogo.
          </p>
        </div>
        <ol className="border-t border-adobe-line">
          {method.map(([title, text], i) => (
            <li key={title} className="reveal grid grid-cols-[2.5rem_1fr] gap-2 border-b border-adobe-line py-4" style={{ '--i': i }}>
              <span className="text-body tabular-nums text-cobre">{i + 1}</span>
              <div>
                <p className="text-body uppercase text-ink">{title}</p>
                <p className="mt-1 text-body text-ink-soft">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  )
}
