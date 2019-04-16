const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sequelize = require('../models')
const Visit = require('../models/visit.js')
const Client = require('../models/client.js')
const Address = require('../models/address.js')
const Phone = require('../models/phone.js')

const VisitAppointment = require('../models/Associations/visitAppointment')
const config = require('../config.js')

const visitsLimit = 20

class VisitService {
    async find (userId, id) {
        const query = {
            where: {
                id
            },
            include: [{
                model: Client,
                attributes: ['id', 'userId', 'firstName', 'lastName'],
                include: [Phone, Address]
            }, {
                model: VisitAppointment,
                as: 'appointments'
            }, {
                model: Address,
                as: 'address'
            }],
            subQuery: false
        }

        if (!config.sharedUsers) {
            query.include[0].where = {
                userId: userId
            }
        }

        return Visit.findOne(query)
        .then(visit => {
            return visit
        })

    }
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
            }, {
                model: Address,
                as: 'address'
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
            const visit = await Visit.create(data, {transaction})
            await Promise.map(data.appointments, async (appointment) => {
                appointment.visitId = visit.id
                return await VisitAppointment.create(appointment, {transaction})
            })
            return visit
        })
    }

    async update(id, data, userId) {
        const visitFound = await this.find(userId, id)

        if (!visitFound) {
            const error = new Error("Visit not found")
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
            const visit = await Visit.findOne(query, {transaction})

            if (!visit) {
                const error = new Error("Visit not found")
                error.status = 404
                throw error
            }
            const appointmentsToUpdate = data.appointments.filter(item => item.id)
            const appointmentsToCreate = data.appointments.filter(item => !item.id)
            await visit.update(data, {transaction})

            await VisitAppointment.destroy({
                where: {
                    visitId: visit.id,
                    id: {
                        [Op.notIn]: appointmentsToUpdate.map(item => item.id)
                    }
                }
            }, {transaction})

            await Promise.map(appointmentsToUpdate, appointment => {
                appointment.visitId = visit.id
                return VisitAppointment.update(appointment, {where: {id: appointment.id}}, {transaction})
            })

            await Promise.map(appointmentsToCreate, appointment => {
                appointment.visitId = visit.id
                return VisitAppointment.create(appointment, {transaction})
            })
            return visit
        })
        .then(visit => {
            return visit
        })
        .catch(error => {
            throw error
        })
    }
}

module.exports = new VisitService()