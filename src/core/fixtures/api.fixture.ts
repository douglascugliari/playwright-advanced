import { createUserViaAPI, deleteUserViaAPI, getTokenViaAPI } from '../../services/userService';
import { UserType } from '../../types/UserType';
import { UserFactory } from '../factories/userFactory';

export type ApiFixtures = {
    testUser: UserType;
    createUser: (payload: UserType) => Promise<string | null>;
    deleteUser: (id: string) => Promise<void>;
    token: string;
};

export const apiFixtures = {
    testUser: async ({ }, use) => {
        const credentials = UserFactory.getUser('success');
        const id = await createUserViaAPI(credentials);
        if (!id) throw new Error('Falha ao criar usuário via API');

        const user: UserType = { ...credentials, id };
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

    token: async ({ }, use) => {
        const credentials = UserFactory.getUser('success');
        const id = await createUserViaAPI(credentials);
        const token = await getTokenViaAPI(credentials.email, credentials.password);
        await use(token);
    }
};
