import { test } from '@playwright/test';
import { UserFactory } from '../src/data/factories/userFactory';
import { ProductFactory } from '../src/data/factories/productFactory';
import { MessagesProduct } from '../src/data/messages/messagesProduct';
import { ProductPage } from '../src/pages/ProductPage';
import { LoginHelper } from '../src/utils/loginHelper';
import { TestUser } from '../src/types/testUser';

test.describe('Product Management', () => {
    let productPage: ProductPage;
    let credentialsDelete: TestUser[] = [];


    test.beforeEach(async ({ page }) => {
        const credentials = UserFactory.getUser('success');
        const response = await UserFactory.createUserApi(page, credentials);
        credentials.id = (await response.json())._id;
        await LoginHelper.loginAsAdmin(page, credentials);
        productPage = new ProductPage(page);
        await productPage.goto();
        credentialsDelete.push(credentials);
    });

    test.afterEach(async ({ page }) => {
        for (const credentials of credentialsDelete) {
            await UserFactory.deleteUserApi(page, credentials.id!);
        }
        credentialsDelete = [];
    });

    test('TC-010: Register new product successfully', async ({ page }) => {
        const productSuccess = ProductFactory.getRegisterProduct("success");
        await productPage.registerProduct(productSuccess.name, productSuccess.price, productSuccess.description, productSuccess.quantity);
        await productPage.verifyProductRegistrationSuccess(productSuccess.name);
    });

    test('TC-011: Register product with invalid fields', async ({ page }) => {
        const expectedMessages = MessagesProduct.getExpectedMessagesError();
        const productInvalid = ProductFactory.getRegisterProduct("fail");
        await productPage.registerProduct(productInvalid.name, productInvalid.price, productInvalid.description, productInvalid.quantity);
        await productPage.verifyErrorMessageMultiple(expectedMessages);
    });

    test('TC-012: Register product with empty fields', async ({ page }) => {
        const expectedMessages = MessagesProduct.getExpectedMessagesErrorValidation();
        const productEmpty = ProductFactory.getRegisterProduct("empty");
        await productPage.registerProduct(productEmpty.name, productEmpty.price, productEmpty.description, productEmpty.quantity);
        await productPage.verifyErrorMessageMultiple(expectedMessages);
    });

    test('TC-013: Delete product', async ({ page }) => {
        const productDelete = ProductFactory.getRegisterProduct("delete");
        await productPage.registerProduct(productDelete.name, productDelete.price, productDelete.description, productDelete.quantity);
        await productPage.deleteProduct(productDelete.name);
        await productPage.verifyProductDeleteSuccess(productDelete.name);
    });

    test('TC-014: Register product with duplicate name', async ({ page }) => {
        const expectedMessage = MessagesProduct.getExpectedMessagesProductDuplicated();
        const productRegister = ProductFactory.getRegisterProduct("success");
        await productPage.registerProduct(productRegister.name, productRegister.price, productRegister.description, productRegister.quantity)
        await productPage.verifyProductRegistrationSuccess(productRegister.name)
        await productPage.registerProductDuplcate(productRegister.name, productRegister.price, productRegister.description, productRegister.quantity)
        await productPage.verifyErrorMessageDuplicated(expectedMessage);
    });
});
