import { Link } from 'react-router-dom'

import Seo from '../components/Seo'
import PageTransition from '../components/PageTransition'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <PageTransition>
      <Seo
        title="Page not found | Rapid Dawn"
        description="That page does not exist. Head back to the Rapid Dawn home page or get in touch about a survey."
        path="/404"
        noindex
      />

      <section className="relative flex min-h-[86svh] items-center overflow-hidden">
        <div className="bloom pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="shell relative text-center">
          <span className="eyebrow justify-center">Error 404</span>

          <h1 className="display-hero mt-6 text-chalk">
            Off the <span className="grad-text">flight plan</span>.
          </h1>

          <p className="lede mx-auto mt-6 max-w-md">
            That page is not in our coverage area. Let us get you back onto surveyed ground.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn btn-primary">
              Back to home
              <Icon name="arrow" size={17} />
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get a quote
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
