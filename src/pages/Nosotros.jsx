import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import QuoteBlock from '../components/QuoteBlock'
import ExperienceList from '../components/ExperienceList'
import MethodBlock from '../components/MethodBlock'
import Container from '../components/ui/Container'
import PhotoBand from '../components/ui/PhotoBand'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { media } from '../content/media'
import { site } from '../content/site'

// Principios de trabajo: afirmaciones que HCK puede sostener sin cifras.
const principles = [
  ['Precisión', 'Medimos antes de proponer. Cada estructura responde al terreno real, no a un plano genérico.'],
  ['Seguridad', 'Anclajes, lastres y cargas pensados para el viento y la altura del lugar.'],
  ['Tiempos', 'Montamos y desmontamos dentro de las ventanas que da el recinto.'],
  ['Orden', 'Un solo equipo coordina transporte, instalación y operación con el resto de proveedores.'],
]

export default function Nosotros() {
  useDocumentMeta('/nosotros')

  return (
    <PageTransition>
      <main>
        <PageHeader
          title="La estructura detrás de cada evento"
          intro={`${site.legalName} resuelve la infraestructura de bodas, eventos corporativos e institucionales desde ${site.baseCity}.`}
        />

        <div className="mt-16">
          <PhotoBand image={media.detalle} caption="El trabajo se nota en los detalles que nadie mira: tensores, anclajes y cumbreras." />
        </div>

        <Container as="section" aria-labelledby="quienes-titulo" className="mt-section grid gap-10 md:grid-cols-2 md:gap-8">
          <div className="reveal">
            <h2 id="quienes-titulo" className="text-heading font-light text-cobre">Quiénes somos</h2>
          </div>
          <div className="reveal space-y-4 text-body-lg text-ink" style={{ '--i': 1 }}>
            <p>
              Somos el equipo de infraestructura de VIP Planners. Cuando un evento necesita un techo, un escenario,
              una pista o un recorrido que todavía no existe, lo diseñamos, lo transportamos y lo montamos.
            </p>
            <p>
              Trabajamos con organizadores corporativos, representaciones diplomáticas, colegios, planners y familias
              que necesitan que el espacio funcione sin sorpresas.
            </p>
          </div>
        </Container>

        <Container as="section" aria-labelledby="principios-titulo" className="mt-section">
          <h2 id="principios-titulo" className="reveal text-center text-heading font-light text-cobre">Cómo pensamos un montaje</h2>
          <dl className="mt-10 grid gap-10 md:grid-cols-4 md:gap-8">
            {principles.map(([term, text], i) => (
              <div key={term} className="reveal border-t border-adobe-line pt-4" style={{ '--i': i }}>
                <dt className="text-subheading uppercase text-ink">{term}</dt>
                <dd className="mt-2 text-body text-ink-soft">{text}</dd>
              </div>
            ))}
          </dl>
        </Container>

        <ExperienceList />
        <MethodBlock image={media.cubierta} />
        <QuoteBlock />
      </main>
    </PageTransition>
  )
}
