import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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

const waMessages = [
  {
    label: 'Boda',
    message: 'Hola! Me gustaría consultar sobre la organización de mi boda.',
    icon: '💍',
  },
  {
    label: 'Cumpleaños',
    message: 'Hola! Me gustaría organizar una fiesta de cumpleaños especial.',
    icon: '🎂',
  },
  {
    label: 'Evento de Embajada',
    message: 'Buenos días. Me gustaría consultar sobre eventos para una embajada.',
    icon: '🏛️',
  },
  {
    label: 'Graduación',
    message: 'Hola! Quiero organizar una celebración de graduación.',
    icon: '🎓',
  },
  {
    label: 'Quinceaños',
    message: 'Hola! Me gustaría consultar sobre la organización de un quinceaños.',
    icon: '✨',
  },
  {
    label: 'Otro evento',
    message: 'Hola! Me gustaría consultar sobre sus servicios de eventos.',
    icon: '🌸',
  },
]

export default function Contacto() {
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
            Hablemos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-obsidian leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
          >
            Contáctanos
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="h-px bg-champagne w-24 mt-8 origin-left"
          />
        </div>
      </section>

      {/* Main contact section */}
      <section className="bg-cream-50 py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

          {/* Left: info + WhatsApp CTA */}
          <FadeIn>
            <div className="sticky top-28">
              <h2
                className="font-display font-light text-obsidian leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                La forma más rápida<br />
                <em>de hablar con nosotros</em>
              </h2>
              <p className="font-body text-obsidian/60 leading-relaxed mb-10 max-w-md">
                Creemos en la comunicación directa y personalizada. Escríbenos por
                WhatsApp y nos pondremos en contacto contigo a la brevedad para
                comenzar a planear tu evento especial.
              </p>

              {/* Main WA Button */}
              <a
                href="https://wa.me/59177797997?text=Hola!%20Me%20gustaría%20consultar%20sobre%20sus%20servicios%20de%20eventos."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 bg-obsidian hover:bg-[#25D366] transition-all duration-500 mb-8 w-full max-w-sm"
              >
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-cream-50/20 group-hover:border-white/30 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-body text-xs tracking-ultra uppercase text-cream-50/60 mb-0.5">
                    WhatsApp
                  </p>
                  <p className="font-display italic text-cream-50 text-xl">
                    +591 777 79997
                  </p>
                </div>
                <svg
                  className="ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Location info */}
              <div className="space-y-4">
                <p className="font-body text-xs tracking-ultra uppercase text-obsidian/40">
                  Disponibles en
                </p>
                {['La Paz', 'Tarija', 'Santa Cruz'].map((city) => (
                  <div key={city} className="flex items-center gap-3">
                    <span className="text-champagne text-xs">◆</span>
                    <span className="font-body text-sm text-obsidian/60">{city}, Bolivia</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: Quick WA shortcuts */}
          <FadeIn delay={0.15}>
            <div>
              <p className="section-label mb-6">¿Qué tipo de evento tienes en mente?</p>
              <p className="font-body text-sm text-obsidian/50 mb-8 leading-relaxed">
                Selecciona tu tipo de evento y te abriremos directamente un chat de WhatsApp
                con un mensaje predefinido para agilizar tu consulta.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {waMessages.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={`https://wa.me/59177797997?text=${encodeURIComponent(item.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 + 0.4 }}
                    whileHover={{ y: -3 }}
                    className="group flex items-center gap-4 p-5 border border-cream-200 hover:border-champagne hover:bg-cream-100 transition-all duration-300"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="font-body text-sm font-medium text-obsidian group-hover:text-champagne transition-colors">
                        {item.label}
                      </p>
                      <p className="font-body text-[10px] tracking-wide uppercase text-obsidian/40 mt-0.5">
                        Abrir chat →
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Additional note */}
              <div className="mt-10 p-6 bg-cream-100 border-l-2 border-champagne">
                <p className="font-display italic text-obsidian/70 text-lg leading-snug">
                  "Respondemos cada consulta con la atención que se merece. Tu evento
                  especial comienza con una conversación."
                </p>
                <p className="font-body text-[9px] tracking-mega uppercase text-champagne mt-4">
                  — HCK Rental by VIP Planners
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Instagram note */}
      <section className="bg-obsidian py-16">
        <FadeIn className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-ultra uppercase text-cream-300/40 mb-4">
            También nos encuentras en
          </p>
          <p className="font-display italic text-cream-50/80 text-2xl mb-2">Instagram</p>
          <p className="font-body text-sm text-cream-300/50">
            Seguinos para ver nuestros últimos eventos y novedades
          </p>
        </FadeIn>
      </section>
    </PageTransition>
  )
}
