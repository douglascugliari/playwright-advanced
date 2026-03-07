import { expect, Page } from "@playwright/test";
import { RegisterUserSelectors } from "../selectors/registerUserSelectors.ts";

export class RegisterUserPage {
    readonly page: Page;
    readonly selectors: RegisterUserSelectors;

    constructor(page: Page) {
        this.page = page;
        this.selectors = new RegisterUserSelectors(page);
    }

    async goto() {
        await this.page.goto('/cadastrarusuarios');
        await this.page.waitForLoadState('networkidle');
    }

    async registerUser(name: string, email: string, password: string) {
        await this.selectors.nameInput().fill(name);
        await this.selectors.emailInput().fill(email);
        await this.selectors.passwordInput().fill(password);
        await this.selectors.registerButton().click();
    }

    async verifyRegistrationSuccess() {
        await this.selectors.successMessage().waitFor({ state: 'visible' });
        await expect(this.selectors.successMessage()).toBeVisible();
    }

    async verifyRegistrationError() {
        await this.selectors.errorMessage().waitFor({ state: 'visible' });
        await expect(this.selectors.errorMessage()).toBeVisible();
    }

    async verifyErrorMessageMultiple(messages: string[]) {
        await this.page.waitForSelector('[role="alert"]', { state: 'visible' });
        for (const message of messages) {
            await expect(this.page.getByRole('alert').filter({ hasText: message })).toBeVisible();
        }
    }
}
