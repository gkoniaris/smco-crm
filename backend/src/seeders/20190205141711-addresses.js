'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const addresses = new Array(1000).fill(0).map((address, idx) => {
      const hasAddress = faker.random.number({min: 1, max: 100})
      if (hasAddress > 10) {
        return {
          id: idx + 1,
          client_id: idx + 1,
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          region: faker.address.state(),
          postal_code: faker.address.zipCode(),
          lat: faker.address.latitude().toString(),
          lon: faker.address.longitude().toString(),
          floor: faker.random.number({min: 0, max: 6}),
          bell: faker.name.findName(),
          created_at: new Date(),
          updated_at: new Date()
        }
      } else {
        return null
      }
    }).filter(address => address != null)
    return queryInterface.bulkInsert('addresses', addresses, {}).catch(err => console.log(err))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('addresses', null, {})
    .then(() => {
      return queryInterface.sequelize.query('TRUNCATE TABLE addresses')
    })
  }
};
