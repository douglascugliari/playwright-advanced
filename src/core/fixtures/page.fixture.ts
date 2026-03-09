import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage'
import { RegisterUserPage } from '../../pages/RegisterUserPage';

type Fixtures = {
    loginPage: LoginPage;
    productPage: ProductPage;
    registerPage: RegisterUserPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    registerPage: async ({ page }, use) => {
        await use(new RegisterUserPage(page));
    }

});

export { expect } from '@playwright/test';