import { apiClient } from './apiClient'
import type { ProductType } from '../types/ProductType'


export async function createProductAPI(productPayload: ProductType, token: string) {
    const api = await apiClient()
    try {
        const response = await api.post('/produtos', {
            data: productPayload,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const body = await response.json();

        if (response.status() !== 201) {
            throw new Error(`Falha ao criar produto via API. Status: ${response.status()} | Body: ${JSON.stringify(body)}`);
        }

        return body._id as string;
    } finally {
        await api.dispose();
    }
}

export async function deleteProductAPI(productId: string, token: string) {
    const api = await apiClient()
    try {
        const response = await api.delete(`/produtos/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const body = await response.json();

        if (response.status() !== 200) {
            throw new Error(`Falha ao excluir produto via API. Status: ${response.status()} | Body: ${JSON.stringify(body)}`);
        }
    } finally {
        await api.dispose();
    }
}
