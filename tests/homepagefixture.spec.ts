import {test, expect} from "../src/fixtures/pagefixtures"
import { BasePage } from "../src/pages/BasePage";


test.beforeEach(async({loginPage}) => {
    await loginPage.goToLoginPage()
    await loginPage.doLogin('pwapril@pw.com', 'pw123');

})

test('home page title test', async ({homePage}) => {
    let pageTitle = await homePage.getHomePageTitle();
    console.log('Home page title ', pageTitle)
    expect(pageTitle).toBe('My Account');
})

test ('logout link exist test', async ({homePage}) => {
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy()
})

test ('home page headers exist test', async({homePage}) => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('home page headers: ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4)
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
})

//common features test

test('company logo visible exisits on login page', async({basePage}) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
    
})

test('search box visible exisits on login page', async({basePage}) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
    
})

test('cart exisits on login page', async({basePage}) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
    
})

test('Footers exisits on login page', async({basePage}) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
})
