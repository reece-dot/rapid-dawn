import { SITE_URL, BUSINESS } from '../lib/site'
import { OG_IMAGE } from '../lib/images'

/**
 * Per-page head tags. React 19 hoists <title>, <meta> and <link> rendered
 * anywhere in the tree into <head>, so no helmet library is needed.
 *
 * `schema` is an optional JSON-LD object appended for the current route; the
 * site-wide ProfessionalService block lives in index.html.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image,
  imageAlt,
  noindex = false,
  schema,
}) {
  const url = `${SITE_URL}${path}`
  const ogImage = image ?? OG_IMAGE

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:locale" content="en_ZA" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schema && (
        <script
          type="application/ld+json"
          // Route-level structured data (Service catalogue, ContactPage, …).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  )
}
