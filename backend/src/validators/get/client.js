const Joi = require('joi')

const schema = Joi.object().keys({
    sort: Joi.string().valid('id', 'firstName', 'lastName'),
    order: Joi.string().valid('asc', 'desc'),
    page: Joi.number().min(1),
    search: Joi.string()
})

module.exports = schema