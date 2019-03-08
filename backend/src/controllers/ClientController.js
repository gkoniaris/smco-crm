const ClientService = require('../services/ClientService')

class ClientController {
    async find(req, res, next) {
        try {
            const client = await ClientService.find(req.user.id, req.params.id)
            if (!client) {
                const error = new Error('Client not found')
                error.status = 404
                return next(error)
            }
            return res.json(client)
        } catch(err) { next(err) }
    }

    async get(req, res, next) {
        try {
            const {clients, count, pages} = await ClientService.get(req.user.id, {search: req.query.search, sort: req.query.sort, order: req.query.order, page: req.query.page})
            return res.json({data: clients, count, pages})
        } catch(err) { next(err) }
    }

    async create(req, res, next) {
        try {
            await ClientService.create(req.body, req.user.id)
            return res.json({
                message: `Ο πελάτης ${req.body.firstName} ${req.body.lastName} δημιουργήθηκε επιτυχώς`
            })
        } catch(err) { next(err) }
    }
} 

module.exports = new ClientController()