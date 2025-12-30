import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Test cases for Checkout', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({page}) => {
        loginPage=new LoginPage(page);
        inventoryPage=new InventoryPage(page);
        cartPage=new CartPage(page);
        checkoutPage=new CheckoutPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();
        await cartPage.checkOut();
    });

    test('User enters checkout information', async ({page}) => {
        await checkoutPage.checkOut('Test', 'User', '71000');

        await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

    test('Checkout with empty fields', async () => {
        await checkoutPage.checkOut('', '', '');

        expect(await loginPage.getErrorMsg()).toContain('Error');
    });

    test('Cancel checkout', async ({page}) => {
        await checkoutPage.cancelCheckout();

        await expect(page).toHaveURL(/cart\.html/);
    });

    test('Finish checkout with Thank you message', async () => {
        await checkoutPage.checkOut('Test', 'User', '71000');
        await checkoutPage.finishCheckout();

        const tyMsg=await checkoutPage.displayThankYouMsg();
        expect(tyMsg).toContain('Thank you');
    });

    test('Return to inventory page after finishing checkout', async ({page}) => {
        await checkoutPage.checkOut('Test', 'User', '71000');
        await checkoutPage.finishCheckout();
        await checkoutPage.returnToHome();

        await expect(page).toHaveURL(/inventory\.html/);
    });
})
