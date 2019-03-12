const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sequelize = require('../models')
const Device = require('../models/device.js')
const Client = require('../models/client.js')
const Phone = require('../models/phone.js')
const Address = require('../models/address.js')
const config = require('../config.js')

const devicesLimit = 20

class DeviceService {
    async find (userId, id) {
        const query = {
            where: {
                id
            },
            include: [{
                model: Client,
                attributes: ['id', 'userId', 'firstName', 'lastName'],
                include: [Phone, Address]
            }],
            subQuery: false
        }

        if (!config.sharedUsers) {
            query.include[0].where = {
                userId: userId
            }
        }

        return Device.findOne(query)
        .then(device => {
            return device
        })

    }

    async get (userId, {sort = 'id', order = 'asc', page = 1, clientId = null, status = null} = {}) {
        const finalOrder = Array.isArray(sort) ? sort.map((item, idx) => { return [item, order[idx]] }): [[sort, order]]
        finalOrder.push(['id', 'desc'])
        const query = {
            where: {
                [Op.and]: []
            },
            include:[{
                model: Client,
                attributes: ['id', 'userId', 'firstName', 'lastName']
            }],
            order: finalOrder,
            limit: devicesLimit,
            offset: (page - 1) * devicesLimit
        }

        if (!config.sharedUsers) {
            query.include[0].where = {
                userId: userId
            }
        }

        if (clientId) {
            query.where[Op.and].push({
                clientId
            })
        }
        
        if (status) {
            const statuses = Array.isArray(status) ? status : [status]
            const statusFilter = {
                [Op.or]: statuses.map(item => { return {status: item} })
            }
            query.where[Op.and].push(statusFilter)
        }

        return Device.findAndCountAll(query)
        .then(results => {
            const devices = results.rows
            const count = results.count
            const pages = Math.ceil(count / devicesLimit)
            return {devices, count, pages}
        })
    }

    async create(data, userId) {
        const device = await Device.create(data)
        return device
    }

    async update(id, data, userId) {
        const deviceFound = await this.find(userId, id)

        if (!deviceFound) {
            const error = new Error("Device not found")
            error.status = 404
            throw error
        }

        const query = {
            where: {
                id
            }
        }

        if (data.status === 'freezed') data.freezedDate = new Date()
        if (data.status === 'closed') data.closedDate = new Date()
        
        return sequelize.transaction(async (transaction) => {
            const device = await Device.findOne(query, {transaction})

            if (!device) {
                const error = new Error("Device not found")
                error.status = 404
                throw error
            }
            await device.update(data, {transaction})
            return device
        })
        .then(device => {
            return device
        })
        .catch(error => {
            throw error
        })
    }
}

module.exports = new DeviceService()