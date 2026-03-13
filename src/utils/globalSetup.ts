import { chromium, FullConfig } from '@playwright/test';
import { createUserViaAPI, getTokenViaAPI } from '../services/userService';
import { UserFactory } from '../core/factories/userFactory';
import { env } from '../../config/env';

async function globalSetup(config: FullConfig) {
    const credentials = UserFactory.getUser('success');
    const createUserResponse = await createUserViaAPI(credentials);

    if (!createUserResponse) {
        throw new Error('Failed to create user');
    }

    const token = await getTokenViaAPI(credentials.email, credentials.password);

    if (!token) {
        throw new Error('Failed to get authentication token');
    }

    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto(env.baseUrl);

    await page.evaluate(({ email, token }: { email: string, token: string }) => {
        localStorage.setItem('serverest/userEmail', email);
        localStorage.setItem('serverest/userNome', 'Fulano da Silva');
        localStorage.setItem('serverest/userToken', `Bearer ${token}`);
    }, { email: credentials.email, token });

    await context.storageState({
        path: 'storageState.json'
    });

    await browser.close();
}

export default globalSetup;