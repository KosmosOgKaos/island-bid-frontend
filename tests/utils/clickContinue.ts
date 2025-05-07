import { Page } from '@playwright/test'

export const clickContinue = async (page: Page) => {
  const continueButton = page
    .getByRole('button')
    .filter({ hasText: /Halda áfram/ })

  await continueButton.click()
}
