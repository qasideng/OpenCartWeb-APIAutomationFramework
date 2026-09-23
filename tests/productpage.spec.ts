import {test, expect} from "../src/fixtures/pagefixtures"
import { SearchResultsPage } from "../src/pages/SearchResultsPage";


test.beforeEach(async ({loginPage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD)
})

test('verify product header', async({homePage, searchResultsPage, productInfoPage, page})=> {

    await homePage.doSearch('macbook')
    await searchResultsPage.selectProduct('MacBook Pro')
    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro')

})

test('verify product iamges count', async({homePage, searchResultsPage, productInfoPage, page})=> {

    await homePage.doSearch('macbook')
    await searchResultsPage.selectProduct('MacBook Pro')
    expect(await productInfoPage.getProductImagesCount()).toBe(4)

})

test('verify product info', async({homePage, searchResultsPage, productInfoPage, page})=> {

    await homePage.doSearch('macbook')
    await searchResultsPage.selectProduct('MacBook Pro')
    
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap)

    expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('productimagescount')).toBe(4);
    
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('productcode')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Availability')).toBe('Out Of Stock');
    
    expect.soft(actualProductInfoMap.get('productprice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('extaxprice')).toBe('$2,000.00');


})


