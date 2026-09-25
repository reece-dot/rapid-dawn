import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import Icon from './Icon'
import { cloud, cloudSet } from '../lib/images'
import { GALLERY_RATIO } from '../lib/site'

const EASE = [0.22, 1, 0.36, 1]

/** Lightbox derivatives. The grid already holds a small one; start at 1200. */
const WIDTHS = [1200, 1600, 2400]
const SIZES = '(min-width: 1280px) 76vw, 92vw'

/** Directional slide — the image leaves the way the arrow pushed it. */
const slide = {
  enter: (d) => ({ opacity: 0, x: d > 0 ? 44 : -44 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d > 0 ? -44 : 44 }),
}

const fade = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Full-screen image viewer for the gallery.
 *
 * Controlled: `index` is null when closed, and the parent owns both the
 * current index and the direction of the last move (so the slide animation
 * knows which way to travel). The parent is also responsible for returning
 * focus to the thumbnail that opened it — it holds those refs.
 */
export default function Lightbox({ items, index, direction = 1, onClose, onNext, onPrev }) {
  const reduce = useReducedMotion()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)

  const open = index !== null
  const item = open ? items[index] : null

  // Escape closes, left/right navigate, Tab stays inside the dialog.
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
        return
      }
      if (e.key !== 'Tab') return

      // Focus trap: the dialog covers the page, so tabbing out of it would
      // land on controls the visitor cannot see.
      const focusable = dialogRef.current?.querySelectorAll('button')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, onNext, onPrev])

  // Lock the page behind the overlay.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Move focus into the dialog as it opens.
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  // Warm both neighbours so arrow navigation does not flash an empty frame.
  useEffect(() => {
    if (!open) return
    const n = items.length
    for (const step of [-1, 1]) {
      const neighbour = items[(index + step + n) % n]
      const pre = new Image()
      pre.sizes = SIZES
      pre.srcset = cloudSet(neighbour.id, neighbour.version, WIDTHS)
      pre.src = cloud(neighbour.id, neighbour.version, 1600)
    }
  }, [open, index, items])

  const variants = reduce ? fade : slide

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.tag} — gallery image ${index + 1} of ${items.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col backdrop-blur-xl"
          style={{ backgroundColor: 'color-mix(in srgb, var(--rd-gallery-ground) 97%, transparent)' }}
        >
          {/* ---------- Top bar ---------- */}
          <div className="shell flex shrink-0 items-center justify-between py-5">
            <p
              aria-live="polite"
              className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-chalk-mute tabular"
            >
              {index + 1} / {items.length}
            </p>

            <button
              ref={closeRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              aria-label="Close gallery"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-chalk transition-colors hover:bg-white/10"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          {/* ---------- Image + controls ---------- */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <ArrowButton
              side="prev"
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
            />

            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.figure
                key={item.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-full min-h-0 w-full max-w-6xl flex-col items-center"
              >
                <img
                  src={cloud(item.id, item.version, 1600)}
                  srcSet={cloudSet(item.id, item.version, WIDTHS)}
                  sizes={SIZES}
                  alt={item.alt}
                  width={GALLERY_RATIO.width}
                  height={GALLERY_RATIO.height}
                  decoding="async"
                  className="max-h-[62vh] w-auto max-w-full rounded-xl border border-line object-contain"
                />

                <figcaption className="mt-6 max-w-3xl text-center">
                  <span
                    className="font-mono text-[0.68rem] uppercase tracking-[0.16em]"
                    style={{ color: 'var(--rd-gallery)' }}
                  >
                    {item.tag}
                  </span>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-chalk-soft">
                    {item.caption}
                  </p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <ArrowButton
              side="next"
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
            />
          </div>

          <div className="h-6 shrink-0" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Prev/next control. The icon set only carries a right-pointing arrow, so the
 * previous button rotates it rather than introducing a second path.
 */
function ArrowButton({ side, onClick }) {
  const isPrev = side === 'prev'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/[0.06] text-chalk backdrop-blur-sm transition-colors hover:bg-white/[0.14] ${
        isPrev ? 'left-1 md:left-6' : 'right-1 md:right-6'
      }`}
    >
      <Icon name="arrow" size={20} className={isPrev ? 'rotate-180' : ''} />
    </button>
  )
}
