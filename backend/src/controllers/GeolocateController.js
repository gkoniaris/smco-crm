const GeolocateService = require('../services/GeolocateService')

class GeolocateController {
    async address(req, res, next) {
        try {
            const results = await GeolocateService.geolocateAddress(req.query.address)
            return res.json({data: results})
        } catch(err) { next(err) }
    }

} 

module.exports = new GeolocateController()