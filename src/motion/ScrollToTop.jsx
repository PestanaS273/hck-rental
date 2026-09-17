import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from './MotionProvider'

// Al cambiar de ruta: arriba del todo, o al ancla si la URL trae #hash.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    const timer = setTimeout(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null
      if (target) {
        lenis ? lenis.scrollTo(target, { offset: -24 }) : target.scrollIntoView()
      } else {
        lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
      }
    }, hash ? 450 : 0)
    return () => clearTimeout(timer)
  }, [pathname, hash, lenis])

  return null
}
