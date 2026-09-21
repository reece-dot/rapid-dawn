import { img, srcSet } from '../lib/images'

/**
 * Image wrapper that always ships WebP with explicit dimensions.
 * Below-the-fold images lazy-load and decode async; pass `priority` for the
 * hero so it is fetched immediately (it is also preloaded in index.html).
 */
export default function Img({
  id,
  alt,
  width,
  height,
  className = '',
  sizes,
  srcset,
  priority = false,
  quality = 72,
  ...rest
}) {
  return (
    <img
      src={img(id, width, height, quality)}
      srcSet={srcset ?? srcSet(id, width, height, quality)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      {...rest}
    />
  )
}
