import { test} from '@playwright/test';

test('test', async ({ page }) => {
  // await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('link', { name: 'Signup' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('john');
  await page.getByLabel('Username').press('Tab');
  await page.getByLabel('Email').fill('john@gmail.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('testusername')
});