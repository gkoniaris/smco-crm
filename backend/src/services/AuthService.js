const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const sequelize = require('../models')
const User = require('../models/user.js')
const config = require('../config.js')

class AuthService {
    async login (email, password) {
        const error = new Error("Invalid credentials")
        error.status = 401
        const user = await User.findOne({ where: { email } })
        if (user) {
            return await new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err || !result) reject(error)
                    const token = jwt.sign({
                        id: user.id,
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), //sign for 24 hours
                        firstName: user.firstName, 
                        lastName: user.lastName
                    }, config.jwtSecret)
                    return resolve(token)
                })
            })
        }
        throw error
    }

    async signup (user) {
        const error = new Error("A user with this email already exists")
        error.status = 401
        return sequelize.transaction(async (transaction) => {
            const userExists = await User.findOne({where: { email: user.email } }, {transaction})
            if (userExists) {
                throw error
            }
            return await User.create(Object.assign({}, user, {password: bcrypt.hashSync(user.password)}), {transaction})
        })
    }
}

module.exports = new AuthService()