/**
 * Interaction and accessibility checks: mobile navigation, keyboard access to
 * the layer stack, skip link, heading structure and reduced-motion support.
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const browser = await chromium.launch()
const check = (label, pass) => {
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${label}`)
  if (!pass) process.exitCode = 1
}

/* ---------------- Mobile navigation ---------------- */
console.log('\nMobile navigation')
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })

  const toggle = page.getByRole('button', { name: /open menu/i })
  check('hamburger visible below 768px', await toggle.isVisible())
  // Scope to the header — the footer legitimately shows the same link text.
  const headerWorkLink = page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Work', exact: true })
  check('desktop nav links hidden below 768px', !(await headerWorkLink.isVisible()))

  await toggle.click()
  await page.waitForTimeout(350)
  check('drawer opens', await page.locator('#mobile-menu').isVisible())
  check('aria-expanded set', (await page.getByRole('button', { name: /close menu/i }).getAttribute('aria-expanded')) === 'true')
  check('body scroll locked', (await page.evaluate(() => document.body.style.overflow)) === 'hidden')

  await page.keyboard.press('Escape')
  await page.waitForTimeout(350)
  check('Escape closes drawer', (await page.locator('#mobile-menu').count()) === 0)
  check('body scroll restored', (await page.evaluate(() => document.body.style.overflow)) === '')

  // Navigating via the drawer should close it and change route.
  await page.getByRole('button', { name: /open menu/i }).click()
  await page.waitForTimeout(300)
  await page.locator('#mobile-menu').getByRole('link', { name: 'Work' }).click()
  await page.waitForTimeout(700)
  check('drawer navigates to /work', page.url().endsWith('/work'))
  check('drawer closed after navigation', (await page.locator('#mobile-menu').count()) === 0)

  await page.close()
}

/* ---------------- Keyboard + structure ---------------- */
console.log('\nKeyboard & structure')
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } })
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })

  await page.keyboard.press('Tab')
  const firstFocus = await page.evaluate(() => document.activeElement?.textContent?.trim())
  check('skip link is first tab stop', /skip to content/i.test(firstFocus ?? ''))

  // Layer stack rows must be reachable and operable by keyboard.
  const layerBtn = page.getByRole('button', { name: /orthomosaic/i })
  await layerBtn.focus()
  check('layer stack row is focusable', await layerBtn.evaluate((el) => el === document.activeElement))
  check('layer row has description', (await layerBtn.getAttribute('aria-describedby')) !== null)

  const h1Count = await page.locator('h1').count()
  check(`exactly one h1 (found ${h1Count})`, h1Count === 1)

  const imgsNoAlt = await page.evaluate(
    () => [...document.images].filter((i) => !i.hasAttribute('alt')).length,
  )
  check('every image has an alt attribute', imgsNoAlt === 0)

  const langOk = await page.evaluate(() => document.documentElement.lang)
  check(`html lang set (${langOk})`, !!langOk)

  await page.close()
}

/* ---------------- Reduced motion ---------------- */
console.log('\nReduced motion')
{
  const page = await browser.newPage({
    viewport: { width: 1440, height: 950 },
    reducedMotion: 'reduce',
  })
  const errs = []
  page.on('pageerror', (e) => errs.push(e.message))

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(800)

  // With motion reduced, revealed content must still be visible (opacity 1),
  // not stuck at the animation's initial state.
  const hidden = await page.evaluate(() => {
    const els = [...document.querySelectorAll('h2, h3, p')]
    return els.filter((el) => {
      const r = el.getBoundingClientRect()
      const onScreen = r.top < innerHeight && r.bottom > 0 && r.width > 0
      return onScreen && Number(getComputedStyle(el).opacity) < 0.9
    }).length
  })
  check(`no content stuck invisible under reduced motion (${hidden} hidden)`, hidden === 0)
  check('no page errors under reduced motion', errs.length === 0)

  await page.close()
}

await browser.close()
console.log('')
