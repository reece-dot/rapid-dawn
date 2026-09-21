/**
 * Functional check on the enquiry form: empty-submit validation, focus
 * handling, error clearing, and the success state.
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const OUT = process.env.OUT ?? 'screenshots'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))

const check = (label, pass) => console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${label}`)

await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' })

// --- 1. Submitting empty should block and surface errors -------------------
await page.getByRole('button', { name: /send enquiry/i }).click()
await page.waitForTimeout(300)

const alerts = await page.getByRole('alert').allTextContents()
check('empty submit shows validation errors', alerts.length === 4)
check('  — name error', alerts.some((a) => /your name/i.test(a)))
check('  — email error', alerts.some((a) => /email address/i.test(a)))
check('  — location error', alerts.some((a) => /location|airspace/i.test(a)))
check('  — need error', alerts.some((a) => /closest match/i.test(a)))

const focused = await page.evaluate(() => document.activeElement?.id)
check(`focus moved to first invalid field (got "${focused}")`, focused === 'name')

const successGone = (await page.getByText(/enquiry received/i).count()) === 0
check('did NOT show success state on invalid submit', successGone)

await page.screenshot({ path: `${OUT}/contact-validation.png`, fullPage: false })

// --- 2. Invalid email specifically -----------------------------------------
await page.fill('#name', 'Robin Butler')
await page.fill('#email', 'not-an-email')
await page.waitForTimeout(200)
const emailErr = await page.locator('#email-error').textContent()
check('malformed email rejected', /incomplete/i.test(emailErr ?? ''))

// --- 3. Errors clear as fields are corrected -------------------------------
await page.fill('#email', 'robin@example.com')
await page.waitForTimeout(200)
check('email error clears once corrected', (await page.locator('#email-error').count()) === 0)
check('name error cleared too', (await page.locator('#name-error').count()) === 0)

// --- 4. Complete and submit -------------------------------------------------
await page.fill('#location', 'Stellenbosch, Western Cape')
await page.selectOption('#need', { index: 1 })
await page.fill('#message', '40 ha of vineyard, need canopy vigour before harvest.')
await page.getByRole('button', { name: /send enquiry/i }).click()
await page.waitForTimeout(700)

const success = await page.getByText(/enquiry received/i).count()
check('valid submit shows success state', success > 0)

const greeted = await page.getByText(/thanks, robin/i).count()
check('success greets by first name', greeted > 0)

const demoNoted = await page.getByText(/does not yet submit anywhere/i).count()
check('success state discloses it is a demo', demoNoted > 0)

await page.screenshot({ path: `${OUT}/contact-success.png`, fullPage: false })

// --- 5. Reset ---------------------------------------------------------------
await page.getByRole('button', { name: /send another enquiry/i }).click()
await page.waitForTimeout(400)
check('reset returns to a blank form', (await page.inputValue('#name')) === '')

check('no uncaught page errors', errors.length === 0)
if (errors.length) errors.forEach((e) => console.log(`    ${e}`))

await browser.close()
