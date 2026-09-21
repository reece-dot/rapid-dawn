import { Link } from 'react-router-dom'

import Reveal from './Reveal'
import Icon from './Icon'
import { BUSINESS } from '../lib/site'

/** Closing call to action, shared by every page. */
export default function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="bloom pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="shell section relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">Start here</span>

          <h2 className="display-section mt-6 text-chalk">
            Send the location and what you need to know.
          </h2>

          <p className="lede mx-auto mt-6 max-w-xl">
            You get a plan, a price and a timeline — {BUSINESS.responseTime}.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn btn-primary w-full sm:w-auto">
              Get a quote
              <Icon name="arrow" size={17} />
            </Link>
            <a href={BUSINESS.emailHref} className="btn btn-ghost w-full sm:w-auto">
              <Icon name="mail" size={17} />
              {BUSINESS.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
