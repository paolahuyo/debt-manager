import { test, expect } from '@playwright/test';

test.describe('Debt Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the header', async ({ page }) => {
    const header = page.locator('h1');
    await expect(header).toContainText('Debt Manager');
  });

  test('should display summary cards', async ({ page }) => {
    const summaryCards = page.locator('div').filter({ hasText: /Total Debt|Debts|Monthly Income/ });
    await expect(summaryCards).toHaveCount(3);
  });

  test('should show debt form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });
});
