import { test, expect } from '@playwright/test';
import { createUser } from '../helpers/backend-interface';

test('User that exists can login', async ({ page }) => {
	// Arrange
	const username = 'alice';
	const email = 'alice@gmail.com';
	const password = 'alice1234';
	await createUser({ username, email, password });

	// Act
	await page.goto('/');
	await page.getByRole('link', { name: 'Login' }).click();
	await page.getByLabel('Username').click();
	await page.getByLabel('Username').fill(`${username}`);
	await page.getByLabel('Password').click();
	await page.getByLabel('Password').fill(`${password}`);
	await page.getByRole('button', { name: 'Continue' }).click();

	// Assert
	await expect(page).toHaveURL('/dashboard');
	await expect(page.getByText(`Hello, ${username}`)).toBeVisible();
});
