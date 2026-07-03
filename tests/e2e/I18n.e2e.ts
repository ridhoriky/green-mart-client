import { expect, test } from '@playwright/test';

test.describe('I18n', () => {
  test.describe('Language Switching', () => {
    test('should switch language from English to Indonesian using buttons and verify text on the homepage', async ({
      page,
    }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', {
          name: 'Fresh From Earth To Your Kitchen',
        }),
      ).toBeVisible();

      await page.getByRole('button', { name: 'ID' }).click();

      await expect(
        page.getByRole('heading', {
          name: 'Segar Dari Bumi Ke Dapur Anda',
        }),
      ).toBeVisible();
    });

    test('should switch language from English to Indonesian using URL and verify text on the sign-in page', async ({
      page,
    }) => {
      await page.goto('/sign-in');

      await expect(page.getByText('EMAIL ADDRESS')).toBeVisible();

      await page.goto('/id/sign-in');

      await expect(page.getByText('ALAMAT EMAIL')).toBeVisible();
    });
  });
});
