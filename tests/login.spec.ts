import test, { expect } from '@playwright/test'
import { doLogin } from './utils/doLogin'

test('Login works and we can see the first section', async ({ page }) => {
  await doLogin(page, '7728391')

  // See that we are in the first section
  const section = page.getByTestId('active-section-name')
  await expect(section).toHaveText('Gagnaöflun')
})
