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
            query.where[Op.and].push(sequelize.literal(`MATCH(first_name, last_name) AGAINST ('(${search}*) ("${search}")' IN BOOLEAN MODE)`))
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
}

module.exports = new ClientService()