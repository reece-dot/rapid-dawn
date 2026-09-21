import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CtaSection from '../components/CtaSection'
import DataFrame, { FilterDefs } from '../components/DataFrame'
import Img from '../components/Img'
import Icon from '../components/Icon'
import { DELIVERABLES, SENSORS, KIT, TEAM, SITE_URL } from '../lib/site'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Sample deliverables & equipment | Rapid Dawn',
  url: `${SITE_URL}/work`,
  about: DELIVERABLES.map((d) => ({ '@type': 'Thing', name: d.name })),
}

/**
 * Sample outputs. Each is real aerial photography rendered through the
 * gradient-map filter that matches the product it stands in for — labelled as
 * a sample rendering rather than passed off as a client deliverable.
 */
const SAMPLES = [
  {
    id: 'photo-1547036967-23d11aacaee0',
    alt: 'Turquoise coastline and sand photographed straight down from altitude',
    label: 'Orthomosaic',
    treatment: null,
    caption:
      'Geometrically corrected so distance on the image equals distance on the ground. Measure straight off it.',
  },
  {
    id: 'photo-1473773508845-188df298d2d1',
    alt: 'Conifer canopy from directly overhead, rendered as a vegetation index',
    label: 'NDVI index',
    treatment: 'ndvi',
    legend: ['Stressed', 'Vigorous'],
    caption:
      'Vegetation vigour across the block. The pale band through the centre is where you send the agronomist first.',
  },
  {
    id: 'photo-1504870712357-65ea720d6078',
    alt: 'Mountain ridgelines rendered as a false-colour elevation model',
    label: 'Elevation model',
    treatment: 'elevation',
    legend: ['Low', 'High'],
    caption:
      'A height value per cell — the basis for contours, slope, drainage and every volume we report.',
  },
  {
    id: 'photo-1497440001374-f26997328c1b',
    alt: 'Rows of solar panels rendered as a radiometric thermal image',
    label: 'Radiometric thermal',
    treatment: 'thermal',
    legend: ['Cool', 'Hot'],
    caption:
      'Every pixel carries a temperature. Anomalies get a number and a coordinate, not just an arrow.',
  },
  {
    id: 'photo-1590069261209-f8e9b8642343',
    alt: 'A triangulated wireframe lattice standing in for a dense point cloud',
    label: 'Point cloud',
    treatment: 'lidar',
    legend: ['Low', 'High'],
    caption:
      'Dense 3D geometry, height-coloured. Section it anywhere, or hand it straight to your engineer.',
  },
  {
    id: 'photo-1590496793929-36417d3117de',
    alt: 'Stacked shipping containers in a yard seen from directly above',
    label: 'Volumetric report',
    treatment: null,
    caption:
      'Stockpile and yard quantities with the method and tolerance stated, so the figure survives scrutiny.',
  },
]

