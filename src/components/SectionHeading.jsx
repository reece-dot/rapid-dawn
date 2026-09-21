import Reveal from './Reveal'

/**
 * Standard section header: eyebrow, display headline, optional lede.
 * `align` centres the block for full-width moments such as the final CTA.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  className = '',
  maxW = 'max-w-2xl',
}) {
  const centred = align === 'center'

  return (
    <Reveal className={`${centred ? `mx-auto text-center ${maxW}` : maxW} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="display-section mt-5 text-chalk">{title}</h2>
      {lede && <p className="lede mt-5">{lede}</p>}
    </Reveal>
  )
}
