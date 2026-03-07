import { LoginPage } from '../pages/LoginPage';

interface Credentials {
    email: string;
    password: string;
}

export class LoginHelper {
    static async loginAsAdmin(page: any, credentials: Credentials) {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(credentials.email, credentials.password);
        await loginPage.validatedLoginSuccess();
        return loginPage;
    }
}
