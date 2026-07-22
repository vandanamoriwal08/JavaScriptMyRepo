# Banking Credit Card Automation Testing Framework

A comprehensive Playwright automation testing framework for banking domain credit card postlogin functionality.

## Features

✅ Login/Authentication Tests
✅ Credit Card Details Verification
✅ Credit Limit and Balance Management
✅ Transaction History Tests
✅ Statement Viewing Tests
✅ Payment Processing Tests
✅ Card Block/Unblock Functionality
✅ New Card Request Tests
✅ Logout Tests
✅ Multi-browser Support (Chrome, Firefox, Safari)
✅ Mobile Testing Support
✅ HTML, JSON, and JUnit Reports
✅ Screenshot and Video on Failure
✅ Trace Recording

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd JavaScriptMyRepo
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npm run install-browsers
```

## Project Structure

```
tests/
├── fixtures/
│   ├── pages/
│   │   ├── LoginPage.ts          # Login page object model
│   │   ├── DashboardPage.ts      # Dashboard page object model
│   │   └── CreditCardPage.ts     # Credit card page object model
│   └── testData.ts               # Test data and fake data generation
├── specs/
│   ├── auth/
│   │   └── login.spec.ts         # Login test cases
│   └── postlogin/
│       ├── creditcard.spec.ts    # Credit card test cases
│       └── logout.spec.ts        # Logout test cases
playwright.config.ts              # Playwright configuration
package.json                       # Project dependencies
```

## Configuration

### Update Base URL

Edit `playwright.config.ts` and update the `baseURL`:

```typescript
use: {
  baseURL: 'http://your-banking-app-url.com',
  ...
}
```

### Update Test Data

Edit `tests/fixtures/testData.ts` with valid credentials and test data:

```typescript
export const validCredentials = {
  email: 'your-test-email@example.com',
  password: 'your-test-password',
};
```

### Update Selectors

Update page object selectors in the `tests/fixtures/pages/` directory to match your application's actual selectors.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with UI
```bash
npm run test:ui
```

### Run specific test file
```bash
npx playwright test tests/specs/auth/login.spec.ts
```

### Run tests by tag
```bash
npx playwright test --grep @critical
```

### View test report
```bash
npm run test:report
```

## Test Reports

Test reports are generated in the following formats:
- **HTML Report**: `playwright-report/`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/junit.xml`

### View HTML Report
```bash
npm run test:report
```

## Recording Tests

### Codegen - Generate test code
```bash
npm run codegen http://your-app-url.com
```

This will open a browser where you can interact with the app and Playwright will generate the test code.

## Page Object Model (POM)

The framework uses Page Object Model pattern for better maintainability:

- **LoginPage.ts**: Handles login page interactions
- **DashboardPage.ts**: Handles dashboard interactions
- **CreditCardPage.ts**: Handles credit card specific interactions

### Example Usage

```typescript
const loginPage = new LoginPage(page);
await loginPage.login('email@example.com', 'password');

const dashboardPage = new DashboardPage(page);
await dashboardPage.viewCreditCardDetails();

const creditCardPage = new CreditCardPage(page);
const balance = await creditCardPage.getCreditLimitInfo();
```

## Test Data Management

The framework includes:
- Valid and invalid credentials
- Fake data generation using @faker-js/faker
- Predefined test transaction data
- Card statement test data

## CI/CD Integration

The framework is configured for CI/CD pipelines:
- Tests retry on CI failures
- Parallel execution is disabled on CI
- Screenshots and videos captured on failure
- Multiple report formats for integration with tools like Jenkins, GitLab CI, etc.

## Troubleshooting

### Selectors not found
1. Verify that the application is running
2. Check if selectors match the current application version
3. Use the Inspector tool to identify correct selectors

### Tests timing out
1. Increase the timeout in `playwright.config.ts`
2. Check network connectivity
3. Verify the application server is responsive

### Browser installation issues
```bash
npm run install-browsers
```

## Contributing

1. Create a new branch for your changes
2. Add or modify test cases
3. Ensure all tests pass
4. Submit a pull request with a description of changes

## Best Practices

1. Use Page Object Model for page interactions
2. Use meaningful test names
3. Keep tests independent and isolated
4. Use test data fixtures
5. Add proper waits for dynamic content
6. Take screenshots on failures
7. Use proper assertions
8. Add comments for complex logic
9. Follow the existing code structure
10. Test both positive and negative scenarios

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## License

MIT

## Contact

For questions or issues, please contact vandanamoriwal08
