import { test, expect } from '@playwright/test';
import { nextUser } from '../helpers/data-generator';
import { SignupPage } from '../helpers/pages/SignupPage';
import { DashboardPage } from '../helpers/pages/DashboardPage';

test('Sign up new user that does not exist', async ({ page }) => {
	// Arrange
	const user = nextUser();
	const signupPage = new SignupPage(page);
	const dashboardPage = new DashboardPage(page, user);

	// Act
	signupPage.signup(user);

	// Assert
	await expect(dashboardPage.page).toHaveURL(dashboardPage.route);
	await expect(dashboardPage.getBanner()).toBeVisible();
});
