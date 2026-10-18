import { test, expect } from '@playwright/test';
import { LoginAction } from '../actions/LoginAction';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { USERS } from '../data/users';

test('Standard user can log in successfully', async ({ page }) => {
    const loginAction = new LoginAction(page);
    const inventoryPage = new InventoryPage(page);

    await loginAction.login(
        USERS.standard.username,
        USERS.standard.password,
    );

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.productsHeading).toBeVisible();
});

test('Invalid credentials are rejected', async ({ page }) => {
    const loginAction = new LoginAction(page);
    const loginPage = new LoginPage(page);

    await loginAction.login(
        USERS.invalid.username,
        USERS.invalid.password,
    );

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});

test('Empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
});