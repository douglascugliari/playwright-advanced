import { test } from '@playwright/test';
import { RegisterUserPage } from '../src/pages/RegisterUserPage';
import { UserFactory } from '../src/data/factories/userFactory';
import { MessagesUser } from '../src/data/messages/messagesUser';
import { TestUser } from '../src/types/testUser';

test.describe('User Registration', () => {
    let registerPage: RegisterUserPage;
    let credentialsDelete: TestUser[] = [];

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterUserPage(page);
        await registerPage.goto();
    });

    test.afterEach(async ({ page }) => {
        for (const credentials of credentialsDelete) {
            await UserFactory.deleteUserApi(page, credentials.id!);
        }
        credentialsDelete = [];
    });

    test('TC-007: Successful new user registration', async ({ page }) => {
        const user = UserFactory.getUser('success');
        await registerPage.registerUser(user.nome, user.email, user.password);
        await registerPage.verifyRegistrationSuccess();
    });

    test('TC-008: Registration with existing email', async ({ page }) => {
        const user = UserFactory.getUser('fail');
        await UserFactory.createUserApi(page, user);
        credentialsDelete.push(user);
        await registerPage.registerUser(user.nome, user.email, user.password);
        await registerPage.verifyRegistrationError();
    });

    test('TC-009: Registration with empty required fields', async ({ page }) => {
        const messages = MessagesUser.getMessagesInvalid();
        await registerPage.registerUser('', '', '');
        await registerPage.verifyErrorMessageMultiple(messages);
    });
});
