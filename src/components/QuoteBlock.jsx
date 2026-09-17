import { Link } from 'react-router-dom'
import Container from './ui/Container'
import { ArrowRight } from './ui/Icons'
import { whatsappUrl } from '../content/site'

// Cierre de conversión compartido: titular display + dos acciones con jerarquía de color.
export default function QuoteBlock({ title = 'Cuéntanos fecha, lugar e invitados.', showForm = true }) {
  return (
    <Container as="section" aria-labelledby="cotizar-titulo" className="mt-section text-center">
      <h2 id="cotizar-titulo" className="reveal type-display mx-auto max-w-[16ch] text-cobre">{title}</h2>
      <p className="reveal mx-auto mt-6 max-w-prose text-body-lg text-ink" style={{ '--i': 1 }}>
        Te respondemos con la infraestructura que necesita tu evento y una cotización clara.
      </p>
      <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row" style={{ '--i': 2 }}>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-cobre">
          Cotizar por WhatsApp <ArrowRight />
        </a>
        {showForm && <Link to="/contacto" className="btn btn-ink">Usar el formulario</Link>}
      </div>
    </Container>
  )
}
