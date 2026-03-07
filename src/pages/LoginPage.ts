
import { Page, expect } from '@playwright/test';
import { LoginSelectors } from '../selectors/loginSelectors';

export class LoginPage {

    private page: Page;
    private loginSelectors: LoginSelectors;

    constructor(page: Page) {
        this.page = page;
        this.loginSelectors = new LoginSelectors(page);
    }

    async goto() {
        await this.page.goto('/login');
        await this.page.waitForLoadState('networkidle');
    }


    async login(email: string, password: string) {
        await this.loginSelectors.emailInput().fill(email);
        await this.loginSelectors.passwordInput().fill(password);
        await this.loginSelectors.loginButton().click();
    }

    async validatedLoginSuccess(expectedWelcomeText: string | RegExp = /bem vindo/i) {
        await this.loginSelectors.messageWelcome().waitFor({ state: 'visible', timeout: 10000 });
        await expect(this.loginSelectors.messageWelcome()).toBeVisible();
        await expect(this.loginSelectors.messageWelcome()).toContainText(expectedWelcomeText);
    }

    async validatedLoginFailure(expectedText: string) {
        await expect(this.loginSelectors.errorMessages()).toBeVisible();
        await expect(this.loginSelectors.errorMessages()).toContainText(expectedText);
    }

    async validatedLoginFailureMultiple() {
        await expect(this.loginSelectors.errorMessages().filter({ hasText: 'Email é obrigatório' })).toBeVisible();
        await expect(this.loginSelectors.errorMessages().filter({ hasText: 'Password é obrigatório' })).toBeVisible();
    }

    async validatedLoginFailureInput(expectText: string[]) {
        const validationMessage = await this.loginSelectors.emailInput().evaluate(
            (el: HTMLInputElement) => el.validationMessage
        );

        const oneExpectedContainedInValidation = expectText.some(msg =>
            validationMessage != null && validationMessage.includes(msg)
        );

        expect(oneExpectedContainedInValidation,
            `Mensagem esperada: uma de [${expectText.join(', ')}] deve estar contida em "${validationMessage}"`).toBe(true);
    }

    async validatedLoginAdminArea() {
        await this.loginSelectors.messageWelcome().waitFor({ state: 'visible' });
        await expect(this.page).toHaveURL(/\/admin\/home$/);
    }
}
