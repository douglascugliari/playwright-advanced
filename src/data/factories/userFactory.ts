import { expect } from '@playwright/test';
import { faker } from "@faker-js/faker/locale/pt_BR";
import { TestUser } from "../../types/testUser";
import { UserApi } from "../../utils/userApi";


export class UserFactory {
    private static generateSuccessUser(): TestUser {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            description: 'User from success test',
            administrador: 'true'
        };
    }

    private static generateFailureUser(): TestUser {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            description: 'User from fail test',
            administrador: 'false'
        };
    }

    private static generateInvalidEmailUser(): TestUser {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email().replace('@', ''),
            password: faker.internet.password(),
            description: 'User with invalid email format',
            administrador: 'true'
        };
    }

    static async createUserApi(page: any, userPayload: TestUser) {
        const userApi = new UserApi();
        const response = await userApi.createUserViaAPI(page.request, {
            nome: userPayload.nome,
            email: userPayload.email,
            password: userPayload.password,
            administrador: userPayload.administrador
        });

        expect(response.ok()).toBeTruthy();
        return response;
    }

    static async deleteUserApi(page: any, id: string) {
        const userApi = new UserApi();
        const response = await userApi.deleteUserViaAPI(page.request, id);

        expect(response.ok()).toBeTruthy();
    }

    static getUser(type: string): TestUser {
        switch (type) {
            case 'success':
                return this.generateSuccessUser();
            case 'fail':
                return this.generateFailureUser();
            case 'email':
                return this.generateInvalidEmailUser();
            default:
                return this.getUser('success');
        }
    }
}
