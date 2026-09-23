import {test, expect} from "../src/fixtures/pagefixtures"
import { RegisterPage } from "../src/pages/RegisterPage"


test.beforeEach(async ({registerPage}) => {
    await registerPage.goToRegisterPage()
})

test('registration page title test', async ({registerPage}) => {
     let pageTitle = await registerPage.getRegisterPageTitle()
    console.log('Registration page title: ', pageTitle)
    expect(pageTitle).toBe('Register Account') 
} )

test ('user is able to register test', async ({registerPage, homePage}) => {

    await registerPage.doRegister('Sid', 'S', 'sidtest@test.com', '123456890', 'abc123', 'abc123')
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy()

})

