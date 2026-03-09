import { apiClient } from './apiClient'
import { expect } from '@playwright/test'
import { User } from '../types/user'

export async function createUserViaAPI(userPayload: User) {
    const api = await apiClient()

    const response = await api.post('/usuarios', {
        data: userPayload
    })

    const id = response.ok() ? (await response.json())._id : null;

    expect(response.ok()).toBeTruthy()
    return id;
}

export async function deleteUserViaAPI(id: string) {
    const api = await apiClient()
    const response = await api.delete(`/usuarios/${id}`)

    expect(response.ok()).toBeTruthy()
}