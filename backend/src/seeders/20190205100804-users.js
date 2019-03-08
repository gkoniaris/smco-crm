'use strict';
const bcrypt = require('bcrypt-nodejs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      first_name: 'User',
      last_name: 'One',
      email: 'user1@gmail.com',
      password: bcrypt.hashSync('password1234'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      first_name: 'User',
      last_name: 'Two',
      email: 'user2@gmail.com',
      password: bcrypt.hashSync('password1234'),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
    .then(() => {
      return queryInterface.sequelize.query('TRUNCATE TABLE users')
    })
  }
};
