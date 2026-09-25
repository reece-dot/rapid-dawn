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

/* ------------------------------------------------------------------
   Cloudinary — client-supplied survey imagery for the gallery.

   Unsplash takes its transforms as a query string; Cloudinary takes them
   as a path segment, so these cannot go through img() above. Every source
   is 3840×2160, so a derivative is mandatory rather than an optimisation —
   the originals run to 2MB apiece.
------------------------------------------------------------------- */

const CLOUDINARY = 'https://res.cloudinary.com/i0es4bhq/image/upload'

/**
 * `f_auto` negotiates AVIF/WebP per browser, `q_auto` picks quality per image.
 *
 * @param {string} id      Cloudinary public id, e.g. "1000183701"
 * @param {number} version Asset version, e.g. 1790320747
 * @param {number} w       Target width in px
 */
export function cloud(id, version, w) {
  return `${CLOUDINARY}/f_auto,q_auto,w_${w}/v${version}/${id}.jpg`
}

/** Width-based srcset — the gallery grid and lightbox are both fluid. */
export function cloudSet(id, version, widths) {
  return widths.map((w) => `${cloud(id, version, w)} ${w}w`).join(', ')
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
