import { test, expect } from '@playwright/test';
import { config } from 'dotenv';
config({ path: './pass.env' });

// next improvements add POM,negative tests, and more steps
// POM: Page Object Model
const BASE_URL = process.env.BASE_URL as string;
const USER_EMAIL = process.env.EMAIL as string;
const USER_PASSWORD = process.env.PASSWORD as string;
//const USER_USERNAME = process.env.USERNAME as string;
const NAME_ON_CARD = process.env.NAME_ON_CARD as string;
const CARD_NUMBER = process.env.CARD_NUMBER as string;
const EXPIRY_MONTH = process.env.EXPIRY_MONTH as string;
const EXPIRY_YEAR = process.env.EXPIRY_YEAR as string;
const CVV = process.env.CVV as string;


test.describe('Buy Flow', () => {
    
    test('Logs in and buys one product then checks if it was correctly bought', async ({ page }) => {
        
        await test.step('1. Navigate to the login page and consent cookies.', async () => {
            await page.goto(BASE_URL);
            await page.getByRole('button', { name: 'Consent' }).click();
        });

        await test.step('2. Click on Login" button.', async () => {
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

        await test.step('5. Navigate to Products and add one to cart.', async () => {
            await page.getByRole('link', { name: ' Products' }).click();
            await page.locator('.nav.nav-pills.nav-justified > li > a').first().click();
            await page.getByRole('button', { name: ' Add to cart' }).click();
        });
        await test.step('6. View Cart and proceed to checkout.', async () => {
            const proceedToCheckoutButton = page.getByText('Proceed To Checkout');
            await page.getByRole('link', { name: 'View Cart' }).click();
             await expect(proceedToCheckoutButton).toBeVisible({ timeout: 15000 });
            await expect(proceedToCheckoutButton).toBeEnabled({ timeout: 15000 });
            await page.getByText('Proceed To Checkout').click();
        });


        await test.step('7. Place Order and fill payment details.', async () => {
            await page.getByRole('link', { name: 'Place Order' }).click();
            await page.locator('input[name="name_on_card"]').fill(NAME_ON_CARD);
            await page.locator('input[name="card_number"]').fill(CARD_NUMBER);
            await page.locator('input[name="cvc"]').fill(CVV);
            await page.locator('input[name="expiry_month"]').fill(EXPIRY_MONTH);
            await page.locator('input[name="expiry_year"]').fill(EXPIRY_YEAR);
            await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
        });
        
        await test.step('8. Verify order confirmation.', async () => {
            await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');
        });

        
    });

});