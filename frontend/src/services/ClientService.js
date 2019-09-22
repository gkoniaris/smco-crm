import ApiService from './ApiService.js'

class ClientService extends ApiService {
    constructor() {
        super()
        this.entity = 'client'
    }

    create (client) {
        const data = {} 
        Object.keys(client).forEach(field => {
            if (client[field] !== '' && client[field] != null) {
                data[field] = client[field]
            }
        })
        data.address = {}
        Object.keys(client.address).forEach(field => {
            if (client.address[field] !== '' && client.address[field] != null) {
                data.address[field] = client.address[field]
            }
        })
        if (Object.keys(data.address).length === 0) delete data.address
        return super.create(data)
    }

    update (client) {
        const data = {}

        Object.keys(client).forEach(field => {
            if (client[field] !== '' && client[field] != null) {
                data[field] = client[field]
            }
        })

        if (client.address && Object.keys(client.address).length !== 0) {
            data.address = {}

            Object.keys(client.address).forEach(field => {
                if (client.address[field] !== '' && client.address[field] != null) {
                    data.address[field] = client.address[field]
                }
            })
        }

        const id = data.id
        delete data.id

        return super.update(id, data)
    }
}

export default new ClientService()