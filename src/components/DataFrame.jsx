import Img from './Img'

/**
 * Sample-deliverable viewer.
 *
 * There is no honest stock photography of NDVI or radiometric thermal output,
 * so rather than mislabel a sunset as a heat map we derive the false-colour
 * ourselves: each image is desaturated and then run through an SVG
 * feComponentTransfer gradient map — the same channel remapping a GIS package
 * applies when it symbolises a single-band raster. The geometry underneath is
 * real aerial photography; only the palette is synthesised.
 *
 * <FilterDefs /> must be mounted once per page that uses `treatment`.
 */

/** Discrete colour ramps, sampled low → high. */
const RAMPS = {
  ndvi: {
    r: [0.42, 0.78, 0.96, 0.72, 0.28, 0.06],
    g: [0.14, 0.34, 0.86, 0.9, 0.7, 0.42],
    b: [0.12, 0.1, 0.26, 0.2, 0.22, 0.16],
  },
  thermal: {
    r: [0.02, 0.18, 0.58, 0.92, 1, 1],
    g: [0.01, 0.03, 0.1, 0.46, 0.86, 1],
    b: [0.12, 0.38, 0.46, 0.18, 0.1, 0.88],
  },
  elevation: {
    r: [0.06, 0.14, 0.55, 0.86, 0.74, 1],
    g: [0.18, 0.58, 0.82, 0.7, 0.5, 1],
    b: [0.56, 0.46, 0.3, 0.26, 0.42, 1],
  },
  lidar: {
    r: [0.04, 0.16, 0.3, 0.55, 0.78, 0.95],
    g: [0.06, 0.2, 0.55, 0.85, 0.95, 1],
    b: [0.2, 0.62, 0.86, 0.8, 0.7, 0.98],
  },
}

/** One <filter> per ramp. Rendered once, referenced by CSS `filter: url(#…)`. */
export function FilterDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        {Object.entries(RAMPS).map(([name, ramp]) => (
          <filter key={name} id={`ramp-${name}`} colorInterpolationFilters="sRGB">
            {/* Collapse to luminance, then remap that single band through the ramp. */}
            <feColorMatrix
              type="matrix"
              values="0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0      0      0      1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={ramp.r.join(' ')} />
              <feFuncG type="table" tableValues={ramp.g.join(' ')} />
              <feFuncB type="table" tableValues={ramp.b.join(' ')} />
            </feComponentTransfer>
          </filter>
        ))}
      </defs>
    </svg>
  )
}

/** Small legend strip showing the ramp this frame was symbolised with. */
function RampLegend({ treatment, low, high }) {
  const ramp = RAMPS[treatment]
  if (!ramp) return null

  const stops = ramp.r.map((_, i) => {
    const c = [ramp.r[i], ramp.g[i], ramp.b[i]].map((v) => Math.round(v * 255))
    return `rgb(${c[0]} ${c[1]} ${c[2]})`
  })

  return (
    <div className="mt-3 flex items-center gap-2.5">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-chalk-mute">
        {low}
      </span>
      <span
        className="h-1.5 flex-1 rounded-full"
        style={{ background: `linear-gradient(90deg, ${stops.join(', ')})` }}
      />
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-chalk-mute">
        {high}
      </span>
    </div>
  )
}

export default function DataFrame({
  id,
  alt,
  label,
  caption,
  treatment,
  legend,
  width = 900,
  height = 640,
  sizes = '(min-width: 1024px) 45vw, 100vw',
  className = '',
  children,
}) {
  return (
    <figure className={`panel group ${className}`}>
      <div className="relative overflow-hidden">
        <Img
          id={id}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="aspect-[7/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          style={treatment ? { filter: `url(#ramp-${treatment}) contrast(1.06)` } : undefined}
        />

        {/* Scan-grid overlay: reads as an analysis viewport rather than a photo. */}
        <div
          className="grid-bg pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"
          aria-hidden="true"
        />

        {label && (
          <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-void/70 px-3 py-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-chalk backdrop-blur-sm">
            {label}
          </span>
        )}

        {children}
      </div>

      {(caption || legend) && (
        <figcaption className="border-t border-line px-5 py-4">
          {caption && <p className="text-[0.92rem] leading-relaxed text-chalk-soft">{caption}</p>}
          {legend && <RampLegend treatment={treatment} low={legend[0]} high={legend[1]} />}
        </figcaption>
      )}
    </figure>
  )
}
