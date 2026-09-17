import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Photo from './ui/Photo'
import { ArrowDown, ArrowRight } from './ui/Icons'
import { whatsappUrl } from '../content/site'
import useMotionAllowed from '../hooks/useMotionAllowed'

// Hero a sangre: fotografía (o video sin sonido) a pantalla completa, tipografía blanca centrada,
// etiqueta arriba, metadatos abajo y una flecha pequeña en cobre como única indicación de desplazamiento.
// Movimiento: entrada escalonada con desenfoque, y al hacer scroll la foto se desplaza más lento que el texto.
export default function Hero({ image, video, eyebrow, title, meta, nextId }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const playVideo = useMotionAllowed() && Boolean(video?.src)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative isolate flex min-h-[640px] items-center overflow-hidden bg-onyx text-white [height:100svh] lg:min-h-[760px]">
      <motion.div className="absolute inset-0 -z-10" style={{ y: reduce ? 0 : mediaY }}>
        <div className="hero-media h-full w-full">
          {playVideo ? (
            <video className="h-full w-full object-cover" src={video.src} poster={video.poster ?? image?.src} autoPlay muted loop playsInline aria-hidden="true" />
          ) : (
            <Photo image={image} priority sizes="100vw" />
          )}
        </div>
      </motion.div>
      {/* Velo plano para legibilidad del texto blanco; no es un degradado decorativo. */}
      <div className="absolute inset-0 -z-10 bg-onyx/40" aria-hidden="true" />

      <motion.div
        className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 pt-16 text-center sm:px-6"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {eyebrow && <p className="hero-enter type-label">{eyebrow}</p>}
        <h1 className="hero-enter type-display-xl mt-6 max-w-[14ch]" style={{ '--i': 1 }}>{title}</h1>
        {meta && <p className="hero-enter mt-8 max-w-xl text-subheading" style={{ '--i': 2 }}>{meta}</p>}
        <div className="hero-enter mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-8" style={{ '--i': 3 }}>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            Cotizar por WhatsApp <ArrowRight />
          </a>
          <Link to="/servicios" className="link-draw inline-flex min-h-11 items-center type-label">
            Ver servicios
          </Link>
        </div>
      </motion.div>

      {nextId && (
        <a
          href={`#${nextId}`}
          className="hero-enter group absolute bottom-6 left-1/2 inline-flex h-11 w-11 -translate-x-1/2 items-center justify-center text-cobre-light"
          style={{ '--i': 5 }}
          aria-label="Ir al contenido"
        >
          <span className="transition-transform duration-500 ease-out group-hover:translate-y-1">
            <ArrowDown />
          </span>
        </a>
      )}
    </section>
  )
}
