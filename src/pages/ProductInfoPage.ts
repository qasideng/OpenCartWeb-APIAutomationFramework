import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
    private readonly header: Locator
    private readonly productImages: Locator
    private readonly productMetaData: Locator
    private readonly productPricing: Locator
    private productInfoMap: Map<string, string | number>

    constructor (page: Page) {
        super(page)

        this.header = page.getByRole('heading', { name: 'MacBook Pro', level: 1 })
        this.productImages = page.locator('div#content li img')
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li')
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li')
        this.productInfoMap = new Map<string, string | number>()

    }

    //page actions
    async getProductHeader(): Promise<string> {
        return await this.header.innerText()
    }

    async getProductImagesCount(): Promise<number> {
        await this.productImages.first().waitFor({state: "visible"})
        return await this.productImages.count()

    }
//use Map to store data since its coming in form of key and value
    async getProductMetaData(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts()
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.productInfoMap.set(metaKey, metaValue)
        }
    }

    async getProductPricingData() {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.productInfoMap.set('productprice', productPrice)
        this.productInfoMap.set('extaxprice', exTaxPrice);

    }

    async getProductInfo() {
        this.productInfoMap.set('productHeader', await this.getProductHeader());
        this.productInfoMap.set('productImagesCount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.productInfoMap
    }
}