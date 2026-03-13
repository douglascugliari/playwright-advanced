import { faker } from "@faker-js/faker/locale/pt_BR";
import { UserType } from "../../types/UserType";

export class UserFactory {
    private static generateSuccessUser(): UserType {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: 'true'
        };
    }

    private static generateFailureUser(): UserType {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: 'false'
        };
    }

    private static generateInvalidEmailUser(): UserType {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email().replace('@', ''),
            password: faker.internet.password(),
            administrador: 'true'
        };
    }

    static getUser(type: string): UserType {
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
