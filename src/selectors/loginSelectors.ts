
import { Page } from "@playwright/test";

export class LoginSelectors {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    emailInput() {
        return this.page.getByRole('textbox', { name: /email/i });
    }

    passwordInput() {
        return this.page.getByRole('textbox', { name: /senha/i });
    }

    loginButton() {
        return this.page.getByRole('button', { name: /entrar/i });
    }

    registerLink() {
        return this.page.getByRole('link', { name: /cadastre-se/i });
    }

    loginHeading() {
        return this.page.getByRole('heading', { name: /login/i });
    }

    errorMessages() {
        return this.page.getByRole('alert');
    }

    messageWelcome() {
        return this.page.getByRole('heading', { name: 'Bem vindo' });
    }
}
