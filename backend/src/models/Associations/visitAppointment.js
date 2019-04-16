const Sequelize = require('sequelize')
const sequelize = require('../')

const VisitAppointment = sequelize.define('visit_appointment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    visitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'visit_id'
    },
    actions: {
      type: Sequelize.TEXT
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    duration: {
      type: Sequelize.INTEGER,
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

module.exports = VisitAppointment
