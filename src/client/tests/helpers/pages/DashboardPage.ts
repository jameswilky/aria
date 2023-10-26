import type { Page } from '@playwright/test';
import type { IProfile } from '../backend-interface';

export class DashboardPage {
	page: Page;
	private profile: IProfile;
	route = '/dashboard';

	constructor(page: Page, profile: IProfile) {
		this.page = page;
		this.profile = profile;
	}

	getBanner = () => this.page.getByText('Hello, ' + this.profile.username);
}
