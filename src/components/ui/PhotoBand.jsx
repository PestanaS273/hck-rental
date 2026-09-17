import Photo from './Photo'
import Parallax from '../../motion/Parallax'

// Fotografía a todo el ancho de la ventana con parallax suave y pie de foto opcional.
export default function PhotoBand({ image, caption, className = 'h-[52vh] min-h-[320px] lg:h-[72vh]' }) {
  return (
    <figure>
      <div className={`reveal-media w-full bg-adobe-deep ${className}`}>
        <Parallax strength={14} className="h-full w-full">
          <Photo image={image} sizes="100vw" />
        </Parallax>
      </div>
      {caption && (
        <figcaption className="reveal safe-x mx-auto mt-3 w-full max-w-page text-caption uppercase text-ink-soft sm:px-6">{caption}</figcaption>
      )}
    </figure>
  )
}
