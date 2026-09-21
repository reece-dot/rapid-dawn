import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ClientBar from '../components/ClientBar'
import CtaSection from '../components/CtaSection'
import LayerStack from '../components/LayerStack'
import { FilterDefs } from '../components/DataFrame'
import Icon from '../components/Icon'
import { HERO, img, widthSet } from '../lib/images'
import { SERVICES, PROCESS, TRUST_POINTS, SITE_URL, BUSINESS } from '../lib/site'

const EASE = [0.22, 1, 0.36, 1]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: 'Rapid Dawn | Drone & Aerial Survey',
  description: BUSINESS.tagline,
  isPartOf: { '@id': `${SITE_URL}/#business` },
}

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden">
      {/* Full-bleed aerial plate */}
      <img
        src={img(HERO.id, 1900, Math.round(1900 / HERO.ratio), 72)}
        srcSet={widthSet(HERO.id, HERO.widths, HERO.ratio, 72)}
        sizes="100vw"
        alt={HERO.alt}
        width={1900}
        height={Math.round(1900 / HERO.ratio)}
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Scrims: the plate is bright, the brand is not. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-void via-void/72 to-void/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/25 to-transparent"
        aria-hidden="true"
      />
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="shell relative z-10 pb-20 pt-[calc(var(--nav-h)+5rem)] md:pb-28">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="max-w-4xl"
        >
          <span className="eyebrow">Drone &amp; aerial survey</span>

          <h1 className="display-hero mt-7 text-chalk">
            Maps you can <span className="grad-text">act on</span>.
          </h1>

          <p className="lede mt-7 max-w-xl text-[1.05rem] md:text-[1.15rem]">
            {BUSINESS.tagline} Terrain, vegetation, elevation and heat — captured from the air and
            returned as measurements your team can make decisions against.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn btn-primary">
              Get a quote
              <Icon name="arrow" size={17} />
            </Link>
            <Link to="/work" className="btn btn-ghost">
              See our work
            </Link>
          </div>

          {/* Credibility strip */}
          <ul className="mt-14 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {TRUST_POINTS.map((point, i) => (
              <motion.li
                key={point}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.09, ease: EASE }}
                className="flex items-center gap-2.5 text-[0.9rem] text-chalk-soft"
              >
                <Icon name="check" size={15} className="shrink-0 text-cyan" />
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title="Rapid Dawn | Drone & Aerial Survey, Mapping & Analysis"
        description="We fly your ground. You get maps you can act on. Terrain modelling, volumetrics, crop health indices, topographic survey, photogrammetry and radiometric thermal — delivered usually under a week."
        path="/"
        imageAlt={HERO.alt}
        schema={schema}
      />

      <FilterDefs />
      <Hero />
      <ClientBar />

      {/* ---------- Capabilities ---------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="Seven ways we turn flights into answers"
            lede="Every survey starts with a question — how much, how high, how healthy, how hot. The flight is designed backwards from whichever one is yours."
          />

          {/*
            Seven cards in a three-column grid would leave a lone orphan on the
            last row. The seventh service — processing imagery you captured
            yourself — is the one that genuinely differs in kind, so it takes
            the full width and reads as a footnote to the six above it.
          */}
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const wide = i === SERVICES.length - 1

              return (
                <RevealItem key={service.slug} className={wide ? 'sm:col-span-2 lg:col-span-3' : ''}>
                  <Link
                    to={`/services#${service.slug}`}
                    className={`card h-full p-7 focus-visible:outline-offset-4 ${
                      wide ? 'sm:flex-row sm:items-center sm:gap-8 md:p-9' : ''
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-cyan">
                      <Icon name={service.icon} size={21} />
                    </span>

                    <span className={wide ? 'sm:flex-1' : 'contents'}>
                      <h3
                        className={`font-display text-[1.22rem] font-semibold tracking-[-0.03em] text-chalk ${
                          wide ? 'mt-5 sm:mt-0' : 'mt-6'
                        }`}
                      >
                        {service.name}
                      </h3>
                      <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.13em] text-chalk-mute">
                        {service.short}
                      </p>

                      <p
                        className={`mt-4 text-[0.94rem] leading-relaxed text-chalk-soft ${
                          wide ? 'max-w-2xl' : 'flex-1'
                        }`}
                      >
                        {service.description.split('. ')[0]}.
                      </p>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-cyan ${
                        wide ? 'mt-5 shrink-0 sm:mt-0' : 'mt-6'
                      }`}
                    >
                      Read more
                      <Icon name="arrow" size={14} />
                    </span>
                  </Link>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- Layer stack ---------- */}
      <section className="section border-y border-line bg-void-2/50">
        <div className="shell">
          <SectionHeading
            eyebrow="One flight, five products"
            title="One multispectral flight, five layers deep"
            lede="A single capture resolves into five separate deliverables. You mobilise once; the site gives up its geometry, its vegetation, its elevation and its heat in the same pass."
            maxW="max-w-3xl"
          />

          <div className="mt-16">
            <LayerStack />
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section">
        <div className="shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Process"
              title="Four steps, usually under a week"
              className="!max-w-xl"
            />
            <Reveal delay={0.1}>
              <Link to="/work" className="btn btn-ghost">
                See sample deliverables
                <Icon name="arrow" size={16} />
              </Link>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step) => (
              <RevealItem key={step.step} className="bg-void p-8">
                <span className="font-mono text-[0.78rem] tabular text-cyan">{step.step}</span>
                <h3 className="mt-5 font-display text-[1.18rem] font-semibold tracking-[-0.03em] text-chalk">
                  {step.name}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-chalk-soft">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection />
    </PageTransition>
  )
}
