import { test, expect } from '@playwright/test';
import { DashboardPage } from '../helpers/pages/DashboardPage';

test('User can enter API Keys, which will be persisted across sessions', async ({ page }) => {
	// Arrange
	const dashboardPage = new DashboardPage(page);

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
test('User will be prompted if they try to close without saving', async ({ page }) => {});
test('Users changes wont be saved if they confirm in the alert that its ok to continue', async ({
	page
}) => {});
