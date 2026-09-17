import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, site, whatsappUrl } from '../content/site'
import { useLenis } from '../motion/MotionProvider'

const ease = [0.16, 1, 0.3, 1]

// Navegación distribuida: grupos a izquierda y derecha, marca al centro.
// Sobre el hero de inicio es transparente con texto blanco; en el resto va sobre el lienzo en cobre.
// No es fija: pertenece a la primera pantalla, como en la referencia.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const lenis = useLenis()
  const overHero = location.pathname === '/'
  const tone = overHero ? 'text-white' : 'text-cobre'

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, lenis])

  const linkClass = 'link-draw inline-flex min-h-11 items-center type-label [background-position:0_calc(100%-12px)]'
  const [left, right] = [navLinks.slice(0, 2), navLinks.slice(2)]

  return (
    <header className={`${overHero ? 'absolute inset-x-0 top-0' : 'relative'} z-30 ${tone}`}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.1 }}
        className="safe-x safe-top mx-auto grid h-20 w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center sm:px-6 lg:h-24 lg:px-10"
      >
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {left.map((l) => <NavLink key={l.to} to={l.to} className={linkClass}>{l.label}</NavLink>)}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inline-flex min-h-11 items-center justify-self-start type-label md:hidden"
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
        >
          Menú
        </button>

        <Link to="/" className="inline-flex min-h-11 items-center text-subheading transition-opacity duration-500 hover:opacity-70" aria-label={`${site.legalName}, inicio`}>
          HCK Rental
        </Link>

        <div className="flex items-center justify-end gap-8">
          <nav aria-label="Secundaria" className="hidden items-center gap-8 md:flex">
            {right.map((l) => <NavLink key={l.to} to={l.to} className={linkClass}>{l.label}</NavLink>)}
          </nav>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`btn hidden lg:inline-flex ${overHero ? 'btn-light' : 'btn-cobre'}`}>
            Cotizar
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center type-label md:hidden">
            WhatsApp
          </a>
        </div>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="safe-x safe-top safe-bottom fixed inset-0 z-50 flex flex-col bg-adobe text-cobre"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.7, ease } }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.5, ease } }}
          >
            <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center">
              <span />
              <Link to="/" className="inline-flex min-h-11 items-center text-subheading">HCK Rental</Link>
              <button type="button" onClick={() => setMenuOpen(false)} className="inline-flex min-h-11 items-center justify-self-end type-label" autoFocus>
                Cerrar
              </button>
            </div>
            <nav aria-label="Menú móvil" className="flex flex-1 flex-col items-center justify-center gap-4">
              {[{ to: '/', label: 'Inicio' }, ...navLinks].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease, delay: 0.2 + i * 0.07 } }}
                >
                  <NavLink to={l.to} end className="type-display">{l.label}</NavLink>
                </motion.div>
              ))}
            </nav>
            <motion.div className="flex justify-center pb-10" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.6 } }}>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-cobre">
                Cotizar por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
