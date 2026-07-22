import { test, expect } from '@playwright/test';
import { LoginPage } from '../../fixtures/pages/LoginPage';
import { DashboardPage } from '../../fixtures/pages/DashboardPage';
import { validCredentials, invalidCredentials } from '../../fixtures/testData';

test.describe('Banking Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login(validCredentials.email, validCredentials.password);
    await page.waitForLoadState('networkidle');

    expect(await dashboardPage.isUserLoggedIn()).toBeTruthy();
  });

  test('should show error message with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('invalidemail@test.com', validCredentials.password);
    await page.waitForLoadState('networkidle');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid');
  });

  test('should show error message with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(validCredentials.email, 'wrongpassword123');
    await page.waitForLoadState('networkidle');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid');
  });

  test('should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(invalidCredentials.email, invalidCredentials.password);
    await page.waitForLoadState('networkidle');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  test('should validate email field is required', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Try to submit without email
    await loginPage.passwordInput.fill(validCredentials.password);
    await loginPage.loginButton.click();

    const isRequired = await loginPage.emailInput.evaluate((el: any) =>
      el.hasAttribute('required')
    );
    expect(isRequired).toBeTruthy();
  });

  test('should remember me checkbox functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.rememberMeCheckbox.click();
    const isChecked = await loginPage.rememberMeCheckbox.isChecked();
    expect(isChecked).toBeTruthy();
  });
});
