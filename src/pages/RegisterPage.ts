import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";



export class RegisterPage extends BasePage {

    //1. every page will have its own locators and they will be private

    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly email: Locator
    private readonly phone: Locator
    private readonly password: Locator
    private readonly confirmPassword: Locator
    private readonly subscribe: Locator
    private readonly privacyCheckbox: Locator
    private readonly continueBtn: Locator

    //2. Constructor of page classe: initialize locator

    constructor(page: Page) {
    super(page)
    
    this.firstName = page.getByRole('textbox', { name: '* First Name' })
    this.lastName = page.getByRole('textbox', { name: '* Last Name' })
    this.email = page.getByRole('textbox', { name: '* E-Mail' })
    this.phone = page.getByRole('textbox', { name: '* Telephone' })
    this.password = page.locator('#input-password')
    this.confirmPassword = page.locator('#input-confirm')
    this.subscribe = page.getByText('Yes')
    this.privacyCheckbox = page.getByRole('checkbox')
    this.continueBtn = page.getByRole('button', { name: 'Continue' })
    }

    //3. public page actions(methods) / behavior: Encapsulation

    async goToRegisterPage() {
        await this.page.goto("/opencart/index.php?route=account/register")
    }

     async getRegisterPageTitle(): Promise<String> {
        return await this.page.title();
    }

     async doRegister(firstName: string, lastName: string, email: string, phone: string, password: string, confirmPassword: string): Promise<void> {
        console.log(`user creds: ${firstName} - ${lastName} - ${email} - ${phone} - ${password} - ${confirmPassword}`)
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.phone.fill(phone)
        await this.password.fill(password)
        await this.confirmPassword.fill(confirmPassword)
        await this.subscribe.click()
        await this.privacyCheckbox.click()
        await this.continueBtn.click()
    }


}
