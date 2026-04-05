import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import PageTransition from '../components/PageTransition'
import { services } from '../data/services'
import { galleryItems } from '../data/gallery'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=90'

const WA_URL =
  'https://wa.me/59177797997?text=Hola!%20Me%20gustaría%20consultar%20sobre%20sus%20servicios%20de%20eventos.'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
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

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const featuredServices = services.slice(0, 4)
  const featuredGallery = galleryItems.slice(0, 6)

  return (
    <PageTransition>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[680px] flex items-end overflow-hidden"
      >
        {/* Parallax image */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 scale-110"
        >
          <img
            src={HERO_IMAGE}
            alt="Evento de lujo"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-transparent" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label text-cream-200/80 mb-6"
          >
            Eventos de lujo en Bolivia
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-cream-50 leading-none mb-2"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
          >
            HCK Rental
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="h-px bg-champagne w-32 mb-6 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-display italic text-cream-200/90 mb-10 max-w-lg"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
          >
            Donde cada momento se convierte en un recuerdo eterno.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/servicios"
              className="btn-primary"
            >
              Nuestros Servicios
              <ArrowRight />
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 border border-cream-50/30 text-cream-50 font-body text-sm tracking-ultra uppercase transition-all duration-500 hover:bg-cream-50 hover:text-obsidian"
            >
              Cotizar Ahora
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="font-body text-[9px] tracking-mega uppercase text-cream-50/40">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-cream-50/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-24 md:py-36 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="section-label mb-6">Quiénes somos</p>
              <h2 className="font-display font-light text-obsidian leading-tight mb-8"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                El arte de crear<br />
                <em>momentos únicos</em>
              </h2>
              <p className="font-body text-obsidian/60 leading-relaxed mb-6">
                HCK Rental by VIP Planners es la referencia en organización de eventos de
                lujo en Bolivia. Con años de experiencia y una pasión inquebrantable por
                los detalles, transformamos tus sueños en realidades que superan toda
                expectativa.
              </p>
              <p className="font-body text-obsidian/60 leading-relaxed mb-10">
                Desde íntimas celebraciones familiares hasta grandes eventos diplomáticos,
                cada proyecto recibe nuestra dedicación total. Operamos en La Paz, Tarija y
                Santa Cruz.
              </p>
              <Link to="/nosotros" className="btn-outline">
                Conocer más <ArrowRight />
              </Link>
            </FadeIn>

            <FadeIn delay={0.2} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85"
                  alt="Evento de bodas"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-8 -left-8 bg-obsidian p-6 max-w-[180px]">
                <p className="font-display text-5xl font-light text-cream-50 leading-none">
                  +100
                </p>
                <p className="font-body text-xs tracking-ultra uppercase text-champagne mt-2">
                  Eventos realizados
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-24 md:py-36 bg-cream-100">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <p className="section-label mb-4">Lo que hacemos</p>
            <h2
              className="font-display font-light text-obsidian leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Servicios <em>especializados</em>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.1}>
                <Link
                  to="/servicios"
                  className="group block relative overflow-hidden aspect-[3/4] bg-cream-200"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="font-body text-[9px] tracking-mega uppercase text-champagne mb-2">
                      {service.accent}
                    </p>
                    <h3 className="font-display text-2xl font-light italic text-cream-50">
                      {service.title}
                    </h3>
                    <div className="h-px bg-champagne w-0 group-hover:w-full transition-all duration-500 mt-3" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-12">
            <Link to="/servicios" className="btn-outline">
              Ver todos los servicios <ArrowRight />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-6 bg-obsidian overflow-hidden">
        <Marquee />
      </div>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-24 md:py-36 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="flex items-end justify-between mb-12 gap-4 flex-wrap">
            <div>
              <p className="section-label mb-4">Portfolio</p>
              <h2
                className="font-display font-light text-obsidian leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                Momentos que<br />
                <em>hemos creado</em>
              </h2>
            </div>
            <Link to="/galeria" className="btn-outline shrink-0">
              Ver galería <ArrowRight />
            </Link>
          </FadeIn>

          {/* Asymmetric gallery grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
            {featuredGallery.map((item, i) => {
              const spans = [
                'col-span-7 row-span-2',
                'col-span-5 row-span-1',
                'col-span-5 row-span-1',
                'col-span-4 row-span-2',
                'col-span-4 row-span-1',
                'col-span-4 row-span-1',
              ]
              return (
                <FadeIn
                  key={item.id}
                  delay={i * 0.05}
                  className={`${spans[i]} overflow-hidden group`}
                >
                  <Link to="/galeria" className="block w-full h-full">
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=85"
          alt="Evento de lujo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/75" />
        <FadeIn className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="section-label text-cream-200/60 mb-6">Hagámoslo realidad</p>
          <h2
            className="font-display font-light text-cream-50 leading-tight mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            ¿Tienes un evento<br />
            <em>en mente?</em>
          </h2>
          <p className="font-body text-cream-200/70 mb-10 max-w-md mx-auto">
            Cuéntanos tu visión y la convertiremos en algo extraordinario.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-champagne text-obsidian font-body text-sm tracking-ultra uppercase transition-all duration-500 hover:bg-cream-50"
          >
            <WAIcon />
            Escribir por WhatsApp
          </a>
        </FadeIn>
      </section>
    </PageTransition>
  )
}

function Marquee() {
  const items = [
    'Bodas', '✦', 'Cumpleaños', '✦', 'Embajadas', '✦',
    'Graduaciones', '✦', 'Quinceaños', '✦', 'Eventos Corporativos', '✦',
    'Bodas', '✦', 'Cumpleaños', '✦', 'Embajadas', '✦',
    'Graduaciones', '✦', 'Quinceaños', '✦', 'Eventos Corporativos', '✦',
  ]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        className="flex shrink-0 gap-8 items-center"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`font-display italic text-lg whitespace-nowrap ${
              item === '✦' ? 'text-champagne text-xs' : 'text-cream-200/70'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function WAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
