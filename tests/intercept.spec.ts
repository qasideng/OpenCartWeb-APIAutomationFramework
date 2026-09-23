import {test, expect, request} from '@playwright/test'


test('mock seach data with fake json test', async({page}) => {
    let fakeProducts = [
        { name: 'Fake Macbook Pro', price: '$599'},
        {name: 'Fake Iphone 18', price: '$599'},
]

await page.route ('**//index.php?route=product/search&search=macbook', async (rounte) => {
    await rounte.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(fakeProducts)

    })
})

await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')

await page.pause()

})