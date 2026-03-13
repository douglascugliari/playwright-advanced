import { test } from '../src/core/fixtures/test.fixture';
import { UserFactory } from '../src/core/factories/userFactory';
import { MessagesLogin } from '../src/data/messages/messagesLogin';

test.describe('Authentication and Login', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    })

    test('TC-001: Login with valid credentials', async ({ loginPage, testUser }) => {
        await loginPage.login(testUser.email, testUser.password);
        await loginPage.validatedLoginSuccess();
    });

    test('TC-002: Login with invalid credentials', async ({ loginPage }) => {
        const credentials = UserFactory.getUser('fail');

        await loginPage.login(credentials.email, credentials.password);
        await loginPage.validatedLoginFailure('Email e/ou senha inválidos')
    });

    test('TC-003: Login with empty fields', async ({ loginPage }) => {
        await loginPage.login('', '');
        await loginPage.validatedLoginFailureMultiple()
    });

    test('TC-004: Email format validation', async ({ loginPage }) => {
        const credentials = UserFactory.getUser('email');
        const invalidEmailMessages = MessagesLogin.getMessagesInvalidEmail();

        await loginPage.login(credentials.email, credentials.password);
        await loginPage.validatedLoginFailureInput(invalidEmailMessages);
    });

    test('TC-005: Redirection based on user profile', async ({ loginPage, testUser }) => {
        await loginPage.login(testUser.email, testUser.password);
        await loginPage.validatedLoginAdminArea();
    });
});
