const Sequelize = require('sequelize')
const Op = Sequelize.Op
const sequelize = require('../models')
const Question = require('../models/question.js')
const Client = require('../models/client.js')
const Address = require('../models/address')
const Phone = require('../models/phone')
const config = require('../config.js')

const questionsLimit = 20

class ClientService {
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

        return Question.findOne(query)
        .then(question => {
            return question
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
            limit: questionsLimit,
            offset: (page - 1) * questionsLimit
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

        return Question.findAndCountAll(query)
        .then(results => {
            const questions = results.rows
            const count = results.count
            const pages = Math.ceil(count / questionsLimit)
            return {questions, count, pages}
        })
    }

    async create(data, userId) {
        const question = await Question.create(data)
        return question
    }

    async update(id, data, userId) {
        const questionFound = await this.find(userId, id)

        if (!questionFound) {
            const error = new Error("Question not found")
            error.status = 404
            throw error
        }

        const query = {
            where: {
                id
            }
        }

        if (data.status === 'freezed') data.freezed_date = new Date()
        if (data.status === 'closed') data.closed_date = new Date()
        
        return sequelize.transaction(async (transaction) => {
            const question = await Question.findOne(query, {transaction})

            if (!question) {
                const error = new Error("Question not found")
                error.status = 404
                throw error
            }
            await question.update(data, {transaction})
            return question
        })
        .then(question => {
            return question
        })
        .catch(error => {
            throw error
        })
    }
}

module.exports = new ClientService()