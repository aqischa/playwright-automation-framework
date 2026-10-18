import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productsHeading: Locator;
    readonly backpackProduct: Locator;
    readonly addToCartButton: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeading = page.getByText('Products', {exact: true});
        this.backpackProduct = page
            .locator('.inventory_item')
            .filter({ hasText: 'Sauce Labs Backpack' });
        this.addToCartButton = this.backpackProduct.getByRole(
            'button', { name: 'Add to cart' }
        );
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }
}