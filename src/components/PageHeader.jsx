import Reveal from './Reveal'

/** Inner-page masthead. Sits below the fixed navbar on every route but Home. */
export default function PageHeader({ eyebrow, title, lede, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bloom pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="shell relative pb-16 pt-[calc(var(--nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--nav-h)+7rem)]">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display-section mt-6 max-w-4xl text-chalk">{title}</h1>
          {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
