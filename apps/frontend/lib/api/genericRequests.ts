import axios from 'axios'
import { showError } from '../utils/toastHelpers'

const BASE_URL = process.env.NEXT_PUBLIC_BASEURL


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI3NDciLCJlbWFpbCI6ImFub3RoZXJyYW5kb21lbWFpbEBnbWFpbC5jb20iLCJwZXJzaXN0ZW50IjpmYWxzZSwiaXNNYWNoaW5lIjpmYWxzZX0.bAcP2jTvvQV8E5-u784gTaFw4pj0I2iSZrkBbnLKn08"


export async function getAll<TResponse>(url: string, params?: Record<string, any>): Promise<TResponse> {
    try {
        const { data } = await axios.get<TResponse>(`${BASE_URL}/${url}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            params,
        })
        return data
    } catch (error: any) {
        console.error('Erro em getAll:', error.response?.data || error.message)

        // Mostrar toast de erro
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido ao buscar dados'
        showError(`Erro ao buscar dados: ${errorMessage}`)

        throw error
    }
}

// localStorage.getItem('token')

export async function getById<TResponse>(url: string, id: number): Promise<TResponse> {
    try {
        const { data } = await axios.get<TResponse>(`${BASE_URL}/${url}/${id}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            }
        })
        return data
    } catch (error: any) {
        console.error('Erro em getById:', error.response?.data || error.message)

        // Mostrar toast de erro
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido ao buscar item'
        showError(`Erro ao buscar item: ${errorMessage}`)

        throw error
    }
}

export async function create<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
    try {
        const { data } = await axios.post<TResponse>(`${BASE_URL}/${url}`, body, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            }
        })
        return data
    } catch (error: any) {
        console.error('Erro em create:', error.response?.data || error.message)

        // Mostrar toast de erro
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido ao criar item'
        showError(`Erro ao criar item: ${errorMessage}`)

        throw error
    }
}

export async function update<TRequest, TResponse>(url: string, id: string | number, body: TRequest): Promise<TResponse | undefined> {
    console.log(`${BASE_URL}/${url}/${id}`)
    console.log(body)
    try {
        const { data } = await axios.put<TResponse>(`${BASE_URL}/${url}/${id}`, body, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            }
        })

        return data
    }
    catch (error: any) {
        console.log('Erro completo:', error)
        console.log('Dados do erro:', error.response?.data)

        // Mostrar toast de erro em vez de alert
        if (error.response?.data?.message) {
            showError(error.response.data.message)
        } else if (error.response?.data) {
            showError(`Erro ao atualizar: ${JSON.stringify(error.response.data)}`)
        } else {
            showError(`Erro ao atualizar: ${error.message || 'Erro desconhecido'}`)
        }

        return
    }
}

export async function remove<TResponse>(url: string, id: string | number): Promise<TResponse> {
    try {
        const { data } = await axios.delete<TResponse>(`${BASE_URL}/${url}/${id}`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            }
        })
        return data
    } catch (error: any) {
        console.error('Erro em remove:', error.response?.data || error.message)

        // Mostrar toast de erro
        const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido ao remover item'
        showError(`Erro ao remover item: ${errorMessage}`)

        throw error
    }
}
