import { faker } from "@faker-js/faker/locale/pt_BR";
import { ProductType } from "../../types/ProductType";

export class ProductFactory {
    private static generateSuccessProduct(): ProductType {
        return {
            nome: faker.commerce.productName(),
            preco: parseFloat(faker.commerce.price()).toFixed(0).toString(),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100 }).toString()
        };
    }

    private static generateFailureProduct(): ProductType {
        return {
            nome: faker.commerce.productName(),
            preco: '-1',
            descricao: faker.commerce.productDescription(),
            quantidade: '-1'
        };
    }

    private static generateEmptyProduct(): ProductType {
        return {
            nome: '',
            preco: '',
            descricao: '',
            quantidade: ''
        };
    }

    private static generateDeleteProduct(): ProductType {
        return {
            nome: faker.commerce.productName(),
            preco: parseFloat(faker.commerce.price()).toFixed(0).toString(),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100 }).toString()
        };
    }

    static getRegisterProduct(type: string): ProductType {
        switch (type) {
            case 'success':
                return this.generateSuccessProduct();
            case 'fail':
                return this.generateFailureProduct();
            case 'delete':
                return this.generateDeleteProduct();
            case 'empty':
                return this.generateEmptyProduct();
            default:
                return this.getRegisterProduct('success');
        }
    }
}
