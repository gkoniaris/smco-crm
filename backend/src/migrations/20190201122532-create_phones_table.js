'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('phones', {
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
      created_at: {
          type: Sequelize.DATE
      },
      updated_at: {
          type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('phones', ['client_id'], {
      type: 'FOREIGN KEY',
      name: 'fk_client_id_phones',
      references: {
        table: 'clients',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('phones', 'fk_client_id_phones')
     .then(() => {
       return queryInterface.dropTable('phones')
     })
  }
};
