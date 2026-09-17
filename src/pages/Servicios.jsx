import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import QuoteBlock from '../components/QuoteBlock'
import Container from '../components/ui/Container'
import Photo from '../components/ui/Photo'
import { ArrowRight } from '../components/ui/Icons'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { services } from '../content/services'
import { eventTypes, whatsappUrl } from '../content/site'

export default function Servicios() {
  useDocumentMeta('/servicios')

  return (
    <PageTransition>
      <main>
        <PageHeader
          title="Servicios de infraestructura para eventos"
          intro="Carpas de gran formato, toldos arquitectónicos y todo lo que un evento necesita antes de su primer invitado."
        />

        <Container as="nav" aria-label="Servicios" className="hero-enter mt-10" style={{ '--i': 2 }}>
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`#${s.id}`} className="btn btn-quiet">{s.title}</Link>
              </li>
            ))}
          </ul>
        </Container>

        {services.map((s, i) => (
          <Container as="section" key={s.id} id={s.id} aria-labelledby={`${s.id}-titulo`} className="mt-section scroll-mt-8">
            <div className="reveal-media media-hover group aspect-[4/3] overflow-hidden bg-adobe-deep md:aspect-[21/9]">
              <Photo image={s.image} sizes="(min-width: 1200px) 1200px, 100vw" />
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="reveal">
                <p className="type-label text-cobre">
                  <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span> · {s.label}
                </p>
                <h2 id={`${s.id}-titulo`} className="mt-3 text-heading font-light text-cobre">{s.title}</h2>
                <p className="mt-4 max-w-prose text-body-lg text-ink">{s.summary}</p>
              </div>
              <div className="reveal" style={{ '--i': 1 }}>
                <h3 className="type-label text-ink-soft">Incluye</h3>
                <ul className="mt-3 border-t border-adobe-line">
                  {s.includes.map((item) => (
                    <li key={item} className="border-b border-adobe-line py-3 text-body-lg text-ink">{item}</li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(`Hola, quiero cotizar ${s.title.toLowerCase()} para un evento.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-cobre mt-8"
                >
                  Cotizar {s.title.toLowerCase()} <ArrowRight />
                </a>
              </div>
            </div>
          </Container>
        ))}

        <Container as="section" aria-labelledby="eventos-titulo" className="mt-section text-center">
          <h2 id="eventos-titulo" className="reveal type-label text-cobre">Montamos para</h2>
          <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3 text-subhead-lg font-light text-ink">
            {eventTypes.filter((t) => t !== 'Otro').map((t, i) => (
              <li key={t} className="reveal" style={{ '--i': i }}>{t}</li>
            ))}
          </ul>
        </Container>

        <QuoteBlock />
      </main>
    </PageTransition>
  )
}
