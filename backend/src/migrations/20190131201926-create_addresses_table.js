'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      client_id: {
          type: Sequelize.INTEGER,
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
      postal_code: {
          type: Sequelize.STRING,
          field: 'postal_code'
      },
      floor: {
          type: Sequelize.INTEGER
      },
      bell: {
          type: Sequelize.STRING
      },
      created_at: {
          type: Sequelize.DATE
      },
      updated_at: {
          type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('addresses', ['client_id'], {
      type: 'FOREIGN KEY',
      name: 'fk_client_id_addresses',
      references: {
        table: 'clients',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('addresses', 'fk_client_id_addresses')
     .then(() => {
       return queryInterface.dropTable('addresses')
     })
  }
};
