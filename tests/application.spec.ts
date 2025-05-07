import { test, expect } from '@playwright/test'

test('Smoketest: Has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Ísland.is Útboðsverkefni 2025')
})

test('Login works', async ({ page }) => {
  await page.goto('/')

  const applyButton = page.getByTestId('application-apply-button')
  await expect(applyButton).toHaveText('Sækja um')
  await applyButton.click()

  const authenticationInput = page.getByPlaceholder('000-0000')
  authenticationInput.fill('8221429')

  const authenticationButton = page.getByTestId('authentication-login-button')
  await expect(authenticationButton).toHaveText('Auðkenna')
  authenticationButton.click()

  const section = page.getByTestId('active-section-name')
  await expect(section).toHaveText('Gagnaöflun')
})
