const Joi = require('joi')

const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).error(() => 'Invalid email field'),
    firstName: Joi.string().required().error(() => 'Missing firstName field'),
    lastName: Joi.string().required().error(() => 'Missing lastName field'),
    address: {
        city: Joi.string().required().error(() => 'Missing or invalid city field'),
        region: Joi.string().required().error(() => 'Invalid region field'),
        address: Joi.string().required().error(() => 'Invalid address field'),
        postalCode: Joi.string().required().error(() => 'Invalid postal code field'),
        floor: Joi.number().error(() => 'Invalid floor field'),
        bell: Joi.string().error(() => 'Invalid bell field'),
        lat: Joi.number().error(() => 'Invalid lat field'),
        lon: Joi.number().error(() => 'Invalid lon field'),
    },
    phone: Joi.string().error(() => 'Invalid phone field'),
    mobile: Joi.string().error(() => 'Invalid mobile field'),
    work: Joi.string().error(() => 'Invalid work phone field')
})

module.exports = schema