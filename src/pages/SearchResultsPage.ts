import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {

    private readonly searchResults: Locator
     

    constructor (page: Page) {
        super(page)
        this.searchResults = page.locator('div.product-layout') 
    } 

    //page actions
    async getProductSearchResultsCount(): Promise<number> {
        return await this.searchResults.count()
    }

    async selectProduct(productName: string): Promise<void> {

        console.log('product name: ', productName);
        //dynamic locator: 
        await this.page.getByRole('link', {name: productName}).first().click();

    }





}