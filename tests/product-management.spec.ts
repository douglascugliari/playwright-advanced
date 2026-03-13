import { test } from '../src/core/fixtures/test.fixture';
import { ProductFactory } from '../src/core/factories/productFactory';
import { MessagesProduct } from '../src/data/messages/messagesProduct';
import { createProductAPI, deleteProductAPI } from '../src/services/productService';

test.describe('Product Management', () => {
    let productIdDelete: string[] = [];


    test.beforeEach(async ({ productPage }) => {
        await productPage.goto();
    });

    test.afterEach(async ({ token }) => {
        for (const productId of productIdDelete) {
            await deleteProductAPI(productId, token);
        }
        productIdDelete = [];
    });

    test('TC-010: Register new product successfully', async ({ productPage }) => {
        const productSuccess = ProductFactory.getRegisterProduct("success");
        await productPage.registerProduct(productSuccess.nome, productSuccess.preco, productSuccess.descricao, productSuccess.quantidade);
        await productPage.verifyProductRegistrationSuccess(productSuccess.nome);
    });

    test('TC-011: Register product with invalid fields', async ({ productPage }) => {
        const expectedMessages = MessagesProduct.getExpectedMessagesError();
        const productInvalid = ProductFactory.getRegisterProduct("fail");
        await productPage.registerProduct(productInvalid.nome, productInvalid.preco, productInvalid.descricao, productInvalid.quantidade);
        await productPage.verifyErrorMessageMultiple(expectedMessages);
    });

    test('TC-012: Register product with empty fields', async ({ productPage }) => {
        const expectedMessages = MessagesProduct.getExpectedMessagesErrorValidation();
        const productEmpty = ProductFactory.getRegisterProduct("empty");
        await productPage.registerProduct(productEmpty.nome, productEmpty.preco, productEmpty.descricao, productEmpty.quantidade);
        await productPage.verifyErrorMessageMultiple(expectedMessages);
    });

    test('TC-013: Delete product', async ({ productPage }) => {
        const p = ProductFactory.getRegisterProduct('delete');
        await productPage.registerProduct(p.nome, p.preco, p.descricao, p.quantidade);
        await productPage.verifyProductRegistrationSuccess(p.nome);
        await productPage.deleteProduct(p.nome);
        await productPage.verifyProductDeleteSuccess(p.nome);
    });

    test('TC-014: Register product with duplicate name', async ({ productPage, token }) => {
        const expectedMessage = MessagesProduct.getExpectedMessagesProductDuplicated();
        const productRegister = ProductFactory.getRegisterProduct("success");

        const productId = await createProductAPI({
            nome: productRegister.nome,
            preco: productRegister.preco,
            descricao: productRegister.descricao,
            quantidade: productRegister.quantidade
        }, token);
        productIdDelete.push(productId);
        await productPage.registerProductDuplcate(productRegister.nome, productRegister.preco, productRegister.descricao, productRegister.quantidade)
        await productPage.verifyErrorMessageDuplicated(expectedMessage);
    });
});
