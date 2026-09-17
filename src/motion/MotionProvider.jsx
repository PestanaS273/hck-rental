import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

// Sistema de movimiento global (DESIGN.md › Movimiento):
// 1. Desplazamiento suave con Lenis.
// 2. Revelado al hacer scroll para todo elemento `.reveal` / `.reveal-media` (IntersectionObserver).
// Con `prefers-reduced-motion` no se activa nada y el contenido queda visible y estático.

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

export default function MotionProvider({ children }) {
  const [lenis, setLenis] = useState(null)
  const motionOn = useMotionPreference()

  useEffect(() => {
    document.documentElement.dataset.motion = motionOn ? 'on' : 'off'
    if (!motionOn) return

    const instance = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -24 } })
    let frame
    const raf = (time) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    setLenis(instance)
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      setLenis(null)
    }
  }, [motionOn])

  useRevealObserver(motionOn)

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

function useMotionPreference() {
  const [on, setOn] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setOn(!query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return on
}

function useRevealObserver(motionOn) {
  const { pathname } = useLocation()
  const observerRef = useRef(null)

  useEffect(() => {
    const root = document.getElementById('root')
    const reveal = (el) => el.classList.add('is-in')

    if (!motionOn || !('IntersectionObserver' in window)) {
      root.querySelectorAll('.reveal, .reveal-media').forEach(reveal)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    observerRef.current = io

    const scan = () => root.querySelectorAll('.reveal:not(.is-in), .reveal-media:not(.is-in)').forEach((el) => io.observe(el))
    scan()
    // Nuevos nodos (cambio de ruta, filtros de galería) entran al observador automáticamente.
    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [motionOn, pathname])
}
