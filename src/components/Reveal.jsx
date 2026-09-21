import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Fade-up scroll reveal. Framer Motion's `whileInView` is backed by
 * IntersectionObserver, so this costs nothing on scroll.
 * When the visitor prefers reduced motion, content simply appears.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 26,
  duration = 0.65,
  amount = 0.25,
  once = true,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduce) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Staggers direct children of a list/grid. Pair with <RevealItem />. */
export function RevealGroup({
  children,
  as = 'div',
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduce) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function RevealItem({ children, as = 'div', y = 28, className = '', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduce) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
