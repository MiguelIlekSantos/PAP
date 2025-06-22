import axios from 'axios'


const BASE_URL = process.env.NEXT_PUBLIC_BASEURL


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI3NDciLCJlbWFpbCI6ImFub3RoZXJyYW5kb21lbWFpbEBnbWFpbC5jb20iLCJwZXJzaXN0ZW50IjpmYWxzZSwiaXNNYWNoaW5lIjpmYWxzZX0.bAcP2jTvvQV8E5-u784gTaFw4pj0I2iSZrkBbnLKn08"


export async function getAll<TResponse>(url: string): Promise<TResponse> {
    const { data } = await axios.get<TResponse>(`${BASE_URL}/${url}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    })
    return data
}

// localStorage.getItem('token')

export async function getById<TResponse>(url: string, id: string | number): Promise<TResponse> {
    const { data } = await axios.get<TResponse>(`${BASE_URL}/${url}/${id}`)
    return data
}

export async function create<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
    const { data } = await axios.post<TResponse>(`${BASE_URL}/${url}`, body)
    return data
}

export async function update<TRequest, TResponse>(url: string, id: string | number, body: TRequest): Promise<TResponse> {
    const { data } = await axios.patch<TResponse>(`${BASE_URL}/${url}/${id}`, body)
    return data
}

export async function remove<TResponse>(url: string, id: string | number): Promise<TResponse> {
    const { data } = await axios.delete<TResponse>(`${BASE_URL}/${url}/${id}`)
    return data
}
