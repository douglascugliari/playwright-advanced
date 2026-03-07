import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { UserFactory } from '../src/data/factories/userFactory';
import { MessagesLogin } from '../src/data/messages/messagesLogin';
import { TestUser } from '../src/types/testUser';

test.describe('Authentication and Login', () => {
    let loginPage: LoginPage;
    let credentialsDelete: TestUser[] = [];

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    })

    test.afterEach(async ({ page }) => {
        for (const credentials of credentialsDelete) {
            await UserFactory.deleteUserApi(page, credentials.id!);
        }
        credentialsDelete = [];
    });

    test('TC-001: Login with valid credentials', async ({ page }) => {
        const credentials = UserFactory.getUser('success');
        await UserFactory.createUserApi(page, credentials);
        await loginPage.login(credentials.email, credentials.password);
        await loginPage.validatedLoginSuccess();
    });

    test('TC-002: Login with invalid credentials', async ({ page }) => {
        const credentials = UserFactory.getUser('fail');

        await loginPage.login(credentials.email, credentials.password);
        await loginPage.validatedLoginFailure('Email e/ou senha inválidos')
    });

    test('TC-003: Login with empty fields', async ({ page }) => {
        await loginPage.login('', '');
        await loginPage.validatedLoginFailureMultiple()
    });

    test('TC-004: Email format validation', async ({ page }) => {
        const credentials = UserFactory.getUser('email');
        const invalidEmailMessages = MessagesLogin.getMessagesInvalidEmail();

        await loginPage.login(credentials.email, credentials.password);
        await loginPage.validatedLoginFailureInput(invalidEmailMessages);
    });

    test('TC-005: Redirection based on user profile', async ({ page }) => {
        const credentials = UserFactory.getUser('success');
        await UserFactory.createUserApi(page, credentials);
        await loginPage.login(credentials.email, credentials.password);
        await loginPage.validatedLoginAdminArea();
    });
});
