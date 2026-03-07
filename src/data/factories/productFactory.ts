import { faker } from '@faker-js/faker/locale/pt_BR';

export interface ProductData {
    name: string;
    price: string;
    description: string;
    quantity: string;
}

export class ProductFactory {

    static readonly REGISTER_PRODUCT_SUCCESS: ProductData = {
        name: faker.commerce.productName(),
        price: faker.commerce.price({ min: 1, max: 1000, dec: 0 }),
        description: faker.commerce.productDescription(),
        quantity: faker.number.int({ min: 1, max: 100 }).toString()
    };

    static readonly REGISTER_PRODUCT_FAILUARE: ProductData = {
        name: faker.commerce.productName(),
        price: '-1',
        description: 'Descrição do produto inválido',
        quantity: '-1'
    }

    static readonly REGISTER_PRODUCT_EMPTY: ProductData = {
        name: '',
        price: '',
        description: '',
        quantity: ''
    }

    static readonly DELETE_PRODUCT: ProductData = {
        name: 'Produto Excluído',
        price: faker.commerce.price({ min: 1, max: 1000, dec: 0 }),
        description: 'Descrição do produto a ser excluído',
        quantity: faker.number.int({ min: 1, max: 100 }).toString()
    };

    static getRegisterProduct(type: string): ProductData {
        const timestamp = Date.now();
        switch (type) {
            case "success":
                return {
                    ...this.REGISTER_PRODUCT_SUCCESS,
                    name: `${this.REGISTER_PRODUCT_SUCCESS.name} ${timestamp}`
                }
            case "fail":
                return this.REGISTER_PRODUCT_FAILUARE;
            case "empty":
                return this.REGISTER_PRODUCT_EMPTY;
            case "delete":
                return this.DELETE_PRODUCT;
            default:
                return this.REGISTER_PRODUCT_SUCCESS;
        }
    }

}