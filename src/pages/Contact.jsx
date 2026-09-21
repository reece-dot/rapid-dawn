import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { BUSINESS, ENQUIRY_TYPES, PROCESS, SITE_URL } from '../lib/site'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Rapid Dawn',
  url: `${SITE_URL}/contact`,
  mainEntity: {
    '@id': `${SITE_URL}/#business`,
  },
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Only the fields we genuinely need to quote are required. */
function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please tell us your name.'

  if (!values.email.trim()) errors.email = 'We need an email address to send the quote to.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'That email address looks incomplete.'

  if (!values.location.trim())
    errors.location = 'A location — even just the nearest town — lets us check airspace.'

  if (!values.need) errors.need = 'Pick the closest match, or "Not sure yet".'

  return errors
}

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  location: '',
  need: '',
  message: '',
}

/** Visual order of the fields, so we can focus the first failing one. */
const FIELD_ORDER = ['name', 'email', 'phone', 'location', 'need', 'message']

function SuccessPanel({ onReset, name }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="panel grad-border p-10 text-center md:p-14"
      role="status"
      aria-live="polite"
    >
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan">
        <Icon name="check" size={26} />
      </span>

      <h2 className="display-sub mt-7 text-chalk">
        Thanks{name ? `, ${name.split(' ')[0]}` : ''} — enquiry received.
      </h2>

      <p className="lede mx-auto mt-4 max-w-md text-[1rem]">
        We will come back with a plan, a price and a timeline — {BUSINESS.responseTime}.
      </p>

      <p className="mx-auto mt-6 max-w-md text-[0.85rem] leading-relaxed text-chalk-mute">
        [DEMO] This is a front-end demonstration — the form does not yet submit anywhere. Connect it
        to the client's inbox or CRM before launch.
      </p>

      <button type="button" onClick={onReset} className="btn btn-ghost mt-8">
        Send another enquiry
      </button>
    </motion.div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef(null)

  const update = (field) => (e) => {
    const { value } = e.target
    setValues((v) => ({ ...v, [field]: value }))
    // Clear an error as soon as the visitor starts fixing it.
    if (submitted) setErrors((prev) => validate({ ...values, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users are
      // not left guessing what failed. We resolve the target from FIELD_ORDER
      // rather than querying [aria-invalid] — React has not re-rendered yet at
      // this point, so that attribute is not in the DOM until after paint.
      const firstInvalid = FIELD_ORDER.find((field) => found[field])
      if (firstInvalid) {
        requestAnimationFrame(() => {
          formRef.current?.querySelector(`#${firstInvalid}`)?.focus()
        })
      }
      return
    }

    setSent(true)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(false)
    setSent(false)
  }

  const fieldProps = (field) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? 'true' : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    className: 'field',
  })

  return (
    <PageTransition>
      <Seo
        title="Contact | Get a Plan, a Price and a Timeline | Rapid Dawn"
        description="Send the location and what you need to know. You get a plan, a price and a timeline — usually the same day. Drone and aerial survey enquiries across South Africa."
        path="/contact"
        schema={schema}
      />

      <PageHeader
        eyebrow="Contact"
        title="Send the location and what you need to know"
        lede={`You get a plan, a price and a timeline — ${BUSINESS.responseTime}.`}
      />

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Form ---------- */}
          <div className="lg:col-span-7">
            {sent ? (
              <SuccessPanel onReset={reset} name={values.name} />
            ) : (
              <Reveal>
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="panel p-7 md:p-10">
                  <h2 className="display-sub !text-[1.5rem] text-chalk">Enquiry</h2>
                  <p className="mt-2 text-[0.92rem] text-chalk-soft">
                    The more you can tell us about the site, the sharper the quote.
                  </p>

                  <div className="mt-9 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="field-label">
                        Name <span className="text-cyan">*</span>
                      </label>
                      <input type="text" autoComplete="name" {...fieldProps('name')} />
                      {errors.name && (
                        <span id="name-error" className="field-error" role="alert">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="field-label">
                        Email <span className="text-cyan">*</span>
                      </label>
                      <input type="email" autoComplete="email" {...fieldProps('email')} />
                      {errors.email && (
                        <span id="email-error" className="field-error" role="alert">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="field-label">
                        Phone
                      </label>
                      <input type="tel" autoComplete="tel" {...fieldProps('phone')} />
                    </div>

                    <div>
                      <label htmlFor="location" className="field-label">
                        Site location <span className="text-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Town, region or coordinates"
                        {...fieldProps('location')}
                      />
                      {errors.location && (
                        <span id="location-error" className="field-error" role="alert">
                          {errors.location}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="need" className="field-label">
                        What do you need mapped? <span className="text-cyan">*</span>
                      </label>
                      <select {...fieldProps('need')}>
                        <option value="">Select the closest match…</option>
                        {ENQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.need && (
                        <span id="need-error" className="field-error" role="alert">
                          {errors.need}
                        </span>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="field-label">
                        Anything else
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Site size, access, deadlines, what the output feeds into…"
                        {...fieldProps('message')}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary mt-9 w-full sm:w-auto">
                    Send enquiry
                    <Icon name="arrow" size={17} />
                  </button>

                  <p className="mt-5 text-[0.8rem] leading-relaxed text-chalk-mute">
                    Fields marked <span className="text-cyan">*</span> are required. We use your
                    details to answer this enquiry and nothing else.
                  </p>
                </form>
              </Reveal>
            )}
          </div>

          {/* ---------- Aside ---------- */}
          <aside className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="panel p-7 md:p-8">
                <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-chalk-mute">
                  Direct
                </h2>

                <div className="mt-6 flex flex-col gap-4">
                  <a
                    href={BUSINESS.emailHref}
                    className="group flex items-start gap-3.5 text-chalk-soft transition-colors hover:text-chalk"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-cyan">
                      <Icon name="mail" size={17} />
                    </span>
                    <span>
                      <span className="block text-[0.95rem]">{BUSINESS.email}</span>
                      <span className="block text-[0.8rem] text-chalk-mute">Email</span>
                    </span>
                  </a>

                  <a
                    href={BUSINESS.phoneHref}
                    className="group flex items-start gap-3.5 text-chalk-soft transition-colors hover:text-chalk"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-cyan">
                      <Icon name="phone" size={17} />
                    </span>
                    <span>
                      <span className="block text-[0.95rem]">{BUSINESS.phoneDisplay}</span>
                      <span className="block text-[0.8rem] text-chalk-mute">Phone</span>
                    </span>
                  </a>

                  <div className="flex items-start gap-3.5 text-chalk-soft">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-cyan">
                      <Icon name="pin" size={17} />
                    </span>
                    <span>
                      <span className="block text-[0.95rem]">{BUSINESS.region}</span>
                      <span className="block text-[0.8rem] text-chalk-mute">Coverage</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5 text-chalk-soft">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.03] text-cyan">
                      <Icon name="clock" size={17} />
                    </span>
                    <span>
                      <span className="block text-[0.95rem]">{BUSINESS.turnaround}</span>
                      <span className="block text-[0.8rem] text-chalk-mute">Typical turnaround</span>
                    </span>
                  </div>
                </div>

                <p className="mt-7 rounded-lg border border-line bg-white/[0.02] px-4 py-3 text-[0.78rem] leading-relaxed text-chalk-mute">
                  [PLACEHOLDER — confirm with client] Email address and phone number above are
                  demo values.
                </p>
              </div>
            </Reveal>

            {/* What happens next */}
            <Reveal delay={0.18}>
              <div className="panel mt-5 p-7 md:p-8">
                <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-chalk-mute">
                  What happens next
                </h2>

                <ol className="mt-6 flex flex-col">
                  {PROCESS.map((step, i) => (
                    <li
                      key={step.step}
                      className="flex gap-4 border-b border-line pb-5 pt-5 first:pt-0 last:border-0 last:pb-0"
                    >
                      <span className="font-mono text-[0.72rem] tabular text-cyan">{step.step}</span>
                      <span>
                        <span className="block font-display text-[1rem] font-semibold tracking-[-0.03em] text-chalk">
                          {step.name}
                        </span>
                        {i === 0 && (
                          <span className="mt-1 block text-[0.86rem] leading-relaxed text-chalk-mute">
                            Starts with your enquiry — usually answered the same day.
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </PageTransition>
  )
}
