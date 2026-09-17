import { Link } from 'react-router-dom'
import Photo from './Photo'
import { ArrowRight } from './Icons'

// Pieza editorial de la grilla de tres: imagen, etiqueta, titular en mayúsculas, texto y botón de contorno.
// Sin borde, sombra ni fondo: el espacio en blanco separa las columnas.
// `index` escalona el revelado dentro de la fila; `onOpen` convierte la imagen en disparador (galería).
export default function EditorialItem({ image, label, title, children, cta, to, href, index = 0, onOpen, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`
  const external = href && /^https?:/.test(href)
  const stagger = { '--i': index % 3 }

  const media = (
    <div className="reveal-media media-hover aspect-[4/5] overflow-hidden bg-adobe-deep" style={stagger}>
      <Photo image={image} sizes="(min-width: 768px) 33vw, 100vw" />
    </div>
  )

  return (
    <article className="group flex flex-col">
      {onOpen ? (
        <button type="button" onClick={onOpen} className="block w-full text-left" aria-label={`Ver fotos: ${title}`}>
          {media}
        </button>
      ) : media}
      <div className="reveal" style={stagger}>
        {label && <p className="type-label mt-6 text-cobre">{label}</p>}
        <Heading className="mt-2 text-subheading uppercase text-ink transition-colors duration-500 group-hover:text-cobre">{title}</Heading>
        {children && <div className="mt-3 max-w-prose text-body text-ink">{children}</div>}
        {cta && (to || href) && (
          <div className="mt-6">
            {to ? (
              <Link to={to} className="btn btn-cobre">{cta} <ArrowRight /></Link>
            ) : (
              <a href={href} className="btn btn-cobre" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {cta} <ArrowRight />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
