const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sequelize = require('../models')
const Client = require('../models/client.js')
const Address = require('../models/address')
const Phone = require('../models/phone')
const config = require('../config.js')

const clientsLimit = 10

const addressInclude = {
    model: Address,
    attributes: [
        'id',
        'address',
        'bell',
        'city',
        'floor',
        'lat',
        'lon',
        'postalCode',
        'region'
    ]
}

const phoneInclude = { 
    model: Phone, 
    attributes: [
        'id',
        'phone',
        'type'
    ]
}
class ClientService {
    async find(userId, id) {
        const query = {
            where: {
                id
            },
            include: [addressInclude, phoneInclude],
            subQuery: false
        }

        if (!config.sharedUsers) {
            query.where.userId = userId
        }
        return Client.findOne(query)
        .then(client => {
            return client
        })
    }

    async get (userId, {sort = 'id', order = 'asc', page = 1, search = null} = {}) {
        const query = {
            subQuery: false,
            distinct: true,
            where: {
                [Op.and]: []
            },
            include: [addressInclude, phoneInclude],
            order: [[sort, order]],
            limit: clientsLimit,
            offset: (page - 1) * clientsLimit
        }

        if (!config.sharedUsers) {
            query.where[Op.and].push({
                userId
            })
        }

        if(search) {
            let searchQuery = search.split(' ').join('* +')
            if (!searchQuery.includes('+')) {
                searchQuery = '+' + searchQuery + '*'
            } else {
                searchQuery = '+' + searchQuery + '*'
            }

            query.where[Op.and].push({
                [Op.or]: [
                    sequelize.literal(`MATCH(last_name, first_name) AGAINST ("${searchQuery}" IN BOOLEAN MODE)`),
                    sequelize.literal(`phones.phone LIKE "${search}%"`),
                    sequelize.literal(`addresses.address LIKE "%${search}%"`)
                ]
            })
        }

        return Client.findAndCountAll(query)
        .then(results => {
            const clients = results.rows
            const count = results.count
            const pages = Math.ceil(count / clientsLimit)
            return {clients, count, pages}
        })
    }

    async create (data, userId) {
        const clientData = Object.assign({}, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email || null,
            userId
        })

        const addressData = data.address
        return sequelize.transaction(async (transaction) => {
            const client = await Client.create(clientData, {transaction})
            if (data.address) {
                addressData.clientId = client.id
                await Address.create(addressData, {transaction})
            }
            if (data.phone) await Phone.create({phone: data.phone, type: 'home', clientId: client.id}, {transaction})
            if (data.mobile) await Phone.create({phone: data.mobile, type: 'mobile', clientId: client.id}, {transaction})
            if (data.work) await Phone.create({phone: data.work, type: 'work', clientId: client.id}, {transaction})
        })
    }

    async update (id, data, userId) {
        const clientFound = await this.find(userId, id)

        if (!clientFound) {
            const error = new Error("Client not found")
            error.status = 404
            throw error
        }

        const query = {
            where: {
                id
            }
        }

        return sequelize.transaction(async (transaction) => {
            const client = await Client.findOne(query, {transaction})

            if (!client) {
                const error = new Error("Client not found")
                error.status = 404
                throw error
            }

            await client.update(data, {transaction})
            
            if (data.phone) {
                const phone = await Phone.findOne({where: { client_id: client.id, type: 'home'} }, {transaction})
                if (phone) {
                    await phone.update({phone: data.phone}, {transaction})
                }
                if (!phone) await Phone.create({phone: data.phone, type: 'home', clientId: client.id}, {transaction})               
            }

            if (data.mobile) {
                const phone = await Phone.findOne({where: { client_id: client.id, type: 'mobile'} }, {transaction})
                if (phone) {
                    await phone.update({phone: data.mobile}, {transaction})
                }
                if (!phone) await Phone.create({phone: data.mobile, type: 'mobile', clientId: client.id}, {transaction})               
            }

            if (data.work) {
                const phone = await Phone.findOne({where: { client_id: client.id, type: 'work'} }, {transaction})
                if (phone) {
                    await phone.update({phone: data.work}, {transaction})
                }
                if (!phone) await Phone.create({phone: data.work, type: 'work', clientId: client.id}, {transaction})               
            }

            return client
        })
        .then(client => {
            return client
        })
        .catch(error => {
            throw error
        })
    }
}

module.exports = new ClientService()