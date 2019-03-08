const Sequelize = require('sequelize')
const sequelize = require('./')
const Address = require('./address')
const Phone = require('./phone')

const Client = sequelize.define('client', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'user_id'
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'last_name'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    }
})

Client.hasMany(Address)
Client.hasMany(Phone)

module.exports = Client
