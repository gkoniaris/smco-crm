const AuthService = require('../services/AuthService.js')

class AuthController {
    async login(req, res, next) {
        try {
            const token = await AuthService.login(req.query.email, req.query.password)
            return res.json({token})
        } catch(err) { next(err) }
    }

    async signup(req, res, next) {
        try {
            const user = await AuthService.signup(req.body)
            return res.json({user})
        } catch(err) { next(err) }
    }
} 

module.exports = new AuthController()