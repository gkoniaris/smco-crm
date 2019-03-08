'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const clients = new Array(1000).fill(0).map((client, idx) => {
      return {
        id: idx + 1,
        user_id: faker.random.number({min: 1, max: 2}),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email().toLowerCase(),
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    return queryInterface.bulkInsert('clients', clients, {raw: true})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clients', null, {})
    .then(() => {
      return queryInterface.sequelize.query('TRUNCATE TABLE clients')
    })
  }
};
