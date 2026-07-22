import { Page, Locator } from '@playwright/test';

export class CreditCardPage {
  readonly page: Page;
  readonly cardNumber: Locator;
  readonly cardholderName: Locator;
  readonly expiryDate: Locator;
  readonly creditLimit: Locator;
  readonly availableBalance: Locator;
  readonly usedBalance: Locator;
  readonly cardStatus: Locator;
  readonly blockCardButton: Locator;
  readonly unblockCardButton: Locator;
  readonly requestNewCardButton: Locator;
  readonly cardTransactions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardNumber = page.locator('[data-testid="card-number"], [class*="card-number"]');
    this.cardholderName = page.locator('[data-testid="cardholder-name"], [class*="cardholder-name"]');
    this.expiryDate = page.locator('[data-testid="expiry-date"], [class*="expiry-date"]');
    this.creditLimit = page.locator('[data-testid="credit-limit"], [class*="credit-limit"]');
    this.availableBalance = page.locator('[data-testid="available-balance"], [class*="available-balance"]');
    this.usedBalance = page.locator('[data-testid="used-balance"], [class*="used-balance"]');
    this.cardStatus = page.locator('[data-testid="card-status"], [class*="card-status"]');
    this.blockCardButton = page.locator('button:has-text("Block Card")');
    this.unblockCardButton = page.locator('button:has-text("Unblock Card")');
    this.requestNewCardButton = page.locator('button:has-text("Request New Card")');
    this.cardTransactions = page.locator('[data-testid="card-transactions"], [class*="transactions"]');
  }

  async getCardDetails() {
    return {
      cardNumber: await this.cardNumber.textContent(),
      cardholderName: await this.cardholderName.textContent(),
      expiryDate: await this.expiryDate.textContent(),
    };
  }

  async getCreditLimitInfo() {
    return {
      creditLimit: await this.creditLimit.textContent(),
      availableBalance: await this.availableBalance.textContent(),
      usedBalance: await this.usedBalance.textContent(),
    };
  }

  async getCardStatus() {
    return await this.cardStatus.textContent();
  }

  async blockCard() {
    await this.blockCardButton.click();
  }

  async unblockCard() {
    await this.unblockCardButton.click();
  }

  async requestNewCard() {
    await this.requestNewCardButton.click();
  }

  async viewTransactions() {
    await this.cardTransactions.click();
  }
}
