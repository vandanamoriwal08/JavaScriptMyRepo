import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly creditCardSection: Locator;
  readonly accountBalance: Locator;
  readonly transactionHistory: Locator;
  readonly viewStatementButton: Locator;
  readonly paymentButton: Locator;
  readonly logoutButton: Locator;
  readonly userMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('[class*="welcome"], h1');
    this.creditCardSection = page.locator('[class*="credit-card"], [data-testid="credit-card"]');
    this.accountBalance = page.locator('[class*="balance"], [data-testid="balance"]');
    this.transactionHistory = page.locator('[class*="transactions"], [data-testid="transactions"]');
    this.viewStatementButton = page.locator('button:has-text("View Statement")');
    this.paymentButton = page.locator('button:has-text("Make Payment")');
    this.userMenu = page.locator('[class*="user-menu"], [data-testid="user-menu"]');
    this.logoutButton = page.locator('button:has-text("Logout")');
  }

  async isUserLoggedIn() {
    return await this.welcomeMessage.isVisible();
  }

  async getCreditCardBalance() {
    return await this.accountBalance.textContent();
  }

  async viewCreditCardDetails() {
    await this.creditCardSection.click();
  }

  async viewTransactionHistory() {
    await this.transactionHistory.click();
  }

  async viewStatement() {
    await this.viewStatementButton.click();
  }

  async makePayment() {
    await this.paymentButton.click();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }
}
