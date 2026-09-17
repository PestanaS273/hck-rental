import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

// Desplazamiento parallax suave para medios a sangre. `strength` en porcentaje de la altura del contenedor.
export default function Parallax({ children, strength = 12, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}%`, `${strength / 2}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ y: reduce ? 0 : y, top: `-${strength / 2}%`, bottom: `-${strength / 2}%` }}>
        {children}
      </motion.div>
    </div>
  )
}
