import { InventoryLocators } from "../locators/locators";

export class InventoryPage{
    constructor(page){
        this.page=page;

        this.inventoryItem=page.locator(InventoryLocators.inventoryItem);
        this.itemName=page.locator(InventoryLocators.itemName);
        this.itemPrice=page.locator(InventoryLocators.itemPrice);
        this.cartButton=page.locator(InventoryLocators.cartButton);
        this.cartBadge=page.locator(InventoryLocators.cartBadge);
        this.menuButton=page.locator(InventoryLocators.menuButton);
        this.logoutButton=page.locator(InventoryLocators.logoutButton);
        this.sortDropdown=page.locator(InventoryLocators.sortDropdown);
    }

    async visibleFullInventory(){
        return this.inventoryItem.count();
    }

    async addItemToCart(itemName){
        await this.page.locator('.inventory_item', {hasText: itemName}).locator('button', {hasText: 'Add to cart'}).click();
    }

    async removeItemFromCart(itemName){
        await this.page.locator('.inventory_item', {hasText: itemName}).locator('button', {hasText: 'Remove'}).click();
    }

    async getItemNames(){
        await this.inventoryItem.first().waitFor({state: 'visible'});
        return await this.itemName.allTextContents();
    }

    async getItemPrices(){
        await this.inventoryItem.first().waitFor({state: 'visible'});
        const prices=await this.itemPrice.allTextContents();
        return prices.map(p => parseFloat(p.replace('$', '')));
    }

    async openProductDetails(itemName){
        await this.page.click('.inventory_item_name', {hasText: itemName});
    }

    async openCart(){
        await this.cartButton.click();
    }

    async getNumberOfItemsInCart(){
        const badgeExists=await this.cartBadge.count();

        if(badgeExists===0){
            return 0;
        }
        const number=await this.cartBadge.textContent();
        return parseInt(number);
    }

    async sortBy(option){
        await this.page.waitForURL(/.*inventory.html/);
        await this.inventoryItem.first().waitFor({ state: 'visible' });
        await this.page.waitForSelector('.header_secondary_container', { state: 'visible', timeout: 5000 }).catch(() => {});

        const dropdownSelector=await (async () => {
            const s1='select[data-test="product_sort_container"]';
            const s2='select.product_sort_container';
            if (await this.page.$(s1)) return s1;
            if (await this.page.$(s2)) return s2;
            return null;
        })();

        if(!dropdownSelector){
            throw new Error('Sort dropdown not found on inventory page');
        }

        await this.page.waitForSelector(dropdownSelector, {state: 'visible', timeout: 5000 });
        await this.page.selectOption(dropdownSelector, option);

        await this.inventoryItem.first().waitFor({state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }

    async logout(){
        await this.menuButton.click();
        await this.logoutButton.click();
    }
}
