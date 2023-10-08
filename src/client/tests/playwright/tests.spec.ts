import { test, expect, chromium } from '@playwright/test';

async function sleep(seconds :number) {
  return new Promise((resolve) =>setTimeout(resolve, seconds * 1000));
  }
test('has title', async ({page}) => {
    //process.env.DISPLAY = ':0';
    // const browser = await chromium.launch({ headless: false });
    // const page = await browser.newPage();
    await page.goto('https://playwright.dev/');

    await sleep(2);
    await page.screenshot({ path: 'screenshot.png' });
    // await browser.close();
  });