import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import Logo from './Logo'
import Icon from './Icon'
import { NAV_LINKS } from '../lib/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()

  // Opaque/blurred once the page has moved at all, transparent over the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname])

  // Lock body scroll behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Escape closes the drawer.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-void/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
      style={{ height: 'var(--nav-h)' }}
    >
      <nav className="shell flex h-full items-center justify-between" aria-label="Primary">
        <Link to="/" aria-label="Rapid Dawn — home" className="relative z-10">
          <Logo gradientId="rd-nav" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-[0.94rem] font-medium transition-colors duration-200 ${
                  isActive ? 'text-chalk' : 'text-chalk-soft hover:text-chalk'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId={reduce ? undefined : 'nav-pill'}
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <Link to="/contact" className="btn btn-primary ml-3 !px-5 !py-2.5 !text-[0.9rem]">
            Get a quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-chalk transition-colors hover:bg-white/5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full border-b border-line bg-void/97 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex flex-col gap-1 py-5">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 font-display text-xl tracking-[-0.03em] transition-colors ${
                      isActive ? 'text-chalk' : 'text-chalk-soft'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/contact" className="btn btn-primary mt-3 w-full">
                Get a quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
