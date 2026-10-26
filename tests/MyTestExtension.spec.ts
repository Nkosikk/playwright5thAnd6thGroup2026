import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ndosisimplifiedautomation.vercel.app/#practice');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('aveetestuser@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Testing123456!');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'A Menu ▼' }).click();
  await page.getByRole('button', { name: '👤 My Profile' }).click();
  await page.getByRole('button', { name: '✏️ Edit Profile' }).click();
  await page.getByRole('textbox', { name: 'e.g., octocat' }).click();
  await page.getByRole('textbox', { name: 'e.g., octocat' }).fill('MyGitUsernameUpdates');
  await page.getByRole('button', { name: '💾 Save Changes' }).click();
});