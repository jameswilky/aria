import { test, expect } from '@playwright/test';
import { createUser } from '../helpers/backend-interface';
import { nextUser } from '../helpers/data-generator';
import { LoginPage } from '../helpers/pages/LoginPage';
import { DashboardPage } from '../helpers/pages/DashboardPage';

test('User that exists can login', async ({ page }) => {
	// Arrange
	const user = nextUser();
	await createUser(user);
	const loginPage = new LoginPage(page);
	const dashboardPage = new DashboardPage(page, user);

	// Act
	await loginPage.login(user);

	// Assert
	await expect(page).toHaveURL(dashboardPage.route);
	await expect(dashboardPage.getBanner()).toBeVisible();
});

test('User that does not exist cannot login', async ({ page }) => {
	// Arrange
	const user = nextUser();
	const loginPage = new LoginPage(page);

	// Act
	await loginPage.login(user);

	// Assert
	await expect(page.getByText('Oops, something went wrong.')).toBeVisible();
});
test('User that exists, but has invalid credentials and cannot login', async ({ page }) => {
	// Arrange
	const user = nextUser();
	await createUser(user);
	const loginPage = new LoginPage(page);
	user.password = 'the_wrong_password';

	// Act
	await loginPage.login(user);

	// Assert
	await expect(page.getByText('Oops, something went wrong.')).toBeVisible();
});
