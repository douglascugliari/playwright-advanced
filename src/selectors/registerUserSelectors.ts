import { Page } from "@playwright/test";

export class RegisterUserSelectors {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    nameInput() {
        return this.page.getByRole('textbox', { name: 'Nome' });
    }

    emailInput() {
        return this.page.getByRole('textbox', { name: 'Email' });
    }

    passwordInput() {
        return this.page.getByRole('textbox', { name: 'Senha' });
    }

    registerButton() {
        return this.page.getByRole('button', { name: 'Cadastrar' });
    }

    successMessage() {
        return this.page.getByText('Cadastro realizado com sucesso');
    }

    errorMessage() {
        return this.page.getByText('Este email já está sendo usado');
    }

}