import type { Page } from '@playwright/test';
import type { IProfile } from '../backend-interface';

export class DashboardPage {
	page: Page;
	private profile: IProfile | null;
	route = '/dashboard';

	constructor(page: Page, profile: IProfile | null = null) {
		this.page = page;
		this.profile = profile;
	}

	openSettings = async () => await this.page.getByRole('button', { name: 'Settings' }).click();

	closeSettings = async () => await this.page.getByRole('button', { name: 'Close' }).click();

	saveChanges = async () => await this.page.getByRole('button', { name: 'Save changes' }).click();

	enterGithubApiKey = async (key: string) => {
		await this.page.locator('#github_key').click();
		await this.page.locator('#github_key').fill(key);
	};

	enterOpenAiApiKey = async (key: string) => {
		await this.page.locator('#openai_key').click();
		await this.page.locator('#openai_key').fill(key);
	};
	getBanner = () =>
		this.page.getByText(this.profile ? 'Hello, ' + this.profile.username : 'Sign in');
}
