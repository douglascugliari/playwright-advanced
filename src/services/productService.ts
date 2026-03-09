import { apiClient } from './apiClient'
import { expect } from '@playwright/test'
import type { Product } from '../types/Product'

export class ProductService {

    private apiContext = apiClient()

    async createProduct(productPayload: Product) {
        const response = await (await this.apiContext).post('/produtos', {
            data: productPayload
        })
        expect(response.status()).toBe(201)
        return response.json()
    }

    async deleteProduct(productId: string) {
        const response = await (await this.apiContext).delete(`/produtos/${productId}`)
        expect(response.status()).toBe(200)
        return response.json()
    }
}