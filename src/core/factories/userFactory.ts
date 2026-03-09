import { faker } from "@faker-js/faker/locale/pt_BR";
import { User } from "../../types/user";

export class UserFactory {
    private static generateSuccessUser(): User {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            description: 'User from success test',
            administrador: 'true'
        };
    }

    private static generateFailureUser(): User {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            description: 'User from fail test',
            administrador: 'false'
        };
    }

    private static generateInvalidEmailUser(): User {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email().replace('@', ''),
            password: faker.internet.password(),
            description: 'User with invalid email format',
            administrador: 'true'
        };
    }

    static getUser(type: string): User {
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
