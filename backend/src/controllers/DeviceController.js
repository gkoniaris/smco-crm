const DeviceService = require('../services/DeviceService')

class DeviceController {
    async find(req, res, next) {
        try {
            const device = await DeviceService.find(req.user.id, req.params.id)
            if (!device) {
                return res.status(404).json({error: 'Device not found'})
            }
            return res.json(device)
        } catch(err) { next(err) }
    }

    async get(req, res, next) {
        try {
            const {devices, count, pages} = await DeviceService.get(req.user.id, {sort: req.query.sort, order: req.query.order, page: req.query.page, clientId: req.query.clientId, status: req.query.status})
            return res.json({data: devices, count, pages})
        } catch(err) { next(err) }
    }

    async create(req, res, next) {
        try {
            const device = await DeviceService.create(req.body, req.user.id)
            return res.json({
                message: `Η βλάβη ${device.id} δημιουργήθηκε επιτυχώς`
            })
        } catch(err) { next(err) }
    }

    async update(req, res, next) {
        try {
            await DeviceService.update(req.params.id, req.body, req.user.id)
            return res.json({
                message: `Η βλάβη ενημερώθηκε επιτυχώς`
            })
        } catch(err) { next(err) }
    }
} 

module.exports = new DeviceController()