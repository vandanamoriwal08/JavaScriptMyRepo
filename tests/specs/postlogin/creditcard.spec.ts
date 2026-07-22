import { test, expect } from '@playwright/test';
import { LoginPage } from '../../fixtures/pages/LoginPage';
import { DashboardPage } from '../../fixtures/pages/DashboardPage';
import { CreditCardPage } from '../../fixtures/pages/CreditCardPage';
import { validCredentials } from '../../fixtures/testData';

test.describe('Credit Card Post-Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(validCredentials.email, validCredentials.password);
    await page.waitForLoadState('networkidle');
  });

  test('should display credit card section after login', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.creditCardSection).toBeVisible();
  });

  test('should view credit card details', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const creditCardPage = new CreditCardPage(page);

    await dashboardPage.viewCreditCardDetails();
    await page.waitForLoadState('networkidle');

    const cardDetails = await creditCardPage.getCardDetails();
    expect(cardDetails.cardNumber).toBeTruthy();
    expect(cardDetails.cardholderName).toBeTruthy();
    expect(cardDetails.expiryDate).toBeTruthy();
  });

  test('should display credit limit information', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const creditCardPage = new CreditCardPage(page);

    await dashboardPage.viewCreditCardDetails();
    await page.waitForLoadState('networkidle');

    const creditLimitInfo = await creditCardPage.getCreditLimitInfo();
    expect(creditLimitInfo.creditLimit).toBeTruthy();
    expect(creditLimitInfo.availableBalance).toBeTruthy();
    expect(creditLimitInfo.usedBalance).toBeTruthy();
  });

  test('should display card status', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const creditCardPage = new CreditCardPage(page);

    await dashboardPage.viewCreditCardDetails();
    await page.waitForLoadState('networkidle');

    const cardStatus = await creditCardPage.getCardStatus();
    expect(['Active', 'Inactive', 'Blocked']).toContain(cardStatus?.trim());
  });

  test('should view transaction history', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.viewTransactionHistory();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('table, [class*="transaction"]')).toBeVisible();
  });

  test('should view statement', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.viewStatement();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[class*="statement"], [data-testid="statement"]')).toBeVisible();
  });

  test('should make a payment', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.makePayment();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[class*="payment"], [data-testid="payment"]')).toBeVisible();
  });

  test('should block card', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const creditCardPage = new CreditCardPage(page);

    await dashboardPage.viewCreditCardDetails();
    await page.waitForLoadState('networkidle');

    await creditCardPage.blockCard();
    await page.waitForLoadState('networkidle');

    // Verify confirmation or status change
    const cardStatus = await creditCardPage.getCardStatus();
    expect(cardStatus).toContain('Blocked');
  });

  test('should unblock card', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const creditCardPage = new CreditCardPage(page);

    await dashboardPage.viewCreditCardDetails();
    await page.waitForLoadState('networkidle');

    await creditCardPage.unblockCard();
    await page.waitForLoadState('networkidle');

    const cardStatus = await creditCardPage.getCardStatus();
    expect(cardStatus).not.toContain('Blocked');
  });

  test('should request new card', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const creditCardPage = new CreditCardPage(page);

    await dashboardPage.viewCreditCardDetails();
    await page.waitForLoadState('networkidle');

    await creditCardPage.requestNewCard();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[class*="success"], [class*="confirmation"]')).toBeVisible();
  });

  test('should display available balance correctly', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const creditCardPage = new CreditCardPage(page);

    await dashboardPage.viewCreditCardDetails();
    await page.waitForLoadState('networkidle');

    const creditLimitInfo = await creditCardPage.getCreditLimitInfo();
    const creditLimit = parseFloat(creditLimitInfo.creditLimit || '0');
    const usedBalance = parseFloat(creditLimitInfo.usedBalance || '0');
    const availableBalance = parseFloat(creditLimitInfo.availableBalance || '0');

    // Available Balance should be = Credit Limit - Used Balance
    expect(availableBalance).toBeCloseTo(creditLimit - usedBalance, 2);
  });
});
