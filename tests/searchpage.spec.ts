import {test, expect} from "../src/fixtures/pagefixtures"
import {CsvHelper} from "../src/utils/CsvHelper"


test.beforeEach(async ({loginPage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD)
})

//data provider:
let productData = CsvHelper.readCsv('src/testdata/product.csv')
for(let row of productData) {
    test (`verify search results count- ${row.searchkey}-${row.productname}-${row.resultcount}`, async({homePage, searchResultsPage}) =>{
    await homePage.doSearch('macbook');
    let actresultCount = await searchResultsPage.getProductSearchResultsCount();
    console.log('Search Results Count ', actresultCount)
    expect(actresultCount).toBe(Number(row.resultcount));
})

}

for (let row of productData) {
    test(`verify user is able to land on product page-${row.searchkey}-${row.productname}`, async({homePage, searchResultsPage, page}) => {

    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await page.title()).toBe('MacBook Pro')

})
}

