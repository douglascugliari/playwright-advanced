import { test } from '../src/core/fixtures/test.fixture';
import { UserFactory } from '../src/core/factories/userFactory';
import { MessagesUser } from '../src/data/messages/messagesUser';

test.describe('User Registration', () => {
    test.beforeEach(async ({ registerPage }) => {
        await registerPage.goto();
    });

    test('TC-007: Successful new user registration', async ({ registerPage }) => {
        const user = UserFactory.getUser('success');
        await registerPage.registerUser(user.nome, user.email, user.password);
        await registerPage.verifyRegistrationSuccess();
    });

    test('TC-008: Registration with existing email', async ({ registerPage, testUser }) => {
        await registerPage.registerUser(testUser.nome, testUser.email, testUser.password);
        await registerPage.verifyRegistrationError();
    });

    test('TC-009: Registration with empty required fields', async ({ registerPage }) => {
        const messages = MessagesUser.getMessagesInvalid();
        await registerPage.registerUser('', '', '');
        await registerPage.verifyErrorMessageMultiple(messages);
    });
});
