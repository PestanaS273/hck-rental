import { Link } from 'react-router-dom'
import Container from './ui/Container'
import { navLinks, site, whatsappUrl } from '../content/site'

// Pie sobre el mismo lienzo: el sitio no alterna bandas oscuras y claras.
export default function Footer() {
  return (
    <footer className="reveal mt-section border-t border-adobe-line pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] pt-12 text-body">
      <Container className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-subheading text-cobre">HCK Rental</p>
          <p className="mt-1 text-ink-soft">by VIP Planners</p>
          <p className="mt-4 max-w-xs text-ink">
            Carpas, toldos arquitectónicos, tarimas, pistas y logística para eventos. {site.baseCity}, Bolivia. {site.coverage}.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <ul className="flex flex-col">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="link-draw inline-flex min-h-11 items-center uppercase text-ink transition-colors hover:text-cobre [background-position:0_calc(100%-12px)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-4">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-cobre text-subhead-lg">
            {site.whatsapp}
          </a>
          {site.instagram && (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="link-cobre">
              Instagram {site.instagramHandle}
            </a>
          )}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-cobre">
            Solicitar cotización
          </a>
        </div>
      </Container>

      <Container className="mt-12 flex flex-col justify-between gap-2 text-caption uppercase text-ink-soft sm:flex-row">
        <p>© {new Date().getFullYear()} {site.legalName}</p>
        <p>Infraestructura para eventos en Bolivia</p>
      </Container>
    </footer>
  )
}
