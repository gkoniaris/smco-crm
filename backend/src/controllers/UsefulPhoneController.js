const UsefulPhoneService = require('../services/UsefulPhoneService')

class UsefulPhoneController {
    async get(req, res, next) {
        try {
            const {usefulPhones, count, pages} = await UsefulPhoneService.get(req.user.id, {sort: req.query.sort, order: req.query.order, page: req.query.page, clientId: req.query.clientId, status: req.query.status})
            return res.json({data: usefulPhones, count, pages})
        } catch(err) { next(err) }
    }
} 

module.exports = new UsefulPhoneController()