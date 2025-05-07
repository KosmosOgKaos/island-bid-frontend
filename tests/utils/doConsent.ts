import { Page } from '@playwright/test'
import { clickContinue } from './clickContinue'

// Assumes doLogin() has just been called before this utility function
export const doConsent = async (page: Page) => {
  // Click on the consent checkbox
  await page.locator('#consent').click({
    delay: 200,
    clickCount: 3,
  })
  await clickContinue(page)
}
