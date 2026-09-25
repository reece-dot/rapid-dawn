import { useRef, useState } from 'react'

import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import { RevealGroup, RevealItem } from '../components/Reveal'
import CtaSection from '../components/CtaSection'
import Lightbox from '../components/Lightbox'
import { cloud, cloudSet } from '../lib/images'
import { GALLERY, GALLERY_RATIO, SITE_URL } from '../lib/site'

/** Thumbnail derivatives — four across a 80rem shell is roughly 300px. */
const THUMB_WIDTHS = [400, 600, 800]
const THUMB_SIZES = '(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Survey gallery | Rapid Dawn',
  url: `${SITE_URL}/gallery`,
  associatedMedia: GALLERY.map((item) => ({
    '@type': 'ImageObject',
    contentUrl: cloud(item.id, item.version, 1600),
    caption: item.caption,
    description: item.alt,
  })),
}

export default function Gallery() {
  // `index` doubles as the open/closed flag; null means the lightbox is shut.
  const [index, setIndex] = useState(null)
  const [direction, setDirection] = useState(1)
  const thumbRefs = useRef([])

  const openAt = (i) => {
    setDirection(1)
    setIndex(i)
  }

  // Hand focus back to the thumbnail that opened the lightbox — otherwise
  // dismissing it drops keyboard focus onto <body> and the visitor restarts
  // from the top of the page.
  const close = () => {
    const last = index
    setIndex(null)
    requestAnimationFrame(() => thumbRefs.current[last]?.focus())
  }

  // Wraps in both directions, so neither arrow is ever a dead control.
  const step = (d) => {
    setDirection(d)
    setIndex((i) => (i + d + GALLERY.length) % GALLERY.length)
  }

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
        lede="Output from live surveys across agriculture, forestry and mining. Every frame below came off a real flight for a real client — tap any one of them for the full picture and what it was used to answer."
      />

      <section className="section">
        <div className="shell">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((item, i) => (
              <RevealItem key={item.id}>
                <button
                  type="button"
                  ref={(el) => {
                    thumbRefs.current[i] = el
                  }}
                  onClick={() => openAt(i)}
                  aria-label={`View full size: ${item.tag}`}
                  className="card group h-full w-full cursor-pointer text-left"
                >
                  <img
                    src={cloud(item.id, item.version, 600)}
                    srcSet={cloudSet(item.id, item.version, THUMB_WIDTHS)}
                    sizes={THUMB_SIZES}
                    alt={item.alt}
                    width={GALLERY_RATIO.width}
                    height={GALLERY_RATIO.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full border-b border-line object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="p-5">
                    <span
                      className="font-mono text-[0.68rem] uppercase tracking-[0.16em]"
                      style={{ color: 'var(--rd-gallery)' }}
                    >
                      {item.tag}
                    </span>
                    <p className="mt-2.5 text-[0.88rem] leading-relaxed text-chalk-soft">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Lightbox
        items={GALLERY}
        index={index}
        direction={direction}
        onClose={close}
        onNext={() => step(1)}
        onPrev={() => step(-1)}
      />

      <CtaSection />
    </PageTransition>
  )
}
