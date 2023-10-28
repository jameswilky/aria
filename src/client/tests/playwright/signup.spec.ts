import { test, expect } from '@playwright/test';
import { nextUser } from '../helpers/data-generator';
import { SignupPage } from '../helpers/pages/SignupPage';
import { DashboardPage } from '../helpers/pages/DashboardPage';
import { createUser } from '../helpers/backend-interface';

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

test('User that already exists cannot signup again', async ({ page }) => {
	// Arrange
	const user = nextUser();
	await createUser(user);
	const signupPage = new SignupPage(page);
	const dashboardPage = new DashboardPage(page, user);

	// Act
	signupPage.signup(user);

	await expect(dashboardPage.page.getByText('Oops, something went wrong.')).toBeVisible();
});

test('User that that sends invalid email input cannot signup', async ({ page }) => {
	// Arrange
	const user = nextUser();
	const signupPage = new SignupPage(page);
	const dashboardPage = new DashboardPage(page, user);
	user.email = 'invalid';

	// Act
	signupPage.signup(user);

	// Assert
	await expect(dashboardPage.page.getByText('Invalid email')).toBeVisible();
});

test('User that that sends invalid password input cannot signup', async ({ page }) => {
	// Arrange
	const user = nextUser();
	const signupPage = new SignupPage(page);
	const dashboardPage = new DashboardPage(page, user);
	user.password = '123';

	// Act
	signupPage.signup(user);

	// Assert
	await expect(
		dashboardPage.page.getByText('String must contain at least 8 character(s)')
	).toBeVisible();
});
