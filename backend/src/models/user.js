const Sequelize = require('sequelize')
const sequelize = require('./')
const Client = require('./client.js')

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
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

User.prototype.toJSON =  function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

User.hasMany(Client)

module.exports = User
