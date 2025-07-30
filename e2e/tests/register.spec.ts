import { test, expect } from '@playwright/test';
import { config } from 'dotenv';
config({ path: './pass.env' });

const BASE_URL = process.env.BASE_URL as string;
const TEST_EMAIL = process.env.TEST_EMAIL as string;
const USER_PASSWORD = process.env.PASSWORD as string;
const TEST_USERNAME = process.env.TEST_USERNAME as string;
const NAME_ON_CARD = process.env.NAME_ON_CARD as string;
const NAME = process.env.NAME as string;
const SURNAME = process.env.SURNAME as string;
const ADDRESS = process.env.ADDRESS as string;
const STATE = process.env.STATE as string;
const CITY = process.env.CITY as string;
const CP = process.env.CP as string;
const MOBILE_NUMBER = process.env.MOBILE_NUMBER as string;

test.describe('Register flow and delete user', () => {

    test('should allow a user to register and delete their account', async ({ page }) => {
        await test.step('1. Navigate to the registration page and consent cookies.', async () => {
            await page.goto(BASE_URL);
            await page.getByRole('button', { name: 'Consent' }).click();
        });

        await test.step('2. Click on "Signup / Login" button.', async () => {
            await page.getByRole('link', { name: ' Signup / Login' }).click();
            await page.getByRole('textbox', { name: 'Name' }).click();
            await page.getByRole('textbox', { name: 'Name' }).fill(NAME_ON_CARD);
            await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
            await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(TEST_EMAIL);
            await page.getByRole('button', { name: 'Signup' }).click();
        });

        await test.step('3. Fill in registration details.', async () => {
            await page.getByRole('textbox', { name: 'Password *' }).click();
            await page.getByRole('textbox', { name: 'Password *' }).fill(USER_PASSWORD);
            await page.getByRole('radio', { name: 'Mr.' }).check();
            await page.locator('#days').selectOption('2');
            await page.locator('#months').selectOption('2');
            await page.locator('#years').selectOption('1992');
            await page.getByRole('textbox', { name: 'First name *' }).click();
            await page.getByRole('textbox', { name: 'First name *' }).fill(NAME);
            await page.getByRole('textbox', { name: 'Last name *' }).click();
            await page.getByRole('textbox', { name: 'Last name *' }).fill(SURNAME);
            await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
            await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(ADDRESS);
            await page.getByRole('textbox', { name: 'State *' }).click();
            await page.getByRole('textbox', { name: 'State *' }).fill(STATE);
            await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
            await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(CITY);
            await page.locator('#zipcode').click();
            await page.locator('#zipcode').fill(CP);
            await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
            await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(MOBILE_NUMBER);
            await page.getByRole('button', { name: 'Create Account' }).click();
        });

        await test.step('4. Verify successful registration.', async () => {
            await expect(page.locator('#form')).toContainText('Congratulations! Your new account has been successfully created!');
            await page.getByRole('link', { name: 'Continue' }).click();
        });

        // await test.step('5. Verify user has been created.', async () => {
        //     await expect(page.locator('#header')).toContainText(`Logged in as ${TEST_USERNAME}`);

        // });

        await test.step('6. Delete the user account.', async () => {
            await page.getByRole('link', { name: ' Delete Account' }).click();
            await expect(page.locator('#form')).toContainText('Your account has been permanently deleted!');
            await page.getByRole('link', { name: 'Continue' }).click();
        });
        console.log('User account has been successfully deleted.');

    });

}); 