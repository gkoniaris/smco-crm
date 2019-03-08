const Joi = require('joi')

const schema = Joi.object().keys({
    question: Joi.string().required().error(() => 'Invalid question field'),
    contactComments: Joi.string(),
    clientId: Joi.number().min(1).error(() => 'Missing clientId field'),
    askedDate: Joi.date()
})

module.exports = schema