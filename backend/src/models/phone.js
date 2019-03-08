const Sequelize = require('sequelize')
const sequelize = require('./')

const Phone = sequelize.define('phone', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'client_id'
    },
    type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['home', 'mobile', 'work']
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
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

module.exports = Phone
