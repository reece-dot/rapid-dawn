/**
 * Unsplash image helpers.
 *
 * Every URL asks the CDN for `fm=webp`, so all imagery ships as WebP
 * regardless of source format. Widths and heights are always explicit so the
 * browser can reserve layout space — no CLS.
 */

const CDN = 'https://images.unsplash.com/'

/**
 * @param {string} id  Unsplash photo id, e.g. "photo-1497436072909-60f360e1d4b1"
 * @param {number} w   Intrinsic width in px
 * @param {number} h   Intrinsic height in px
 * @param {number} [q] Quality, 1–100
 */
export function img(id, w, h, q = 72) {
  return `${CDN}${id}?auto=format&fit=crop&fm=webp&w=${w}&h=${h}&q=${q}`
}

/** Density-based srcset (1x/2x) for fixed-size art such as cards. */
export function srcSet(id, w, h, q = 72) {
  return `${img(id, w, h, q)} 1x, ${img(id, w * 2, h * 2, Math.max(50, q - 12))} 2x`
}

/** Width-based srcset for fluid, full-bleed art such as the hero. */
export function widthSet(id, widths, ratio, q = 72) {
  return widths.map((w) => `${img(id, w, Math.round(w / ratio), q)} ${w}w`).join(', ')
}

/** The hero is preloaded in index.html; keep both definitions in step. */
export const HERO = {
  id: 'photo-1497436072909-60f360e1d4b1',
  alt: 'Dense green forest meeting turquoise water, photographed straight down from a drone',
  ratio: 16 / 9,
  widths: [900, 1400, 1900, 2400],
}

/** Social card image — JPEG, because some scrapers still refuse WebP. */
export const OG_IMAGE = `${CDN}${HERO.id}?auto=format&fit=crop&fm=jpg&w=1200&h=630&q=76`
