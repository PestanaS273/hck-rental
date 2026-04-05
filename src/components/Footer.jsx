import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/galeria', label: 'Galería' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-obsidian text-cream-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-display text-4xl font-light italic text-cream-50">
                HCK Rental
              </h2>
              <p className="font-body text-[9px] tracking-mega uppercase text-champagne mt-1">
                by VIP Planners
              </p>
            </div>
            <p className="font-body text-sm text-cream-300/70 leading-relaxed max-w-xs">
              Creamos experiencias únicas para los momentos más importantes de tu vida.
              Elegancia, pasión y dedicación en cada evento.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h3 className="section-label text-cream-300/50">Navegación</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-body text-sm text-cream-300/70 hover:text-cream-50 transition-colors duration-300 w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="section-label text-cream-300/50">Contacto</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/59177797997"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-cream-300/70 hover:text-cream-50 transition-colors duration-300 group"
              >
                <span className="text-champagne group-hover:text-cream-50 transition-colors">
                  WhatsApp
                </span>
                +591 777 79997
              </a>
              <div className="flex flex-col gap-1">
                <p className="font-body text-xs tracking-ultra uppercase text-cream-300/40 mb-1">
                  Ciudades
                </p>
                <p className="font-body text-sm text-cream-300/70">La Paz · Tarija · Santa Cruz</p>
                <p className="font-body text-sm text-cream-300/50">Bolivia</p>
              </div>
            </div>

            <a
              href="https://wa.me/59177797997?text=Hola!%20Me%20gustaría%20consultar%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 border border-champagne/40 text-champagne text-xs tracking-ultra uppercase font-body transition-all duration-300 hover:bg-champagne hover:text-obsidian w-fit"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream-300/30 tracking-wide">
            © {new Date().getFullYear()} HCK Rental — VIP Planners. Bolivia.
          </p>
          <p className="font-display text-xs italic text-cream-300/30">
            Cada momento, una obra de arte.
          </p>
        </div>
      </div>
    </footer>
  )
}
