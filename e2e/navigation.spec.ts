import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between modules', async ({ page }) => {
    await page.goto('/');

    // Navigate to Module 1
    await page.click('text=Module 1');
    await expect(page).toHaveURL(/.*module1/);
    await expect(page.locator('h1')).toContainText('Module 1');

    // Navigate to Module 2
    await page.click('text=Module 2');
    await expect(page).toHaveURL(/.*module2/);
    await expect(page.locator('h1')).toContainText('Module 2');

    // Return to home
    await page.click('text=Home');
    await expect(page).toHaveURL('/');
  });

  test('should show correct sidebar items', async ({ page }) => {
    await page.goto('/');
    
    const sidebar = page.locator('nav');
    await expect(sidebar.locator('text=Home')).toBeVisible();
    await expect(sidebar.locator('text=Module 1')).toBeVisible();
    await expect(sidebar.locator('text=Module 2')).toBeVisible();
  });

  test('should handle module transitions', async ({ page }) => {
    await page.goto('/');

    // Navigate to Module 1
    await page.click('text=Module 1');
    await expect(page.locator('h1')).toContainText('Module 1');

    // Check that module content is loaded
    await expect(page.locator('text=Welcome to Module 1')).toBeVisible();

    // Navigate to Module 2
    await page.click('text=Module 2');
    await expect(page.locator('h1')).toContainText('Module 2');

    // Check that module content is loaded
    await expect(page.locator('text=Welcome to Module 2')).toBeVisible();
  });
});
