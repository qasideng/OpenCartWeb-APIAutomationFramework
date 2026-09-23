import {test, expect} from '@playwright/test'
import { LoginPage } from '../src/pages/LoginPage'
import { HomePage } from '../src/pages/HomePage';

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({page}) => {

    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page)

})

test ('login test', async ({page}) => {

    let pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title: ', pageTitle)
    expect(pageTitle).toBe('Account Login') 

})

test ('forgot pwd link exist test', async ({page}) => {

    expect(await loginPage.isforgottenPasswordLinkExist()).toBeTruthy();

})

test ('user is able to test', async ({page}) => {

    await loginPage.doLogin('pwapril@pw.com', 'pw123')

})

test('login section header test', async({page}) => {
    let loginHeader = await loginPage.getLoginHeader();
    console.log('Login header: ', loginHeader)
    expect(loginHeader).toBe('Returning Customer') 
})

test ('user is able to login test', async ({page}) => {

    await loginPage.doLogin('pwapril@pw.com', 'pw123')
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy()
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')
})
