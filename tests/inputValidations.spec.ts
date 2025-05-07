import test, { expect } from '@playwright/test'
import { doLogin } from './utils/doLogin'
import { doConsent } from './utils/doConsent'
import { clickContinue } from './utils/clickContinue'

test('Input should be validated', async ({ page }) => {
  // Log in
  await doLogin(page, '7728391')

  // TODO: Click continue before consent

  // Consent
  await doConsent(page)

  // Fill first telephone input with garbage
  await page.getByLabel('Símanúmer').fill('fff')
  await clickContinue(page)

  let validationErrorMessage = page.getByTestId('validationErrorMessage')
  await expect(validationErrorMessage).toHaveText(/sláðu inn gilt símanúmer/)

  // Return phonenumber to a valid input
  await page.getByLabel('Símanúmer').fill('8221429')

  // Fill email with garbage and test
  await page.getByLabel('Netfang').fill('bingobuddies.com')
  await clickContinue(page)

  validationErrorMessage = page.getByTestId('validationErrorMessage')
  await expect(validationErrorMessage).toHaveText(/sláðu inn gilt netfang/)
  await page.getByLabel('Netfang').fill('good@times.com')

  await clickContinue(page)
})
