import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import {InventoryPage} from '../../pages/InventoryPage';

test.describe('SMOKE: Inventory page loads and elements exist', () => {
  test('inventory page loads, displays products and UI elements', async ({page}) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory.html/);

    await expect(inventoryPage.inventoryItem.first()).toBeVisible();

    await expect(inventoryPage.cartButton).toBeVisible();
    await expect(inventoryPage.menuButton).toBeVisible();
    await expect(inventoryPage.sortDropdown).toBeVisible();

    const productCount = await inventoryPage.visibleFullInventory();
    expect(productCount).toBeGreaterThan(0);
  });
});
