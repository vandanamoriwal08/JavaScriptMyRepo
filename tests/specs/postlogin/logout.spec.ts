import { test, expect } from '@playwright/test';
import { LoginPage } from '../../fixtures/pages/LoginPage';
import { DashboardPage } from '../../fixtures/pages/DashboardPage';
import { validCredentials } from '../../fixtures/testData';

test.describe('Logout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(validCredentials.email, validCredentials.password);
    await page.waitForLoadState('networkidle');
  });

  test('should logout successfully', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const loginPage = new LoginPage(page);

    await dashboardPage.logout();
    await page.waitForLoadState('networkidle');

    // User should be redirected to login page
    expect(page.url()).toContain('/login');
    await expect(loginPage.emailInput).toBeVisible();
  });

  test('should not access dashboard after logout', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.logout();
    await page.waitForLoadState('networkidle');

    // Try to navigate to dashboard
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    // Should be redirected to login
    expect(page.url()).toContain('/login');
  });
});
