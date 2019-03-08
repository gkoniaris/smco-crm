const Joi = require('joi')

const schema = Joi.object().keys({
    id: Joi.number().min(1).required()
})

module.exports = schema