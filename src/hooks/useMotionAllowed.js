import { useEffect, useState } from 'react'

// Medios en movimiento (video) solo sin `prefers-reduced-motion` y sin modo de ahorro de datos.
export default function useMotionAllowed() {
  const [allowed, setAllowed] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAllowed(!query.matches && !navigator.connection?.saveData)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return allowed
}
