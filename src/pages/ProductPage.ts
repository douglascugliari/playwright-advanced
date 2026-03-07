import { Page, expect } from '@playwright/test';
import { ProductSelectors } from '../selectors/productSelectors';

export class ProductPage {
    private page: Page;
    private selectors: ProductSelectors;


    constructor(page: Page) {
        this.page = page;
        this.selectors = new ProductSelectors(page);
    }

    async goto() {
        await this.page.goto('/admin/cadastrarprodutos');
        await this.page.waitForLoadState('networkidle');
    }



    async registerProduct(name: string, price: string, description: string, quantity: string) {
        await this.selectors.productNameInput().fill(name);
        await this.selectors.productPriceInput().fill(price);
        await this.selectors.productDescriptionInput().fill(description);
        await this.selectors.productQuantityInput().fill(quantity);
        await this.selectors.registerProductButton().click();
    }

    async verifyProductRegistrationSuccess(productName: string) {
        await this.selectors.waitForTableToLoad(productName);
        const product = await this.selectors.findProductInTable(productName);
        expect(product).not.toBeNull();
    }

    async clickDeleteInProductRow(productName: string, timeoutMs = 15000): Promise<boolean> {
        const row = await this.selectors.findProductInTable(productName);
        if (!row) return false;
        await row.getByText('Excluir').click();
        await this.waitForTableToReloadAfterDelete(productName, timeoutMs);
        return true;
    }

    async waitForTableToReloadAfterDelete(productName: string, timeoutMs = 15000): Promise<void> {
        const cellWithProduct = this.page.getByRole('cell', { name: new RegExp(productName, 'i') });
        await expect(cellWithProduct).not.toBeVisible({ timeout: timeoutMs });
    }

    async verifyErrorMessageMultiple(expectedMessages: string[]) {
        for (const message of expectedMessages) {
            const errorMessage = this.page.getByText(message);
            await expect(errorMessage).toBeVisible();
        }
    }

    async deleteProduct(nameProduct: string) {
        await this.selectors.waitForTableToLoad(nameProduct);
        await this.clickDeleteInProductRow(nameProduct);
    }

    async verifyProductDeleteSuccess(nameProduct: string) {
        const productDelete = await this.selectors.findProductInTable(nameProduct);
        expect(productDelete).toBeNull();
    }

    async registerProductDuplcate(name: string, price: string, description: string, quantity: string) {
        await this.goto();
        await this.registerProduct(name, price, description, quantity)
    }

    async verifyErrorMessageDuplicated(expectedMessage: string[]) {
        for (const message of expectedMessage) {
            const errorMessage = this.page.getByText(message);
            await expect(errorMessage).toBeVisible();

        }

    }
}
