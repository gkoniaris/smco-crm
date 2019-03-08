const Joi = require('joi')

const schema = Joi.object().keys({
    question: Joi.string(),
    contactComments: Joi.string(),
    answer: Joi.string(),
    status: Joi.string().allow(['open', 'freezed', 'closed']),
    completed: Joi.boolean(),
    clientHappy: Joi.boolean(),
    shopHappy: Joi.boolean(),
    profit: Joi.boolean()
})

module.exports = schema