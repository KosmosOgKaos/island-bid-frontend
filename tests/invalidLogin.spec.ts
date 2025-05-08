import { test, expect } from '@playwright/test'
import { doLogin } from './utils/doLogin'

test('Login does not work for garbage phone input', async ({ page }) => {
  await doLogin(page, '1234567')

  const authenticationFailureText = page.getByTestId('inputErrorMessage')
  await expect(authenticationFailureText).toHaveText('Ekki tókst að auðkenna', {
    timeout: 5000,
  })
})
