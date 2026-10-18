import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,                        // Allow independent tests to run in parallel
    forbidOnly: !!process.env.CI,               // Fail if test.only is accidentally committed to CI
    retries: process.env.CI ? 2 : 0,             // Retry failed testsonly in CI
    workers: process.env.CI ? 2 : undefined,    // Let Playwright choose the default number of local workers
    timeout: 30_000,                            // Time limits
    expect: {
        timeout: 5_000,
    },
    reporter: [                                 // Test reports
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
    ],
    use: {                                      // Settings shared by tests
        baseURL: 'https://www.saucedemo.com',
        ...devices['Desktop Chrome'],
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        video: 'retain-on-failure',
    },
    outputDir: 'test-results/artifacts',         // Seperate test output from the source code
    projects: [                                  // Browser we will use initially
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});