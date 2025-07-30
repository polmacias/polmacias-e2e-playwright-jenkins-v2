import { test, expect } from '@playwright/test';
import { config } from 'dotenv';
config({ path: './pass.env' });

// next improvements add POM,negative tests, and more steps
// POM: Page Object Model
const BASE_URL = process.env.BASE_URL as string;
const USER_EMAIL = process.env.EMAIL as string;
const USER_PASSWORD = process.env.PASSWORD as string;
const TEST_USERNAME = process.env.TEST_USERNAME as string;


test.describe('Login Flow', () => {

    test('should allow a user to login successfully', async ({ page }) => {

        await test.step('1. Navigate to the login page and consent cookies.', async () => {
            await page.goto(BASE_URL);
            await page.getByRole('button', { name: 'Consent' }).click();
        });

        await test.step('2. Click on "Signup / Login" button.', async () => {
            await page.getByRole('link', { name: ' Signup / Login' }).click();

            await expect(page.getByText('Login to your account')).toBeVisible();
        });

        await test.step('3. Fill in login credentials.', async () => {
            await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(USER_EMAIL);
            await page.getByRole('textbox', { name: 'Password' }).fill(USER_PASSWORD);
        });

        await test.step('4. Click the Login button.', async () => {
            await page.getByRole('button', { name: 'Login' }).click();
        });

        await test.step('5. Verify successful login.', async () => {
            await expect(page.locator('#header')).toContainText(`Logged in as ${TEST_USERNAME}`);
            //await expect(page).toHaveURL(BASE_URL);
        });
    });
});