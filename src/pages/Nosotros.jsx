import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

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

const values = [
  {
    icon: '◆',
    title: 'Excelencia',
    description:
      'Cada detalle importa. Nos exigimos el más alto nivel en cada elemento de cada evento que organizamos.',
  },
  {
    icon: '◆',
    title: 'Creatividad',
    description:
      'No creemos en fórmulas repetidas. Cada evento es una oportunidad de crear algo completamente único.',
  },
  {
    icon: '◆',
    title: 'Compromiso',
    description:
      'Tu visión es nuestra misión. Trabajamos incansablemente para superar tus expectativas en cada proyecto.',
  },
  {
    icon: '◆',
    title: 'Discreción',
    description:
      'Manejamos cada evento con la confidencialidad y el profesionalismo que nuestros clientes merecen.',
  },
]

const cities = [
  { name: 'La Paz', description: 'Sede principal — capital de Bolivia' },
  { name: 'Tarija', description: 'La ciudad más cálida del sur' },
  { name: 'Santa Cruz', description: 'Capital económica de Bolivia' },
]

export default function Nosotros() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label mb-6"
          >
            Nuestra historia
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-obsidian leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
          >
            Quiénes
            <br />
            <em>Somos</em>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="h-px bg-champagne w-24 mt-8 origin-left"
          />
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <FadeIn className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1478146059778-26b9f5d59215?w=900&q=85"
                alt="Equipo VIP Planners"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating quote */}
            <div className="absolute -bottom-6 -right-6 md:-right-10 bg-obsidian p-8 max-w-[260px]">
              <p className="font-display italic text-cream-100/90 text-xl leading-snug">
                "Cada evento es una obra de arte efímera."
              </p>
              <div className="h-px bg-champagne/40 w-12 mt-4 mb-3" />
              <p className="font-body text-[9px] tracking-mega uppercase text-champagne/70">
                VIP Planners
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="md:pt-12">
            <h2
              className="font-display font-light text-obsidian leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              VIP Planners — <em>detrás de</em> HCK Rental
            </h2>
            <div className="space-y-5 font-body text-obsidian/60 leading-relaxed">
              <p>
                VIP Planners nació de la pasión por convertir momentos especiales en
                experiencias extraordinarias. Con años de trayectoria en el mercado boliviano,
                hemos construido una reputación basada en la excelencia y la atención al
                detalle más pequeño.
              </p>
              <p>
                Bajo la marca <strong className="text-obsidian font-medium">HCK Rental</strong>,
                ofrecemos un servicio integral de eventos que abarca desde la conceptualización
                hasta la ejecución perfecta. Bodas, celebraciones familiares, eventos
                diplomáticos y corporativos: cada proyecto recibe el mismo nivel de dedicación
                y cuidado.
              </p>
              <p>
                Nuestro equipo de profesionales cuenta con la experiencia y la sensibilidad
                artística necesaria para entender la visión de cada cliente y transformarla
                en algo que supere todas las expectativas.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="section-label mb-4">Lo que nos define</p>
            <h2
              className="font-display font-light text-obsidian"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Nuestros <em>valores</em>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="group flex flex-col gap-4 p-8 bg-cream-50 border border-cream-200 hover:border-champagne transition-colors duration-300">
                  <span className="text-champagne text-xs">{v.icon}</span>
                  <h3 className="font-display text-2xl font-light italic text-obsidian">
                    {v.title}
                  </h3>
                  <p className="font-body text-sm text-obsidian/60 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="section-label mb-4">Dónde operamos</p>
            <h2
              className="font-display font-light text-obsidian"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Bolivia, <em>de norte a sur</em>
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-3 gap-1">
            {cities.map((city, i) => (
              <FadeIn key={city.name} delay={i * 0.1}>
                <div className="relative overflow-hidden group">
                  <div className="bg-obsidian p-10 h-full min-h-[200px] flex flex-col justify-end transition-all duration-500 group-hover:bg-obsidian/90">
                    <div className="h-px bg-champagne/30 w-8 mb-4 group-hover:w-16 transition-all duration-500" />
                    <h3 className="font-display text-3xl font-light italic text-cream-50 mb-2">
                      {city.name}
                    </h3>
                    <p className="font-body text-sm text-cream-300/50">{city.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-cream-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '+100', label: 'Eventos realizados' },
              { number: '3', label: 'Ciudades en Bolivia' },
              { number: '100%', label: 'Clientes satisfechos' },
              { number: '1', label: 'Misión: la perfección' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <p
                  className="font-display font-light text-obsidian leading-none mb-3"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
                >
                  {stat.number}
                </p>
                <p className="font-body text-xs tracking-ultra uppercase text-obsidian/50">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-obsidian py-24">
        <FadeIn className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-label text-cream-200/40 mb-6">Trabajemos juntos</p>
          <h2
            className="font-display font-light text-cream-50 leading-tight mb-8"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Cuéntanos sobre tu{' '}
            <em>próximo evento</em>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/59177797997?text=Hola!%20Me%20gustaría%20consultar%20sobre%20sus%20servicios."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-champagne text-obsidian font-body text-sm tracking-ultra uppercase transition-all duration-500 hover:bg-cream-50"
            >
              Escribirnos
            </a>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-cream-50/20 text-cream-50 font-body text-sm tracking-ultra uppercase transition-all duration-500 hover:border-champagne hover:text-champagne"
            >
              Ver servicios
            </Link>
          </div>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