export default function Work() {
  return (
    <PageTransition>
      <Seo
        title="Sample Deliverables, Sensors & Equipment | Rapid Dawn"
        description="What a Rapid Dawn survey actually returns: orthomosaics, NDVI index maps, elevation models, radiometric thermal, point clouds and volumetric reports — plus the sensors and aircraft behind them."
        path="/work"
        schema={schema}
      />

      <FilterDefs />

      <PageHeader
        eyebrow="Work"
        title="What you actually receive"
        lede="Not a folder of raw frames. Finished, symbolised, measurable products in the formats your team already opens — with the method behind each one stated plainly."
      />

      {/* ---------- Sample deliverables ---------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Sample outputs"
            title="Six products, one mobilisation"
            lede="Representative renderings of the deliverable set. Every one of these comes off the same flight over the same ground."
            maxW="max-w-3xl"
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SAMPLES.map((sample) => (
              <RevealItem key={sample.label}>
                <DataFrame
                  id={sample.id}
                  alt={sample.alt}
                  label={sample.label}
                  treatment={sample.treatment}
                  legend={sample.legend}
                  caption={sample.caption}
                  width={800}
                  height={570}
                  sizes="(min-width: 1024px) 31vw, (min-width: 768px) 46vw, 100vw"
                  className="h-full"
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-3xl text-[0.85rem] leading-relaxed text-chalk-mute">
              <span className="text-chalk-soft">A note on these images:</span> the geometry is real
              aerial photography. The false colour is applied by us to illustrate how each product
              is symbolised — they are demonstrations of format, not client data.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Deliverables list ---------- */}
      <section className="section border-t border-line bg-void-2/50">
        <div className="shell">
          <SectionHeading
            eyebrow="Deliverables"
            title="In the formats you already use"
            maxW="max-w-2xl"
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((item) => (
              <RevealItem key={item.name} className="bg-void p-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-cyan">
                  <Icon name={item.icon} size={19} />
                </span>
                <h3 className="mt-5 font-display text-[1.1rem] font-semibold tracking-[-0.03em] text-chalk">
                  {item.name}
                </h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-chalk-soft">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- Sensor comparison ---------- */}
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Sensor comparison"
            title="Which sensor answers which question"
            lede="The same hectare, read four different ways."
            maxW="max-w-2xl"
          />

          <Reveal className="mt-14 overflow-hidden rounded-2xl border border-line">
            {/* Scrolls horizontally on narrow screens rather than squashing. */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <caption className="sr-only">
                  Comparison of the four sensor types, the questions they answer and their typical uses
                </caption>
                <thead>
                  <tr className="border-b border-line bg-white/[0.02]">
                    {['Sensor', 'Band', 'Answers', 'Typical uses'].map((head) => (
                      <th
                        key={head}
                        scope="col"
                        className="px-6 py-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] font-medium text-chalk-mute"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SENSORS.map((sensor) => (
                    <tr key={sensor.id} className="border-b border-line last:border-0">
                      <th scope="row" className="px-6 py-5 align-top">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: `var(${sensor.colorVar})` }}
                            aria-hidden="true"
                          />
                          <span className="font-display text-[1rem] font-semibold tracking-[-0.03em] text-chalk">
                            {sensor.name}
                          </span>
                        </span>
                      </th>
                      <td className="px-6 py-5 align-top">
                        <span className="font-mono text-[0.76rem] text-chalk-mute">{sensor.band}</span>
                      </td>
                      <td className="px-6 py-5 align-top text-[0.92rem] text-chalk-soft">
                        {sensor.question}
                      </td>
                      <td className="px-6 py-5 align-top text-[0.92rem] text-chalk-soft">
                        {sensor.uses.join(' · ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Kit ---------- */}
      <section className="section border-t border-line bg-void-2/50">
        <div className="shell">
          <SectionHeading
            eyebrow="Equipment"
            title="Enterprise kit, because the data has to hold up"
            lede="A survey is only as defensible as the instrument that captured it. Everything we fly is professional-grade and calibrated — the boring prerequisite for a number you can put in front of a client."
            maxW="max-w-3xl"
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {KIT.map((item) => (
              <RevealItem key={item.name}>
                <div className="card h-full">
                  <Img
                    id={item.image}
                    alt={item.alt}
                    width={760}
                    height={540}
                    sizes="(min-width: 768px) 31vw, 100vw"
                    className="aspect-[7/5] w-full border-b border-line object-cover"
                  />
                  <div className="p-7">
                    <h3 className="font-display text-[1.14rem] font-semibold tracking-[-0.03em] text-chalk">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-chalk-soft">{item.body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-8">
            <p className="text-[0.85rem] text-chalk-mute">
              [PLACEHOLDER — confirm with client] Specific airframe and sensor models to be listed
              once confirmed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section className="section">
        <div className="shell">
          {TEAM.map((person) => (
            <div key={person.name} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-5">
                <div className="panel overflow-hidden">
                  <Img
                    id={person.image}
                    alt={person.alt}
                    width={800}
                    height={800}
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.08} className="lg:col-span-7">
                <span className="eyebrow">Team</span>

                <h2 className="display-section mt-6 !text-[clamp(30px,4vw,48px)] text-chalk">
                  {person.name}
                </h2>
                <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-chalk-mute">
                  {person.role}
                </p>

                <p className="display-sub mt-7 !text-[1.35rem] grad-text">{person.line}</p>

                <p className="lede mt-5 text-[1rem]">{person.body}</p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                  {person.credentials.map((credential) => (
                    <li
                      key={credential}
                      className="rounded-xl border border-line bg-white/[0.02] px-4 py-4"
                    >
                      <span className="flex items-center gap-2 text-cyan">
                        <Icon name="badge" size={17} />
                      </span>
                      <span className="mt-2.5 block text-[0.88rem] leading-snug text-chalk-soft">
                        {credential}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
    </PageTransition>
  )
}
