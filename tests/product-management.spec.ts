import { test } from '@playwright/test';
import { createUserViaAPI, deleteUserViaAPI } from '../src/services/userService';
import { UserFactory } from '../src/core/factories/userFactory';
import { ProductFactory } from '../src/core/factories/productFactory';
import { MessagesProduct } from '../src/data/messages/messagesProduct';
import { ProductPage } from '../src/pages/ProductPage';
import { LoginHelper } from '../src/utils/loginHelper';
import { User } from '../src/types/user';
import { ProductAPI } from '../src/utils/productAPI';

test.describe('Product Management', () => {
    let productPage: ProductPage;
    let credentialsDelete: User[] = [];
    let productIdDelete: string[] = [];
    const productApi = new ProductAPI();

    test.beforeEach(async ({ page }) => {
        const credentials = UserFactory.getUser('success');
        const response = await createUserViaAPI(credentials);
        credentials.id = response;
        await LoginHelper.loginAsAdmin(page, credentials);
        productPage = new ProductPage(page);
        await productPage.goto();
        credentialsDelete.push(credentials);
    });

    test.afterEach(async ({ page }) => {
        for (const credentials of credentialsDelete) {
            await deleteUserViaAPI(credentials.id!);
        }
        credentialsDelete = [];
    });

    test('TC-010: Register new product successfully', async ({ page }) => {
        const productSuccess = ProductFactory.getRegisterProduct("success");
        await productPage.registerProduct(productSuccess.nome, productSuccess.preco, productSuccess.descricao, productSuccess.quantidade);
        await productPage.verifyProductRegistrationSuccess(productSuccess.nome);
    });

    test('TC-011: Register product with invalid fields', async ({ page }) => {
        const expectedMessages = MessagesProduct.getExpectedMessagesError();
        const productInvalid = ProductFactory.getRegisterProduct("fail");
        await productPage.registerProduct(productInvalid.nome, productInvalid.preco, productInvalid.descricao, productInvalid.quantidade);
        await productPage.verifyErrorMessageMultiple(expectedMessages);
    });

    test('TC-012: Register product with empty fields', async ({ page }) => {
        const expectedMessages = MessagesProduct.getExpectedMessagesErrorValidation();
        const productEmpty = ProductFactory.getRegisterProduct("empty");
        await productPage.registerProduct(productEmpty.nome, productEmpty.preco, productEmpty.descricao, productEmpty.quantidade);
        await productPage.verifyErrorMessageMultiple(expectedMessages);
    });

    test('TC-013: Delete product', async () => {
        const p = ProductFactory.getRegisterProduct('delete');
        await productPage.registerProduct(p.nome, p.preco, p.descricao, p.quantidade);
        await productPage.verifyProductRegistrationSuccess(p.nome);
        await productPage.deleteProduct(p.nome);
        await productPage.verifyProductDeleteSuccess(p.nome);
    });

    test('TC-014: Register product with duplicate name', async ({ page }) => {
        const expectedMessage = MessagesProduct.getExpectedMessagesProductDuplicated();
        const productRegister = ProductFactory.getRegisterProduct("success");

        const response = await productApi.createProductViaAPI(page.request, {
            nome: productRegister.nome,
            preco: productRegister.preco,
            descricao: productRegister.descricao,
            quantidade: productRegister.quantidade
        });
        console.log('Response status:', response.status());
        await productPage.registerProductDuplcate(productRegister.nome, productRegister.preco, productRegister.descricao, productRegister.quantidade)
        await productPage.verifyErrorMessageDuplicated(expectedMessage);
    });
});
