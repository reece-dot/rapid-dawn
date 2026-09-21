import { CLIENTS } from '../lib/site'
import { RevealGroup, RevealItem } from './Reveal'

/**
 * Trust strip. The client brief supplies names but no artwork, so each logo is
 * set as a typographic lockup rather than a fabricated mark — muted by
 * default, with the gradient revealed on hover. Swap for supplied SVGs when
 * the client provides them. [PLACEHOLDER — awaiting client logo files]
 */
export default function ClientBar({ heading = 'Trusted by teams who need the number to hold up' }) {
  return (
    <section className="border-y border-line bg-void-2/60 py-14">
      <div className="shell">
        <p className="text-center font-mono text-[0.72rem] uppercase tracking-[0.2em] text-chalk-mute">
          {heading}
        </p>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6"
        >
          {CLIENTS.map((client) => (
            <RevealItem as="li" key={client.name} y={16} className="group flex justify-center">
              <span className="flex flex-col items-center gap-2 text-center">
                <span
                  className="font-display text-[1.45rem] font-semibold tracking-[-0.03em] text-chalk-mute transition-all duration-400 group-hover:[background:var(--rd-gradient)] group-hover:bg-clip-text group-hover:text-transparent"
                >
                  {client.mark}
                </span>
                <span className="text-[0.76rem] leading-tight text-chalk-mute/70 transition-colors duration-400 group-hover:text-chalk-soft">
                  {client.name}
                </span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
