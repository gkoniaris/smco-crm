const StatsService = require('../services/StatsService')

class StatsController {
    async get(req, res, next) {
        try {
            let stats = null
            switch(req.query.type) {
                case 'pending':
                    stats = await StatsService.getPending(req.user.id)
                    return res.json({stats})
                break
                case 'happiness':
                    stats = await StatsService.getClientHapiness(req.user.id)
                    return res.json({stats})
                default:
                    stats = await StatsService.getDaysUntilClosed(req.user.id, 'devices')
                    return res.json({stats})
                break
            }
            

        } catch(err) { next(err) }
    }
} 

module.exports = new StatsController()