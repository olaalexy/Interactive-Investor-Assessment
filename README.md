# InteractiveInvestor Automation Framework

A modern, scalable WebdriverIO + TypeScript + Cucumber automation framework for end-to-end testing of the Automation Exercise web application.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Test Scenarios](#test-scenarios)
- [Page Object Model](#page-object-model)
- [Test Data](#test-data)
- [Reporting](#reporting)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This automation framework is designed to test critical user journeys on the Automation Exercise platform, including:
- User registration
- User login
- Product search and browsing
- Shopping cart functionality
- Checkout process

### Technology Stack

- **WebdriverIO**: A next-gen browser automation framework
- **TypeScript**: For type-safe, maintainable code
- **Cucumber/Gherkin**: For behavior-driven development (BDD)
- **Faker.js**: For generating realistic test data
- **Chrome WebDriver**: Cross-platform browser automation

### Key Features

✅ Page Object Model (POM) architecture for maintainable code  
✅ Behavior-Driven Development (BDD) with Gherkin scenarios  
✅ Type-safe TypeScript implementation  
✅ Headless and headed execution modes  
✅ Automatic screenshot capture on test failures  
✅ HTML and JSON reporting  
✅ Reusable base page methods  
✅ Consent popup handling  

## 🏗️ Architecture

### Page Object Model (POM)

The framework follows the Page Object Model design pattern, which encapsulates web page elements and interactions into reusable page classes. This approach offers several benefits:

- **Maintainability**: Element locators are centralized in page classes
- **Reusability**: Common actions are shared across tests
- **Scalability**: Easy to add new pages and interactions
- **Readability**: Tests read like business logic rather than implementation details

### Class Hierarchy

```
BasePage (base class with common methods)
  ├── HomePage
  ├── LoginPage
  ├── RegisterPage
  ├── ProductsPage
  ├── CartPage
  └── CheckoutPage
```

## 📦 Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v16 or higher (v22 recommended)
  - Download from: https://nodejs.org/
- **npm**: v8 or higher (comes with Node.js)
- **ChromeDriver**: Auto-installed by the framework (v135+)
- **Git**: For version control (optional but recommended)

### Verify Installation

```bash
node --version    # Should output v16+
npm --version     # Should output v8+
```

## 🚀 Installation

### Step 1: Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd InteractiveInvestor

# Or navigate to the project directory
cd path/to/InteractiveInvestor
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`:
- WebdriverIO core and plugins
- TypeScript and type definitions
- Cucumber framework
- Reporting tools
- Test utilities (Faker.js)

### Step 3: Verify Installation

```bash
npm test -- --help
```

This should display WebdriverIO help information, confirming the installation is successful.

## ⚙️ Configuration

### Main Configuration File: `wdio.conf.ts`

The WebdriverIO configuration is defined in `wdio.conf.ts` with the following key settings:

#### Browser Configuration

```typescript
capabilities: [
  {
    browserName: "chrome",
    "goog:chromeOptions": {
      args: [
        "--headless=new",
        "--window-size=1920,1080",
        "--disable-gpu",
        "--disable-notifications",
        "--disable-popup-blocking"
      ]
    }
  }
]
```

#### Execution Modes

- **Headless Mode** (default): Browser runs in background, faster execution
- **Headed Mode**: Browser window is visible, useful for debugging

#### Base URL

```typescript
baseUrl: "https://automationexercise.com"
```

#### Timeouts

```typescript
waitforTimeout: 10000           // Element wait timeout (10 seconds)
connectionRetryTimeout: 120000  // Connection retry timeout (2 minutes)
```

#### Cucumber Settings

```typescript
cucumberOpts: {
  require: ["./features/step-definitions/**/*.ts", "./support/hooks.ts"],
  timeout: 60000,              // Step timeout (60 seconds)
  strict: true                 // Fail if steps are undefined
}
```

### Environment Variables

You can control test execution using environment variables:

```bash
# Set headless mode via environment variable
HEADLESS=false npm test        # Run in headed mode

# Or via CLI
npm test:headed                # Predefined script for headed mode
```

### TypeScript Configuration

The `tsconfig.json` file includes:
- ES2022 target for modern JavaScript features
- WebdriverIO type definitions
- Strict type checking enabled
- DOM and Node.js libraries

## 🧪 Running Tests

### Run All Tests (Headless Mode)

```bash
npm test
```

This runs all feature files in headless mode, which is faster and suitable for CI/CD pipelines.

### Run All Tests (Headed Mode)

```bash
npm run test:headed
```

This opens a visible Chrome browser window, useful for debugging and observing test execution.

### Run Specific Feature File

```bash
npx wdio run ./wdio.conf.ts --spec=./features/user-registration.feature
```

### Run Specific Scenario

```bash
npx wdio run ./wdio.conf.ts --spec=./features/user-registration.feature --grep="User registers"
```

### Run with Custom Options

```bash
# Run with verbose logging
npx wdio run ./wdio.conf.ts --logLevel debug

# Run with specific browsers only
npx wdio run ./wdio.conf.ts --capabilities='[{"browserName":"chrome"}]'
```

## 📁 Project Structure

```
InteractiveInvestor/
├── features/                          # Gherkin feature files
│   ├── user-registration.feature      # Registration test scenarios
│   ├── user-checkout-successfully.feature
│   ├── user-adds-to-cart.feature
│   ├── user-searches-product.feature
│   └── step-definitions/
│       └── userJourneys.steps.ts      # Step implementation (glue code)
│
├── pages/                             # Page Object Model classes
│   ├── BasePage.ts                    # Base class with common methods
│   ├── HomePage.ts                    # Home page interactions
│   ├── LoginPage.ts                   # Login page interactions
│   ├── RegisterPage.ts                # Registration page interactions
│   ├── ProductsPage.ts                # Products page interactions
│   ├── CartPage.ts                    # Shopping cart interactions
│   └── CheckoutPage.ts                # Checkout process interactions
│
├── support/                           # Test hooks and utilities
│   └── hooks.ts                       # Before/After scenario hooks
│
├── utils/                             # Utility functions and helpers
│   └── testData.ts                    # Test data and constants
│
├── types/                             # TypeScript type definitions
│   └── wdio-json-html-reporter.d.ts  # Reporter types
│
├── reports/                           # Test execution reports
│   ├── automationexercise-report.html # HTML report
│   └── test-results.json              # JSON report
│
├── package.json                       # Project dependencies
├── tsconfig.json                      # TypeScript configuration
├── wdio.conf.ts                       # WebdriverIO configuration
└── README.md                          # This file
```

## 🎬 Test Scenarios

### 1. User Registration

**File**: `features/user-registration.feature`

Tests the complete user registration flow:
- Navigate to login/registration page
- Enter registration details
- Submit registration form
- Verify account creation confirmation
- Verify successful login

### 2. User Searches Product

**File**: `features/user-searches-product.feature`

Tests product search functionality:
- Navigate to products page
- Enter search query
- View search results
- Verify product display

### 3. User Adds to Cart

**File**: `features/user-adds-to-cart.feature`

Tests shopping cart functionality:
- Browse products
- Add items to cart
- View cart contents
- Verify item details and quantity

### 4. User Checkout Successfully

**File**: `features/user-checkout-successfully.feature`

Tests the complete checkout process:
- Login to existing account
- Add items to cart
- Proceed to checkout
- Enter shipping/payment details
- Confirm order
- Verify order confirmation

## 📄 Page Object Model

### BasePage Class

The `BasePage` class provides common methods used across all page objects:

```typescript
// Navigate to a path
await page.open("/path");

// Click on an element
await page.click(element);

// Enter text
await page.type(element, "text");

// Get element text
const text = await page.textOf(element);

// Select dropdown option
await page.selectByVisibleText(selectElement, "Option");
```

### Page-Specific Classes

Each page extends `BasePage` and defines:
- Page-specific element locators
- Page-specific interactions
- Page validation methods

**Example: HomePage.ts**

```typescript
export default class HomePage extends BasePage {
  async openHome(): Promise<void> {
    await this.open("/");
  }

  async clickLoginLink(): Promise<void> {
    await this.click(await $("a[href='/login']"));
  }
}
```

## 📊 Test Data

### Test Data File: `utils/testData.ts`

Contains centralized test data used across scenarios:

```typescript
export const testData = {
  login: {
    email: "test@example.com",
    password: "password123"
  },
  // Additional test data...
};
```

### Generating Dynamic Test Data

The framework uses Faker.js for generating random, realistic test data:

```typescript
import { faker } from "@faker-js/faker";

const randomEmail = faker.internet.email();
const randomName = faker.person.fullName();
```

## 📈 Reporting

### Test Reports

After test execution, multiple reports are generated:

#### 1. HTML Report

**File**: `reports/automationexercise-report.html`

- User-friendly visual report
- Test execution timeline
- Screenshots of failures
- Browser and OS information

**View Report**:
```bash
npm run report:open
```

#### 2. JSON Report

**File**: `reports/test-results.json`

- Machine-readable format
- Detailed test metadata
- Suitable for CI/CD integration
- Can be parsed for custom reporting

#### 3. Console Output

Terminal displays real-time test execution with status indicators:
```
✓ Scenario: User registers successfully
  ✓ Given the user is on the home page
  ✓ When the user clicks the login link
  ✓ And the user completes registration
  ✓ Then the user should see confirmation
```

### Report Configuration

Reporters are configured in `wdio.conf.ts`:

```typescript
reporters: [
  "spec",  // Console reporter
  [
    JSONReporter,
    {
      outputFile: "./reports/test-results.json",
      screenshotOption: "OnFailure"  // Only screenshot on failures
    }
  ]
]
```

## ✅ Best Practices

### 1. Element Locator Strategy

Use stable, semantic selectors in order of preference:

```typescript
// ✅ Best: Semantic selectors
$("button[aria-label='Submit']")
$("input[name='email']")

// ✅ Good: ID or data attributes
$("#submit-button")
$("[data-testid='login-btn']")

// ⚠️ Avoid: XPath (slow and brittle)
$("//button[contains(text(), 'Submit')]")

// ⚠️ Avoid: Complex CSS selectors
$("div.form > div > div > button")
```

### 2. Wait Strategies

Always wait for elements before interaction:

```typescript
// ✅ Correct: Wait for element
await element.waitForDisplayed({ timeout: 10000 });
await element.click();

// ❌ Incorrect: No wait
await element.click();
```

### 3. Test Independence

Each scenario should be independent:

```typescript
// ✅ Good: Setup data within scenario
Given("the user is registered", async () => {
  await registerUser();
});

// ❌ Avoid: Depending on previous test state
When("the user logs in", async () => {
  // Don't assume previous state
});
```

### 4. Step Definition Naming

Use clear, descriptive step names:

```typescript
// ✅ Clear
Given("the user enters valid email", async () => {});

// ❌ Vague
Given("the user enters data", async () => {});
```

### 5. Error Handling

Implement proper error handling:

```typescript
try {
  await element.click();
} catch (error) {
  console.error("Failed to click element:", error);
  throw error;
}
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: "Chrome binary not found"

**Cause**: ChromeDriver not installed or Chrome browser not found

**Solution**:
```bash
# Reinstall chromedriver
npm install chromedriver@latest --save-dev

# Verify Chrome installation
chrome --version
```

#### Issue: "Element not found" or timeout errors

**Cause**: Element locator is incorrect or element loads slowly

**Solution**:
```typescript
// Increase timeout
await element.waitForDisplayed({ timeout: 30000 });

// Check element locator in browser DevTools
// Verify selector with: document.querySelector(selector)
```

#### Issue: "Step is undefined"

**Cause**: Step implementation not found or mismatch with feature file

**Solution**:
- Check step definition file is included in `cucumberOpts.require`
- Verify step definition regex matches exactly
- Restart WebdriverIO if file was recently added

#### Issue: Tests fail in headless mode but pass headed

**Cause**: Timing issues or visibility problems in headless mode

**Solution**:
```typescript
// Increase wait times
await element.waitForDisplayed({ timeout: 15000 });

// Add explicit waits
await browser.pause(1000);

// Check headless-specific CSS rendering
```

#### Issue: Consent popup blocking tests

**Cause**: Cookie/consent banner not handled

**Solution**: Already handled in `BasePage.open()`, but if popup persists:

```typescript
const consentButton = await $("[aria-label='Manage options']");
if (await consentButton.isDisplayed()) {
  await consentButton.click();
}
```

#### Issue: Tests timeout during checkout

**Cause**: External payment processing delays

**Solution**:
```typescript
// Increase timeout for payment-related steps
await element.waitForDisplayed({ timeout: 60000 });

// Or adjust global timeout in wdio.conf.ts
waitforTimeout: 30000
```

### Debug Mode

Run tests with detailed logging:

```bash
npx wdio run ./wdio.conf.ts --logLevel debug
```

### Run Single Test for Debugging

```bash
npm run test:headed -- --grep="User registers"
```

This opens headed browser for a single scenario, making debugging easier.

### Inspect Browser State

Add breakpoints in step definitions:

```typescript
When("the user clicks login", async () => {
  await browser.pause(5000);  // Pause for 5 seconds
  // Inspect browser state in open window
  await LoginPage.click();
});
```

## 📚 Additional Resources

- [WebdriverIO Documentation](https://webdriver.io/)
- [Cucumber.js Documentation](https://github.com/cucumber/cucumber-js)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Faker.js Documentation](https://fakerjs.dev/)

## 📝 License

This project is private and for internal use only.

## 👥 Support

For issues or questions, please contact the QA automation team.

---

**Last Updated**: April 18, 2026  
**Framework Version**: WebdriverIO 9.16.0 | TypeScript 5.8.3 | Cucumber 9.16.0
