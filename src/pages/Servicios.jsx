import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../components/PageTransition'
import { services } from '../data/services'

const WA_URL =
  'https://wa.me/59177797997?text=Hola!%20Me%20gustaría%20consultar%20sobre%20sus%20servicios%20de%20eventos.'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Servicios() {
  const [active, setActive] = useState(null)

  return (
    <PageTransition>
      {/* Page hero */}
      <section className="pt-40 pb-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label mb-6"
          >
            Lo que ofrecemos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-obsidian leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
          >
            Nuestros
            <br />
            <em>Servicios</em>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="h-px bg-champagne w-24 mt-8 origin-left"
          />
        </div>
      </section>

      {/* Services — alternating layout */}
      <section className="bg-cream-50 pb-20">
        {services.map((service, i) => (
          <FadeIn key={service.id}>
            <div
              className={`max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center border-t border-cream-200 ${
                i % 2 === 1 ? 'md:direction-rtl' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden aspect-[4/3] ${
                  i % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-obsidian px-4 py-2">
                  <span className="font-body text-[9px] tracking-mega uppercase text-champagne">
                    {service.accent}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <p className="section-label mb-4">{service.subtitle}</p>
                <h2
                  className="font-display font-light text-obsidian leading-tight mb-6"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
                >
                  {service.title}
                </h2>
                <p className="font-body text-obsidian/60 leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Details accordion */}
                <button
                  onClick={() => setActive(active === service.id ? null : service.id)}
                  className="flex items-center gap-3 font-body text-xs tracking-ultra uppercase text-obsidian/70 hover:text-obsidian transition-colors mb-4 group"
                >
                  <span>
                    {active === service.id ? 'Ocultar detalles' : 'Ver qué incluye'}
                  </span>
                  <motion.span
                    animate={{ rotate: active === service.id ? 45 : 0 }}
                    className="text-champagne text-lg leading-none"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {active === service.id && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-6">
                        {service.details.map((detail, di) => (
                          <li
                            key={di}
                            className="flex items-start gap-2 font-body text-sm text-obsidian/60"
                          >
                            <span className="text-champagne mt-1 text-xs">◆</span>
                            {detail}
                          </li>
                        ))}
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>

                <a
                  href={`${WA_URL}%20-%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Consultar este servicio
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-obsidian py-24">
        <FadeIn className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label text-cream-200/40 mb-6">¿Tienes algo especial en mente?</p>
          <h2
            className="font-display font-light text-cream-50 leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Cada evento es único,{' '}
            <em>como tú.</em>
          </h2>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-champagne text-obsidian font-body text-sm tracking-ultra uppercase transition-all duration-500 hover:bg-cream-50"
          >
            Solicitar cotización
          </a>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
