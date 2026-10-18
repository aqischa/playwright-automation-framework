import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productsHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeading = page.getByText('Products', {exact: true});
    }
}