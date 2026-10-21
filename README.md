# Playwright 5th and 6th Group 2026

End-to-end browser automation project built with [Playwright Test](https://playwright.dev/docs/intro) and TypeScript. The suite tests the Ndosi Simplified Automation web application using the Page Object Model, reusable fixtures, shared page actions, and centralized test data.

## Table of contents

- [Overview](#overview)
- [Technology stack](#technology-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the tests](#running-the-tests)
- [Test reports and traces](#test-reports-and-traces)
- [Architecture](#architecture)
- [Current test coverage](#current-test-coverage)
- [Configuration](#configuration)
- [Adding a new test](#adding-a-new-test)
- [Continuous integration](#continuous-integration)
- [Troubleshooting](#troubleshooting)
- [Security and test data](#security-and-test-data)
- [Contributing](#contributing)

## Overview

The project currently validates key user journeys against:

```text
https://ndosisimplifiedautomation.vercel.app
```

The automated scenarios cover:

- Opening the application home page
- Navigating from the home page to the login page
- Confirming that login-page elements are visible
- Logging in with a valid student account
- Verifying navigation to the dashboard
- Opening the dashboard menu

The test suite runs in Chromium using Playwright's Desktop Chrome device profile. Additional browser and mobile projects are included as commented examples in the Playwright configuration.

## Technology stack

| Technology | Purpose |
| --- | --- |
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [TypeScript](https://www.typescriptlang.org/) | Test and framework implementation |
| [Playwright Test](https://playwright.dev/) | Browser automation, assertions, fixtures, reporting, and tracing |
| GitHub Actions | Continuous integration |

## Project structure

```text
.
|-- .github/
|   `-- workflows/
|       `-- playwright.yml        # GitHub Actions test workflow
|-- Fixture/
|   `-- CustomFixtures.ts         # Page-object fixtures available to tests
|-- Pages/
|   |-- DashboardPage.ts          # Dashboard interactions
|   |-- HomePage.ts               # Home-page navigation and checks
|   `-- LoginPage.ts              # Login flow and dashboard URL check
|-- TestData/
|   `-- TestData.ts               # Centralized test users and credentials
|-- Utils/
|   `-- BasePage.ts               # Shared browser and element actions
|-- tests/
|   |-- homepage.spec.ts          # Home-page scenarios
|   `-- loginpage.spec.ts         # Login and dashboard scenarios
|-- playwright.config.ts          # Playwright runner configuration
|-- package.json                  # Project metadata and dependencies
|-- package-lock.json             # Locked dependency versions
`-- README.md
```

The following directories are generated when tests run and are excluded by `.gitignore`:

- `playwright-report/` - HTML test report
- `test-results/` - test artifacts such as traces and screenshots
- `blob-report/` - optional Playwright blob reports
- `playwright/.cache/` - Playwright cache

## Prerequisites

Install the following before setting up the project:

- [Node.js](https://nodejs.org/) LTS
- npm, which is included with Node.js
- Git

Confirm that Node.js and npm are available:

```bash
node --version
npm --version
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nkosikk/playwright5thAnd6thGroup2026.git
   cd playwright5thAnd6thGroup2026
   ```

2. Install the locked npm dependencies:

   ```bash
   npm ci
   ```

3. Install the Playwright browser binaries:

   ```bash
   npx playwright install
   ```

   On Linux or in a CI environment, install browsers and their operating-system dependencies together:

   ```bash
   npx playwright install --with-deps
   ```

## Running the tests

This project does not currently define npm test scripts, so use the Playwright CLI through `npx`.

### Run the full suite

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/homepage.spec.ts
npx playwright test tests/loginpage.spec.ts
```

### Run a test by title

```bash
npx playwright test -g "should navigate to the dashboard after login"
```

### Run in headed mode

Use headed mode to watch the browser while a test executes:

```bash
npx playwright test --headed
```

### Run in Playwright UI mode

UI mode provides an interactive test explorer, timeline, watch mode, and debugging tools:

```bash
npx playwright test --ui
```

### Debug a test

```bash
npx playwright test tests/loginpage.spec.ts --debug
```

### List discovered tests

```bash
npx playwright test --list
```

## Test reports and traces

### HTML report

The configured reporter writes an HTML report to `playwright-report/`. Open the latest report with:

```bash
npx playwright show-report
```

### Traces

Tracing is configured as `on-first-retry`. This means:

- Local runs do not retry failed tests by default, so they normally do not produce a retry trace.
- CI retries failed tests up to two times and captures a trace on the first retry.

Open a generated trace with:

```bash
npx playwright show-trace path/to/trace.zip
```

Trace Viewer includes the action timeline, DOM snapshots, network requests, console output, and source locations, which makes it useful for diagnosing CI-only failures.

## Architecture

### Page Object Model

Each application area is represented by a class in `Pages/`:

- `HomePage` opens the application, navigates to login, and reads or verifies login-page content.
- `LoginPage` fills the login form and verifies the dashboard URL.
- `DashboardPage` contains dashboard interactions such as opening the menu.

Keeping selectors and page-specific operations in these classes makes tests easier to read and limits selector changes to one location.

### Shared base page

`Utils/BasePage.ts` wraps common Playwright operations:

- Navigating to a URL
- Clicking an element
- Filling an input
- Verifying element visibility
- Reading element text

All current page objects inherit from `BasePage`.

### Custom fixtures

`Fixture/CustomFixtures.ts` extends Playwright's built-in `test` fixture and creates the following page objects for every test:

- `homePage`
- `loginPage`
- `dashboardPage`

Tests import `test` from the custom fixture module instead of directly from `@playwright/test`:

```ts
import { test } from '../Fixture/CustomFixtures';

test('example', async ({ homePage, loginPage, dashboardPage }) => {
  // Page objects are ready to use here.
});
```

All fixture page objects share Playwright's `page` instance for the current test, allowing a scenario to move across pages without manually constructing objects.

### Test data

`TestData/TestData.ts` centralizes test users by role:

- Student
- Instructor
- Administrator

The current login test uses the student account.

## Current test coverage

| Test file | Scenario | Main validation |
| --- | --- | --- |
| `tests/homepage.spec.ts` | Navigate to Login Page | Opens the home page, selects Login, and verifies the login button is visible |
| `tests/loginpage.spec.ts` | Navigate to the dashboard after login | Signs in as a valid student, verifies the dashboard URL, and opens the menu |

## Configuration

The main configuration is in `playwright.config.ts`.

| Setting | Current value | Behavior |
| --- | --- | --- |
| `testDir` | `./tests` | Discovers tests in the `tests/` directory |
| `fullyParallel` | `true` | Allows independent tests and files to run in parallel |
| `forbidOnly` | CI only | Fails CI if `test.only` is committed |
| `retries` | `2` on CI, `0` locally | Retries transient failures in CI |
| `workers` | `1` on CI, automatic locally | Runs CI tests serially and local tests with the default worker count |
| `reporter` | `html` | Generates the Playwright HTML report |
| `baseURL` | Ndosi Simplified Automation URL | Allows page objects to navigate with relative paths such as `/` |
| `trace` | `on-first-retry` | Captures a trace for the first retry |
| Browser project | Chromium | Runs with the Desktop Chrome device profile |

To add browser coverage, uncomment the relevant project in `playwright.config.ts`. For example, enable the existing Firefox or WebKit project and install its browser binary:

```bash
npx playwright install firefox
npx playwright test --project=firefox
```

## Adding a new test

### 1. Add or update a page object

Put page-specific selectors and actions in the relevant class under `Pages/`. Create a new class when the scenario targets a new application area.

```ts
import { BasePage } from '../Utils/BasePage';

export class ProfilePage extends BasePage {
  async verifyHeadingIsVisible() {
    await this.VerifyElementVisible(
      this.page.getByRole('heading', { name: 'Profile' })
    );
  }
}
```

Prefer user-facing locators such as `getByRole`, `getByLabel`, and `getByText` where possible. They tend to be more resilient and verify accessibility semantics at the same time.

### 2. Register the page object as a fixture

Add the page object type and fixture implementation to `Fixture/CustomFixtures.ts`:

```ts
type CustomFixtures = {
  profilePage: ProfilePage;
};

export const test = base.extend<CustomFixtures>({
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});
```

When modifying the existing fixture type and object, preserve the fixtures that are already registered.

### 3. Create a spec

Add a `*.spec.ts` file under `tests/` and import the custom `test`:

```ts
import { test } from '../Fixture/CustomFixtures';

test.describe('Profile Page Tests', () => {
  test('shows the profile heading', async ({ profilePage }) => {
    await profilePage.GoToUrl('/#profile');
    await profilePage.verifyHeadingIsVisible();
  });
});
```

### 4. Run the new test

```bash
npx playwright test tests/profile.spec.ts
```

## Continuous integration

The GitHub Actions workflow at `.github/workflows/playwright.yml` runs for pushes and pull requests targeting `main` or `master`.

The workflow:

1. Checks out the repository.
2. Sets up the latest Node.js LTS release.
3. Installs dependencies with `npm ci`.
4. Installs Playwright browsers and Linux dependencies.
5. Runs the complete Playwright suite.
6. Uploads `playwright-report/` as an artifact, even when tests fail.

Reports are retained in GitHub Actions for 30 days.

## Troubleshooting

### Browser executable is missing

If Playwright reports that a browser executable does not exist, install the configured browser:

```bash
npx playwright install chromium
```

### The application does not load

Confirm that the configured `baseURL` is reachable in a normal browser. The tests depend on the deployed application and require a working internet connection.

### Login fails

Check that:

- The student account in `TestData/TestData.ts` is still active.
- The application selectors have not changed.
- The deployed application is available.
- The expected dashboard route is still `/#dashboard`.

Use headed or debug mode to inspect the browser state:

```bash
npx playwright test tests/loginpage.spec.ts --headed
npx playwright test tests/loginpage.spec.ts --debug
```

### A test passes locally but fails in CI

Download the `playwright-report` artifact from the failed GitHub Actions run. Open its HTML report and inspect any trace captured during the first retry.

### Tests are not discovered

Verify that:

- The test file is under `tests/`.
- Its name ends in `.spec.ts`.
- It imports `test` from `Fixture/CustomFixtures.ts`.

## Security and test data

The repository currently stores test credentials in `TestData/TestData.ts`. Use accounts created only for automation; never store personal, production, or privileged credentials in source control.

For shared or production-like environments, move credentials to environment variables or a protected CI secret store. Keep local secret files out of Git, validate required variables before tests run, and avoid printing passwords in reports or logs.

Generated reports and traces can contain page content and submitted test data. Treat them as potentially sensitive, review them before sharing, and keep artifact retention as short as practical.

## Contributing

1. Create a branch for the change.
2. Keep selectors and page behavior inside page objects.
3. Reuse `BasePage` helpers where they match the required behavior.
4. Register reusable page objects in the custom fixtures.
5. Add or update tests for the changed behavior.
6. Run the relevant specs locally.
7. Confirm the HTML report does not contain unexpected failures.
8. Open a pull request with a concise description of the scenario and validation performed.

## Useful resources

- [Playwright documentation](https://playwright.dev/docs/intro)
- [Writing Playwright tests](https://playwright.dev/docs/writing-tests)
- [Playwright locators](https://playwright.dev/docs/locators)
- [Playwright fixtures](https://playwright.dev/docs/test-fixtures)
- [Playwright debugging](https://playwright.dev/docs/debug)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
