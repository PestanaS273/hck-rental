import { useEffect } from 'react'
import { seoFor } from '../content/seo'

// Mantiene título y descripción al navegar dentro de la SPA.
// El HTML inicial de cada ruta ya viene con sus metadatos desde el prerenderizado.
export default function useDocumentMeta(path) {
  useEffect(() => {
    const { title, description } = seoFor(path)
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [path])
}
