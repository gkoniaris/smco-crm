'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('visit_appointments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      visit_id: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      actions: {
        type: Sequelize.TEXT
      },
      createdAt: {
          type: Sequelize.DATE,
          field: 'created_at'
      },
      updatedAt: {
          type: Sequelize.DATE,
          field: 'updated_at'
      }
  }).then(() => queryInterface.addConstraint('visit_appointments', ['visit_id'], {
      type: 'FOREIGN KEY',
      name: 'fk_visit_id_visit_appointments',
      references: {
        table: 'visits',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('visit_appointments', 'fk_visit_id_visit_appointments')
     .then(() => {
      return queryInterface.dropTable('visit_appointments')
    })
  }
};
