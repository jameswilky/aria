import { expect, type Page } from '@playwright/test';
import type { IAddUser } from '../backend-interface';

export class LoginPage {
	page: Page;
	route = '/';

	constructor(page: Page) {
		this.page = page;
	}

	async login(user: IAddUser) {
		await this.page.goto('/');
		await this.page.getByRole('link', { name: 'Login' }).click();
		await this.page.getByLabel('Username').click();
		await this.page.getByLabel('Username').fill(`${user.username}`);
		await this.page.getByLabel('Password').click();
		await this.page.getByLabel('Password').fill(`${user.password}`);
		var continueButtonLocator = this.page.getByRole('button', { name: 'Continue' });
		await expect(continueButtonLocator).toBeVisible();
		await continueButtonLocator.click();
	}
}
