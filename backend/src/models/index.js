const Sequelize = require('sequelize');
const config = require('../config.js')

const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: config.database.dialect,
    operatorsAliases: false,
    logging: config.env === 'development',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})

module.exports = sequelize
