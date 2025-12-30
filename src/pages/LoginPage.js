import { LoginLocators } from "../locators/locators";

export class LoginPage{
    constructor(page){
        this.page=page;

        this.usernameInput=page.locator(LoginLocators.usernameInput);
        this.passwordInput=page.locator(LoginLocators.passwordInput);
        this.loginButton=page.locator(LoginLocators.loginButton);
        this.errorMsg=page.locator(LoginLocators.errorMessage);
    }

    async navigate(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMsg(){
        return await this.errorMsg.textContent();
    }
}
