/**
 * Visual + integrity check across every route.
 *
 * Screenshots each page at desktop and mobile, and reports console errors,
 * failed requests and any image that resolved to zero width (a broken src).
 * Run against `npm run preview`.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const OUT = process.env.OUT ?? 'screenshots'
const ROUTES = ['/', '/services', '/work', '/gallery', '/contact', '/no-such-page']

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
let problems = 0

for (const [label, viewport] of [
  ['desktop', { width: 1440, height: 950 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })

  const errors = []
  const failed = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`))
  page.on('requestfailed', (r) => failed.push(`${r.url()} — ${r.failure()?.errorText}`))

  for (const route of ROUTES) {
    errors.length = 0
    failed.length = 0

    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 45000 })

    // Walk the page so every lazy image below the fold is triggered, then wait
    // for them to actually finish decoding — polling beats a fixed timeout,
    // which was reporting in-flight images as broken.
    await page.evaluate(async () => {
      const step = window.innerHeight
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 220))
      }
      window.scrollTo(0, document.body.scrollHeight)
    })

    await page
      .waitForFunction(() => [...document.images].every((i) => i.complete), null, {
        timeout: 30000,
      })
      .catch(() => console.log('    (timed out waiting for images to complete)'))

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(600)

    const name = route === '/' ? 'home' : route.replace(/\//g, '') || 'home'
    await page.screenshot({ path: `${OUT}/${name}-${label}.png`, fullPage: true })

    const imgStats = await page.evaluate(() =>
      [...document.images].map((i) => ({
        src: i.currentSrc || i.src,
        ok: i.complete && i.naturalWidth > 0,
        alt: i.alt,
        hasDims: i.hasAttribute('width') && i.hasAttribute('height'),
        lazy: i.loading,
      })),
    )

    const broken = imgStats.filter((i) => !i.ok)
    const noDims = imgStats.filter((i) => !i.hasDims)
    const noAlt = imgStats.filter((i) => i.alt === null || i.alt === undefined)
    const title = await page.title()

    const bad = broken.length || errors.length || failed.length || noDims.length
    if (bad) problems++

    console.log(`\n[${label}] ${route}`)
    console.log(`  title: ${title}`)
    console.log(`  images: ${imgStats.length} (broken ${broken.length}, no-dims ${noDims.length}, no-alt ${noAlt.length})`)
    if (broken.length) broken.forEach((b) => console.log(`    BROKEN: ${b.src}`))
    if (noDims.length) noDims.forEach((b) => console.log(`    NO-DIMS: ${b.src}`))
    if (errors.length) errors.forEach((e) => console.log(`    CONSOLE: ${e}`))
    if (failed.length) failed.forEach((f) => console.log(`    REQFAIL: ${f}`))
  }

  await page.close()
}

await browser.close()
console.log(`\n${problems === 0 ? 'ALL CLEAN' : `${problems} page/viewport combos had problems`}`)
