'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clients', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
          type: Sequelize.DATE,
      },
      updated_at: {
          type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('clients', ['user_id'], {
      type: 'FOREIGN KEY',
      name: 'fk_user_id_clients',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    })).then(() => queryInterface.addIndex('clients', {type: 'FULLTEXT', fields:['first_name', 'last_name']}))
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.removeConstraint('clients', 'fk_user_id_clients')
     .then(() => {
       return queryInterface.dropTable('clients')
     })
  }
};