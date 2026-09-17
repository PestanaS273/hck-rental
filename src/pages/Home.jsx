import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import QuoteBlock from '../components/QuoteBlock'
import ExperienceList from '../components/ExperienceList'
import MethodBlock from '../components/MethodBlock'
import Container from '../components/ui/Container'
import EditorialItem from '../components/ui/EditorialItem'
import VideoBand from '../components/ui/VideoBand'
import { ArrowRight } from '../components/ui/Icons'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { media } from '../content/media'
import { services } from '../content/services'
import { projects } from '../content/projects'
import { site } from '../content/site'

export default function Home() {
  useDocumentMeta('/')

  return (
    <PageTransition>
      <main>
        <Hero
          image={media.hero}
          eyebrow={`${site.baseCity} · ${site.coverage}`}
          title="Infraestructura para eventos en Bolivia"
          meta="Carpas de gran formato, toldos arquitectónicos, tarimas y pistas."
          nextId="inicio-contenido"
        />

        <Container id="inicio-contenido" className="scroll-mt-8 pt-section">
          <p className="reveal mx-auto max-w-[30ch] text-center text-heading font-light text-ink md:max-w-[38ch]">
            Diseñamos, montamos y operamos la estructura de cada evento: desde un toldo arquitectónico para un jardín
            hasta la carpa que se convierte en el recinto completo de una recepción institucional.
          </p>
          <p className="reveal mt-6 text-center" style={{ '--i': 1 }}>
            <Link to="/nosotros" className="link-cobre type-label">Conocer HCK Rental</Link>
          </p>
        </Container>

        <Container as="section" aria-labelledby="servicios-titulo" className="mt-section">
          <h2 id="servicios-titulo" className="reveal text-center text-heading font-light text-cobre">Lo que montamos</h2>
          <div className="mt-10 grid gap-14 md:grid-cols-3 md:gap-8">
            {services.slice(0, 3).map((s, i) => (
              <EditorialItem key={s.id} index={i} image={s.image} label={s.label} title={s.title} cta="Ver detalle" to={`/servicios#${s.id}`}>
                <p>{s.summary}</p>
              </EditorialItem>
            ))}
          </div>
        </Container>

        <figure className="mt-section">
          <VideoBand video={media.bandaVideo} className="h-[58vh] min-h-[360px] lg:h-[78vh]" />
          <Container as="figcaption" className="reveal mt-3 text-caption uppercase text-ink-soft">
            Cubierta tensada sobre terreno abierto: la estructura se adapta al lugar, no al revés.
          </Container>
        </figure>

        <Container as="section" aria-labelledby="proyectos-titulo" className="mt-section">
          <h2 id="proyectos-titulo" className="reveal text-center text-heading font-light text-cobre">Montajes recientes</h2>
          <div className="mt-10 grid gap-14 md:grid-cols-3 md:gap-8">
            {projects.slice(0, 3).map((p, i) => (
              <EditorialItem key={p.slug} index={i} image={p.cover} label={`${p.type} · ${p.place}`} title={p.title}>
                <p>{p.scope}</p>
              </EditorialItem>
            ))}
          </div>
          <p className="reveal mt-12 text-center">
            <Link to="/galeria" className="btn btn-ink">Ver galería <ArrowRight /></Link>
          </p>
        </Container>

        <ExperienceList />
        <MethodBlock />
        <QuoteBlock />
      </main>
    </PageTransition>
  )
}
