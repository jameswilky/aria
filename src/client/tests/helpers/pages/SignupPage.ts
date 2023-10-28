import test, { expect, type Page } from '@playwright/test';
import type { IAddUser } from '../backend-interface';

export class SignupPage {
	page: Page;
	route = '/';

	constructor(page: Page) {
		this.page = page;
	}

	async signup(user: IAddUser) {
		await this.page.goto('/');
		await this.page.getByRole('link', { name: 'Signup' }).click();
		await this.page.getByLabel('Username').click();
		await this.page.getByLabel('Username').fill(`${user.username}`);
		await this.page.getByLabel('Email').click();
		await this.page.getByLabel('Email').fill(user.email);
		await this.page.getByLabel('Password').click();
		await this.page.getByLabel('Password').fill(user.password);
		var continueButtonLocator = this.page.getByRole('button', { name: 'Continue' });
		await expect(continueButtonLocator).toBeVisible();
		await expect(continueButtonLocator).toBeEnabled();
		await continueButtonLocator.click();
	}
}
