import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import Img from './Img'
import { LAYERS } from '../lib/site'

/**
 * "One multispectral flight, five layers deep".
 *
 * An exploded stack of the five derived products from a single capture.
 * Hovering or focusing a row lifts the matching plate forward, so the
 * relationship between the list and the stack is legible without a caption.
 *
 * The plates are the same aerial frame under the gradient-map filters defined
 * in DataFrame.jsx — one flight, five renderings, which is precisely the point
 * the section is making.
 */

const BASE = 'photo-1497436072909-60f360e1d4b1'

const PLATE_FILTER = {
  ortho: 'saturate(1.05)',
  ndvi: 'url(#ramp-ndvi)',
  dem: 'url(#ramp-elevation)',
  thermal: 'url(#ramp-thermal)',
  cloud: 'url(#ramp-lidar)',
}

export default function LayerStack() {
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {/* ---------- The stack ---------- */}
      <div
        className="relative mx-auto aspect-square w-full max-w-[30rem]"
        style={{ perspective: '1400px' }}
      >
        {LAYERS.map((layer, i) => {
          const isActive = active === layer.id
          const depth = LAYERS.length - 1 - i

          return (
            <motion.div
              key={layer.id}
              className="absolute left-1/2 top-1/2 w-[76%] origin-center"
              style={{ zIndex: i + 1 }}
              initial={false}
              animate={
                reduce
                  ? { opacity: 1 }
                  : {
                      // Isometric stack: each plate sits further back and lower.
                      x: '-50%',
                      y: `calc(-50% + ${(i - 2) * 58}px)`,
                      rotateX: 52,
                      rotateZ: -42,
                      translateZ: isActive ? depth * 18 + 70 : depth * 18,
                      scale: isActive ? 1.06 : 1,
                    }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative overflow-hidden rounded-[3px] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.95)] transition-[box-shadow,border-color] duration-500"
                style={{
                  border: `1px solid ${isActive ? 'rgb(255 255 255 / 0.5)' : 'rgb(255 255 255 / 0.14)'}`,
                }}
              >
                <Img
                  id={BASE}
                  alt=""
                  aria-hidden="true"
                  width={560}
                  height={560}
                  sizes="(min-width: 1024px) 24vw, 60vw"
                  className="aspect-square w-full object-cover"
                  style={{ filter: PLATE_FILTER[layer.id] }}
                />
                {/* Point cloud reads as geometry, not imagery — dot it. */}
                {layer.id === 'cloud' && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        'radial-gradient(rgb(255 255 255 / 0.55) 0.6px, transparent 0.7px)',
                      backgroundSize: '5px 5px',
                      mixBlendMode: 'overlay',
                    }}
                    aria-hidden="true"
                  />
                )}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: isActive
                      ? 'linear-gradient(180deg, rgb(255 255 255 / 0.1), transparent)'
                      : 'linear-gradient(180deg, transparent, rgb(10 10 12 / 0.34))',
                  }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ---------- The legend ---------- */}
      <ul className="flex flex-col">
        {LAYERS.map((layer, i) => {
          const isActive = active === layer.id

          return (
            <li key={layer.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(layer.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(layer.id)}
                onBlur={() => setActive(null)}
                aria-describedby={`layer-note-${layer.id}`}
                className={`flex w-full items-baseline gap-4 border-b border-line py-5 text-left transition-colors duration-300 ${
                  isActive ? 'border-white/25' : ''
                }`}
              >
                <span className="font-mono text-[0.72rem] tabular text-chalk-mute">
                  0{i + 1}
                </span>

                <span className="flex-1">
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full transition-transform duration-300"
                      style={{
                        background: `var(${layer.colorVar})`,
                        transform: isActive ? 'scale(1.5)' : 'scale(1)',
                      }}
                      aria-hidden="true"
                    />
                    <span
                      className={`display-sub !text-[1.35rem] transition-colors duration-300 ${
                        isActive ? 'text-chalk' : 'text-chalk-soft'
                      }`}
                    >
                      {layer.name}
                    </span>
                  </span>
                  <span
                    id={`layer-note-${layer.id}`}
                    className="mt-1.5 block pl-[1.25rem] text-[0.92rem] text-chalk-mute"
                  >
                    {layer.note}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
