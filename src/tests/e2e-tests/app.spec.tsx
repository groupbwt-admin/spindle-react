import { expect, test } from '@playwright/experimental-ct-react';

const baseURL = 'http://localhost:3000';

test('screenshot test', async ({ page }) => {
	test.slow();
	await page.goto(baseURL + '/auth/login');
	const headerLine = await page.locator('h1');
	await expect(headerLine).toHaveText(/Sign in to Spindle/);
	await page.screenshot({ path: 'test-screenshot/page-login.png' });

	await expect(headerLine).toHaveScreenshot('headerLine.png');
});
test.describe('feature Login', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(baseURL + '/auth/login');
	});
	test.afterEach(async ({ page }) => {
		await page.close();
	});

	test('inputs validation', async ({ page }) => {
		await expect(page).toHaveURL(baseURL + '/auth/login');
		await page.locator('button[type="submit"]').click();
		await expect(page).toHaveURL(baseURL + '/auth/login');
	});
	test('login', async ({ page }) => {
		test.slow();
		await page.goto(baseURL + '/auth/login');
		await expect(page).toHaveURL(baseURL + '/auth/login');
		await page
			.getByTestId('email-login')
			.locator('input')
			.fill('kravchenko_ds+2@groupbwt.com');
		await page
			.getByTestId('password-login')
			.locator('input')
			.fill('Dwer&sefs33');
		await page.locator('button[type="submit"]').click();
		await expect(page).toHaveURL(baseURL);
	});

	test('is high-quality', async ({ page }) => {
		const NOT_FOUND: Array<string> = [];
		page.on('response', (response) => {
			if (response.status() >= 400) {
				NOT_FOUND.push(response.url());
			}
		});
		await page.reload();
		expect(NOT_FOUND.length).toBe(0);
	});
});

test.describe('feature Sing up to Spindle', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://localhost:3000/auth/login');
		await page.getByRole('link', { name: 'Sign up' }).click();
		await expect(page).toHaveURL('http://localhost:3000/auth/registration');
	});
	test.afterEach(async ({ page }) => {
		await page.close();
	});
	test('submit button', async ({ page }) => {
		await expect(page.locator('button[type="submit"]')).toBeDisabled();
		await page.getByRole('checkbox', { name: 'controlled' }).check();
		await expect(page.locator('button[type="submit"]')).toBeEditable();
	});

	test('inputs', async ({ page }) => {
		await expect(
			page.getByRole('button', { name: 'Verify Email Address' }),
		).toBeDisabled();
		await page
			.getByPlaceholder('Your email address')
			.fill('kravchenko_ds+3@groupbwt.com');
		await page.getByPlaceholder('Your password').fill('Dwer&sefs33');
		await expect(
			page.getByRole('button', { name: 'Verify Email Address' }),
		).toBeDisabled();
		// await page.getByPlaceholder('Password').fill('Dwer&sefs33');
		await page.getByRole('checkbox', { name: 'controlled' }).check();
		await expect(
			page.getByRole('button', { name: 'Verify Email Address' }),
		).toBeEditable();
	});
});

test.describe('delete video', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(baseURL + '/auth/login');
		await expect(page).toHaveURL(baseURL + '/auth/login');
		await page
			.getByTestId('email-login')
			.locator('input')
			.fill('kravchenko_ds+2@groupbwt.com');
		await page
			.getByTestId('password-login')
			.locator('input')
			.fill('Dwer&sefs33');
		await page.locator('button[type="submit"]').click();
		await expect(page).toHaveURL(baseURL);
	});
	test.afterEach(async ({ page }) => {
		await page.close();
	});
	test('delete', async ({ page }) => {
		test.slow();
		await page.goto(baseURL + '/profile');
		await page.waitForSelector('.MuiCard-root');

		const cards = await page.$$('.MuiCard-root');
		const countCardsBeforeDelete = cards.length;
		if (cards.length) {
			await cards[0].waitForSelector('.MuiIconButton-root');
			const btn = await cards[0].$('.MuiIconButton-root');
			await btn?.click();
			await page.getByRole('menuitem', { name: 'Delete' }).click();
			await page.getByRole('button', { name: 'Delete' }).click();
			await page.reload();
			await page.waitForSelector('.MuiCard-root');
			const cardsAfterDelete = await page.$$('.MuiCard-root');
			await expect(countCardsBeforeDelete > cardsAfterDelete.length).toBe(true);
		}
	});
});
test('google auth', async ({ page, browserName }) => {
	test.skip(browserName === 'firefox', 'Still working on it');
	test.slow();
	await page.goto(baseURL + '/auth/login');
	const page1Promise = page.waitForEvent('popup');
	await page.getByRole('button', { name: 'Sign In with Google' }).click();
	const page1 = await page1Promise;
	await page.waitForSelector('input[type="email"]');
	await page1.type('input[type="email"]', 'spindle.application@gmail.com');
	await page1.locator('input[type="email"]').press('Enter');
	await page.waitForSelector('input[type="password"]');
});

test.describe('edit profile', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(baseURL + '/auth/login');
		await expect(page).toHaveURL(baseURL + '/auth/login');
		await page
			.getByTestId('email-login')
			.locator('input')
			.fill('kravchenko_ds+2@groupbwt.com');
		await page
			.getByTestId('password-login')
			.locator('input')
			.fill('Dwer&sefs33');
		await page.locator('button[type="submit"]').click();
		await expect(page).toHaveURL(baseURL);
	});
	test.afterEach(async ({ page }) => {
		await page.close();
	});

	test('edit', async ({ page }) => {
		test.slow();
		await page.waitForSelector('.MuiAvatar-circular');
		const btnAvatar = await page.$('.MuiAvatar-circular');
		await btnAvatar?.click();
		await page.getByRole('menuitem', { name: 'Edit Profile' }).click();
		await expect(page.getByText('Profile Settings')).toContainText(
			'Profile Settings',
		);
		await page.getByPlaceholder('Your first name').fill('after test');
		await page.getByPlaceholder('Your last name').fill('after test');
		await page.getByRole('button', { name: 'Save Changes' }).click();

		await btnAvatar?.click();
		await page.getByRole('menuitem', { name: 'Edit Profile' }).click();
		const inputValue = await page
			.getByPlaceholder('Your first name')
			.inputValue();

		await expect(inputValue).toBe('after test');
	});
});

test.describe('edit profile', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(baseURL + '/auth/login');
		await expect(page).toHaveURL(baseURL + '/auth/login');
		await page
			.getByTestId('email-login')
			.locator('input')
			.fill('kravchenko_ds+2@groupbwt.com');
		await page
			.getByTestId('password-login')
			.locator('input')
			.fill('Dwer&sefs33');
		await page.locator('button[type="submit"]').click();
		await expect(page).toHaveURL(baseURL);
	});
	test.afterEach(async ({ page }) => {
		await page.close();
	});

	test('set video name', async ({ page }) => {
		test.slow();
		await page.goto(baseURL + '/profile');
		await page.waitForSelector('.MuiCard-root');

		const cards = await page.$$('.MuiCard-root');

		await cards[0].click();
		await page.locator('video');
	});
});
