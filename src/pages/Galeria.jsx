import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import PageTransition from '../components/PageTransition'
import { galleryItems, categories } from '../data/gallery'

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Galeria() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered =
    activeCategory === 'todos'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const slides = filtered.map((item) => ({ src: item.src, alt: item.alt }))

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-40 pb-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label mb-6"
          >
            Nuestro trabajo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-obsidian leading-none"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)' }}
          >
            Galería
            <br />
            <em>de Eventos</em>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="h-px bg-champagne w-24 mt-8 origin-left"
          />
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-cream-50 pb-12 sticky top-[64px] z-30 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-2 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative font-body text-xs tracking-ultra uppercase px-5 py-2.5 transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-obsidian text-cream-50'
                    : 'bg-transparent text-obsidian/50 hover:text-obsidian border border-cream-300 hover:border-obsidian'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 bg-cream-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              {filtered.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.04} className="break-inside-avoid">
                  <motion.button
                    layoutId={`img-${item.id}`}
                    onClick={() => openLightbox(i)}
                    className="w-full overflow-hidden group relative block"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/40 transition-all duration-400 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 border border-cream-50 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                            <path d="M21 21l-4.35-4.35M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16z" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="font-body text-[9px] tracking-mega uppercase text-cream-50">
                          Ver
                        </span>
                      </div>
                    </div>
                    {/* Category label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-display italic text-cream-50 text-lg">{item.title}</p>
                    </div>
                  </motion.button>
                </FadeIn>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display italic text-obsidian/30 text-2xl">
                Próximamente...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(26, 23, 20, 0.97)' },
        }}
      />
    </PageTransition>
  )
}
