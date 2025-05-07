import test, { expect } from '@playwright/test'

test('Smoketest: Has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Ísland.is Útboðsverkefni 2025')
})
