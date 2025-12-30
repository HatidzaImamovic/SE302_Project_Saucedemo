import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Test Cases for the Cart', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({page}) => {
        loginPage=new LoginPage(page);
        inventoryPage=new InventoryPage(page);
        cartPage=new CartPage(page);

        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        
        await expect(inventoryPage.inventoryItem.first()).toBeVisible();
    });

    test('Item is visible in the cart after being added', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();

        const item=await cartPage.itemInCart('Sauce Labs Backpack');
        expect(item).toBe(true);
    });

    test('Remove item from cart from cart page', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();
        await cartPage.removeItem('Sauce Labs Backpack');

        const item=await cartPage.itemInCart('Sauce Labs Backpack');
        expect(item).toBe(false);
    });

    test('Continue shopping returns to inventory page', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();
        await cartPage.continueShopping();

        const item=await inventoryPage.visibleFullInventory()
        await expect(item).toBe(6);
        await expect(inventoryPage.page).toHaveURL(/inventory\.html/);
    });

    test('Checkout takes user to checkout page', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();
        await cartPage.checkOut();

        await expect(inventoryPage.page).toHaveURL(/checkout-step-one\.html/);
    });
})
