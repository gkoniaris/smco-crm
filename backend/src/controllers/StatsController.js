const StatsService = require('../services/StatsService')

class StatsController {
    async get(req, res, next) {
        try {
            const stats = await StatsService.get(req.user.id)
            return res.json({stats})
        } catch(err) { next(err) }
    }
} 

module.exports = new StatsController()