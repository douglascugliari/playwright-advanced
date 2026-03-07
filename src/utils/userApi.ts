import type { APIRequestContext } from '@playwright/test';
import { TestUser } from '../types/testUser';

export class UserApi {

    async createUserViaAPI(request: APIRequestContext, userPayload: TestUser) {
        const response = await request.post('https://serverest.dev/usuarios', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: userPayload
        });

        return response;
    }

    async deleteUserViaAPI(request: APIRequestContext, id: string) {
        const deleteResponse = await request.delete(`https://serverest.dev/usuarios/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return deleteResponse;
    }
}
