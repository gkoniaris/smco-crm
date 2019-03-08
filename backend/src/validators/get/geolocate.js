const Joi = require('joi')

const schema = Joi.object().keys({
    address: Joi.string().required()
})

module.exports = schema