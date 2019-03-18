const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sequelize = require('../models')
const Visit = require('../models/visit.js')
const Client = require('../models/client.js')
const VisitAppointment = require('../models/Associations/visitAppointment')
const config = require('../config.js')

const visitsLimit = 20

class VisitService {
    async get (userId, {sort = 'id', order = 'asc', page = 1, clientId = null, status = null} = {}) {
        let finalOrder = Array.isArray(sort) ? sort.map((item, idx) => { return [item, order[idx]] }): [[sort, order]]
        finalOrder.push(['id', 'desc'])

        const query = {
            where: {
                [Op.and]: []
            },
            include:[{
                model: Client,
                attributes: ['id', 'userId', 'firstName', 'lastName']
            }, {
                model: VisitAppointment,
                as: 'appointments'
            }],
            order: finalOrder,
            limit: visitsLimit,
            offset: (page - 1) * visitsLimit
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

        return Visit.findAndCountAll(query)
        .then(results => {
            const visits = results.rows
            const count = results.count
            const pages = Math.ceil(count / visitsLimit)
            return {visits, count, pages}
        })
    }

    async create(data, userId) {
        return sequelize.transaction(async (transaction) => {
            data.date = data.appointments.map(appointment => new Date(appointment.date)).reduce(function (a, b) { return a < b ? a : b; })
            console.log(data.date)
            const visit = await Visit.create(data, {transaction})
            await Promise.map(data.appointments, async (appointment) => {
                appointment.visitId = visit.id
                return await VisitAppointment.create(appointment, {transaction})
            })
            return visit
        })
    }
}

module.exports = new VisitService()