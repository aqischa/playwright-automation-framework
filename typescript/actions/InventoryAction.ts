import { type Page } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

export class InventoryAction {
    readonly inventoryPage: InventoryPage;

    constructor(page: Page) {
        this.inventoryPage = new InventoryPage(page);
    }

    async addBackpackToCart(): Promise<void> {
        await this.inventoryPage.addToCartButton.click();
    }

    async openCart(): Promise<void> {
        await this.inventoryPage.cartLink.click();
    }
}