'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      client_id: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      contact_comments: {
        type: Sequelize.TEXT
      },
      created_at: {
          type: Sequelize.DATE
      },
      updated_at: {
          type: Sequelize.DATE
      }
  }).then(() => queryInterface.addConstraint('questions', ['client_id'], {
      type: 'FOREIGN KEY',
      name: 'fk_client_id_questions',
      references: {
        table: 'clients',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('questions', 'fk_client_id_questions')
     .then(() => {
      return queryInterface.dropTable('questions')
    })
  }
};
