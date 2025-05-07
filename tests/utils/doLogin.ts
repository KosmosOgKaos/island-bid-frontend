import { expect, Page } from '@playwright/test'

export const doLogin = async (page: Page, phoneNumber: string) => {
  await page.goto('/')
  const applyButton = page.getByTestId('application-apply-button')
  await expect(applyButton).toHaveText('Hefja skattframtal')
  await applyButton.click()

  const authenticationInput = page.getByPlaceholder('000-0000')
  authenticationInput.fill(phoneNumber)

  const authenticationButton = page.getByTestId('authentication-login-button')
  await expect(authenticationButton).toHaveText('Auðkenna')
  await authenticationButton.click()
}
