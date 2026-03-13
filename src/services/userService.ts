import { apiClient } from './apiClient'
import { UserType } from '../types/UserType'

export async function createUserViaAPI(userPayload: UserType) {
    const api = await apiClient()
    try {
        const response = await api.post('/usuarios', {
            data: userPayload
        })
        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Falha ao criar usuário via API. Status: ${response.status()} | Body: ${JSON.stringify(body)}`);
        }

        return body._id ?? null;
    } finally {
        await api.dispose();
    }
}

export async function deleteUserViaAPI(id: string) {
    const api = await apiClient()
    try {
        const response = await api.delete(`/usuarios/${id}`)
        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Falha ao excluir usuário via API. Status: ${response.status()} | Body: ${JSON.stringify(body)}`);
        }
    } finally {
        await api.dispose();
    }
}
export async function getTokenViaAPI(email: string, password: string): Promise<string> {
    const api = await apiClient()
    try {
        const response = await api.post('/login', {
            data: {
                email,
                password
            }
        })
        const body = await response.json();

        if (!response.ok()) {
            throw new Error(`Falha ao obter token via API. Status: ${response.status()} | Body: ${JSON.stringify(body)}`);
        }

        const tokenSemBearer = body.authorization.replace('Bearer ', '');
        return tokenSemBearer;

    } finally {
        await api.dispose();
    }
}