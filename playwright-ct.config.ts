import { defineConfig, devices } from '@playwright/experimental-ct-react';

export default defineConfig({
	testDir: './',
	snapshotDir: './__snapshots__',
	timeout: 10 * 1000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 2,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',

	use: {
		trace: 'on-first-retry',
		ctPort: 3001,
		headless: false,
		viewport: { width: 14400, height: 1000 },
		ignoreHTTPSErrors: true,
		video: 'on-first-retry',
		testIdAttribute: 'data-test-id',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },
	],
});
