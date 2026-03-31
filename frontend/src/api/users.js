import { apiClient } from "./client"

export const getUsers = async () => {
    const data = await apiClient.get('/users')
    return data.data.users
}

export const getUser = async (id) => {
    const data = await apiClient.get(`/users/${id}`)
    return data.data
}

export const putUser = async(id, user) => {
    const data = await apiClient.put(`/users/${id}`, user)
    return data.data.user
}

export const deleteUser = async (id) => {
    const data = await apiClient.delete(`/users/${id}`)
    return data.data
}
