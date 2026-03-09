import { expect } from '@playwright/test';
import { faker } from "@faker-js/faker/locale/pt_BR";
import { Product } from "../../types/product";
import { ProductAPI } from "../../utils/productAPI";

export class ProductFactory {
    private static generateSuccessProduct(): Product {
        return {
            nome: faker.commerce.productName(),
            preco: parseFloat(faker.commerce.price()).toString(),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100 }).toString()
        };
    }

    private static generateFailureProduct(): Product {
        return {
            nome: faker.commerce.productName(),
            preco: parseFloat(faker.commerce.price()).toString(),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100 }).toString()
        };
    }

    private static generateEmptyProduct(): Product {
        return {
            nome: '',
            preco: '',
            descricao: '',
            quantidade: ''
        };
    }

    private static generateDeleteProduct(): Product {
        return {
            nome: faker.commerce.productName(),
            preco: parseFloat(faker.commerce.price()).toString(),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.number.int({ min: 1, max: 100 }).toString()
        };
    }

    static async createProductApi(page: any, productPayload: Product) {
        const productApi = new ProductAPI();
        const response = await productApi.createProductViaAPI(page.request, {
            nome: productPayload.nome,
            preco: productPayload.preco,
            descricao: productPayload.descricao,
            quantidade: productPayload.quantidade
        });
    }

    static async deleteProductApi(page: any, id: string) {
        const productApi = new ProductAPI();
        const response = await productApi.deleteProductViaAPI(page.request, id);

        expect(response.ok()).toBeTruthy();
    }

    static getRegisterProduct(type: string): Product {
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
