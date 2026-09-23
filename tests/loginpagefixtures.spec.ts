
import {test, expect} from '../src/fixtures/pagefixtures'
import {CsvHelper} from '../src/utils/CsvHelper'
import {ExcelHelper} from '../src/utils/ExcelHelper'
import {JsonHelper} from '../src/utils/JsonHelper'

import * as allure from 'allure-js-commons'


test.beforeEach(async ({loginPage}) => {
    await loginPage.goToLoginPage();    
})

test ('login test', async ({loginPage}) => {

    let pageTitle = await loginPage.getPageTitle();
    console.log('Login page title: ', pageTitle)

    expect(pageTitle).toBe('Account Login') 

})

test ('forgot pwd link exist test', async ({loginPage}) => {

    expect(await loginPage.isforgottenPasswordLinkExist()).toBeTruthy();

})

test ('verify user is able to login test with valid credentials', async ({loginPage, homePage}) => {

    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD)
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy()
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account')

})

//use separate csv for poistive and negative data

//DD1: read csv data directly from csv file and loop test method rowsie
//pros: light weight, easy to maintain/read, 3rd party lib, no license, flat files, fs
//good for large data source
let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv')
for(let row of testCSVData) {
    test (`verify login with invalid credentials test - ${row.username} - ${row.password}`, async ({loginPage, homePage}) => {

    await loginPage.doLogin(row.username, row.password)
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    

})
}

//cons of XLSX
//maintenance is heavy(not easy)
//MS_licenses
//xlsx file get corrupted often
//pros: good for big data source but csv is equally good
//DD2: read xlsx data

//DD3: read json data
//pros: in built method: parse, lightweight compared to xml and xlsx
//good for smaller data source
//cons: not good for big data source 10,20,30,etc rows

let testJSONData = JsonHelper.readJson('src/testdata/logindata.json')
for(let row of testJSONData) {
    test (`verify login with invalid credentials test wit JSON data - ${row.username} - ${row.password}`, async ({loginPage, homePage}) => {

    await loginPage.doLogin(row.username, row.password)
    expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    
    })
}

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
