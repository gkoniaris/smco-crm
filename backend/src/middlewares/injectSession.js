const jwt = require('jsonwebtoken')
const config = require('../config.js')

const error = new Error('Unauthorized')
error.status = 401

module.exports = () => {
    return (req, res, next) => {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader || !authorizationHeader.includes('Bearer')) {
            return next(error)
        }
        const token = authorizationHeader.replace('Bearer ', '')
        try {
            const user = jwt.verify(token, config.jwtSecret)
            req.user = user
            next()
        } catch (err) {
            return next(error)
        }
    }
}