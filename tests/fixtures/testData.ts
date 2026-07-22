import { faker } from '@faker-js/faker';

export const validCredentials = {
  email: 'testuser@bankdemo.com',
  password: 'SecurePassword@123',
};

export const invalidCredentials = {
  email: 'invalid@bankdemo.com',
  password: 'WrongPassword@123',
};

export const generateCreditCardData = () => ({
  cardholderName: faker.name.fullName(),
  cardNumber: faker.finance.creditCardNumber('visa'),
  expiryDate: faker.date.future().toLocaleDateString('en-US', {
    month: '2-digit',
    year: '2-digit',
  }),
  cvv: faker.finance.creditCardCVV(),
});

export const testTransactionData = {
  amount: 150.50,
  merchant: 'Online Store',
  category: 'Shopping',
  description: 'Online purchase',
};

export const cardStatementData = {
  statementMonth: 'December 2024',
  dueDate: '15/01/2025',
  minimumPayment: 500.00,
  totalAmount: 5000.00,
};
