import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    //1. every page will have its own locators and they will be private

    private readonly emailId: Locator
    private readonly password: Locator
    private readonly loginBtn: Locator
    private readonly forgottenPasswordLink: Locator
    private readonly loginErrorMessage: Locator
    private readonly loginHeader: Locator
    private readonly registerPageTitle: Locator

    //2. Constructor of page classe: initialize locator

    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' })
        this.password = page.getByRole('textbox', { name: 'Password' })
        this.loginBtn = page.getByRole('button', { name: 'Login' })
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first()
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
        this.loginHeader = page.getByRole('heading', { name: 'Returning Customer', level: 2 })
        this.registerPageTitle = page.getByRole('heading', { name: 'Register Account', level: 1 })
    }
    
    //3. public page actions(methods) / behavior: Encapsulation

    async goToLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login') 

    }

    // async getLoginPageTitle(): Promise<String> {
    //     return await this.page.title();
    // }

    

    async isforgottenPasswordLinkExist(): Promise<Boolean> {
        return await this.forgottenPasswordLink.isVisible()
    }

    async doLogin(username: string, password: string): Promise<void> {
        console.log(`user creds: ${username} - ${password}`)
        await this.emailId.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
    }

    async  isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible()
    }

    async getLoginHeader(): Promise<String> {
        return await this.loginHeader.innerText()
    }

    

}