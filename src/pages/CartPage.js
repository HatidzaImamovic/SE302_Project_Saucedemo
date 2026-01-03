import { CartLocators } from "../locators/locators";

export class CartPage{
    constructor(page){
        this.page=page;

        this.cartItem=page.locator(CartLocators.cartItem);
        this.removeButton=page.locator(CartLocators.removeButton);
        this.checkoutButton=page.locator(CartLocators.checkoutButton);
        this.continueShoppingButton=page.locator(CartLocators.continueShoppingButton);
    }

    async itemInCart(itemName){
        return (await this.page.locator('.cart_item', {hasText: itemName}).count())>0;
    }

    async removeItem(itemName){
        await this.page.locator('.cart_item', {hasText: itemName}).locator('button').click();
    }

    async checkOut(){
        await this.checkoutButton.click();
    }

    async continueShopping(){
        await this.continueShoppingButton.click();
    }
}
