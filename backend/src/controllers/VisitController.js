const VisitService = require('../services/VisitService')

class VisitController {
    async get(req, res, next) {
        try {
            const {visits, count, pages} = await VisitService.get(req.user.id, {sort: req.query.sort, order: req.query.order, page: req.query.page, clientId: req.query.clientId, status: req.query.status})
            return res.json({data: visits, count, pages})
        } catch(err) { next(err) }
    }
} 

module.exports = new VisitController()