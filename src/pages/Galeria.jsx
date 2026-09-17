import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import QuoteBlock from '../components/QuoteBlock'
import Container from '../components/ui/Container'
import EditorialItem from '../components/ui/EditorialItem'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { categories, projects } from '../content/projects'

const ease = [0.16, 1, 0.3, 1]

export default function Galeria() {
  useDocumentMeta('/galeria')

  const [filter, setFilter] = useState('todos')
  const [open, setOpen] = useState(null)

  const visible = useMemo(
    () => (filter === 'todos' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const usedCategories = categories.filter((c) => c.id === 'todos' || projects.some((p) => p.category === c.id))
  const hasPlaceholders = projects.some((p) => p.placeholder)

  return (
    <PageTransition>
      <main>
        <PageHeader
          title="Galería de montajes"
          intro="Estructuras, superficies y recorridos resueltos para cada tipo de evento."
        />

        <Container as="section" aria-label="Montajes" className="mt-12">
          <div role="group" aria-label="Filtrar por tipo de evento" className="hero-enter flex flex-wrap justify-center gap-2" style={{ '--i': 2 }}>
            {usedCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                aria-pressed={filter === c.id}
                className={`btn ${filter === c.id ? 'btn-cobre [&::before]:hidden' : 'btn-quiet'}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.ul layout className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease, delay: i * 0.05 } }}
                  exit={{ opacity: 0, scale: 0.97, filter: 'blur(4px)', transition: { duration: 0.35, ease } }}
                >
                  <EditorialItem
                    index={i}
                    image={p.cover}
                    label={`${p.type} · ${p.place}${p.year ? ` · ${p.year}` : ''}`}
                    title={p.title}
                    onOpen={() => setOpen(p)}
                  >
                    <p>{p.scope}</p>
                  </EditorialItem>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {hasPlaceholders && (
            <p className="reveal mt-12 text-center text-caption uppercase text-ink-soft">
              Imágenes de referencia de licencia libre. Se reemplazan por obra de HCK Rental.
            </p>
          )}
        </Container>

        <Lightbox
          open={Boolean(open)}
          close={() => setOpen(null)}
          plugins={[Captions]}
          slides={(open?.images ?? []).map((img) => ({
            src: img.src,
            alt: img.alt,
            width: img.width,
            height: img.height,
            title: open?.title,
            description: img.alt,
          }))}
          animation={{ fade: 400, swipe: 500 }}
          controller={{ closeOnBackdropClick: true }}
          labels={{ Previous: 'Anterior', Next: 'Siguiente', Close: 'Cerrar' }}
        />

        <QuoteBlock title="¿Tienes un evento parecido en mente?" />
      </main>
    </PageTransition>
  )
}
