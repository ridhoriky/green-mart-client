import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', (msg) => {
      console.log('PAGE LOG:', msg.text());
    });
    page.on('pageerror', (err) => {
      console.log('PAGE ERROR:', err.message);
    });

    // Block Google Sign-In SDK to prevent external requests/flakiness
    await page.route('https://accounts.google.com/**', async (route) => {
      await route.abort();
    });

    // Mock register endpoint
    await page.route('**/api/v1/auth/register', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        json: {
          success: true,
          data: {
            message: 'Registration successful',
          },
        },
      });
    });

    // Mock login endpoint (unauthorized by default)
    await page.route('**/api/v1/auth/login', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        json: {
          message: 'Invalid credentials',
        },
      });
    });

    // Mock forgot-password endpoint
    await page.route('**/api/v1/auth/forgot-password', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: {
          success: true,
          message: 'Success',
        },
      });
    });

    // Mock refresh endpoint (unauthorized by default for guest user)
    await page.route('**/api/v1/auth/refresh', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        json: {
          status: 'error',
          message: 'Invalid or expired refresh token',
        },
      });
    });
  });

  test.describe('Sign up', () => {
    test('displays validation errors on empty submission', async ({ page }) => {
      await page.goto('/en/sign-up');

      // Click the terms checkbox to satisfy native HTML5 required validation
      await page.getByTestId('terms-checkbox').click();

      // Click submit
      await page.getByTestId('signup-submit-btn').click();

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
      await page.getByTestId('name-input').fill('Test Playwright');
      await page.getByTestId('email-input').fill(email);
      await page.getByTestId('password-input').fill(password);

      // Agree to terms and conditions by clicking checkbox
      await page.getByTestId('terms-checkbox').click();

      // Submit form
      await page.getByTestId('signup-submit-btn').click();

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
      await page.getByTestId('signin-submit-btn').click();

      // Check validation error messages
      await expect(page.getByText('Valid email is required')).toBeVisible();
      await expect(page.getByText('Password is required')).toBeVisible();
    });

    test('displays error message on invalid credentials', async ({ page }) => {
      await page.goto('/en/sign-in');

      // Fill in invalid details
      await page.getByTestId('email-input').fill('nonexistent@example.com');
      await page.getByTestId('password-input').fill('wrongpassword');

      // Click submit
      await page.getByTestId('signin-submit-btn').click();

      // Toast or error alert should appear containing error text
      await expect(page.locator('body')).toContainText(/error|invalid|failed|wrong/iu);
    });

    test('signs in successfully and redirects to home', async ({ page }) => {
      await page.route('**/api/v1/auth/login', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: {
            'Set-Cookie':
              'refresh_token=mocked_refresh_token; Path=/api/v1/auth; HttpOnly; Secure; SameSite=Strict; Max-Age=604800',
          },
          json: {
            status: 'success',
            message: 'Login successful',
            data: {
              accessToken: 'mocked_access_token',
              expiresAt: 1_720_000_000,
              user: {
                id: 'uuid-user',
                name: 'Test User',
                email: 'farmer@greenmart.com',
                role: 'user',
                isActive: true,
              },
            },
          },
        });
      });

      await page.goto('/en/sign-in');

      // Fill in valid details
      await page.getByTestId('email-input').fill('farmer@greenmart.com');
      await page.getByTestId('password-input').fill('PasswordAman123!');

      // Click submit
      await page.getByTestId('signin-submit-btn').click();

      // Should redirect away from sign-in page
      await expect(page).not.toHaveURL(/sign-in/u);
    });
  });

  test.describe('Forgot password', () => {
    test('displays validation errors on empty submission', async ({ page }) => {
      await page.goto('/en/reset-password');

      // Click submit
      await page.getByTestId('reset-submit-btn').click();

      // Check validation error messages
      await expect(page.getByText('Valid email is required')).toBeVisible();
    });

    test('submits request successfully', async ({ page }) => {
      await page.goto('/en/reset-password');

      // Fill in email
      await page.getByTestId('reset-email-input').fill('user@example.com');

      // Click submit
      await page.getByTestId('reset-submit-btn').click();

      // Should show success state message (e.g. check your email)
      await expect(page.locator('body')).toContainText(/check your email|sent|success/iu);
    });
  });
});
