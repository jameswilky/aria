import { test, expect } from '@playwright/test';
import nock from 'nock';

test('Sign up new user', async ({ page }) => {
  // Arrange
  const scope = nock('http://host.docker.internal:5156')
    .get('/users')
    .reply(200, 
      {username: "john", id:0, token:"test"})

  // await page.route('http://host.docker.internal:5156/users', async route => {
  //   const json = [{ username: "john", id:0, token:"test"}];
  //   await route.fulfill({ json });
  // });

  // Act
  await page.goto('/')
  await page.getByRole('link', { name: 'Signup' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('john');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('john@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('john1234');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Assert
  await expect(page).toHaveURL("/dashboard")
  await expect(page.getByText('Hello, john'));
});