import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
	await page.goto('http://127.0.0.1:5173/dashboard');
	await page.getByRole('button', { name: 'Settings' }).click();
	await page.goto('http://127.0.0.1:5173/dashboard');
	await page.getByRole('button', { name: 'Settings' }).click();
	await page.locator('#github_key').click();
	await page.locator('#github_key').fill('12345');
	await page.locator('#openai_key').click();
	await page.locator('#openai_key').fill('12345');
	await page.getByRole('button', { name: 'Save changes' }).click();
	await page.getByRole('button', { name: 'Settings' }).click();
	await page.locator('#github_key').click();
	await page.locator('#openai_key').click();
	await page.getByRole('button', { name: 'Close' }).click();
});
