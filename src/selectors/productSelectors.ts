import { Page, Locator, expect } from "@playwright/test";

export class ProductSelectors {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    productNameInput() {
        return this.page.getByRole('textbox', { name: /nome/i });
    }

    productPriceInput() {
        return this.page.getByRole('spinbutton', { name: /preço/i });
    }

    productDescriptionInput() {
        return this.page.getByRole('textbox', { name: /descrição/i });
    }

    productQuantityInput() {
        return this.page.getByRole('spinbutton', { name: /quantidade/i });
    }
    registerProductButton() {
        return this.page.getByRole('button', { name: /cadastrar/i });
    }

    messageSuccess() {
        return this.page.getByRole('heading', { level: 1, name: /produto cadastrado com sucesso/i });
    }

    productTable() {
        return this.page.getByRole('table');
    }

    tableRows() {
        return this.productTable().locator('tbody tr');
    }

    errorMessage() {
        return this.page.getByRole('alert');
    }

    listProductButton() {
        return this.page.getByRole('button', { name: /listar produtos/i });
    }

    waitForTableToLoad(productName?: string, timeoutMs = 15000): Promise<void> {
        this.productTable().waitFor({ state: 'visible' });

        if (productName) {
            const cellWithProduct = this.productTable().getByRole('cell', { name: new RegExp(productName, 'i') });
            return expect(cellWithProduct).toBeVisible({ timeout: timeoutMs });
        } else {
            return expect(this.tableRows().first()).toBeVisible({ timeout: timeoutMs });
        }
    }

    async findProductInTable(productName: string): Promise<Locator | null> {
        const cellWithProduct = this.productTable().getByRole('cell', { name: new RegExp(productName, 'i') });
        const row = cellWithProduct.locator('xpath=ancestor::tr');
        const count = await row.count();
        return count > 0 ? row.first() : null;
    }
}
