'use strict';
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const phones = new Array(1000).fill(0).map((phone, idx) => {
      const hasHomePhone = faker.random.number({min: 1, max: 100}) > 50
      const hasMobilePhone = faker.random.number({min: 1, max: 100}) > 50
      const hasWorkPhone = faker.random.number({min: 1, max: 100}) > 50

      const generatePhoneJson = (type) => {
        return {
          client_id: idx + 1,
          phone: '210' + Array(7).fill(0).map(number => faker.random.number({min:1, max: 9})).join(''),
          type,
          created_at: new Date(),
          updated_at: new Date()
        }
      }
      return {
        home: hasHomePhone ? generatePhoneJson('home') : null,
        mobile: hasMobilePhone ? generatePhoneJson('mobile') : null,
        work: hasWorkPhone ? generatePhoneJson('work') : null
      }
    })
    let phonesArray = []
    phones.forEach(clientPhones => {
      phonesArray.push(clientPhones.home)
      phonesArray.push(clientPhones.mobile)
      phonesArray.push(clientPhones.work)
    })
    phonesArray = phonesArray.filter(phone => phone != null)

    return queryInterface.bulkInsert('phones', phonesArray, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('phones', null, {})
    .then(() => {
      return queryInterface.sequelize.query('TRUNCATE TABLE phones')
    })
  }
};
