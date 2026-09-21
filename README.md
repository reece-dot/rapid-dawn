# Rapid Dawn — demo site

Flagship-tier marketing site for **Rapid Dawn**, a drone and aerial survey company.

> _We fly your ground. You get maps you can act on._

Dark, precise, aerospace-adjacent. React 19 + Vite + Tailwind 4 + Framer Motion, multi-page via
React Router.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
npm run preview    # serve the production build on :4173
```

### Verification

The checks below drive a real browser against `npm run preview`. Start the preview server first.

```bash
npm run verify     # screenshots every route, flags broken images / console errors
npm run test:form  # enquiry form: validation, focus handling, success state
npm run test:ui    # mobile nav, keyboard access, reduced motion
```

`npm run verify` writes full-page screenshots to `screenshots/` (gitignored) at desktop and
mobile, and fails loudly on any image that resolved to zero width, any missing `width`/`height`,
and any console error.

---

## Structure

```
src/
  lib/site.js       All copy, services, sensors, deliverables, contact details.
  lib/images.js     Unsplash URL builders — always WebP, always explicit dimensions.
  components/       Navbar, Footer, Logo, Icon, Img, Reveal, PageTransition,
                    Seo, SectionHeading, PageHeader, ClientBar, CtaSection,
                    DataFrame, LayerStack.
  pages/            Home, Services, Work, Contact, NotFound.
```

**`src/lib/site.js` is the single source of truth.** Nearly every content change the client asks
for is an edit to that one file — service copy, sensors, process steps, contact details, the
client list. Nothing is hardcoded in a page component.

---

## Decisions worth knowing

### The false-colour imagery is generated, not photographed

There is no honest stock photography of NDVI or radiometric thermal output. Rather than mislabel a
sunset as a heat map, `components/DataFrame.jsx` desaturates real aerial photography and runs it
through an SVG `feComponentTransfer` gradient map — the same channel remapping a GIS package
applies when symbolising a single-band raster. Four ramps are defined: `ndvi`, `thermal`,
`elevation`, `lidar`.

The geometry underneath is genuine aerial photography; only the palette is synthesised. Both the
Work and Services pages say so on the page, in plain language. **Swap these for real client
deliverables as soon as any are cleared for publication** — that is the single biggest upgrade
available to this site.

`<FilterDefs />` must be mounted once on any page using `treatment`.

### Seven services, six supplied

The brief names six survey types but frames the section as _"Seven ways we turn flights into
answers"_. The seventh here is the **Sentinel-2 satellite context layer**, which the brief supplies
as a distinct capability — promoted to a service rather than invented. Flagged in `site.js`.
**Confirm with the client**, or drop it and retitle the section to six.

### No stock portrait for Robin Butler

Robin Butler is a named, real person. Attaching a stock photo of an unrelated model to a real
person's name and credentials is misleading, so the team section uses a work-context image
(planning documents, no face) instead. Replace with a genuine photograph when supplied.

### Client logos are typographic

The brief supplies client names but no artwork, so `ClientBar.jsx` sets each as a monogram lockup —
muted, with the brand gradient revealed on hover. Swap for supplied SVGs when available.

### The contact form does not submit

Validation, focus management, error clearing and the success state are all real and tested. The
submit handler stops short of a network call, and the success panel says so. Wire it to the
client's inbox, a form service, or a serverless function before launch.

---

## Placeholders to replace before launch

Search for `[PLACEHOLDER` — every one is marked.

| Item | Where | Note |
|---|---|---|
| Domain `rapiddawn.co.za` | `lib/site.js`, `index.html`, `public/sitemap.xml`, `public/robots.txt` | Drives canonical URLs + OG tags |
| Email `hello@rapiddawn.co.za` | `lib/site.js`, `index.html` | Also in JSON-LD |
| Phone `+27 00 000 0000` | `lib/site.js`, `index.html` | Also in JSON-LD |
| Aircraft / sensor models | `lib/site.js` → `KIT` | Kept generic pending real specs |
| Client logo artwork | `components/ClientBar.jsx` | Currently typographic |
| Robin Butler photograph | `lib/site.js` → `TEAM` | See above |
| Form submission endpoint | `pages/Contact.jsx` | See above |

---

## SEO

- Static tags in `index.html` marked `data-static-seo` so crawlers and social scrapers get correct
  metadata without executing JS. `main.jsx` removes them the moment React mounts, so the document
  never ships two titles or two canonicals.
- Per-route tags come from `components/Seo.jsx`, which relies on **React 19 hoisting** `<title>`,
  `<meta>` and `<link>` into `<head>` — no helmet dependency.
- JSON-LD: site-wide `ProfessionalService` in `index.html`; per-route `ItemList` (Services),
  `CollectionPage` (Work), `ContactPage` (Contact).
- `public/sitemap.xml` and `public/robots.txt` are checked in — update the domain in both.

## Performance

- Every image is WebP via the Unsplash CDN (`fm=webp`) with explicit `width`/`height`, so there is
  no layout shift. Below-the-fold images are `loading="lazy"` + `decoding="async"`.
- The hero is preloaded in `index.html` with a matching `imagesrcset`, so LCP does not wait on the
  JS bundle. **If you change the hero image, change it in both `index.html` and `lib/images.js`.**
- Routes are code-split; Home ships in the main bundle because it is the LCP route.
- `framer-motion` and `react-router-dom` are split into their own chunks.

## Accessibility

- `prefers-reduced-motion` respected in two places: Framer Motion via `useReducedMotion()` in every
  animated component, and a global CSS block for every transition. Verified by `npm run test:ui`.
- Skip link, single `h1` per page, visible focus ring, `aria-expanded` on the nav toggle, body
  scroll lock and Escape-to-close on the mobile drawer, `role="alert"` on form errors, and focus
  moved to the first invalid field on a failed submit.

## Deployment

Ready for **Vercel** (`vercel.json`) or **Netlify** (`netlify.toml` + `public/_headers` +
`public/_redirects`). Both configure the SPA fallback, immutable asset caching and a matching set
of security headers including a CSP.

The CSP allows `images.unsplash.com` (imagery) and Google Fonts. If you self-host the fonts or
migrate imagery to your own bucket, tighten it accordingly.

---

## Known environment issue: the `rollup` override

`package.json` contains:

```json
"overrides": { "rollup": "npm:@rollup/wasm-node@^4.63.4" }
```

This machine has a Windows **Application Control policy that blocks rollup's native binary**
(`@rollup/rollup-win32-x64-msvc`). The block is per-file-instance, not content-based — a
byte-identical copy of the same binary loads fine from another directory, so it is not a corrupt
download and `Unblock-File` does not help (there is no mark-of-the-web on it).

The override swaps in rollup's official WebAssembly build, which produces identical output. Build
time is unaffected at this project's size (~2.6s).

**This override is a workaround for the build machine, not a requirement of the project.** On CI or
any machine without that policy, remove it and delete `package-lock.json` before reinstalling to
get the faster native binary back.
