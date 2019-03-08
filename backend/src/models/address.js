const Sequelize = require('sequelize')
const sequelize = require('./')

const Address = sequelize.define('address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    clientId: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'client_id'
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    region: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lat: {
        type: Sequelize.FLOAT
    },
    lon: {
        type: Sequelize.FLOAT
    },
    postalCode: {
        type: Sequelize.STRING,
        field: 'postal_code'
    },
    floor: {
        type: Sequelize.INTEGER
    },
    bell: {
        type: Sequelize.STRING,
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

module.exports = Address
