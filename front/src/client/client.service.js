import axios from 'axios'

const client = axios.create({
    baseURL: 'http://localhost:8000',
})

const ClientService = {
    insert: payload => client.post(`/clients`, payload),
    getAll: () => client.get(`/clients`),
    getById: (id) => client.get(`/clients/${id}`),
    updateById: (id, payload) => client.put(`/clients/${id}`, payload),
    deleteById: id => client.delete(`/clients/${id}`),
    search: value => {
        return {
            data: [
                {
                    id: 1,
                    nome: 'João',
                    sobrenome: 'Silva',
                    telefone: '11 99999-9999',
                    email: 'joaosilva@email.com',
                    data_nasc: '01-01-2000',
                    data_ir: '01-01-2021'
                }
            ]
        }
        //client.get(`/clients/search?search=${value}`)
    }
}

export default ClientService
