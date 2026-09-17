import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

// Transición entre rutas: fundido suave con un leve desplazamiento vertical.
export default function PageTransition({ children, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 14 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease } }}
      exit={{ opacity: 0, y: reduce ? 0 : -8, transition: { duration: 0.35, ease } }}
      className={`page-wrapper ${className}`}
    >
      {children}
    </motion.div>
  )
}
