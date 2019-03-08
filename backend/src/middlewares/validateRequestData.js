const Joi = require("joi")

module.exports = (type, schema) => {
    return (req, res, next) => {
        const data = req[type]
        const validationResults = Joi.validate(data, schema)
        if (!validationResults.error) return next()
        return res.status(400).json({error: validationResults.error.details[0].message})
    }
}