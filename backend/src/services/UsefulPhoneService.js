const Sequelize = require('sequelize')
const Op = Sequelize.Op
const UsefulPhone = require('../models/usefulPhone.js')
const config = require('../config.js')

const usefulPhoneLimit = 20

class ClientService {
    async get (userId, {sort = 'id', order = 'asc', page = 1} = {}) {
        const query = {
            where: {
                [Op.and]: []
            },
            order: [[sort, order]],
            limit: usefulPhoneLimit,
            offset: (page - 1) * usefulPhoneLimit
        }

        if (!config.sharedUsers) {
            query.where[Op.and].push({
                userId: userId
            })
        }

        return UsefulPhone.findAndCountAll(query)
        .then(results => {
            const usefulPhones = results.rows
            const count = results.count
            const pages = Math.ceil(count / usefulPhoneLimit)
            return {usefulPhones, count, pages}
        })
    }
}

module.exports = new ClientService()