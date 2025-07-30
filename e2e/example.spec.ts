import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {


  await page.getByRole('link', { name: ' Products' }).click();
  await page.locator('.nav.nav-pills.nav-justified > li > a').first().click();
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').fill('4466148476578630');
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').fill('James Anderson');
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="card_number"]').fill('4466148476578630');
  await page.getByRole('textbox', { name: 'ex.' }).click();
  await page.getByRole('textbox', { name: 'ex.' }).fill('900');
  await page.getByRole('textbox', { name: 'MM' }).click();
  await page.getByRole('textbox', { name: 'MM' }).fill('07');
  await page.getByRole('textbox', { name: 'YYYY' }).click();
  await page.getByRole('textbox', { name: 'YYYY' }).fill('2028');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await expect(page.locator('#form')).toContainText('Congratulations! Your order has been confirmed!');
});