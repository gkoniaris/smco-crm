const Joi = require('joi')

const schema = Joi.object().keys({
    type: Joi.string().required().error(() => 'Invalid type field'),
    model: Joi.string().required().error(() => 'Invalid model field'),
    serialNumber: Joi.string(),
    failureDescription: Joi.string().required().error(() => 'Invalid failure description field'),
    diagnosisDescription: Joi.string(),
    actions: Joi.string(),
    contactComments: Joi.string(),
    comments: Joi.string(),
    status: Joi.string().allow(['open', 'freezed', 'closed']),
    completed: Joi.boolean(),
    clientHappy: Joi.boolean(),
    shopHappy: Joi.boolean(),
    profit: Joi.boolean()
})

module.exports = schema