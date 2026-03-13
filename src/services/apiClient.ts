import { request } from '@playwright/test'
import { env } from '../../config/env';

export async function apiClient() {
    const baseURL = env.apiUrl;
    if (!baseURL) {
        throw new Error('BASE_URL_API não foi definida nas variáveis de ambiente.');
    }

    return await request.newContext({
        baseURL,
        extraHTTPHeaders: {
            'Content-Type': 'application/json'
        }
    })

}
