const Joi = require('joi')

const schema = Joi.object().keys({
    type: Joi.string().required().error(() => 'Invalid type field'),
    model: Joi.string().required().error(() => 'Invalid model field'),
    clientId: Joi.number(),
    addressId: Joi.number(),
    serialNumber: Joi.string(),
    failureDescription: Joi.string().required().error(() => 'Invalid failure description field'),
    diagnosisDescription: Joi.string(),
    contactComments: Joi.string(),
    appointments: Joi.array().items(Joi.object().keys({
        date: Joi.date().required(),
        actions: Joi.string().allow(""),
        duration: Joi.number().required()
    })),
    comments: Joi.string(),
    status: Joi.string().allow(['open', 'freezed', 'closed']),
    completed: Joi.boolean(),
    clientHappy: Joi.boolean(),
    shopHappy: Joi.boolean(),
    profit: Joi.boolean()
})

module.exports = schema