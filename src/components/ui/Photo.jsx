// Fotografía a sangre: sin bordes redondeados, sombras ni filtros. `image` viene de src/content/media.js.
export default function Photo({ image, className = '', sizes = '100vw', priority = false, ...props }) {
  if (!image) return null
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined} // React 18 solo reconoce el atributo en minúsculas
      className={`block h-full w-full object-cover ${className}`}
      style={image.position ? { objectPosition: image.position } : undefined}
      {...props}
    />
  )
}
