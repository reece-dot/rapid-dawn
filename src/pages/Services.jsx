import { Link } from 'react-router-dom'

import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CtaSection from '../components/CtaSection'
import Img from '../components/Img'
import Icon from '../components/Icon'
import DataFrame, { FilterDefs } from '../components/DataFrame'
import { SERVICES, SENSORS, ENGAGEMENT, SITE_URL, BUSINESS } from '../lib/site'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Rapid Dawn survey services',
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.name,
      description: s.description,
      url: `${SITE_URL}/services#${s.slug}`,
      provider: { '@id': `${SITE_URL}/#business` },
    },
  })),
}

/** Sensor cards get the false-colour treatment that matches their band. */
const SENSOR_TREATMENT = {
  visible: null,
  nir: 'ndvi',
  thermal: 'thermal',
  lidar: 'lidar',
}

const SENSOR_LEGEND = {
  nir: ['Stressed', 'Vigorous'],
  thermal: ['Cool', 'Hot'],
  lidar: ['Low', 'High'],
}

export default function Services() {
  return (
    <PageTransition>
      <Seo
        title="Survey Services | Terrain, Crop Health, Thermal & Photogrammetry | Rapid Dawn"
        description="Seven ways we turn flights into answers: terrain modelling and volumetrics, crop and canopy health indices, topographic survey, photogrammetric models, radiometric thermal, satellite context and processing-only engagements."
        path="/services"
        schema={schema}
      />

      <FilterDefs />

      <PageHeader
        eyebrow="Services"
        title="Seven ways we turn flights into answers"
        lede="Each of these starts as the same thing — an aircraft over your site — and ends somewhere different. What separates them is the sensor on the mount and the question you need settled."
      />

      {/* ---------- Service detail ---------- */}
      <section className="section">
        <div className="shell flex flex-col gap-24 md:gap-32">
          {SERVICES.map((service, i) => {
            const flip = i % 2 === 1

            return (
              <article
                key={service.slug}
                id={service.slug}
                className="scroll-mt-32 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={flip ? 'lg:order-2' : ''}>
                  <div className="panel overflow-hidden">
                    <Img
                      id={service.image}
                      alt={service.alt}
                      width={900}
                      height={640}
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="aspect-[7/5] w-full object-cover"
                    />
                  </div>
                </Reveal>

                <Reveal delay={0.08} className={flip ? 'lg:order-1' : ''}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-cyan">
                    <Icon name={service.icon} size={21} />
                  </span>

                  <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-chalk-mute">
                    {String(i + 1).padStart(2, '0')} — {service.short}
                  </p>

                  <h2 className="display-sub mt-3 text-chalk">{service.name}</h2>

                  <p className="lede mt-5 text-[1rem]">{service.description}</p>

                  <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {service.outputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-center gap-2.5 text-[0.9rem] text-chalk-soft"
                      >
                        <Icon name="check" size={15} className="shrink-0 text-cyan" />
                        {output}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>

      {/* ---------- Sensors ---------- */}
      <section className="section border-t border-line bg-void-2/50">
        <div className="shell">
          <SectionHeading
            eyebrow="Sensors"
            title="Which sensor answers which question"
            lede="Four ways of seeing the same hectare. Choosing correctly is most of the job — the wrong band produces a beautiful dataset that answers nothing you asked."
            maxW="max-w-3xl"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {SENSORS.map((sensor, i) => (
              <Reveal key={sensor.id} delay={i * 0.06}>
                <div className="card h-full">
                  <DataFrame
                    id={sensor.image}
                    alt={sensor.alt}
                    label={sensor.band}
                    treatment={SENSOR_TREATMENT[sensor.id]}
                    width={800}
                    height={570}
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="!rounded-none !border-0 !border-b !border-line"
                  />

                  <div className="flex flex-1 flex-col p-7">
                    <span
                      className="font-mono text-[0.68rem] uppercase tracking-[0.16em]"
                      style={{ color: `var(${sensor.colorVar})` }}
                    >
                      {sensor.question}
                    </span>

                    <h3 className="mt-3 font-display text-[1.35rem] font-semibold tracking-[-0.03em] text-chalk">
                      {sensor.name}
                    </h3>

                    <p className="mt-3 flex-1 text-[0.94rem] leading-relaxed text-chalk-soft">
                      {sensor.description}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {sensor.uses.map((use) => (
                        <li
                          key={use}
                          className="rounded-full border border-line px-3 py-1 text-[0.78rem] text-chalk-mute"
                        >
                          {use}
                        </li>
                      ))}
                    </ul>

                    {SENSOR_LEGEND[sensor.id] && (
                      <p className="mt-5 border-t border-line pt-4 text-[0.76rem] leading-relaxed text-chalk-mute">
                        Sample rendering — false colour applied to illustrate the{' '}
                        {sensor.band} band.
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Engagement models ---------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Engagement"
            title="Two ways in, same deliverables"
            lede="Whether the aircraft is ours or yours, the processing chain and the output standard do not change."
            maxW="max-w-3xl"
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
            {ENGAGEMENT.map((model) => (
              <RevealItem key={model.id}>
                <div className="card h-full p-8 md:p-10">
                  <span className="inline-flex rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyan">
                    {model.label}
                  </span>

                  <h3 className="display-sub mt-6 !text-[1.5rem] text-chalk">{model.title}</h3>
                  <p className="mt-4 text-[0.96rem] leading-relaxed text-chalk-soft">{model.body}</p>

                  <ul className="mt-7 space-y-2.5">
                    {model.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-[0.9rem] text-chalk-soft">
                        <Icon name="check" size={15} className="shrink-0 text-cyan" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-10">
            <p className="text-[0.95rem] text-chalk-mute">
              Not sure which fits?{' '}
              <Link to="/contact" className="text-cyan underline-offset-4 hover:underline">
                Send us the site
              </Link>{' '}
              and we will tell you honestly — {BUSINESS.responseTime}.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </PageTransition>
  )
}
