import { test, expect } from '@playwright/test';

test('Sign up new user that does not exist', async ({ page }) => {
	const user = 'john';

	// Act
	await page.goto('/');
	await page.getByRole('link', { name: 'Signup' }).click();
	await page.getByLabel('Username').click();
	await page.getByLabel('Username').fill(`${user}`);
	await page.getByLabel('Email').click();
	await page.getByLabel('Email').fill(`${user}@gmail.com`);
	await page.getByLabel('Password').click();
	await page.getByLabel('Password').fill(`${user}1234`);
	await page.getByRole('button', { name: 'Continue' }).click();

	// Assert
	await expect(page).toHaveURL('/dashboard');
	await expect(page.getByText(`Hello, ${user}`)).toBeVisible();
});
