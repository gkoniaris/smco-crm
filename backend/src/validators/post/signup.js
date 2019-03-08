const Joi = require('joi')

const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required().error(() => 'Invalid or missing email field'),
    password: Joi.string().regex(/^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/).required().error(() => 'Invalid or missing password field'),
    firstName: Joi.string().required().error(() => 'Missing firstName field'),
    lastName: Joi.string().required().error(() => 'Missing lastName field')
})

module.exports = schema