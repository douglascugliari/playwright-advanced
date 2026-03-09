import { test as base } from '@playwright/test';
import { createUserViaAPI, deleteUserViaAPI } from '../../services/userService';
import type { User } from '../../types/user'; // case correto
import { UserFactory } from '../factories/userFactory';

type ApiFixtures = {
    testUser: User;
    createUser: (payload: User) => Promise<string | null>;
    deleteUser: (id: string) => Promise<void>;
};

export const test = base.extend<ApiFixtures>({
    testUser: async ({ }, use) => {
        const credentials = UserFactory.getUser('success');
        const id = await createUserViaAPI(credentials);
        if (!id) throw new Error('Falha ao criar usuário via API');

        const user: User = { ...credentials, id };
        try {
            await use(user);
        } finally {
            await deleteUserViaAPI(id);
        }
    },

    createUser: async ({ }, use) => {
        await use(createUserViaAPI);
    },

    deleteUser: async ({ }, use) => {
        await use(deleteUserViaAPI);
    },
});
