'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('useful_phones', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
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
    }).then(() => queryInterface.addConstraint('useful_phones', ['user_id'], {
        type: 'FOREIGN KEY',
        name: 'fk_user_id_useful_phones',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('useful_phones', 'fk_user_id_useful_phones')
     .then(() => {
      return queryInterface.dropTable('useful_phones')
    })
  }
};
