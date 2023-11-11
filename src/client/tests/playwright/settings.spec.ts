import { test, expect } from '@playwright/test';
import { DashboardPage } from '../helpers/pages/DashboardPage';

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

test('User can enter API Keys, which will be persisted across sessions', async ({ page }) => {
	// Arrange
	const dashboardPage = new DashboardPage(page);

	// Act
	await dashboardPage.goTo();
	await dashboardPage.openSettings();
	await dashboardPage.enterGithubApiKey('12345');
	await dashboardPage.enterOpenAiApiKey('67890');
	await dashboardPage.saveChanges();
	await dashboardPage.goTo(); // Refresh page
	await dashboardPage.openSettings();
	const githubApiKey = await dashboardPage.githubApiKeyInput().inputValue();
	const openAIApiKey = await dashboardPage.openAIApiKeyInput().inputValue();

	// Assert
	await expect(githubApiKey).toBe('12345');
	await expect(openAIApiKey).toBe('67890');
});
test('Users changes wont be saved if they confirm in the alert that its ok to continue', async ({
	page
}) => {
	// Arrange
	const dashboardPage = new DashboardPage(page);

	let dialogDismissed = new Promise<void>((resolve) => {
		page.on('dialog', async (dialog) => {
			await dialog.dismiss();
			await delay(2000); // Need to wait for alert events to be processed
			resolve();
		});
	});

	// Act
	await dashboardPage.goTo();
	await dashboardPage.openSettings();
	await dashboardPage.enterGithubApiKey('12345');
	await dashboardPage.enterOpenAiApiKey('67890');
	await dashboardPage.closeSettings();
	await dialogDismissed;
	await dashboardPage.openSettings();
	const githubApiKey = await dashboardPage.githubApiKeyInput().inputValue();
	const openAIApiKey = await dashboardPage.openAIApiKeyInput().inputValue();

	// Assert
	await expect(githubApiKey).toBe('');
	await expect(openAIApiKey).toBe('');
});
