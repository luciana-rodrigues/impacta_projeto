import axios from 'axios'

const client = axios.create({
    baseURL: process.env.BACKEND // 'http://localhost:8000',
})

const ClientService = {
    insert: payload => client.post(`/clients`, payload),
    getAll: () => client.get(`/clients`),
    getById: (id) => client.get(`/clients/${id}`),
    updateById: (id, payload) => client.put(`/clients/${id}`, payload),
    deleteById: id => client.delete(`/clients/${id}`),
    search: nome => client.get(`/clients/nome/${nome}`)
}

export default ClientService
