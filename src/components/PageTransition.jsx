import { motion, useReducedMotion } from 'framer-motion'

/** Wraps each route so navigation cross-fades instead of snapping. */
export default function PageTransition({ children }) {
  const reduce = useReducedMotion()

  if (reduce) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
