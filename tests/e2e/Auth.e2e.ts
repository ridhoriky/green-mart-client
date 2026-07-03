import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test.describe('Sign up', () => {
    test.beforeEach(({ page }) => {
      page.on('console', (msg) => {
        console.log('PAGE LOG:', msg.text());
      });
      page.on('pageerror', (err) => {
        console.log('PAGE ERROR:', err.message);
      });
    });

    test('displays validation errors on empty submission', async ({ page }) => {
      await page.goto('/en/sign-up');

      // Click the terms checkbox to satisfy native HTML5 required validation
      await page.getByRole('checkbox').click();

      // Click submit
      await page.getByRole('button', { name: /create account/iu }).click();

      // Capture screenshot for debugging
      await page.screenshot({ path: 'test-results/signup-empty-errors.png' });

      // Check validation error messages
      await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
      await expect(page.getByText('Valid email is required')).toBeVisible();
      await expect(page.getByText('Password must be at least 8 characters')).toBeVisible();
    });

    test('registers successfully and redirects to email verification', async ({ page }) => {
      const email = faker.internet.email();
      const password = 'Password123!';

      await page.goto('/en/sign-up');

      // Fill in form details
      await page.getByPlaceholder('Enter your legal name').fill('Test Playwright');
      await page.getByPlaceholder('you@example.com').fill(email);
      await page.getByPlaceholder('At least 8 characters').fill(password);

      // Agree to terms and conditions by clicking checkbox
      await page.getByRole('checkbox').click();

      // Submit form
      await page.getByRole('button', { name: /create account/iu }).click();

      // Capture screenshot after submit
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'test-results/signup-success-redirect.png' });

      // Should redirect to verify email page
      await expect(page).toHaveURL(/verify-email/u);
      await expect(page.getByRole('heading', { name: 'Verify your email' })).toBeVisible();
    });
  });

  test.describe('Sign in', () => {
    test('displays validation errors on empty submission', async ({ page }) => {
      await page.goto('/en/sign-in');

      // Click submit
      await page.getByRole('button', { name: /sign in/iu }).click();

      // Check validation error messages
      await expect(page.getByText('Valid email is required')).toBeVisible();
      await expect(page.getByText('Password is required')).toBeVisible();
    });

    test('displays error message on invalid credentials', async ({ page }) => {
      await page.goto('/en/sign-in');

      // Fill in invalid details
      await page.getByPlaceholder('farmer@greenmart.com').fill('nonexistent@example.com');
      await page.getByPlaceholder('••••••••').fill('wrongpassword');

      // Click submit
      await page.getByRole('button', { name: /sign in/iu }).click();

      // Toast or error alert should appear containing error text
      await expect(page.locator('body')).toContainText(/error|invalid|failed|wrong/iu);
    });
  });

  test.describe('Forgot password', () => {
    test('displays validation errors on empty submission', async ({ page }) => {
      await page.goto('/en/reset-password');

      // Click submit
      await page.getByRole('button', { name: /send reset link/iu }).click();

      // Check validation error messages
      await expect(page.getByText('Valid email is required')).toBeVisible();
    });

    test('submits request successfully', async ({ page }) => {
      await page.goto('/en/reset-password');

      // Fill in email
      await page.getByPlaceholder('e.g. name@company.com').fill('user@example.com');

      // Click submit
      await page.getByRole('button', { name: /send reset link/iu }).click();

      // Should show success state message (e.g. check your email)
      await expect(page.locator('body')).toContainText(/check your email|sent|success/iu);
    });
  });
});
