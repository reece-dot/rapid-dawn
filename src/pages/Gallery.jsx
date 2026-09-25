import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import CtaSection from '../components/CtaSection'
import Icon from '../components/Icon'
import { cloud, cloudSet } from '../lib/images'
import { GALLERY, GALLERY_RATIO, SITE_URL } from '../lib/site'

const EASE = [0.22, 1, 0.36, 1]

/** The frame caps at 900px, so 1800 covers a 2× display. */
const WIDTHS = [900, 1200, 1800]
const SIZES = '(min-width: 768px) min(70vw, 900px), 92vw'

/** Outgoing and incoming slides travel together — a real carousel, not a cut. */
const slide = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-100%' }),
  center: { x: '0%' },
  exit: (d) => ({ x: d > 0 ? '-100%' : '100%' }),
}

/** Reduced-motion fallback: no travel, just a fade. */
const crossfade = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Tags are stored as "<Sensor> · <Service category>" — the sensor reads as the
 * label and the category as the heading. Falls back to sensor-only if a tag
 * ever arrives without a separator, rather than rendering an empty heading.
 */
function splitTag(tag) {
  const [sensor, ...rest] = tag.split('·')
  return { sensor: sensor.trim(), title: rest.join('·').trim() }
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Survey gallery | Rapid Dawn',
  url: `${SITE_URL}/gallery`,
  // Only one frame is in the DOM at a time, so this stays the crawlable
  // record of the full set.
  associatedMedia: GALLERY.map((item) => ({
    '@type': 'ImageObject',
    contentUrl: cloud(item.id, item.version, 1600),
    caption: item.caption,
    description: item.alt,
  })),
}

export default function Gallery() {
  // GALLERY[0] is the thermal citrus frame, which is the intended landing image.
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduce = useReducedMotion()

  const item = GALLERY[index]
  const { sensor, title } = splitTag(item.tag)
  const count = GALLERY.length

  // Wraps both ways, so neither arrow is ever a dead control.
  const step = (d) => {
    setDirection(d)
    setIndex((i) => (i + d + count) % count)
  }

  // Arrow keys drive the carousel. There is no modal and no form on this
  // route, so a window listener cannot steal keys from anything else.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  // Warm both neighbours so stepping never flashes an empty frame.
  useEffect(() => {
    for (const offset of [-1, 1]) {
      const neighbour = GALLERY[(index + offset + count) % count]
      const pre = new Image()
      pre.sizes = SIZES
      pre.srcset = cloudSet(neighbour.id, neighbour.version, WIDTHS)
      pre.src = cloud(neighbour.id, neighbour.version, 1200)
    }
  }, [index, count])

  const variants = reduce ? crossfade : slide

  return (
    <PageTransition>
      <Seo
        title="Survey Gallery — Thermal, NDVI, LiDAR & Multispectral | Rapid Dawn"
        description="Real deliverables from Rapid Dawn surveys: thermal orchard imagery, NDVI canopy maps, bare-earth LiDAR of mine sites, contour plans, canopy height models and multispectral analysis."
        path="/gallery"
        schema={schema}
      />

      <PageHeader
        eyebrow="Gallery"
        title="Flights we have flown, data we have delivered"
        lede="Output from live surveys across agriculture, forestry and mining. Every frame here came off a real flight for a real client — step through them to see what each one was used to answer."
      />

      <section className="section">
        <Reveal
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="Survey gallery"
        >
          {/* ---------- Frame ---------- */}
          <div className="relative mx-auto w-[92vw] md:w-[min(70vw,900px)]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line bg-void-2">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={item.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: EASE }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${count}`}
                  className="absolute inset-0"
                >
                  <img
                    src={cloud(item.id, item.version, 1200)}
                    srcSet={cloudSet(item.id, item.version, WIDTHS)}
                    sizes={SIZES}
                    alt={item.alt}
                    width={GALLERY_RATIO.width}
                    height={GALLERY_RATIO.height}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <ArrowButton side="prev" onClick={() => step(-1)} />
            <ArrowButton side="next" onClick={() => step(1)} />
          </div>

          {/* ---------- Counter + caption ---------- */}
          <div aria-live="polite" className="mx-auto mt-8 w-[92vw] md:w-[min(70vw,900px)]">
            <p className="tabular text-center font-mono text-[0.72rem] tracking-[0.18em] text-chalk-mute">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>

            {/* Fixed floor so the shortest caption does not shrink the page. */}
            <div className="mt-5 min-h-[11.5rem] sm:min-h-[9.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="text-center"
                >
                  <span
                    className="font-mono text-[0.7rem] uppercase tracking-[0.18em]"
                    style={{ color: 'var(--rd-gallery)' }}
                  >
                    {sensor}
                  </span>

                  {title && (
                    <h2 className="mt-3 font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em] text-chalk">
                      {title}
                    </h2>
                  )}

                  <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-chalk-soft">
                    {item.caption}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </PageTransition>
  )
}

/**
 * Prev/next control. The icon set carries only a right-pointing arrow, so prev
 * rotates it. The buttons straddle the frame edge on narrow screens and sit
 * clear of it from md up, where there is room in the gutter.
 */
function ArrowButton({ side, onClick }) {
  const isPrev = side === 'prev'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous image' : 'Next image'}
      className={`absolute top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-void/80 text-chalk backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 ${
        isPrev
          ? 'left-2 md:left-0 md:-translate-x-[150%]'
          : 'right-2 md:right-0 md:translate-x-[150%]'
      }`}
    >
      <Icon name="arrow" size={20} className={isPrev ? 'rotate-180' : ''} />
    </button>
  )
}
